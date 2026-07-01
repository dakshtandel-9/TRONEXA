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
  'Inability to handle complex product personalization (custom engravings, names, birthstones) within a standard storefront',
  'Poor mobile experience causing high bounce rates and cart abandonment',
  'No structured gift guide or collection-based browsing for different customer segments',
  'Limited scalability for seasonal campaigns, influencer collaborations, and flash sales',
];

const SOLUTIONS = [
  'Built a fully customized Shopify storefront with advanced product personalization flows',
  'Designed a mobile-first, conversion-optimized UI that reflects the brand\'s elegant aesthetic',
  'Implemented structured navigation with category-based and gift-guide browsing',
  'Integrated influencer collaboration pages (e.g., Sydney Rae Bass × Tiny Tags, Madi Nelson × Tiny Tags)',
  'Enabled dynamic promotional banners, seasonal campaigns, and flash sale support',
];

const FEATURES = [
  { title: 'Personalization Engine', desc: 'Custom engraving, name, birthstone, and charm selection on product pages' },
  { title: 'Build Your Own', desc: 'Interactive tool allowing customers to design custom charm necklaces' },
  { title: 'Advanced Collections', desc: 'Categorized browsing: Necklaces, Bracelets, Lockets, Birthstone, Mama, Faith, TT Sport, and more' },
  { title: 'Gift Guide', desc: 'Curated gift sections filtered by price (Under $100, $250, $500)' },
  { title: 'Quick Ship Filter', desc: 'Separate collection for items with fast delivery' },
  { title: 'Influencer Pages', desc: 'Dedicated landing pages for brand partnerships' },
  { title: 'Promotional Banners', desc: 'Free shipping threshold announcements and seasonal offers' },
  { title: 'Live Chat Integration', desc: 'Gorgias-powered customer support chat widget' },
  { title: 'Mobile-Optimized Design', desc: 'Fully responsive layout for all screen sizes' },
  { title: 'SEO Optimization', desc: 'Structured metadata, canonical URLs, and OpenGraph tags' },
];

const TECH_STACK = [
  { label: 'Platform', value: 'Shopify (Custom Theme Development)' },
  { label: 'Frontend', value: 'Liquid, HTML5, CSS3, JavaScript' },
  { label: 'Personalization', value: 'Custom Shopify app integrations for engraving & charm builder' },
  { label: 'Customer Support', value: 'Gorgias live chat widget' },
  { label: 'Payment Gateway', value: 'Shopify Payments with digital wallet support' },
  { label: 'Analytics & SEO', value: 'Google Analytics, OpenGraph / Twitter Card meta tags' },
  { label: 'CDN', value: 'Shopify CDN for fast global asset delivery' },
];

const TEAM = [
  { role: 'Project Manager', desc: 'End-to-end coordination, client communication, and milestone tracking' },
  { role: 'UI/UX Designer', desc: 'Brand-aligned design system, wireframes, and prototyping' },
  { role: 'Frontend Developer(s)', desc: 'Shopify theme customization, Liquid templating, and responsive implementation' },
  { role: 'Backend/App Developer', desc: 'Product personalization logic, custom app integrations' },
  { role: 'QA Engineer', desc: 'Cross-browser and cross-device testing' },
  { role: 'SEO Specialist', desc: 'On-page SEO, metadata structuring, and performance optimization' },
];

const MAINTENANCE = [
  'Regular Shopify theme and app updates to maintain compatibility and security',
  'Seasonal campaign setup — banners, collections, and promotional pages for holidays and events',
  'Performance monitoring and Core Web Vitals optimization',
  'New feature additions and influencer collection page deployments',
  'Bug fixes, UI refinements, and continuous UX improvements',
];

