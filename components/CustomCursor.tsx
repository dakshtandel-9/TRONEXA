'use client';

import { useEffect, useRef, useState } from 'react';
import { useSoundContext } from '@/contexts/SoundContext';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], li[style*="cursor"]';

function isOverInteractive(el: HTMLElement): boolean {
  return !!(
    el.closest('a') ||
    el.closest('button') ||
    el.closest('[role="button"]') ||
    // sidebar li items have onClick and cursor:pointer via inline style
    el.closest('nav li') ||
    el.closest('nav ul li')
  );
}

export default function CustomCursor() {
  const { soundOn, toggleSound } = useSoundContext();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [overInteractive, setOverInteractive] = useState(false);
  const posRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      setOverInteractive(isOverInteractive(e.target as HTMLElement));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!isOverInteractive(target)) {
        toggleSound();
        setClicking(true);
        setTimeout(() => setClicking(false), 150);
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('click', onClick);
    };
  }, [toggleSound]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: `translate(${pos.x + 14}px, ${pos.y + 14}px)`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.15s',
      }}
    >
      <div
        style={{
          padding: '7px 10px 7px 8px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '7px',
          transform: clicking ? 'scale(0.94)' : 'scale(1)',
          transition: 'transform 0.1s',
          minWidth: overInteractive ? 'auto' : '90px',
        }}
      >
        {/* Small square indicator */}
        <div
          style={{
            width: '8px',
            height: '8px',
            border: '1px solid rgba(255,255,255,0.7)',
            background: soundOn ? 'rgba(255,255,255,0.85)' : 'transparent',
            flexShrink: 0,
            marginTop: '2px',
            transition: 'background 0.2s',
          }}
        />
        {!overInteractive && (
          <div
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '8px',
              fontFamily: 'var(--font-geist-mono), monospace',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              lineHeight: 1.5,
              userSelect: 'none',
            }}
          >
            {soundOn ? (
              <>CLICK TO<br />DISABLE AUDIO</>
            ) : (
              <>CLICK TO<br />ENABLE AUDIO</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
