'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useLoadingContext } from '@/contexts/LoadingContext';

// ── divaya Three.js scenes (replace the old video background) ─────────────────
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });
const Scene2 = dynamic(() => import('@/components/Scene2'), { ssr: false });
const Scene3 = dynamic(() => import('@/components/Scene3'), { ssr: false });
const Scene4 = dynamic(() => import('@/components/Scene4'), { ssr: false });
const Scene5 = dynamic(() => import('@/components/Scene5'), { ssr: false });

const MAX_SECTION = 5;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

// ── divaya scroll timeline (fraction of the full animation 0..1) ──────────────
// Copied from the divaya page.tsx timeline. Each scene owns a band of the 0..1
// progress; crossfades blend neighbouring scenes. We DON'T scroll a tall page
// here — instead each of TRONEXA's 6 discrete sections maps to a settled point
// in this timeline (SECTION_PROGRESS below) and we smoothly animate toward it.
const SCENE1_ZOOM_END = 0.1453;
const FADE_START = SCENE1_ZOOM_END;
const FADE_END = 0.1546;
const S3_DRONE_END = 0.2867;
const S3_FADE_END = 0.2960;
const S4_S3_END = 0.6883;
const S4_FADE_END = 0.6945;
const S4_END = 0.7656;
const S5_FADE_END = 0.7735;
const S5_END = 1.0;

// Where each TRONEXA section (0..5) sits on the 0..1 animation timeline. Each
// section lands on the "settled" point of its matching scene so the background
// rests on a clean composition while that section's text is shown.
const SECTION_PROGRESS = [
  0.0,                                   // section 0 → Scene 1 (hero zoom start)
  (FADE_END + S3_DRONE_END) / 2,         // section 1 → Scene 2 (drone mid-canyon)
  (S3_FADE_END + S4_S3_END) / 2,         // section 2 → Scene 3 (terrain flyover)
  S4_S3_END,                             // section 3 → Scene 3 end / into Scene 4
  (S4_FADE_END + S4_END) / 2,            // section 4 → Scene 4 (rays climbing)
  1.0,                                   // section 5 → Scene 5 (aerial, end)
];

// Compute each scene's crossfade opacity at an arbitrary timeline point `p`.
// Used both for the live frame and to look ahead at the section we're heading
// toward, so the incoming scene's Canvas is mounted (and warmed up) before its
// crossfade actually begins — otherwise the fresh canvas paints black for a few
// frames while it compiles shaders / loads the model.
function sceneOpacities(p: number): [number, number, number, number, number] {
  const cross = clamp01((p - FADE_START) / (FADE_END - FADE_START));
  const cross3 = clamp01((p - S3_DRONE_END) / (S3_FADE_END - S3_DRONE_END));
  const cross4 = clamp01((p - S4_S3_END) / (S4_FADE_END - S4_S3_END));
  const cross5 = clamp01((p - S4_END) / (S5_FADE_END - S4_END));
  return [
    1 - cross,              // scene 1
    cross * (1 - cross3),   // scene 2
    cross3 * (1 - cross4),  // scene 3
    cross4 * (1 - cross5),  // scene 4
    cross5,                 // scene 5
  ];
}

