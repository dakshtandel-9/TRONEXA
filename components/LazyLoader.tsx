'use client';

import { useEffect, useRef, useState } from 'react';

// ─── LazyLoader ───────────────────────────────────────────────────────────────
// A cinematic countdown loader. It ramps a progress value up on its own toward
// ~92% while the scene downloads + compiles, then — ONLY once `ready` is true
// (everything has actually loaded and painted) — completes to 100%, holds a beat,
// and fades away to reveal the site. The number shown counts UP 0→100 like a
// loading percentage; the ring drains as it fills.

export default function LazyLoader({
  ready,
  onDone,
}: {
  ready: boolean;            // becomes true when the scene has truly rendered
  onDone: () => void;        // called after the loader has fully faded out
}) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(true);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(performance.now());
  const readyRef = useRef(ready);
  readyRef.current = ready;

  useEffect(() => {
    // animate progress: ease toward 92% on a timer; once ready, race to 100%.
    function tick() {
      setProgress((prev) => {
        const target = readyRef.current ? 100 : 92;
        // ease toward the target; faster as it approaches when ready
        const speed = readyRef.current ? 0.12 : 0.025;
        const next = prev + (target - prev) * speed;
        return next > 99.5 && readyRef.current ? 100 : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // when we reach 100% AND are ready, hold a beat then fade out
  useEffect(() => {
    if (progress >= 99.9 && ready && !fading) {
      const t = setTimeout(() => setFading(true), 350);
      return () => clearTimeout(t);
    }
  }, [progress, ready, fading]);

  // after the fade transition completes, unmount + notify
  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => {
      setMounted(false);
      onDone();
    }, 650);
    return () => clearTimeout(t);
  }, [fading, onDone]);

  if (!mounted) return null;

  const pct = Math.min(100, Math.round(progress));
  // SVG ring geometry
  const R = 54;
  const C = 2 * Math.PI * R;
  const dash = C * (pct / 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#02040C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
        fontFamily: 'sans-serif',
      }}
    >
      {/* radial glow behind the ring */}
      <div
        style={{
          position: 'absolute',
          width: 360,
          height: 360,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(59,175,255,0.16) 0%, rgba(59,175,255,0.05) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      <div style={{ position: 'relative', width: 140, height: 140 }}>
        <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
          {/* track */}
          <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          {/* progress arc */}
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke="url(#lz-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            style={{ transition: 'stroke-dasharray 0.12s linear' }}
          />
          <defs>
            <linearGradient id="lz-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#79D8FF" />
              <stop offset="100%" stopColor="#238EFF" />
            </linearGradient>
          </defs>
        </svg>

        {/* centred countdown number */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 34,
            fontWeight: 300,
            letterSpacing: 1,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {pct}
          <span style={{ fontSize: 16, opacity: 0.5, marginLeft: 2, marginTop: 6 }}>%</span>
        </div>
      </div>

      <div
        style={{
          marginTop: 26,
          color: 'rgba(255,255,255,0.55)',
          fontSize: 11,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
        }}
      >
        {ready ? 'Entering' : 'Loading Experience'}
      </div>
    </div>
  );
}
