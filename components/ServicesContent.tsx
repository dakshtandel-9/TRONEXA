'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useLoadingContext } from '@/contexts/LoadingContext';
import BackgroundVideo from '@/components/BackgroundVideo';

const CLIENT_LOGOS = [
  { name: 'AT&T', file: '1.png' },
  { name: 'Brightspeed', file: '2.png' },
  { name: 'Centene', file: '3.png' },
  { name: 'CGI', file: '4.png' },
  { name: 'Denbury', file: '5.png' },
  { name: 'DXC', file: '6.png' },
  { name: 'EPAM', file: '7.png' },
  { name: 'EPIQ', file: '8.png' },
  { name: 'EY', file: '9.png' },
  { name: 'Floor & Decor', file: '10.png' },
  { name: 'Freddie Mac', file: '11.png' },
  { name: 'Fujitsu', file: '12.png' },
  { name: 'Intact', file: '13.png' },
  { name: 'Optum', file: '14.png' },
  { name: 'Scension', file: '15.png' },
  { name: 'Sysco', file: '16.png' },
  { name: 'TCS', file: '17.png' },
  { name: 'US Bank', file: '18.png' },
];

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

const STATS = [
  { num: '150+', label: 'Completed Projects' },
  { num: '50+', label: 'Active Engagements' },
  { num: '12', label: 'Service Domains' },
  { num: '20+', label: 'Countries Served' },
];

const SERVICE_CARDS = [
  { num: '01', title: 'Development', desc: 'End-to-end web, mobile, and game development — from responsive websites and scalable apps to immersive gaming experiences.', href: '/services/development' },
  { num: '02', title: 'Generative AI', desc: 'Create intelligent content, automate workflows, and build next-gen AI experiences with generative models.', href: '/services/generative-ai' },
  { num: '03', title: 'Computer Vision', desc: 'Enable machines to see and interpret the world through image recognition, detection, and video analytics.', href: '/services/computer-vision' },
  { num: '04', title: 'NLP Solutions', desc: 'Unlock the power of human language with advanced text analysis, sentiment detection, and language models.', href: '/services/nlp-solutions' },
  { num: '05', title: 'AI Solutions', desc: 'Leverage Artificial Intelligence to automate processes and unlock business intelligence.', href: '/services/ai-solutions' },
  { num: '06', title: 'IoT Solutions', desc: 'Connect devices and systems seamlessly with intelligent, scalable IoT ecosystems.', href: '/services/iot-solutions' },
  { num: '07', title: 'Cloud Solutions', desc: 'Empower your business with secure, scalable, and cost-efficient cloud infrastructure.', href: '/services/cloud-solutions' },
  { num: '08', title: 'CRM Solutions', desc: 'Enhance customer relationships and productivity with intelligent CRM systems.', href: '/services/crm-solutions' },
  { num: '09', title: 'ServiceNow', desc: 'Streamline enterprise workflows and IT operations with ServiceNow solutions.', href: '/services/servicenow' },
  { num: '10', title: 'Quality Assurance', desc: 'Ensure flawless performance, reliability, and security through comprehensive testing.', href: '/services/quality-assurance' },
  { num: '11', title: 'Digital Marketing', desc: 'Drive visibility, traffic, and growth with data-driven marketing strategies.', href: '/services/digital-marketing' },
  { num: '12', title: 'Staffing (IT & Non-IT)', desc: 'Find the right talent to accelerate your business growth — IT and non-IT roles.', href: '/services/staffing' },
  { num: '13', title: 'ERP Solutions', desc: 'Unify your operations with a fully managed ERP service — from implementation and integration to ongoing support and optimization.', href: '/services/erp-solutions' },
];


