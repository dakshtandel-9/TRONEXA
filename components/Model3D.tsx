'use client';

import { useEffect, useRef } from 'react';
import type { Object3D } from 'three';

export default function Model3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let disposed = false;

    async function init() {
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      if (disposed) return;

      // Capture as non-null so TypeScript keeps the type across await boundaries
      const c = canvas as HTMLCanvasElement;

      // Wait for the canvas to have non-zero dimensions before initialising
      await new Promise<void>(resolve => {
        if (c.offsetWidth > 0 && c.offsetHeight > 0) { resolve(); return; }
        const ro = new ResizeObserver(() => {
          if (c.offsetWidth > 0 && c.offsetHeight > 0) { ro.disconnect(); resolve(); }
        });
        ro.observe(c);
      });
      if (disposed) return;

      const w = c.offsetWidth || c.parentElement?.offsetWidth || 420;
      const h = c.offsetHeight || c.parentElement?.offsetHeight || 420;

      const renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
      camera.position.set(0, 0, 5);

      scene.add(new THREE.AmbientLight(0xffffff, 1.2));
      const dir = new THREE.DirectionalLight(0xffffff, 2.5);
      dir.position.set(3, 5, 5);
      scene.add(dir);
      const fill = new THREE.DirectionalLight(0x88aaff, 0.8);
      fill.position.set(-3, -2, -3);
      scene.add(fill);

      let model: Object3D | null = null;

      new GLTFLoader().load('/3d.glb', (gltf) => {
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);
        const scale = 2.8 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y += 0.6;
        scene.add(model);
      });

      const handleResize = () => {
        if (!canvas) return;
        const rw = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 420;
        const rh = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 420;
        renderer.setSize(rw, rh);
        camera.aspect = rw / rh;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', handleResize);

      let start = performance.now();
      function animate() {
        animId = requestAnimationFrame(animate);
        if (model) {
          const t = (performance.now() - start) / 1000;
          model.rotation.y = -Math.PI / 2 + (t * (2 * Math.PI / 5)) % (2 * Math.PI);
          model.rotation.x = Math.sin(t * 0.25) * 0.06;
        }
        renderer.render(scene, camera);
      }
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    }

    let innerCleanup: (() => void) | void;
    init().then(fn => { innerCleanup = fn; });

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      innerCleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
