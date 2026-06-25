"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useParallax, PARALLAX_X, PARALLAX_Y } from "./useParallax";

// ─────────────────────────────────────────────────────────────────────────────
// Scene 5 — a TOP-DOWN aerial of the same dark-blue canyon (reused from Scene 2/3)
// with the same glowing 3-ray energy look (reused from Scene 4) flowing down the
// valley. As the user scrolls, the camera RISES from an angled overview to a near
// top-down bird's-eye of the terrain. No text, no UI — just the landscape + rays.
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

// ─── Rock textures (identical to Scene 3) ────────────────────────────────────

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

// ─── Side mountains flanking the valley (same shape as Scene 3) ──────────────

// ─── Flat ground: a wide, nearly-flat basin with only gentle low undulation, so
// the whole city (cubes + lines) stays visible. Far-off low hills only at the very
// back edge form a soft horizon line — no tall walls crowding the valley.

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
      // very gentle rolling undulation across the whole floor (max ~1.2 units)
      let h = (fbm(noise, x * 0.01, z * 0.01) + 0.5) * 1.2;
      // soft low hills only far in the distance (z < -120) to suggest a horizon
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
        bumpScale={1.0}
        color="#050a16"
        roughness={0.95}
        metalness={0.05}
      />
    </mesh>
  );
}

// ─── Small scattered stones dotting the flat ground (instanced, low + small) ──

function Stones() {
  const meshRef = useRef(null);
  const COUNT = 140;
  const data = useMemo(() => {
    const rng = (() => { let s = 7321; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
    const arr = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        x: (rng() - 0.5) * 340,
        z: 10 - rng() * 200,
        s: 0.3 + rng() * 0.9,
        rot: rng() * Math.PI,
      });
    }
    return arr;
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh || mesh.userData.placed) return;
    data.forEach((d, i) => {
      dummy.position.set(d.x, d.s * 0.3, d.z);
      dummy.scale.set(d.s, d.s * 0.6, d.s);
      dummy.rotation.set(0, d.rot, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.userData.placed = true;
  });
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} receiveShadow castShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#0a1322" roughness={0.95} metalness={0.05} />
    </instancedMesh>
  );
}

// ─── Sky (same gradient as Scene 3) ──────────────────────────────────────────

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

// ─── City grid: scattered glowing blue dots + a network of faint blue lines ──
// Reads like the reference: a basin full of building "nodes" (small glowing blue
// boxes) connected by a web of roads/links. Most lines are dim; only ~10% are
// brighter "glowing" links so the network reads as mostly subtle with a few hot
// strands. The whole thing sits flat on the basin floor between the mountains.

const CITY = {
  count: 420,       // many more nodes so the city fills the whole frame
  spanX: 360,       // much wider basin → city stretches edge to edge
  zNear: 10,        // start the city right in front of the camera
  zFar: -180,       // far edge fading into the horizon
  floorY: 0.2,      // height of the basin floor
};

