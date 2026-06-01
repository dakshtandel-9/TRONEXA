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

const CATEGORIES = [
  'All Projects', 'Web Development', 'App Development', 'Game Development',
  'AI Solutions', 'IoT Solutions', 'Cloud Solutions', 'CRM Solutions',
  'ServiceNow', 'Quality Assurance', 'Digital Marketing', 'Staffing',
];

const REGIONS = ['All Regions', 'USA', 'Dubai / UAE', 'India'];

const PROJECTS = [
  {
    num: '01',
    category: 'Web Development',
    region: 'USA',
    description: 'A scalable, high-performance web platform built for a US-based business to improve their digital presence, streamline operations, and drive customer engagement.',
    outcomes: ['Increased online traffic by 3×', 'Improved user experience scores', 'Faster load performance'],
  },
  {
    num: '02',
    category: 'App Development',
    region: 'USA',
    description: 'A cross-platform mobile application designed to connect users with services in real time, with a clean interface, secure backend, and seamless performance.',
    outcomes: ['Improved customer retention', 'Higher app store ratings', 'Increased daily active users'],
  },
  {
    num: '03',
    category: 'AI Solutions',
    region: 'USA',
    description: 'An AI-powered automation system built to reduce manual effort, improve decision-making accuracy, and streamline business operations for a growing enterprise.',
    outcomes: ['Reduced operational costs', 'Faster processing time', 'Improved data accuracy'],
  },
  {
    num: '04',
    category: 'Digital Marketing',
    region: 'USA',
    description: 'A data-driven digital marketing campaign including SEO, paid advertising, and content strategy designed to grow brand visibility and generate qualified leads.',
    outcomes: ['Increased organic traffic', 'Higher conversion rates', 'Improved ROI on ad spend'],
  },
  {
    num: '05',
    category: 'Web Development',
    region: 'Dubai / UAE',
    description: 'A modern, responsive corporate website built for a Dubai-based organization, focused on brand authority, digital presence, and lead generation.',
    outcomes: ['Stronger brand identity online', 'Increased inquiries', 'Improved search visibility'],
  },
  {
    num: '06',
    category: 'Cloud Solutions',
    region: 'Dubai / UAE',
    description: 'A cloud migration and infrastructure management project that moved a UAE enterprise from legacy systems to a secure, scalable cloud environment.',
    outcomes: ['Reduced infrastructure costs', 'Improved system reliability', 'Better data accessibility'],
  },
  {
    num: '07',
    category: 'CRM Solutions',
    region: 'Dubai / UAE',
    description: 'A customized CRM platform built for a growing UAE business to centralize customer data, automate sales workflows, and improve team productivity.',
    outcomes: ['Improved sales pipeline visibility', 'Faster lead response times', 'Increased customer satisfaction'],
  },
  {
    num: '08',
    category: 'ServiceNow',
    region: 'Dubai / UAE',
    description: 'A ServiceNow implementation project that streamlined IT service management and automated enterprise workflows for a large UAE-based organization.',
    outcomes: ['Reduced IT ticket resolution time', 'Improved workflow efficiency', 'Stronger operational visibility'],
  },
  {
    num: '09',
    category: 'App Development',
    region: 'India',
    description: 'A feature-rich mobile application developed for an Indian startup, designed to deliver seamless on-demand services with real-time tracking and secure payments.',
    outcomes: ['Successful product launch', 'Strong user adoption', 'High app store ratings'],
  },
  {
    num: '10',
    category: 'Game Development',
    region: 'India',
    description: 'An immersive mobile game developed for an Indian gaming studio, combining engaging gameplay mechanics, 2D visuals, and cross-platform compatibility.',
    outcomes: ['Strong user engagement', 'Positive player reviews', 'Monetization integration delivered'],
  },
  {
    num: '11',
    category: 'Quality Assurance',
    region: 'India',
    description: 'A comprehensive QA and testing engagement for a SaaS platform, covering manual testing, automation testing, performance testing, and security validation.',
    outcomes: ['Significant reduction in post-launch bugs', 'Faster release cycles', 'Improved platform stability'],
  },
  {
    num: '12',
    category: 'IoT Solutions',
    region: 'India',
    description: 'A smart IoT system built for an Indian manufacturing business, connecting devices and enabling real-time monitoring and predictive maintenance capabilities.',
    outcomes: ['Reduced downtime', 'Improved operational efficiency', 'Actionable real-time data insights'],
  },
];

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

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '40px 36px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: hovered ? 'rgba(205,212,235,0.04)' : 'transparent',
        transition: 'background 0.3s',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <span style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.2em',
          fontFamily: 'var(--font-geist-mono)',
        }}>{project.num}</span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#cdd4eb',
            border: '1px solid rgba(205,212,235,0.35)',
            padding: '4px 10px',
            fontWeight: 600,
          }}>{project.category}</span>
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '4px 10px',
          }}>{project.region}</span>
        </div>
      </div>

      <div style={{
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'white',
        marginBottom: '14px',
      }}>
        Client Project — To Be Named
      </div>

      <p style={{
        fontSize: '12px',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.8,
        margin: '0 0 20px',
        flex: 1,
      }}>{project.description}</p>

      <div style={{ marginBottom: '24px' }}>
        {project.outcomes.map((o, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 0',
            borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <span style={{ fontSize: '8px', color: '#cdd4eb' }}>▸</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>{o}</span>
          </div>
        ))}
      </div>

      <a
        href="#"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '10px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#cdd4eb',
          textDecoration: 'none',
          fontWeight: 600,
          transition: 'opacity 0.2s',
          opacity: hovered ? 1 : 0.6,
        }}
      >
        View Case Study →
      </a>
    </div>
  );
}

