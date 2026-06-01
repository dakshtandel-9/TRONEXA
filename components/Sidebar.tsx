'use client';

import { useEffect, useRef } from 'react';
import DecryptedText from './DecryptedText';
import { useLoadingContext } from '@/contexts/LoadingContext';
import { useTypingSound } from '@/hooks/useTypingSound';

const LABELS = ['FUTURE', 'INNOVATION', 'COLLABORATION', 'EXCELLENCE', 'PURPOSE', 'LEGACY'];

export default function Sidebar() {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { isLoaded } = useLoadingContext();
  const playTyping = useTypingSound();

  useEffect(() => {
    function setActive(index: number) {
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        item.style.color = i === index ? 'white' : 'rgba(255,255,255,0.3)';
      });
      markerRefs.current.forEach((marker, i) => {
        if (!marker) return;
        marker.style.opacity = i === index ? '1' : '0';
        marker.style.transform = i === index ? 'scale(1)' : 'scale(0.5)';
      });
    }

    function onSectionChange(e: Event) {
      setActive((e as CustomEvent<{ index: number }>).detail.index);
    }

    window.addEventListener('sectionchange', onSectionChange);
    setActive(0);
    return () => window.removeEventListener('sectionchange', onSectionChange);
  }, []);

  function navigateTo(index: number) {
    window.dispatchEvent(new CustomEvent('navigatesection', { detail: { index } }));
  }

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
            onClick={() => navigateTo(i)}
            onMouseEnter={playTyping}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: i === 0 ? 'white' : 'rgba(255,255,255,0.3)',
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              transition: 'color 0.35s ease',
              cursor: 'pointer',
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
            {isLoaded ? (
              <DecryptedText
                text={label}
                animateOn="hover"
                speed={40}
                maxIterations={8}
                sequential
              />
            ) : label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
