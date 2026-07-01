'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useLoadingContext } from '@/contexts/LoadingContext';
import LazyLoader from '@/components/LazyLoader';

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
// Scene 2's band (FADE_END → S3_DRONE_END) widened so section 2 occupies much
// more of the scroll timeline (≈2× longer). Scene 3's band absorbs the shift
// (it just starts later); scenes 4 & 5 are unchanged.
const S3_DRONE_END = 0.4267;          // was 0.2867 (+0.14 → scene-2 band ≈2× wider)
const S3_FADE_END = 0.4360;           // S3_DRONE_END + original 0.0093 crossfade
const S4_S3_END = 0.6883;
const S4_FADE_END = 0.6945;
// Scene 4's rays-climb band (S4_FADE_END→S4_END) was widened to 3× its original
// length (0.0711 → 0.2133) so section 4's animation plays out ~3× longer/slower.
// The S4→S5 crossfade keeps its width and Scene 5 still ends at 1.0, so Scene 5's
// aerial band absorbed the extra length (it's correspondingly shorter now).
// Scene 5's band (S5_FADE_END → 1.0) widened so the final section runs longer:
// S4_END is pulled earlier (Scene 4's long climb band shortens a little) so
// Scene 5 gets ~2× its previous length. Scene 5 still ends at 1.0.
const S4_END = 0.7400;               // pulled earlier again → Scene 5 even longer
const S5_FADE_END = 0.7479;          // S4_END + original 0.0079 crossfade width
const S5_END = 1.0;

