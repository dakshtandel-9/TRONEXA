'use client';

import { useRef } from 'react';
import { useSoundContext } from '@/contexts/SoundContext';
import { useLoadingContext } from '@/contexts/LoadingContext';
import DecryptedText from './DecryptedText';
import { useTypingSound } from '@/hooks/useTypingSound';

const MAX_SECTION = 5;
const COOLDOWN_MS = 2000;

export default function BottomBar() {
  const { soundOn, toggleSound } = useSoundContext();
  const { isLoaded } = useLoadingContext();
  const playTyping = useTypingSound();
  const lastNavRef = useRef(0);
  const currentSectionRef = useRef(0);

  // Track current section via sectionchange events
  if (typeof window !== 'undefined') {
    window.addEventListener('sectionchange', (e: Event) => {
      currentSectionRef.current = (e as CustomEvent<{ index: number }>).detail.index;
    }, { once: false });
  }

  function goNext() {
    const now = Date.now();
    if (now - lastNavRef.current < COOLDOWN_MS) return;
    const next = currentSectionRef.current + 1;
    if (next > MAX_SECTION) return;
    lastNavRef.current = now;
    window.dispatchEvent(new CustomEvent('navigatesection', { detail: { index: next } }));
  }

  function goBack() {
    const now = Date.now();
    if (now - lastNavRef.current < COOLDOWN_MS) return;
    const prev = currentSectionRef.current - 1;
    if (prev < 0) return;
    lastNavRef.current = now;
    window.dispatchEvent(new CustomEvent('navigatesection', { detail: { index: prev } }));
  }

  return (
    <>
      <style>{`
        .bottombar-desktop { display: flex; }
        .bottombar-mobile { display: none; }
        @media (max-width: 640px) {
          .bottombar-desktop { display: none !important; }
          .bottombar-mobile { display: flex !important; }
        }
      `}</style>

      {/* Desktop bottom bar */}
      <div
        className="bottombar-desktop"
        style={{
          position: 'fixed',
          bottom: 'clamp(12px, 2vw, 30px)',
          left: 'clamp(12px, 2vw, 30px)',
          right: 'clamp(12px, 2vw, 30px)',
          zIndex: 1000,
          pointerEvents: 'none',
          borderTop: '1px solid rgba(255,255,255,0.32)',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 22px',
        }}
      >
        <button
          onClick={toggleSound}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.80)',
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: 0,
            pointerEvents: 'auto',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { playTyping(); e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.80)'; }}
        >
          {soundOn ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
          {isLoaded ? (
            <DecryptedText
              text={`SOUND ${soundOn ? 'ON' : 'OFF'}`}
              animateOn="inViewHover"
              speed={50}
              maxIterations={10}
              sequential
            />
          ) : `SOUND ${soundOn ? 'ON' : 'OFF'}`}
        </button>

        <a
          href="https://wa.me/17137326262"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.80)',
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            pointerEvents: 'auto',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { playTyping(); (e.currentTarget as HTMLElement).style.color = 'white'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.80)'; }}
        >
          {isLoaded ? (
            <DecryptedText
              text="CHAT WITH US"
              animateOn="inViewHover"
              speed={50}
              maxIterations={10}
              sequential
            />
          ) : 'CHAT WITH US'}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

      {/* Mobile bottom bar */}
      <div
        className="bottombar-mobile"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          pointerEvents: 'none',
          borderTop: '1px solid rgba(255,255,255,0.22)',
          alignItems: 'stretch',
          height: '60px',
        }}
      >
        {/* Left: Sound toggle */}
        <button
          onClick={toggleSound}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            borderRight: '1px solid rgba(255,255,255,0.22)',
            color: 'rgba(255,255,255,0.80)',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          {soundOn ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
        </button>

        {/* Center: BACK + NEXT */}
        <div
          style={{
            flex: 2,
            display: 'flex',
            alignItems: 'stretch',
            borderRight: '1px solid rgba(255,255,255,0.22)',
            pointerEvents: 'auto',
          }}
        >
          {/* BACK */}
          <button
            onClick={goBack}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              borderRight: '1px solid rgba(255,255,255,0.22)',
              color: 'rgba(255,255,255,0.80)',
              cursor: 'pointer',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="5,1 1,5 5,9"/>
              <polyline points="9,1 5,5 9,9"/>
            </svg>
            BACK
          </button>

          {/* NEXT */}
          <button
            onClick={goNext}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.80)',
              cursor: 'pointer',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            NEXT
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3,1 7,5 3,9"/>
              <polyline points="7,1 11,5 7,9"/>
            </svg>
          </button>
        </div>

        {/* Right: WhatsApp */}
        <a
          href="https://wa.me/17137326262"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.80)',
            textDecoration: 'none',
            pointerEvents: 'auto',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
