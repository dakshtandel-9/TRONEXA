"use client";

import { useRef, useEffect } from "react";

// Shared mouse-parallax helper used by every scene's camera. Tracks the cursor as
// -1..1 across the screen and exposes a smoothed value. Each scene applies an
// OPPOSITE-direction offset (scene drifts against the cursor): cursor right →
// camera moves right → world appears to slide left.
//
// Usage in a scene's camera useFrame:
//   const par = useParallax();
//   ...
//   const { x, y } = par.update(dt);        // smoothed -1..1
//   camera.position.x += (baseX + x * PX - camera.position.x) * k;
//   camera.position.y += (baseY - y * PY - camera.position.y) * k;
export function useParallax() {
  const raw = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      raw.current.x = (e.clientX / window.innerWidth) * 2 - 1;  // -1 left .. 1 right
      raw.current.y = (e.clientY / window.innerHeight) * 2 - 1; // -1 top  .. 1 bottom
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return {
    update(dt: number) {
      const mk = 1 - Math.exp(-Math.min(dt, 0.1) * 6); // ease so the drift glides
      smooth.current.x += (raw.current.x - smooth.current.x) * mk;
      smooth.current.y += (raw.current.y - smooth.current.y) * mk;
      return smooth.current;
    },
  };
}

// per-scene parallax strength (world units of camera slide for a full cursor sweep)
export const PARALLAX_X = 0.8;
export const PARALLAX_Y = 0.5;
