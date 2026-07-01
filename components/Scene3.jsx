"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useParallax, PARALLAX_X, PARALLAX_Y } from "./useParallax";
import { useQuality } from "@/hooks/useQuality";

// ─────────────────────────────────────────────────────────────────────────────
// Scene 3 is a direct continuation of Scene 2's canyon shot. Same dark-blue
// mountains, same glowing energy ray — but here the ray keeps climbing: it runs
// up the face of the front mountain and crests over the ridge, and the camera
// flies up after it and over the top. Scene 2 is left completely untouched; this
// scene rebuilds the same look inline so the ray can climb in Y.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Noise + fBm (same family as Scene 1 / Scene 2) ──────────────────────────

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

// ─── Rock textures (identical to Scene 1's getRockTextures) ───────────────────
// Deep-navy procedural rock: broad patches + grain + dark crack veins, plus a
// matching bump map. Generated once and shared by every mountain mesh.

let _rockTex = null;
let _rockTexLow = null;
function getRockTextures(lowEnd = false) {
  if (lowEnd) {
    if (_rockTexLow) return _rockTexLow;
    const c = document.createElement("canvas");
    c.width = c.height = 4;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#03060C";
    ctx.fillRect(0, 0, 4, 4);
    const colorMap = new THREE.CanvasTexture(c);
    _rockTexLow = { colorMap, bumpMap: colorMap };
    return _rockTexLow;
  }
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

      // ALMOST BLACK rock: base ≈ #03060C (3,6,12) — mountains vanish into dark
      const lit = v * 0.9 + 0.1;
      cimg.data[idx] = (3 + lit * 6) | 0;           // R  3 → 9
      cimg.data[idx + 1] = (6 + lit * 11) | 0;      // G  6 → 17
      cimg.data[idx + 2] = (12 + lit * 22) | 0;     // B 12 → 34
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

// ─── The front mountain (same shape logic as Scene 2's FrontMountain) ─────────
// A flat centre channel (|x| < ~5) that the ray climbs, rising into rock on both
// sides. We also expose mountainHeight(x,z) so the ray + camera can ride the
// surface up and over the ridge.

const FRONT_NOISE = makeNoise(4471);
const FRONT_POS = [0, 0, 42]; // matches Scene 2's FrontMountain placement

// height of the front-mountain surface in world space at (wx, wz)
function mountainHeight(wx, wz) {
  // convert to the mountain's local plane coords (it sits at FRONT_POS)
  const x = wx - FRONT_POS[0];
  const z = wz - FRONT_POS[2];
  // outside the 200x200 plane → treat as flat valley floor
  if (Math.abs(x) > 100 || Math.abs(z) > 100) return 0;
  let h = (fbm(FRONT_NOISE, x * 0.013, z * 0.013) + 0.5) * 13 + 4;
  const ridge = 1.0 - Math.abs(fbm(FRONT_NOISE, x * 0.02 + 80, z * 0.02 + 80));
  h += ridge * ridge * 6;
  const distFromCenter = Math.abs(x);
  let mask = THREE.MathUtils.clamp((distFromCenter - 5) / 20, 0, 1);
  mask = mask * mask * (3 - 2 * mask);
  h *= mask;
  return h;
}

function FrontMountain({ lowEnd } = {}) {
  const { colorMap, bumpMap } = useMemo(() => getRockTextures(lowEnd), [lowEnd]);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(200, 200, 160, 160);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      let h = (fbm(FRONT_NOISE, x * 0.013, z * 0.013) + 0.5) * 13 + 4;
      const ridge = 1.0 - Math.abs(fbm(FRONT_NOISE, x * 0.02 + 80, z * 0.02 + 80));
      h += ridge * ridge * 6;
      const distFromCenter = Math.abs(x);
      let mask = THREE.MathUtils.clamp((distFromCenter - 5) / 20, 0, 1);
      mask = mask * mask * (3 - 2 * mask);
      h *= mask;
      pos.setY(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} position={FRONT_POS} receiveShadow castShadow>
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={1.8}
        color="#03060C"
        roughness={0.99}
        metalness={0.0}
      />
    </mesh>
  );
}