export default function ProjectsContent() {
  const { setIsLoaded } = useLoadingContext();
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [activeRegion, setActiveRegion] = useState('All Regions');

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  const filtered = PROJECTS.filter(p => {
    const catMatch = activeCategory === 'All Projects' || p.category === activeCategory;
    const regionMatch = activeRegion === 'All Regions' || p.region === activeRegion;
    return catMatch && regionMatch;
  });

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── SECTION 1: HERO ─────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        background: '#0d0f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 60px 100px',
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
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

          <div style={{
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
              <div key={i} style={{
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

      {/* ── SECTION 2: FILTER BAR ───────────────────────── */}
      <section style={{ background: '#080b14', padding: '100px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '64px',
          }}>
            <div>
              <SectionLabel text="Browse by Category" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Explore projects across<br />every technology domain
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              We have delivered digital solutions across 11 service domains and multiple industries worldwide.
              Use the filters below to explore our work by category.
            </p>
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '9px 18px',
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeCategory === cat ? '#cdd4eb' : 'rgba(255,255,255,0.06)',
                  color: activeCategory === cat ? '#0d0f1a' : 'rgba(255,255,255,0.5)',
                  transition: 'background 0.2s, color 0.2s',
                  clipPath: activeCategory === cat ? CLIP : 'none',
                }}
                onMouseEnter={e => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                  }
                }}
                onMouseLeave={e => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Region filters */}
          <div style={{
            display: 'flex',
            gap: '1px',
            background: 'rgba(255,255,255,0.08)',
            width: 'fit-content',
          }}>
            {REGIONS.map(region => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                style={{
                  padding: '10px 22px',
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: activeRegion === region ? 'rgba(205,212,235,0.15)' : 'rgba(8,11,20,1)',
                  color: activeRegion === region ? '#cdd4eb' : 'rgba(255,255,255,0.35)',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  if (activeRegion !== region) {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                  }
                }}
                onMouseLeave={e => {
                  if (activeRegion !== region) {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)';
                  }
                }}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: FEATURED PROJECTS ────────────────── */}
      <section style={{ background: '#0d0f1a', padding: '0 60px 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '52px 0 48px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '0',
          }}>
            <div>
              <SectionLabel text="Featured Work" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Projects we are<br />most proud of
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '13px',
              lineHeight: 1.8,
              maxWidth: '340px',
              margin: 0,
              textAlign: 'right',
            }}>
              These are some of our standout projects — each one representing a unique challenge, a tailored
              solution, and a meaningful outcome.
            </p>
          </div>

          {filtered.length === 0 ? (
            <div style={{
              padding: '80px 0',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.25)',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              No projects match the selected filters
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'rgba(255,255,255,0.06)',
            }}>
              {filtered.map(project => (
                <ProjectCard key={project.num} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 4: STATS STRIP ──────────────────────── */}
      <section style={{
        background: '#cdd4eb',
        padding: '0 60px',
      }}>
        <div style={{
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
            <div key={i} style={{
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
      <section style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
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
            <p style={{
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {DELIVERY_STEPS.map((step, i) => (
              <div key={i} style={{
                padding: '44px 36px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderLeft: i % 3 > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                clipPath: i === 0 ? CLIP_LG : 'none',
                background: i === 0 ? 'rgba(205,212,235,0.04)' : 'transparent',
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
      <section style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
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
            <p style={{
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
              <div key={i} style={{
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
      <section style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
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
            <p style={{
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {INDUSTRIES.map((industry, i) => (
              <div key={i} style={{
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
      <section style={{ background: '#080b14', padding: '120px 60px' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                padding: '52px 44px',
                background: '#080b14',
                clipPath: i === 0 ? CLIP_LG : 'none',
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
      <section style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
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
            <p style={{
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { country: 'USA', address: '8 The Green, Suite A\nDover, DE 19901, USA' },
              { country: 'UAE', address: 'Business Centre, 3rd Floor, Building A3\nBusiness Park, Dubai South\nDubai, United Arab Emirates' },
              { country: 'India', address: '808, 8th Floor, Skye Corporate Park\nAB Road, Indore 452010, India' },
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
      <section style={{ background: '#cdd4eb', padding: '120px 60px' }}>
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
