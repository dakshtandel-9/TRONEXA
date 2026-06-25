"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import EnergyRiver from "./EnergyRiver";
import { useParallax, PARALLAX_X, PARALLAX_Y } from "./useParallax";

// ─── Noise + fBm (identical to Scene 1) ──────────────────────────────────────

function makeNoise(seed0 = 1337) {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let seed = seed0;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 255; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number) => {
    const h = hash & 7; const u = h < 4 ? x : y; const v = h < 4 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -2 * v : 2 * v);
  };
  return (x: number, y: number) => {
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

function fbm(noise: (x: number, y: number) => number, x: number, y: number) {
  let value = 0; let amp = 0.5; let freq = 1;
  for (let o = 0; o < 5; o++) { value += amp * noise(x * freq, y * freq); freq *= 2; amp *= 0.5; }
  return value;
}

// ─── Rock textures (exact copy from Scene 1) ─────────────────────────────────

let _rockTex: { colorMap: THREE.Texture; bumpMap: THREE.Texture } | null = null;
function getRockTextures() {
  if (_rockTex) return _rockTex;
  const size = 1024;
  const colorCanvas = document.createElement("canvas");
  const bumpCanvas  = document.createElement("canvas");
  colorCanvas.width = colorCanvas.height = size;
  bumpCanvas.width  = bumpCanvas.height  = size;
  const cctx = colorCanvas.getContext("2d")!;
  const bctx = bumpCanvas.getContext("2d")!;
  const noise = makeNoise();
  const cimg  = cctx.createImageData(size, size);
  const bimg  = bctx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const base = fbm(noise, x * 0.012, y * 0.012) + 0.5;
      const fine = fbm(noise, x * 0.05,  y * 0.05 ) * 0.5 + 0.5;
      const crack = 1 - Math.abs(fbm(noise, x * 0.03 + 100, y * 0.03 + 100));
      const crackLine = Math.pow(crack, 8);
      const v = base * 0.6 + fine * 0.4;
      const idx = (y * size + x) * 4;
      const lit = v * 0.9 + 0.1;
      cimg.data[idx]     = (12 + lit * 22) | 0;
      cimg.data[idx + 1] = (24 + lit * 40) | 0;
      cimg.data[idx + 2] = (55 + lit * 75) | 0;
      const darken = 1 - crackLine * 0.55;
      cimg.data[idx]     *= darken;
      cimg.data[idx + 1] *= darken;
      cimg.data[idx + 2] *= darken;
      cimg.data[idx + 3] = 255;
      const bv = 100 + v * 90 - crackLine * 80;
      bimg.data[idx] = bimg.data[idx + 1] = bimg.data[idx + 2] = bv;
      bimg.data[idx + 3] = 255;
    }
  }
  cctx.putImageData(cimg, 0, 0);
  bctx.putImageData(bimg, 0, 0);

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  const bumpMap  = new THREE.CanvasTexture(bumpCanvas);
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  bumpMap.wrapS  = bumpMap.wrapT  = THREE.RepeatWrapping;
  colorMap.repeat.set(4, 4);
  bumpMap.repeat.set(4, 4);
  _rockTex = { colorMap, bumpMap };
  return _rockTex;
}

// ─── Sky (identical to Scene 1) ───────────────────────────────────────────────

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
        vec3 col;
        if (t < 0.12) {
          col = mix(cHorizon, cMid, t / 0.12);
        } else {
          col = mix(cMid, cTop, (t - 0.12) / 0.88);
        }
        float glow = exp(-h * 14.0) * 0.45;
        col += cHorizon * glow;
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

// ─── Mountains (identical shape/material to Scene 1) ─────────────────────────

