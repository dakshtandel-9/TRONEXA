'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroContent from './HeroContent';

const Model3D = dynamic(() => import('./Model3D'), { ssr: false });

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
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    function applySection(index: number) {
      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return;
        ref.style.transition = 'none';
        ref.style.opacity = i === index ? '1' : '0';
      });
      setHeroVisible(index === 0);
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
      {/* 3D model — hidden on mobile */}
      <div
        className="mobile-model-hide"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -58%)',
          width: 'min(420px, 55vw)',
          height: 'min(420px, 55vw)',
          zIndex: 1,
          opacity: heroVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
        }}
      >
        <Model3D />
      </div>

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
                  color: 'white',
                  fontSize: 'clamp(1.1rem, 3.5vw, 2.2rem)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  textShadow: '0 2px 16px rgba(0,0,0,0.8)',
                  margin: '0 0 18px',
                  whiteSpace: 'pre-line',
                }}
              >
                {section.heading}
              </h2>

              <p
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: '13px',
                  lineHeight: 1.7,
                  maxWidth: '480px',
                  margin: '0 auto 26px',
                  textShadow: '0 2px 12px rgba(0,0,0,0.8)',
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
                    gap: '10px',
                    border: '1px solid white',
                    color: 'white',
                    padding: '13px 30px',
                    fontSize: '11px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'white';
                    el.style.color = 'black';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'transparent';
                    el.style.color = 'white';
                  }}
                >
                  ⊞ {section.cta.label}
                </a>
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
}