// ─── Side mountains flanking the climbing channel ─────────────────────────────

function SideMountain({ position, side, seed, lowEnd }) {
  const { colorMap, bumpMap } = useMemo(() => getRockTextures(lowEnd), [lowEnd]);
  const geo = useMemo(() => {
    const noise = makeNoise(seed);
    const g = new THREE.PlaneGeometry(200, 200, 160, 160);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      let h = (fbm(noise, x * 0.013, z * 0.013) + 0.5) * 15 + 4;
      const ridge = 1.0 - Math.abs(fbm(noise, x * 0.02 + 50, z * 0.02 + 50));
      h += ridge * ridge * 7;
      const worldX = x + position[0];
      let valley = side === "left"
        ? THREE.MathUtils.clamp((-worldX - 6) / 18, 0, 1)
        : THREE.MathUtils.clamp((worldX - 6) / 18, 0, 1);
      valley = valley * valley * (3 - 2 * valley);
      h *= Math.pow(valley, 0.7);
      pos.setY(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, [position, side, seed]);

  return (
    <mesh geometry={geo} position={position} receiveShadow castShadow>
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={1.8}
        color="#03060C"
        roughness={0.99}
        metalness={0.0}
      />
    </mesh>
  );
}

// ─── The climbing energy ray ──────────────────────────────────────────────────
// Same look as Scene 2's ray (bright core + thin ribbons + particles), but the
// spline keeps going past the valley floor: it runs up the centre channel of the
// front mountain and crests OVER the ridge. Y is sampled from the mountain
// surface so the ray visibly climbs the slope, plus a small lift so it floats
// just above the ground.

const RAY_LIFT = 0.85;

// premium energy palette (per the reference spec)
//   center #FFFFFF · inner #9BE8FF · outer glow #36A5FF · outer edge #0A5CFF
const C_CENTER = new THREE.Color("#FFFFFF");
const C_INNER = new THREE.Color("#9BE8FF");
const C_OUTER = new THREE.Color("#36A5FF");
const C_EDGE = new THREE.Color("#0A5CFF");
// particle palette: white → pale → cyan → blue
const P_COLORS = [
  new THREE.Color("#FFFFFF"),
  new THREE.Color("#AEEFFF"),
  new THREE.Color("#7AD8FF"),
  new THREE.Color("#3AA9FF"),
];

const RAY_CURVE = (() => {
  // control points as [x, z]; Y is filled from mountainHeight so it hugs the climb
  const xz = [
    [0, 40],
    [-3, 28],
    [3, 16],
    [-2, 6],
    [2, -2],     // approaching the foot of the front mountain
    [-1, -12],
    [1, -24],
    [0, -36],
    [0, -52],    // climbing the face
    [0, -70],    // near the ridge top
    [0, -90],    // cresting over
    [0, -115],   // descending the far side / into the distance
  ];
  const pts = xz.map(([x, z]) => new THREE.Vector3(x, mountainHeight(x, z) + RAY_LIFT, z));
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
})();

// Straight centre path for the CAMERA: same Z/Y climb profile as RAY_CURVE but
// pinned to x=0, so the camera rides straight up the centre instead of inheriting
// the ray's left-right zig-zag. Height is sampled on the centre line (x=0).
const CAM_CURVE = (() => {
  const z = [40, 28, 16, 6, -2, -12, -24, -36, -52, -70, -90, -115];
  const pts = z.map((zz) => new THREE.Vector3(0, mountainHeight(0, zz) + RAY_LIFT, zz));
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
})();

const RAY_SAMPLES = 600;

function sampleRayFrames() {
  const frames = [];
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i <= RAY_SAMPLES; i++) {
    const t = i / RAY_SAMPLES;
    const pos = RAY_CURVE.getPointAt(t);
    const tan = RAY_CURVE.getTangentAt(t).normalize();
    const right = new THREE.Vector3().crossVectors(tan, up).normalize();
    frames.push({ pos, right });
  }
  return frames;
}

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

// ribbon geometry now carries the per-vertex `right` vector so the vertex shader
// can push the strand sideways at runtime → strands weave / separate / cross
function buildRibbonGeometry(frames, offset, halfWidth) {
  const verts = [];
  const uvs = [];
  const aRight = [];
  const indices = [];
  for (let i = 0; i <= RAY_SAMPLES; i++) {
    const f = frames[i];
    const cx = f.pos.x + f.right.x * offset;
    const cz = f.pos.z + f.right.z * offset;
    const v = i / RAY_SAMPLES;
    verts.push(cx - f.right.x * halfWidth, f.pos.y, cz - f.right.z * halfWidth);
    uvs.push(0, v);
    aRight.push(f.right.x, f.right.z);
    verts.push(cx + f.right.x * halfWidth, f.pos.y, cz + f.right.z * halfWidth);
    uvs.push(1, v);
    aRight.push(f.right.x, f.right.z);
  }
  for (let i = 0; i < RAY_SAMPLES; i++) {
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

// shared flowing-energy shader with a slow per-ribbon lateral weave (matches
// Scene 2): independent strands curve, separate, merge, split and cross.
function makeRibbonMaterial(color, baseOpacity, glow, weaveAmp = 0, weaveFreq = 6, weavePhase = 0, weaveSpeed = 0.4) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: color },
      uOpacity: { value: baseOpacity },
      uGlow: { value: glow },
      uReveal: { value: 0.1 },
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
        // the full uReveal; the edges stop ~0.05 short, and a long soft fade leads
        // into the tip so it comes to a clean point.
        float tipLen = 0.05;                          // how far the V tapers back
        float localReveal = uReveal - d * tipLen;     // center reaches furthest
        if (vUv.y > localReveal) discard;
        float vFade = smoothstep(localReveal, localReveal - 0.12, vUv.y); // taper

        float flow = vUv.y * 6.0 + uTime * 0.6;
        float bands = 0.55 + 0.45 * sin(flow * 3.14159);
        float pulse = pow(0.5 + 0.5 * sin(vUv.y * 30.0 - uTime * 2.0), 4.0);
        // gentle fade in at the tail (near origin)
        float tail = smoothstep(0.0, 0.1, vUv.y);
        // bright leading glow concentrated at the very point of the V
        float tip  = smoothstep(localReveal - 0.06, localReveal, vUv.y);
        float intensity = edge * (bands + pulse * 0.5 + tip * 1.2) * uGlow * tail * vFade;
        // alpha feathered by the gaussian core, rim smoothstep, tail + tip taper
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
// sample any point along the ray path in the vertex shader
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

// ─── GPU particle field flowing along the ray (matches Scene 2) ──────────────
// thousands of tiny glowing motes; all motion computed in the vertex shader from
// a baked spline texture so they flow downstream, sway, twinkle, fade in/out.
function ParticleField({ frames, revealRef, cfg }) {
  const sprite = useMemo(() => getSparkSprite(), []);
  const splineTex = useMemo(() => makeSplineTexture(frames), [frames]);

  const { geometry, material } = useMemo(() => {
    const n = cfg.count;
    const aSeed = new Float32Array(n);
    const aSpeed = new Float32Array(n);
    const aLateral = new Float32Array(n);
    const aSway = new Float32Array(n);
    const aSwaySpeed = new Float32Array(n);
    const aLift = new Float32Array(n);
    const aSize = new Float32Array(n);
    const aColor = new Float32Array(n * 3);
    const aTwSpeed = new Float32Array(n);
    const aPhase = new Float32Array(n);
    const centred = () => (Math.random() + Math.random() - 1);

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
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 8, -40), 400);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: 0.1 },
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
        attribute float aLift;
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
          float sway = aLateral + sin(uTime * aSwaySpeed + aPhase) * aSway;
          pos.x += right.x * sway;
          pos.z += right.y * sway;
          pos.y += 0.08 + abs(sin(uTime * 0.6 + aPhase)) * aLift;
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

const RAY_PARTICLE_LAYERS = [
  { count: 4200, sizeMin: 0.012, sizeMax: 0.045, lateralBand: 0.55, speedMin: 0.05, speedMax: 0.14, yLift: 0.18 },
  { count: 2600, sizeMin: 0.02, sizeMax: 0.06, lateralBand: 1.6, speedMin: 0.03, speedMax: 0.09, yLift: 0.4 },
  { count: 700, sizeMin: 0.03, sizeMax: 0.08, lateralBand: 0.9, speedMin: 0.14, speedMax: 0.3, yLift: 0.7 },
];

// ─── Edge sparkles clinging to the ray banks (matches Scene 2) ────────────────
function EdgeSparkles({ frames, revealRef }) {
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
      aSpeed[i] = 0.01 + Math.random() * 0.04;
      const sign = Math.random() < 0.5 ? -1 : 1;
      aLateral[i] = sign * (2.6 + Math.random() * 1.4);
      aSize[i] = 0.012 + Math.random() * 0.03;
      aTwSpeed[i] = 1.0 + Math.random() * 3.0;
      aPhase[i] = Math.random() * Math.PI * 2;
      const c = Math.random() < 0.5 ? C_OUTER : C_EDGE;
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
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 6, -40), 400);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: 0.1 },
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
          float flick = 1.0 + 0.12 * sin(uTime * aTwSpeed * 1.7 + aPhase);
          pos.x += right.x * aLateral * flick;
          pos.z += right.y * aLateral * flick;
          pos.y += 0.05;
          float headFade = smoothstep(0.0, 0.05, t);
          float tipFade  = 1.0 - smoothstep(uReveal - 0.05, uReveal, t);
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

