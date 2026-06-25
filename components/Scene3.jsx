"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useParallax, PARALLAX_X, PARALLAX_Y } from "./useParallax";

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

      const lit = v * 0.9 + 0.1;
      cimg.data[idx] = (12 + lit * 22) | 0;
      cimg.data[idx + 1] = (24 + lit * 40) | 0;
      cimg.data[idx + 2] = (55 + lit * 75) | 0;
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

function FrontMountain() {
  const { colorMap, bumpMap } = useMemo(() => getRockTextures(), []);
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
        bumpScale={1.5}
        color="#050a16"
        roughness={0.95}
        metalness={0.05}
      />
    </mesh>
  );
}

// ─── Side mountains flanking the climbing channel ─────────────────────────────

function SideMountain({ position, side, seed }) {
  const { colorMap, bumpMap } = useMemo(() => getRockTextures(), []);
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
        bumpScale={1.5}
        color="#050a16"
        roughness={0.95}
        metalness={0.05}
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

function buildRibbonGeometry(frames, offset, halfWidth) {
  const verts = [];
  const uvs = [];
  const indices = [];
  for (let i = 0; i <= RAY_SAMPLES; i++) {
    const f = frames[i];
    const cx = f.pos.x + f.right.x * offset;
    const cz = f.pos.z + f.right.z * offset;
    const v = i / RAY_SAMPLES;
    verts.push(cx - f.right.x * halfWidth, f.pos.y, cz - f.right.z * halfWidth);
    uvs.push(0, v);
    verts.push(cx + f.right.x * halfWidth, f.pos.y, cz + f.right.z * halfWidth);
    uvs.push(1, v);
  }
  for (let i = 0; i < RAY_SAMPLES; i++) {
    const a = i * 2;
    indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices);
  return g;
}

function makeRibbonMaterial(color, baseOpacity, glow) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: color },
      uOpacity: { value: baseOpacity },
      uGlow: { value: glow },
      uReveal: { value: 0.35 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
        if (vUv.y > uReveal) discard;
        float edge = 1.0 - abs(vUv.x - 0.5) * 2.0;
        edge = pow(clamp(edge, 0.0, 1.0), 1.5);
        float flow = vUv.y * 6.0 + uTime * 0.6;
        float bands = 0.55 + 0.45 * sin(flow * 3.14159);
        float pulse = pow(0.5 + 0.5 * sin(vUv.y * 30.0 - uTime * 2.0), 4.0);
        float tail = smoothstep(0.0, 0.06, vUv.y);
        float tip  = smoothstep(uReveal - 0.04, uReveal, vUv.y);
        float intensity = edge * (bands + pulse * 0.6 + tip * 1.5) * uGlow * tail;
        gl_FragColor = vec4(uColor * intensity, uOpacity * edge * tail);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
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

function ClimbingRay({ scrollRef }) {
  const frames = useMemo(() => sampleRayFrames(), []);
  const revealRef = useRef(0.1); // match revealFromScroll's 10% start

  // bright core
  const coreGeo = useMemo(() => buildRibbonGeometry(frames, 0, 0.55), [frames]);
  const coreMat = useMemo(() => makeRibbonMaterial(new THREE.Color("#9FEFFF"), 0.95, 10.0), []);

  // thin outer ribbons
  const ribbons = useMemo(() => {
    const N = 16;
    const out = [];
    for (let i = 0; i < N; i++) {
      const pair = Math.floor(i / 2) + 1;
      const sign = i % 2 === 0 ? 1 : -1;
      const offset = sign * pair * 0.42;
      const dist = pair / (N / 2 + 1);
      const opacity = THREE.MathUtils.lerp(0.55, 0.25, dist) * (0.8 + Math.random() * 0.3);
      const glow = THREE.MathUtils.lerp(3.5, 1.2, dist);
      out.push({
        geo: buildRibbonGeometry(frames, offset, 0.05),
        mat: makeRibbonMaterial(new THREE.Color("#74D8FF"), opacity, glow),
      });
    }
    return out;
  }, [frames]);

  // moving particles
  const COUNT = 400;
  const meshRef = useRef(null);
  const pdata = useMemo(() => {
    const t = new Float32Array(COUNT);
    const speed = new Float32Array(COUNT);
    const lateral = new Float32Array(COUNT);
    const scale = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      t[i] = Math.random();
      speed[i] = 0.015 + Math.random() * 0.03;
      lateral[i] = (Math.random() - 0.5) * 1.6;
      scale[i] = 0.6 + Math.random() * 0.9;
    }
    return { t, speed, lateral, scale };
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const _p = useMemo(() => new THREE.Vector3(), []);

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

    const mesh = meshRef.current;
    if (mesh) {
      for (let i = 0; i < COUNT; i++) {
        pdata.t[i] = (pdata.t[i] + pdata.speed[i] * dt) % 1;
        const tt = pdata.t[i] * reveal;
        const fi = Math.min(RAY_SAMPLES, Math.floor(tt * RAY_SAMPLES));
        const f = frames[fi];
        _p.set(
          f.pos.x + f.right.x * pdata.lateral[i],
          f.pos.y + 0.12 + Math.sin((pdata.t[i] + i) * 6.0) * 0.05,
          f.pos.z + f.right.z * pdata.lateral[i]
        );
        dummy.position.copy(_p);
        dummy.scale.setScalar(pdata.scale[i] * 0.09);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
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
      <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} renderOrder={4}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#CFF4FF" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </instancedMesh>
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
      vec3 cTop     = vec3(0.004, 0.027, 0.082);
      vec3 cMid     = vec3(0.027, 0.078, 0.200);
      vec3 cHorizon = vec3(0.122, 0.306, 0.659);
      void main() {
        float h = normalize(vWorldPos).y;
        float t = clamp(h, 0.0, 1.0);
        vec3 col = t < 0.12 ? mix(cHorizon, cMid, t / 0.12) : mix(cMid, cTop, (t - 0.12) / 0.88);
        col += cHorizon * exp(-h * 14.0) * 0.45;
        col *= 0.85;
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
      <PointMaterial transparent color="#cfe2ff" size={0.2} sizeAttenuation depthWrite={false} opacity={0.45} />
    </Points>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.05} color="#0a1830" />
      <pointLight position={[0, 6, -40]} intensity={400} distance={120} decay={2} color="#5aa0ff" />
      <directionalLight
        position={[0, 30, 10]}
        intensity={1.0}
        color="#7fb0ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-camera-near={1}
        shadow-camera-far={300}
        shadow-bias={-0.0005}
      />
      <hemisphereLight args={["#15407f", "#01040d", 0.2]} />
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

export default function Scene3({ scrollRef }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 16, 60], fov: 50, near: 0.1, far: 800 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{ width: "100%", height: "100%", background: "#010715" }}
    >
      <fog attach="fog" args={["#0a1c45", 45, 220]} />

      <ClimbCamera scrollRef={scrollRef} />
      <Lighting />
      <Sky />
      <Stars />

      <SideMountain position={[-28, 0, -10]} side="left" seed={3311} />
      <SideMountain position={[28, 0, -10]} side="right" seed={7753} />
      <FrontMountain />

      <ClimbingRay scrollRef={scrollRef} />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.8}
          radius={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
