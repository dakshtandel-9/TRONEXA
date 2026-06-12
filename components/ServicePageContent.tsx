'use client';

import { useEffect } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';

const CLIP = 'polygon(0% 0%, calc(100% - 14px) 0%, 100% 14px, 100% 100%, 0% 100%)';
const CLIP_LG = 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 0% 100%)';

function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  const color = dark ? '#0d0f1a' : '#cdd4eb';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
      <span style={{ fontSize: '10px', color }}>■</span>
      <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color, fontWeight: 600 }}>
        {text}
      </span>
    </div>
  );
}

export interface ServiceItem {
  num: string;
  title: string;
  desc: string;
}

export interface WhyPoint {
  title: string;
  desc: string;
}

export interface ServicePageData {
  num: string;
  label: string;
  heroHeading: string;
  heroDesc: string;
  overview: string;
  deliverables: ServiceItem[];
  whyPoints: WhyPoint[];
  cta: string;
}

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Requirement Analysis', desc: 'We begin by understanding your business goals, challenges, target audience, and technical requirements through detailed consultation and research.' },
  { num: '02', title: 'Strategy & Planning', desc: 'We define the project scope, technology stack, timelines, milestones, and resource allocation — building a clear roadmap before a single line of code is written.' },
  { num: '03', title: 'Design & Prototyping', desc: 'Our design team creates wireframes, UI/UX designs, and interactive prototypes aligned with your brand identity and user experience goals.' },
  { num: '04', title: 'Development & Engineering', desc: 'Our engineering team builds the solution using modern technologies, agile sprints, and clean architecture — ensuring scalability, security, and performance.' },
  { num: '05', title: 'Testing & Quality Assurance', desc: 'Every deliverable goes through rigorous testing including functional, performance, security, and usability checks before release.' },
  { num: '06', title: 'Deployment & Ongoing Support', desc: 'We deploy the solution to production and provide post-launch support, maintenance, monitoring, and continuous optimization.' },
];

export default function ServicePageContent({ data }: { data: ServicePageData }) {
  const { setIsLoaded } = useLoadingContext();

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="page-hero" style={{
        minHeight: '100vh',
        background: '#0d0f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 60px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/allPagebg.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
            <a
              href="/services"
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#cdd4eb'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
            >
              ← All Services
            </a>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.15)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: '#cdd4eb' }}>■</span>
              <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#cdd4eb', fontWeight: 600 }}>
                {data.num} — {data.label}
              </span>
            </div>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 32px',
            whiteSpace: 'pre-line',
          }}>
            {data.heroHeading}
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '15px',
            lineHeight: 1.8,
            maxWidth: '680px',
            margin: '0 auto 52px',
          }}>
            {data.heroDesc}
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#cdd4eb',
              color: '#0d0f1a',
              padding: '14px 34px',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
              clipPath: CLIP,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#cdd4eb'; }}
          >
            ⊞ {data.cta} →
          </a>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
          }}>
            <div>
              <SectionLabel text="Overview" />
              <h2 style={{
                fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                What we do &amp;<br />how we do it
              </h2>
            </div>
            <p className="page-asym-right" style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              lineHeight: 1.9,
              margin: 0,
              paddingTop: '52px',
              whiteSpace: 'pre-line',
            }}>
              {data.overview}
            </p>
          </div>
        </div>
      </section>

      {/* ── ERP SYSTEMS / DELIVERABLES ────────────────────── */}
      {data.deliverables && data.deliverables.length > 0 && (
        <section className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ marginBottom: '64px' }}>
              <SectionLabel text="ERP Platforms We Manage" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
                maxWidth: '600px',
              }}>
                10 leading ERP systems,<br />fully managed by Tronexa
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
              {data.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="page-deliverable-row"
                  style={{
                    background: '#0d0f1a',
                    padding: '44px 48px',
                    display: 'grid',
                    gridTemplateColumns: '80px 200px 1fr',
                    gap: '40px',
                    alignItems: 'start',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#12152a'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0d0f1a'; }}
                >
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.15)',
                    letterSpacing: '0.2em',
                    fontFamily: 'var(--font-geist-mono)',
                    paddingTop: '3px',
                  }}>{item.num}</div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    color: '#cdd4eb',
                    lineHeight: 1.3,
                  }}>{item.title}</div>
                  <div style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.85,
                  }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE TRONEXA ───────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <SectionLabel text="Why Choose TRONEXA" dark />
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              textTransform: 'uppercase',
              color: '#0d0f1a',
              margin: 0,
              maxWidth: '560px',
            }}>
              What sets us apart<br />in {data.label.toLowerCase()}
            </h2>
          </div>

          <div className="page-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'transparent' }}>
            {data.whyPoints.map((point, i) => (
              <div key={i} className="page-why-card" style={{
                padding: '44px 36px',
                background: '#cdd4eb',
                clipPath: i === 0 ? CLIP_LG : 'none',
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: '#0d0f1a',
                  marginBottom: '14px',
                }}>{point.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(13,15,26,0.58)',
                  lineHeight: 1.8,
                }}>{point.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ──────────────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <SectionLabel text="How We Deliver" />
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              textTransform: 'uppercase',
              color: 'white',
              margin: 0,
              maxWidth: '560px',
            }}>
              A clear process from<br />idea to deployment
            </h2>
          </div>

          <div className="page-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} style={{
                padding: '44px 36px',
                background: '#080b14',
                clipPath: i === 0 ? CLIP_LG : 'none',
              }}>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.15)',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-geist-mono)',
                  marginBottom: '24px',
                }}>{step.num}</div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: '#cdd4eb',
                  marginBottom: '14px',
                }}>{step.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.42)',
                  lineHeight: 1.8,
                }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 28px',
          }}>
            Ready to get started<br />with {data.label}?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '14px',
            lineHeight: 1.85,
            margin: '0 0 52px',
          }}>
            Talk to our team. We will understand your goals and recommend the right approach to help you grow, transform, and succeed.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#cdd4eb',
                color: '#0d0f1a',
                padding: '14px 34px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textDecoration: 'none',
                clipPath: CLIP,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#cdd4eb'; }}
            >
              ⊞ Schedule a Consultation →
            </a>
            <a
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.7)',
                padding: '14px 34px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.06)'; el.style.color = 'white'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              ← View All Services
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
