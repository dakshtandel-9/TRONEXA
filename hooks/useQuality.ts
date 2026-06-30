'use client';

import { useEffect, useState } from 'react';

/**
 * Detects whether the device should run the 3D scenes in a cheaper "low" tier.
 *
 * The Three.js scenes (Bloom + postprocessing + shadows + many lights + high DPR)
 * run smoothly on Apple GPUs but choke on integrated Windows GPUs and mid/low-end
 * Android chips. `lowEnd` is true for phone-width viewports OR machines that look
 * weak by hardware hints, so each scene can disable its most expensive work:
 *
 *   - high tier  → full DPR (up to 1.25), antialias, shadows, full postprocessing
 *   - low  tier  → DPR 1, no antialias, no shadows, Bloom-only postprocessing
 *
 * Resolves synchronously on first render where possible (so the Canvas mounts at
 * the right quality immediately) and updates on viewport resize.
 */

function detectLowEnd(): boolean {
  if (typeof window === 'undefined') return false;

  // Phone-width viewports are always treated as low tier.
  const isMobileWidth = window.matchMedia('(max-width: 768px)').matches;
  // Coarse pointer (touch) is a strong signal for phones/tablets.
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;

  // Hardware hints: few logical cores or little RAM → weak device.
  const cores = navigator.hardwareConcurrency ?? 8;
  // deviceMemory is Chromium-only (undefined elsewhere → treat as unknown/ok).
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const weakHardware = cores <= 4 || (typeof mem === 'number' && mem <= 4);

  return isMobileWidth || isCoarse || weakHardware;
}

export interface Quality {
  /** True when the device should run the cheaper render path. */
  lowEnd: boolean;
  /** DPR clamp to pass to <Canvas dpr={...}>. */
  dpr: [number, number];
  /** Whether to enable MSAA / antialias on the GL context. */
  antialias: boolean;
  /** Whether the Canvas should render real-time shadows. */
  shadows: boolean;
}

export function useQuality(): Quality {
  const [lowEnd, setLowEnd] = useState<boolean>(() => detectLowEnd());

  useEffect(() => {
    const update = () => setLowEnd(detectLowEnd());
    const mqWidth = window.matchMedia('(max-width: 768px)');
    mqWidth.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      mqWidth.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return lowEnd
    ? { lowEnd: true, dpr: [1, 1], antialias: false, shadows: false }
    : { lowEnd: false, dpr: [1, 1.25], antialias: true, shadows: true };
}
