'use client';

import { useEffect } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';
import BackgroundVideo from '@/components/BackgroundVideo';

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

const PROBLEMS = [
  'No interactive box-builder tool for customers to create personalized gift sets',
  'Difficulty managing both retail and corporate gifting workflows on a single platform',
  'Lack of occasion-based browsing and curated collection structure for different customer intents',
  'Limited ability to scale for seasonal gifting peaks like holidays, graduations, and Father\'s Day',
];

const SOLUTIONS = [
  'Built a fully customized Shopify storefront with curated collection pages and occasion-based browsing',
  'Integrated an interactive "Build a Box" tool allowing customers to hand-pick items for their gift box',
  'Developed a dedicated Corporate Gifting section for bulk orders and business clients',
  'Implemented a marketplace page for browsing all individual products in one place',
  'Enabled seasonal promotional banners for holiday, graduation, and gifting events',
];

const FEATURES = [
  { title: 'Curated Boxes', desc: 'Pre-assembled gift boxes for every occasion and recipient — ready to purchase immediately' },
  { title: 'Build a Box', desc: 'Interactive tool letting customers hand-pick individual items to create their perfect gift set' },
  { title: 'Corporate Gifting', desc: 'Dedicated section for bulk orders and business clients with a tailored inquiry workflow' },
  { title: 'Marketplace / Shop All', desc: 'Central product browsing page featuring all individual items in one streamlined catalog' },
  { title: 'Occasion-Based Navigation', desc: 'Browse by event: birthdays, weddings, thank-you gifts, holidays, and more' },
  { title: 'Seasonal Banners', desc: 'Promotional banners for holiday, graduation, and major gifting seasons' },
  { title: 'Search & Cart', desc: 'Smart search functionality with a fast, intuitive cart and checkout experience' },
  { title: 'Account & Login', desc: 'Secure customer accounts with order history and saved preferences' },
  { title: 'Mobile-Optimized Design', desc: 'Fully responsive layout ensuring a seamless experience across all devices' },
  { title: 'SEO & Metadata', desc: 'Structured metadata, OpenGraph tags, and Twitter Card integration for discoverability' },
];

const TECH_STACK = [
  { label: 'Platform', value: 'Shopify (Custom Theme Development)' },
  { label: 'Frontend', value: 'Liquid, HTML5, CSS3, JavaScript' },
  { label: 'Box Builder', value: 'Custom Shopify app integration (Gift Set Builder)' },
  { label: 'Corporate Gifting', value: 'Custom landing page with dedicated inquiry workflow' },
  { label: 'Payment Gateway', value: 'Shopify Payments with multi-currency support' },
  { label: 'Analytics & SEO', value: 'Google Tag Manager, Google Analytics, OpenGraph / Twitter Card meta tags' },
  { label: 'CDN', value: 'Shopify CDN for fast global asset delivery' },
];

const TEAM = [
  { role: 'Project Manager', desc: 'End-to-end coordination, client communication, and milestone tracking' },
  { role: 'UI/UX Designer', desc: 'Brand-aligned design system, wireframes, and prototyping' },
  { role: 'Frontend Developer(s)', desc: 'Shopify theme customization, Liquid templating, and responsive implementation' },
  { role: 'Backend/App Developer', desc: 'Box-builder integration and corporate gifting workflow logic' },
  { role: 'QA Engineer', desc: 'Cross-browser and cross-device testing' },
  { role: 'SEO Specialist', desc: 'On-page SEO, metadata structuring, and performance optimization' },
];

const MAINTENANCE = [
  'Regular Shopify theme and app updates to maintain compatibility and security',
  'Seasonal campaign setup — banners, featured collections, and promotional pages for gifting occasions',
  'Performance monitoring and Core Web Vitals optimization',
  'New collection and product page deployments as the catalog expands',
  'Bug fixes, UI refinements, and continuous UX improvements',
];

