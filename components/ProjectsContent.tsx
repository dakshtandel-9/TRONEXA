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



const TECH_STACK = [
  { label: 'Frontend', items: 'React.js, Next.js, Vue.js, Angular, HTML5, CSS3, Tailwind CSS, TypeScript' },
  { label: 'Backend', items: 'Node.js, Express.js, Python, Django, Laravel, PHP, Java, .NET' },
  { label: 'Mobile', items: 'React Native, Flutter, Swift, Kotlin, Android SDK, iOS SDK' },
  { label: 'Database & Storage', items: 'MongoDB, PostgreSQL, MySQL, Firebase, Redis, Supabase' },
  { label: 'Cloud & DevOps', items: 'AWS, Microsoft Azure, Google Cloud Platform, Docker, Kubernetes, CI/CD Pipelines' },
  { label: 'AI & Machine Learning', items: 'Python, TensorFlow, PyTorch, OpenAI APIs, LangChain, Hugging Face, scikit-learn' },
  { label: 'CMS Platforms', items: 'WordPress, Shopify, Webflow, Strapi, Contentful, Sanity' },
  { label: 'Game Development', items: 'Unity, Unreal Engine, Godot, Blender, PlayFab' },
  { label: 'IoT & Automation', items: 'MQTT, Arduino, Raspberry Pi, AWS IoT, Azure IoT Hub' },
];

const INDUSTRIES = [
  { num: '01', title: 'Healthcare & MedTech', desc: 'Digital health platforms, patient management systems, medical apps, and healthcare automation.' },
  { num: '02', title: 'Retail & eCommerce', desc: 'Online stores, product management systems, inventory automation, and customer experience platforms.' },
  { num: '03', title: 'Finance & Fintech', desc: 'Secure payment systems, financial dashboards, banking apps, and data analytics platforms.' },
  { num: '04', title: 'Education & eLearning', desc: 'Learning management systems, educational apps, gamified learning platforms, and student portals.' },
  { num: '05', title: 'Real Estate & PropTech', desc: 'Property listing platforms, CRM systems, virtual tour integrations, and lead management tools.' },
  { num: '06', title: 'Manufacturing & Industrial', desc: 'IoT monitoring systems, production automation, quality inspection tools, and ERP integrations.' },
  { num: '07', title: 'Logistics & Supply Chain', desc: 'Fleet management platforms, delivery tracking apps, warehouse automation, and real-time monitoring.' },
  { num: '08', title: 'Hospitality & Travel', desc: 'Booking platforms, hotel management systems, travel apps, and customer engagement tools.' },
  { num: '09', title: 'Media & Entertainment', desc: 'Content platforms, streaming integrations, gaming experiences, and digital media solutions.' },
  { num: '10', title: 'SaaS & Technology', desc: 'Cloud-based software products, API platforms, developer tools, and B2B SaaS solutions.' },
  { num: '11', title: 'Government & Public Sector', desc: 'Digital transformation initiatives, workflow automation, citizen service portals, and data management.' },
  { num: '12', title: 'Non-Profit & Social Impact', desc: 'Awareness platforms, donation management tools, community apps, and digital outreach systems.' },
];

const TESTIMONIALS = [
  {
    quote: '"TRONEXA delivered exactly what we needed — a reliable, high-performing digital solution built on time and within budget. Their team\'s expertise and communication throughout the project were exceptional."',
    name: 'Gudrun Wurm',
    title: 'Founder & CEO, Little Butterfly London',
  },
  {
    quote: '"Working with TRONEXA was a seamless experience. They understood our vision from day one and built a solution that truly reflects our brand and serves our customers well."',
    name: 'Charlene Miraglia',
    title: 'Owner, Small Packages',
  },
  {
    quote: '"The TRONEXA team brought both technical depth and creative thinking to our project. The result exceeded our expectations and has made a real difference to our business operations."',
    name: 'Melissa Clayton',
    title: 'CEO & Founder, TinyTags',
  },
];

