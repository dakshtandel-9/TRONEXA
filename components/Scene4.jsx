"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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

// ─── Backdrop wall ────────────────────────────────────────────────────────────
// A large flat wall behind the rays in solid dark navy. No rock colour texture —
// just the procedural bump map for subtle surface relief, so the flat colour
// still feels like it has a textured, bumpy surface rather than a dead flat fill.

const BG_COLOR = "#16215a"; // solid dark navy blue

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
        // solid navy colour — no colour map; only the bump gives surface relief
        color={BG_COLOR}
        bumpMap={bgBump}
        bumpScale={1.4}
        roughness={0.92}
        metalness={0.05}
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
function makeSnakeCurve(xStart, xEnd, amp, waves, phase) {
  const pts = [];
  const total = 64; // many points → very smooth curve
  for (let i = 0; i <= total; i++) {
    const t = i / total;
    const y = THREE.MathUtils.lerp(Y_BOTTOM, Y_TOP, t);
    // base path drifts from xStart (bottom) to xEnd (top corner)
    const drift = THREE.MathUtils.lerp(xStart, xEnd, t * t); // ease toward the corner
    // smooth sine snake wiggle, tapered at the very ends
    const taper = Math.sin(t * Math.PI) * 0.85 + 0.15;
    const wiggle = Math.sin(t * Math.PI * 2 * waves + phase) * amp * taper;
    const x = drift + wiggle;
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

function buildRibbonGeometry(frames, offset, halfWidth) {
  const verts = [];
  const uvs = [];
  const indices = [];
  for (let i = 0; i <= RAY_SAMPLES; i++) {
    const f = frames[i];
    const cx = f.pos.x + f.right.x * offset;
    const cy = f.pos.y + f.right.y * offset;
    const cz = f.pos.z + f.right.z * offset;
    const v = i / RAY_SAMPLES;
    verts.push(cx - f.right.x * halfWidth, cy - f.right.y * halfWidth, cz - f.right.z * halfWidth);
    uvs.push(0, v);
    verts.push(cx + f.right.x * halfWidth, cy + f.right.y * halfWidth, cz + f.right.z * halfWidth);
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

// Same flowing-energy shader as Scene 2 / Scene 3, with uReveal cutting the ray
// off so it grows from the bottom (v=0) toward the top (v=1).
function makeRibbonMaterial(color, baseOpacity, glow) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: color },
      uOpacity: { value: baseOpacity },
      uGlow: { value: glow },
      uReveal: { value: 0.0 },
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
        float tail = smoothstep(0.0, 0.04, vUv.y);
        float tip  = smoothstep(uReveal - 0.04, uReveal, vUv.y); // glowing growth front
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

// ─── A single zig-zag ray: core + ribbons + particles ─────────────────────────

function ZigZagRay({ curve, revealRef, seedOffset = 0 }) {
  const frames = useMemo(() => sampleFrames(curve), [curve]);

  const coreGeo = useMemo(() => buildRibbonGeometry(frames, 0, 0.35), [frames]);
  const coreMat = useMemo(() => makeRibbonMaterial(new THREE.Color("#9FEFFF"), 0.95, 10.0), []);

  const ribbons = useMemo(() => {
    const N = 10;
    const out = [];
    for (let i = 0; i < N; i++) {
      const pair = Math.floor(i / 2) + 1;
      const sign = i % 2 === 0 ? 1 : -1;
      // tight spread: ribbons hug the core so they read as one glowing snake,
      // not a wide fanned-out mesh
      const offset = sign * pair * 0.1;
      const dist = pair / (N / 2 + 1);
      const opacity = THREE.MathUtils.lerp(0.5, 0.2, dist) * (0.85 + Math.random() * 0.25);
      const glow = THREE.MathUtils.lerp(3.0, 1.2, dist);
      out.push({
        geo: buildRibbonGeometry(frames, offset, 0.03),
        mat: makeRibbonMaterial(new THREE.Color("#74D8FF"), opacity, glow),
      });
    }
    return out;
  }, [frames]);

  // flowing particles riding the ray
  const COUNT = 260;
  const meshRef = useRef(null);
  const pdata = useMemo(() => {
    const t = new Float32Array(COUNT);
    const speed = new Float32Array(COUNT);
    const lateral = new Float32Array(COUNT);
    const scale = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      t[i] = Math.random();
      speed[i] = 0.02 + Math.random() * 0.04;
      lateral[i] = (Math.random() - 0.5) * 0.3;
      scale[i] = 0.6 + Math.random() * 0.9;
    }
    return { t, speed, lateral, scale };
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const _p = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    const reveal = revealRef.current;

    // advance the flow faster so the energy reads as quicker & livelier
    const flowDt = dt * 1.6;
    coreMat.uniforms.uTime.value += flowDt;
    coreMat.uniforms.uReveal.value = reveal;
    for (const r of ribbons) {
      r.mat.uniforms.uTime.value += flowDt;
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
          f.pos.y + f.right.y * pdata.lateral[i] + Math.sin((pdata.t[i] + i + seedOffset) * 6.0) * 0.04,
          f.pos.z + f.right.z * pdata.lateral[i]
        );
        dummy.position.copy(_p);
        dummy.scale.setScalar(pdata.scale[i] * 0.07);
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

// ─── Three rays, revealed bottom → top by scroll ──────────────────────────────

function Rays({ scrollRef }) {
  // three snaking splines. The side rays start near the centre-bottom and drift
  // out to the top corners; the middle ray snakes straight up the centre.
  //   left  → top-LEFT corner   (xEnd negative)
  //   mid   → straight up        (xEnd 0)
  //   right → top-RIGHT corner  (xEnd positive)
  const curves = useMemo(() => [
    makeSnakeCurve(-2.5, -10.5, 1.1, 2.5, 0.0),
    makeSnakeCurve(0.0, 0.0, 1.4, 3.0, 1.6),
    makeSnakeCurve(2.5, 10.5, 1.1, 2.5, 3.2),
  ], []);

  // reveal is driven DIRECTLY from the page's already-smoothed scroll — no second
  // smoothing pass here. A single smoothing stage means forward and reverse have
  // identical speed/motion (stacking two lerps gave reverse extra lag because both
  // stages carried momentum toward the old direction).
  const revealRef = useRef(0);

  useFrame(() => {
    const target = scrollRef ? THREE.MathUtils.clamp(scrollRef.current, 0, 1) : 0;
    revealRef.current = THREE.MathUtils.clamp(target, 0.0001, 1);
  });

  return (
    <group>
      {curves.map((c, i) => (
        <ZigZagRay key={i} curve={c} revealRef={revealRef} seedOffset={i * 13} />
      ))}
    </group>
  );
}

// ─── Scene 4 ──────────────────────────────────────────────────────────────────

export default function Scene4({ scrollRef }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 22], fov: 50, near: 0.1, far: 200 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{ width: "100%", height: "100%", background: BG_COLOR }}
    >
      <color attach="background" args={[BG_COLOR]} />

      <ParallaxCamera />

      {/* lighting so the rock backdrop texture reads clearly across the whole
          frame (the rays are additive and stay bright regardless) */}
      <ambientLight intensity={0.6} color="#27406b" />
      <directionalLight position={[0, 6, 20]} intensity={1.6} color="#9fc3ff" />
      <hemisphereLight args={["#2a5390", "#050a16", 0.6]} />

      <RockBackdrop />
      <Rays scrollRef={scrollRef} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.9}
          radius={0.85}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