export default function TinyTagsContent() {
  const { setIsLoaded } = useLoadingContext();

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="proj-hero" style={{
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
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', textAlign: 'center', width: '100%' }}>
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
            Tiny Tags®
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            lineHeight: 1.75,
            maxWidth: '680px',
            margin: '0 auto 48px',
          }}>
            Transforming a jewelry brand's digital presence with Shopify — how Tronexa built a high-converting
            e-commerce platform for a premium U.S.-based personalized jewelry brand.
          </p>
          <div className="tt-hero-tags" style={{ display: 'flex', justifyContent: 'center', gap: '0', flexWrap: 'wrap' }}>
            {[
              { label: 'Platform', value: 'Shopify' },
              { label: 'Region', value: 'USA' },
              { label: 'Category', value: 'E-Commerce' },
            ].map((tag, i) => (
              <div key={i} className="tt-hero-tag-cell" style={{
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
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <SectionLabel text="Introduction" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                Premium personalized jewelry — reimagined online
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tiny Tags is a premium U.S.-based personalized jewelry brand specializing in handcrafted necklaces,
              bracelets, and charms that celebrate motherhood, milestones, and meaningful moments. Tronexa
              partnered with Tiny Tags to build and maintain their full-scale e-commerce platform — a seamless,
              elegant online shopping experience that reflects the brand's warmth and craftsmanship. The platform
              serves thousands of customers across the United States with a focus on personalization, performance,
              and conversion.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ─────────────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Problem Statement" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                The challenges they faced
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tiny Tags needed a scalable, high-performance e-commerce website that could handle a large and growing
              product catalog while delivering a personalized, emotionally resonant shopping experience. Their
              previous digital presence lacked the flexibility and modern UX needed to support brand growth.
            </p>
          </div>
          <div className="tt-problems-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
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
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Our Solutions" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                How Tronexa delivered
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa delivered an end-to-end e-commerce solution tailored to Tiny Tags' unique business needs —
              combining a visually stunning storefront with powerful backend customization.
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
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <SectionLabel text="Feature List" />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
              textTransform: 'uppercase', color: 'white', margin: '0 0 24px',
            }}>
              Everything built for Tiny Tags
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
              A rich set of features built for both the customer experience and business operations.
            </p>
          </div>
          <div className="tt-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
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
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '72px' }}>
            <div>
              <SectionLabel text="Tech Stack" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                Built with a modern,<br />reliable stack
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa used a modern, reliable tech stack to build a high-performance and scalable platform for Tiny Tags.
            </p>
          </div>
          <div>
            {TECH_STACK.map((row, i) => (
              <div key={i} className="proj-tech-row" style={{
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
      <section className="proj-section-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
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
            <p className="proj-asym-right" style={{ color: 'rgba(13,15,26,0.6)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              The Tiny Tags platform is hosted on Shopify's enterprise-grade cloud infrastructure, ensuring
              maximum uptime, security, and global performance.
            </p>
          </div>
          <div className="tt-hosting-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { label: 'Hosting Provider', value: 'Shopify Cloud Infrastructure' },
              { label: 'SSL/HTTPS', value: 'Enabled by default across all pages' },
              { label: 'CDN', value: 'Shopify\'s global CDN — fast load times worldwide' },
              { label: 'Uptime SLA', value: '99.99% guaranteed uptime' },
            ].map((item, i) => (
              <div key={i} className="tt-hosting-cell" style={{
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
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '72px' }}>
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
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              The Tiny Tags project was executed by a dedicated cross-functional team at Tronexa, ensuring quality
              delivery at every stage. Consistent sprint reviews and hands-on demo sessions maintained clear
              alignment with client objectives across all phases.
            </p>
          </div>
          <div className="tt-team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {TEAM.map((member, i) => (
              <div key={i} className="tt-team-cell" style={{
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
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '64px' }}>
            <div>
              <SectionLabel text="Maintenance" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                Ongoing support as<br />the brand scales
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa provides ongoing maintenance and support to ensure the Tiny Tags platform continues to
              perform at its best as the brand scales.
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
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel text="Conclusion" />
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
            textTransform: 'uppercase', color: 'white', margin: '0 0 40px',
          }}>
            A premium digital presence<br />for a meaningful brand
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.9, margin: '0 0 24px' }}>
            The Tiny Tags project stands as a testament to Tronexa's ability to deliver premium e-commerce experiences
            that blend beautiful design with powerful functionality. By deeply understanding the brand's identity and
            customer journey, Tronexa crafted a platform that not only drives conversions but also builds an emotional
            connection with every visitor.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.9, margin: '0 0 56px' }}>
            Through careful planning and execution, Tronexa successfully transformed Tiny Tags' digital presence into a
            scalable, high-converting e-commerce store that reflects the brand's elegance and craftsmanship. Tronexa
            continues to work alongside Tiny Tags, ensuring the platform evolves and grows in line with the brand's
            expanding business needs.
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
