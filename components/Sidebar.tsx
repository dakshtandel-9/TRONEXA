'use client';

import { useEffect, useRef } from 'react';

const LABELS = ['FUTURE', 'INNOVATION', 'COLLABORATION', 'EXCELLENCE', 'PURPOSE', 'LEGACY'];

export default function Sidebar() {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    function onScroll() {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const active = Math.min(5, Math.floor(progress * 6));

      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        item.style.color = i === active ? 'white' : 'rgba(255,255,255,0.3)';
      });
      markerRefs.current.forEach((marker, i) => {
        if (!marker) return;
        marker.style.opacity = i === active ? '1' : '0';
        marker.style.transform = i === active ? 'scale(1)' : 'scale(0.5)';
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        left: '50px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
      }}
    >
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {LABELS.map((label, i) => (
          <li
            key={label}
            ref={el => { itemRefs.current[i] = el; }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: i === 0 ? 'white' : 'rgba(255,255,255,0.3)',
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              transition: 'color 0.35s ease',
              cursor: 'default',
              userSelect: 'none',
            }}
          >
            <span
              ref={el => { markerRefs.current[i] = el; }}
              style={{
                opacity: i === 0 ? 1 : 0,
                fontSize: '7px',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
                transform: i === 0 ? 'scale(1)' : 'scale(0.5)',
              }}
            >
              ■
            </span>
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