function City() {
  // scatter node positions across the basin (denser toward the centre)
  const nodes = useMemo(() => {
    const rng = (() => { let s = 9911; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
    const pts = [];
    for (let i = 0; i < CITY.count; i++) {
      // flat open basin → the city spreads full-width across the floor, slightly
      // narrowing toward the far horizon just for natural perspective falloff
      const z = THREE.MathUtils.lerp(CITY.zNear, CITY.zFar, rng());
      const widthAtZ = THREE.MathUtils.lerp(1.0, 0.7, (z - CITY.zNear) / (CITY.zFar - CITY.zNear));
      const x = (rng() - 0.5) * CITY.spanX * widthAtZ;
      pts.push(new THREE.Vector3(x, CITY.floorY, z));
    }
    return pts;
  }, []);

  // glowing blue dot-nodes (instanced small boxes, like the reference's cubes)
  const nodeMeshRef = useRef(null);
  useMemo(() => {
    // size variation per node, applied once after mount
    return null;
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const mesh = nodeMeshRef.current;
    if (!mesh || mesh.userData.placed) return;
    nodes.forEach((p, i) => {
      dummy.position.copy(p);
      // small glowing cubes (like the reference) — modest size variation
      const s = 0.7 + ((i * 53) % 7) * 0.12;
      dummy.scale.set(s, s, s);
      dummy.position.y = CITY.floorY + s * 0.5;
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.userData.placed = true;
  });

  return (
    <group>
      {/* small glowing blue cubes (city nodes) — no road lines */}
      <instancedMesh ref={nodeMeshRef} args={[undefined, undefined, CITY.count]} renderOrder={3}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#6db4ff" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </instancedMesh>
    </group>
  );
}

// ─── 3 small energy rays passing BETWEEN the cubes (same look as other scenes) ─
// Same glowing core + thin parallel ribbons + flowing particles as Scenes 3/4,
// but small. A traveling reveal window (driven by scroll) makes the rays ENTER at
// the start of the section, shrink to a short bright streak, and travel through
// the city to the far end as the user scrolls.

const RAY_SAMPLES = 400;

// a small snaking ray running NEAR→FAR through the city floor, FANNING OUT in X:
// at the bottom (t=0) it starts clustered near the centre (xStart); as it travels
// up to the top/horizon (t=1) it drifts out to xEnd — so the left ray ends at the
// top-left edge, the right ray at the top-right edge, and the rest fan between.
function makeCityRay(xStart, xEnd, amp, waves, phase) {
  const pts = [];
  const total = 64;
  for (let i = 0; i <= total; i++) {
    const t = i / total;
    const z = THREE.MathUtils.lerp(CITY.zNear + 20, CITY.zFar - 10, t); // near → far
    // ease the fan-out so they part smoothly as they climb
    const drift = THREE.MathUtils.lerp(xStart, xEnd, t * t);
    const taper = Math.sin(t * Math.PI) * 0.8 + 0.2;
    const x = drift + Math.sin(t * Math.PI * 2 * waves + phase) * amp * taper;
    pts.push(new THREE.Vector3(x, CITY.floorY + 1.4, z)); // float just above the cubes' base
  }
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
}

function sampleRayFrames(curve) {
  const frames = [];
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i <= RAY_SAMPLES; i++) {
    const t = i / RAY_SAMPLES;
    const pos = curve.getPointAt(t);
    const tan = curve.getTangentAt(t).normalize();
    const right = new THREE.Vector3().crossVectors(tan, up).normalize();
    frames.push({ pos, right });
  }
  return frames;
}

function buildRayRibbon(frames, offset, halfWidth) {
  const verts = [], uvs = [], indices = [];
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

// shader with a TRAVELING window [uHead-uLen, uHead]: only that slice is drawn,
// so the ray reads as a short bright streak moving along the path.
function makeRayMaterial(color, baseOpacity, glow) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: color },
      uOpacity: { value: baseOpacity },
      uGlow: { value: glow },
      uHead: { value: 0 },     // front of the streak (0..1 along the path)
      uLen: { value: 0.25 },   // length of the visible streak
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime, uOpacity, uGlow, uHead, uLen;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        float tail = uHead - uLen;
        if (vUv.y > uHead || vUv.y < tail) discard;      // only the moving window
        float along = (vUv.y - tail) / max(uLen, 0.0001); // 0 at tail → 1 at head
        float edge = 1.0 - abs(vUv.x - 0.5) * 2.0;
        edge = pow(clamp(edge, 0.0, 1.0), 1.5);
        float fadeTail = smoothstep(0.0, 0.25, along);    // soft trailing fade
        float fadeHead = 1.0 - smoothstep(0.85, 1.0, along);
        float pulse = pow(0.5 + 0.5 * sin(vUv.y * 40.0 - uTime * 3.0), 4.0);
        float intensity = edge * (0.7 + pulse * 0.6) * uGlow * fadeTail * fadeHead;
        gl_FragColor = vec4(uColor * intensity, uOpacity * edge * fadeTail * fadeHead);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

function CityRay({ curve, scrollRef, phase }) {
  const frames = useMemo(() => sampleRayFrames(curve), [curve]);
  const coreGeo = useMemo(() => buildRayRibbon(frames, 0, 0.22), [frames]); // small
  const coreMat = useMemo(() => makeRayMaterial(new THREE.Color("#9FEFFF"), 0.95, 9.0), []);
  const ribbons = useMemo(() => {
    const out = [];
    for (let i = 0; i < 8; i++) {
      const pair = Math.floor(i / 2) + 1;
      const sign = i % 2 === 0 ? 1 : -1;
      const offset = sign * pair * 0.18;
      const dist = pair / 5;
      out.push({
        geo: buildRayRibbon(frames, offset, 0.03),
        mat: makeRayMaterial(new THREE.Color("#74D8FF"), THREE.MathUtils.lerp(0.5, 0.2, dist), THREE.MathUtils.lerp(3.0, 1.2, dist)),
      });
    }
    return out;
  }, [frames]);

  const smoothHead = useRef(0);

  useFrame((_, dt) => {
    const p = scrollRef ? THREE.MathUtils.clamp(scrollRef.current, 0, 1) : 0;
    // head travels 0→1 across the section; offset slightly per-ray via phase
    const target = THREE.MathUtils.clamp(p * 1.1 - phase * 0.04, 0, 1);
    smoothHead.current += (target - smoothHead.current) * (1 - Math.exp(-Math.min(dt, 0.1) * 12));
    const head = smoothHead.current;
    // LONG continuous streak — a fixed big length so the ray reads as one long
    // unbroken trail from the bottom up into the distance (no shrink, no break).
    const len = 1.0;

    coreMat.uniforms.uTime.value += dt;
    coreMat.uniforms.uHead.value = head;
    coreMat.uniforms.uLen.value = len;
    for (const r of ribbons) {
      r.mat.uniforms.uTime.value += dt;
      r.mat.uniforms.uHead.value = head;
      r.mat.uniforms.uLen.value = len;
    }
  });

  return (
    <group>
      <group renderOrder={4}>
        {ribbons.map((r, i) => (
          <mesh key={i} geometry={r.geo}><primitive object={r.mat} attach="material" /></mesh>
        ))}
      </group>
      <mesh geometry={coreGeo} renderOrder={5}><primitive object={coreMat} attach="material" /></mesh>
    </group>
  );
}

// seven small rays weaving between the cubes, fanned across the city width
function CityRays({ scrollRef }) {
  // each ray: [xStart (bottom, clustered near centre), xEnd (top edge, spread wide)]
  // the 7 fan out symmetrically — far left → far right at the top.
  const curves = useMemo(() => [
    makeCityRay(-9, -225, 6, 2.5, 0.0),  // → far top-left edge (spread ~150% wider)
    makeCityRay(-6, -150, 7, 3.0, 0.9),
    makeCityRay(-3, -75, 6, 2.5, 1.8),
    makeCityRay(0, 0, 8, 3.0, 2.6),      // straight up the centre
    makeCityRay(3, 75, 6, 2.5, 3.4),
    makeCityRay(6, 150, 7, 3.0, 4.2),
    makeCityRay(9, 225, 6, 2.5, 5.0),    // → far top-right edge
  ], []);
  return (
    <group>
      {curves.map((c, i) => <CityRay key={i} curve={c} scrollRef={scrollRef} phase={i} />)}
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.06} color="#0a1830" />
      <pointLight position={[0, 8, -30]} intensity={500} distance={160} decay={2} color="#5aa0ff" />
      <directionalLight
        position={[0, 60, 0]}
        intensity={1.0}
        color="#7fb0ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-near={1}
        shadow-camera-far={300}
        shadow-bias={-0.0005}
      />
      <hemisphereLight args={["#15407f", "#01040d", 0.25]} />
    </>
  );
}

// ─── Camera: ride along the edge of the mountains, looking out at the city ────
// Horizon-level shot (like the reference): the camera sits low at the mountain
// saddle and looks out across the glowing city basin toward the distant horizon &
// sky. As the user scrolls it drifts forward/along the ridge so the city reveals.

const _camPos = new THREE.Vector3();
const _camLook = new THREE.Vector3();

function AerialCamera({ scrollRef }) {
  const par = useParallax();
  useFrame(({ camera }, dt) => {
    const p = scrollRef ? THREE.MathUtils.clamp(scrollRef.current, 0, 1) : 0;
    const eased = p * p * (3 - 2 * p);
    const k = 1 - Math.exp(-Math.min(dt, 0.1) * 15);

    // stay at horizon height (low), gently rising as we drift forward over the
    // saddle so more of the city basin comes into view. Slight sideways drift
    // gives a feeling of moving along the mountain edge.
    // low aerial gliding over the network, looking forward-and-down across the
    // dense road web toward the horizon (matches the reference framing)
    const y = THREE.MathUtils.lerp(16, 26, eased);    // low altitude over the city
    const z = THREE.MathUtils.lerp(50, 10, eased);    // drift forward over the web
    const x = THREE.MathUtils.lerp(-6, 6, eased);     // gentle sideways drift
    // opposite-direction mouse parallax
    const m = par.update(dt);
    _camPos.set(x + m.x * PARALLAX_X, y - m.y * PARALLAX_Y, z);
    camera.position.lerp(_camPos, k);

    // aim down across the network (low look target) so the web fills the frame,
    // with just a thin strip of horizon/sky at the top
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
      dpr={[1, 1.5]}
      camera={{ position: [-6, 10, 40], fov: 58, near: 0.1, far: 800 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      style={{ width: "100%", height: "100%", background: "#010715" }}
    >
      {/* deep fog so the far city + ridges fade into the horizon haze */}
      <fog attach="fog" args={["#0a1c45", 60, 280]} />

      <AerialCamera scrollRef={scrollRef} />
      <Lighting />
      <Sky />
      <Stars />

      {/* flat open basin floor + scattered small stones (no tall walls, so the
          whole city stays visible). Soft low hills sit only at the far horizon. */}
      <Ground />
      <Stones />

      {/* the glowing blue city spread across the flat basin */}
      <City />

      {/* 3 small energy rays weaving between the cubes — they enter and travel
          through the city to the far end as the user scrolls */}
      <CityRays scrollRef={scrollRef} />

      <EffectComposer>
        {/* gentle bloom — only the bright nodes + the ~10% glowing links pick it up;
            the dim road network stays subtle */}
        <Bloom
          luminanceThreshold={0.35}
          luminanceSmoothing={0.9}
          intensity={1.1}
          radius={0.7}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
