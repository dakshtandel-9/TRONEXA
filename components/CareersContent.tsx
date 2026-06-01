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

const BENEFIT_CARDS = [
  {
    num: '01',
    title: 'Innovative Projects',
    desc: 'Work on cutting-edge technologies and impactful digital transformations for global clients across web, mobile, AI, cloud, IoT, and enterprise systems. Every project is an opportunity to solve real challenges and build something that matters.',
  },
  {
    num: '02',
    title: 'Growth-Driven Culture',
    desc: 'We invest in your professional development through continuous learning opportunities, mentorship, structured career paths, and meaningful challenges. At TRONEXA, your growth is not an afterthought — it is a core priority.',
  },
  {
    num: '03',
    title: 'Work-Life Balance',
    desc: 'Enjoy flexible working hours, hybrid work options, and a supportive environment that genuinely values your well-being. We believe that great work comes from people who feel respected, balanced, and energized.',
  },
  {
    num: '04',
    title: 'Collaborative Team',
    desc: 'Join a diverse, inclusive team of thinkers and creators who celebrate creativity, integrity, and teamwork. At TRONEXA, collaboration and mutual respect are not just values — they are how we work every single day.',
  },
];

const VALUES = [
  {
    num: '001',
    title: 'Purpose',
    desc: 'At TRONEXA, every solution begins with an idea and the ambition to create meaningful impact. Join us in building innovative digital experiences that transform businesses, solve complex challenges, and shape the future of technology.',
  },
  {
    num: '002',
    title: 'Growth',
    desc: 'We are committed to your professional growth. Through continuous learning, mentorship, and meaningful challenges, you will expand your skills, unlock new opportunities, and evolve alongside the technology we create.',
  },
  {
    num: '003',
    title: 'Teamwork',
    desc: 'We are a close-knit team of developers, designers, strategists, and innovators. At TRONEXA, collaboration, integrity, and mutual respect are at the heart of everything we build. No one succeeds alone here.',
  },
  {
    num: '004',
    title: 'Unity',
    desc: 'From engineers and designers to strategists and project leaders, every perspective matters here. We believe diverse ideas create stronger solutions, better experiences, and a culture where innovation truly thrives.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'My journey with TRONEXA began as a Software Developer, where I had the opportunity to work on challenging projects and grow alongside an exceptional team. Today, I am proud to lead initiatives that help businesses transform through technology. TRONEXA\'s culture of innovation, trust, and continuous learning has made this journey truly meaningful.',
    name: 'Aarav Mehta',
    role: 'Engineering Lead',
  },
  {
    quote: 'I joined TRONEXA as a UI/UX Designer and quickly discovered a culture that values creativity, collaboration, and growth. Working across diverse projects has strengthened both my technical and strategic skills, while the support from the team has helped me evolve into a confident design leader.',
    name: 'Priya Sharma',
    role: 'Senior Product Designer',
  },
  {
    quote: 'Over the years at TRONEXA, I have had the opportunity to contribute across multiple technology domains, work with incredible teams, and solve complex business challenges. The company\'s focus on innovation, flexibility, and professional growth has made this an inspiring place to build a long-term career.',
    name: 'Rahul Verma',
    role: 'Technology Consultant',
  },
];

const ROLE_CATEGORIES = [
  {
    title: 'Developers & Engineers',
    desc: 'Frontend, backend, full-stack, mobile, cloud, DevOps, and AI engineers with a passion for building scalable, high-performing systems.',
  },
  {
    title: 'Designers & Creatives',
    desc: 'UI/UX designers, product designers, graphic designers, and motion designers who put user experience at the center of every decision.',
  },
  {
    title: 'AI & Data Specialists',
    desc: 'Machine learning engineers, data scientists, NLP specialists, computer vision experts, and AI solution architects.',
  },
  {
    title: 'Cloud & Infrastructure Experts',
    desc: 'Cloud architects, DevOps engineers, system administrators, and infrastructure specialists across AWS, Azure, and Google Cloud.',
  },
  {
    title: 'Project & Product Managers',
    desc: 'Organized, client-focused professionals who can manage timelines, teams, and deliverables with clarity and confidence.',
  },
  {
    title: 'QA & Testing Engineers',
    desc: 'Detail-oriented quality assurance engineers skilled in manual testing, automation, performance testing, and security validation.',
  },
  {
    title: 'Digital Marketing Specialists',
    desc: 'SEO experts, performance marketers, content strategists, social media managers, and paid advertising professionals.',
  },
  {
    title: 'Business Development & Strategy',
    desc: 'Sales professionals, account managers, business analysts, and client relationship specialists who can drive growth and build partnerships.',
  },
];

