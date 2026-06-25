"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useParallax, PARALLAX_X, PARALLAX_Y } from "./useParallax";

// ────────────────────────────────────────────────────────────────────────────
const DEBUG = false; // true = disable postprocessing, verify raw composition
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

// ─── Sky gradient dome (darker) ───────────────────────────────────────────────

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
          vec3 cTop     = vec3(0.004, 0.027, 0.082);  // #010715
          vec3 cMid     = vec3(0.027, 0.078, 0.200);  // #071433
          vec3 cHorizon = vec3(0.122, 0.306, 0.659);  // #1f4ea8
          void main() {
            float h = normalize(vWorldPos).y;
            float t = clamp(h, 0.0, 1.0);
            vec3 col;
            if (t < 0.12) {
              col = mix(cHorizon, cMid, t / 0.12);
            } else {
              col = mix(cMid, cTop, (t - 0.12) / 0.88);
            }
            // subtle atmospheric glow band hugging the horizon
            float glow = exp(-h * 14.0) * 0.45;
            col += cHorizon * glow;
            // darken overall so it reads as night
            col *= 0.85;
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
      // multi-octave rock detail
      const base = fbm(noise, x * 0.012, y * 0.012) + 0.5;       // broad patches
      const fine = fbm(noise, x * 0.05, y * 0.05) * 0.5 + 0.5;   // grain
      // ridged "cracks" — sharp dark veins
      const crack = 1 - Math.abs(fbm(noise, x * 0.03 + 100, y * 0.03 + 100));
      const crackLine = Math.pow(crack, 8); // thin bright/dark lines

      const v = base * 0.6 + fine * 0.4;
      const idx = (y * size + x) * 4;

      // deep blue rock: dark navy, slightly lit on raised grain
      const lit = v * 0.9 + 0.1;
      cimg.data[idx] = (12 + lit * 22) | 0;          // R
      cimg.data[idx + 1] = (24 + lit * 40) | 0;      // G
      cimg.data[idx + 2] = (55 + lit * 75) | 0;      // B (dominant)
      // darken cracks
      const darken = 1 - crackLine * 0.55;
      cimg.data[idx] *= darken;
      cimg.data[idx + 1] *= darken;
      cimg.data[idx + 2] *= darken;
      cimg.data[idx + 3] = 255;

      // bump: grain relief + recessed cracks
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

// ─── Mountain (steeper, taller, closer) ──────────────────────────────────────

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
    const g = new THREE.PlaneGeometry(200, 200, 160, 160);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // taller terrain: range ~4..17 (was 3..12, +40%)
      let h = (fbm(noise, x * 0.013, z * 0.013) + 0.5) * 13 + 4;

      // ridged contribution for sharper peaks
      const ridge = 1.0 - Math.abs(fbm(noise, x * 0.02 + 50, z * 0.02 + 50));
      h += ridge * ridge * 6;

      const worldX = x + position[0];

      // NARROWER valley opening: inner edge starts closer to center (|worldX|~5)
      // steeper falloff exponent for sharper inner faces
      let valleyFactor: number;
      if (side === "left") {
        valleyFactor = THREE.MathUtils.clamp((-worldX - 5) / 18, 0, 1);
      } else {
        valleyFactor = THREE.MathUtils.clamp((worldX - 5) / 18, 0, 1);
      }
      // sharper smoothstep + power to steepen the inner face
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

// ─── Subtle ripple normal map for flowing water ──────────────────────────────

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
  tex.repeat.set(30, 30);
  return tex;
}

// ─── Flat water filling the valley floor, gently flowing toward the camera ──

function Water() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(500, 500);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const normalMap = useMemo(() => makeFlowNormalMap(), []);

  // scroll the ripple normals away from the camera → flowing-away look
  useFrame((_, delta) => {
    normalMap.offset.y += delta * 0.06;
  });

  return (
    <mesh geometry={geo} position={[0, 0.8, -20]} receiveShadow>
      {/* full glowing water — strong emissive blooms into a glow */}
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

// ─── Sparse tiny particles ────────────────────────────────────────────────────

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
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
      <PointMaterial
        transparent
        color="#cfe3ff"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
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
        color="#cfe2ff"
        size={0.2}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
      />
    </Points>
  );
}

// ─── Lighting: slope rim/bounce only, NO glowing objects in water ────────────

