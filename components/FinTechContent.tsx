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
  'Limited access to convenient digital financial services in underserved regions, restricting financial participation and digital adoption',
  'Complex transaction processes and fragmented payment systems leading to poor user experiences and low platform retention',
  'Security concerns surrounding financial data and digital payments creating distrust in digital financial services',
  'Lack of real-time synchronization between financial platforms and user accounts causing transaction delays and errors',
  'Difficulty integrating multiple payment channels — cards, bank accounts, and digital wallets — into a unified ecosystem',
];

const SOLUTIONS = [
  'Developed a secure digital wallet for centralized fund management and instant transaction processing',
  'Enabled peer-to-peer (P2P) transfers with real-time processing and immediate balance confirmation',
  'Integrated multiple payment methods including debit/credit cards, bank accounts, and digital wallets into one platform',
  'Implemented advanced security protocols — end-to-end encryption, tokenization, MFA, and PCI-DSS compliance frameworks',
  'Built scalable cloud infrastructure on AWS capable of supporting high transaction volumes with 99.99% uptime',
];

const FEATURES = [
  { title: 'Digital Wallet Management', desc: 'Secure storage and management of funds through a centralized wallet system with real-time balance tracking' },
  { title: 'Peer-to-Peer Transfers', desc: 'Instant transfers between users using mobile numbers or account identifiers with immediate confirmation' },
  { title: 'Multi-Payment Integration', desc: 'Support for debit cards, credit cards, bank accounts, and digital payment methods in one unified interface' },
  { title: 'Real-Time Processing', desc: 'Immediate payment confirmation and balance updates across all connected accounts and devices' },
  { title: 'Multi-Currency Support', desc: 'Seamless handling of local and international transactions with live exchange rate management' },
  { title: 'Smart Notifications', desc: 'Instant alerts for transactions, account activity, and security events via push, SMS, and email' },
  { title: 'Transaction History', desc: 'Detailed financial records, categorized spending insights, and downloadable statements and reports' },
  { title: 'Bill Payments & Utilities', desc: 'Convenient payment of recurring bills, utility services, and subscription charges from a single screen' },
  { title: 'QR Code Payments', desc: 'Contactless payment capabilities for merchants and consumers — scan, confirm, and pay in seconds' },
  { title: 'User Verification & KYC', desc: 'Secure identity verification and compliance processes ensuring regulatory alignment and fraud prevention' },
  { title: 'Fraud Detection & Risk Monitoring', desc: 'AI-powered monitoring of suspicious activities and transactions with automated risk scoring and alerts' },
  { title: 'Role-Based Admin Dashboard', desc: 'Complete operational control, user management, transaction oversight, and compliance reporting capabilities' },
  { title: 'Loyalty & Rewards Programs', desc: 'Incentive systems designed to encourage platform engagement, repeat transactions, and user retention' },
  { title: 'Multi-Language Support', desc: 'Localized interfaces for diverse user communities — supporting accessibility across regions and languages' },
  { title: 'Mobile & Web Accessibility', desc: 'Seamless user experience across smartphones, tablets, and desktops with a consistent, responsive interface' },
];

const TECH_STACK = [
  { label: 'Platform', value: 'FinTech Mobile & Web Application' },
  { label: 'Frontend', value: 'Flutter, React.js, Next.js' },
  { label: 'Backend', value: 'Node.js, Express.js, NestJS' },
  { label: 'Database', value: 'PostgreSQL, MongoDB, Redis' },
  { label: 'Payment Processing', value: 'Stripe, Razorpay, PayPal, Banking APIs' },
  { label: 'Authentication', value: 'OAuth 2.0, JWT, Multi-Factor Authentication (MFA)' },
  { label: 'Security', value: 'End-to-End Encryption, Tokenization, PCI-DSS Compliance' },
  { label: 'API Integrations', value: 'Open Banking APIs, Financial Service APIs, Third-Party Payment Gateways' },
  { label: 'Analytics', value: 'Google Analytics, Power BI, Custom Financial Dashboards' },
  { label: 'Cloud Infrastructure', value: 'AWS, Microsoft Azure, Google Cloud Platform' },
  { label: 'DevOps', value: 'Docker, Kubernetes, CI/CD Pipelines' },
  { label: 'CDN', value: 'Cloudflare, AWS CloudFront' },
];

const HOSTING = [
  { label: 'Primary Hosting', value: 'AWS Cloud Hosting Infrastructure' },
  { label: 'Architecture', value: 'Multi-Region Deployment for High Availability' },
  { label: 'Scaling', value: 'Auto-Scaling Transaction Processing Servers' },
  { label: 'Security', value: 'DDoS Protection & Network Security Controls' },
  { label: 'Data', value: 'Encrypted Database Hosting with Real-Time Backup' },
  { label: 'Monitoring', value: '24/7 Infrastructure Monitoring & Support' },
];