const OPEN_POSITIONS = [
  { num: '01', title: 'Frontend Developer', dept: 'Engineering', location: 'Indore, India / Remote', type: 'Full-Time', desc: 'Build responsive, high-performance user interfaces for web and SaaS applications using React.js, Next.js, and Tailwind CSS. Work closely with designers and backend engineers.' },
  { num: '02', title: 'Backend Developer', dept: 'Engineering', location: 'Indore, India / Remote', type: 'Full-Time', desc: 'Develop scalable server-side systems, APIs, databases, and business logic for web and mobile applications using Node.js, Express.js, and MongoDB.' },
  { num: '03', title: 'Mobile App Developer', dept: 'Engineering', location: 'Indore, India / Remote', type: 'Full-Time', desc: 'Build cross-platform mobile applications for Android and iOS using React Native or Flutter. Focus on performance, user experience, and seamless functionality.' },
  { num: '04', title: 'UI/UX Designer', dept: 'Design', location: 'Indore, India / Remote', type: 'Full-Time', desc: 'Design user-centric interfaces, wireframes, prototypes, and visual assets for web, mobile, and enterprise applications. Strong portfolio in product design required.' },
  { num: '05', title: 'AI / Machine Learning Engineer', dept: 'Artificial Intelligence', location: 'Indore, India / Remote', type: 'Full-Time', desc: 'Develop and deploy AI models, machine learning systems, NLP pipelines, and intelligent automation solutions for client projects across multiple industries.' },
  { num: '06', title: 'Cloud Engineer', dept: 'Cloud & Infrastructure', location: 'Indore, India / Dubai, UAE / Remote', type: 'Full-Time', desc: 'Design, deploy, and manage cloud infrastructure across AWS, Azure, and GCP. Experience with Docker, Kubernetes, and CI/CD pipelines is essential.' },
  { num: '07', title: 'QA Engineer', dept: 'Quality Assurance', location: 'Indore, India / Remote', type: 'Full-Time', desc: 'Execute manual and automation testing for web, mobile, and enterprise applications. Ensure product quality through functional, performance, and security testing.' },
  { num: '08', title: 'Digital Marketing Specialist', dept: 'Marketing', location: 'Indore, India / Remote', type: 'Full-Time', desc: 'Plan and execute SEO, paid advertising, social media, and content marketing campaigns for TRONEXA and client projects. Data-driven approach required.' },
  { num: '09', title: 'Project Manager', dept: 'Delivery & Operations', location: 'Indore, India / Dubai, UAE', type: 'Full-Time', desc: 'Manage end-to-end project delivery for technology projects — coordinating between clients, designers, developers, and QA teams to ensure timely, on-budget delivery.' },
  { num: '10', title: 'Business Development Executive', dept: 'Sales & Growth', location: 'Dubai, UAE / USA / Remote', type: 'Full-Time', desc: 'Identify and pursue new business opportunities, build client relationships, manage the sales pipeline, and represent TRONEXA\'s services to prospects globally.' },
];

