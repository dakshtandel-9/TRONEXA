"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useParallax, PARALLAX_X, PARALLAX_Y } from "./useParallax";

// nudges Scene 4's otherwise-static camera with the opposite-direction parallax
const _s4Base = new THREE.Vector3(0, 0, 22);
function ParallaxCamera() {
  const par = useParallax();
  useFrame(({ camera }, dt) => {
    const m = par.update(dt);
    const tx = _s4Base.x + m.x * PARALLAX_X;
    const ty = _s4Base.y - m.y * PARALLAX_Y;
    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 30);
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene 4 — pure black background. Three smooth "snake" glowing rays (the same
// energy look as Scene 2 / Scene 3: a bright core + thin parallel ribbons +
// flowing particles) climb from the bottom of the screen to the top as the user
// scrolls. The left ray flows up to the top-LEFT corner, the right ray to the
// top-RIGHT corner, and the middle ray runs straight up the centre.
// ─────────────────────────────────────────────────────────────────────────────

// World extents: rays start just below the bottom of the frame and top out right
// at the visible top edge. The camera (z=22, fov=50) shows ±~10.3 in Y at the ray
// plane, so Y_TOP is set to that edge instead of +11 (which sat ABOVE the frame).
// That overshoot was the dead scroll at the end — the rays looked done once they
// left the top of frame, yet reveal kept climbing the invisible part. Capping
// Y_TOP at the frame edge makes the rays finish on screen exactly at reveal=1.0.
const Y_BOTTOM = -11;
const Y_TOP = 10.3;
const RAY_SAMPLES = 600;

// ─── Noise + fBm (same family as Scene 1 / Scene 3) ──────────────────────────

function makeNoise(seed0 = 1337) {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let seed = seed0;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 255; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + t * (b - a);
  const grad = (hash, x, y) => {
    const h = hash & 7; const u = h < 4 ? x : y; const v = h < 4 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -2 * v : 2 * v);
  };
  return (x, y) => {
    const X = Math.floor(x) & 255; const Y = Math.floor(y) & 255;
    x -= Math.floor(x); y -= Math.floor(y);
    const u = fade(x); const v = fade(y);
    const a = perm[X] + Y; const b = perm[X + 1] + Y;
    return lerp(
      lerp(grad(perm[a], x, y), grad(perm[b], x - 1, y), u),
      lerp(grad(perm[a + 1], x, y - 1), grad(perm[b + 1], x - 1, y - 1), u),
      v
    );
  };
}

function fbm(noise, x, y) {
  let value = 0; let amp = 0.5; let freq = 1;
  for (let o = 0; o < 5; o++) { value += amp * noise(x * freq, y * freq); freq *= 2; amp *= 0.5; }
  return value;
}

// ─── Rock textures (identical to Scene 1 / Scene 3's getRockTextures) ─────────

let _rockTex = null;
function getRockTextures() {
  if (_rockTex) return _rockTex;
  const size = 1024;
  const colorCanvas = document.createElement("canvas");
  const bumpCanvas = document.createElement("canvas");
  colorCanvas.width = colorCanvas.height = size;
  bumpCanvas.width = bumpCanvas.height = size;
  const cctx = colorCanvas.getContext("2d");
  const bctx = bumpCanvas.getContext("2d");
  const noise = makeNoise();
  const cimg = cctx.createImageData(size, size);
  const bimg = bctx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const base = fbm(noise, x * 0.012, y * 0.012) + 0.5;
      const fine = fbm(noise, x * 0.05, y * 0.05) * 0.5 + 0.5;
      const crack = 1 - Math.abs(fbm(noise, x * 0.03 + 100, y * 0.03 + 100));
      const crackLine = Math.pow(crack, 8);

      const v = base * 0.6 + fine * 0.4;
      const idx = (y * size + x) * 4;

      // ALMOST BLACK rock — terrain hidden in darkness (≈ #04070F)
      const lit = v * 0.9 + 0.1;
      cimg.data[idx] = (4 + lit * 6) | 0;           // R  4 → 10
      cimg.data[idx + 1] = (7 + lit * 11) | 0;      // G  7 → 18
      cimg.data[idx + 2] = (15 + lit * 24) | 0;     // B 15 → 39
      const darken = 1 - crackLine * 0.55;
      cimg.data[idx] *= darken;
      cimg.data[idx + 1] *= darken;
      cimg.data[idx + 2] *= darken;
      cimg.data[idx + 3] = 255;

      const b = 100 + v * 90 - crackLine * 80;
      bimg.data[idx] = b;
      bimg.data[idx + 1] = b;
      bimg.data[idx + 2] = b;
      bimg.data[idx + 3] = 255;
    }
  }
  cctx.putImageData(cimg, 0, 0);
  bctx.putImageData(bimg, 0, 0);

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(4, 4);
  bumpMap.repeat.set(4, 4);
  _rockTex = { colorMap, bumpMap };
  return _rockTex;
}

