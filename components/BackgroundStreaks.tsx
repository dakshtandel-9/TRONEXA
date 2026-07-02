'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Vignette,
} from '@react-three/postprocessing';
import * as THREE from 'three';
import type { CSSProperties } from 'react';

/**
 * Decorative page background — matches the original allPagebg.mp4 clip: a wide
 * bright-blue arc sweeping in from the TOP-LEFT and curving down through the
 * BOTTOM-RIGHT, built from a bundle of glowing light threads over a near-black
 * navy field with fine drifting star dust. Loops forever on the GPU; Bloom gives
 * the threads their soft luminous glow. Non-interactive & aria-hidden.
 *
 * Palette matched to the clip:
 *   background #05070f / black · thread cores #EAF7FF → #9BE8FF → #36A5FF → #0A5CFF
 */

const BG = '#04060e';

const C_CORE = new THREE.Color('#EAF7FF');
const C_INNER = new THREE.Color('#9BE8FF');
const C_MID = new THREE.Color('#36A5FF');
const C_EDGE = new THREE.Color('#0A5CFF');

// ─── The arc: a bundle of curved glowing threads ─────────────────────────────
// Every thread follows the same master arc (a quadratic bezier entering top-left,
// bulging low, exiting bottom-right) offset perpendicular by a little, so the
// bundle reads as one wide sweeping ray with a bright hot core and softer
// companions — exactly like the reference clip.

// master arc control points, in a ~[-8..8] world space (x right, y up)
const A0 = new THREE.Vector2(-9.5, 6.2);   // enters top-left
const A1 = new THREE.Vector2(-3.0, -5.6);  // bulges down through the lower-middle
const A2 = new THREE.Vector2(11.0, -2.2);  // exits toward the bottom-right

type ThreadDef = {
  offset: number;      // perpendicular offset from the master arc
  halfWidth: number;
  brightness: number;
  color: THREE.Color;
  speed: number;
  phase: number;
};

// one hot hero thread + a few graded companions above & below it
const THREADS: ThreadDef[] = [
  { offset: 0.0, halfWidth: 0.10, brightness: 1.7, color: C_INNER, speed: 1.0, phase: 0.0 },
  { offset: 0.22, halfWidth: 0.07, brightness: 1.1, color: C_MID, speed: 0.85, phase: 1.1 },
  { offset: -0.28, halfWidth: 0.06, brightness: 0.9, color: C_MID, speed: 0.8, phase: 2.0 },
  { offset: 0.55, halfWidth: 0.045, brightness: 0.5, color: C_EDGE, speed: 0.65, phase: 3.2 },
  { offset: -0.7, halfWidth: 0.04, brightness: 0.4, color: C_EDGE, speed: 0.6, phase: 4.1 },
  { offset: 1.0, halfWidth: 0.03, brightness: 0.25, color: C_EDGE, speed: 0.5, phase: 5.0 },
];

function bezier(t: number) {
  const mt = 1 - t;
  return new THREE.Vector2(
    mt * mt * A0.x + 2 * mt * t * A1.x + t * t * A2.x,
    mt * mt * A0.y + 2 * mt * t * A1.y + t * t * A2.y
  );
}

function buildThreadGeometry(thread: ThreadDef, segments = 200) {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  let prev = bezier(0);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const cur = bezier(t);
    const tan = (i === 0 ? bezier(0.001).sub(cur) : cur.clone().sub(prev)).normalize();
    const perp = new THREE.Vector2(-tan.y, tan.x);
    // apply the thread's own offset along the perpendicular (moved into geometry)
    const cx = cur.x + perp.x * thread.offset;
    const cy = cur.y + perp.y * thread.offset;
    // taper the ends so the ray fades in/out rather than stopping abruptly
    const taper = Math.sin(Math.PI * t);
    const w = thread.halfWidth * (0.25 + 0.75 * taper);
    positions.push(cx - perp.x * w, cy - perp.y * w, 0, cx + perp.x * w, cy + perp.y * w, 0);
    uvs.push(0, t, 1, t);
    prev = cur;
  }
  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

