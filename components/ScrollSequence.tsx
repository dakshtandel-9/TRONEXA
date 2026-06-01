'use client';

import { useEffect, useRef, useState } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';

const SEQUENCES = [
  { folder: '1', frames: 300 },
  { folder: '2', frames: 240 },
  { folder: '3', frames: 240 },
  { folder: '4', frames: 240 },
  { folder: '5', frames: 300 },
];

const TOTAL_FRAMES = SEQUENCES.reduce((sum, s) => sum + s.frames, 0);
const MAX_SECTION = SEQUENCES.length; // sections 0-4 = sequences, 5 = end state

function padFrame(n: number): string {
  return String(n).padStart(3, '0');
}

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const { setIsLoaded } = useLoadingContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images: HTMLImageElement[][] = SEQUENCES.map(seq => new Array(seq.frames));

    let dirty = true;
    let rafId: number | null = null;

    let currentSeq = 0;
    let currentFrame = 0;

    let targetMX = 0, targetMY = 0;
    let currentMX = 0, currentMY = 0;

    let sectionIndex = 0;
    let frameInSection = 0;
    let sectionDone = false;
    let loadingComplete = false;
    let playingReverse = false;

    // Autoplay timing — 60 fps
    let lastFrameTime = 0;
    const MS_PER_FRAME = 1000 / 60;

    // Auto-advance: after a section finishes, wait this long then move to the next
    let sectionDoneAt = 0;
    const AUTO_ADVANCE_DELAY = 1200; // ms pause between sections

    // Scroll accumulation — lower threshold for snappier response
    let scrollAccum = 0;
    const SCROLL_THRESHOLD = 80;
    let wheelCooldown = false;

    // Set when user scrolls forward while animation is still playing.
    // Instead of skipping frames, the animation completes normally then
    // advances immediately (no AUTO_ADVANCE_DELAY pause).
    let pendingAdvance = false;

    function dispatchSectionChange(index: number) {
      window.dispatchEvent(new CustomEvent('sectionchange', { detail: { index } }));
    }

    function advanceSection() {
      const next = sectionIndex + 1;
      if (next > MAX_SECTION) return;
      sectionIndex = next;
      sectionDone = false;
      sectionDoneAt = 0;
      playingReverse = false;
      currentSeq = Math.min(sectionIndex, SEQUENCES.length - 1);
      // End state (LEGACY): freeze on the last frame of the final sequence
      if (sectionIndex >= SEQUENCES.length) {
        const lastFrame = SEQUENCES[SEQUENCES.length - 1].frames - 1;
        frameInSection = lastFrame;
        currentFrame = lastFrame;
      } else {
        frameInSection = 0;
        currentFrame = 0;
      }
      dirty = true;
      dispatchSectionChange(sectionIndex);
    }

    function retreatSection() {
      sectionDoneAt = 0;
      pendingAdvance = false;
      // If mid-section, jump back to its start and replay forward
      if (frameInSection > 0 && !playingReverse) {
        frameInSection = 0;
        currentFrame = 0;
        sectionDone = false;
        dirty = true;
        return;
      }
      // At the start of a section — step into the previous one and reverse
      if (sectionIndex === 0) return;
      sectionIndex--;
      currentSeq = sectionIndex;
      frameInSection = SEQUENCES[sectionIndex].frames - 1;
      currentFrame = frameInSection;
      sectionDone = false;
      playingReverse = true;
      dirty = true;
      dispatchSectionChange(sectionIndex);
    }

    function tickAutoPlay(now: number) {
      if (!loadingComplete) return;

      // End state: nothing to animate
      if (sectionIndex >= SEQUENCES.length && !playingReverse) {
        if (!sectionDone) {
          sectionDone = true;
          const bar = document.getElementById('scroll-progress-bar');
          if (bar) bar.style.width = '100%';
        }
        return;
      }

      if (sectionDone) {
        // Auto-advance to the next section after a short pause
        if (sectionDoneAt === 0) sectionDoneAt = now;
        if (now - sectionDoneAt >= AUTO_ADVANCE_DELAY) {
          sectionDoneAt = 0;
          advanceSection();
        }
        return;
      }
      if (now - lastFrameTime < MS_PER_FRAME) return;
      lastFrameTime = now;

      if (playingReverse) {
        if (frameInSection > 0) {
          frameInSection--;
          currentFrame = frameInSection;
          currentSeq = sectionIndex;
          dirty = true;
        } else {
          sectionDone = true;
          playingReverse = false;
        }
      } else {
        const maxFrame = SEQUENCES[sectionIndex].frames - 1;
        if (frameInSection < maxFrame) {
          frameInSection++;
          currentFrame = frameInSection;
          dirty = true;
        } else {
          sectionDone = true;
          if (pendingAdvance) {
            // User already scrolled — skip the pause and advance right away
            pendingAdvance = false;
            advanceSection();
          }
        }
      }

      // Update progress bar
      const framesBefore = SEQUENCES.slice(0, sectionIndex).reduce((s, sq) => s + sq.frames, 0);
      const globalFrame = framesBefore + frameInSection;
      const bar = document.getElementById('scroll-progress-bar');
      if (bar) bar.style.width = `${(globalFrame / (TOTAL_FRAMES - 1)) * 100}%`;
    }

    const PAD = 80;

    function setSize() {
      canvas!.width = window.innerWidth + PAD * 2;
      canvas!.height = window.innerHeight + PAD * 2;
      dirty = true;
    }

    function drawFrame(img: HTMLImageElement) {
      if (!canvas || !ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;
      let sWidth = iw, sHeight = ih;
      if (imgRatio > canvasRatio) {
        sWidth = ih * canvasRatio;
      } else {
        sHeight = iw / canvasRatio;
      }
      ctx.drawImage(img, (iw - sWidth) / 2, (ih - sHeight) / 2, sWidth, sHeight, 0, 0, cw, ch);
    }

    function render(now: number) {
      if (!ctx) return;
      rafId = requestAnimationFrame(render);
      tickAutoPlay(now);

      const dx = (targetMX - currentMX) * 0.04;
      const dy = (targetMY - currentMY) * 0.04;
      if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
        currentMX += dx;
        currentMY += dy;
        canvas!.style.transform = `translate(${currentMX * 75}px, ${currentMY * 62}px)`;
        dirty = true;
      }

      if (!dirty) return;
      dirty = false;

      const img = images[currentSeq]?.[currentFrame];
      if (img?.complete && img.naturalWidth > 0) {
        drawFrame(img);
      }
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (!loadingComplete || wheelCooldown) return;

      scrollAccum += e.deltaY;
      if (Math.abs(scrollAccum) < SCROLL_THRESHOLD) return;

      const direction = scrollAccum > 0 ? 1 : -1;
      scrollAccum = 0;

      wheelCooldown = true;
      setTimeout(() => { wheelCooldown = false; }, 400);

      if (direction > 0) {
        playingReverse = false;
        if (sectionDone) {
          // Section already finished — advance immediately
          pendingAdvance = false;
          advanceSection();
        } else {
          // Still playing — let animation finish, then advance with no pause
          pendingAdvance = true;
        }
      } else {
        pendingAdvance = false;
        retreatSection();
      }
    }

    function onResize() { setSize(); }

    function onMouseMove(e: MouseEvent) {
      targetMX = e.clientX / window.innerWidth - 0.5;
      targetMY = e.clientY / window.innerHeight - 0.5;
    }

    function onNavigateSection(e: Event) {
      if (!loadingComplete) return;
      const target = (e as CustomEvent<{ index: number }>).detail.index;
      const clamped = Math.max(0, Math.min(MAX_SECTION, target));
      if (clamped === sectionIndex) return;
      sectionIndex = clamped;
      sectionDone = false;
      sectionDoneAt = 0;
      pendingAdvance = false;
      playingReverse = false;
      currentSeq = Math.min(sectionIndex, SEQUENCES.length - 1);
      if (sectionIndex >= SEQUENCES.length) {
        const lastFrame = SEQUENCES[SEQUENCES.length - 1].frames - 1;
        frameInSection = lastFrame;
        currentFrame = lastFrame;
      } else {
        frameInSection = 0;
        currentFrame = 0;
      }
      dirty = true;
      dispatchSectionChange(sectionIndex);
    }

    function onLoadingComplete() {
      loadingComplete = true;
      lastFrameTime = 0;
      dispatchSectionChange(0);
    }

    setSize();
    rafId = requestAnimationFrame(render);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('navigatesection', onNavigateSection);

    let totalLoaded = 0;
    SEQUENCES.forEach((seq, si) => {
      for (let fi = 0; fi < seq.frames; fi++) {
        const img = new Image();
        images[si][fi] = img;
        const onDone = () => {
          totalLoaded++;
          setLoadProgress(Math.round((totalLoaded / TOTAL_FRAMES) * 100));
          if (totalLoaded === TOTAL_FRAMES) {
            setFadeOut(true);
            setTimeout(() => {
              setLoaded(true);
              setIsLoaded(true);
              onLoadingComplete();
            }, 400);
          }
        };
        img.onload = onDone;
        img.onerror = onDone;
        img.src = `/sequence/${seq.folder}/ezgif-frame-${padFrame(fi + 1)}.jpg`;
      }
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('navigatesection', onNavigateSection);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: -80,
          left: -80,
          width: 'calc(100vw + 160px)',
          height: 'calc(100vh + 160px)',
          zIndex: -1,
          willChange: 'transform',
        }}
      />

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 3,
          zIndex: 100,
          background: 'rgba(255,255,255,0.15)',
          pointerEvents: 'none',
        }}
      >
        <div
          id="scroll-progress-bar"
          style={{
            height: '100%',
            width: '0%',
            background: 'white',
            transition: 'width 0.05s linear',
          }}
        />
      </div>

      {!loaded && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.4s ease',
            opacity: fadeOut ? 0 : 1,
            pointerEvents: fadeOut ? 'none' : 'auto',
          }}
        >
          <div style={{ color: '#fff', fontFamily: 'sans-serif', fontSize: 18, letterSpacing: 2 }}>
            Loading... {loadProgress}%
          </div>
        </div>
      )}
    </>
  );
}
