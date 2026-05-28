'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 300;

function padFrame(n: number): string {
  return String(n).padStart(3, '0');
}


export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    let currentFrame = 0;
    let rafId: number | null = null;
    let dirty = true;

    // Normalized mouse offset from center (-0.5 → 0.5). Lerped for smooth easing.
    let targetMX = 0, targetMY = 0;
    let currentMX = 0, currentMY = 0;

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

      // Slack = extra source pixels available for parallax shift
      const slackX = iw - sWidth;
      const slackY = ih - sHeight;

      // Cursor left → image right: subtract mouse offset from center crop
      const sx = Math.max(0, Math.min(slackX, slackX / 2 + currentMX * slackX * 0.35));
      const sy = Math.max(0, Math.min(slackY, slackY / 2 + currentMY * slackY * 0.35));

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cw, ch);
    }

    function render() {
      rafId = requestAnimationFrame(render);

      // Lerp mouse toward target (easing factor = 0.07 ≈ smooth ~200ms settle)
      const dx = (targetMX - currentMX) * 0.07;
      const dy = (targetMY - currentMY) * 0.07;
      if (Math.abs(dx) > 0.0001 || Math.abs(dy) > 0.0001) {
        currentMX += dx;
        currentMY += dy;
        dirty = true;
      }

      if (!dirty) return;
      dirty = false;
      const img = images[currentFrame];
      if (img?.complete && img.naturalWidth > 0) {
        drawFrame(img);
      }
    }

    function onScroll() {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const frame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
      if (frame !== currentFrame) {
        currentFrame = frame;
        dirty = true;
      }

      const bar = document.getElementById('scroll-progress-bar');
      if (bar) bar.style.width = `${progress * 100}%`;
    }

    function onResize() {
      setSize();
    }

    function onMouseMove(e: MouseEvent) {
      targetMX = e.clientX / window.innerWidth - 0.5;
      targetMY = e.clientY / window.innerHeight - 0.5;
    }

    setSize();
    rafId = requestAnimationFrame(render);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      images[i] = img;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === 1) dirty = true;
        if (loadedCount === TOTAL_FRAMES) {
          setFadeOut(true);
          setTimeout(() => setLoaded(true), 400);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setFadeOut(true);
          setTimeout(() => setLoaded(true), 400);
        }
      };
      img.src = `/sequence/ezgif-frame-${padFrame(i + 1)}.jpg`;
    }

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

      {/* Scroll progress bar */}
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

      {/* Loader overlay */}
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