function makeThreadMaterial(thread: ThreadDef) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: thread.color.clone() },
      uCore: { value: C_CORE },
      uBright: { value: thread.brightness },
      uSpeed: { value: thread.speed },
      uPhase: { value: thread.phase },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
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
      uniform vec3  uCore;
      uniform float uBright;
      uniform float uSpeed;
      uniform float uPhase;
      varying vec2 vUv;
      void main() {
        // cross-section: tight white-hot filament + wide soft coloured halo
        float d = abs(vUv.x - 0.5) * 2.0;
        float core = exp(-d * d * 40.0);
        float halo = exp(-d * d * 4.0);

        // energy travelling along the arc + slow breathing so it feels alive
        float travel = 0.62 + 0.38 * sin(vUv.y * 8.0 - uTime * uSpeed + uPhase);
        float breathe = 0.85 + 0.15 * sin(uTime * 0.45 + uPhase);

        // brighter toward the bottom-right exit (like the reference clip)
        float along = 0.55 + 0.45 * smoothstep(0.15, 0.85, vUv.y);

        // fade both ends into the dark
        float ends = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.86, vUv.y);

        float glow = (halo * 0.85 + core * 1.9 * travel) * uBright * breathe * along * ends;
        vec3 col = mix(uColor, uCore, core * 0.92);
        gl_FragColor = vec4(col * glow, glow);
      }
    `,
  });
}

function ArcRay() {
  const items = useMemo(
    () => THREADS.map((th) => ({ geo: buildThreadGeometry(th), mat: makeThreadMaterial(th) })),
    []
  );
  useFrame((_, dt) => {
    items.forEach(({ mat }) => { mat.uniforms.uTime.value += dt; });
  });
  return (
    <group>
      {items.map(({ geo, mat }, i) => (
        <mesh key={i} geometry={geo} material={mat} />
      ))}
    </group>
  );
}

// ─── Fine star dust ──────────────────────────────────────────────────────────
// Small twinkling motes, densest around the arc, thinning into the dark corners.

function DustField() {
  const { geometry, material } = useMemo(() => {
    const n = 420;
    const pos = new Float32Array(n * 3);
    const aSize = new Float32Array(n);
    const aPhase = new Float32Array(n);
    const aDrift = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      // bias toward the arc band (lower-left → centre) like the reference
      const nearArc = Math.random() < 0.72;
      let x: number, y: number;
      if (nearArc) {
        const t = Math.random();
        const p = bezier(t);
        x = p.x + (Math.random() - 0.5) * 3.0;
        y = p.y + (Math.random() - 0.5) * 3.0;
      } else {
        x = (Math.random() - 0.5) * 20;
        y = (Math.random() - 0.5) * 13;
      }
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = -0.5 - Math.random() * 2.5;
      aSize[i] = 0.5 + Math.random() * 1.7;   // small, fine dust
      aPhase[i] = Math.random() * Math.PI * 2;
      aDrift[i] = 0.04 + Math.random() * 0.1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(aPhase, 1));
    geo.setAttribute('aDrift', new THREE.BufferAttribute(aDrift, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime;
        attribute float aSize;
        attribute float aPhase;
        attribute float aDrift;
        varying float vTw;
        void main() {
          vTw = 0.3 + 0.7 * (0.5 + 0.5 * sin(uTime * 1.5 + aPhase));
          vec3 p = position;
          // slow drift along the arc direction (down-right), looping seamlessly
          p.x = mod(p.x + uTime * aDrift + 10.0, 20.0) - 10.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aSize * 90.0 / max(-mv.z, 0.001);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vTw;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d) * vTw;
          gl_FragColor = vec4(vec3(0.72, 0.86, 1.0) * a, a * 0.55);
        }
      `,
    });
    return { geometry: geo, material: mat };
  }, []);

  useFrame((_, dt) => { material.uniforms.uTime.value += dt; });
  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

export default function BackgroundStreaks({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        ...style,
        pointerEvents: 'none',
        // dark navy, subtly lifted where the arc passes (lower-left), black corners
        background: `radial-gradient(130% 130% at 25% 78%, #0a1024 0%, ${BG} 55%, #010207 100%)`,
      }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 92, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <ArcRay />
        <DustField />
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.15}
            luminanceSmoothing={0.85}
            intensity={1.35}
            radius={0.8}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.28} darkness={0.82} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
