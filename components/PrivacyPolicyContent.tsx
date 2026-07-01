'use client';

import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';
import BackgroundVideo from '@/components/BackgroundVideo';

const CLIP = 'polygon(0% 0%, calc(100% - 14px) 0%, 100% 14px, 100% 100%, 0% 100%)';
const CLIP_LG = 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 0% 100%)';

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
      <span style={{ fontSize: '10px', color: '#cdd4eb' }}>■</span>
      <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#cdd4eb', fontWeight: 600 }}>
        {text}
      </span>
    </div>
  );
}

const SECTIONS = [
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

function PolicySection({ section }: { section: typeof SECTIONS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="page-policy-section"
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

export default function PrivacyPolicyContent() {
  const { setIsLoaded } = useLoadingContext();

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* HERO */}
      <section className="page-hero" style={{
        minHeight: '60vh',
        background: '#0d0f1a',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '140px 60px 80px',
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
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <div className="page-legal-hero" style={{
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
                Privacy<br />Policy
              </h1>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingBottom: '8px',
            }}>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or use our services.
            </p>
          </div>
        </div>
      </section>

      {/* POLICY HEADER */}
      <section className="page-section" style={{ background: '#080b14', padding: '100px 60px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-legal-hero" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '80px',
            alignItems: 'start',
          }}>
            <div>
              <SectionLabel text="Privacy Policy" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Your privacy is our commitment
              </h2>
            </div>
            <p className="page-asym-right" style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              At TRONEXA, we are committed to transparency and trust. This policy outlines the principles
              that govern how we handle your data.
            </p>
          </div>
        </div>
      </section>

      {/* POLICY SECTIONS */}
      <section className="page-section" style={{ background: '#080b14', padding: '60px 60px 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            marginTop: '60px',
            clipPath: CLIP_LG,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {SECTIONS.map((section, i) => (
              <PolicySection key={i} section={section} />
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENTS BAR */}
      <section className="page-strip" style={{ background: '#cdd4eb', padding: '0 60px' }}>
        <div className="page-commit-grid" style={{
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
            <div key={i} className="page-commit-cell" style={{
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

      {/* CTA BANNER */}
      <section className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 28px',
          }}>
            Questions about our<br />privacy policy?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            lineHeight: 1.85,
            margin: '0 0 52px',
          }}>
            If you have any questions or concerns about how we handle your data,
            our team is here to help.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:info@tronexa.com?subject=Privacy Policy Inquiry"
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
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              Contact Us →
            </a>
            <a
              href="/terms"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid rgba(205,212,235,0.35)',
                color: '#cdd4eb',
                padding: '14px 34px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#cdd4eb'; el.style.color = '#0d0f1a'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#cdd4eb'; }}
            >
              View Terms &amp; Conditions →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
