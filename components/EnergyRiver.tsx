"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Spline generator ─────────────────────────────────────────────────────────
// A gently snaking CatmullRom curve running down the centre of the river, from
// near the camera (z≈+38) to the foot of the distant mountain (z≈-145), held
// just above the water surface (water sits at y=0.8 → river core at y≈0.85).
// UNCHANGED — the river path / layout is preserved exactly.

const WATER_Y = 0.8;
const RIVER_Y = WATER_Y + 0.05;

export const RIVER_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, RIVER_Y, 40),
    new THREE.Vector3(-3.5, RIVER_Y, 22),
    new THREE.Vector3(3.0, RIVER_Y, 4),
    new THREE.Vector3(-2.5, RIVER_Y, -16),
    new THREE.Vector3(3.5, RIVER_Y, -40),
    new THREE.Vector3(-2.0, RIVER_Y, -66),
    new THREE.Vector3(2.0, RIVER_Y, -96),
    new THREE.Vector3(0, RIVER_Y, -125),
    new THREE.Vector3(0, RIVER_Y, -145),
  ],
  false,
  "catmullrom",
  0.5
);

// pre-sampled frames so every ribbon shares the exact same path + orientation
const SAMPLES = 600;
type Frame = { pos: THREE.Vector3; right: THREE.Vector3 };

function sampleFrames(): Frame[] {
  const frames: Frame[] = [];
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const pos = RIVER_CURVE.getPointAt(t);
    const tan = RIVER_CURVE.getTangentAt(t).normalize();
    // right vector perpendicular to the tangent, kept flat on the water plane
    const right = new THREE.Vector3().crossVectors(tan, up).normalize();
    frames.push({ pos, right });
  }
  return frames;
}

// scroll (0..1) → revealed fraction of the spline.
// 0%→0.35, 20%→0.50, 40%→0.65, 60%→0.80, 80%→0.92, 100%→1.0
export function revealFromScroll(s: number) {
  const x = THREE.MathUtils.clamp(s, 0, 1);
  const stops = [0.35, 0.5, 0.65, 0.8, 0.92, 1.0];
  const seg = x * (stops.length - 1);
  const i = Math.min(Math.floor(seg), stops.length - 2);
  const f = seg - i;
  return THREE.MathUtils.lerp(stops[i], stops[i + 1], f);
}

// ─── Premium energy palette (per the reference spec) ─────────────────────────
//   center #FFFFFF · inner #9BE8FF · outer glow #36A5FF · outer edge #0A5CFF
const C_CENTER = new THREE.Color("#FFFFFF");
const C_INNER = new THREE.Color("#9BE8FF");
const C_OUTER = new THREE.Color("#36A5FF");
const C_EDGE = new THREE.Color("#0A5CFF");

// soft feathered circular sprite — opaque core feathering to zero at the rim,
// so every point reads as a glowing dot with a soft bloom rather than a square.
let _spark: THREE.Texture | null = null;
function getSparkSprite() {
  if (_spark) return _spark;
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0.0, "rgba(255,255,255,1)");
  g.addColorStop(0.2, "rgba(255,255,255,0.7)");
  g.addColorStop(0.5, "rgba(255,255,255,0.18)");
  g.addColorStop(1.0, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  _spark = new THREE.CanvasTexture(c);
  return _spark;
}

// ─── A single flat glowing ribbon following the spline at a lateral offset ────
// Now supports a per-ribbon animated lateral wander (woven into the geometry's
// UV.x → world drift in the vertex shader) so ribbons separate, merge, split and
// cross over each other instead of running as rigid parallel rails.

