'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';

const MAX_SECTION = 5;

const VIDEO_SRCS = [
  '/sequence/final(720p)1.mp4',
  '/sequence/final(720p)2.mp4',
  '/sequence/final(720p)3.mp4',
  '/sequence/final(720p)4.mp4',
  '/sequence/final(720p)5.mp4',
];

function getVideoIndex(section: number): number {
  return Math.min(section, VIDEO_SRCS.length - 1);
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
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

  const easeOutRafsRef = useRef<Map<number, number>>(new Map());

  const startEaseOut = useCallback((video: HTMLVideoElement, idx: number) => {
    const EASE_WINDOW = 0.5; // seconds before end to start easing
    const MIN_RATE = 0.55;

    function tick() {
      if (!video.duration || video.paused || video.ended) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= EASE_WINDOW) {
        // ease out: cubic easing from 1 → MIN_RATE
        const t = remaining / EASE_WINDOW; // 1 → 0
        const eased = MIN_RATE + (1 - MIN_RATE) * (t * t * t);
        video.playbackRate = eased;
        if (remaining < 0.05) {
          video.pause();
          video.playbackRate = 1;
          easeOutRafsRef.current.delete(idx);
          return;
        }
      } else {
        video.playbackRate = 1;
      }
      easeOutRafsRef.current.set(idx, requestAnimationFrame(tick));
    }

    const existing = easeOutRafsRef.current.get(idx);
    if (existing) cancelAnimationFrame(existing);
    easeOutRafsRef.current.set(idx, requestAnimationFrame(tick));
  }, []);

  const switchToSection = useCallback((targetSection: number) => {
    if (!isLoadedRef.current) return;
    if (targetSection < 0 || targetSection > MAX_SECTION) return;
    if (targetSection === currentSectionRef.current) return;

    const oldIdx = getVideoIndex(currentSectionRef.current);
    const newIdx = getVideoIndex(targetSection);
    const oldVideo = videoRefs.current[oldIdx];
    const newVideo = videoRefs.current[newIdx];

    if (oldVideo) {
      oldVideo.style.opacity = '0';
      const oldRaf = easeOutRafsRef.current.get(oldIdx);
      if (oldRaf) { cancelAnimationFrame(oldRaf); easeOutRafsRef.current.delete(oldIdx); }
    }

    if (newVideo && newIdx !== oldIdx) {
      newVideo.currentTime = 0;
      newVideo.playbackRate = 1;
      newVideo.play().catch(() => {});
      newVideo.style.opacity = '1';
      startEaseOut(newVideo, newIdx);
    } else if (newVideo) {
      newVideo.style.opacity = '1';
    }

    currentSectionRef.current = targetSection;
    setCurrentSection(targetSection);
    dispatchSectionChange(targetSection);
    dispatchSectionSettled(targetSection);
    updateProgressBar(targetSection);
  }, [startEaseOut]);

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
      if (now - lastNavClickRef.current < 5000) return;
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

    function renderParallax() {
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
      parallaxRafRef.current = requestAnimationFrame(renderParallax);
    }

    const firstVideo = videoRefs.current[0];
    let markLoadedCalled = false;

    function markLoaded() {
      if (markLoadedCalled) return;
      markLoadedCalled = true;
      isLoadedRef.current = true;

      firstVideo?.play().catch(() => {});
      if (firstVideo) startEaseOut(firstVideo, 0);

      setOverlayVisible(false);
      setTimeout(() => {
        setOverlayMounted(false);
        setIsLoaded(true);
        dispatchSectionChange(0);
        dispatchSectionSettled(0);
      }, 500);
    }

    if (!firstVideo || firstVideo.readyState >= 2) {
      markLoaded();
    } else {
      const onReady = () => {
        firstVideo.removeEventListener('loadeddata', onReady);
        firstVideo.removeEventListener('canplaythrough', onReady);
        firstVideo.removeEventListener('error', onReady);
        markLoaded();
      };
      firstVideo.addEventListener('loadeddata', onReady);
      firstVideo.addEventListener('canplaythrough', onReady);
      firstVideo.addEventListener('error', onReady);
      setTimeout(markLoaded, 5000);
    }

    parallaxRafRef.current = requestAnimationFrame(renderParallax);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('navigatesection', onNavigateSection);

    return () => {
      if (parallaxRafRef.current !== null) cancelAnimationFrame(parallaxRafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('navigatesection', onNavigateSection);
    };
  }, [setIsLoaded, switchToSection, startEaseOut]);

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

  return (
    <>
      {/* Parallax container holds all 5 videos stacked */}
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
        {VIDEO_SRCS.map((src, i) => (
          <video
            key={src}
            ref={el => { videoRefs.current[i] = el; }}
            src={src}
            playsInline
            muted
            preload={i === 0 ? 'auto' : 'metadata'}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              opacity: i === 0 ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          />
        ))}
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
              if (now - lastNavClickRef.current < 5000) return;
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
              if (now - lastNavClickRef.current < 5000) return;
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