// scroll → revealed fraction of the spline (the ray grows up and over the ridge)
function revealFromScroll(s) {
  const x = THREE.MathUtils.clamp(s, 0, 1);
  // start at 10% revealed (a small sprout at the bottom) and grow up to 100%,
  // instead of popping in already 40% grown in the centre
  const stops = [0.1, 0.3, 0.5, 0.7, 0.85, 1.0];
  const seg = x * (stops.length - 1);
  const i = Math.min(Math.floor(seg), stops.length - 2);
  const f = seg - i;
  return THREE.MathUtils.lerp(stops[i], stops[i + 1], f);
}

function ClimbingRay({ scrollRef, particleScale = 1 }) {
  const frames = useMemo(() => sampleRayFrames(), []);
  const revealRef = useRef(0.1); // match revealFromScroll's 10% start

  // bright white-hot core — gentle weave so the spine stays readable
  const coreGeo = useMemo(() => buildRibbonGeometry(frames, 0, 0.42), [frames]);
  const coreMat = useMemo(() => makeRibbonMaterial(C_CENTER.clone(), 0.85, 7.0, 0.18, 9.0, 0.0, 0.5), []);

  // 12 independent ribbons that weave / separate / merge / split / cross,
  // colour-graded inner → outer → deep edge (identical system to Scene 2)
  const ribbons = useMemo(() => {
    const N = 12;
    const out = [];
    for (let i = 0; i < N; i++) {
      const pair = Math.floor(i / 2) + 1;
      const sign = i % 2 === 0 ? 1 : -1;
      const baseOffset = sign * pair * 0.5 * (0.7 + Math.random() * 0.6);
      const dist = pair / (N / 2 + 1);
      const col = dist < 0.4 ? C_INNER.clone() : dist < 0.75 ? C_OUTER.clone() : C_EDGE.clone();
      // gentler opacity + glow so the outer strands read as soft glowing threads
      const opacity = THREE.MathUtils.lerp(0.34, 0.1, dist) * (0.8 + Math.random() * 0.4);
      const glow = THREE.MathUtils.lerp(2.2, 0.7, dist);
      const weaveAmp = 0.5 + Math.random() * 1.4;
      const weaveFreq = 3.0 + Math.random() * 6.0;
      const weavePhase = Math.random() * Math.PI * 2;
      const weaveSpeed = 0.25 + Math.random() * 0.7;
      out.push({
        // slightly wider ribbons → the soft gaussian rim has more room to feather
        geo: buildRibbonGeometry(frames, baseOffset, 0.07 + Math.random() * 0.04),
        mat: makeRibbonMaterial(col, opacity, glow, weaveAmp, weaveFreq, weavePhase, weaveSpeed),
      });
    }
    return out;
  }, [frames]);

  useFrame((_, dt) => {
    // reveal driven directly from the page's smoothed scroll (single smoothing
    // stage) so forward and reverse have identical speed/motion
    const reveal = revealFromScroll(scrollRef ? scrollRef.current : 0);
    revealRef.current = reveal;

    coreMat.uniforms.uTime.value += dt;
    coreMat.uniforms.uReveal.value = reveal;
    for (const r of ribbons) {
      r.mat.uniforms.uTime.value += dt;
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
        <ParticleField key={i} frames={frames} revealRef={revealRef} cfg={{ ...cfg, count: Math.max(1, Math.floor(cfg.count * particleScale)) }} />
      ))}
      <EdgeSparkles frames={frames} revealRef={revealRef} />
    </group>
  );
}