function dispatchSectionChange(index: number) {
  window.dispatchEvent(new CustomEvent('sectionchange', { detail: { index } }));
}
function dispatchSectionSettled(index: number) {
  window.dispatchEvent(new CustomEvent('sectionsettled', { detail: { index } }));
}
function updateProgressBar(section: number) {
  const bar = document.getElementById('scroll-progress-bar');
  if (bar) bar.style.width = `${(section / MAX_SECTION) * 100}%`;
}

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [overlayMounted, setOverlayMounted] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const { setIsLoaded } = useLoadingContext();

  const currentSectionRef = useRef(0);
  const isLoadedRef = useRef(false);
  const parallaxRafRef = useRef<number | null>(null);
  const currentMXRef = useRef(0), currentMYRef = useRef(0);
  const targetMXRef = useRef(0), targetMYRef = useRef(0);

  // ── animation drive state ──────────────────────────────────────────────────
  // targetRef  = the timeline point we're easing toward (set per section)
  // smoothRef  = the eased current timeline point fed to every scene
  const targetRef = useRef(0);
  const smoothRef = useRef(0);

  // per-scene progress refs handed to each Scene component (0..1 within the scene)
  const sceneRef = useRef(0);
  const scene2ScrollRef = useRef(0);
  const scene3ScrollRef = useRef(0);
  const scene4ScrollRef = useRef(0);
  const scene5ScrollRef = useRef(0);

  // scene layer DOM refs (for crossfade opacity)
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);

  // PERF: only mount the <Canvas> for scenes that are actually visible (the
  // active scene plus any it's currently crossfading into). Keeping all 5
  // canvases mounted ran 5 WebGL contexts + 5 Bloom postprocessing passes every
  // frame even when 4 were at opacity 0 — the main source of the lag. `visible`
  // is a bitmask-ish boolean tuple [s1..s5]; we only flip React state when the
  // set of live scenes changes, so per-frame opacity updates stay ref-driven.
  const [visible, setVisible] = useState<[boolean, boolean, boolean, boolean, boolean]>([
    true, false, false, false, false,
  ]);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  const switchToSection = useCallback((targetSection: number) => {
    if (!isLoadedRef.current) return;
    if (targetSection < 0 || targetSection > MAX_SECTION) return;
    if (targetSection === currentSectionRef.current) return;

    // point the animation timeline at the new section's settled progress
    targetRef.current = SECTION_PROGRESS[targetSection];

    currentSectionRef.current = targetSection;
    setCurrentSection(targetSection);
    dispatchSectionChange(targetSection);
    dispatchSectionSettled(targetSection);
    updateProgressBar(targetSection);
  }, []);

  const goNext = useCallback(() => {
    const next = currentSectionRef.current + 1;
    if (next > MAX_SECTION) return;
    switchToSection(next);
  }, [switchToSection]);

  const goBack = useCallback(() => {
    const prev = currentSectionRef.current - 1;
    if (prev < 0) return;
    switchToSection(prev);
  }, [switchToSection]);

  const wheelDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelFiredRef = useRef(false);
  const lastNavClickRef = useRef(0);

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (!isLoadedRef.current) return;
      if (wheelFiredRef.current) return;
      const now = Date.now();
      if (now - lastNavClickRef.current < 2000) return;
      wheelFiredRef.current = true;
      lastNavClickRef.current = now;

      if (e.deltaY > 0) {
        goNext();
      } else if (e.deltaY < 0) {
        goBack();
      }

      if (wheelDebounceRef.current) clearTimeout(wheelDebounceRef.current);
      wheelDebounceRef.current = setTimeout(() => {
        wheelFiredRef.current = false;
      }, 800);
    }

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      if (wheelDebounceRef.current) clearTimeout(wheelDebounceRef.current);
    };
  }, [goNext, goBack]);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      targetMXRef.current = e.clientX / window.innerWidth - 0.5;
      targetMYRef.current = e.clientY / window.innerHeight - 0.5;
    }

    function onNavigateSection(e: Event) {
      if (!isLoadedRef.current) return;
      const idx = Math.max(0, Math.min(MAX_SECTION, (e as CustomEvent<{ index: number }>).detail.index));
      switchToSection(idx);
    }

    // ── single rAF loop: gentle parallax + ease the timeline toward target ────
    let lastT = performance.now();
    function renderFrame() {
      // container parallax (mirrors the old video parallax feel)
      const container = containerRef.current;
      if (container) {
        const dx = (targetMXRef.current - currentMXRef.current) * 0.04;
        const dy = (targetMYRef.current - currentMYRef.current) * 0.04;
        if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
          currentMXRef.current += dx;
          currentMYRef.current += dy;
          container.style.transform = `translate(${currentMXRef.current * 75}px, ${currentMYRef.current * 62}px) scale(1.1)`;
        }
      }

      // constant-speed ease of the timeline toward the active section's point
      const now = performance.now();
      const dt = Math.min((now - lastT) / 1000, 0.1);
      lastT = now;

      const MAX_SPEED = 0.16;   // timeline fraction per second
      const EASE_ZONE = 0.04;
      const diff = targetRef.current - smoothRef.current;
      const dist = Math.abs(diff);
      const speed = MAX_SPEED * Math.min(1, dist / EASE_ZONE);
      const move = Math.min(dist, speed * dt);
      smoothRef.current += Math.sign(diff) * move;
      const p = smoothRef.current;

      // feed each scene its remapped local progress (divaya timeline math).
      // Crossfade opacities are computed separately in sceneOpacities(p) below.
      sceneRef.current = clamp01(p / SCENE1_ZOOM_END);
      scene2ScrollRef.current = clamp01((p - FADE_END) / (S3_DRONE_END - FADE_END));
      scene3ScrollRef.current = clamp01((p - S3_FADE_END) / (S4_S3_END - S3_FADE_END));
      scene4ScrollRef.current = clamp01((p - S4_FADE_END) / (S4_END - S4_FADE_END));
      scene5ScrollRef.current = clamp01((p - S5_FADE_END) / (S5_END - S5_FADE_END));

      // per-scene opacities: scene1 on top, then 2,3,4,5 underneath
      const [o1, o2, o3, o4, o5] = sceneOpacities(p);
      if (scene1Ref.current) scene1Ref.current.style.opacity = String(o1);
      if (scene2Ref.current) scene2Ref.current.style.opacity = String(o2);
      if (scene3Ref.current) scene3Ref.current.style.opacity = String(o3);
      if (scene4Ref.current) scene4Ref.current.style.opacity = String(o4);
      if (scene5Ref.current) scene5Ref.current.style.opacity = String(o5);

      // PERF + no-flash: a scene's Canvas is mounted if it's visible NOW *or* if
      // it will be visible at the section we're animating toward. Mounting the
      // incoming scene as soon as the jump starts gives it time to warm up
      // (compile shaders / load the model) and paint a real frame before its
      // crossfade reaches it — so you never see the layer's black background.
      // Once we settle (p ≈ target), the look-ahead set collapses to the live
      // set, so off-screen scenes unmount and only 1–2 canvases keep running.
      const EPS = 0.001;
      const tgt = sceneOpacities(targetRef.current);
      const next: [boolean, boolean, boolean, boolean, boolean] = [
        o1 > EPS || tgt[0] > EPS,
        o2 > EPS || tgt[1] > EPS,
        o3 > EPS || tgt[2] > EPS,
        o4 > EPS || tgt[3] > EPS,
        o5 > EPS || tgt[4] > EPS,
      ];
      const cur = visibleRef.current;
      if (
        next[0] !== cur[0] || next[1] !== cur[1] || next[2] !== cur[2] ||
        next[3] !== cur[3] || next[4] !== cur[4]
      ) {
        visibleRef.current = next;
        setVisible(next);
      }

      parallaxRafRef.current = requestAnimationFrame(renderFrame);
    }

    // the 3D background loads instantly (no video buffering); mark loaded shortly
    function markLoaded() {
      if (isLoadedRef.current) return;
      isLoadedRef.current = true;

      setOverlayVisible(false);
      setTimeout(() => {
        setOverlayMounted(false);
        setIsLoaded(true);
        dispatchSectionChange(0);
        dispatchSectionSettled(0);
      }, 500);
    }
    const loadTimer = setTimeout(markLoaded, 600);

    parallaxRafRef.current = requestAnimationFrame(renderFrame);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('navigatesection', onNavigateSection);

    return () => {
      if (parallaxRafRef.current !== null) cancelAnimationFrame(parallaxRafRef.current);
      clearTimeout(loadTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('navigatesection', onNavigateSection);
    };
  }, [setIsLoaded, switchToSection]);

  const btnBase: React.CSSProperties = {
    border: '1px solid rgba(255,255,255,0.55)',
    color: 'white',
    background: 'transparent',
    padding: '12px 28px',
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.2s, color 0.2s, opacity 0.3s',
  };

  const layerBase: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  };

  return (
    <>
      {/* Parallax container holds the 5 stacked Three.js scenes */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          zIndex: 0,
          willChange: 'transform',
          transform: 'scale(1.1)',
          overflow: 'hidden',
        }}
      >
        {/* Each layer div stays mounted (it owns the opacity ref read every
            frame); only the heavy <Canvas> inside mounts while the scene is
            visible, so just 1–2 WebGL contexts + Bloom passes run at once. */}
        {/* SCENE 5 — top-down aerial; fades in at the very end (above scene 4) */}
        <div ref={scene5Ref} style={{ ...layerBase, background: '#010715', opacity: 0, zIndex: 5 }}>
          {visible[4] && <Scene5 scrollRef={scene5ScrollRef} />}
        </div>
        {/* SCENE 4 — climbing rays; bottom layer */}
        <div ref={scene4Ref} style={{ ...layerBase, background: '#16215a', opacity: 0, zIndex: 1 }}>
          {visible[3] && <Scene4 scrollRef={scene4ScrollRef} />}
        </div>
        {/* SCENE 3 — terrain + energy rivers */}
        <div ref={scene3Ref} style={{ ...layerBase, background: '#020814', opacity: 0, zIndex: 2 }}>
          {visible[2] && <Scene3 scrollRef={scene3ScrollRef} />}
        </div>
        {/* SCENE 2 — canyon drone */}
        <div ref={scene2Ref} style={{ ...layerBase, background: '#020814', opacity: 0, zIndex: 3 }}>
          {visible[1] && <Scene2 scrollRef={scene2ScrollRef} />}
        </div>
        {/* SCENE 1 — hero model; on top, fades out during the zoom */}
        <div ref={scene1Ref} style={{ ...layerBase, background: '#010715', overflow: 'hidden', zIndex: 4 }}>
          {visible[0] && <Scene scrollRef={sceneRef} />}
        </div>
      </div>

      {/* Mobile gradient overlay — bottom fade for text readability */}
      <div
        className="mobile-gradient-overlay"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
          display: 'none',
        }}
      />

      {/* Back / Next navigation — desktop only */}
      {!overlayMounted && (
        <div
          className="hide-on-mobile"
          style={{
            position: 'fixed',
            bottom: 75,
            right: 50,
            display: 'flex',
            gap: 10,
            zIndex: 50,
          }}
        >
          <button
            onClick={() => {
              const now = Date.now();
              if (now - lastNavClickRef.current < 2000) return;
              lastNavClickRef.current = now;
              goBack();
            }}
            disabled={currentSection === 0}
            style={{
              ...btnBase,
              opacity: currentSection === 0 ? 0 : 1,
              pointerEvents: currentSection === 0 ? 'none' : 'auto',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'black'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}
          >
            ← BACK
          </button>

          <button
            onClick={() => {
              const now = Date.now();
              if (now - lastNavClickRef.current < 2000) return;
              lastNavClickRef.current = now;
              goNext();
            }}
            disabled={currentSection >= MAX_SECTION}
            style={{
              ...btnBase,
              opacity: currentSection >= MAX_SECTION ? 0 : 1,
              pointerEvents: currentSection >= MAX_SECTION ? 'none' : 'auto',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'black'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}
          >
            NEXT →
          </button>
        </div>
      )}

      {/* Scroll progress bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0, left: 0,
          width: '100%', height: 3,
          zIndex: 100,
          background: 'rgba(255,255,255,0.15)',
          pointerEvents: 'none',
        }}
      >
        <div
          id="scroll-progress-bar"
          style={{ height: '100%', width: '0%', background: 'white', transition: 'width 0.3s ease' }}
        />
      </div>

      {/* Loading overlay */}
      {overlayMounted && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.5s ease',
            opacity: overlayVisible ? 1 : 0,
            pointerEvents: overlayVisible ? 'auto' : 'none',
          }}
        >
          <div style={{ color: '#fff', fontFamily: 'sans-serif', fontSize: 18, letterSpacing: 2 }}>
            Loading...
          </div>
        </div>
      )}
    </>
  );
}