const HIRING_STEPS = [
  { num: '01', title: 'Apply', desc: 'Submit your application through the open position listing or send a general application to info@tronexa.com with your resume and a short note about yourself.' },
  { num: '02', title: 'Initial Review', desc: 'Our HR team reviews every application carefully. If your profile matches our requirements, we will reach out within 5–7 business days to schedule an initial call.' },
  { num: '03', title: 'Introductory Call', desc: 'A short 20–30 minute conversation with our HR team to understand your background, experience, goals, and fit with TRONEXA\'s culture and values.' },
  { num: '04', title: 'Technical / Skill Assessment', desc: 'Depending on the role, you may be asked to complete a practical assessment, portfolio review, or technical interview to evaluate your core skills.' },
  { num: '05', title: 'Final Interview & Offer', desc: 'A final conversation with the relevant team lead or senior manager. If all goes well, we will extend a formal offer and welcome you to the TRONEXA team.' },
];

function PositionCard({ pos }: { pos: typeof OPEN_POSITIONS[0] }) {
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
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', fontFamily: 'var(--font-geist-mono)' }}>{pos.num}</span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#cdd4eb', border: '1px solid rgba(205,212,235,0.35)', padding: '4px 10px', fontWeight: 600 }}>{pos.dept}</span>
          <span style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)', padding: '4px 10px' }}>{pos.type}</span>
        </div>
      </div>

      <div style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'white', marginBottom: '10px' }}>
        {pos.title}
      </div>

      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: '18px' }}>
        ◎ {pos.location}
      </div>

      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: '0 0 28px', flex: 1 }}>
        {pos.desc}
      </p>

      <a
        href={`mailto:info@tronexa.com?subject=Application — ${pos.title}`}
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
        Apply Now →
      </a>
    </div>
  );
}

