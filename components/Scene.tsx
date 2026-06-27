"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Points, PointMaterial, useGLTF, Stats } from "@react-three/drei";
import { Suspense } from "react";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
  FXAA,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useParallax, PARALLAX_X, PARALLAX_Y } from "./useParallax";

// ────────────────────────────────────────────────────────────────────────────
const DEBUG = false;      // true = disable postprocessing, verify raw composition
const SHOW_STATS = false; // true = show the FPS/ms/draw-call overlay (perf tuning)
// ────────────────────────────────────────────────────────────────────────────

// ─── Value noise + fBm ────────────────────────────────────────────────────────

function makeNoise() {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number) => {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -2 * v : 2 * v);
  };

  return (x: number, y: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const a = perm[X] + Y;
    const b = perm[X + 1] + Y;
    return lerp(
      lerp(grad(perm[a], x, y), grad(perm[b], x - 1, y), u),
      lerp(grad(perm[a + 1], x, y - 1), grad(perm[b + 1], x - 1, y - 1), u),
      v
    );
  };
}

function fbm(noise: (x: number, y: number) => number, x: number, y: number) {
  let value = 0;
  let amp = 0.5;
  let freq = 1;
  for (let o = 0; o < 5; o++) {
    value += amp * noise(x * freq, y * freq);
    freq *= 2;
    amp *= 0.5;
  }
  return value;
}

// ─── Sky gradient dome: black → deep navy → soft blue horizon glow ────────────

