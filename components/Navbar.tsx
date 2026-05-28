'use client';

import { useState } from 'react';
import Link from 'next/link';
import MenuOverlay from './MenuOverlay';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: '30px',
          left: '30px',
          right: '30px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
        }}
      >
        {/* Logo — replace inner span with <Image src="/logo.png" height={32} width={140} alt="TRONEXA" /> once logo.png is added to public/ */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span
            style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            TRONEXA
          </span>
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
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
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(235, 240, 255, 0.98)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(210, 218, 240, 0.88)';
          }}
        >
          <span style={{ fontSize: '13px' }}>⊞</span> MENU
        </button>
      </nav>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
