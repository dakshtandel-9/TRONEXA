'use client';

import { useEffect, useRef, useState } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';

const SEQUENCES = [
  { folder: '1', frames: 240 },
  { folder: '2', frames: 240 },
  { folder: '3', frames: 240 },
  { folder: '4', frames: 240 },
  { folder: '5', frames: 150 },
];

const TOTAL_FRAMES = SEQUENCES.reduce((sum, s) => sum + s.frames, 0);

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

    // images[seqIndex][frameIndex]
    const images: HTMLImageElement[][] = SEQUENCES.map(seq =>
      new Array(seq.frames)
    );

    let dirty = true;
    let rafId: number | null = null;

    // Current resolved frame: which sequence and which frame within it
    let currentSeq = 0;
    let currentFrame = 0;

    let targetMX = 0, targetMY = 0;
    let currentMX = 0, currentMY = 0;

    // Auto-play state: global frame index advancing at ~24fps
    let autoFrameIndex = 0;
    let lastFrameTime = 0;
    const MS_PER_FRAME = 1000 / 24;
    let autoPlaying = true;

    function globalFrameToSeqFrame(gf: number): { seq: number; frame: number } {
      let remaining = gf;
      for (let si = 0; si < SEQUENCES.length; si++) {
        if (remaining < SEQUENCES[si].frames) {
          return { seq: si, frame: remaining };
        }
        remaining -= SEQUENCES[si].frames;
      }
      const lastSeq = SEQUENCES.length - 1;
      return { seq: lastSeq, frame: SEQUENCES[lastSeq].frames - 1 };
    }

    function tickAutoPlay(now: number) {
      if (!autoPlaying) return;
      if (now - lastFrameTime >= MS_PER_FRAME) {
        lastFrameTime = now;
        if (autoFrameIndex < TOTAL_FRAMES - 1) {
          autoFrameIndex++;
          const { seq, frame } = globalFrameToSeqFrame(autoFrameIndex);
          if (seq !== currentSeq || frame !== currentFrame) {
            currentSeq = seq;
            currentFrame = frame;
            dirty = true;
          }
          const progress = autoFrameIndex / (TOTAL_FRAMES - 1);
          const bar = document.getElementById('scroll-progress-bar');
          if (bar) bar.style.width = `${progress * 100}%`;
        } else {
          autoPlaying = false;
        }
      }
    }

    function setSize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
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

      const slackX = iw - sWidth;
      const slackY = ih - sHeight;

      const sx = Math.max(0, Math.min(slackX, slackX / 2 + currentMX * slackX * 0.35));
      const sy = Math.max(0, Math.min(slackY, slackY / 2 + currentMY * slackY * 0.35));

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cw, ch);
    }

    function render(now: number) {
      if (!ctx) return;
      rafId = requestAnimationFrame(render);

      tickAutoPlay(now);

      const dx = (targetMX - currentMX) * 0.07;
      const dy = (targetMY - currentMY) * 0.07;
      if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
        currentMX += dx;
        currentMY += dy;
        dirty = true;
      }

      if (!dirty) return;
      dirty = false;

      const img = images[currentSeq]?.[currentFrame];
      if (img?.complete && img.naturalWidth > 0) {
        drawFrame(img);
      }
    }

    function onScroll() {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      // Scroll seeks the animation — take whichever is further along
      const scrollGlobalFrame = Math.round(progress * (TOTAL_FRAMES - 1));
      if (scrollGlobalFrame > autoFrameIndex) {
        autoFrameIndex = scrollGlobalFrame;
        const { seq, frame } = globalFrameToSeqFrame(autoFrameIndex);
        if (seq !== currentSeq || frame !== currentFrame) {
          currentSeq = seq;
          currentFrame = frame;
          dirty = true;
        }
      }

      const bar = document.getElementById('scroll-progress-bar');
      if (bar) bar.style.width = `${progress * 100}%`;
    }

    function onResize() { setSize(); }

    function onMouseMove(e: MouseEvent) {
      targetMX = e.clientX / window.innerWidth - 0.5;
      targetMY = e.clientY / window.innerHeight - 0.5;
    }

    setSize();
    rafId = requestAnimationFrame(render);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Preload all frames across all sequences
    let totalLoaded = 0;
    SEQUENCES.forEach((seq, si) => {
      for (let fi = 0; fi < seq.frames; fi++) {
        const img = new Image();
        images[si][fi] = img;
        img.onload = () => {
          totalLoaded++;
          setLoadProgress(Math.round((totalLoaded / TOTAL_FRAMES) * 100));
          if (totalLoaded === 1) dirty = true;
          if (totalLoaded === TOTAL_FRAMES) {
            setFadeOut(true);
            setTimeout(() => { setLoaded(true); setIsLoaded(true); }, 400);
          }
        };
        img.onerror = () => {
          totalLoaded++;
          if (totalLoaded === TOTAL_FRAMES) {
            setFadeOut(true);
            setTimeout(() => { setLoaded(true); setIsLoaded(true); }, 400);
          }
        };
        img.src = `/sequence/${seq.folder}/ezgif-frame-${padFrame(fi + 1)}.jpg`;
      }
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
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