const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Requirement Analysis', desc: 'We begin by understanding your business goals, challenges, target audience, and technical requirements through detailed consultation and research.' },
  { num: '02', title: 'Strategy & Planning', desc: 'We define the project scope, technology stack, timelines, milestones, and resource allocation — building a clear roadmap before a single line of code is written.' },
  { num: '03', title: 'Design & Prototyping', desc: 'Our design team creates wireframes, UI/UX designs, and interactive prototypes aligned with your brand identity and user experience goals.' },
  { num: '04', title: 'Development & Engineering', desc: 'Our engineering team builds the solution using modern technologies, agile sprints, and clean architecture — ensuring scalability, security, and performance.' },
  { num: '05', title: 'Testing & Quality Assurance', desc: 'Every deliverable goes through rigorous testing including functional, performance, security, and usability checks before release.' },
  { num: '06', title: 'Deployment & Ongoing Support', desc: 'We deploy the solution to production and provide post-launch support, maintenance, monitoring, and continuous optimization.' },
];

const WHY_CARDS = [
  { title: 'Full-Service Capability', desc: 'From web, mobile, and AI to cloud, IoT, CRM, and staffing — one partner for your entire technology journey, without managing multiple vendors.' },
  { title: 'Experienced Team', desc: 'A team of 150+ developers, designers, engineers, strategists, and specialists with deep expertise across 12 service domains and multiple industries.' },
  { title: 'Proven Delivery', desc: '150+ completed projects and 50+ active client engagements across startups, growing businesses, and enterprises in 20+ countries.' },
  { title: 'Innovation-First Approach', desc: 'We stay ahead of emerging technologies — from Generative AI and computer vision to IoT and cloud automation — so your solutions are always future-ready.' },
];

const INDUSTRIES = [
  'Healthcare & MedTech',
  'Retail & eCommerce',
  'Finance & Fintech',
  'Education & eLearning',
  'Real Estate & PropTech',
  'Manufacturing & Industrial',
  'Logistics & Supply Chain',
  'Hospitality & Travel',
  'Media & Entertainment',
  'SaaS & Technology Startups',
  'Government & Public Sector',
  'Non-Profit & Social Impact',
];

