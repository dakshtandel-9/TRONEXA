"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useParallax, PARALLAX_X, PARALLAX_Y } from "./useParallax";

// ─────────────────────────────────────────────────────────────────────────────
// Scene 5 — a futuristic intelligent city viewed from a mountain valley at night.
// A LIVING DIGITAL ECOSYSTEM: hundreds of tiny glowing nodes wired together by a
// dense web of thin curved energy connections, with thousands of particles
// flowing along the network. The premium fiber-optic ray language (white core,
// blue outer edge, weaving strands, soft bloom) is shared with Scenes 2/3/4.
//
// Camera, scene layout, composition, scene order and UI are PRESERVED — only the
// environment, network, lighting, atmosphere and ray system are rebuilt.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Noise + fBm (same family as Scene 1 / 3 / 4) ────────────────────────────

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

// ─── Shared palette (matches Scene 2/3/4) ────────────────────────────────────
//   center #FFFFFF · inner #BEEFFF · middle #79D8FF · outer #3BAFFF · fade #0B3C8D
const C_CENTER = new THREE.Color("#FFFFFF");
const C_INNER = new THREE.Color("#BEEFFF");
const C_MIDDLE = new THREE.Color("#79D8FF");
const C_OUTER = new THREE.Color("#3BAFFF");
const C_FADE = new THREE.Color("#0B3C8D");
// node + particle palette
const NODE_COLORS = [
  new THREE.Color("#FFFFFF"),
  new THREE.Color("#BEEFFF"),
  new THREE.Color("#79D8FF"),
  new THREE.Color("#3BAFFF"),
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

// ─── Rock textures (almost black — terrain hides in darkness) ────────────────

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
      // ALMOST BLACK rock (≈ #04070F) lifting only faintly on raised grain
      const lit = v * 0.9 + 0.1;
      cimg.data[idx] = (4 + lit * 6) | 0;
      cimg.data[idx + 1] = (7 + lit * 11) | 0;
      cimg.data[idx + 2] = (15 + lit * 24) | 0;
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

// ─── Flat basin floor (preserved layout; only darkened to near-black) ────────

function Ground() {
  const { colorMap, bumpMap } = useMemo(() => getRockTextures(), []);
  const geo = useMemo(() => {
    const noise = makeNoise(2024);
    const g = new THREE.PlaneGeometry(400, 400, 200, 200);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      let h = (fbm(noise, x * 0.01, z * 0.01) + 0.5) * 1.2;
      const far = THREE.MathUtils.clamp((-z - 120) / 80, 0, 1);
      const hill = (fbm(noise, x * 0.012 + 20, z * 0.012 + 20) + 0.5) * 10;
      h += hill * far * far;
      pos.setY(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} position={[0, 0, -40]} receiveShadow>
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={1.2}
        color="#04070F"
        roughness={0.99}
        metalness={0.0}
      />
    </mesh>
  );
}

// ─── Large dark foreground hills framing the city (left + right) ──────────────
// Mostly black; only catch the network's blue rim light. They partially hide the
// lower network on each side so the city reads as nestled in a valley.

function ForegroundHill({ side, seed }) {
  const { colorMap, bumpMap } = useMemo(() => getRockTextures(), []);
  const geo = useMemo(() => {
    const noise = makeNoise(seed);
    const g = new THREE.PlaneGeometry(180, 200, 90, 90);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      let h = (fbm(noise, x * 0.014, z * 0.014) + 0.5) * 16 + 4;
      const ridge = 1.0 - Math.abs(fbm(noise, x * 0.025 + 40, z * 0.025 + 40));
      h += ridge * ridge * 8;
      // mask: tall on the OUTER edge, falling to 0 toward the valley centre so the
      // hill frames the city without covering it
      const inner = side === "left"
        ? THREE.MathUtils.clamp((-x - 6) / 26, 0, 1)
        : THREE.MathUtils.clamp((x - 6) / 26, 0, 1);
      const mask = inner * inner * (3 - 2 * inner);
      h *= mask;
      pos.setY(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, [side, seed]);

  const xPos = side === "left" ? -78 : 78;
  return (
    <mesh geometry={geo} position={[xPos, 0, 14]} receiveShadow castShadow>
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={1.6}
        color="#03060C"
        roughness={0.99}
        metalness={0.0}
      />
    </mesh>
  );
}

// ─── Sky (near-black graded, spec colours + subtle horizon glow) ─────────────

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
      // top #02040C · middle #050A18 · horizon #10305A
      vec3 cTop     = vec3(0.008, 0.016, 0.047);
      vec3 cMid     = vec3(0.020, 0.039, 0.094);
      vec3 cHorizon = vec3(0.063, 0.188, 0.353);
      vec3 cFog     = vec3(0.051, 0.176, 0.333); // #0D2D55 horizon haze
      void main() {
        float h = normalize(vWorldPos).y;
        float t = clamp(h, 0.0, 1.0);
        vec3 col = t < 0.10 ? mix(cHorizon, cMid, t / 0.10) : mix(cMid, cTop, (t - 0.10) / 0.90);
        // subtle blue glow near the horizon
        col += cHorizon * exp(-max(h, 0.0) * 18.0) * 0.32;
        col += cFog * exp(-abs(h) * 26.0) * 0.18;
        col *= 0.62; // reduced exposure
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

// ─── Stars: 300–500 tiny, dim, very slowly twinkling ──────────────────────────

function Stars() {
  const sprite = useMemo(() => getSparkSprite(), []);
  const { geometry, material } = useMemo(() => {
    const n = 420;
    const pos = new Float32Array(n * 3);
    const aSize = new Float32Array(n);
    const aBright = new Float32Array(n);
    const aTwSpeed = new Float32Array(n);
    const aPhase = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.42;
      const r = 200 + Math.random() * 120;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 40;
      aSize[i] = 0.6 + Math.random() * 1.4;
      aBright[i] = 0.12 + Math.random() * 0.35;       // dim, random
      aTwSpeed[i] = 0.15 + Math.random() * 0.4;       // very slow twinkle
      aPhase[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute("aBright", new THREE.BufferAttribute(aBright, 1));
    geo.setAttribute("aTwSpeed", new THREE.BufferAttribute(aTwSpeed, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uSprite: { value: sprite } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime;
        attribute float aSize; attribute float aBright;
        attribute float aTwSpeed; attribute float aPhase;
        varying float vBright;
        void main() {
          float tw = 0.7 + 0.3 * sin(uTime * aTwSpeed + aPhase);
          vBright = aBright * tw;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * 300.0 / max(-mv.z, 0.001);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uSprite; varying float vBright;
        void main() {
          float a = texture2D(uSprite, gl_PointCoord).a;
          gl_FragColor = vec4(vec3(0.75, 0.85, 1.0) * vBright * a, a * vBright);
        }
      `,
    });
    return { geometry: geo, material: mat };
  }, [sprite]);
  useFrame((s) => { material.uniforms.uTime.value = s.clock.elapsedTime; });
  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

// ─── Digital city network ─────────────────────────────────────────────────────
// A node graph spread across the basin floor. Nearby nodes are wired into 400–800
// gently-curved connections. The dense web is drawn as crisp thin additive LINES
// (1–3px). A subset of "hero" connections also get the full weaving ray-ribbon
// material so the premium fiber-optic language reads clearly. Particles flow along
// every connection; glowing node sprites pulse/flicker on top.

const CITY = {
  nodeCount: 460,   // PERF: trimmed base scatter (connection pass is O(n²))
  spanX: 320,
  zNear: 12,
  zFar: -180,
  floorY: 0.2,
};

// build nodes + a connection list (each connection = pair of node indices + a
// gently bowed mid control point so the link curves rather than running straight)
function buildNetwork() {
  let s = 9911;
  const rng = () => (s = (s * 16807) % 2147483647) / 2147483647;

  // ALL nodes are concentrated in the NEAR-FOREGROUND zone that maps to the
  // selected lower region of the frame (close to the camera, lower on screen,
  // biased centre→right). Nothing stretches back to the horizon any more, so the
  // whole network + models sit inside that selected area.
  //   Z: zNear (+12, closest) → -65 (mid-foreground)
  //   X: centre-weighted, nudged slightly to the RIGHT to match the selection
  const ZONE_ZNEAR = CITY.zNear;
  const ZONE_ZFAR = -65;
  const ZONE_XBIAS = 24;        // shift the cloud right
  const ZONE_HALFW = CITY.spanX * 0.34;

  const nodes = [];
  // PERF: ~800 nodes total in the zone (down from ~1100) — fewer nodes makes the
  // neighbour search and all the per-node rendering cheaper.
  const total = Math.floor(CITY.nodeCount * 1.7);
  for (let i = 0; i < total; i++) {
    const z = THREE.MathUtils.lerp(ZONE_ZNEAR, ZONE_ZFAR, rng());
    // triangular distribution → densest toward the centre of the zone
    const x = ZONE_XBIAS + (rng() + rng() - 1) * ZONE_HALFW;
    const y = CITY.floorY + rng() * 0.5;
    nodes.push(new THREE.Vector3(x, y, z));
  }

  // PERF: spatial-grid nearest-neighbour search → O(n) instead of the old O(n²)
  // double loop. We bucket nodes into a grid of CELL-sized cells and only test
  // nodes in the 3×3 neighbouring cells, which is what eliminated the mount freeze.
  const CELL = 30;
  const REACH2 = 115 * 115;
  const grid = new Map();
  const key2 = (cx, cz) => cx * 100000 + cz;
  for (let i = 0; i < nodes.length; i++) {
    const cx = Math.floor(nodes[i].x / CELL);
    const cz = Math.floor(nodes[i].z / CELL);
    const k = key2(cx, cz);
    let arr = grid.get(k);
    if (!arr) { arr = []; grid.set(k, arr); }
    arr.push(i);
  }

  const conns = [];
  const seen = new Set();
  const cand = [];
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    const cx = Math.floor(a.x / CELL);
    const cz = Math.floor(a.z / CELL);
    cand.length = 0;
    for (let gx = cx - 1; gx <= cx + 1; gx++) {
      for (let gz = cz - 1; gz <= cz + 1; gz++) {
        const arr = grid.get(key2(gx, gz));
        if (!arr) continue;
        for (const j of arr) {
          if (j === i) continue;
          const d = a.distanceToSquared(nodes[j]);
          if (d <= REACH2) cand.push([d, j]);
        }
      }
    }
    cand.sort((p, q) => p[0] - q[0]);
    const links = 3 + ((rng() * 4) | 0); // 3–6 links → a dense web
    for (let k = 0; k < links && k < cand.length; k++) {
      const j = cand[k][1];
      const mk = i < j ? i * 100000 + j : j * 100000 + i;
      if (seen.has(mk)) continue;
      seen.add(mk);
      const b = nodes[j];
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const dir = b.clone().sub(a);
      const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
      mid.addScaledVector(perp, (rng() - 0.5) * dir.length() * 0.22);
      mid.y += 0.05 + rng() * 0.25;
      conns.push({ a, b, mid });
    }
    if (conns.length >= 1800) break;
  }
  return { nodes, conns };
}

// thin additive line shader: crisp 1px lines, white-ish hot core feel via a
// per-vertex brightness + a slow travelling shimmer. Farther links are darker /
// less saturated (atmospheric perspective baked into the vertex colour).
function makeNetworkLines(conns) {
  const SEG = 14; // points per curve → smooth gentle curves
  const positions = [];
  const colors = [];
  const aDist = [];   // 0..1 along path (for the shimmer)
  const aDepth = [];  // 0..1 far-ness for fading
  const tmp = new THREE.Vector3();
  const curve = new THREE.QuadraticBezierCurve3();

  for (const c of conns) {
    curve.v0.copy(c.a); curve.v1.copy(c.mid); curve.v2.copy(c.b);
    // depth factor from the connection's average Z (near=0 → far=1)
    const avgZ = (c.a.z + c.b.z) * 0.5;
    const depth = THREE.MathUtils.clamp((CITY.zNear - avgZ) / (CITY.zNear - CITY.zFar), 0, 1);
    // colour graded near→far: cyan-white near, deep blue far (atmospheric)
    const near = C_MIDDLE, far = C_FADE;
    for (let i = 0; i < SEG; i++) {
      const t0 = i / SEG, t1 = (i + 1) / SEG;
      curve.getPoint(t0, tmp); positions.push(tmp.x, tmp.y, tmp.z);
      curve.getPoint(t1, tmp); positions.push(tmp.x, tmp.y, tmp.z);
      for (let e = 0; e < 2; e++) {
        const col = near.clone().lerp(far, depth * 0.85);
        colors.push(col.r, col.g, col.b);
        aDist.push(i / SEG);
        aDepth.push(depth);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute("aDist", new THREE.Float32BufferAttribute(aDist, 1));
  geo.setAttribute("aDepth", new THREE.Float32BufferAttribute(aDepth, 1));

  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `
      uniform float uTime;
      attribute vec3 color;
      attribute float aDist;
      attribute float aDepth;
      varying vec3 vColor;
      varying float vBright;
      void main() {
        vColor = color;
        // base dimness + travelling shimmer pulses along the link; far links dim
        float shimmer = 0.5 + 0.5 * sin(aDist * 12.0 - uTime * 2.0);
        float depthFade = mix(1.0, 0.25, aDepth);
        vBright = (0.28 + shimmer * 0.5) * depthFade;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vBright;
      void main() {
        gl_FragColor = vec4(vColor * vBright, vBright);
      }
    `,
  });
  return new THREE.LineSegments(geo, mat);
}

// ─── Hero ray ribbons on a subset of connections (the premium fiber look) ─────
// Same weaving / Gaussian-edge / V-tip ribbon material established in Scene 4,
// applied to a handful of the longest, most central connections so the network
// clearly shares the ray language without rendering thousands of meshes.

const HERO_SAMPLES = 80;

function buildHeroRibbon(curve, offset, halfWidth) {
  const verts = [], uvs = [], aRight = [], indices = [];
  const up = new THREE.Vector3(0, 1, 0);
  const pos = new THREE.Vector3(), tan = new THREE.Vector3(), right = new THREE.Vector3();
  for (let i = 0; i <= HERO_SAMPLES; i++) {
    const t = i / HERO_SAMPLES;
    curve.getPoint(t, pos);
    curve.getTangent(t, tan); tan.normalize();
    right.crossVectors(tan, up).normalize();
    const cx = pos.x + right.x * offset, cy = pos.y + right.y * offset, cz = pos.z + right.z * offset;
    verts.push(cx - right.x * halfWidth, cy - right.y * halfWidth, cz - right.z * halfWidth);
    uvs.push(0, t); aRight.push(right.x, right.y, right.z);
    verts.push(cx + right.x * halfWidth, cy + right.y * halfWidth, cz + right.z * halfWidth);
    uvs.push(1, t); aRight.push(right.x, right.y, right.z);
  }
  for (let i = 0; i < HERO_SAMPLES; i++) {
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

function makeHeroMaterial(color, baseOpacity, glow, weaveAmp, weaveFreq, weavePhase, weaveSpeed) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }, uColor: { value: color }, uOpacity: { value: baseOpacity },
      uGlow: { value: glow }, uWeaveAmp: { value: weaveAmp }, uWeaveFreq: { value: weaveFreq },
      uWeavePhase: { value: weavePhase }, uWeaveSpeed: { value: weaveSpeed },
    },
    vertexShader: `
      uniform float uTime, uWeaveAmp, uWeaveFreq, uWeavePhase, uWeaveSpeed;
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
    fragmentShader: `
      uniform float uTime, uOpacity, uGlow;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        float d = abs(vUv.x - 0.5) * 2.0;
        float edge = exp(-d * d * 4.5);
        float softEdge = smoothstep(1.0, 0.0, d);
        float flow = vUv.y * 6.0 + uTime * 0.6;
        float bands = 0.55 + 0.45 * sin(flow * 3.14159);
        float pulse = pow(0.5 + 0.5 * sin(vUv.y * 30.0 - uTime * 2.0), 4.0);
        float tail = smoothstep(0.0, 0.08, vUv.y) * (1.0 - smoothstep(0.92, 1.0, vUv.y));
        float intensity = edge * (bands + pulse * 0.5) * uGlow * tail;
        float alpha = uOpacity * edge * softEdge * tail;
        gl_FragColor = vec4(uColor * intensity, alpha);
      }
    `,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  });
}

function HeroConnection({ curve }) {
  const matsRef = useRef([]);
  const meshes = useMemo(() => {
    const out = [];
    // very thin white-hot core
    out.push({
      geo: buildHeroRibbon(curve, 0, 0.018),
      mat: makeHeroMaterial(C_CENTER.clone(), 0.8, 5.0, 0.03, 8.0, Math.random() * 6.28, 0.5),
    });
    // 18 ultra-thin weaving strands, graded inner→fade
    const N = 12; // PERF: fewer strands per hero connection
    for (let i = 0; i < N; i++) {
      const pair = Math.floor(i / 2) + 1;
      const sign = i % 2 === 0 ? 1 : -1;
      const offset = sign * pair * 0.02 * (0.6 + Math.random() * 0.8);
      const dist = pair / (N / 2 + 1);
      const col = dist < 0.3 ? C_INNER.clone() : dist < 0.6 ? C_MIDDLE.clone() : dist < 0.85 ? C_OUTER.clone() : C_FADE.clone();
      const opacity = THREE.MathUtils.lerp(0.3, 0.07, dist) * (0.8 + Math.random() * 0.4);
      const glow = THREE.MathUtils.lerp(1.8, 0.5, dist);
      out.push({
        geo: buildHeroRibbon(curve, offset, 0.012 + Math.random() * 0.012),
        mat: makeHeroMaterial(col, opacity, glow, 0.06 + Math.random() * 0.25, 3 + Math.random() * 7, Math.random() * 6.28, 0.2 + Math.random() * 0.8),
      });
    }
    return out;
  }, [curve]);
  matsRef.current = meshes.map((m) => m.mat);

  useFrame((_, dt) => {
    for (const m of matsRef.current) m.uniforms.uTime.value += dt * 1.4;
  });

  return (
    <group renderOrder={4}>
      {meshes.map((m, i) => (
        <mesh key={i} geometry={m.geo}><primitive object={m.mat} attach="material" /></mesh>
      ))}
    </group>
  );
}

// ─── Glowing node sprites (pulse / flicker / constant) ───────────────────────

function Nodes({ nodes }) {
  const sprite = useMemo(() => getSparkSprite(), []);
  const { geometry, material } = useMemo(() => {
    const n = nodes.length;
    const pos = new Float32Array(n * 3);
    const aSize = new Float32Array(n);
    const aColor = new Float32Array(n * 3);
    const aBright = new Float32Array(n);
    const aMode = new Float32Array(n);     // 0 const · 1 pulse · 2 flicker
    const aSpeed = new Float32Array(n);
    const aPhase = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = nodes[i].x; pos[i * 3 + 1] = nodes[i].y; pos[i * 3 + 2] = nodes[i].z;
      // depth-aware size: nearer nodes bigger (4–18px range)
      const depth = THREE.MathUtils.clamp((CITY.zNear - nodes[i].z) / (CITY.zNear - CITY.zFar), 0, 1);
      aSize[i] = THREE.MathUtils.lerp(0.13, 0.04, depth) * (0.6 + Math.random() * 0.9);
      const c = NODE_COLORS[(Math.random() * NODE_COLORS.length) | 0];
      aColor[i * 3] = c.r; aColor[i * 3 + 1] = c.g; aColor[i * 3 + 2] = c.b;
      aBright[i] = (0.4 + Math.random() * 0.6) * (1.0 - depth * 0.6);
      const r = Math.random();
      aMode[i] = r < 0.45 ? 1 : r < 0.7 ? 2 : 0; // some pulse, some flicker, rest const
      aSpeed[i] = 0.5 + Math.random() * 2.5;
      aPhase[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
    geo.setAttribute("aBright", new THREE.BufferAttribute(aBright, 1));
    geo.setAttribute("aMode", new THREE.BufferAttribute(aMode, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uSprite: { value: sprite } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime;
        attribute float aSize; attribute vec3 aColor; attribute float aBright;
        attribute float aMode; attribute float aSpeed; attribute float aPhase;
        varying vec3 vColor; varying float vBright;
        void main() {
          float b = aBright;
          if (aMode > 1.5) {
            // flicker: sharp random-ish bursts
            float f = pow(0.5 + 0.5 * sin(uTime * aSpeed * 2.3 + aPhase), 6.0);
            b *= 0.5 + 0.6 * f;
          } else if (aMode > 0.5) {
            // smooth pulse
            b *= 0.6 + 0.4 * sin(uTime * aSpeed + aPhase);
          }
          vBright = b; vColor = aColor;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * 900.0 / max(-mv.z, 0.001);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uSprite; varying vec3 vColor; varying float vBright;
        void main() {
          float a = texture2D(uSprite, gl_PointCoord).a;
          gl_FragColor = vec4(vColor * vBright * a, a * vBright);
        }
      `,
    });
    return { geometry: geo, material: mat };
  }, [nodes, sprite]);
  useFrame((s) => { material.uniforms.uTime.value = s.clock.elapsedTime; });
  return <points geometry={geometry} material={material} frustumCulled={false} renderOrder={5} />;
}

// ─── Flowing particles travelling along the network connections ───────────────
// Each particle rides a randomly-assigned connection (quadratic bezier), looping;
// some detach near the end and drift before fading. ~12,000 total motes.

function NetworkParticles({ conns }) {
  const sprite = useMemo(() => getSparkSprite(), []);
  const COUNT = 3500; // PERF: fewer particles → much less additive overdraw

  const { geometry, material, segTex, segCount } = useMemo(() => {
    // pack each connection's 3 control points into a texture (3 texels per conn)
    // cap at 1300 → DataTexture width = 1300*3 = 3900 texels, safely under the
    // common 4096 GPU max-texture-size limit
    const m = Math.min(conns.length, 1300);
    const data = new Float32Array(m * 3 * 4);
    for (let i = 0; i < m; i++) {
      const c = conns[i];
      const o = i * 3 * 4;
      data[o + 0] = c.a.x; data[o + 1] = c.a.y; data[o + 2] = c.a.z; data[o + 3] = 1;
      data[o + 4] = c.mid.x; data[o + 5] = c.mid.y; data[o + 6] = c.mid.z; data[o + 7] = 1;
      data[o + 8] = c.b.x; data[o + 9] = c.b.y; data[o + 10] = c.b.z; data[o + 11] = 1;
    }
    const tex = new THREE.DataTexture(data, m * 3, 1, THREE.RGBAFormat, THREE.FloatType);
    tex.minFilter = tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;

    const aConn = new Float32Array(COUNT);
    const aSeed = new Float32Array(COUNT);
    const aSpeed = new Float32Array(COUNT);
    const aSize = new Float32Array(COUNT);
    const aColor = new Float32Array(COUNT * 3);
    const aTwSpeed = new Float32Array(COUNT);
    const aPhase = new Float32Array(COUNT);
    const aDetach = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      aConn[i] = (Math.random() * m) | 0;
      aSeed[i] = Math.random();
      aSpeed[i] = 0.1 + Math.random() * 0.35;
      aSize[i] = 0.01 + Math.random() * 0.03;
      const c = NODE_COLORS[(Math.random() * NODE_COLORS.length) | 0];
      aColor[i * 3] = c.r; aColor[i * 3 + 1] = c.g; aColor[i * 3 + 2] = c.b;
      aTwSpeed[i] = 0.6 + Math.random() * 2.4;
      aPhase[i] = Math.random() * Math.PI * 2;
      aDetach[i] = Math.random() < 0.16 ? (0.3 + Math.random() * 1.0) : 0.0;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    geo.setAttribute("aConn", new THREE.BufferAttribute(aConn, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
    geo.setAttribute("aTwSpeed", new THREE.BufferAttribute(aTwSpeed, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    geo.setAttribute("aDetach", new THREE.BufferAttribute(aDetach, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -60), 400);

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 }, uSprite: { value: sprite },
        uSeg: { value: tex }, uSegCount: { value: m },
      },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime; uniform sampler2D uSeg; uniform float uSegCount;
        attribute float aConn; attribute float aSeed; attribute float aSpeed;
        attribute float aSize; attribute vec3 aColor; attribute float aTwSpeed;
        attribute float aPhase; attribute float aDetach;
        varying vec3 vColor; varying float vBright;
        vec3 fetch(float conn, float which) {
          float u = (conn * 3.0 + which + 0.5) / (uSegCount * 3.0);
          return texture2D(uSeg, vec2(u, 0.5)).xyz;
        }
        void main() {
          float life = fract(aSeed + uTime * aSpeed);
          vec3 p0 = fetch(aConn, 0.0);
          vec3 p1 = fetch(aConn, 1.0);
          vec3 p2 = fetch(aConn, 2.0);
          float t = life;
          // quadratic bezier
          float mt = 1.0 - t;
          vec3 pos = mt * mt * p0 + 2.0 * mt * t * p1 + t * t * p2;
          // occasional detach near the end of life → drift upward + outward
          float det = aDetach * smoothstep(0.75, 1.0, life);
          pos.y += det * 0.6;
          pos.x += det * (sin(aPhase) * 0.5);
          float fadeIn = smoothstep(0.0, 0.06, life);
          float fadeOut = 1.0 - smoothstep(0.85, 1.0, life);
          float tw = 0.55 + 0.45 * sin(uTime * aTwSpeed + aPhase);
          vBright = fadeIn * fadeOut * tw;
          vColor = aColor;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * 900.0 / max(-mv.z, 0.001);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uSprite; varying vec3 vColor; varying float vBright;
        void main() {
          float a = texture2D(uSprite, gl_PointCoord).a;
          gl_FragColor = vec4(vColor * vBright * a, a * vBright);
        }
      `,
    });
    return { geometry: geo, material: mat, segTex: tex, segCount: m };
  }, [conns, sprite]);

  useFrame((s) => { material.uniforms.uTime.value = s.clock.elapsedTime; });
  return <points geometry={geometry} material={material} frustumCulled={false} renderOrder={4} />;
}

// ─── Hero-model landmarks (the glowing paneled structure from Scene 1) ───────
// A few instances of the Scene-1 hero model rise out of the city as glowing
// landmark buildings, scattered through the network. Same paneled glassy-blue
// material + emissive glow so they read as part of the same world. Each clones
// the loaded GLB (so it can appear multiple times) and slowly rotates + hovers.

// paneled box texture for the hero model (ported from Scene 1)
function makePanelTextures() {
  const size = 512;
  const colorCanvas = document.createElement("canvas");
  const bumpCanvas = document.createElement("canvas");
  colorCanvas.width = colorCanvas.height = size;
  bumpCanvas.width = bumpCanvas.height = size;
  const cctx = colorCanvas.getContext("2d");
  const bctx = bumpCanvas.getContext("2d");
  cctx.fillStyle = "#3b82f6"; cctx.fillRect(0, 0, size, size);
  bctx.fillStyle = "#808080"; bctx.fillRect(0, 0, size, size);
  const panels = [];
  const split = (r, depth) => {
    if (depth <= 0 || (r.w < 60 && r.h < 60)) { panels.push(r); return; }
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
    cctx.strokeStyle = "rgba(10,40,110,0.55)"; cctx.lineWidth = 2;
    cctx.strokeRect(p.x + 1, p.y + 1, p.w - 2, p.h - 2);
    const bv = 110 + Math.random() * 40;
    bctx.fillStyle = `rgb(${bv | 0},${bv | 0},${bv | 0})`;
    bctx.fillRect(p.x, p.y, p.w, p.h);
    bctx.strokeStyle = "#202020"; bctx.lineWidth = 3;
    bctx.strokeRect(p.x + 1.5, p.y + 1.5, p.w - 3, p.h - 3);
  }
  const colorMap = new THREE.CanvasTexture(colorCanvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
  return { colorMap, bumpMap };
}

// 16 landmark structures, all placed inside the SAME near-foreground zone as the
// network (close to the camera, lower on screen, centre→right biased) so every
// triangle sits inside the selected area.
const LANDMARKS = (() => {
  let s = 4242;
  const rng = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const out = [];
  for (let i = 0; i < 16; i++) {
    const z = THREE.MathUtils.lerp(8, -62, rng());            // near foreground
    const x = 24 + (rng() + rng() - 1) * CITY.spanX * 0.34;   // centre→right cloud
    const near = THREE.MathUtils.clamp(1 - (-z) / 70, 0, 1);
    const scale = THREE.MathUtils.lerp(1.2, 2.6, near) * (0.8 + rng() * 0.4);
    const spin = (rng() - 0.5) * 0.3;
    out.push({ pos: [x, 0.2, z], scale, spin });
  }
  return out;
})();

// PERF: ONE shared paneled material + geometry for every landmark. Building 55
// separate canvas textures + physical materials was the heaviest cost in the
// scene; now we generate the texture once and reuse a single (cheaper) standard
// material across all clones.
function HeroLandmarks() {
  const { scene } = useGLTF("/HeroModul-opt.glb", "/draco/");
  // one texture + one material shared by every landmark
  const material = useMemo(() => {
    const { colorMap, bumpMap } = makePanelTextures();
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x3b82f6),
      map: colorMap, bumpMap, bumpScale: 1.0,
      emissive: new THREE.Color(0x42a7ff),
      emissiveMap: colorMap,
      emissiveIntensity: 2.6,
      metalness: 0.0, roughness: 0.3,
      transparent: true, opacity: 0.96,
    });
  }, []);

  // build all clones once + remember their per-instance animation params
  const items = useMemo(() => {
    return LANDMARKS.map((l) => {
      const obj = SkeletonUtils.clone(scene);
      obj.traverse((c) => { if (c.isMesh) c.material = material; });
      return { obj, ...l, phase: Math.random() * Math.PI * 2 };
    });
  }, [scene, material]);

  const groupRef = useRef(null);
  // PERF: ONE useFrame drives all 16 landmarks instead of 16 separate callbacks
  useFrame((state, dt) => {
    const g = groupRef.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < g.children.length; i++) {
      const child = g.children[i];
      const it = items[i];
      child.rotation.y += it.spin * dt;
      child.position.y = it.pos[1] + it.scale * 1.2 + Math.sin(t * 0.5 + it.phase) * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((it, i) => (
        <group key={i} position={[it.pos[0], it.pos[1] + it.scale * 1.2, it.pos[2]]} scale={it.scale}>
          <primitive object={it.obj} />
        </group>
      ))}
    </group>
  );
}

useGLTF.preload("/HeroModul-opt.glb", "/draco/");

// ─── Network assembly ─────────────────────────────────────────────────────────

function Network() {
  // lines removed per request — keep only the node graph for the particles to
  // ride along (the connections are still computed but not drawn), plus the
  // glowing nodes. No connection web, no hero ray ribbons.
  const { nodes, conns } = useMemo(() => buildNetwork(), []);

  return (
    <group>
      <NetworkParticles conns={conns} />
      <Nodes nodes={nodes} />
    </group>
  );
}

// ─── Three layers of volumetric blue fog (subtle, depth only) ────────────────

let _fogSprite = null;
function getFogSprite() {
  if (_fogSprite) return _fogSprite;
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0.0, "rgba(255,255,255,0.55)");
  g.addColorStop(0.5, "rgba(255,255,255,0.18)");
  g.addColorStop(1.0, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  _fogSprite = new THREE.CanvasTexture(c);
  return _fogSprite;
}

function FogLayer({ y, z, width, height, opacity, driftX }) {
  const sprite = useMemo(() => getFogSprite(), []);
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.x = Math.sin(state.clock.elapsedTime * driftX) * 8;
  });
  return (
    <mesh ref={ref} position={[0, y, z]} renderOrder={-5}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={sprite} color="#0D2D55" transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function VolumetricFog() {
  return (
    <>
      {/* low fog across the valley */}
      <FogLayer y={3} z={-40} width={260} height={36} opacity={0.09} driftX={0.04} />
      {/* medium fog around the city */}
      <FogLayer y={10} z={-100} width={340} height={60} opacity={0.07} driftX={0.03} />
      {/* distant blue haze near the horizon */}
      <FogLayer y={20} z={-170} width={420} height={90} opacity={0.06} driftX={0.02} />
    </>
  );
}

// ─── Lighting: subtle blue rim only; the rest stays almost black ─────────────

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.03} color="#0a1730" />
      {/* a few low blue point lights scattered through the city give the nearby
          terrain a soft blue rim; short reach so most of the floor stays black */}
      <pointLight position={[-30, 4, -10]} intensity={120} distance={70} decay={2} color="#3bafff" />
      <pointLight position={[20, 4, -50]} intensity={120} distance={70} decay={2} color="#79d8ff" />
      <pointLight position={[0, 4, -110]} intensity={90} distance={90} decay={2} color="#3bafff" />
      <hemisphereLight args={["#0c2545", "#01030a", 0.08]} />
    </>
  );
}

// ─── Camera: aerial glide for the first ~60% of the scroll, then RISE & TILT
// into a straight-down drone view over the city for the final stretch ─────────

const _camPos = new THREE.Vector3();
const _camLook = new THREE.Vector3();

// single-phase aerial glide across the whole scroll — no drone / top-down view
function AerialCamera({ scrollRef }) {
  const par = useParallax();
  useFrame(({ camera }, dt) => {
    const p = scrollRef ? THREE.MathUtils.clamp(scrollRef.current, 0, 1) : 0;
    const eased = p * p * (3 - 2 * p);
    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 15);
    const m = par.update(dt);

    const y = THREE.MathUtils.lerp(16, 28, eased);
    const z = THREE.MathUtils.lerp(50, -12, eased);
    const x = THREE.MathUtils.lerp(-6, 6, eased);
    _camPos.set(x + m.x * PARALLAX_X, y - m.y * PARALLAX_Y, z);
    camera.position.lerp(_camPos, k);

    _camLook.set(x * 0.3, -2, -90);
    camera.lookAt(_camLook);
  });
  return null;
}

// ─── Scene 5 ──────────────────────────────────────────────────────────────────

export default function Scene5({ scrollRef }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1]}
      camera={{ position: [-6, 10, 40], fov: 58, near: 0.1, far: 800 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.62, // reduced exposure — deep cinematic grade
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", background: "#02040C" }}
    >
      {/* three-layer volumetric depth handled by fog + the haze sprites below */}
      <fog attach="fog" args={["#0D2D55", 50, 240]} />

      <AerialCamera scrollRef={scrollRef} />
      <Lighting />
      <Sky />
      <Stars />
      <VolumetricFog />

      <Ground />
      <ForegroundHill side="left" seed={3311} />
      <ForegroundHill side="right" seed={7753} />

      {/* glowing nodes + flowing particles only — connection lines and the hero
          models were removed per request */}
      <Network />

      {/* PERF: lean post chain on the heaviest scene — only Bloom + Vignette.
          ChromaticAberration + Noise (extra fullscreen passes) dropped here. */}
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.55}
          luminanceSmoothing={0.75}
          intensity={0.6}
          radius={0.5}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.3} darkness={0.78} />
      </EffectComposer>
    </Canvas>
  );
}
