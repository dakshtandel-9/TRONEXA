'use client';

import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (fillRef.current) {
        fillRef.current.style.width = `${progress * 100}%`;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 3,
        zIndex: 55,
        pointerEvents: 'none',
      }}
    >
      <div ref={fillRef} style={{ height: '100%', width: '0%', background: 'white' }} />
    </div>
  );
}
