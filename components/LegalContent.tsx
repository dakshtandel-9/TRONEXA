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

const PRIVACY_SECTIONS = [
  {
    num: '01',
    title: 'Information We Collect',
    body: 'We collect information that you provide directly to us, such as your name, email address, phone number, and company details when you fill out contact forms or apply for jobs. We also automatically collect certain technical data, including your IP address, browser type, and browsing patterns via cookies to improve your user experience.',
  },
  {
    num: '02',
    title: 'How We Use Your Information',
    body: 'We use the collected data to deliver and improve our services, respond to your inquiries, process job applications, and send administrative or promotional communications. We do not sell or rent your personal information to third parties.',
  },
  {
    num: '03',
    title: 'Data Security and Sharing',
    body: 'We implement industry-standard security measures to prevent unauthorized access, disclosure, or alteration of your data. We only share your information with trusted third-party service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.',
  },
  {
    num: '04',
    title: 'Your Rights',
    body: 'Depending on your location, you have the right to access, correct, or delete your personal data. You can also opt-out of receiving marketing emails at any time by clicking the "unsubscribe" link in our emails.',
  },
  {
    num: '05',
    title: 'Contact Us',
    body: 'If you have any questions about this Privacy Policy, please contact us at info@tronexa.com. Our team will respond to your inquiry within 5–7 business days.',
  },
];

const TERMS_SECTIONS = [
  {
    num: '01',
    title: 'Intellectual Property Rights',
    body: 'All content, logos, graphics, text, and software on this website are the intellectual property of Tronexa or its licensors. You may not reproduce, distribute, or modify any material from this site without our prior written consent.',
  },
  {
    num: '02',
    title: 'User Conduct',
    body: 'You agree to use our website only for lawful purposes. You are strictly prohibited from using the site to transmit harmful code, disrupt website security, or submit false or misleading information through our communication channels.',
  },
  {
    num: '03',
    title: 'Limitation of Liability',
    body: 'Tronexa provides this website and its services on an "as-is" basis. We make no warranties, express or implied, regarding the accuracy or availability of the site. To the maximum extent permitted by law, Tronexa shall not be liable for any direct, indirect, or consequential damages arising out of your use or inability to use our website.',
  },
  {
    num: '04',
    title: 'Third-Party Links',
    body: 'Our website may contain links to external third-party websites. Tronexa does not endorse and is not responsible for the content, privacy policies, or practices of any third-party platforms.',
  },
  {
    num: '05',
    title: 'Changes to Terms',
    body: 'We reserve the right to modify these Terms and Conditions at any time without prior notice. Your continued use of the website following any changes signifies your acceptance of the updated terms.',
  },
];

type Tab = 'privacy' | 'terms';

function PolicySection({ section }: { section: typeof PRIVACY_SECTIONS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '52px 44px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: hovered ? 'rgba(205,212,235,0.03)' : 'transparent',
        transition: 'background 0.3s',
        display: 'grid',
        gridTemplateColumns: '80px 1fr',
        gap: '44px',
        alignItems: 'start',
      }}
    >
      <div style={{
        fontSize: '10px',
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: '0.2em',
        fontFamily: 'var(--font-geist-mono)',
        paddingTop: '4px',
      }}>{section.num}</div>
      <div>
        <div style={{
          fontSize: '13px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#cdd4eb',
          marginBottom: '20px',
        }}>{section.title}</div>
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.9,
          margin: 0,
        }}>{section.body}</p>
      </div>
    </div>
  );
}

