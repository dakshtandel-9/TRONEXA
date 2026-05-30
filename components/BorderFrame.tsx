'use client';

import { useEffect, useState } from 'react';

const CUT = 18;

export default function BorderFrame() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    function update() {
      setSize({ w: window.innerWidth - 30, h: window.innerHeight - 30 });
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!size.w || !size.h) return null;

  const { w, h } = size;
  const c = CUT;
  const points = `${c},0 ${w - c},0 ${w},${c} ${w},${h - c} ${w - c},${h} ${c},${h} 0,${h - c} 0,${c}`;

  return (
    <div style={{ position: 'fixed', inset: '15px', zIndex: 999, pointerEvents: 'none' }}>
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        <polygon
          points={points}
          fill="none"
          stroke="rgba(255,255,255,0.175)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
