'use client';

import { useEffect } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';

const CLIP = 'polygon(0% 0%, calc(100% - 14px) 0%, 100% 14px, 100% 100%, 0% 100%)';

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

export type ProjectShowcaseData = {
  category: string;
  heroTitle: string;
  heroDesc: string;
  heroTags: { label: string; value: string }[];
  introTitle: string;
  introParagraphs: string[];
  problemTitle: string;
  problemIntro: string;
  problems: string[];
  solutionTitle: string;
  solutionIntro: string;
  solutions: string[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: { title: string; desc: string }[];
  techStack: { label: string; value: string }[];
  techStackIntro: string;
  hostingTitle: string;
  hostingIntro: string;
  hosting: { label: string; value: string }[];
  teamTitle: string;
  teamIntro: string;
  team: { role: string; desc: string }[];
  maintenanceTitle: string;
  maintenanceIntro: string;
  maintenance: string[];
  conclusionTitle: string;
  conclusionParagraphs: string[];
};

export default function ProjectShowcaseContent({ data }: { data: ProjectShowcaseData }) {
  const { setIsLoaded } = useLoadingContext();
  useEffect(() => { setIsLoaded(true); }, [setIsLoaded]);

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="proj-hero" style={{
        minHeight: '100vh', background: '#0d0f1a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '140px 60px 100px', position: 'relative', overflow: 'hidden',
      }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="/allPagebg.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', textAlign: 'center', width: '100%' }}>
          <a href="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(205,212,235,0.6)',
            textDecoration: 'none', marginBottom: '36px', transition: 'color 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#cdd4eb'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(205,212,235,0.6)'; }}>
            ← Back to Projects
          </a>
          <SectionLabel text={`Case Study — ${data.category}`} />
          <h1 style={{
            fontSize: 'clamp(2rem, 4.5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em',
            lineHeight: 1.06, textTransform: 'uppercase', color: 'white', margin: '0 0 24px',
          }}>{data.heroTitle}</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.8, maxWidth: '660px', margin: '0 auto 48px' }}>
            {data.heroDesc}
          </p>
          <div className="tt-hero-tags" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {data.heroTags.map((tag, i) => (
              <div key={i} className="tt-hero-tag-cell" style={{
                padding: '20px 36px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none', textAlign: 'center',
              }}>
                <div style={{ fontSize: '11px', color: '#cdd4eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>{tag.value}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{tag.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRODUCTION ──────────────────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <SectionLabel text="Introduction" />
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12, textTransform: 'uppercase', color: 'white', margin: 0 }}>
                {data.introTitle}
              </h2>
            </div>
            <div className="proj-asym-right" style={{ paddingTop: '60px' }}>
              {data.introParagraphs.map((p, i) => (
                <p key={i} style={{ color: i === 0 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.42)', fontSize: i === 0 ? '15px' : '14px', lineHeight: 1.85, margin: i < data.introParagraphs.length - 1 ? '0 0 20px' : 0 }}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ─────────────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Problem Statement" />
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12, textTransform: 'uppercase', color: 'white', margin: 0 }}>
                {data.problemTitle}
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              {data.problemIntro}
            </p>
          </div>
          <div className="tt-problems-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
            {data.problems.map((p, i) => (
              <div key={i} style={{ padding: '36px 32px', background: '#0d0f1a', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '10px', color: 'rgba(205,212,235,0.3)', fontFamily: 'var(--font-geist-mono)', flexShrink: 0, marginTop: '3px' }}>0{i + 1}</span>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ─────────────────────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Our Solutions" />
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12, textTransform: 'uppercase', color: 'white', margin: 0 }}>
                {data.solutionTitle}
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              {data.solutionIntro}
            </p>
          </div>
          <div>
            {data.solutions.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '24px', padding: '26px 0',
                borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{ fontSize: '10px', color: 'rgba(205,212,235,0.4)', fontFamily: 'var(--font-geist-mono)', flexShrink: 0, marginTop: '2px' }}>0{i + 1}</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <SectionLabel text="Feature List" />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, textTransform: 'uppercase', color: 'white', margin: '0 0 24px' }}>
              {data.featuresTitle}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
              {data.featuresSubtitle}
            </p>
          </div>
          <div className="tt-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
            {data.features.map((f, i) => (
              <div key={i} style={{ padding: '32px', background: '#0d0f1a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '8px', color: '#cdd4eb' }}>▸</span>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#cdd4eb' }}>{f.title}</div>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Tech Stack" />
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12, textTransform: 'uppercase', color: 'white', margin: 0 }}>
                Built with a modern,<br />scalable stack
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              {data.techStackIntro}
            </p>
          </div>
          <div>
            {data.techStack.map((row, i) => (
              <div key={i} className="proj-tech-row" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px', alignItems: 'start', padding: '22px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>{row.label}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOSTING ───────────────────────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Hosting & Infrastructure" dark />
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12, textTransform: 'uppercase', color: '#0d0f1a', margin: 0 }}>
                {data.hostingTitle}
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(13,15,26,0.6)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              {data.hostingIntro}
            </p>
          </div>
          <div className="tt-team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {data.hosting.map((item, i) => (
              <div key={i} className="tt-team-cell" style={{
                padding: '36px 32px',
                borderTop: '1px solid rgba(13,15,26,0.12)',
                borderLeft: i % 2 > 0 ? '1px solid rgba(13,15,26,0.12)' : 'none',
              }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(13,15,26,0.4)', marginBottom: '12px' }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: '#0d0f1a', lineHeight: 1.7, fontWeight: 500 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Team & Support" />
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12, textTransform: 'uppercase', color: 'white', margin: 0 }}>
                {data.teamTitle}
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              {data.teamIntro}
            </p>
          </div>
          <div className="tt-team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {data.team.map((member, i) => (
              <div key={i} className="tt-team-cell" style={{
                padding: '36px 28px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderLeft: i % 3 > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#cdd4eb', marginBottom: '12px' }}>{member.role}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75 }}>{member.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAINTENANCE ───────────────────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '56px' }}>
            <div>
              <SectionLabel text="Maintenance" />
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12, textTransform: 'uppercase', color: 'white', margin: 0 }}>
                {data.maintenanceTitle}
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              {data.maintenanceIntro}
            </p>
          </div>
          <div>
            {data.maintenance.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '22px 0',
                borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{ fontSize: '8px', color: '#cdd4eb', marginTop: '4px', flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCLUSION ────────────────────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel text="Conclusion" />
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, textTransform: 'uppercase', color: 'white', margin: '0 0 40px' }}>
            {data.conclusionTitle}
          </h2>
          {data.conclusionParagraphs.map((p, i) => (
            <p key={i} style={{ color: i === 0 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.42)', fontSize: i === 0 ? '15px' : '14px', lineHeight: 1.9, margin: i < data.conclusionParagraphs.length - 1 ? '0 0 20px' : '0 0 56px' }}>{p}</p>
          ))}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#cdd4eb', color: '#0d0f1a', padding: '14px 34px',
              fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase',
              fontWeight: 700, textDecoration: 'none', clipPath: CLIP, transition: 'background 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#cdd4eb'; }}>
              ← Back to Projects
            </a>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)',
              padding: '14px 34px', fontSize: '11px', letterSpacing: '0.16em',
              textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.5)'; el.style.color = 'white'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.color = 'rgba(255,255,255,0.7)'; }}>
              ⊞ Start Your Project →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