const DELIVERY_STEPS = [
  { num: '01', title: 'Discovery & Briefing', desc: 'We start by understanding your business, goals, audience, and technical requirements through detailed consultation.' },
  { num: '02', title: 'Strategy & Scoping', desc: 'We define the full project scope, technology stack, timeline, team structure, and budget — giving you complete clarity before we begin.' },
  { num: '03', title: 'Design & Prototyping', desc: 'Our designers create wireframes, UI mockups, and interactive prototypes for your review and feedback before development starts.' },
  { num: '04', title: 'Agile Development', desc: 'Our engineering team builds the solution in structured sprints — delivering working modules iteratively with full transparency.' },
  { num: '05', title: 'Testing & Quality Assurance', desc: 'Every feature is tested for functionality, performance, security, and usability before delivery.' },
  { num: '06', title: 'Launch & Post-Launch Support', desc: 'We deploy the solution and provide continued maintenance, monitoring, updates, and support after launch.' },
];



type CaseStudy = {
  num: string;
  client: string;
  tag: string;
  region: string;
  desc: string;
  outcomes: string[];
  href: string;
};

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={study.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '44px 38px',
        background: hovered ? 'rgba(205,212,235,0.05)' : '#080b14',
        transition: 'background 0.3s',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hover accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: '#cdd4eb',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <span style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.18)',
          letterSpacing: '0.2em',
          fontFamily: 'var(--font-geist-mono)',
        }}>{study.num}</span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#cdd4eb',
            border: '1px solid rgba(205,212,235,0.35)',
            padding: '4px 10px',
            fontWeight: 600,
          }}>{study.tag}</span>
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.38)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '4px 10px',
          }}>{study.region}</span>
        </div>
      </div>

      {/* Client name */}
      <div style={{
        fontSize: '18px',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '-0.01em',
        color: 'white',
        marginBottom: '16px',
        lineHeight: 1.1,
      }}>{study.client}</div>

      {/* Description */}
      <p style={{
        fontSize: '12px',
        color: 'rgba(255,255,255,0.48)',
        lineHeight: 1.85,
        margin: '0 0 24px',
        flex: 1,
      }}>{study.desc}</p>

      {/* Outcomes */}
      <div style={{ marginBottom: '28px' }}>
        {study.outcomes.map((o, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 0',
            borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <span style={{ fontSize: '8px', color: '#cdd4eb' }}>▸</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.42)', letterSpacing: '0.02em' }}>{o}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '10px',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#cdd4eb',
        fontWeight: 700,
        opacity: hovered ? 1 : 0.55,
        transition: 'opacity 0.2s',
      }}>
        View Case Study →
      </span>
    </a>
  );
}