function Mountain({ position, side }: { position: [number, number, number]; side: "left" | "right" }) {
  const { colorMap, bumpMap } = useMemo(() => getRockTextures(), []);
  const geo = useMemo(() => {
    const noise = makeNoise();
    const g = new THREE.PlaneGeometry(200, 200, 160, 160);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      let h = (fbm(noise, x * 0.013, z * 0.013) + 0.5) * 13 + 4;
      const ridge = 1.0 - Math.abs(fbm(noise, x * 0.02 + 50, z * 0.02 + 50));
      h += ridge * ridge * 6;
      const worldX = x + position[0];
      let valleyFactor: number;
      if (side === "left") {
        valleyFactor = THREE.MathUtils.clamp((-worldX - 5) / 18, 0, 1);
      } else {
        valleyFactor = THREE.MathUtils.clamp((worldX - 5) / 18, 0, 1);
      }
      valleyFactor = valleyFactor * valleyFactor * (3 - 2 * valleyFactor);
      valleyFactor = Math.pow(valleyFactor, 0.7);
      h *= valleyFactor;
      pos.setY(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, [position, side]);

  return (
    <mesh geometry={geo} position={position} castShadow receiveShadow>
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

// ─── Water flow normal map (identical to Scene 1) ────────────────────────────

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
      img.data[idx]     = ((nx / len) * 0.5 + 0.5) * 255;
      img.data[idx + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      img.data[idx + 2] = ((1  / len) * 0.5 + 0.5) * 255;
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(30, 30);
  return tex;
}

// ─── Water (identical to Scene 1) ────────────────────────────────────────────

function Water() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(500, 500);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const normalMap = useMemo(() => makeFlowNormalMap(), []);

  useFrame((_, delta) => { normalMap.offset.y -= delta * 0.06; });

  return (
    <mesh geometry={geo} position={[0, 0.8, -20]} receiveShadow>
      <meshStandardMaterial
        color="#1c3a6e"
        emissive="#1c3a6e"
        emissiveIntensity={0.55}
        roughness={0.7}
        metalness={0}
        normalMap={normalMap}
        normalScale={new THREE.Vector2(0.35, 0.35)}
      />
    </mesh>
  );
}

// ─── Stars (identical to Scene 1) ────────────────────────────────────────────

function Stars() {
  const positions = useMemo(() => {
    const count = 1400;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.random() * Math.PI * 0.4;
      const r     = 200 + Math.random() * 120;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
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

// ─── Floating dust particles (identical to Scene 1) ──────────────────────────

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = Math.random() * 14 + 0.5;
      pos[i * 3 + 2] = -Math.random() * 55 - 2;
      vel[i] = Math.random() * 0.0012 + 0.0003;
    }
    return { pos, vel, count };
  }, []);
  const live = useRef(data.pos.slice());

  useFrame(() => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position;
    for (let i = 0; i < data.count; i++) {
      live.current[i * 3 + 1] += data.vel[i];
      if (live.current[i * 3 + 1] > 15) live.current[i * 3 + 1] = 0.5;
      attr.setXYZ(i, live.current[i * 3], live.current[i * 3 + 1], live.current[i * 3 + 2]);
    }
    attr.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={data.pos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#cfe3ff" size={0.045} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

// ─── Lighting (identical to Scene 1) ─────────────────────────────────────────

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.05} color="#0a1830" />
      <pointLight position={[0, 3, -110]} intensity={1200} distance={260} decay={2} color="#5aa0ff" />
      <pointLight position={[0, 1, -70]}  intensity={300}  distance={140} decay={2} color="#3b82f6" />
      <directionalLight
        position={[0, 8, -120]}
        intensity={1.4}
        color="#7fb0ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-camera-near={1}
        shadow-camera-far={260}
        shadow-bias={-0.0005}
      />
      <hemisphereLight args={["#15407f", "#01040d", 0.2]} />
    </>
  );
}

// ─── Front mountain: centered in front of the camera at scene entry ───────────
// Sits at positive Z so the drone looks down onto it at scroll=0.
// Uses the same rock texture + shape logic as the side mountains.

function FrontMountain() {
  const { colorMap, bumpMap } = useMemo(() => getRockTextures(), []);
  const geo = useMemo(() => {
    const noise = makeNoise(4471);
    const g = new THREE.PlaneGeometry(200, 200, 160, 160);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // same height formula as side mountains
      let h = (fbm(noise, x * 0.013, z * 0.013) + 0.5) * 13 + 4;
      const ridge = 1.0 - Math.abs(fbm(noise, x * 0.02 + 80, z * 0.02 + 80));
      h += ridge * ridge * 6;
      // valley mask: flat center strip (|x| < 8), rises steeply on both sides
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
    <mesh geometry={geo} position={[0, 0, 42]} castShadow receiveShadow>
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

// ─── Distant mountain range closing the horizon ───────────────────────────────
// A proper 3D heightmap terrain placed far behind the canyon, spanning the
// full width so it blocks the open water horizon. Built from a displaced plane
// (depth in Z), so the peaks read as rounded eroded mountains and catch light
// like the foreground terrain. Silhouette: large rounded left peak, shallow
// centre dip, slightly taller rounded right peak — plus fBm erosion on top.

function DistantRange() {
  const { colorMap, bumpMap } = useMemo(() => getRockTextures(), []);
  const geo = useMemo(() => {
    const noise = makeNoise(2099);
    const WIDTH = 240;   // X span — wide enough to reach both canyon walls
    const DEPTH = 80;    // Z depth so it's a real volume, not a flat wall
    const g = new THREE.PlaneGeometry(WIDTH, DEPTH, 140, 50);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;

    // two-peak silhouette envelope across X (normalised -0.5..0.5 → 0..1)
    const profile = (nx: number) => {
      const leftPeak  = Math.exp(-((nx + 0.22) ** 2) / 0.012) * 1.0;
      const rightPeak = Math.exp(-((nx - 0.24) ** 2) / 0.010) * 1.15;
      const broad     = 0.45 * Math.exp(-(nx ** 2) / 0.20); // keeps ends raised
      return Math.min(leftPeak + rightPeak + broad, 1.5);
    };

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const nx = x / WIDTH; // -0.5 .. 0.5

      // base silhouette height from the two-peak profile
      let h = profile(nx) * 26;

      // fBm erosion for natural rounded-but-irregular ridges (gentle)
      const ero = (fbm(noise, x * 0.012, z * 0.02) + 0.5) * 6;
      const ridge = 1.0 - Math.abs(fbm(noise, x * 0.02 + 30, z * 0.03 + 30));
      h += ero + ridge * ridge * 4;

      // fade the front/back edges down so it reads as a ridge, not a slab top
      const edgeFade = THREE.MathUtils.clamp(1 - Math.abs(z) / (DEPTH * 0.5), 0, 1);
      h *= 0.55 + 0.45 * edgeFade;

      // the FRONT edge (z > 0, facing the camera/water) plunges below the
      // waterline so the base meets the water with no floating gap
      if (z > 0) {
        const front = THREE.MathUtils.clamp(z / (DEPTH * 0.5), 0, 1); // 0..1 toward camera
        const dip = front * front; // ease into the dip
        h -= dip * 14; // pull the leading edge down through the water surface
      }

      pos.setY(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  // identical material to the left/right foreground mountains
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    map:       colorMap,
    bumpMap:   bumpMap,
    bumpScale: 1.5,
    color:     new THREE.Color(0x050a16),
    roughness: 0.95,
    metalness: 0.05,
  }), [colorMap, bumpMap]);

  // far enough back to sit at the water horizon and feel distant; lowered so
  // the front skirt plunges below the water surface (no floating gap)
  return <mesh geometry={geo} material={mat} position={[0, -4, -150]} />;
}

// ─── Drone camera: scroll drives a slow forward glide down the valley ─────────

const _camPos    = new THREE.Vector3();
const _camTarget = new THREE.Vector3();

// The drone starts high above the valley entrance (same general landscape as
// Scene 1) and glides forward/downward as the user scrolls.
const DRONE_START = new THREE.Vector3(0, 38, 52);
const DRONE_END   = new THREE.Vector3(0, 14,  -55);
const LOOK_START  = new THREE.Vector3(0,  2, -30);
const LOOK_END    = new THREE.Vector3(0,  1, -120);

function DroneCamera({ scrollRef }: { scrollRef?: React.MutableRefObject<number> }) {
  const par = useParallax();
  useFrame(({ camera }, dt) => {
    // drive the drone glide DIRECTLY from the page's already-smoothed scroll — the
    // only smoothing is the single camera.position.lerp below, so forward and
    // reverse have identical speed/motion (no stacked second smoothing stage).
    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 15);
    const p = scrollRef ? THREE.MathUtils.clamp(scrollRef.current, 0, 1) : 0;

    _camPos.lerpVectors(DRONE_START, DRONE_END, p);
    // opposite-direction mouse parallax: offset the target before the lerp
    const m = par.update(dt);
    _camPos.x += m.x * PARALLAX_X;
    _camPos.y += -m.y * PARALLAX_Y;
    camera.position.lerp(_camPos, k);

    _camTarget.lerpVectors(LOOK_START, LOOK_END, p);
    camera.lookAt(_camTarget);
  });

  return null;
}

// ─── Scene2 ───────────────────────────────────────────────────────────────────

export default function Scene2({ scrollRef }: { scrollRef?: React.MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 38, 52], fov: 50, near: 0.1, far: 800 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{ width: "100%", height: "100%", background: "#010715" }}
    >
      <DroneCamera scrollRef={scrollRef} />

      <fog attach="fog" args={["#0a1c45", 40, 200]} />

      <Lighting />
      <Sky />
      <Stars />

      <Mountain position={[-26, 0, -38]} side="left" />
      <Mountain position={[26, 0, -38]} side="right" />
      <FrontMountain />
      <DistantRange />
      <Water />
      <Particles />

      {/* glowing procedural energy river — grows forward with scroll progress */}
      <EnergyRiver scrollRef={scrollRef} />

      <EffectComposer>
        {/* strong bloom tuned so only the bright additive energy river blooms;
            the dark mountains (well below threshold) stay dark */}
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
