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

const PROBLEMS = [
  'No clear age-segmented browsing making it difficult for parents to find products suited to their child\'s age group',
  'Lack of dedicated pages to showcase certifications, ingredient sourcing, and brand values — critical trust signals for a natural skincare brand',
  'Poor product discovery experience with no best-seller highlights or gift set collections',
  'Limited ability to run promotional campaigns, discount codes, and seasonal offers for a growing customer base',
];

const SOLUTIONS = [
  'Built a fully customized Shopify storefront with age-segmented product collections (Baby 0–3 years, Kids 3+ years, Mum)',
  'Designed trust-first pages covering certifications, ingredients, brand values, and the brand\'s story',
  'Implemented best-seller highlights and curated gift sets for easy product discovery',
  'Integrated promotional banner support for discount codes and seasonal campaigns (e.g. 15% off Kids range)',
  'Built an awards and press page to establish brand authority and credibility',
  'Enabled a stockist page for wholesale and retail partner visibility',
];

const FEATURES = [
  { title: 'Age-Segmented Collections', desc: 'Dedicated sections for Baby 0–3 years, Kids 3+ years, and Mum — making product discovery intuitive for parents' },
  { title: 'Best Sellers Section', desc: 'Curated highlights of top-rated and most-loved products to guide new customers' },
  { title: 'Gift Sets', desc: 'Pre-assembled gift collections for baby showers, birthdays, and special milestones' },
  { title: 'Certifications Page', desc: 'Dedicated page showcasing organic certifications and third-party accreditations' },
  { title: 'Our Ingredients Page', desc: 'Full transparency on ingredients, sourcing, and formulation philosophy' },
  { title: 'Our Promise & Values', desc: 'Brand story pages that communicate safety, purity, and the brand\'s core commitments' },
  { title: 'Awards & Press Page', desc: 'Showcase of industry recognition and media features to build brand authority' },
  { title: 'Stockist Page', desc: 'Directory of wholesale and retail partners for customers seeking local options' },
  { title: 'Promotional Banners', desc: 'Dynamic banners for discount codes, seasonal campaigns, and product launches' },
  { title: 'Smart Cart', desc: 'Custom cart drawer with intelligent product recommendations for increased basket size' },
];

const TECH_STACK = [
  { label: 'Platform', value: 'Shopify (Custom Theme Development)' },
  { label: 'Frontend', value: 'Liquid, HTML5, CSS3, JavaScript' },
  { label: 'Cart', value: 'Custom cart drawer with smart product recommendations' },
  { label: 'Social Integration', value: 'Twitter / X, Facebook domain verification' },
  { label: 'Payment Gateway', value: 'Shopify Payments with digital wallet support' },
  { label: 'Analytics & SEO', value: 'Google Analytics, Google Site Verification, OpenGraph / Twitter Card meta tags' },
  { label: 'CDN', value: 'Shopify CDN for fast global asset delivery' },
];

const TEAM = [
  { role: 'Project Manager', desc: 'End-to-end coordination, client communication, and milestone tracking' },
  { role: 'UI/UX Designer', desc: 'Brand-aligned design system, wireframes, and prototyping' },
  { role: 'Frontend Developer(s)', desc: 'Shopify theme customization, Liquid templating, and responsive implementation' },
  { role: 'Backend/App Developer', desc: 'Cart recommendations, discount logic, and app integrations' },
  { role: 'QA Engineer', desc: 'Cross-browser and cross-device testing' },
  { role: 'SEO Specialist', desc: 'On-page SEO, metadata structuring, and performance optimization' },
];

const MAINTENANCE = [
  'Regular Shopify theme and app updates to maintain compatibility and security',
  'Seasonal campaign setup — promotional banners, discount codes, and featured collection updates',
  'Performance monitoring and Core Web Vitals optimization',
  'New product and collection page deployments as the range grows',
  'Bug fixes, UI refinements, and continuous UX improvements',
];

export default function LittleButterflyContent() {
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
        <video autoPlay loop muted playsInline style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0,
        }}>
          <source src="/allPagebg.mp4" type="video/mp4" />
        </video>
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
            Little Butterfly<br />London
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            lineHeight: 1.75,
            maxWidth: '680px',
            margin: '0 auto 48px',
          }}>
            Building a premium organic baby skincare e-commerce experience on Shopify — crafting a trust-driven
            shopping journey for health-conscious new parents.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0', flexWrap: 'wrap' }}>
            {[
              { label: 'Platform', value: 'Shopify' },
              { label: 'Region', value: 'UK & Global' },
              { label: 'Category', value: 'Baby Skincare' },
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
              Pure, trusted care —<br />brought online
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
            Little Butterfly London is a premium UK-based organic and all-natural baby skincare brand, offering
            carefully formulated products for babies, kids, and mothers — built on a foundation of trust, purity,
            and expert care. Tronexa partnered with Little Butterfly London to develop and maintain their full-scale
            Shopify e-commerce platform, delivering a refined, nurturing online shopping experience that mirrors the
            brand's gentle philosophy. The platform serves parents across the UK and beyond, with a focus on product
            transparency, certifications, ingredient integrity, and seamless purchasing.
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
              Little Butterfly London needed a sophisticated e-commerce platform that could communicate the brand's
              deep commitment to natural ingredients and certifications, while serving multiple customer segments —
              newborns, toddlers, older kids, and mothers — through a single, cohesive storefront.
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
              Tronexa delivered a complete Shopify e-commerce solution designed around the needs of health-conscious
              parents — combining elegant design, transparent brand storytelling, and intuitive product navigation.
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
              Built for parents, built for trust
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
              A comprehensive set of features built to serve parents, build brand trust, and drive conversions
              across baby, kids, and maternity product lines.
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
                Modern and reliable<br />technology
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa used a modern and reliable tech stack to build a fast, trustworthy, and visually refined
              platform that reflects Little Butterfly London's premium brand positioning.
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
              The Little Butterfly London platform is hosted on Shopify's enterprise-grade cloud infrastructure,
              delivering consistent performance, global reach, and robust security across all pages, product
              listings, and checkout flows.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { label: 'Hosting Provider', value: 'Shopify Cloud Infrastructure' },
              { label: 'SSL/HTTPS', value: 'Enabled by default across all pages and checkout' },
              { label: 'CDN', value: 'Shopify\'s global CDN — fast load times across the UK and internationally' },
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
                A dedicated cross-<br />functional team
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              The Little Butterfly London project was executed by a dedicated cross-functional team at Tronexa,
              working closely with the client to ensure every detail — from ingredient page copy to mobile checkout —
              met the brand's premium standards.
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
                Ongoing support as<br />the brand expands
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa provides ongoing maintenance and support to ensure the Little Butterfly London platform
              continues to perform at its best as the brand expands its product range, enters new markets,
              and runs seasonal promotions.
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
            A trust-first digital<br />experience for new parents
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.9, margin: '0 0 24px' }}>
            The Little Butterfly London project is a powerful reflection of Tronexa's ability to build premium,
            trust-first e-commerce platforms for brands where credibility and emotion are everything. By deeply
            understanding the anxieties and values of new parents, Tronexa crafted a digital experience that
            communicates purity, safety, and care at every touchpoint.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.9, margin: '0 0 56px' }}>
            The platform successfully brought Little Butterfly London's brand story to life online, giving parents
            the confidence to choose their products while making discovery and purchase effortless. Tronexa's
            continued partnership ensures the platform evolves alongside the brand's growing product line and
            expanding global audience.
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
