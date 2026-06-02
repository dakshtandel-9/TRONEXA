'use client';

import { useState } from 'react';
import Link from 'next/link';
import MenuOverlay from './MenuOverlay';
import DecryptedText from './DecryptedText';
import { useLoadingContext } from '@/contexts/LoadingContext';
import { useTypingSound } from '@/hooks/useTypingSound';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoaded } = useLoadingContext();
  const playTyping = useTypingSound();

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .navbar-logo { font-size: 16px !important; }
          .navbar-menu-btn {
            padding: 10px 18px !important;
            font-size: 10px !important;
            clip-path: polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 0% 100%) !important;
          }
        }
      `}</style>
      <nav
        style={{
          position: 'fixed',
          top: 'clamp(12px, 2vw, 30px)',
          left: 'clamp(12px, 2vw, 30px)',
          right: 'clamp(12px, 2vw, 30px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(10px, 1.5vw, 16px) clamp(12px, 2vw, 24px)',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span
            className="navbar-logo"
            style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            {isLoaded ? (
              <DecryptedText
                text="TRONEXA"
                animateOn="inViewHover"
                speed={40}
                maxIterations={12}
                sequential
              />
            ) : 'TRONEXA'}
          </span>
        </Link>

        <button
          className="navbar-menu-btn"
          onClick={() => setMenuOpen(true)}
          onMouseEnter={e => { playTyping(); e.currentTarget.style.background = 'rgba(235, 240, 255, 0.98)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(210, 218, 240, 0.88)'; }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#0d0f1a',
            background: 'rgba(210, 218, 240, 0.88)',
            border: 'none',
            padding: '11px 24px',
            cursor: 'pointer',
            letterSpacing: '0.15em',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)',
            clipPath: 'polygon(0% 0%, calc(100% - 14px) 0%, 100% 14px, 100% 100%, 0% 100%)',
            transition: 'background 0.2s',
          }}
        >
          <span style={{ fontSize: '13px' }}>⊞</span>
          {isLoaded ? (
            <DecryptedText
              text="MENU"
              animateOn="inViewHover"
              speed={50}
              maxIterations={10}
              sequential
            />
          ) : 'MENU'}
        </button>
      </nav>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
