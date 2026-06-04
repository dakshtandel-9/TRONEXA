'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useLoadingContext } from '@/contexts/LoadingContext';

const CLIENT_LOGOS = [
  { name: 'AT&T', file: 'AT&T.png' },
  { name: 'Brightspeed', file: 'BRIGHTSPEED.png' },
  { name: 'Centene', file: 'CENTENE.png' },
  { name: 'CGI', file: 'CGI.png' },
  { name: 'Denbury', file: 'DENBURY.png' },
  { name: 'DXC', file: 'DXC.png' },
  { name: 'EPAM', file: 'EPAM.png' },
  { name: 'EPIQ', file: 'EPIQ.png' },
  { name: 'EY', file: 'EY.png' },
  { name: 'Floor & Decor', file: 'FLOOR&DECOR.png' },
  { name: 'Freddie Mac', file: 'FREDDIEMAC.png' },
  { name: 'Fujitsu', file: 'FUJITSU.png' },
  { name: 'Intact', file: 'INTACT.png' },
  { name: 'Optum', file: 'OPTUM.png' },
  { name: 'Scension', file: 'SCENSION.png' },
  { name: 'Sysco', file: 'SYSCO.png' },
  { name: 'TCS', file: 'TCS.png' },
  { name: 'US Bank', file: 'USBANK.png' },
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

export default function AboutContent() {
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
          <SectionLabel text="About TRONEXA" />

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 32px',
          }}>
            We are building the future<br />of intelligent technology
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '15px',
            lineHeight: 1.8,
            maxWidth: '620px',
            margin: '0 auto 52px',
          }}>
            TRONEXA is a global technology company delivering innovative digital solutions that help
            businesses grow, transform, and lead. From strategy and design to development and deployment,
            we build intelligent systems that create lasting value.
          </p>

          <a
            href="/services"
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
            ⊞ Explore Our Services →
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
          {[
            { num: '2018', label: 'Founded' },
            { num: '150+', label: 'Team Members' },
            { num: '150+', label: 'Completed Projects' },
            { num: '20+', label: 'Countries Served' },
          ].map((stat, i) => (
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

      {/* ── SECTION 3: WHO WE ARE ───────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div className="page-grid-asym" style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '80px',
          alignItems: 'start',
        }}>
          <div>
            <SectionLabel text="Who We Are" />
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              textTransform: 'uppercase',
              color: 'white',
              margin: 0,
            }}>
              More than a technology company —<br />a digital transformation partner
            </h2>
          </div>
          <div className="page-asym-right" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.85 }}>
            <p style={{ margin: '0 0 20px' }}>
              We are more than just a technology company. We are a strategic digital transformation partner
              committed to helping businesses innovate, scale, and thrive in an ever-evolving digital landscape.
              With a passion for technology and a deep understanding of business challenges, we deliver intelligent
              solutions that bridge the gap between ideas and impactful results.
            </p>
            <p style={{ margin: '0 0 20px' }}>
              From startups to large enterprises, we empower organizations to improve efficiency, strengthen their
              digital presence, and accelerate growth through intelligent, future-ready technology solutions built
              on innovation, quality, and trust.
            </p>
            <p style={{ margin: 0 }}>
              Our expertise spans web and mobile development, UI/UX design, cloud solutions, AI and machine learning,
              automation, enterprise software, SaaS platforms, and emerging technologies. With a team of skilled
              developers, designers, and technology specialists, we deliver end-to-end solutions that align with
              business goals and drive measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: VISION & MISSION ─────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel text="Our Purpose" dark />
          <div className="page-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginTop: '40px' }}>
            {[
              {
                label: 'Vision',
                heading: 'To lead the future of digital innovation',
                body: 'Our vision is to become a trusted global technology partner that empowers businesses through innovation, digital excellence, and future-ready solutions. We aim to create meaningful digital experiences that drive long-term growth and sustainable success.',
                inverted: true,
              },
              {
                label: 'Mission',
                heading: 'To deliver technology that creates real impact',
                body: 'Our mission is to help businesses navigate digital transformation with confidence by delivering scalable, secure, and high-performing technology solutions. We focus on building systems that improve operational efficiency, enhance customer experiences, and accelerate business growth.',
                inverted: false,
              },
            ].map((col, i) => (
              <div key={i} style={{
                padding: '52px 48px',
                background: col.inverted ? '#0d0f1a' : 'transparent',
                border: col.inverted ? 'none' : '1px solid rgba(13,15,26,0.18)',
                clipPath: col.inverted ? CLIP_LG : 'none',
              }}>
                <div style={{
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '24px',
                  color: col.inverted ? '#cdd4eb' : '#0d0f1a',
                }}>■ {col.label}</div>
                <h3 style={{
                  fontSize: 'clamp(1.15rem, 1.7vw, 1.75rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  lineHeight: 1.18,
                  margin: '0 0 24px',
                  color: col.inverted ? 'white' : '#0d0f1a',
                }}>{col.heading}</h3>
                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.85,
                  margin: 0,
                  color: col.inverted ? 'rgba(255,255,255,0.6)' : 'rgba(13,15,26,0.6)',
                }}>{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: WHAT WE DO ───────────────────────── */}
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
              <SectionLabel text="What We Do" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>End-to-end digital solutions<br />for modern businesses</h2>
            </div>
            <p className="page-asym-right" style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              We specialize in delivering intelligent, scalable, and business-focused technology solutions
              across every stage of digital transformation. From concept to execution, our expert teams
              build solutions tailored to your goals.
            </p>
          </div>

          <div className="page-whatwedo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { num: '01', title: 'Web Development', desc: 'High-performance, responsive, and scalable websites and web applications built for growth.' },
              { num: '02', title: 'Mobile App Development', desc: 'Native and cross-platform mobile applications for Android and iOS with seamless user experiences.' },
              { num: '03', title: 'AI & Machine Learning', desc: 'Smart automation, predictive analytics, and AI-powered systems that improve decision-making.' },
              { num: '04', title: 'Cloud Solutions', desc: 'Secure, scalable, and cost-efficient cloud infrastructure, migration, and management.' },
              { num: '05', title: 'Game Development', desc: 'Immersive, interactive, and high-performance gaming experiences across platforms.' },
              { num: '06', title: 'CRM & Enterprise Solutions', desc: 'CRM platforms, ERP systems, SaaS tools, and workflow automation for enterprise operations.' },
              { num: '07', title: 'IoT Solutions', desc: 'Connected device ecosystems, industrial automation, and smart monitoring systems.' },
              { num: '08', title: 'Digital Marketing & Staffing', desc: 'Data-driven marketing strategies and reliable IT and non-IT staffing solutions.' },
            ].map((s, i) => (
              <div key={i} className="page-whatwedo-cell" style={{
                padding: '36px 28px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderLeft: i % 4 > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-geist-mono)',
                  marginBottom: '18px',
                }}>{s.num}</div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'white',
                  marginBottom: '12px',
                }}>{s.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.7,
                }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '48px', textAlign: 'center' }}>
            <a
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid rgba(255,255,255,0.35)',
                color: 'white',
                padding: '14px 34px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'white'; el.style.color = '#0d0f1a'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'white'; }}
            >
              ⊞ View All Services →
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: OUR APPROACH ─────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <SectionLabel text="How We Work" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: '0 0 24px',
              }}>A process built on transparency and innovation</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.8, margin: 0 }}>
                We follow a collaborative and transparent process to ensure every solution aligns with your
                business goals — from research and strategy to deployment and ongoing support.
              </p>
            </div>

            <div className="page-asym-right">
              {[
                { num: '01', title: 'Innovation-Driven Thinking', desc: 'We approach every challenge with creative problem-solving and emerging technology.' },
                { num: '02', title: 'Client-Centric Development', desc: 'Every solution is built around your specific goals, audience, and business context.' },
                { num: '03', title: 'Scalable & Secure Architecture', desc: 'We build systems designed to grow with your business without compromising security.' },
                { num: '04', title: 'Agile & Transparent Collaboration', desc: 'You stay informed and involved throughout the entire development process.' },
                { num: '05', title: 'Quality Assurance & Optimization', desc: 'We test rigorously and continuously optimize for performance, reliability, and user experience.' },
              ].map((p, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '32px',
                  alignItems: 'flex-start',
                  padding: '28px 0',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.2em',
                    fontFamily: 'var(--font-geist-mono)',
                    minWidth: '28px',
                    paddingTop: '2px',
                    flexShrink: 0,
                  }}>{p.num}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'white', marginBottom: '8px' }}>{p.title}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: OUR VALUES ───────────────────────── */}
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
              <SectionLabel text="Our Values" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>The principles that guide everything we build</h2>
            </div>
            <p className="page-asym-right" style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              TRONEXA is guided by values of innovation, transparency, excellence, and collective growth —
              leveraging diverse expertise to create transformative digital solutions for businesses worldwide.
            </p>
          </div>

          <div className="page-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { num: '001', title: 'Purpose', desc: 'At TRONEXA, every solution begins with a purpose. We transform bold ideas into intelligent technology that solves real-world challenges and drives meaningful business impact.' },
              { num: '002', title: 'Growth', desc: 'We are invested in continuous growth — for our clients, our team, and our technology. Through learning, mentorship, and meaningful challenges, we evolve alongside the industry.' },
              { num: '003', title: 'Teamwork', desc: 'We are a close-knit team of developers, designers, strategists, engineers, and innovators. Collaboration, integrity, and mutual respect shape everything we build.' },
              { num: '004', title: 'Unity', desc: 'From software engineers to product strategists, every perspective matters here. Diverse thinking creates stronger solutions, better experiences, and lasting innovation.' },
            ].map((v, i) => (
              <div key={i} className="page-values-cell" style={{
                padding: '44px 32px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.18)',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-geist-mono)',
                  marginBottom: '28px',
                }}>{v.num}</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: '#cdd4eb',
                  marginBottom: '16px',
                }}>{v.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.8,
                }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: WHY CHOOSE US ────────────────────── */}
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
              }}>Technology that creates opportunity, not just solutions</h2>
            </div>
            <div className="page-asym-right" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.85, paddingTop: '66px' }}>
              <p style={{ margin: '0 0 20px' }}>
                We believe technology should not only solve problems but also create new opportunities. Our experienced
                team of developers, designers, and technology experts work closely with clients to build customized
                solutions that deliver measurable business impact.
              </p>
              <p style={{ margin: 0 }}>
                Whether you are a startup building a new product, a growing business scaling operations, or an enterprise
                driving digital transformation — we provide the expertise, strategy, and technology to help you succeed.
              </p>
            </div>
          </div>

          <div className="page-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
            {[
              { title: 'Global Reach', desc: 'Operating across USA, UAE, and India with 20+ countries served and a team of 150+ professionals.' },
              { title: 'Full-Service Capability', desc: 'From web and mobile to AI, cloud, IoT, and staffing — one partner for your entire technology journey.' },
              { title: 'Proven Track Record', desc: '150+ completed projects and 50+ active engagements across industries and business sizes.' },
              { title: 'Innovation at the Core', desc: 'Founded in 2018 with a mission to stay ahead of emerging technologies and deliver future-ready solutions.' },
            ].map((card, i) => (
              <div key={i} style={{
                padding: '40px 32px',
                background: '#080b14',
                clipPath: i === 0 ? CLIP_LG : 'none',
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#cdd4eb',
                  marginBottom: '14px',
                }}>{card.title}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: OUR COMMITMENT ───────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '10px', color: '#cdd4eb' }}>■</span>
            <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#cdd4eb', fontWeight: 600 }}>Our Commitment</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 36px',
          }}>Built on innovation, quality,<br />trust, and long-term partnerships</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: '0 0 20px' }}>
            At the core of everything we do is a commitment to innovation, quality, trust, and long-term partnerships.
            We continuously adapt to emerging technologies and industry trends to ensure our clients stay competitive,
            agile, and future-ready.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0 }}>
            Together, we build intelligent digital solutions that transform businesses and create lasting value.
          </p>
        </div>
      </section>

      {/* ── SECTION 10: GLOBAL PRESENCE ─────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel text="Where We Are" />
          <h2 style={{
            fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.12,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 64px',
          }}>Serving businesses<br />across the globe</h2>

          <div className="page-locations-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              {
                country: 'USA',
                address: '8 The Green, Suite A\nDover, DE 19901, USA',
              },
              {
                country: 'UAE',
                address: 'Business Centre, 3rd Floor, Building A3\nBusiness Park, Dubai South\nDubai, United Arab Emirates',
              },
              {
                country: 'India',
                address: '808, 8th Floor, Skye Corporate Park\nAB Road, Indore 452010, India',
              },
            ].map((loc, i) => (
              <div key={i} style={{
                padding: '44px 40px',
                border: '1px solid rgba(255,255,255,0.1)',
                clipPath: i === 0 ? CLIP_LG : 'none',
              }}>
                <div style={{
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: '#cdd4eb',
                  marginBottom: '20px',
                }}>■ {loc.country}</div>
                <div style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.85,
                  whiteSpace: 'pre-line',
                }}>{loc.address}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 11: OUR CLIENTS ─────────────────────── */}
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

          <div style={{
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
                  width={120}
                  height={48}
                  style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.6, maxWidth: '100%', height: '40px', width: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 12: CTA BANNER ──────────────────────── */}
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
            Ready to transform<br />your business with technology?
          </h2>
          <p style={{
            color: 'rgba(13,15,26,0.6)',
            fontSize: '14px',
            lineHeight: 1.85,
            margin: '0 0 52px',
          }}>
            Connect with our team to discuss your goals, explore our services, and discover how
            TRONEXA can accelerate your digital journey.
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
              ⊞ Get In Touch →
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
              ⊞ Explore Our Services →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