export default function ServicesContent() {
  const { setIsLoaded } = useLoadingContext();

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── SECTION 1: HERO ─────────────────────────────── */}
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
        <BackgroundVideo
          src="/allPagebg.mp4"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', textAlign: 'center' }}>
          <SectionLabel text="What We Offer" />
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 32px',
          }}>
            End-to-end technology solutions<br />for modern businesses
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '15px',
            lineHeight: 1.8,
            maxWidth: '660px',
            margin: '0 auto 52px',
          }}>
            At TRONEXA, we provide innovative, scalable, and business-focused technology solutions that help organizations accelerate growth, improve efficiency, and stay ahead in the digital era. From software development and AI to cloud solutions, staffing, and digital marketing — our expert teams deliver customized services tailored to your business needs.
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
            ⊞ Get In Touch →
          </a>
        </div>
      </section>

      {/* ── SECTION 2: STATS BAR ────────────────────────── */}
      <section className="page-strip" style={{
        background: '#0d0f1a',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '0 60px',
      }}>
        <div className="page-stats-grid" style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {STATS.map((stat, i) => (
            <div key={i} className="page-stats-cell" style={{
              padding: '52px 40px',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              textAlign: i === 0 ? 'left' : 'center',
            }}>
              <div style={{
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 800,
                color: '#cdd4eb',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '10px',
              }}>{stat.num}</div>
              <div style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 500,
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: SERVICES GRID ────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <div>
              <SectionLabel text="Our Services" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Everything your business needs<br />to grow and transform digitally
              </h2>
            </div>
            <p className="page-asym-right" style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              We specialize in delivering end-to-end digital solutions across 12 service domains. Whether you are building from scratch, scaling an existing system, or transforming your enterprise operations — TRONEXA has the expertise to make it happen.
            </p>
          </div>

          <div className="page-grid-3col page-service-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {SERVICE_CARDS.map((card, i) => (
              <div
                key={i}
                className="page-service-card-item"
                style={{
                  padding: '36px 32px',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  borderLeft: i % 3 > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(205,212,235,0.04)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-geist-mono)',
                  marginBottom: '16px',
                }}>{card.num}</div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'white',
                  marginBottom: '12px',
                }}>{card.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                }}>{card.desc}</div>
                <a
                  href={card.href}
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#cdd4eb',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── SECTION 5: OUR PROCESS ──────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel text="How We Deliver" dark />
          <div className="page-grid-asym" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              textTransform: 'uppercase',
              color: '#0d0f1a',
              margin: 0,
            }}>
              A clear, collaborative process<br />from idea to execution
            </h2>
            <p style={{
              color: 'rgba(13,15,26,0.6)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              Every project at TRONEXA follows a structured, transparent, and client-focused delivery process. We keep you informed and involved at every stage — from the first conversation to post-launch support.
            </p>
          </div>

          <div className="page-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(13,15,26,0.12)' }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} style={{
                padding: '44px 36px',
                background: '#cdd4eb',
                clipPath: i === 0 ? CLIP_LG : 'none',
              }}>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(13,15,26,0.25)',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-geist-mono)',
                  marginBottom: '24px',
                }}>{step.num}</div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: '#0d0f1a',
                  marginBottom: '14px',
                }}>{step.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(13,15,26,0.58)',
                  lineHeight: 1.8,
                }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: WHY CHOOSE TRONEXA ───────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <div>
              <SectionLabel text="Why TRONEXA" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                A technology partner you can<br />trust to deliver results
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              We are more than a vendor — we are a strategic partner invested in your success. Our multidisciplinary team brings deep domain expertise, proven methodologies, and an innovation-first mindset to every engagement.
            </p>
          </div>

          <div className="page-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
            {WHY_CARDS.map((card, i) => (
              <div key={i} style={{
                padding: '44px 32px',
                background: '#080b14',
                clipPath: i === 0 ? CLIP_LG : 'none',
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#cdd4eb',
                  marginBottom: '16px',
                }}>{card.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.8,
                }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: INDUSTRIES WE SERVE ─────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <div>
              <SectionLabel text="Industries" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Technology solutions across<br />every major industry
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              Our cross-functional expertise enables us to serve businesses across a wide spectrum of industries — delivering tailored solutions that align with sector-specific challenges, regulatory requirements, and market dynamics.
            </p>
          </div>

          <div className="page-industries-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {INDUSTRIES.map((industry, i) => (
              <div key={i} className={`page-industry-cell page-industry-cell-${(i % 4) + 1}`} style={{
                padding: '24px 28px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderLeft: i % 4 > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(205,212,235,0.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ fontSize: '7px', color: '#cdd4eb', flexShrink: 0 }}>■</span>
                <span style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.65)',
                  letterSpacing: '0.04em',
                  fontWeight: 500,
                }}>{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: OUR CLIENTS ──────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <SectionLabel text="Our Clients" />
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              textTransform: 'uppercase',
              color: 'white',
              margin: '0 0 20px',
            }}>Trusted by industry leaders<br />across the globe</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.8, margin: 0 }}>
              We are proud to have partnered with some of the world's most recognized brands and enterprises.
            </p>
          </div>

          <div className="page-clients-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.07)',
          }}>
            {CLIENT_LOGOS.map((client, i) => (
              <div key={i} style={{
                background: '#080b14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 24px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(205,212,235,0.05)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#080b14'; }}
              >
                <Image
                  src={`/ClientsLogo/${client.file}`}
                  alt={client.name}
                  width={160}
                  height={64}
                  className="page-client-logo"
                  style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.6, width: 'auto', height: 'auto', maxWidth: '110px', maxHeight: '38px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: CTA BANNER ───────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            textTransform: 'uppercase',
            color: '#0d0f1a',
            margin: '0 0 28px',
          }}>
            Not sure which service<br />is right for your business?
          </h2>
          <p style={{
            color: 'rgba(13,15,26,0.6)',
            fontSize: '14px',
            lineHeight: 1.85,
            margin: '0 0 52px',
          }}>
            Talk to our team. We will understand your goals and recommend the right technology solutions to help you grow, transform, and succeed.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#0d0f1a',
                color: 'white',
                padding: '14px 34px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textDecoration: 'none',
                clipPath: CLIP,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a1e30'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0d0f1a'; }}
            >
              ⊞ Schedule a Consultation →
            </a>
            <a
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid rgba(13,15,26,0.35)',
                color: '#0d0f1a',
                padding: '14px 34px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#0d0f1a'; el.style.color = 'white'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#0d0f1a'; }}
            >
              ⊞ View Our Projects →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