function buildRibbonGeometry(frames: Frame[], offset: number, halfWidth: number) {
  const verts: number[] = [];
  const uvs: number[] = [];
  // aSide encodes which edge (-1 / +1) and the local `right` vector so the
  // vertex shader can push the ribbon sideways at runtime for the weave.
  const aRight: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= SAMPLES; i++) {
    const f = frames[i];
    const cx = f.pos.x + f.right.x * offset;
    const cz = f.pos.z + f.right.z * offset;
    const v = i / SAMPLES;
    // two edge vertices straddling the centreline
    verts.push(cx - f.right.x * halfWidth, f.pos.y, cz - f.right.z * halfWidth);
    uvs.push(0, v);
    aRight.push(f.right.x, f.right.z);
    verts.push(cx + f.right.x * halfWidth, f.pos.y, cz + f.right.z * halfWidth);
    uvs.push(1, v);
    aRight.push(f.right.x, f.right.z);
  }
  for (let i = 0; i < SAMPLES; i++) {
    const a = i * 2;
    indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setAttribute("aRight", new THREE.Float32BufferAttribute(aRight, 2));
  g.setIndex(indices);
  return g;
}

// shared flowing-energy shader: a soft longitudinal gradient with travelling
// bright bands scrolling toward the distant mountain (−V direction). The vertex
// stage applies a slow per-ribbon lateral weave so independent strands curve,
// separate, merge, split and cross.
function makeRibbonMaterial(
  color: THREE.Color,
  baseOpacity: number,
  glow: number,
  weaveAmp: number,
  weaveFreq: number,
  weavePhase: number,
  weaveSpeed: number
) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: color },
      uOpacity: { value: baseOpacity },
      uGlow: { value: glow },
      uReveal: { value: 0.35 },
      uWeaveAmp: { value: weaveAmp },
      uWeaveFreq: { value: weaveFreq },
      uWeavePhase: { value: weavePhase },
      uWeaveSpeed: { value: weaveSpeed },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uWeaveAmp;
      uniform float uWeaveFreq;
      uniform float uWeavePhase;
      uniform float uWeaveSpeed;
      attribute vec2 aRight;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        // slow sinusoidal sideways wander along the length of the strand, with a
        // travelling component so neighbouring ribbons drift in/out of each other
        float wob =
            sin(uv.y * uWeaveFreq + uWeavePhase + uTime * uWeaveSpeed) * uWeaveAmp
          + sin(uv.y * uWeaveFreq * 2.17 + uWeavePhase * 1.7 - uTime * uWeaveSpeed * 0.6) * uWeaveAmp * 0.4;
        vec3 p = position;
        p.x += aRight.x * wob;
        p.z += aRight.y * wob;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3  uColor;
      uniform float uOpacity;
      uniform float uGlow;
      uniform float uReveal;
      varying vec2 vUv;
      void main() {
        // soft feathered cross-width falloff: a smooth bell curve instead of a
        // sharp pow() so the ribbon rim fades out gently with no hard line
        float d = abs(vUv.x - 0.5) * 2.0;            // 0 centre → 1 rim
        float edge = exp(-d * d * 4.5);              // gaussian glow profile
        float softEdge = smoothstep(1.0, 0.0, d);    // extra rim feather for alpha

        // POINTED growth front: the cutoff recedes toward the rim so the strand
        // tapers to a V/point instead of a flat horizontal cut. The centre reaches
        // the full uReveal; the edges stop ~0.05 short, with a long soft fade into
        // the tip so it comes to a clean point.
        float tipLen = 0.05;
        float localReveal = uReveal - d * tipLen;
        if (vUv.y > localReveal) discard;
        float vFade = smoothstep(localReveal, localReveal - 0.12, vUv.y);

        // travelling energy bands flowing toward the mountain
        float flow = vUv.y * 6.0 + uTime * 0.6;
        float bands = 0.55 + 0.45 * sin(flow * 3.14159);
        // sharper pulses riding on top
        float pulse = pow(0.5 + 0.5 * sin(vUv.y * 30.0 - uTime * 2.0), 4.0);

        // gentle fade in at the tail; bright leading glow at the V tip
        float tail = smoothstep(0.0, 0.1, vUv.y);
        float tip  = smoothstep(localReveal - 0.06, localReveal, vUv.y);

        float intensity = edge * (bands + pulse * 0.5 + tip * 1.2) * uGlow * tail * vFade;
        float alpha = uOpacity * edge * softEdge * tail * vFade;
        gl_FragColor = vec4(uColor * intensity, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

// ─── Center core: one thick brilliant ribbon ─────────────────────────────────
// Restrained slightly (glow lowered) so it no longer reads as a single solid
// line — it now sits beneath the woven strands + particle cloud.

function EnergyCore({ frames, revealRef }: { frames: Frame[]; revealRef: React.MutableRefObject<number> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const geo = useMemo(() => buildRibbonGeometry(frames, 0, 0.42), [frames]);
  const mat = useMemo(
    // white-hot centre, very gentle weave so the spine stays readable
    () => makeRibbonMaterial(C_CENTER, 0.85, 7.0, 0.18, 9.0, 0.0, 0.5),
    []
  );
  useFrame((_, dt) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += dt;
      matRef.current.uniforms.uReveal.value = revealRef.current;
    }
  });
  return (
    <mesh geometry={geo} renderOrder={3}>
      <primitive ref={matRef} object={mat} attach="material" />
    </mesh>
  );
}

// ─── Independent light ribbons: 12 thin strands that weave, merge, split ──────
// Each strand has its own offset, weave amplitude/frequency/phase/speed so they
// curve naturally, separate, cross over and merge back together. Colours step
// from the inner glow out to the deep outer edge.

function EnergyRibbons({ frames, revealRef }: { frames: Frame[]; revealRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const N = 12; // 8–15 independent ribbons

  const ribbons = useMemo(() => {
    const out: { geo: THREE.BufferGeometry; mat: THREE.ShaderMaterial }[] = [];
    for (let i = 0; i < N; i++) {
      // symmetric-ish pairs spreading outward from the core, plus jitter
      const pair = Math.floor(i / 2) + 1;
      const sign = i % 2 === 0 ? 1 : -1;
      const baseOffset = sign * pair * 0.5 * (0.7 + Math.random() * 0.6);

      // distance-based brightness falloff + colour grading outward
      const dist = pair / (N / 2 + 1);
      const col =
        dist < 0.4 ? C_INNER.clone() : dist < 0.75 ? C_OUTER.clone() : C_EDGE.clone();
      // gentler opacity + glow so the outer strands read as soft glowing threads
      const opacity = THREE.MathUtils.lerp(0.34, 0.1, dist) * (0.8 + Math.random() * 0.4);
      const glow = THREE.MathUtils.lerp(2.2, 0.7, dist);

      // per-ribbon weave so no two share a path — this is what makes them
      // separate / merge / split / cross continuously
      const weaveAmp = 0.5 + Math.random() * 1.4;
      const weaveFreq = 3.0 + Math.random() * 6.0;
      const weavePhase = Math.random() * Math.PI * 2;
      const weaveSpeed = 0.25 + Math.random() * 0.7;

      // slightly wider ribbons → the soft gaussian rim has room to feather
      const geo = buildRibbonGeometry(frames, baseOffset, 0.07 + Math.random() * 0.04);
      const mat = makeRibbonMaterial(col, opacity, glow, weaveAmp, weaveFreq, weavePhase, weaveSpeed);
      out.push({ geo, mat });
    }
    return out;
  }, [frames]);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((c) => {
      const m = (c as THREE.Mesh).material as THREE.ShaderMaterial;
      if (m?.uniforms?.uTime) {
        m.uniforms.uTime.value += dt;
        m.uniforms.uReveal.value = revealRef.current;
      }
    });
  });

  return (
    <group ref={groupRef} renderOrder={2}>
      {ribbons.map((r, i) => (
        <mesh key={i} geometry={r.geo}>
          <primitive object={r.mat} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

// ─── Flowing particle field: thousands of tiny glowing motes on the spline ────
// GPU-driven: each particle stores a static spawn phase / speed / lateral band /
// colour / size / twinkle; the vertex shader advances its phase from a single
// uTime uniform and samples a baked spline texture so the whole cloud flows
// downstream, drifts sideways, twinkles, fades in and out — at 60fps with no
// per-particle JS loop. Density is highest near the spine, thinning outward into
// "energy dust", with a sparse population of brighter, faster "sparks".

function makeSplineTexture(frames: Frame[]) {
  // 1D-ish lookup: row 0 = position.xyz, row 1 = right.xz, packed in RGBA.
  const w = SAMPLES + 1;
  const data = new Float32Array(w * 2 * 4);
  for (let i = 0; i <= SAMPLES; i++) {
    const f = frames[i];
    data[i * 4 + 0] = f.pos.x;
    data[i * 4 + 1] = f.pos.y;
    data[i * 4 + 2] = f.pos.z;
    data[i * 4 + 3] = 1.0;
    const o = (w + i) * 4;
    data[o + 0] = f.right.x;
    data[o + 1] = f.right.z;
    data[o + 2] = 0.0;
    data[o + 3] = 1.0;
  }
  const tex = new THREE.DataTexture(data, w, 2, THREE.RGBAFormat, THREE.FloatType);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

// the 4-colour particle palette from the spec (white → pale → cyan → blue)
const P_COLORS = [
  new THREE.Color("#FFFFFF"),
  new THREE.Color("#AEEFFF"),
  new THREE.Color("#7AD8FF"),
  new THREE.Color("#3AA9FF"),
];

type ParticleConfig = {
  count: number;
  sizeMin: number;
  sizeMax: number;
  lateralBand: number; // half-width of the sideways spread
  speedMin: number;
  speedMax: number;
  yLift: number; // how far above the surface this layer drifts
  brightMin: number;
  brightMax: number;
};

function ParticleField({
  frames,
  revealRef,
  cfg,
}: {
  frames: Frame[];
  revealRef: React.MutableRefObject<number>;
  cfg: ParticleConfig;
}) {
  const sprite = useMemo(() => getSparkSprite(), []);
  const splineTex = useMemo(() => makeSplineTexture(frames), [frames]);

  const { geometry, material } = useMemo(() => {
    const n = cfg.count;
    const aSeed = new Float32Array(n);       // base phase along the river (0..1)
    const aSpeed = new Float32Array(n);      // phase units / sec
    const aLateral = new Float32Array(n);    // signed sideways offset
    const aSway = new Float32Array(n);       // sideways sway amplitude
    const aSwaySpeed = new Float32Array(n);
    const aLift = new Float32Array(n);       // vertical bob amplitude
    const aSize = new Float32Array(n);
    const aColor = new Float32Array(n * 3);
    const aTwSpeed = new Float32Array(n);    // twinkle speed
    const aPhase = new Float32Array(n);

    const centred = () => (Math.random() + Math.random() - 1); // triangular → dense centre

    for (let i = 0; i < n; i++) {
      aSeed[i] = Math.random();
      aSpeed[i] = cfg.speedMin + Math.random() * (cfg.speedMax - cfg.speedMin);
      aLateral[i] = centred() * cfg.lateralBand;
      aSway[i] = 0.1 + Math.random() * 0.5;
      aSwaySpeed[i] = 0.3 + Math.random() * 1.2;
      aLift[i] = cfg.yLift * (0.4 + Math.random() * 0.6);
      aSize[i] = cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin);
      aTwSpeed[i] = 0.6 + Math.random() * 2.4;
      aPhase[i] = Math.random() * Math.PI * 2;
      const c = P_COLORS[(Math.random() * P_COLORS.length) | 0];
      aColor[i * 3] = c.r; aColor[i * 3 + 1] = c.g; aColor[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    // position attribute is unused for placement (computed in-shader) but three
    // requires one; pack seed into x so the attribute count is correct.
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute("aLateral", new THREE.BufferAttribute(aLateral, 1));
    geo.setAttribute("aSway", new THREE.BufferAttribute(aSway, 1));
    geo.setAttribute("aSwaySpeed", new THREE.BufferAttribute(aSwaySpeed, 1));
    geo.setAttribute("aLift", new THREE.BufferAttribute(aLift, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
    geo.setAttribute("aTwSpeed", new THREE.BufferAttribute(aTwSpeed, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 2, -50), 400);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: 0.35 },
        uSpline: { value: splineTex },
        uSamples: { value: SAMPLES },
        uSprite: { value: sprite },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uReveal;
        uniform sampler2D uSpline;
        uniform float uSamples;
        attribute float aSeed;
        attribute float aSpeed;
        attribute float aLateral;
        attribute float aSway;
        attribute float aSwaySpeed;
        attribute float aLift;
        attribute float aSize;
        attribute vec3  aColor;
        attribute float aTwSpeed;
        attribute float aPhase;
        varying vec3 vColor;
        varying float vBright;

        void main() {
          // flow downstream: phase advances and loops within the revealed window
          float t = mod(aSeed + uTime * aSpeed, 1.0) * uReveal;

          // sample the baked spline (row 0 = pos, row 1 = right)
          float u = t;
          vec3 pos   = texture2D(uSpline, vec2(u, 0.25)).xyz;
          vec2 right = texture2D(uSpline, vec2(u, 0.75)).xy;

          // lateral band + slow sideways sway, vertical bob
          float sway = aLateral + sin(uTime * aSwaySpeed + aPhase) * aSway;
          pos.x += right.x * sway;
          pos.z += right.y * sway;
          pos.y += 0.08 + abs(sin(uTime * 0.6 + aPhase)) * aLift;

          // fade in at spawn, fade out as it reaches the growth front; twinkle
          float headFade = smoothstep(0.0, 0.04, t);
          float tipFade  = 1.0 - smoothstep(uReveal - 0.05, uReveal, t);
          float tw = 0.55 + 0.45 * sin(uTime * aTwSpeed + aPhase);
          vBright = headFade * tipFade * tw;
          vColor = aColor;

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * 900.0 / max(-mv.z, 0.001);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uSprite;
        varying vec3 vColor;
        varying float vBright;
        void main() {
          float a = texture2D(uSprite, gl_PointCoord).a;
          gl_FragColor = vec4(vColor * vBright * a, a * vBright);
        }
      `,
    });

    return { geometry: geo, material: mat };
  }, [cfg, sprite, splineTex]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uReveal.value = revealRef.current;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} renderOrder={4} />;
}

// three particle layers → ~7,500 motes total: a dense dust core hugging the
// spine, a wider drifting dust band, and a sparse fast "spark" layer.
const PARTICLE_LAYERS: ParticleConfig[] = [
  // CORE DUST — densest, smallest, tight to the spine
  {
    count: 4200, sizeMin: 0.012, sizeMax: 0.045, lateralBand: 0.55,
    speedMin: 0.05, speedMax: 0.14, yLift: 0.18, brightMin: 0.4, brightMax: 0.9,
  },
  // DRIFTING DUST — wider band, slightly larger, slower
  {
    count: 2600, sizeMin: 0.02, sizeMax: 0.06, lateralBand: 1.6,
    speedMin: 0.03, speedMax: 0.09, yLift: 0.4, brightMin: 0.25, brightMax: 0.65,
  },
  // SPARKS — sparse, brightest, fastest, small
  {
    count: 700, sizeMin: 0.03, sizeMax: 0.08, lateralBand: 0.9,
    speedMin: 0.14, speedMax: 0.3, yLift: 0.7, brightMin: 0.7, brightMax: 1.0,
  },
];

// ─── Edge sparkles: tiny blue sparks scattering onto the river banks ──────────
// Spawned in two thin bands sitting just outside the ribbon spread, where the
// energy "touches" the rocks. Very subtle, slow, twinkling — never explosive.

function EdgeSparkles({ frames, revealRef }: { frames: Frame[]; revealRef: React.MutableRefObject<number> }) {
  const sprite = useMemo(() => getSparkSprite(), []);
  const splineTex = useMemo(() => makeSplineTexture(frames), [frames]);

  const { geometry, material } = useMemo(() => {
    const n = 900;
    const aSeed = new Float32Array(n);
    const aSpeed = new Float32Array(n);
    const aLateral = new Float32Array(n);
    const aSize = new Float32Array(n);
    const aColor = new Float32Array(n * 3);
    const aTwSpeed = new Float32Array(n);
    const aPhase = new Float32Array(n);

    for (let i = 0; i < n; i++) {
      aSeed[i] = Math.random();
      aSpeed[i] = 0.01 + Math.random() * 0.04; // slow — they cling to the banks
      // sit OUTSIDE the ribbon spread (≈3 units), on either bank
      const sign = Math.random() < 0.5 ? -1 : 1;
      aLateral[i] = sign * (2.6 + Math.random() * 1.4);
      aSize[i] = 0.012 + Math.random() * 0.03;
      aTwSpeed[i] = 1.0 + Math.random() * 3.0;
      aPhase[i] = Math.random() * Math.PI * 2;
      // cool blue sparks only (no white) — energy scattering on rock
      const c = (Math.random() < 0.5 ? C_OUTER : C_EDGE).clone();
      aColor[i * 3] = c.r; aColor[i * 3 + 1] = c.g; aColor[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute("aLateral", new THREE.BufferAttribute(aLateral, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
    geo.setAttribute("aTwSpeed", new THREE.BufferAttribute(aTwSpeed, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 1, -50), 400);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: 0.35 },
        uSpline: { value: splineTex },
        uSprite: { value: sprite },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uReveal;
        uniform sampler2D uSpline;
        attribute float aSeed;
        attribute float aSpeed;
        attribute float aLateral;
        attribute float aSize;
        attribute vec3  aColor;
        attribute float aTwSpeed;
        attribute float aPhase;
        varying vec3 vColor;
        varying float vBright;
        void main() {
          float t = mod(aSeed + uTime * aSpeed, 1.0) * uReveal;
          vec3 pos   = texture2D(uSpline, vec2(t, 0.25)).xyz;
          vec2 right = texture2D(uSpline, vec2(t, 0.75)).xy;
          // a tiny outward flicker so sparks seem to scatter off the bank
          float flick = 1.0 + 0.12 * sin(uTime * aTwSpeed * 1.7 + aPhase);
          pos.x += right.x * aLateral * flick;
          pos.z += right.y * aLateral * flick;
          pos.y += 0.05;

          float headFade = smoothstep(0.0, 0.05, t);
          float tipFade  = 1.0 - smoothstep(uReveal - 0.05, uReveal, t);
          // sharp twinkle so they read as fleeting sparks, kept dim (very subtle)
          float tw = pow(0.5 + 0.5 * sin(uTime * aTwSpeed + aPhase), 3.0);
          vBright = headFade * tipFade * tw * 0.6;
          vColor = aColor;

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * 900.0 / max(-mv.z, 0.001);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uSprite;
        varying vec3 vColor;
        varying float vBright;
        void main() {
          float a = texture2D(uSprite, gl_PointCoord).a;
          gl_FragColor = vec4(vColor * vBright * a, a * vBright);
        }
      `,
    });
    return { geometry: geo, material: mat };
  }, [sprite, splineTex]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uReveal.value = revealRef.current;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} renderOrder={4} />;
}

// ─── Composed energy river ────────────────────────────────────────────────────

export default function EnergyRiver({ scrollRef, particleScale = 1 }: { scrollRef?: React.MutableRefObject<number>; particleScale?: number }) {
  const frames = useMemo(() => sampleFrames(), []);
  // reveal fraction shared with every sub-component via a ref. Driven DIRECTLY
  // from the page's already-smoothed scroll (single smoothing stage) so forward
  // and reverse have identical speed/motion.
  const revealRef = useRef(0.35);

  useFrame(() => {
    revealRef.current = revealFromScroll(scrollRef ? scrollRef.current : 0);
  });

  return (
    <group>
      <EnergyRibbons frames={frames} revealRef={revealRef} />
      <EnergyCore frames={frames} revealRef={revealRef} />
      {PARTICLE_LAYERS.map((cfg, i) => (
        <ParticleField key={i} frames={frames} revealRef={revealRef} cfg={{ ...cfg, count: Math.max(1, Math.floor(cfg.count * particleScale)) }} />
      ))}
      <EdgeSparkles frames={frames} revealRef={revealRef} />
    </group>
  );
}
