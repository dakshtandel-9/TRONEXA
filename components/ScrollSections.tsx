'use client';

import { useEffect, useRef } from 'react';
import HeroContent from './HeroContent';


type SectionData =
  | { id: string; isHero: true; label: string }
  | {
      id: string;
      isHero: false;
      label: string;
      heading: string;
      body: string;
      cta: { label: string; href: string } | null;
    };

const SECTIONS: SectionData[] = [
  { id: 'future', isHero: true, label: 'FUTURE' },
  {
    id: 'innovation',
    isHero: false,
    label: 'INNOVATION',
    heading: 'WE LEAD THE WAY IN\nTECHNOLOGY TRANSFORMATION',
    body: 'At TRONEXA, we see technology not just as a tool, but as an opportunity to redefine how businesses operate, grow, and compete in an ever-evolving digital landscape.',
    cta: { label: 'WORK WITH US', href: '/careers' },
  },
  {
    id: 'collaboration',
    isHero: false,
    label: 'COLLABORATION',
    heading: 'WE WORK WITH A TEAM\nOF DIGITAL SPECIALISTS',
    body: 'We are more than a technology company. We are developers, designers, strategists, cloud architects, AI engineers, and automation experts united by a shared mission to build better digital futures.',
    cta: null,
  },
  {
    id: 'excellence',
    isHero: false,
    label: 'EXCELLENCE',
    heading: 'TO CREATE WHAT BUSINESSES\nASPIRE TO BECOME',
    body: 'From ambitious startups to established enterprises, TRONEXA empowers organizations to grow smarter, operate more efficiently, and deliver experiences that set them apart from the competition.',
    cta: { label: 'DISCOVER OUR VISION', href: '/about' },
  },
  {
    id: 'purpose',
    isHero: false,
    label: 'PURPOSE',
    heading: 'BUILD THE FUTURE\nWITH PURPOSE',
    body: 'In a rapidly evolving digital world, innovation alone is not enough — it must be guided by vision, strategy, and purpose. At TRONEXA, we create scalable technology solutions that drive real business impact.',
    cta: null,
  },
  {
    id: 'legacy',
    isHero: false,
    label: 'LEGACY',
    heading: "AND DEFINE TOMORROW'S\nDIGITAL LANDSCAPE",
    body: 'Join us as we shape the future of business through intelligent technology, creating powerful digital experiences, scalable systems, and solutions designed to deliver lasting value.',
    cta: { label: 'EXPLORE OUR SERVICES', href: '/services' },
  },
];

export default function ScrollSections() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    function applySection(index: number) {
      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return;
        ref.style.transition = 'none';
        const isActive = i === index;
        ref.style.opacity = isActive ? '1' : '0';
        // only the ACTIVE section captures clicks — the others are faded out but
        // (being position:fixed full-area) would otherwise sit on top and block
        // the active section's buttons. pointer-events:none lets clicks through.
        ref.style.pointerEvents = isActive ? 'auto' : 'none';
      });
    }

    function onSectionChange(e: Event) {
      const index = (e as CustomEvent<{ index: number }>).detail.index;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => applySection(index), 100);
    }

    function onSectionSettled(e: Event) {
      if (debounceTimer) clearTimeout(debounceTimer);
      applySection((e as CustomEvent<{ index: number }>).detail.index);
    }

    window.addEventListener('sectionchange', onSectionChange);
    window.addEventListener('sectionsettled', onSectionSettled);
    return () => {
      window.removeEventListener('sectionchange', onSectionChange);
      window.removeEventListener('sectionsettled', onSectionSettled);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, []);

  return (
    <>
      {SECTIONS.map((section, i) => (
        <div
          key={section.id}
          ref={el => { sectionRefs.current[i] = el; }}
          className="mobile-section-content"
          style={{
            position: 'fixed',
            bottom: 'clamp(60px, 12vh, 120px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 'min(820px, 90vw)',
            padding: '0 clamp(16px, 4vw, 24px)',
            textAlign: 'center',
            zIndex: 1,
            opacity: i === 0 ? 1 : 0,
            pointerEvents: i === 0 ? 'auto' : 'none',
            transition: 'opacity 0.6s ease',
            willChange: 'opacity',
          }}
        >
          {section.isHero ? (
            <HeroContent />
          ) : (
            <>
              {/* Mobile-only section label */}
              <div className="mobile-label" style={{ display: 'none' }}>
                <span style={{ fontSize: '7px' }}>■</span>
                {section.label}
              </div>

              <h2
                style={{
                  color: '#e6edf8',
                  fontSize: 'clamp(0.91rem, 2.52vw, 1.68rem)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  lineHeight: 1.12,
                  textShadow: '0 2px 22px rgba(0,0,0,0.85)',
                  margin: '0 0 20px',
                  whiteSpace: 'pre-line',
                }}
              >
                {section.heading}
              </h2>

              <p
                style={{
                  color: 'rgba(190,205,230,0.72)',
                  fontSize: '9.45px',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  maxWidth: '500px',
                  margin: '0 auto 30px',
                  textShadow: '0 2px 14px rgba(0,0,0,0.8)',
                }}
              >
                {section.body}
              </p>

              {section.cta && (
                <a
                  href={section.cta.href}
                  className="mobile-cta"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    border: '1px solid rgba(150,175,215,0.35)',
                    background: 'rgba(8,14,30,0.55)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    color: '#e6edf8',
                    padding: '15px 34px',
                    fontSize: '7.7px',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    clipPath:
                      'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)',
                    transition: 'background 0.25s, color 0.25s, border-color 0.25s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(40,70,130,0.6)';
                    el.style.borderColor = 'rgba(150,175,215,0.7)';
                    el.style.color = '#ffffff';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(8,14,30,0.55)';
                    el.style.borderColor = 'rgba(150,175,215,0.35)';
                    el.style.color = '#e6edf8';
                  }}
                >
                  <span style={{ fontSize: '9.1px', opacity: 0.85 }}>⊟</span>
                  {section.cta.label}
                </a>
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
}