export default function LegalContent() {
  const { setIsLoaded } = useLoadingContext();
  const [activeTab, setActiveTab] = useState<Tab>('privacy');

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  const sections = activeTab === 'privacy' ? PRIVACY_SECTIONS : TERMS_SECTIONS;
  const heading = activeTab === 'privacy'
    ? 'Your privacy is our commitment'
    : 'Rules that protect us both';
  const subheading = activeTab === 'privacy'
    ? 'This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.'
    : 'By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.';

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{
        minHeight: '60vh',
        background: '#0d0f1a',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '140px 60px 80px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '80px',
            alignItems: 'end',
          }}>
            <div>
              <SectionLabel text="Legal Information" />
              <h1 style={{
                fontSize: 'clamp(2.4rem, 4vw, 4.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Privacy &amp; Terms
              </h1>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingBottom: '8px',
            }}>
              At TRONEXA, we are committed to transparency and trust. This page outlines our Privacy Policy and
              Terms &amp; Conditions — the principles that govern how we handle your data and how you may use our services.
            </p>
          </div>
        </div>
      </section>

      {/* ── TAB SWITCHER ──────────────────────────────────── */}
      <section style={{ background: '#0d0f1a', padding: '0 60px' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
        }}>
          {([
            { id: 'privacy' as Tab, label: 'Privacy Policy' },
            { id: 'terms' as Tab, label: 'Terms & Conditions' },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '24px 0',
                marginRight: '52px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: activeTab === tab.id ? '#cdd4eb' : 'rgba(255,255,255,0.3)',
                borderBottom: activeTab === tab.id ? '2px solid #cdd4eb' : '2px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
                fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── POLICY HEADER ─────────────────────────────────── */}
      <section style={{ background: '#080b14', padding: '100px 60px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '80px',
            alignItems: 'start',
            paddingBottom: '0',
          }}>
            <div>
              <SectionLabel text={activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'} />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                {heading}
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              {subheading}
            </p>
          </div>
        </div>
      </section>

      {/* ── POLICY SECTIONS ───────────────────────────────── */}
      <section style={{ background: '#080b14', padding: '60px 60px 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            marginTop: '60px',
            clipPath: CLIP_LG,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {sections.map((section, i) => (
              <PolicySection key={i} section={section} />
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY COMMITMENTS BAR ───────────────────────────── */}
      <section style={{ background: '#cdd4eb', padding: '0 60px' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {[
            { num: 'Secure', label: 'Data Protection' },
            { num: 'Transparent', label: 'Our Commitment' },
            { num: 'Confidential', label: 'Your Information' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '56px 36px',
              borderLeft: i > 0 ? '1px solid rgba(13,15,26,0.12)' : 'none',
            }}>
              <div style={{
                fontSize: 'clamp(1.4rem, 2vw, 2rem)',
                fontWeight: 800,
                color: '#0d0f1a',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '10px',
              }}>{item.num}</div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(13,15,26,0.55)',
              }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTH DOCUMENTS QUICK NAV ──────────────────────── */}
      <section style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <SectionLabel text="Documents" />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              color: 'white',
              margin: 0,
            }}>
              Our legal commitments<br />to you
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'rgba(255,255,255,0.07)',
          }}>
            <div style={{
              padding: '64px 52px',
              background: '#0d0f1a',
              clipPath: CLIP_LG,
            }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#cdd4eb',
                marginBottom: '28px',
              }}>01 — Privacy Policy</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'white',
                margin: '0 0 20px',
              }}>How we handle your data</h3>
              <p style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.85,
                margin: '0 0 36px',
              }}>
                Our Privacy Policy details what information we collect, how we use it, how we protect it, and
                what rights you have regarding your personal data.
              </p>
              <button
                onClick={() => setActiveTab('privacy')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#cdd4eb',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  padding: 0,
                  fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                Read Privacy Policy →
              </button>
            </div>
            <div style={{ padding: '64px 52px', background: '#0d0f1a' }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#cdd4eb',
                marginBottom: '28px',
              }}>02 — Terms &amp; Conditions</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'white',
                margin: '0 0 20px',
              }}>Rules for using our services</h3>
              <p style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.85,
                margin: '0 0 36px',
              }}>
                Our Terms &amp; Conditions define the rules and guidelines for accessing our website and using
                TRONEXA&apos;s services. Understanding these terms protects both you and us.
              </p>
              <button
                onClick={() => setActiveTab('terms')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#cdd4eb',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  padding: 0,
                  fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                Read Terms &amp; Conditions →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
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
            Questions about our<br />policies?
          </h2>
          <p style={{
            color: 'rgba(13,15,26,0.6)',
            fontSize: '14px',
            lineHeight: 1.85,
            margin: '0 0 52px',
          }}>
            If you have any questions, concerns, or requests related to your privacy or our terms of service,
            our team is here to help. Reach out to us at any time.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:info@tronexa.com?subject=Privacy & Legal Inquiry"
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
              Contact Us →
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
              Visit Contact Page →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