// ─── Backdrop wall ────────────────────────────────────────────────────────────
// A large flat wall behind the rays in solid dark navy. No rock colour texture —
// just the procedural bump map for subtle surface relief, so the flat colour
// still feels like it has a textured, bumpy surface rather than a dead flat fill.

const BG_COLOR = "#02040D"; // near-black sky per spec — rays are the focus
const TERRAIN_COLOR = "#04070F"; // near-black terrain backdrop

function RockBackdrop() {
  const { bumpMap } = useMemo(() => getRockTextures(), []);
  // dedicated tiling of the bump map for the backdrop relief
  const bgBump = useMemo(() => {
    const t = bumpMap.clone();
    t.needsUpdate = true;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 5);
    return t;
  }, [bumpMap]);

  return (
    <mesh position={[0, 0, -25]} renderOrder={-5}>
      {/* oversized so the backdrop fills the entire frame with margin to spare */}
      <planeGeometry args={[260, 180]} />
      <meshStandardMaterial
        // near-black terrain — only the bump gives faint surface relief; the
        // backdrop stays hidden in darkness so the rays dominate
        color={TERRAIN_COLOR}
        bumpMap={bgBump}
        bumpScale={1.6}
        roughness={0.99}
        metalness={0.0}
      />
    </mesh>
  );
}