const TEAM = [
  { role: 'FinTech Solution Architects', desc: 'Platform strategy, financial workflow design, and regulatory compliance planning' },
  { role: 'UI/UX Designers', desc: 'Accessibility-focused design, intuitive financial interfaces, and user journey optimization' },
  { role: 'Backend & Mobile Developers', desc: 'Secure transaction processing, API integrations, and cross-platform development' },
  { role: 'QA Engineers', desc: 'Performance, security, compliance, and load testing across all platform components' },
  { role: 'DevOps & Security Specialists', desc: 'Infrastructure management, CI/CD pipeline setup, and continuous threat protection' },
  { role: 'Compliance Experts', desc: 'Regulatory alignment, KYC/AML framework implementation, and financial audit support' },
];

const MAINTENANCE = [
  'Continuous security monitoring and proactive threat detection across all platform components',
  'Transaction performance optimization and infrastructure scaling to support growing user volumes',
  'Compliance updates and regulatory framework enhancements aligned with evolving financial regulations',
  'Fraud prevention improvements and AI risk model retraining based on emerging transaction patterns',
  'Feature upgrades and UX improvements informed by user feedback, analytics insights, and market trends',
];

export default function FinTechContent() {
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
          <SectionLabel text="Case Study — FinTech" />
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 24px',
          }}>
            FinTech Platform
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
            lineHeight: 1.75,
            maxWidth: '680px',
            margin: '0 auto 48px',
          }}>
            Revolutionizing digital financial services — how Tronexa built a secure and scalable
            financial ecosystem for modern transactions and greater financial accessibility.
          </p>
          <div className="tt-hero-tags" style={{ display: 'flex', justifyContent: 'center', gap: '0', flexWrap: 'wrap' }}>
            {[
              { label: 'Category', value: 'FinTech' },
              { label: 'Type', value: 'Web & Mobile' },
              { label: 'Stack', value: 'Flutter · React · Node.js' },
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
                A next-generation financial ecosystem for digital-first users
              </h2>
            </div>
            <div className="proj-asym-right" style={{ paddingTop: '60px' }}>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.85, margin: '0 0 20px' }}>
                As digital transformation continues to reshape the global financial landscape, businesses and consumers
                increasingly demand faster, more secure, and accessible financial services. Traditional banking systems
                often struggle to meet the expectations of modern users, particularly in regions where access to
                financial infrastructure remains limited.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.85, margin: 0 }}>
                Tronexa was commissioned to develop a next-generation FinTech platform designed to simplify digital
                transactions, improve financial accessibility, and create a seamless payment ecosystem for individuals
                and businesses alike. By combining innovative technology, robust security frameworks, and customer-centric
                design, Tronexa delivered a financial solution that empowers users to manage, transfer, and access funds
                with confidence.
              </p>
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
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12,
                textTransform: 'uppercase', color: 'white', margin: 0,
              }}>
                The challenges holding back digital finance
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              The rapid growth of digital commerce and mobile transactions has created a demand for more accessible,
              efficient, and secure financial solutions. However, many organizations and end-users continue to face
              challenges with fragmented payment systems and limited financial accessibility.
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
                How Tronexa engineered the platform
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa designed and developed a comprehensive FinTech platform that streamlined financial transactions
              while maintaining the highest standards of security, accessibility, and performance — empowering users with
              seamless access to financial services and providing businesses with a reliable, future-ready payment ecosystem.
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
              Everything built into the platform
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
              A comprehensive suite of financial capabilities designed for users, merchants, and administrators alike.
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
                Built with a modern,<br />security-first stack
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa leveraged a modern financial technology stack to build a secure, scalable, and high-performance
              platform — combining best-in-class payment processing, cloud infrastructure, and compliance frameworks.
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
                Enterprise-grade,<br />always-on infrastructure
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(13,15,26,0.6)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              To ensure reliability, security, and uninterrupted financial operations, Tronexa deployed the platform using
              enterprise-grade cloud infrastructure with multi-region redundancy and 24/7 monitoring.
            </p>
          </div>
          <div className="tt-hosting-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {HOSTING.map((item, i) => (
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
                A dedicated FinTech<br />specialist team
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Tronexa assembled a multidisciplinary team of FinTech specialists, engineers, designers, and compliance
              experts to ensure successful platform delivery. Our team worked closely with stakeholders throughout the
              project lifecycle, ensuring regulatory alignment, operational efficiency, and continuous platform enhancement.
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
                Ongoing optimization as<br />the platform scales
              </h2>
            </div>
            <p className="proj-asym-right" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.85, margin: 0, paddingTop: '60px' }}>
              Following launch, Tronexa established an ongoing maintenance and optimization program to ensure long-term
              platform success — continuously evaluating user feedback, analytics insights, and market trends to introduce
              new capabilities and improve overall performance.
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
            A future-ready financial<br />ecosystem built for growth
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.9, margin: '0 0 24px' }}>
            Tronexa successfully delivered a modern FinTech platform that transformed how users access and manage
            financial services in a digital-first world. By combining secure payment infrastructure, intuitive user
            experiences, and scalable cloud technologies, the solution simplified financial transactions while promoting
            greater accessibility and trust.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.9, margin: '0 0 56px' }}>
            The platform enabled faster payments, enhanced financial inclusion, improved customer engagement, and created
            new opportunities for digital commerce. Through strategic planning, robust engineering, and continuous
            enhancement, Tronexa helped establish a future-ready financial ecosystem capable of supporting sustainable
            growth and evolving customer needs.
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