function Lighting() {
  // SpotLights aimed at the inner slopes from above/side, so they light the
  return (
    <>
      {/* very faint cold ambient */}
      <ambientLight intensity={0.05} color="#0a1830" />

      {/* HORIZON LIGHT — bright glow at the valley center where the water meets
          the sky; shines back toward the camera, lighting the inner slopes */}
      <pointLight position={[0, 3, -110]} intensity={1200} distance={260} decay={2} color="#5aa0ff" />
      <pointLight position={[0, 1, -70]} intensity={300} distance={140} decay={2} color="#3b82f6" />

      {/* directional fill from the horizon center toward the camera (casts
          mountain & model shadows forward onto the water) */}
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

      {/* soft blue bounce fill across the valley floor */}
      <hemisphereLight args={["#15407f", "#01040d", 0.2]} />
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

  // base
  cctx.fillStyle = "#3b82f6";
  cctx.fillRect(0, 0, size, size);
  bctx.fillStyle = "#808080"; // mid = flat for bump
  bctx.fillRect(0, 0, size, size);

  // recursively split into panels (like the reference's box grid)
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
    // slight per-panel brightness/hue variation
    const v = 0.82 + Math.random() * 0.32;
    const r = Math.min(255, 0x3b * v + (Math.random() - 0.5) * 14);
    const g = Math.min(255, 0x82 * v + (Math.random() - 0.5) * 14);
    const b = Math.min(255, 0xf6 * v);
    cctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
    cctx.fillRect(p.x, p.y, p.w, p.h);

    // seam lines: darker border on color, dark groove on bump
    cctx.strokeStyle = "rgba(10,40,110,0.55)";
    cctx.lineWidth = 2;
    cctx.strokeRect(p.x + 1, p.y + 1, p.w - 2, p.h - 2);

    const bv = 110 + Math.random() * 40;
    bctx.fillStyle = `rgb(${bv | 0},${bv | 0},${bv | 0})`;
    bctx.fillRect(p.x, p.y, p.w, p.h);
    bctx.strokeStyle = "#202020"; // recessed seams
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

// position the model in the middle of the valley, floating above the water
const MODEL_POS = new THREE.Vector3(0, 4.2, -28);

function HeroModel({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  // Draco-compressed model — decoder served locally from /public/draco (no CDN).
  const { scene } = useGLTF("/HeroModul-opt.glb", "/draco/");
  const groupRef = useRef<THREE.Group>(null);
  const lastScroll = useRef(0);
  const spin = useRef(0); // accumulated rotation

  // glassy translucent blue with paneled box texture + seam lines
  useMemo(() => {
    const { colorMap, bumpMap } = makePanelTextures();
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0x3b82f6),
          map: colorMap,             // paneled box color variation
          bumpMap: bumpMap,          // recessed seam lines
          bumpScale: 1.2,
          emissive: new THREE.Color(0x3b82f6),
          emissiveMap: colorMap,     // glow follows the panel detail
          emissiveIntensity: 4.5,    // very bright glow → strong bloom
          metalness: 0.0,
          roughness: 0.25,
          transmission: 0,           // disabled: was forcing a full second scene render every frame
          clearcoat: 1,
          clearcoatRoughness: 0.15,
          transparent: true,
          opacity: 0.96,
        });
        (child as THREE.Mesh).castShadow = true;
        (child as THREE.Mesh).receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    const t = performance.now() / 1000;

    // scroll velocity (how fast the user is scrolling right now)
    const vel = Math.abs(scrollRef.current - lastScroll.current);
    lastScroll.current = scrollRef.current;

    // base idle spin + extra spin proportional to scroll speed
    const baseSpeed = 0.25;             // slow idle rotation
    const scrollBoost = vel * 35;       // faster when scrolling fast (softened to avoid whip)
    spin.current += (baseSpeed + scrollBoost) * delta;
    g.rotation.y = spin.current;
    // gentle tilt wobble
    g.rotation.x = Math.sin(t * 0.5) * 0.08;
    g.rotation.z = Math.sin(t * 0.35) * 0.05;

    // idle floating bob (slow jump up/down when not scrolling)
    g.position.y = MODEL_POS.y + Math.sin(t * 0.9) * 0.6;
  });

  return (
    <group ref={groupRef} position={MODEL_POS} scale={5.04}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/HeroModul-opt.glb", "/draco/");

// ─── Camera: scroll zooms toward the model, then holds (crossfade in page.tsx) ─

const START_Z = 47;        // pulled back to frame the whole valley at start
const ZOOM_END_Z = -19;    // ends right up against the model's face
const START_Y = 1.4;
const ZOOM_END_Y = 4.2;    // rise to the model's center height

const FOCUS_START = new THREE.Vector3(0, 2.6, -120); // early: valley horizon
const MODEL_CENTER = new THREE.Vector3(0, 4.2, -28); // the model
const _focus = new THREE.Vector3();

function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const par = useParallax();

  useFrame(({ camera }, dt) => {
    const p = THREE.MathUtils.clamp(scrollRef.current, 0, 1);

    const targetZ = START_Z + (ZOOM_END_Z - START_Z) * p;
    const targetY = START_Y + (ZOOM_END_Y - START_Y) * p;

    const focusT = THREE.MathUtils.clamp((p - 0.4) / 0.6, 0, 1);
    const focusEased = focusT * focusT * (3 - 2 * focusT);
    _focus.lerpVectors(FOCUS_START, MODEL_CENTER, focusEased);

    // OPPOSITE-direction mouse parallax (scene drifts AGAINST the cursor): cursor
    // right → camera right → world slides left; cursor down → camera down → up.
    const m = par.update(dt);
    const offX = m.x * PARALLAX_X;
    const offY = -m.y * PARALLAX_Y;

    // frame-rate-independent tight follow — the page already smooths scroll, so
    // this avoids stacking two lags and keeps forward/reverse identical
    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 30);
    camera.position.x += (offX - camera.position.x) * k;
    camera.position.z += (targetZ - camera.position.z) * k;
    camera.position.y += (targetY + offY - camera.position.y) * k;
    camera.lookAt(_focus);
  });
  return null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.4, 47], fov: 38, near: 0.1, far: 800 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{ width: "100%", height: "100%", background: "#010715" }}
    >
      <CameraRig scrollRef={scrollRef} />

      {/* atmospheric depth fog */}
      <fog attach="fog" args={["#0a1c45", 28, 150]} />

      <Lighting />
      <Sky />
      <Stars />

      <Mountain position={[-26, 0, -38]} side="left" />
      <Mountain position={[26, 0, -38]} side="right" />
      <Water />
      <Particles />

      {/* Hero model floating in the valley center — glowing light source */}
      <pointLight position={[0, 4.2, -28]} intensity={260} distance={70} decay={2} color="#4f9bff" />
      <pointLight position={[0, 4.2, -24]} intensity={110} distance={40} decay={2} color="#9ec5ff" />
      <Suspense fallback={null}>
        <HeroModel scrollRef={scrollRef} />
      </Suspense>

      {!DEBUG && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.7}
            luminanceSmoothing={0.9}
            intensity={0.4}
            radius={0.5}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
