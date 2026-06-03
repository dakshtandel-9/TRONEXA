'use client';

import { useEffect, useState } from 'react';
import DecryptedText from './DecryptedText';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = ['SERVICES', 'ABOUT', 'PROJECTS', 'CAREERS', 'CONTACT'];

const LINKS = [
  { label: 'PRIVACY POLICY', num: '01', href: '/privacy-policy' },
  { label: 'TERMS & CONDITIONS', num: '02', href: '/terms' },
  { label: 'ABOUT TRONEXA', num: '03', href: '/about' },
  { label: 'SERVICES', num: '04', href: '/services' },
  { label: 'CAREERS', num: '05', href: '/careers' },
];

export default function MenuOverlay({ isOpen, onClose }: Props) {
  const [openKey, setOpenKey] = useState(0);

  useEffect(() => {
    if (isOpen) setOpenKey(k => k + 1);
  }, [isOpen]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Slide panel */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '520px',
          background: '#cdd4eb',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '28px 32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', color: '#0d0f1a' }}>■</span>
            <span
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0d0f1a',
                fontWeight: 600,
              }}
            >
              EXPLORE
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#0d0f1a',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 0% 100%)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            aria-label="Close menu"
          >
            <span style={{ fontSize: '12px' }}>✕</span>
            CLOSE
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '16px 32px 0' }}>
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={onClose}
              style={{
                display: 'block',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#0d0f1a',
                textDecoration: 'none',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease, color 0.2s',
                transitionDelay: isOpen ? `${0.15 + i * 0.06}s` : '0s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(13,15,26,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#0d0f1a'; }}
            >
              <DecryptedText
                key={`${item}-${openKey}`}
                text={item}
                animateOn="inViewHover"
                speed={40}
                maxIterations={14}
                sequential
                style={{ fontSize: 'clamp(1.96rem, 6.3vw, 3.15rem)' }}
              />
            </a>
          ))}
        </nav>

        {/* Links section */}
        <div style={{ padding: '32px 32px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '10px', color: '#0d0f1a' }}>■</span>
            <span
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0d0f1a',
                fontWeight: 600,
              }}
            >
              LINKS
            </span>
          </div>

          {LINKS.map(link => (
            <div
              key={link.num}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderTop: '1px solid rgba(13,15,26,0.12)',
              }}
            >
              <a
                href={link.href}
                onClick={onClose}
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(13,15,26,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0d0f1a'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(13,15,26,0.5)'; }}
              >
                {link.label}
              </a>
              <span style={{ fontSize: '10px', color: 'rgba(13,15,26,0.4)', letterSpacing: '0.1em' }}>
                {link.num}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 32px 28px',
            marginTop: '8px',
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#0d0f1a',
              textTransform: 'uppercase',
            }}
          >
            WWW.TRONEXA.COM
          </span>

          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { icon: 'WA', href: 'https://wa.me/919589432030' },
              { icon: 'IG', href: 'https://www.instagram.com/tronexatechnologies?utm_source=qr' },
              { icon: 'IN', href: 'https://www.linkedin.com/company/tronexa/' },
            ].map(({ icon, href }) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  border: '1px solid rgba(13,15,26,0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#0d0f1a',
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#0d0f1a';
                  e.currentTarget.style.color = '#cdd4eb';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#0d0f1a';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