export default function CareersContent() {
  const { setIsLoaded } = useLoadingContext();

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

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
          <SectionLabel text="Join Our Team" />

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 32px',
          }}>
            Build the future of technology<br />with TRONEXA
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '15px',
            lineHeight: 1.8,
            maxWidth: '660px',
            margin: '0 auto 52px',
          }}>
            At TRONEXA, we transform complex challenges into intelligent digital solutions that shape the future
            of business. We believe exceptional technology begins with exceptional people. If you are driven by
            innovation, creativity, and continuous growth — this is where your ideas can make a real impact.
          </p>

          <a
            href="#open-positions"
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
            View Open Positions →
          </a>
        </div>
      </section>

      {/* ── SECTION 2: STATS BAR ────────────────────────── */}
      <section style={{ background: '#cdd4eb', padding: '0 60px' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { num: '2018', label: 'Founded' },
            { num: '150+', label: 'Team Members' },
            { num: '11', label: 'Service Domains' },
            { num: '20+', label: 'Countries Reached' },
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
                color: 'rgba(13,15,26,0.55)',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: WHY WORK WITH US ─────────────────── */}
      <section style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '80px',
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
                More than a job —<br />a place to grow and create
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              We are not just a technology company. We are developers, designers, engineers, strategists, AI
              specialists, cloud architects, and innovators — all coming together to shape the future of digital
              transformation. At TRONEXA, your work matters, your growth is invested in, and your ideas have
              the space to become reality.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
            {BENEFIT_CARDS.map((card, i) => (
              <div key={i} style={{
                padding: '52px 44px',
                background: '#080b14',
                clipPath: i === 0 ? CLIP_LG : 'none',
              }}>
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-geist-mono)',
                  marginBottom: '24px',
                }}>{card.num}</div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#cdd4eb',
                  marginBottom: '18px',
                }}>{card.title}</div>
                <p style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.8,
                  margin: 0,
                }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: OUR VALUES ───────────────────────── */}
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
              <SectionLabel text="What We Stand For" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                A culture built on purpose,<br />growth, teamwork, and unity
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              TRONEXA is guided by values of innovation, transparency, excellence, and collective growth. These
              are not words on a wall — they are the principles that shape how we hire, work, collaborate, and deliver.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{
                padding: '44px 32px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{
                  fontSize: 'clamp(1.6rem, 2.2vw, 2.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'rgba(205,212,235,0.12)',
                  lineHeight: 1,
                  marginBottom: '24px',
                  fontFamily: 'var(--font-geist-mono)',
                }}>{v.num}</div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#cdd4eb',
                  marginBottom: '16px',
                }}>{v.title}</div>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.8,
                  margin: 0,
                }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: VISION & IMPACT ──────────────────── */}
      <section style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '72px' }}>
            <SectionLabel text="Our Vision" />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              color: 'white',
              margin: 0,
            }}>
              Talented people shaping<br />the digital future
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.07)' }}>
            <div style={{ padding: '52px 44px', background: '#080b14', clipPath: CLIP_LG }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#cdd4eb',
                marginBottom: '28px',
              }}>Vision</div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, margin: '0 0 24px' }}>
                At TRONEXA, talented engineers, designers, developers, and digital innovators are shaping the
                future of technology. Together, they transform ambitious ideas into intelligent digital solutions
                — building scalable platforms, redefining business experiences, and setting new benchmarks for innovation.
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, margin: 0 }}>
                At TRONEXA, our people are more than technology professionals. They are creators, problem-solvers,
                and visionaries driven by collaboration, purpose, and excellence. Their expertise shapes not only
                the solutions we build, but the digital future we help businesses achieve.
              </p>
            </div>
            <div style={{ padding: '52px 44px', background: '#080b14' }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#cdd4eb',
                marginBottom: '28px',
              }}>Impact</div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, margin: '0 0 24px' }}>
                What we create is more than technology — it is the foundation for growth, transformation, and
                lasting business success. Every solution we build has the power to improve experiences, streamline
                operations, and unlock new opportunities.
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, margin: 0 }}>
                At TRONEXA, impact is measured by the businesses we empower, the efficiencies we create, and the
                innovation we accelerate. Our work helps organizations connect, scale, and evolve in a fast-changing
                digital world — creating value that endures well beyond implementation. This is more than technology.
                It is a commitment to progress and possibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: WHAT WE DELIVER ──────────────────── */}
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
              <SectionLabel text="What TRONEXA Delivers" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                We do not just develop projects.<br />We deliver trust, future,<br />and experience.
              </h2>
            </div>
            <div style={{ paddingTop: '66px', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                {
                  word: 'TRUST',
                  desc: 'Every client relationship, every team interaction, and every line of code we write is grounded in trust. We are transparent, accountable, and consistent — because great technology is built on great relationships.',
                },
                {
                  word: 'FUTURE',
                  desc: 'We do not build for today. We build for what comes next. Our solutions are designed to scale, adapt, and remain relevant as technology and business landscapes evolve.',
                },
                {
                  word: 'EXPERIENCE',
                  desc: 'From the client experience to the user experience to the employee experience — everything we create is shaped by a deep commitment to making interactions seamless, meaningful, and valuable.',
                },
              ].map((pillar, i) => (
                <div key={i} style={{
                  padding: '36px 0',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: '40px',
                  alignItems: 'start',
                }}>
                  <div style={{
                    fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'rgba(205,212,235,0.9)',
                  }}>{pillar.word}</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: TESTIMONIALS ─────────────────────── */}
      <section style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <SectionLabel text="Life at TRONEXA" />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              color: 'white',
              margin: '0 0 24px',
            }}>
              Hear from the people<br />who build with us every day
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
              lineHeight: 1.8,
              maxWidth: '480px',
              margin: '0 auto',
            }}>
              Do not take our word for it. Here is what the people who work at TRONEXA have to say about their
              journey, growth, and experience at our company.
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
                }}>{t.quote}</p>
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
                  }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: WHO WE HIRE ──────────────────────── */}
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
              <SectionLabel text="Who We Hire" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                We are always looking for<br />exceptional people to join<br />our team
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              Whether you are a developer, designer, strategist, cloud specialist, AI engineer, QA analyst, project
              manager, or someone passionate about building impactful digital solutions — we are always looking for
              talented individuals who bring energy, expertise, and a growth mindset.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {ROLE_CATEGORIES.map((role, i) => (
              <div key={i} style={{
                padding: '36px 28px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderLeft: i % 4 > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'white',
                  marginBottom: '14px',
                }}>{role.title}</div>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.75,
                  margin: 0,
                }}>{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: OPEN POSITIONS ───────────────────── */}
      <section id="open-positions" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 0 52px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '0',
          }}>
            <div>
              <SectionLabel text="Open Positions" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Join TRONEXA and shape<br />the future of technology with us
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
              We are currently hiring across multiple roles and departments. Browse our open positions and apply
              for the role that matches your skills and ambitions.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
          }}>
            {OPEN_POSITIONS.map(pos => (
              <PositionCard key={pos.num} pos={pos} />
            ))}
          </div>

          {/* General application */}
          <div style={{
            marginTop: '1px',
            padding: '52px 44px',
            background: 'rgba(205,212,235,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'white', marginBottom: '10px' }}>
                Don&apos;t see your role listed?
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, maxWidth: '560px' }}>
                We are always open to hearing from exceptional talent. Send us your resume and tell us how you
                can contribute to TRONEXA&apos;s mission.
              </p>
            </div>
            <a
              href="mailto:info@tronexa.com?subject=General Application — TRONEXA"
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
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#cdd4eb'; }}
            >
              Send a General Application →
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: APPLICATION PROCESS ─────────────── */}
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
              <SectionLabel text="How to Apply" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                A simple, transparent<br />hiring process
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              We respect your time. Our hiring process is straightforward, respectful, and designed to help us
              understand each other — so both you and TRONEXA can make the right decision.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {HIRING_STEPS.map((step, i) => (
              <div key={i} style={{
                padding: '44px 28px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
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
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#cdd4eb',
                  marginBottom: '14px',
                }}>{step.title}</div>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.8,
                  margin: 0,
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 11: ABOUT TRONEXA ───────────────────── */}
      <section style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '100px', alignItems: 'start' }}>
            <div>
              <SectionLabel text="About TRONEXA" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: '0 0 52px',
              }}>
                Shape the future.<br />Trusted as a technology partner<br />for digital transformation.
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { stat: '2018', label: 'Founded' },
                  { stat: 'Digital Innovation', label: 'Expertise' },
                  { stat: '150+', label: 'Professionals' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    padding: '20px 0',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.3)',
                    }}>{item.label}</div>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#cdd4eb',
                    }}>{item.stat}</div>
                  </div>
                ))}
              </div>

              <a
                href="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid rgba(205,212,235,0.35)',
                  color: '#cdd4eb',
                  padding: '14px 30px',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                  marginTop: '40px',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#cdd4eb'; el.style.color = '#0d0f1a'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#cdd4eb'; }}
              >
                Learn More About Us →
              </a>
            </div>

            <div style={{ paddingTop: '66px' }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, margin: '0 0 24px' }}>
                For years, TRONEXA has been delivering innovative digital solutions that help businesses evolve,
                scale, and succeed in a rapidly changing technology landscape. From strategy and design to
                development and deployment, we create impactful solutions across every stage of digital transformation.
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, margin: 0 }}>
                TRONEXA is a technology-driven company delivering innovative digital solutions across web, mobile,
                AI, cloud, enterprise systems, automation, SaaS platforms, and emerging technologies. Driven by
                innovation, trust, and performance, our vision is to empower businesses with intelligent solutions
                that create lasting value, accelerate transformation, and shape the future of digital excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 12: CTA BANNER ──────────────────────── */}
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
            Ready to build the future<br />of technology with us?
          </h2>
          <p style={{
            color: 'rgba(13,15,26,0.6)',
            fontSize: '14px',
            lineHeight: 1.85,
            margin: '0 0 52px',
          }}>
            Explore our open positions, send us your profile, or simply reach out to start a conversation.
            We would love to hear from you.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#open-positions"
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
              View Open Positions →
            </a>
            <a
              href="/contact"
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
              Contact Us →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
