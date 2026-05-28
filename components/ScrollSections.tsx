'use client';

import { useEffect, useRef } from 'react';
import HeroContent from './HeroContent';

type SectionData =
  | { id: string; isHero: true }
  | {
      id: string;
      isHero: false;
      heading: string;
      body: string;
      cta: { label: string; href: string } | null;
    };

const SECTIONS: SectionData[] = [
  { id: 'future', isHero: true },
  {
    id: 'innovation',
    isHero: false,
    heading: 'WE LEAD THE WAY IN\nTECHNOLOGY TRANSFORMATION',
    body: 'At TRONEXA, we see technology not just as a tool, but as an opportunity to redefine how businesses operate, grow, and compete in an ever-evolving digital landscape.',
    cta: { label: 'WORK WITH US', href: '/careers' },
  },
  {
    id: 'collaboration',
    isHero: false,
    heading: 'WE WORK WITH A TEAM\nOF DIGITAL SPECIALISTS',
    body: 'We are more than a technology company. We are developers, designers, strategists, cloud architects, AI engineers, and automation experts united by a shared mission to build better digital futures.',
    cta: null,
  },
  {
    id: 'excellence',
    isHero: false,
    heading: 'TO CREATE WHAT BUSINESSES\nASPIRE TO BECOME',
    body: 'From ambitious startups to established enterprises, TRONEXA empowers organizations to grow smarter, operate more efficiently, and deliver experiences that set them apart from the competition.',
    cta: { label: 'DISCOVER OUR VISION', href: '/about' },
  },
  {
    id: 'purpose',
    isHero: false,
    heading: 'BUILD THE FUTURE\nWITH PURPOSE',
    body: 'In a rapidly evolving digital world, innovation alone is not enough — it must be guided by vision, strategy, and purpose. At TRONEXA, we create scalable technology solutions that drive real business impact.',
    cta: null,
  },
  {
    id: 'legacy',
    isHero: false,
    heading: "AND DEFINE TOMORROW'S\nDIGITAL LANDSCAPE",
    body: 'Join us as we shape the future of business through intelligent technology, creating powerful digital experiences, scalable systems, and solutions designed to deliver lasting value.',
    cta: { label: 'EXPLORE OUR SERVICES', href: '/services' },
  },
];

function sectionOpacity(progress: number, index: number): number {
  const zoneSize = 1 / 6;
  const zoneStart = index * zoneSize;
  const local = (progress - zoneStart) / zoneSize; // 0–1 within zone

  // Zone 0 (hero) — visible from very start, only fades out
  if (index === 0) {
    if (local < 0.8) return 1;
    if (local < 1.0) return (1 - local) / 0.2;
    return 0;
  }

  // All other zones — fade in, hold, fade out
  if (local <= 0) return 0;
  if (local < 0.15) return local / 0.15;
  if (local < 0.82) return 1;
  if (local < 1.0) return (1 - local) / 0.18;
  return 0;
}

export default function ScrollSections() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function onScroll() {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return;
        ref.style.opacity = String(Math.max(0, Math.min(1, sectionOpacity(progress, i))));
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Zone 0 — Hero: fixed at bottom of viewport */}
      <div
        ref={el => { sectionRefs.current[0] = el; }}
        style={{
          position: 'fixed',
          bottom: '12vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          zIndex: 1,
          opacity: 1,
          willChange: 'opacity',
        }}
      >
        <HeroContent />
      </div>

      {/* Zones 1–5 — anchored to bottom of viewport, matching hero layout */}
      {SECTIONS.slice(1).map((section, i) => {
        const idx = i + 1;
        if (section.isHero) return null;
        return (
          <div
            key={section.id}
            ref={el => { sectionRefs.current[idx] = el; }}
            style={{
              position: 'fixed',
              bottom: '12vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '820px',
              padding: '0 24px',
              textAlign: 'center',
              zIndex: 1,
              opacity: 0,
              willChange: 'opacity',
            }}
          >
            <h2
              style={{
                color: 'white',
                fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)',
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
          </div>
        );
      })}
    </>
  );
}
