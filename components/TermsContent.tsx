'use client';

import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';

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

export default function TermsContent() {
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
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
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
                Terms &amp;<br />Conditions
              </h1>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingBottom: '8px',
            }}>
              By accessing or using our website and services, you agree to comply with and be bound
              by the following Terms and Conditions. Please read them carefully.
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
              <SectionLabel text="Terms & Conditions" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Rules that protect us both
              </h2>
            </div>
            <p className="page-asym-right" style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              These Terms & Conditions define the rules and guidelines for accessing our website and
              using TRONEXA&apos;s services. Understanding these terms protects both you and us.
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
            { num: 'Fair', label: 'Usage Rules' },
            { num: 'Clear', label: 'Our Policies' },
            { num: 'Protected', label: 'Your Rights' },
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
            Questions about our<br />terms?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            lineHeight: 1.85,
            margin: '0 0 52px',
          }}>
            If you have any questions or concerns about our Terms & Conditions,
            our team is here to help.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:info@tronexa.com?subject=Terms & Conditions Inquiry"
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
              href="/privacy-policy"
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
              View Privacy Policy →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