// ─── Sky (same gradient as Scene 2) ──────────────────────────────────────────

function Sky() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
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
      // near-black graded sky per spec: top #02050E, mid #05091A, horizon #0B1833
      vec3 cTop     = vec3(0.008, 0.020, 0.055);   // #02050E
      vec3 cMid     = vec3(0.020, 0.035, 0.102);   // #05091A
      vec3 cHorizon = vec3(0.043, 0.094, 0.200);   // #0B1833
      vec3 cFog     = vec3(0.047, 0.176, 0.341);   // #0C2D57 atmospheric fog
      void main() {
        float h = normalize(vWorldPos).y;
        float t = clamp(h, 0.0, 1.0);
        vec3 col = t < 0.10 ? mix(cHorizon, cMid, t / 0.10) : mix(cMid, cTop, (t - 0.10) / 0.90);
        // tight glow band hugging the horizon
        col += cHorizon * exp(-max(h, 0.0) * 20.0) * 0.30;
        // subtle atmospheric fog right at the horizon line
        col += cFog * exp(-abs(h) * 26.0) * 0.18;
        // overall exposure cut ~40% so the environment goes deep and dark
        col *= 0.60;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
  }), []);
  return (
    <mesh renderOrder={-10}>
      <sphereGeometry args={[400, 32, 16]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const count = 1200;
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
      <PointMaterial transparent color="#aac4e8" size={0.18} sizeAttenuation depthWrite={false} opacity={0.3} />
    </Points>
  );
}

