"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Spline generator ─────────────────────────────────────────────────────────
// A gently snaking CatmullRom curve running down the centre of the river, from
// near the camera (z≈+38) to the foot of the distant mountain (z≈-145), held
// just above the water surface (water sits at y=0.8 → river core at y≈0.85).

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

// ─── A single flat glowing ribbon following the spline at a lateral offset ────

function buildRibbonGeometry(frames: Frame[], offset: number, halfWidth: number) {
  const verts: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= SAMPLES; i++) {
    const f = frames[i];
    const cx = f.pos.x + f.right.x * offset;
    const cz = f.pos.z + f.right.z * offset;
    const v = i / SAMPLES;
    // two edge vertices straddling the centreline
    verts.push(cx - f.right.x * halfWidth, f.pos.y, cz - f.right.z * halfWidth);
    uvs.push(0, v);
    verts.push(cx + f.right.x * halfWidth, f.pos.y, cz + f.right.z * halfWidth);
    uvs.push(1, v);
  }
  for (let i = 0; i < SAMPLES; i++) {
    const a = i * 2;
    indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices);
  return g;
}

// shared flowing-energy shader: a soft longitudinal gradient with travelling
// bright bands scrolling toward the distant mountain (−V direction).
function makeRibbonMaterial(color: THREE.Color, baseOpacity: number, glow: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: color },
      uOpacity: { value: baseOpacity },
      uGlow: { value: glow },
      // visible fraction of the spline (0..1); fragments past this are hidden.
      // starts at 0.35 so only the first third of the river shows on load.
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
        // hard cut anything beyond the currently revealed length
        if (vUv.y > uReveal) discard;

        // soft edge falloff across the ribbon width (bright core, faded edges)
        float edge = 1.0 - abs(vUv.x - 0.5) * 2.0;
        edge = pow(clamp(edge, 0.0, 1.0), 1.5);

        // travelling energy bands flowing toward the mountain
        float flow = vUv.y * 6.0 + uTime * 0.6;
        float bands = 0.55 + 0.45 * sin(flow * 3.14159);
        // sharper pulses riding on top
        float pulse = pow(0.5 + 0.5 * sin(vUv.y * 30.0 - uTime * 2.0), 4.0);

        // fade the tail (near camera); add a bright leading tip at the reveal
        // edge so the growth front reads as glowing energy carving forward
        float tail = smoothstep(0.0, 0.06, vUv.y);
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

// ─── Center core: one thick brilliant ribbon ─────────────────────────────────

function EnergyCore({ frames, revealRef }: { frames: Frame[]; revealRef: React.MutableRefObject<number> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const geo = useMemo(() => buildRibbonGeometry(frames, 0, 0.55), [frames]);
  const mat = useMemo(
    () => makeRibbonMaterial(new THREE.Color("#9FEFFF"), 0.95, 10.0),
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

// ─── Outer ribbons: ~16 thin parallel lines, fading toward the edges ─────────

function EnergyRibbons({ frames, revealRef }: { frames: Frame[]; revealRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const N = 16;

  const ribbons = useMemo(() => {
    const out: { geo: THREE.BufferGeometry; mat: THREE.ShaderMaterial }[] = [];
    for (let i = 0; i < N; i++) {
      // symmetric pairs spreading outward from the core
      const pair = Math.floor(i / 2) + 1;
      const sign = i % 2 === 0 ? 1 : -1;
      const offset = sign * pair * 0.42;
      // brightness/opacity fall off the further the ribbon is from centre
      const dist = pair / (N / 2 + 1);
      const opacity = THREE.MathUtils.lerp(0.55, 0.25, dist) * (0.8 + Math.random() * 0.3);
      const glow = THREE.MathUtils.lerp(3.5, 1.2, dist);
      const geo = buildRibbonGeometry(frames, offset, 0.05);
      const mat = makeRibbonMaterial(new THREE.Color("#74D8FF"), opacity, glow);
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

// ─── Moving energy particles travelling along the spline ─────────────────────
// One InstancedMesh; each instance advances its own t along the curve, loops
// forever, with randomised speed + lateral jitter. Geometry is reused; only
// per-instance matrices update each frame.

function EnergyParticles({ frames, revealRef }: { frames: Frame[]; revealRef: React.MutableRefObject<number> }) {
  const COUNT = 400;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const data = useMemo(() => {
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
    const mesh = meshRef.current;
    if (!mesh) return;
    const reveal = revealRef.current;
    for (let i = 0; i < COUNT; i++) {
      // advance the particle's phase and loop it
      data.t[i] = (data.t[i] + data.speed[i] * dt) % 1;
      // map the phase into the currently revealed window [0, reveal] so a
      // particle never sits ahead of the river's growth front
      const tt = data.t[i] * reveal;
      const fi = Math.min(SAMPLES, Math.floor(tt * SAMPLES));
      const f = frames[fi];
      _p.set(
        f.pos.x + f.right.x * data.lateral[i],
        f.pos.y + 0.12 + Math.sin((data.t[i] + i) * 6.0) * 0.05,
        f.pos.z + f.right.z * data.lateral[i]
      );
      dummy.position.copy(_p);
      const s = data.scale[i] * 0.09;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} renderOrder={4}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#CFF4FF" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
}

// ─── Composed energy river ────────────────────────────────────────────────────

export default function EnergyRiver({ scrollRef }: { scrollRef?: React.MutableRefObject<number> }) {
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
      <EnergyParticles frames={frames} revealRef={revealRef} />
    </group>
  );
}