export default function SmallPackagesContent() {
  const { setIsLoaded } = useLoadingContext();

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        background: '#0d0f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 60px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <BackgroundVideo src="/allPagebg.mp4" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', textAlign: 'center' }}>
          <a href="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(205,212,235,0.6)', textDecoration: 'none',
            marginBottom: '36px', transition: 'color 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#cdd4eb'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(205,212,235,0.6)'; }}
          >
            ← Back to Projects
          </a>
          <SectionLabel text="Case Study — E-Commerce" />
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 24px',
          }}>
            Small Packages
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            lineHeight: 1.75,
            maxWidth: '680px',
            margin: '0 auto 48px',
          }}>
            Custom Shopify storefront development for a premium gift curation and box-builder platform —
            serving both individual shoppers and corporate clients with a seamless gifting experience.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0', flexWrap: 'wrap' }}>
            {[
              { label: 'Platform', value: 'Shopify' },
              { label: 'Region', value: 'USA' },
              { label: 'Category', value: 'E-Commerce / Gifting' },
            ].map((tag, i) => (
              <div key={i} style={{
                padding: '20px 36px',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '11px', color: '#cdd4eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>{tag.value}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{tag.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRODUCTION ──────────────────────────────────── */}
      <section style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <SectionLabel text="Introduction" />
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
              fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
              textTransform: 'uppercase', color: 'white', margin: 0,
            }}>
              Thoughtful gifting —<br />powered by great UX
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
            Small Packages is a U.S.-based curated gift box brand offering thoughtfully assembled gifts for every
            occasion — from personal milestones to corporate gifting. Tronexa partnered with Small Packages to
            design and develop their full-scale Shopify e-commerce platform, delivering a seamless and joyful online
            gifting experience. The platform serves individual shoppers and corporate clients alike, with a strong
            focus on curation, customization, and ease of purchase.
          </p>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ─────────────────────────────── */}
      <section style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Problem Statement" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                The challenges<br />they faced
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Small Packages needed a modern, scalable e-commerce platform that could support both a ready-made gift
              catalog and a fully interactive box-builder experience, while serving individual and bulk corporate buyers
              under one roof.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
            {PROBLEMS.map((p, i) => (
              <div key={i} style={{ padding: '40px 36px', background: '#0d0f1a', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '10px', color: 'rgba(205,212,235,0.3)', fontFamily: 'var(--font-geist-mono)', flexShrink: 0, marginTop: '3px' }}>0{i + 1}</span>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ─────────────────────────────────────── */}
      <section style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Our Solutions" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                How Tronexa<br />delivered
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa built a comprehensive Shopify solution that unified Small Packages' retail and corporate gifting
              needs into one polished, high-converting storefront — purpose-built for discovery, customization, and checkout.
            </p>
          </div>
          <div>
            {SOLUTIONS.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '24px',
                padding: '28px 0',
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
      <section style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <SectionLabel text="Feature List" />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
              textTransform: 'uppercase', color: 'white', margin: '0 0 24px',
            }}>
              Everything built for Small Packages
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
              A robust set of features tailored to the gifting experience, serving both individual shoppers and
              corporate buyers with equal ease.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ padding: '36px 32px', background: '#0d0f1a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
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
      <section style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '72px' }}>
            <div>
              <SectionLabel text="Tech Stack" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                Proven, scalable<br />technology
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa used a proven, scalable tech stack to deliver a fast and flexible platform that supports
              Small Packages' growing product catalog and dual retail-corporate model.
            </p>
          </div>
          <div>
            {TECH_STACK.map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px', alignItems: 'start',
                padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}>{row.label}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOSTING ───────────────────────────────────────── */}
      <section style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Hosting" dark />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: '#0d0f1a', margin: 0,
              }}>
                Enterprise-grade<br />infrastructure
              </h2>
            </div>
            <p style={{ color: 'rgba(13,15,26,0.6)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              The Small Packages platform is hosted on Shopify's enterprise-grade cloud infrastructure, delivering
              reliable performance, global reach, and enterprise-level security across all pages and checkout flows.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { label: 'Hosting Provider', value: 'Shopify Cloud Infrastructure' },
              { label: 'SSL/HTTPS', value: 'Enabled by default across all pages and checkout' },
              { label: 'CDN', value: 'Shopify\'s global CDN for fast load times worldwide' },
              { label: 'Uptime SLA', value: '99.99% guaranteed uptime' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '44px 32px',
                borderLeft: i > 0 ? '1px solid rgba(13,15,26,0.12)' : 'none',
              }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(13,15,26,0.4)', marginBottom: '14px' }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: '#0d0f1a', lineHeight: 1.7, fontWeight: 500 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────── */}
      <section style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '72px' }}>
            <div>
              <SectionLabel text="Team & Support" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                A focused cross-<br />functional team
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              The Small Packages project was delivered by a focused cross-functional team at Tronexa, working
              collaboratively to meet both the design vision and the technical complexity of the dual retail-corporate
              gifting model.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {TEAM.map((member, i) => (
              <div key={i} style={{
                padding: '40px 32px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderLeft: i % 3 > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#cdd4eb', marginBottom: '14px' }}>{member.role}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75 }}>{member.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAINTENANCE ───────────────────────────────────── */}
      <section style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Maintenance" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                Ongoing support through<br />every season
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa provides ongoing maintenance and support to keep the Small Packages platform performing
              at its best through seasonal peaks, new product launches, and evolving business requirements.
            </p>
          </div>
          <div>
            {MAINTENANCE.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '20px',
                padding: '24px 0',
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
      <section style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel text="Conclusion" />
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
            textTransform: 'uppercase', color: 'white', margin: '0 0 40px',
          }}>
            Gifting made personal,<br />easy, and memorable
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.9, margin: '0 0 24px' }}>
            The Small Packages project is a strong reflection of Tronexa's ability to deliver warm, experience-driven
            e-commerce platforms that balance beautiful design with practical functionality. By understanding both the
            emotional nature of gifting and the operational needs of a dual retail-corporate business, Tronexa built a
            platform that delights individual shoppers and scales effortlessly for corporate clients.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.9, margin: '0 0 56px' }}>
            From the interactive box-builder to the polished curated collections, every feature was crafted to make
            gifting feel personal, easy, and memorable. Tronexa's continued partnership ensures the store evolves
            with each new season, campaign, and collection.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#cdd4eb', color: '#0d0f1a', padding: '14px 34px',
              fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase',
              fontWeight: 700, textDecoration: 'none', clipPath: CLIP, transition: 'background 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#cdd4eb'; }}
            >
              ← Back to Projects
            </a>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)',
              padding: '14px 34px', fontSize: '11px', letterSpacing: '0.16em',
              textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.5)'; el.style.color = 'white'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              ⊞ Start Your Project →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