function Lighting() {
  // PERF: skip real-time shadows on low-end devices (phones / weak GPUs).
  const { lowEnd } = useQuality();
  return (
    <>
      <ambientLight intensity={0.025} color="#0a1730" />
      {/* dim cool glow near the ray base — gives depth without daylight */}
      <pointLight position={[0, 6, -40]} intensity={160} distance={110} decay={2} color="#2f5fa8" />
      {/* soft cool MOONLIGHT key */}
      <directionalLight
        position={[0, 30, 10]}
        intensity={0.45}
        color="#7d9ccc"
        castShadow={!lowEnd}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-camera-near={1}
        shadow-camera-far={300}
        shadow-bias={-0.0005}
      />
      <hemisphereLight args={["#0e2c58", "#01030a", 0.1]} />
    </>
  );
}

// ─── Camera: zoom toward the front mountain, follow the ray up and over ───────
// Scroll 0 begins on the canyon (matching Scene 2's ending framing), then climbs
// the ray up the mountain face and crests over the ridge.

const _camPos = new THREE.Vector3();
const _camLook = new THREE.Vector3();
const _here = new THREE.Vector3();
const _ahead = new THREE.Vector3();

function ClimbCamera({ scrollRef }) {
  const par = useParallax();
  useFrame(({ camera }, dt) => {
    // drive the climb DIRECTLY from the page's already-smoothed scroll — the only
    // smoothing here is the single camera.position.lerp below, so forward and
    // reverse have identical speed/motion (no stacked second smoothing stage).
    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 15);
    const p = scrollRef ? THREE.MathUtils.clamp(scrollRef.current, 0, 1) : 0;
    const eased = p * p * (3 - 2 * p);

    // camera trails a point along the STRAIGHT centre path (x=0), so it climbs
    // dead-centre without inheriting the ray's left-right zig-zag. Symmetric
    // clamp bounds (same tiny epsilon both ends) so reverse releases exactly
    // where forward clamped — no hitch near the ridge top.
    const head = THREE.MathUtils.clamp(eased * 0.85, 0.0001, 0.9999);
    const look = THREE.MathUtils.clamp(head + 0.12, 0.0001, 0.9999);
    CAM_CURVE.getPointAt(head, _here);
    CAM_CURVE.getPointAt(look, _ahead);

    // altitude + distance behind the ray: start high & far (canyon overview),
    // tighten and lift as we climb so we crest the ridge looking forward/down
    const alt = THREE.MathUtils.lerp(16, 9, eased);
    const back = THREE.MathUtils.lerp(26, 12, eased);

    // opposite-direction mouse parallax: offset the target before the lerp
    const m = par.update(dt);
    _camPos.set(_here.x + m.x * PARALLAX_X, _here.y + alt - m.y * PARALLAX_Y, _here.z + back);
    camera.position.lerp(_camPos, k);

    _camLook.set(_ahead.x, _ahead.y + 1.5, _ahead.z);
    camera.lookAt(_camLook);
  });

  return null;
}

