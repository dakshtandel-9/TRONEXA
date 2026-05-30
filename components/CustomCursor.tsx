'use client';

import { useEffect, useRef, useState } from 'react';
import { useSoundContext } from '@/contexts/SoundContext';

const INTERACTIVE = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL'];
const TEXT_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,li,span,nav,label';

export default function CustomCursor() {
  const { soundOn, toggleSound } = useSoundContext();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [overText, setOverText] = useState(false);
  const posRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = ''; };
  }, []);

  useEffect(() => {
    document.body.style.cursor = overText ? 'auto' : 'none';
  }, [overText]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const target = e.target as HTMLElement;
      setOverText(target.closest(TEXT_SELECTOR) !== null);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = INTERACTIVE.includes(target.tagName) ||
        target.closest('a, button, [role="button"]') !== null;
      if (!isInteractive) {
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
        opacity: visible && !overText ? 1 : 0,
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
          minWidth: '90px',
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
      </div>
    </div>
  );
}