// Build one smooth snaking spline running bottom → top.
//   xStart  – horizontal position at the bottom of the screen
//   xEnd    – horizontal position at the top (drift target: corner for side rays)
//   amp     – sideways amplitude of the S-wave wiggle
//   waves   – how many S-bends over the full height
//   phase   – offsets the wave so the three snakes don't move in lockstep
// A high CatmullRom tension keeps the curve smooth and rounded (a snake, not a
// sharp zig-zag).
//   bend – a one-directional lean added across the height (negative = leans
//          left as it climbs, positive = leans right, 0 = straight). Lets some
//          rays curve toward a side while others run straight up.
function makeSnakeCurve(xStart, xEnd, amp, waves, phase, bend = 0) {
  const pts = [];
  const total = 64; // many points → very smooth curve
  for (let i = 0; i <= total; i++) {
    const t = i / total;
    const y = THREE.MathUtils.lerp(Y_BOTTOM, Y_TOP, t);
    // base path drifts from xStart (bottom) to xEnd (top corner)
    const drift = THREE.MathUtils.lerp(xStart, xEnd, t * t); // ease toward the corner
    // one-directional lean: a smooth bow toward one side over the climb
    const lean = bend * Math.sin(t * Math.PI * 0.5);
    // smooth sine snake wiggle, tapered at the very ends
    const taper = Math.sin(t * Math.PI) * 0.85 + 0.15;
    const wiggle = Math.sin(t * Math.PI * 2 * waves + phase) * amp * taper;
    const x = drift + lean + wiggle;
    const z = Math.sin(t * Math.PI * waves + phase) * amp * 0.18; // subtle depth
    pts.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
}

function sampleFrames(curve) {
  const frames = [];
  const view = new THREE.Vector3(0, 0, 1); // camera looks down -Z; ribbons face it
  for (let i = 0; i <= RAY_SAMPLES; i++) {
    const t = i / RAY_SAMPLES;
    const pos = curve.getPointAt(t);
    const tan = curve.getTangentAt(t).normalize();
    // "right" = perpendicular to the tangent, in the screen plane
    const right = new THREE.Vector3().crossVectors(tan, view).normalize();
    frames.push({ pos, right });
  }
  return frames;
}

// ─── Premium fiber-optic ray palette (per the reference spec) ─────────────────
//   center #FFFFFF · inner #B7F1FF · middle #63CFFF · outer #238EFF · fade #0B3C8D
const C_CENTER = new THREE.Color("#FFFFFF");
const C_INNER = new THREE.Color("#B7F1FF");
const C_MIDDLE = new THREE.Color("#63CFFF");
const C_OUTER = new THREE.Color("#238EFF");
const C_FADE = new THREE.Color("#0B3C8D");
// particle palette: white → pale → cyan → blue
const P_COLORS = [
  new THREE.Color("#FFFFFF"),
  new THREE.Color("#BFEFFF"),
  new THREE.Color("#7ED8FF"),
  new THREE.Color("#42B5FF"),
];

// soft feathered circular sprite — opaque core feathering to zero at the rim
let _spark = null;
function getSparkSprite() {
  if (_spark) return _spark;
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
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

// ribbon geometry carries the per-vertex `right` vector (vec3 here — Scene 4
// rays live in the full screen plane) so the vertex shader can push the strand
// sideways at runtime → strands weave / separate / merge / cross
function buildRibbonGeometry(frames, offset, halfWidth) {
  const verts = [];
  const uvs = [];
  const aRight = [];
  const indices = [];
  for (let i = 0; i <= RAY_SAMPLES; i++) {
    const f = frames[i];
    const cx = f.pos.x + f.right.x * offset;
    const cy = f.pos.y + f.right.y * offset;
    const cz = f.pos.z + f.right.z * offset;
    const v = i / RAY_SAMPLES;
    verts.push(cx - f.right.x * halfWidth, cy - f.right.y * halfWidth, cz - f.right.z * halfWidth);
    uvs.push(0, v);
    aRight.push(f.right.x, f.right.y, f.right.z);
    verts.push(cx + f.right.x * halfWidth, cy + f.right.y * halfWidth, cz + f.right.z * halfWidth);
    uvs.push(1, v);
    aRight.push(f.right.x, f.right.y, f.right.z);
  }
  for (let i = 0; i < RAY_SAMPLES; i++) {
    const a = i * 2;
    indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setAttribute("aRight", new THREE.Float32BufferAttribute(aRight, 3));
  g.setIndex(indices);
  return g;
}

// flowing-energy shader with per-ribbon lateral weave + soft Gaussian edges + a
// pointed V growth front (identical look to Scene 2 / Scene 3). uReveal cuts the
// ray off so it grows from the bottom (v=0) toward the top (v=1).
function makeRibbonMaterial(color, baseOpacity, glow, weaveAmp = 0, weaveFreq = 6, weavePhase = 0, weaveSpeed = 0.4) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: color },
      uOpacity: { value: baseOpacity },
      uGlow: { value: glow },
      uReveal: { value: 0.0 },
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
      attribute vec3 aRight;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        float wob =
            sin(uv.y * uWeaveFreq + uWeavePhase + uTime * uWeaveSpeed) * uWeaveAmp
          + sin(uv.y * uWeaveFreq * 2.17 + uWeavePhase * 1.7 - uTime * uWeaveSpeed * 0.6) * uWeaveAmp * 0.4;
        vec3 p = position + aRight * wob;
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
        // soft feathered cross-width falloff: a smooth bell curve so the rim
        // fades gently with no hard line (never a thick glowing blob)
        float d = abs(vUv.x - 0.5) * 2.0;            // 0 centre → 1 rim
        float edge = exp(-d * d * 4.5);              // gaussian glow profile
        float softEdge = smoothstep(1.0, 0.0, d);

        // POINTED growth front: cutoff recedes toward the rim so the strand
        // tapers to a V/point instead of a flat cut
        float tipLen = 0.05;
        float localReveal = uReveal - d * tipLen;
        if (vUv.y > localReveal) discard;
        float vFade = smoothstep(localReveal, localReveal - 0.12, vUv.y);

        float flow = vUv.y * 6.0 + uTime * 0.6;
        float bands = 0.55 + 0.45 * sin(flow * 3.14159);
        float pulse = pow(0.5 + 0.5 * sin(vUv.y * 30.0 - uTime * 2.0), 4.0);
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

// bake the spline (pos + right) into a DataTexture so the GPU particle system can
// sample any point along the ray path in the vertex shader (right packed as vec3)
function makeSplineTexture(frames) {
  const w = RAY_SAMPLES + 1;
  const data = new Float32Array(w * 2 * 4);
  for (let i = 0; i <= RAY_SAMPLES; i++) {
    const f = frames[i];
    data[i * 4 + 0] = f.pos.x;
    data[i * 4 + 1] = f.pos.y;
    data[i * 4 + 2] = f.pos.z;
    data[i * 4 + 3] = 1.0;
    const o = (w + i) * 4;
    data[o + 0] = f.right.x;
    data[o + 1] = f.right.y;
    data[o + 2] = f.right.z;
    data[o + 3] = 1.0;
  }
  const tex = new THREE.DataTexture(data, w, 2, THREE.RGBAFormat, THREE.FloatType);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

// ─── GPU particle field flowing up the ray (identical to Scene 2 / Scene 3) ───
// thousands of tiny motes; all motion computed in the vertex shader from a baked
// spline texture → flow upward, sway, twinkle, fade in/out, occasionally detach.
function ParticleField({ frames, revealRef, cfg, seed = 0 }) {
  const sprite = useMemo(() => getSparkSprite(), []);
  const splineTex = useMemo(() => makeSplineTexture(frames), [frames]);

  const { geometry, material } = useMemo(() => {
    const n = cfg.count;
    const aSeed = new Float32Array(n);
    const aSpeed = new Float32Array(n);
    const aLateral = new Float32Array(n);
    const aSway = new Float32Array(n);
    const aSwaySpeed = new Float32Array(n);
    const aDetach = new Float32Array(n);   // outward drift when a mote detaches
    const aSize = new Float32Array(n);
    const aColor = new Float32Array(n * 3);
    const aTwSpeed = new Float32Array(n);
    const aPhase = new Float32Array(n);
    const centred = () => (Math.random() + Math.random() - 1);

    for (let i = 0; i < n; i++) {
      aSeed[i] = Math.random();
      aSpeed[i] = cfg.speedMin + Math.random() * (cfg.speedMax - cfg.speedMin);
      aLateral[i] = centred() * cfg.lateralBand;
      aSway[i] = 0.05 + Math.random() * 0.3;
      aSwaySpeed[i] = 0.3 + Math.random() * 1.2;
      // ~18% of motes occasionally detach and drift outward before vanishing
      aDetach[i] = Math.random() < 0.18 ? (0.4 + Math.random() * 1.1) : 0.0;
      aSize[i] = cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin);
      aTwSpeed[i] = 0.6 + Math.random() * 2.4;
      aPhase[i] = Math.random() * Math.PI * 2;
      const c = P_COLORS[(Math.random() * P_COLORS.length) | 0];
      aColor[i * 3] = c.r; aColor[i * 3 + 1] = c.g; aColor[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute("aLateral", new THREE.BufferAttribute(aLateral, 1));
    geo.setAttribute("aSway", new THREE.BufferAttribute(aSway, 1));
    geo.setAttribute("aSwaySpeed", new THREE.BufferAttribute(aSwaySpeed, 1));
    geo.setAttribute("aDetach", new THREE.BufferAttribute(aDetach, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
    geo.setAttribute("aTwSpeed", new THREE.BufferAttribute(aTwSpeed, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 200);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: 0.0 },
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
        attribute float aSway;
        attribute float aSwaySpeed;
        attribute float aDetach;
        attribute float aSize;
        attribute vec3  aColor;
        attribute float aTwSpeed;
        attribute float aPhase;
        varying vec3 vColor;
        varying float vBright;
        void main() {
          // flow UP the ray, looping within the revealed window
          float t = mod(aSeed + uTime * aSpeed, 1.0) * uReveal;
          vec3 pos   = texture2D(uSpline, vec2(t, 0.25)).xyz;
          vec3 right = texture2D(uSpline, vec2(t, 0.75)).xyz;
          float sway = aLateral + sin(uTime * aSwaySpeed + aPhase) * aSway;
          // occasional detach: motes near the end of their cycle drift outward
          float life = fract(aSeed + uTime * aSpeed);
          sway += aDetach * smoothstep(0.7, 1.0, life);
          pos += right * sway;
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
  }, [cfg, sprite, splineTex, seed]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uReveal.value = revealRef.current;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} renderOrder={4} />;
}

// per-ray particle layers → ~7,000 motes per ray (5,000–10,000 spec range)
const RAY_PARTICLE_LAYERS = [
  { count: 4200, sizeMin: 0.01, sizeMax: 0.035, lateralBand: 0.16, speedMin: 0.06, speedMax: 0.16, },
  { count: 2200, sizeMin: 0.015, sizeMax: 0.05, lateralBand: 0.34, speedMin: 0.04, speedMax: 0.1, },
  { count: 700, sizeMin: 0.025, sizeMax: 0.065, lateralBand: 0.24, speedMin: 0.16, speedMax: 0.32, },
];

// ─── A single ray: thin white core + 15–30 weaving fiber strands + particles ──

function ZigZagRay({ curve, revealRef, seedOffset = 0 }) {
  const frames = useMemo(() => sampleFrames(curve), [curve]);

  // VERY THIN white-hot core — a fine fiber, never a thick tube
  const coreGeo = useMemo(() => buildRibbonGeometry(frames, 0, 0.05), [frames]);
  const coreMat = useMemo(
    () => makeRibbonMaterial(C_CENTER.clone(), 0.85, 6.0, 0.04, 9.0, seedOffset, 0.5),
    [seedOffset]
  );

  // 22 ultra-thin fiber strands that weave / separate / merge / split / cross,
  // colour-graded inner → middle → outer → fade. Tiny random offsets per strand.
  const ribbons = useMemo(() => {
    const N = 22; // within the 15–30 spec range
    const out = [];
    for (let i = 0; i < N; i++) {
      const pair = Math.floor(i / 2) + 1;
      const sign = i % 2 === 0 ? 1 : -1;
      // tiny random base offset so strands hug the core yet stay slightly apart
      const baseOffset = sign * pair * 0.035 * (0.6 + Math.random() * 0.8);
      const dist = pair / (N / 2 + 1);
      const col =
        dist < 0.3 ? C_INNER.clone() :
        dist < 0.6 ? C_MIDDLE.clone() :
        dist < 0.85 ? C_OUTER.clone() : C_FADE.clone();
      // soft blue glow, gentle opacity — outer strands fade out delicately
      const opacity = THREE.MathUtils.lerp(0.32, 0.08, dist) * (0.8 + Math.random() * 0.4);
      const glow = THREE.MathUtils.lerp(2.0, 0.6, dist);
      // independent weave per strand (different amp / freq / phase / speed)
      const weaveAmp = 0.12 + Math.random() * 0.5;
      const weaveFreq = 3.0 + Math.random() * 7.0;
      const weavePhase = seedOffset + Math.random() * Math.PI * 2;
      const weaveSpeed = 0.2 + Math.random() * 0.8;
      out.push({
        geo: buildRibbonGeometry(frames, baseOffset, 0.02 + Math.random() * 0.02),
        mat: makeRibbonMaterial(col, opacity, glow, weaveAmp, weaveFreq, weavePhase, weaveSpeed),
      });
    }
    return out;
  }, [frames, seedOffset]);

  useFrame((_, dt) => {
    const reveal = revealRef.current;
    // advance the flow a touch faster so the energy reads as lively
    const flowDt = dt * 1.4;
    coreMat.uniforms.uTime.value += flowDt;
    coreMat.uniforms.uReveal.value = reveal;
    for (const r of ribbons) {
      r.mat.uniforms.uTime.value += flowDt;
      r.mat.uniforms.uReveal.value = reveal;
    }
  });

  return (
    <group>
      <group renderOrder={2}>
        {ribbons.map((r, i) => (
          <mesh key={i} geometry={r.geo}>
            <primitive object={r.mat} attach="material" />
          </mesh>
        ))}
      </group>
      <mesh geometry={coreGeo} renderOrder={3}>
        <primitive object={coreMat} attach="material" />
      </mesh>
      {RAY_PARTICLE_LAYERS.map((cfg, i) => (
        <ParticleField key={i} frames={frames} revealRef={revealRef} cfg={cfg} seed={seedOffset + i} />
      ))}
    </group>
  );
}

// ─── Three rays, revealed bottom → top by scroll ──────────────────────────────

function Rays({ scrollRef }) {
  // three snaking splines. The side rays start near the centre-bottom and drift
  // out to the top corners; the middle ray snakes straight up the centre.
  //   left  → top-LEFT corner   (xEnd negative)
  //   mid   → straight up        (xEnd 0)
  //   right → top-RIGHT corner  (xEnd positive)
  // five rays spread edge-to-edge (full screen width) but each with its OWN
  // character — different amplitude, wave count, phase and a one-directional
  // bend — so some snake hard, some lean left, some lean right, some run nearly
  // straight. They never look like five copies of the same wave.
  //   args: (xStart, xEnd, amp, waves, phase, bend)
  const curves = useMemo(() => [
    makeSnakeCurve(-12.0, -15.0, 1.6, 2.0, 0.0, -2.2),  // far-left: leans further left
    makeSnakeCurve(-6.0, -7.0, 0.9, 3.2, 2.1, 1.6),     // inner-left: bends back right
    makeSnakeCurve(0.0, 0.0, 0.4, 2.4, 1.6, 0.0),       // centre: nearly straight up
    makeSnakeCurve(6.0, 7.0, 1.1, 2.8, 4.3, -1.8),      // inner-right: bends toward left
    makeSnakeCurve(12.0, 15.0, 1.5, 2.2, 3.2, 2.4),     // far-right: leans further right
  ], []);

  // STAGGERED reveal: each ray grows during its OWN slice of the scroll instead
  // of all five appearing at once. The windows below overlap a little, and they
  // fire in a scattered order (far-left → centre → far-right → inner-left →
  // inner-right) keyed by curve index so the rays come in one after another.
  //   each entry = [scrollStart, scrollEnd] for curve index i
  const REVEAL_WINDOWS = useMemo(() => [
    [0.00, 0.42], // 0  far-left  → first
    [0.34, 0.74], // 1  inner-left → fourth
    [0.12, 0.54], // 2  centre    → second
    [0.46, 0.88], // 3  inner-right → fifth (last)
    [0.24, 0.66], // 4  far-right → third
  ], []);

  // one reveal ref per ray, each remapping the global scroll through its window.
  // Driven DIRECTLY from the page's already-smoothed scroll (single smoothing
  // stage) so forward and reverse have identical speed/motion.
  const revealRefs = useMemo(() => curves.map(() => ({ current: 0.0001 })), [curves]);

  useFrame(() => {
    const p = scrollRef ? THREE.MathUtils.clamp(scrollRef.current, 0, 1) : 0;
    for (let i = 0; i < revealRefs.length; i++) {
      const [s, e] = REVEAL_WINDOWS[i];
      const local = THREE.MathUtils.clamp((p - s) / (e - s), 0, 1);
      revealRefs[i].current = THREE.MathUtils.clamp(local, 0.0001, 1);
    }
  });

  return (
    <group>
      {curves.map((c, i) => (
        <ZigZagRay key={i} curve={c} revealRef={revealRefs[i]} seedOffset={i * 13} />
      ))}
    </group>
  );
}

// ─── Scene 4 ──────────────────────────────────────────────────────────────────

// When this scene's Canvas unmounts, force-release its WebGL context so the
// browser frees it immediately instead of leaking it until GC — otherwise rapid
// scene mount/unmount during scrubbing piles up stale contexts and the next
// Canvas gets a null GL context ("Cannot read properties of null (reading
// 'alpha')").
function ContextReleaser() {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    return () => {
      try { gl.forceContextLoss(); gl.dispose(); } catch { /* ignore */ }
    };
  }, [gl]);
  return null;
}

export default function Scene4({ scrollRef }) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 22], fov: 50, near: 0.1, far: 200 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.62, // reduced exposure — deep cinematic grade
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", background: BG_COLOR }}
    >
      <color attach="background" args={[BG_COLOR]} />

      <ContextReleaser />
      <ParallaxCamera />

      {/* subtle blue RIM lighting only — the rays softly catch the nearby
          backdrop; no global scene glow, everything else stays in darkness */}
      <ambientLight intensity={0.04} color="#0a1730" />
      <pointLight position={[-6, -2, 8]} intensity={28} distance={26} decay={2} color="#238eff" />
      <pointLight position={[0, 3, 8]} intensity={28} distance={26} decay={2} color="#63cfff" />
      <pointLight position={[6, -2, 8]} intensity={28} distance={26} decay={2} color="#238eff" />
      <hemisphereLight args={["#0c2545", "#01030a", 0.08]} />

      {/* very subtle blue volumetric fog around the rays — depth only */}
      <fog attach="fog" args={["#0a1d3a", 24, 70]} />

      <RockBackdrop />
      <Rays scrollRef={scrollRef} />

      <EffectComposer multisampling={0}>
        {/* bloom reduced ~70%: only the brightest white core blooms; edges stay
            crisp and the rays remain clearly defined with no overexposed wash */}
        <Bloom
          luminanceThreshold={0.55}
          luminanceSmoothing={0.7}
          intensity={0.55}
          radius={0.55}
          mipmapBlur
        />
        {/* very light chromatic aberration */}
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation={false}
          modulationOffset={0}
        />
        {/* very subtle vignette → focus + contrast */}
        <Vignette eskil={false} offset={0.3} darkness={0.78} />
        {/* tiny film grain */}
        <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.035} />
        <ToneMapping />
      </EffectComposer>
    </Canvas>
  );
}
