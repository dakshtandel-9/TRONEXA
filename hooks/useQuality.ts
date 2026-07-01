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

// Reads the real GPU renderer string (e.g. "Intel(R) Iris(R) Xe Graphics") and
// returns true for integrated GPUs, which are FILL-RATE bound and can't sustain
// this scene's heavy additive overdraw + fullscreen post at desktop settings.
// Cached — the WebGL probe is created once.
let _gpuIsIntegrated: boolean | null = null;
function gpuIsIntegrated(): boolean {
  if (_gpuIsIntegrated !== null) return _gpuIsIntegrated;
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      _gpuIsIntegrated = true; // no WebGL → treat as weakest tier
      return _gpuIsIntegrated;
    }
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = dbg
      ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL))
      : '';
    const r = renderer.toLowerCase();
    // Integrated / low-power GPUs. Dedicated cards (NVIDIA GeForce/RTX, AMD
    // Radeon RX, Apple M-series) are NOT matched → they keep the high tier.
    _gpuIsIntegrated =
      /intel|iris|uhd graphics|hd graphics|mesa|swiftshader|microsoft basic|llvmpipe|adreno|mali|powervr/.test(
        r
      );
    return _gpuIsIntegrated;
  } catch {
    _gpuIsIntegrated = false;
    return _gpuIsIntegrated;
  }
}

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

  // Integrated-GPU laptops report 8+ cores yet are fill-rate bound → the single
  // biggest reason the scene lags even when idle on otherwise "capable" machines.
  return isMobileWidth || isCoarse || weakHardware || gpuIsIntegrated();
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
  /** WebGL powerPreference — "default" on mobile to avoid context loss on budget GPUs. */
  powerPreference: 'default' | 'high-performance';
  /** Scale factor for particle counts (0.4 on mobile, 1.0 on desktop). */
  particleScale: number;
  /** Whether procedural rock textures should be generated (skipped on mobile). */
  useRockTextures: boolean;
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
    ? {
        lowEnd: true,
        // PERF: integrated GPUs are fill-rate bound. Render at 0.85× internal
        // resolution (fewer fragments for every particle/fog/post pass) then let
        // the browser upscale — on a dark cinematic scene this is barely visible
        // but is one of the largest single FPS wins on weak GPUs.
        dpr: [0.85, 0.85],
        antialias: false,
        shadows: false,
        powerPreference: 'default',
        // PERF: aggressive particle cut. Each particle is a large soft additive
        // sprite; hundreds overlapping = massive overdraw, the #1 idle-lag cause
        // on integrated GPUs. 0.22 keeps the energy look while gutting the fill.
        particleScale: 0.22,
        useRockTextures: false,
      }
    : {
        lowEnd: false,
        // PERF: cap DPR at 1. The fullscreen Bloom/postprocessing passes cost
        // scales with pixel count; even 1.25× DPR = ~1.6× the fragment work of
        // every post pass. On a near-black cinematic scene the difference is
        // invisible but the FPS gain is large.
        dpr: [1, 1],
        antialias: true,
        shadows: true,
        powerPreference: 'high-performance',
        // PERF: desktop baseline cut to 0.6 (40% fewer particles). Scenes were
        // authored with ~35k particles (Scene 4) which is far past the point of
        // diminishing visual returns — the additive overdraw was the main GPU
        // cost even on strong GPUs.
        particleScale: 0.6,
        useRockTextures: true,
      };
}