export default function ProjectsContent() {
  const { setIsLoaded } = useLoadingContext();

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── SECTION 1: HERO ─────────────────────────────── */}
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
          <SectionLabel text="Our Work" />

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 32px',
          }}>
            Delivering intelligent solutions<br />that create real impact
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '15px',
            lineHeight: 1.8,
            maxWidth: '660px',
            margin: '0 auto 52px',
          }}>
            From ambitious startups to global enterprises, TRONEXA has delivered 150+ successful digital projects
            across web, mobile, AI, cloud, enterprise systems, and emerging technologies. Every project is a
            reflection of our commitment to quality, innovation, and measurable results.
          </p>

          <div className="proj-hero-stats" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0',
            marginBottom: '56px',
            flexWrap: 'wrap',
          }}>
            {[
              { num: '150+', label: 'Completed Projects' },
              { num: '50+', label: 'Active Engagements' },
              { num: '20+', label: 'Countries Served' },
            ].map((stat, i) => (
              <div key={i} className="proj-hero-stat-cell" style={{
                padding: '28px 48px',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontWeight: 800,
                  color: '#cdd4eb',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>{stat.num}</div>
                <div style={{
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 500,
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

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
            ⊞ Start Your Project →
          </a>
        </div>
      </section>


      {/* ── SECTION 3B: CASE STUDIES ────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <div>
              <SectionLabel text="Featured Case Studies" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Real projects,<br />real results
              </h2>
            </div>
            <p className="proj-asym-right" style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              Explore how Tronexa has built high-converting digital platforms for global brands — delivering
              seamless e-commerce experiences that blend beautiful design with powerful functionality.
            </p>
          </div>

          <div className="proj-case-studies-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.07)',
          }}>
            {[
              {
                num: '01',
                client: 'Tiny Tags®',
                tag: 'Personalized Jewelry',
                region: 'USA',
                desc: 'A high-converting Shopify e-commerce platform for a premium U.S.-based personalized jewelry brand — featuring advanced personalization flows, influencer collaboration pages, and mobile-first design.',
                outcomes: ['Custom engraving & charm builder', 'Mobile-first, conversion-optimized UI', 'Influencer collaboration pages'],
                href: '/projects/tiny-tags',
              },
              {
                num: '02',
                client: 'Small Packages',
                tag: 'Gift Curation Platform',
                region: 'USA',
                desc: 'A Shopify storefront unifying retail and corporate gifting with an interactive Build-a-Box tool, occasion-based navigation, and a dedicated corporate inquiry workflow.',
                outcomes: ['Interactive Build-a-Box tool', 'Corporate gifting workflow', 'Occasion-based navigation'],
                href: '/projects/small-packages',
              },
              {
                num: '03',
                client: 'Little Butterfly London',
                tag: 'Organic Baby Skincare',
                region: 'UK & Global',
                desc: 'A premium organic baby skincare platform built on Shopify with age-segmented collections, trust-first content pages, and a smart cart with product recommendations.',
                outcomes: ['Age-segmented collections', 'Certifications & ingredients pages', 'Smart cart with recommendations'],
                href: '/projects/little-butterfly-london',
              },
              {
                num: '04',
                client: 'FinTech Platform',
                tag: 'Digital Finance',
                region: 'Global',
                desc: 'A next-generation FinTech ecosystem with secure digital wallets, P2P transfers, multi-payment integration, real-time transaction processing, KYC verification, and fraud detection — built on AWS with PCI-DSS compliance.',
                outcomes: ['Digital wallet & P2P money transfers', 'Multi-currency & QR code payments', 'Fraud detection & KYC compliance'],
                href: '/projects/fintech-platform',
              },
              {
                num: '05',
                client: 'App Development',
                tag: 'Mobile Applications',
                region: 'Global',
                desc: 'High-performance cross-platform mobile applications for modern enterprises — built with Flutter and React Native, featuring real-time notifications, secure authentication, payment integration, GPS, and offline support.',
                outcomes: ['Cross-platform Android & iOS apps', 'Real-time sync & push notifications', 'Payment gateway & GPS integration'],
                href: '/projects/app-development',
              },
              {
                num: '06',
                client: 'Generative AI Solutions',
                tag: 'Artificial Intelligence',
                region: 'Global',
                desc: 'Custom Generative AI systems powered by GPT, Claude, and Gemini — delivering intelligent chatbots, content generation, enterprise search with RAG architecture, workflow automation, and sentiment analysis.',
                outcomes: ['AI chatbots & virtual assistants', 'RAG-powered enterprise search', 'Content generation at scale'],
                href: '/projects/generative-ai',
              },
              {
                num: '07',
                client: 'IoT Ecosystem',
                tag: 'Internet of Things',
                region: 'Global',
                desc: 'End-to-end IoT solutions connecting devices, sensors, and cloud platforms — enabling real-time monitoring dashboards, predictive maintenance, GPS asset tracking, and industrial automation across AWS IoT and Azure IoT Hub.',
                outcomes: ['Real-time device monitoring', 'Predictive maintenance AI', 'GPS asset tracking & automation'],
                href: '/projects/iot-solutions',
              },
              {
                num: '08',
                client: 'Cloud Infrastructure',
                tag: 'Cloud Solutions',
                region: 'Global',
                desc: 'Scalable multi-cloud infrastructure built on AWS, Azure, and GCP — with zero-downtime migration, auto-scaling, disaster recovery, Kubernetes orchestration, and 24/7 infrastructure monitoring.',
                outcomes: ['Zero-downtime cloud migration', 'Multi-cloud Kubernetes deployment', 'Auto-scaling & disaster recovery'],
                href: '/projects/cloud-solutions',
              },
              {
                num: '09',
                client: 'CRM Platform',
                tag: 'CRM Solutions',
                region: 'Global',
                desc: 'A centralized Customer Relationship Management platform with visual sales pipelines, lead automation, email integration, support ticketing, workflow automation, and real-time business intelligence dashboards.',
                outcomes: ['Visual sales pipeline management', 'Lead capture & workflow automation', 'Real-time analytics & reporting'],
                href: '/projects/crm-solutions',
              },
              {
                num: '10',
                client: 'QA Assurance',
                tag: 'Quality Assurance',
                region: 'Global',
                desc: 'Comprehensive end-to-end QA services covering functional, automation, performance, security, mobile, and cross-browser testing — integrated into CI/CD pipelines for continuous quality validation.',
                outcomes: ['Selenium & Cypress automation', 'Security & performance testing', 'CI/CD pipeline integration'],
                href: '/projects/quality-assurance',
              },
              {
                num: '11',
                client: 'Digital Marketing',
                tag: 'Marketing Strategy',
                region: 'Global',
                desc: 'Data-driven digital marketing strategies across SEO, PPC, social media, content, and email — with GA4 analytics, A/B testing, retargeting campaigns, and real-time ROI dashboards for measurable growth.',
                outcomes: ['SEO & PPC growth campaigns', 'Email automation & lead nurturing', 'GA4 analytics & ROI tracking'],
                href: '/projects/digital-marketing',
              },
            ].map((cs, i) => (
              <CaseStudyCard key={i} study={cs} />
            ))}
            {/* Filler — covers the empty 3rd cell in the last row (11 items → 1 leftover slot) */}
            <div style={{ background: '#080b14' }} />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: STATS STRIP ──────────────────────── */}
      <section className="proj-strip" style={{
        background: '#cdd4eb',
        padding: '0 60px',
      }}>
        <div className="proj-stats-grid" style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { num: '150+', label: 'Projects Delivered', sub: 'Across web, mobile, AI, cloud, enterprise, and emerging technologies' },
            { num: '50+', label: 'Active Engagements', sub: 'Ongoing digital transformation projects with global businesses' },
            { num: '11', label: 'Service Domains', sub: 'End-to-end expertise across every major technology vertical' },
            { num: '20+', label: 'Countries Reached', sub: 'Serving startups, enterprises, and growing organizations worldwide' },
          ].map((stat, i) => (
            <div key={i} className="proj-stats-cell" style={{
              padding: '56px 36px',
              borderLeft: i > 0 ? '1px solid rgba(13,15,26,0.12)' : 'none',
            }}>
              <div style={{
                fontSize: 'clamp(2rem, 3vw, 3rem)',
                fontWeight: 800,
                color: '#0d0f1a',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '10px',
              }}>{stat.num}</div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#0d0f1a',
                marginBottom: '10px',
              }}>{stat.label}</div>
              <div style={{
                fontSize: '11px',
                color: 'rgba(13,15,26,0.55)',
                lineHeight: 1.65,
              }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: HOW WE DELIVER ───────────────────── */}
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '80px',
          }}>
            <div>
              <SectionLabel text="Our Delivery Process" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                From the first conversation<br />to the final launch
              </h2>
            </div>
            <p className="proj-asym-right" style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              Every project at TRONEXA follows a structured and transparent delivery process. We keep clients
              informed and involved at every stage — ensuring the final product is exactly what was envisioned.
            </p>
          </div>

          <div className="proj-3col-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {DELIVERY_STEPS.map((step, i) => (
              <div key={i} className="proj-delivery-cell" style={{
                padding: '44px 36px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderLeft: i % 3 > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                background: 'transparent',
              }}>
                <div style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'rgba(205,212,235,0.12)',
                  lineHeight: 1,
                  marginBottom: '24px',
                  fontFamily: 'var(--font-geist-mono)',
                }}>{step.num}</div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#cdd4eb',
                  marginBottom: '14px',
                }}>{step.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.8,
                }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: TECH STACK ───────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <div>
              <SectionLabel text="Our Tech Stack" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Built with the best<br />technologies in the industry
              </h2>
            </div>
            <p className="proj-asym-right" style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              We choose the right technology for every project — not the most popular one. Our team has hands-on
              expertise across a wide range of modern frameworks, platforms, and tools.
            </p>
          </div>

          <div>
            {TECH_STACK.map((row, i) => (
              <div key={i} className="proj-tech-row" style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: '40px',
                alignItems: 'start',
                padding: '24px 0',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.35)',
                }}>{row.label}</div>
                <div style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.7,
                }}>{row.items}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: INDUSTRIES ───────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{
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
                Delivering technology<br />across every major sector
              </h2>
            </div>
            <p className="proj-asym-right" style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              Our projects span a wide range of industries. Whatever your sector, we bring relevant expertise,
              domain understanding, and technology solutions tailored to your specific environment.
            </p>
          </div>

          <div className="proj-industries-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {INDUSTRIES.map((industry, i) => (
              <div key={i} className="proj-industry-cell" style={{
                padding: '36px 28px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderLeft: i % 4 > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-geist-mono)',
                  marginBottom: '18px',
                }}>{industry.num}</div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'white',
                  marginBottom: '12px',
                }}>{industry.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.75,
                }}>{industry.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: TESTIMONIALS ─────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <SectionLabel text="What Clients Say" dark={false} />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              color: 'white',
              margin: '0 0 24px',
            }}>
              Trusted by businesses<br />around the world
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
              lineHeight: 1.8,
              maxWidth: '480px',
              margin: '0 auto',
            }}>
              We measure our success by the impact we create for the businesses we work with.
            </p>
          </div>

          <div className="proj-testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                padding: '52px 44px',
                background: '#080b14',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  fontSize: '28px',
                  color: 'rgba(205,212,235,0.25)',
                  lineHeight: 1,
                  marginBottom: '24px',
                  fontFamily: 'Georgia, serif',
                }}>&#8220;</div>
                <p style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.85,
                  margin: '0 0 32px',
                  fontStyle: 'italic',
                  flex: 1,
                }}>{t.quote.replace(/^"|"$/g, '')}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#cdd4eb',
                    marginBottom: '6px',
                  }}>{t.name}</div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.04em',
                  }}>{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: GLOBAL PRESENCE ──────────────────── */}
      <section className="proj-section-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="proj-asym-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <div>
              <SectionLabel text="Where We Work" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Delivering projects<br />from three global locations
              </h2>
            </div>
            <p className="proj-asym-right" style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              Our teams across USA, UAE, and India work in close collaboration to deliver projects efficiently
              across time zones — giving you round-the-clock support and global delivery capability.
            </p>
          </div>

          <div className="proj-locations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { country: 'USA', address: '8 The Green, Suite A\nDover, DE 19901, USA' },
              { country: 'UAE', address: 'Business Centre, 3rd Floor, Building A3\nBusiness Park, Dubai South\nDubai, United Arab Emirates' },
              { country: 'India', address: 'SP 365 Building, Janjeerwala Square\nopposite Hotel Apna Avenue\nIndore, 452001, MP' },
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

      {/* ── SECTION 10: CTA BANNER ──────────────────────── */}
      <section className="proj-section-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
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
            Have a project in mind?<br />Let us build it together.
          </h2>
          <p style={{
            color: 'rgba(13,15,26,0.6)',
            fontSize: '14px',
            lineHeight: 1.85,
            margin: '0 0 52px',
          }}>
            Tell us about your goals, challenges, and vision. Our team will define the right approach,
            technology, and timeline to bring your project to life.
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
              ⊞ Start a Project →
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