// Where each TRONEXA section (0..5) sits on the 0..1 animation timeline. Each
// text section lands on its OWN scene so the pairing is 1:1:
//   text 1 → Scene 1, text 2 → Scene 2, text 3 → Scene 3, text 4 → Scene 4,
//   text 5 → Scene 5, and the last text (6) shows at the very end of Scene 5.
// Sections settle on the middle of each scene's band so the background rests on
// a clean composition while that section's text is shown.
const SECTION_PROGRESS = [
  0.0,                                   // text 1 → Scene 1 (hero zoom start)
  (FADE_END + S3_DRONE_END) / 2,         // text 2 → Scene 2 (drone mid-canyon)
  (S3_FADE_END + S4_S3_END) / 2,         // text 3 → Scene 3 (terrain flyover)
  (S4_FADE_END + S4_END) / 2,            // text 4 → Scene 4 (rays climbing)
  (S5_FADE_END + S5_END) / 2,            // text 5 → Scene 5 (aerial)
  1.0,                                   // text 6 → Scene 5 finish (last scene end)
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
  // loader state: `sceneReady` flips true only once the 3D scene has truly
  // downloaded + painted; `overlayMounted` keeps the loader up until it fades.
  const [sceneReady, setSceneReady] = useState(false);
  const modelLoadedRef = useRef(false);
  const resolveModelRef = useRef<(() => void) | null>(null);
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
  // last timeline point we actually applied to the DOM — used to skip redundant
  // opacity writes / section-sync when the timeline is settled (see renderFrame).
  const lastPRef = useRef(-1);

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

  const lastNavClickRef = useRef(0);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      targetMXRef.current = e.clientX / window.innerWidth - 0.5;
      targetMYRef.current = e.clientY / window.innerHeight - 0.5;
    }

    // ── manual wheel scrub ────────────────────────────────────────────────────
    // The wheel directly moves the timeline target (0..1) proportional to how
    // much the user scrolls — no snapping to sections, forward and back. The
    // rAF loop below eases smoothRef toward this target, so the scrub glides.
    // SCRUB_SENSITIVITY: timeline fraction per "notch" (~100px) of wheel delta.
    const SCRUB_SENSITIVITY = 0.0001125; // 0.125× of original — halved again
    // Scenes 2 and 4 scroll SLOWER: while the timeline sits inside their band the
    // wheel moves the target less per notch, so those sections take more scrolling.
    const S2_SLOW = 0.80; // 80% of normal speed within scene 2
    const S4_SLOW = 0.65; // 65% of normal speed within scene 4
    function onWheel(e: WheelEvent) {
      if (!isLoadedRef.current) return;
      const pos = targetRef.current;
      const inScene2 = pos >= FADE_END && pos <= S3_DRONE_END;
      const inScene4 = pos >= S4_FADE_END && pos <= S4_END;
      const slow = inScene2 ? S2_SLOW : inScene4 ? S4_SLOW : 1;
      const next = pos + e.deltaY * SCRUB_SENSITIVITY * slow;
      targetRef.current = clamp01(next);
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

      // PERF: when the timeline is settled (not scrubbing) the opacities and
      // per-scene progress refs don't change — skip all the DOM opacity writes,
      // sceneOpacities() math and section-sync work so an idle page doesn't churn
      // style recalcs every frame. The R3F scenes keep animating on their own.
      const moved = Math.abs(p - lastPRef.current) > 1e-5;
      if (!moved) {
        parallaxRafRef.current = requestAnimationFrame(renderFrame);
        return;
      }
      lastPRef.current = p;

      // keep the active-section state in sync with the scrub position so the
      // progress bar and side-nav highlight follow the wheel. We pick the
      // nearest section whose settled point the timeline has reached.
      let nearest = 0;
      for (let s = 0; s <= MAX_SECTION; s++) {
        if (p >= SECTION_PROGRESS[s] - 0.0001) nearest = s;
      }
      if (nearest !== currentSectionRef.current) {
        currentSectionRef.current = nearest;
        setCurrentSection(nearest);
        dispatchSectionChange(nearest);
        updateProgressBar(nearest);
      }

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
      // On-demand mounting only — at most the live scene + the one it's fading
      // toward. We do NOT force-mount all 5 at once: 5 simultaneous WebGL
      // contexts (each with its own EffectComposer) + the transition canvases
      // exhausts the browser's context limit and the next <Canvas> gets a null
      // GL context (the "Cannot read properties of null (reading 'alpha')" crash).
      // Mount ONLY the scenes currently contributing to the frame (at most the
      // two that are crossfading). Dropping the look-ahead mount keeps the live
      // WebGL-context count at ≤2 so we never exhaust the browser's context
      // limit (which caused the "reading 'alpha'" null-context crash).
      const EPS = 0.001;
      const next: [boolean, boolean, boolean, boolean, boolean] = [
        o1 > EPS,
        o2 > EPS,
        o3 > EPS,
        o4 > EPS,
        o5 > EPS,
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

    // ── REAL readiness detection ──────────────────────────────────────────────
    // Don't reveal on a fixed timer — wait until everything has actually loaded
    // and painted: (1) the page's own assets are done (document complete),
    // (2) the hero 3D model has downloaded, and (3) the first scene's <canvas>
    // has mounted AND we've seen several animation frames after it (so shaders
    // have compiled and the first real frames are on screen). Only then do we
    // tell the LazyLoader it's `ready`, which lets it finish its countdown.
    let cancelled = false;

    const waitForCanvasPaint = () =>
      new Promise<void>((resolve) => {
        const startedAt = performance.now();
        const check = () => {
          if (cancelled) return resolve();
          // wait for the FIRST scene's canvas to exist with a real backing buffer
          // (it has painted). We only mount scene 1 at start now (on-demand), so
          // we gate on scene 1 — not all five (which are never live at once).
          const canvas = scene1Ref.current?.querySelector('canvas');
          const painted = !!canvas && canvas.width > 0 && canvas.height > 0;
          // hard cap so we never hang forever on a stalled GPU/context
          const timedOut = performance.now() - startedAt > 15000;
          if (painted || timedOut) {
            // let several more frames pass so shaders finish compiling + the
            // first real frames are on screen for every scene before we reveal
            let extra = 12;
            const settle = () => {
              if (cancelled) return resolve();
              if (extra-- <= 0) return resolve();
              requestAnimationFrame(settle);
            };
            requestAnimationFrame(settle);
          } else {
            requestAnimationFrame(check);
          }
        };
        requestAnimationFrame(check);
      });

    const waitForWindowLoad = () =>
      new Promise<void>((resolve) => {
        if (document.readyState === 'complete') return resolve();
        const onLoad = () => resolve();
        window.addEventListener('load', onLoad, { once: true });
      });

    const waitForModel = () =>
      new Promise<void>((resolve) => {
        if (modelLoadedRef.current) return resolve();
        resolveModelRef.current = resolve;
      });

    async function detectReady() {
      await Promise.all([waitForWindowLoad(), waitForModel(), waitForCanvasPaint()]);
      if (cancelled) return;
      // the LazyLoader sees `ready` and finishes its countdown → onDone() flips
      // isLoadedRef so scroll/nav only become active once the loader has gone.
      setSceneReady(true);
    }
    detectReady();

    parallaxRafRef.current = requestAnimationFrame(renderFrame);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('navigatesection', onNavigateSection);

    return () => {
      cancelled = true;
      if (parallaxRafRef.current !== null) cancelAnimationFrame(parallaxRafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('wheel', onWheel);
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
        <div ref={scene5Ref} style={{ ...layerBase, background: '#02040C', opacity: 0, zIndex: 5 }}>
          {visible[4] && <Scene5 scrollRef={scene5ScrollRef} />}
        </div>
        {/* SCENE 4 — climbing rays; bottom layer */}
        <div ref={scene4Ref} style={{ ...layerBase, background: '#02040D', opacity: 0, zIndex: 1 }}>
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
          {visible[0] && (
            <Scene
              scrollRef={sceneRef}
              onModelLoaded={() => {
                modelLoadedRef.current = true;
                resolveModelRef.current?.();
                resolveModelRef.current = null;
              }}
            />
          )}
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

      {/* Lazy loader: a countdown that finishes only once the scene has truly
          loaded + painted (sceneReady), then fades out to reveal the site. */}
      {overlayMounted && (
        <LazyLoader
          ready={sceneReady}
          onDone={() => {
            isLoadedRef.current = true; // enable scroll/nav now the loader has gone
            setOverlayMounted(false);
            setIsLoaded(true);
            dispatchSectionChange(0);
            dispatchSectionSettled(0);
          }}
        />
      )}
    </>
  );
}