function Sky() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
          varying vec3 vWorldPos;
          void main() {
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPos = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `,
        fragmentShader: `
          varying vec3 vWorldPos;
          vec3 cTop     = vec3(0.004, 0.008, 0.020);   // #02040A near-black top
          vec3 cMid     = vec3(0.018, 0.035, 0.090);   // deep indigo-navy
          vec3 cHorizon = vec3(0.063, 0.122, 0.290);   // soft deep-blue horizon
          void main() {
            float h = normalize(vWorldPos).y;
            float t = clamp(h, 0.0, 1.0);
            vec3 col;
            if (t < 0.08) {
              col = mix(cHorizon, cMid, t / 0.08);
            } else {
              col = mix(cMid, cTop, (t - 0.08) / 0.92);
            }
            // tight glow band hugging the horizon, concentrated low like the ref
            float glow = exp(-max(h, 0.0) * 22.0) * 0.45;
            col += cHorizon * glow;
            // a faint cool kiss right at the horizon line
            float kiss = exp(-abs(h) * 50.0) * 0.14;
            col += vec3(0.06, 0.16, 0.36) * kiss;
            col *= 0.90;
            gl_FragColor = vec4(col, 1.0);
          }
        `,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  );

  return (
    <mesh renderOrder={-10}>
      <sphereGeometry args={[400, 32, 16]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

// ─── Rocky blue mountain surface texture (color + bump with cracks) ──────────

let _rockTex: { colorMap: THREE.Texture; bumpMap: THREE.Texture } | null = null;
function getRockTextures() {
  if (_rockTex) return _rockTex;
  const size = 1024;
  const colorCanvas = document.createElement("canvas");
  const bumpCanvas = document.createElement("canvas");
  colorCanvas.width = colorCanvas.height = size;
  bumpCanvas.width = bumpCanvas.height = size;
  const cctx = colorCanvas.getContext("2d")!;
  const bctx = bumpCanvas.getContext("2d")!;
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

      // ALMOST BLACK rock: base #060B14 (6,11,20) lifting only faintly toward a
      // cool blue-grey on the raised grain — no bright blue tint
      const lit = v * 0.9 + 0.1;
      cimg.data[idx] = (6 + lit * 8) | 0;           // R  6 → 14
      cimg.data[idx + 1] = (11 + lit * 14) | 0;     // G 11 → 25
      cimg.data[idx + 2] = (20 + lit * 26) | 0;     // B 20 → 46 (gentle, not electric)
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

// ─── Mountain (massive, sharp ridged silhouette, narrow valley) ──────────────

function Mountain({
  position,
  side,
}: {
  position: [number, number, number];
  side: "left" | "right";
}) {
  const { colorMap, bumpMap } = useMemo(() => getRockTextures(), []);
  const geo = useMemo(() => {
    const noise = makeNoise();
    // PERF: 120×120 segments instead of 200×200 — ~1/3 the verts/triangles for
    // both the camera and shadow passes; fog + bump map hide the difference
    const g = new THREE.PlaneGeometry(260, 260, 120, 120);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // tall terrain, but lower than before so the peaks don't tower so high
      let h = (fbm(noise, x * 0.012, z * 0.012) + 0.5) * 14 + 4;

      // strong ridged contribution → sharp, jagged peaks (squared twice for spikes)
      const ridge = 1.0 - Math.abs(fbm(noise, x * 0.022 + 50, z * 0.022 + 50));
      h += ridge * ridge * 8;

      // a second, finer ridge layer for uneven broken edges
      const ridge2 = 1.0 - Math.abs(fbm(noise, x * 0.06 + 200, z * 0.06 + 200));
      h += ridge2 * ridge2 * 3;

      const worldX = x + position[0];
      const worldZ = z + position[2];

      // Valley FLARES open toward the camera: the inner-wall threshold grows as
      // the terrain approaches the viewer (worldZ rising from the far horizon at
      // ~-150 toward the camera at ~+90), so the gap is ~100% wider in the front
      // than at the back. `front` is 0 at the far end, 1 nearest the camera.
      const front = THREE.MathUtils.clamp((worldZ + 150) / 240, 0, 1);
      const innerStart = 7 + front * 14; // 7 (back, ~2× wider) → 21 (front)

      let valleyFactor: number;
      if (side === "left") {
        valleyFactor = THREE.MathUtils.clamp((-worldX - innerStart) / 14, 0, 1);
      } else {
        valleyFactor = THREE.MathUtils.clamp((worldX - innerStart) / 14, 0, 1);
      }
      valleyFactor = valleyFactor * valleyFactor * (3 - 2 * valleyFactor);
      valleyFactor = Math.pow(valleyFactor, 0.55); // sharper inner climb

      h *= valleyFactor;

      pos.setY(i, h);
    }

    g.computeVertexNormals();
    return g;
  }, [position, side]);

  return (
    <mesh geometry={geo} position={position}>
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={1.8}
        color="#060B14"
        roughness={0.98}
        metalness={0.0}
      />
    </mesh>
  );
}

// ─── Animated ripple normal map for flowing water ────────────────────────────

function makeFlowNormalMap() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  const noise = makeNoise();

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const h = (xx: number, yy: number) =>
        fbm(noise, xx * 0.02, yy * 0.06) * 0.6 + fbm(noise, xx * 0.05, yy * 0.12) * 0.4;
      const nx = (h(x, y) - h(x + 1, y)) * 2;
      const ny = (h(x, y) - h(x, y + 1)) * 2;
      const len = Math.hypot(nx, ny, 1);
      const idx = (y * size + x) * 4;
      img.data[idx] = ((nx / len) * 0.5 + 0.5) * 255;
      img.data[idx + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      img.data[idx + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(34, 34);
  return tex;
}

// ─── Water: dominant glowing foreground that fades into the fog at the horizon
// Two cross-scrolling normal layers give a continuous, non-mirror ripple. The
// model's glow stretches across it via emissive + a soft vertical reflection
// gradient baked into the alpha so the reflection reads slightly blurred.

function Water() {
  // a large plane pulled forward so water fills the lower ~40-45% of the frame
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(600, 600);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const normA = useMemo(() => makeFlowNormalMap(), []);
  const normB = useMemo(() => {
    const t = makeFlowNormalMap();
    t.repeat.set(18, 18);
    return t;
  }, []);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  // continuous gentle flow — two layers drift at different speeds/angles so the
  // surface never looks like a tiling loop. Emissive kept very low and pulsing
  // gently so the water reads dark, NOT a blown-out white path.
  useFrame((state, delta) => {
    normA.offset.y += delta * 0.05;
    normA.offset.x += delta * 0.012;
    normB.offset.y += delta * 0.028;
    normB.offset.x -= delta * 0.02;
    if (matRef.current) {
      const t = state.clock.elapsedTime;
      matRef.current.emissiveIntensity = 0.16 + Math.sin(t * 0.6) * 0.04;
    }
  });

  return (
    <mesh geometry={geo} position={[0, 0.6, -20]}>
      {/* DARK water (#04101F). Emissive cut ~65% and metalness lowered so the
          glow path is a narrow, soft blue streak instead of a white blowout.
          Higher ripple detail (stronger normals + finer roughness map) softly
          distorts the reflection. */}
      <meshStandardMaterial
        ref={matRef}
        color="#04101F"
        emissive="#0b2a5c"
        emissiveIntensity={0.16}
        roughness={0.55}
        metalness={0.18}
        normalMap={normA}
        normalScale={new THREE.Vector2(0.62, 0.62)}
        roughnessMap={normB}
      />
    </mesh>
  );
}

// ─── Floating glow particles ─────────────────────────────────────────────────
// Tiny luminous blue-white motes drifting up from the water, like fireflies or
// energy the water is releasing. ONE system, THREE depth layers (foreground /
// midground / background) for cinematic depth. Each particle has its own 4–10s
// lifetime: it fades in off the surface, drifts up with a slow sine sway and a
// twinkle, then fades out and respawns. Density is concentrated around the
// centre reflection and thins toward the edges. Renders as soft feathered
// circles via a radial-gradient sprite + additive blending.

// the 5-colour reference palette (white → pale → cyan-blue)
const GLOW_COLORS = [
  new THREE.Color("#FFFFFF"),
  new THREE.Color("#EAF8FF"),
  new THREE.Color("#BEEBFF"),
  new THREE.Color("#8FD9FF"),
  new THREE.Color("#63C6FF"),
];

// soft feathered circular sprite — a radial gradient that's opaque at the centre
// and feathers to zero at the rim, so each point reads as a glowing dot with a
// soft bloom rather than a hard square
let _glowSprite: THREE.Texture | null = null;
function getGlowSprite() {
  if (_glowSprite) return _glowSprite;
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0.0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.65)");
  g.addColorStop(0.55, "rgba(255,255,255,0.18)");
  g.addColorStop(1.0, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  _glowSprite = new THREE.CanvasTexture(c);
  return _glowSprite;
}

type GlowLayerConfig = {
  count: number;
  size: number;       // point size (world units; sizeAttenuation on)
  xSpread: number;    // half-width of the spawn band
  zNear: number;      // nearest z (toward camera)
  zFar: number;       // farthest z
  yTop: number;       // world Y at which a particle has fully risen/faded
  riseMin: number;    // slowest rise speed (units/sec)
  riseMax: number;    // fastest rise speed
  lifeMin: number;    // seconds
  lifeMax: number;
  brightMin: number;  // 0..1 (maps to the 20%–90% opacity range)
  brightMax: number;
  toMountains: number; // fraction of particles that drift wide toward the slopes
};

// GPU-driven: all motion (rise, sway, twinkle, height fade) is computed in the
// vertex shader from a single uTime uniform. The CPU sets static per-particle
// attributes ONCE and then only updates uTime each frame — no per-particle JS
// loop, no buffer re-upload — so tens of thousands of particles stay at 60fps.
function GlowLayer({ cfg }: { cfg: GlowLayerConfig }) {
  const sprite = useMemo(() => getGlowSprite(), []);

  const { geometry, material } = useMemo(() => {
    const n = cfg.count;
    const aBase = new Float32Array(n * 3);   // x (sway centre), spawnZ, unused
    const aColor = new Float32Array(n * 3);
    const aRise = new Float32Array(n);
    const aSway = new Float32Array(n);
    const aSwaySpeed = new Float32Array(n);
    const aTwSpeed = new Float32Array(n);
    const aPhase = new Float32Array(n);
    const aBright = new Float32Array(n);
    const aCycle = new Float32Array(n);      // seconds to rise from surface → yTop
    const aOffset = new Float32Array(n);     // desync along the cycle

    const centred = () => (Math.random() + Math.random() - 1);
    const span = cfg.yTop - 0.6;

    for (let i = 0; i < n; i++) {
      const wide = Math.random() < cfg.toMountains;
      const x = wide
        ? (Math.random() - 0.5) * cfg.xSpread * 2.4
        : centred() * cfg.xSpread;
      const z = cfg.zNear - Math.random() * (cfg.zNear - cfg.zFar);
      aBase[i * 3] = x;
      aBase[i * 3 + 1] = z;
      aBase[i * 3 + 2] = 0;
      aRise[i] = cfg.riseMin + Math.random() * (cfg.riseMax - cfg.riseMin);
      aSway[i] = 0.3 + Math.random() * 0.9;
      aSwaySpeed[i] = 0.15 + Math.random() * 0.4;
      aTwSpeed[i] = 0.4 + Math.random() * 1.3;
      aPhase[i] = Math.random() * Math.PI * 2;
      aBright[i] = cfg.brightMin + Math.random() * (cfg.brightMax - cfg.brightMin);
      // cycle length = time to traverse the full span at this particle's speed
      aCycle[i] = span / aRise[i];
      aOffset[i] = Math.random() * aCycle[i]; // desync so they don't rise in unison
      const c = GLOW_COLORS[(Math.random() * GLOW_COLORS.length) | 0];
      aColor[i * 3] = c.r; aColor[i * 3 + 1] = c.g; aColor[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(aBase, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
    geo.setAttribute("aRise", new THREE.BufferAttribute(aRise, 1));
    geo.setAttribute("aSway", new THREE.BufferAttribute(aSway, 1));
    geo.setAttribute("aSwaySpeed", new THREE.BufferAttribute(aSwaySpeed, 1));
    geo.setAttribute("aTwSpeed", new THREE.BufferAttribute(aTwSpeed, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    geo.setAttribute("aBright", new THREE.BufferAttribute(aBright, 1));
    geo.setAttribute("aCycle", new THREE.BufferAttribute(aCycle, 1));
    geo.setAttribute("aOffset", new THREE.BufferAttribute(aOffset, 1));
    // generous bounding sphere so the whole layer is never frustum-culled wrongly
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, cfg.yTop * 0.5, 0), 400);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: cfg.size },
        uYTop: { value: cfg.yTop },
        uSprite: { value: sprite },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        uniform float uYTop;
        attribute vec3 aColor;
        attribute float aRise;
        attribute float aSway;
        attribute float aSwaySpeed;
        attribute float aTwSpeed;
        attribute float aPhase;
        attribute float aBright;
        attribute float aCycle;
        attribute float aOffset;
        varying vec3 vColor;
        varying float vBright;
        void main() {
          float baseX = position.x;
          float z = position.y; // spawnZ packed into position.y

          // rise from the surface (0.6) and recycle every aCycle seconds
          float tt = mod(uTime + aOffset, aCycle);
          float y = 0.6 + tt * aRise;
          float x = baseX + sin(uTime * aSwaySpeed + aPhase) * aSway;

          // height-based envelope (matches the old CPU logic)
          float span = uYTop - 0.6;
          float h = clamp((y - 0.6) / span, 0.0, 1.0);
          float fadeIn = clamp(h / 0.12, 0.0, 1.0);
          float fadeOut = 1.0 - clamp((h - 0.35) / 0.65, 0.0, 1.0);
          float tw = 0.6 + 0.4 * sin(uTime * aTwSpeed + aPhase);
          vBright = aBright * fadeIn * fadeOut * tw;
          vColor = aColor;

          vec4 mv = modelViewMatrix * vec4(x, y, z, 1.0);
          // size attenuation — matches drei PointMaterial's world→pixel scaling
          // (size * viewportHeight / -z); ~900 stands in for the viewport factor
          gl_PointSize = uSize * 900.0 / max(-mv.z, 0.001);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
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
  }, [cfg, sprite]);

  // ONLY per-frame work: advance the time uniform (no JS loop, no upload)
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

// three layers → cinematic depth. Counts 50× the original (~21,500 total).
const GLOW_LAYERS: GlowLayerConfig[] = [
  // FOREGROUND — fewer, larger, brighter, nearest the camera (pushed forward)
  {
    count: 875, size: 0.14, xSpread: 22, zNear: 34, zFar: -22, yTop: 16,
    riseMin: 0.18, riseMax: 0.5, lifeMin: 4, lifeMax: 8,
    brightMin: 0.45, brightMax: 0.9, toMountains: 0.18,
  },
  // MIDGROUND — the bulk of the particles, around the reflection & model
  {
    count: 3250, size: 0.075, xSpread: 16, zNear: 24, zFar: -42, yTop: 15,
    riseMin: 0.1, riseMax: 0.32, lifeMin: 5, lifeMax: 10,
    brightMin: 0.3, brightMax: 0.8, toMountains: 0.22,
  },
  // BACKGROUND — tiny, dim, slow, drifting deeper (some toward the sky)
  {
    count: 1250, size: 0.05, xSpread: 30, zNear: 4, zFar: -80, yTop: 22,
    riseMin: 0.05, riseMax: 0.16, lifeMin: 6, lifeMax: 10,
    brightMin: 0.2, brightMax: 0.5, toMountains: 0.3,
  },
];

function GlowParticles() {
  return (
    <>
      {GLOW_LAYERS.map((cfg, i) => (
        <GlowLayer key={i} cfg={cfg} />
      ))}
    </>
  );
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars() {
  const positions = useMemo(() => {
    const count = 1400;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.4;
      const r = 200 + Math.random() * 120;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 40;
    }
    return arr;
  }, []);

  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#aac4e8"
        size={0.18}
        sizeAttenuation
        depthWrite={false}
        opacity={0.32}
      />
    </Points>
  );
}

// ─── Cinematic lighting: moonlight + soft ambient + rim, no white ────────────

function Lighting() {
  return (
    <>
      {/* very faint cool ambient — reduced; shadows stay deep blue, never gray */}
      <ambientLight intensity={0.035} color="#0a1730" />

      {/* horizon glow that lights the inner valley slopes from far away —
          dimmer + cooler so it no longer reads as daylight */}
      <pointLight position={[0, 3, -120]} intensity={750} distance={260} decay={2} color="#2f5fa8" />

      {/* soft MOONLIGHT — cool directional key from high/behind. PERF: shadows
          disabled — in this near-black scene the cast shadow was invisible but
          cost a full extra scene render every frame */}
      <directionalLight position={[6, 26, -90]} intensity={0.6} color="#7d9ccc" />

      {/* faint cool RIM lights skimming the inner mountain edges toward camera */}
      <pointLight position={[-10, 14, -34]} intensity={110} distance={58} decay={2} color="#2e63c0" />
      <pointLight position={[10, 14, -34]} intensity={110} distance={58} decay={2} color="#2e63c0" />

      {/* soft blue bounce FROM the water onto the lower mountain faces */}
      <pointLight position={[0, 1.2, -26]} intensity={60} distance={50} decay={2} color="#1b4f9e" />

      {/* cool sky/ground bounce — deep blue above, near-black below */}
      <hemisphereLight args={["#0e2c58", "#01030a", 0.12]} />
    </>
  );
}

// ─── Panel texture for the hero model (box divisions + seam lines) ───────────

function makePanelTextures() {
  const size = 1024;
  const colorCanvas = document.createElement("canvas");
  const bumpCanvas = document.createElement("canvas");
  colorCanvas.width = colorCanvas.height = size;
  bumpCanvas.width = bumpCanvas.height = size;
  const cctx = colorCanvas.getContext("2d")!;
  const bctx = bumpCanvas.getContext("2d")!;

  cctx.fillStyle = "#3b82f6";
  cctx.fillRect(0, 0, size, size);
  bctx.fillStyle = "#808080";
  bctx.fillRect(0, 0, size, size);

  type Rect = { x: number; y: number; w: number; h: number };
  const panels: Rect[] = [];
  const split = (r: Rect, depth: number) => {
    if (depth <= 0 || (r.w < 90 && r.h < 90)) {
      panels.push(r);
      return;
    }
    const horiz = r.w > r.h ? Math.random() > 0.25 : Math.random() > 0.75;
    const f = 0.35 + Math.random() * 0.3;
    if (horiz) {
      const w1 = r.w * f;
      split({ x: r.x, y: r.y, w: w1, h: r.h }, depth - 1);
      split({ x: r.x + w1, y: r.y, w: r.w - w1, h: r.h }, depth - 1);
    } else {
      const h1 = r.h * f;
      split({ x: r.x, y: r.y, w: r.w, h: h1 }, depth - 1);
      split({ x: r.x, y: r.y + h1, w: r.w, h: r.h - h1 }, depth - 1);
    }
  };
  split({ x: 0, y: 0, w: size, h: size }, 6);

  for (const p of panels) {
    const v = 0.82 + Math.random() * 0.32;
    const r = Math.min(255, 0x3b * v + (Math.random() - 0.5) * 14);
    const g = Math.min(255, 0x82 * v + (Math.random() - 0.5) * 14);
    const b = Math.min(255, 0xf6 * v);
    cctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
    cctx.fillRect(p.x, p.y, p.w, p.h);

    cctx.strokeStyle = "rgba(10,40,110,0.55)";
    cctx.lineWidth = 2;
    cctx.strokeRect(p.x + 1, p.y + 1, p.w - 2, p.h - 2);

    const bv = 110 + Math.random() * 40;
    bctx.fillStyle = `rgb(${bv | 0},${bv | 0},${bv | 0})`;
    bctx.fillRect(p.x, p.y, p.w, p.h);
    bctx.strokeStyle = "#202020";
    bctx.lineWidth = 3;
    bctx.strokeRect(p.x + 1.5, p.y + 1.5, p.w - 3, p.h - 3);
  }

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  return { colorMap, bumpMap };
}

// ─── Hero model (floating in the valley center) ──────────────────────────────

const MODEL_POS = new THREE.Vector3(0, 4.2, -28);

function HeroModel({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { scene } = useGLTF("/HeroModul-opt.glb", "/draco/");
  const groupRef = useRef<THREE.Group>(null);
  const lastScroll = useRef(0);
  const spin = useRef(0);

  // glassy translucent blue with paneled box texture + seam lines, now glowing
  // brighter so it blooms strongly and reads as the scene's primary light source
  useMemo(() => {
    const { colorMap, bumpMap } = makePanelTextures();
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0x3b82f6),
          map: colorMap,
          bumpMap: bumpMap,
          bumpScale: 1.2,
          emissive: new THREE.Color(0x42a7ff), // middle glow tone
          emissiveMap: colorMap,
          emissiveIntensity: 4.0, // softer glow → restrained bloom
          metalness: 0.0,
          roughness: 0.22,
          transmission: 0,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
          transparent: true,
          opacity: 0.96,
        });
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    const t = state.clock.elapsedTime;

    // scroll velocity drives extra spin (preserved scroll behaviour)
    const vel = Math.abs(scrollRef.current - lastScroll.current);
    lastScroll.current = scrollRef.current;

    const baseSpeed = 0.18; // slower, more elegant idle rotation
    const scrollBoost = vel * 35;
    spin.current += (baseSpeed + scrollBoost) * delta;
    g.rotation.y = spin.current;

    // subtle tilt wobble — gentle, layered sines for natural drift
    g.rotation.x = Math.sin(t * 0.4) * 0.06;
    g.rotation.z = Math.sin(t * 0.28) * 0.04;

    // elegant slow hover: a primary slow bob + a tiny secondary motion + a
    // micro horizontal float so it never feels locked in place
    g.position.y = MODEL_POS.y + Math.sin(t * 0.65) * 0.55 + Math.sin(t * 1.7) * 0.08;
    g.position.x = MODEL_POS.x + Math.sin(t * 0.33) * 0.12;
  });

  return (
    <group ref={groupRef} position={MODEL_POS} scale={5.04}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/HeroModul-opt.glb", "/draco/");

// ─── Pulsing glow lights that travel with the model ──────────────────────────
// A bright blue point light at the model spills onto the nearby water and inner
// mountain edges; its intensity softly pulses in sync with the model's emissive.

function ModelGlow() {
  const coreRef = useRef<THREE.PointLight>(null);
  const haloRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const bob = Math.sin(t * 0.65) * 0.55;
    const pulse = 0.85 + Math.sin(t * 0.9) * 0.15;
    if (coreRef.current) {
      coreRef.current.position.y = 4.2 + bob;
      coreRef.current.intensity = 240 * pulse;
    }
    if (haloRef.current) {
      haloRef.current.position.y = 4.2 + bob;
      haloRef.current.intensity = 95 * pulse;
    }
  });
  return (
    <>
      {/* tight inner core (#8EE8FF) — lights the water directly under the model */}
      <pointLight ref={coreRef} position={[0, 4.2, -28]} intensity={240} distance={72} decay={2} color="#8ee8ff" />
      {/* wider outer halo (#1557FF) — reaches the inner mountain faces */}
      <pointLight ref={haloRef} position={[0, 4.2, -24]} intensity={95} distance={52} decay={2} color="#1557ff" />
    </>
  );
}

// ─── Camera: lower, floating just above the water, narrower cinematic FOV ─────
// Scroll still zooms from the wide framing toward the model and holds, exactly
// as before (driven by scrollRef 0..1); only the heights/FOV/focus are retuned.

const START_Z = 47;        // wide framing of the whole valley at start
const ZOOM_END_Z = -19;    // ends right up against the model's face
const START_Y = 1.45;      // LOW — camera floats just above the water (nudged up)
const ZOOM_END_Y = 4.2;    // rise to the model's center height during the zoom

// focus low early so the horizon sits slightly ABOVE screen centre
const FOCUS_START = new THREE.Vector3(0, 2.1, -120);
const MODEL_CENTER = new THREE.Vector3(0, 4.2, -28);
const _focus = new THREE.Vector3();

const PAN_X = 1.0; // horizontal framing correction (lowered → composition pans right)

function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const par = useParallax();

  useFrame(({ camera, clock }, dt) => {
    const p = THREE.MathUtils.clamp(scrollRef.current, 0, 1);

    const targetZ = START_Z + (ZOOM_END_Z - START_Z) * p;
    const targetY = START_Y + (ZOOM_END_Y - START_Y) * p;

    const focusT = THREE.MathUtils.clamp((p - 0.4) / 0.6, 0, 1);
    const focusEased = focusT * focusT * (3 - 2 * focusT);
    _focus.lerpVectors(FOCUS_START, MODEL_CENTER, focusEased);
    _focus.x += PAN_X;

    const m = par.update(dt);
    const offX = PAN_X + m.x * PARALLAX_X;
    const offY = -m.y * PARALLAX_Y;

    // extremely subtle camera "breathing" — slow layered sines so the scene
    // feels alive without ever reading as deliberate movement
    const t = clock.elapsedTime;
    const breatheY = Math.sin(t * 0.45) * 0.045 + Math.sin(t * 0.13) * 0.02;
    const breatheZ = Math.sin(t * 0.32) * 0.06;

    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 30);
    camera.position.x += (offX - camera.position.x) * k;
    camera.position.z += (targetZ + breatheZ - camera.position.z) * k;
    camera.position.y += (targetY + offY + breatheY - camera.position.y) * k;
    camera.lookAt(_focus);
  });
  return null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

// frees this scene's WebGL context immediately on unmount so contexts don't leak
function ContextReleaser() {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    return () => {
      try { gl.forceContextLoss(); gl.dispose(); } catch { /* ignore */ }
    };
  }, [gl]);
  return null;
}

export default function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      // PERF: shadows removed (invisible in this dark scene, cost a full extra
      // render pass/frame); dpr capped at 1.25 so the fullscreen post passes
      // don't render at up to 1.5× on Retina
      dpr={[1, 1.25]}
      camera={{ position: [0, 1.05, 47], fov: 32, near: 0.1, far: 800 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.85, // darker, richer cinematic grade
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", background: "#040812" }}
    >
      {SHOW_STATS && <Stats />}
      <ContextReleaser />
      <CameraRig scrollRef={scrollRef} />

      {/* exponential blue-grey fog — subtle, never white, soft atmospheric depth
          that hides distant geometry and blends mountain layers into haze */}
      <fogExp2 attach="fog" args={["#0c1d3a", 0.015]} />

      <Lighting />
      <Sky />
      <Stars />

      <Mountain position={[-22, 0, -38]} side="left" />
      <Mountain position={[22, 0, -38]} side="right" />
      <Water />
      <GlowParticles />

      {/* glowing model + its travelling glow lights */}
      <ModelGlow />
      <Suspense fallback={null}>
        <HeroModel scrollRef={scrollRef} />
      </Suspense>

      {!DEBUG && (
        <EffectComposer multisampling={0}>
          {/* RESTRAINED bloom: high threshold so only the model's true highlights
              bloom (not the water) — small radius, no scene-wide wash */}
          <Bloom
            luminanceThreshold={0.85}
            luminanceSmoothing={0.6}
            intensity={0.45}
            radius={0.5}
            mipmapBlur
          />
          {/* subtle chromatic aberration at the edges */}
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0005, 0.0005)}
            radialModulation={false}
            modulationOffset={0}
          />
          {/* very light vignette */}
          <Vignette eskil={false} offset={0.32} darkness={0.7} />
          {/* tiny amount of film grain */}
          <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.03} />
          <ToneMapping />
          <FXAA />
        </EffectComposer>
      )}
    </Canvas>
  );
}