// ─── Scene 3 ──────────────────────────────────────────────────────────────────

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

export default function Scene3({ scrollRef }) {
  // PERF tier: low-end devices render at DPR 1, no antialias, no shadows.
  const { dpr, antialias, shadows, lowEnd, powerPreference, particleScale } = useQuality();
  return (
    <Canvas
      shadows={shadows}
      dpr={dpr}
      camera={{ position: [0, 16, 60], fov: 50, near: 0.1, far: 800 }}
      gl={{
        antialias,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.6, // exposure cut ~40% — deep cinematic grade
        powerPreference,
      }}
      style={{ width: "100%", height: "100%", background: "#02050E" }}
    >
      <fog attach="fog" args={["#081632", 40, 200]} />

      <ContextReleaser />
      <ClimbCamera scrollRef={scrollRef} />
      <Lighting />
      <Sky />
      <Stars />

      <SideMountain position={[-28, 0, -10]} side="left" seed={3311} lowEnd={lowEnd} />
      <SideMountain position={[28, 0, -10]} side="right" seed={7753} lowEnd={lowEnd} />
      <FrontMountain lowEnd={lowEnd} />

      <ClimbingRay scrollRef={scrollRef} particleScale={particleScale} />

      <EffectComposer multisampling={0}>
        {/* bloom tuned so only the bright additive ray blooms; near-black
            mountains (well below threshold) stay dark */}
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.85}
          intensity={1.5}
          radius={0.75}
          mipmapBlur
          resolutionScale={0.5}
        />
      </EffectComposer>
    </Canvas>
  );
}
