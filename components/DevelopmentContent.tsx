'use client';

import { useEffect, useState } from 'react';
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

const SUB_SERVICES = [
  {
    id: 'web',
    num: '01',
    title: 'Web Development',
    href: '/services/web-development',
    shortDesc: 'Build powerful, responsive, and high-performing websites tailored to your business goals.',
    overview: 'From corporate websites and enterprise platforms to SaaS products and eCommerce solutions, our team combines innovative design with robust engineering to build digital experiences that perform seamlessly across devices.',
    deliverables: [
      { num: '01', title: 'Front-End Development', desc: 'Creating responsive and visually appealing website interfaces with smooth navigation and interactive elements.' },
      { num: '02', title: 'Back-End Development', desc: 'Building secure server-side systems, databases, APIs, and business logic for seamless functionality.' },
      { num: '03', title: 'Full-Stack Development', desc: 'Providing complete front-end and back-end solutions for scalable, high-performing web applications.' },
      { num: '04', title: 'E-Commerce Development', desc: 'Developing secure online stores with payment gateways, product management, and seamless shopping experiences.' },
      { num: '05', title: 'CMS Development', desc: 'Creating easy-to-manage websites using content management systems for effortless updates.' },
      { num: '06', title: 'Custom Web Applications', desc: 'Building tailored web applications such as dashboards, booking systems, portals, and automation tools.' },
      { num: '07', title: 'Enterprise Web Solutions', desc: 'Developing secure and scalable enterprise applications including CRM, ERP, and workflow systems.' },
      { num: '08', title: 'SaaS Platforms', desc: 'Developing cloud-based software platforms with secure, scalable, and subscription-based access.' },
      { num: '09', title: 'API Development & Integration', desc: 'Connecting websites with third-party platforms, payment systems, and cloud services.' },
      { num: '10', title: 'Website Optimization & Maintenance', desc: 'Providing updates, bug fixing, security monitoring, and performance optimization services.' },
    ],
  },
  {
    id: 'app',
    num: '02',
    title: 'App Development',
    href: '/services/app-development',
    shortDesc: 'Develop innovative mobile and desktop applications that enhance customer engagement.',
    overview: 'We specialize in building Android, iOS, and cross-platform applications with intuitive interfaces, secure architectures, and scalable infrastructures. Whether launching a startup product or modernizing enterprise operations, our mobile solutions are built for performance and long-term success.',
    deliverables: [
      { num: '01', title: 'Android App Development', desc: 'Building scalable Android applications with smooth functionality and seamless user experiences.' },
      { num: '02', title: 'iOS App Development', desc: 'Creating secure and high-performance applications for Apple devices with intuitive designs.' },
      { num: '03', title: 'Cross-Platform Applications', desc: 'Developing apps that function seamlessly across multiple operating systems using React Native and Flutter.' },
      { num: '04', title: 'Enterprise Mobility Solutions', desc: 'Building secure business applications to improve productivity and streamline enterprise operations.' },
      { num: '05', title: 'E-Commerce Applications', desc: 'Building feature-rich shopping applications with secure payments and product management.' },
      { num: '06', title: 'SaaS Applications', desc: 'Building cloud-based software applications with scalable and secure infrastructure.' },
      { num: '07', title: 'API & Backend Development', desc: 'Developing secure backend systems and integrating third-party APIs for seamless connectivity.' },
      { num: '08', title: 'Mobile UI/UX Design', desc: 'Designing intuitive interfaces and seamless experiences for better usability and engagement.' },
      { num: '09', title: 'App Maintenance & Support', desc: 'Providing regular updates, bug fixes, optimization, and technical support post-launch.' },
      { num: '10', title: 'Progressive Web Apps', desc: 'Creating app-like web experiences with offline accessibility and improved performance.' },
    ],
  },
  {
    id: 'game',
    num: '03',
    title: 'Game Development',
    href: '/services/game-development',
    shortDesc: 'Transform creative ideas into immersive gaming experiences across all platforms.',
    overview: 'Our game development team builds interactive and visually compelling games for mobile, desktop, web, AR, and VR environments. From concept design and gameplay mechanics to deployment and optimization, we deliver gaming experiences that maximize engagement and retention.',
    deliverables: [
      { num: '01', title: '2D Game Development', desc: 'Creating engaging 2D games with smooth animations, interactive gameplay, and optimized performance.' },
      { num: '02', title: '3D Game Development', desc: 'Building immersive 3D games with realistic graphics, environments, and gameplay experiences.' },
      { num: '03', title: 'Mobile Game Development', desc: 'Developing optimized mobile games for Android and iOS devices with seamless performance.' },
      { num: '04', title: 'PC Game Development', desc: 'Creating high-performance desktop games with engaging mechanics and immersive storytelling.' },
      { num: '05', title: 'Multiplayer Games', desc: 'Building real-time multiplayer games with secure connectivity and interactive experiences.' },
      { num: '06', title: 'AR/VR Experiences', desc: 'Developing immersive augmented and virtual reality gaming experiences with advanced interactions.' },
      { num: '07', title: 'Unity Development', desc: 'Creating scalable and visually appealing games using Unity for cross-platform compatibility.' },
      { num: '08', title: 'Unreal Engine Development', desc: 'Building advanced games with realistic visuals and high performance using Unreal Engine.' },
      { num: '09', title: 'Simulation Games', desc: 'Developing simulation-based games for training, entertainment, and real-world experiences.' },
      { num: '10', title: 'Gamification Solutions', desc: 'Integrating game mechanics into applications and platforms to boost engagement and interaction.' },
    ],
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Requirement Analysis', desc: 'We begin by understanding your business goals, challenges, target audience, and technical requirements through detailed consultation and research.' },
  { num: '02', title: 'Strategy & Planning', desc: 'We define the project scope, technology stack, timelines, milestones, and resource allocation — building a clear roadmap before a single line of code is written.' },
  { num: '03', title: 'Design & Prototyping', desc: 'Our design team creates wireframes, UI/UX designs, and interactive prototypes aligned with your brand identity and user experience goals.' },
  { num: '04', title: 'Development & Engineering', desc: 'Our engineering team builds the solution using modern technologies, agile sprints, and clean architecture — ensuring scalability, security, and performance.' },
  { num: '05', title: 'Testing & Quality Assurance', desc: 'Every deliverable goes through rigorous testing including functional, performance, security, and usability checks before release.' },
  { num: '06', title: 'Deployment & Ongoing Support', desc: 'We deploy the solution to production and provide post-launch support, maintenance, monitoring, and continuous optimization.' },
];

const WHY_POINTS = [
  { title: 'End-to-End Capability', desc: 'From websites and mobile apps to games — one partner covers your entire development roadmap without the complexity of managing multiple agencies.' },
  { title: 'Modern Technology Stack', desc: 'We build with the latest frameworks — React, Next.js, Flutter, Unity, Unreal Engine — ensuring your solution stays current, performant, and maintainable.' },
  { title: 'User-Centered Design', desc: 'Every interface is grounded in real user research to ensure interactions are intuitive, accessible, and optimized for engagement.' },
  { title: 'Scalable Architecture', desc: 'Our solutions are designed to grow with your business — handling increased users, data, and features without costly rewrites.' },
];

export default function DevelopmentContent() {
  const { setIsLoaded } = useLoadingContext();
  const [activeTab, setActiveTab] = useState('web');

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  const active = SUB_SERVICES.find(s => s.id === activeTab)!;

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── HERO ─────────────────────────────── */}
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
          <SectionLabel text="Development" />
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 32px',
          }}>
            Build. Launch. Scale.<br />Across Every Platform
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '15px',
            lineHeight: 1.8,
            maxWidth: '660px',
            margin: '0 auto 52px',
          }}>
            TRONEXA delivers end-to-end development across web, mobile, and gaming — combining engineering excellence, modern design, and deep technical expertise to bring your vision to life at any scale.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {SUB_SERVICES.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={e => { e.preventDefault(); setActiveTab(s.id); document.getElementById('sub-services')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: activeTab === s.id ? '#cdd4eb' : 'transparent',
                  color: activeTab === s.id ? '#0d0f1a' : '#cdd4eb',
                  border: '1px solid rgba(205,212,235,0.4)',
                  padding: '12px 28px',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                  clipPath: CLIP,
                  transition: 'background 0.2s, color 0.2s',
                  cursor: 'pointer',
                }}
              >
                {s.num} {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUB-SERVICE OVERVIEW ─────────────── */}
      <section id="sub-services" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '72px', gap: 0 }}>
            {SUB_SERVICES.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === s.id ? '2px solid #cdd4eb' : '2px solid transparent',
                  color: activeTab === s.id ? '#cdd4eb' : 'rgba(255,255,255,0.35)',
                  padding: '16px 32px',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginBottom: '-1px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { if (activeTab !== s.id) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={e => { if (activeTab !== s.id) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
              >
                {s.num} — {s.title}
              </button>
            ))}
          </div>

          {/* Active sub-service content */}
          <div key={active.id}>
            <div className="page-grid-asym" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.8fr',
              gap: '80px',
              alignItems: 'start',
              marginBottom: '64px',
            }}>
              <div>
                <SectionLabel text={`${active.num} — ${active.title}`} />
                <h2 style={{
                  fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.12,
                  textTransform: 'uppercase',
                  color: 'white',
                  margin: '0 0 28px',
                }}>
                  {active.title}
                </h2>
                <a
                  href={active.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#cdd4eb',
                    color: '#0d0f1a',
                    padding: '12px 24px',
                    fontSize: '10px',
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
                  Full Details →
                </a>
              </div>
              <div style={{ paddingTop: '66px' }}>
                <p style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '14px',
                  lineHeight: 1.85,
                  margin: '0 0 20px',
                }}>
                  {active.shortDesc}
                </p>
                <p style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '13px',
                  lineHeight: 1.85,
                  margin: 0,
                }}>
                  {active.overview}
                </p>
              </div>
            </div>

            {/* Deliverables grid */}
            <div className="page-grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {active.deliverables.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: '36px 32px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    borderLeft: i % 3 > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    transition: 'background 0.2s',
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
                  }}>{item.num}</div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'white',
                    marginBottom: '12px',
                  }}>{item.title}</div>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.7,
                  }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────── */}
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

      {/* ── WHY TRONEXA ─────────────────────── */}
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
                A development partner<br />built for your growth
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              Whether you need a high-performance website, a feature-rich mobile app, or a groundbreaking gaming experience — TRONEXA brings together the right expertise, tools, and process to deliver results you can stand behind.
            </p>
          </div>

          <div className="page-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
            {WHY_POINTS.map((card, i) => (
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

      {/* ── CTA ─────────────────────────────── */}
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
            Ready to build something<br />exceptional?
          </h2>
          <p style={{
            color: 'rgba(13,15,26,0.6)',
            fontSize: '14px',
            lineHeight: 1.85,
            margin: '0 0 52px',
          }}>
            Talk to our team. We will understand your goals and craft the right development solution — web, mobile, or gaming — to help you grow and succeed.
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
              href="/services"
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
              ⊞ All Services →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
