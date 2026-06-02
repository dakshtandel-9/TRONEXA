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

const LOCATIONS = [
  {
    flag: '🇺🇸',
    country: 'United States',
    label: 'North America Headquarters',
    address: '8 The Green, Suite A\nDover, DE 19901\nUSA',
    phone: '+1 713-732-6262',
    email: 'info@tronexa.com',
    mapQ: '8+The+Green+Suite+A+Dover+DE+19901+USA',
  },
  {
    flag: '🇦🇪',
    country: 'United Arab Emirates',
    label: 'Middle East Office',
    address: 'Business Centre, 3rd Floor, Building A3\nBusiness Park, Dubai South\nDubai, United Arab Emirates',
    phone: '+1 713-732-6262',
    email: 'info@tronexa.com',
    mapQ: 'Dubai+South+Business+Park+Dubai+UAE',
  },
  {
    flag: '🇮🇳',
    country: 'India',
    label: 'India Development Centre',
    address: '808, 8th Floor, Skye Corporate Park\nAB Road, Indore 452010\nIndia',
    phone: '+1 713-732-6262',
    email: 'info@tronexa.com',
    mapQ: 'Skye+Corporate+Park+AB+Road+Indore+452010+India',
  },
];

const SERVICES = [
  'Web Development', 'App Development', 'Game Development', 'AI Solutions',
  'IoT Solutions', 'Cloud Solutions', 'CRM Solutions', 'ServiceNow',
  'Quality Assurance', 'Digital Marketing', 'Staffing (IT & Non-IT)',
  'General Inquiry', 'Other',
];

const DIAL_CODES = [
  { label: 'United States (+1)', code: '+1' },
  { label: 'United Arab Emirates (+971)', code: '+971' },
  { label: 'India (+91)', code: '+91' },
  { label: 'United Kingdom (+44)', code: '+44' },
  { label: 'Canada (+1)', code: '+1-CA' },
  { label: 'Australia (+61)', code: '+61' },
  { label: 'Germany (+49)', code: '+49' },
  { label: 'France (+33)', code: '+33' },
  { label: 'Singapore (+65)', code: '+65' },
  { label: 'Other', code: 'other' },
];

const PROCESS_STEPS = [
  { num: '01', title: 'We Review Your Inquiry', desc: 'Within 1–2 business days, our team reviews your message, understands your requirements, and identifies the right people to respond.' },
  { num: '02', title: 'We Reach Out', desc: 'A TRONEXA representative will contact you by email or phone to acknowledge your inquiry and schedule an introductory call at your convenience.' },
  { num: '03', title: 'Discovery Call', desc: 'A focused 30–45 minute conversation where we listen to your goals, challenges, timeline, and expectations — and share how we can help.' },
  { num: '04', title: 'Proposal & Next Steps', desc: 'Based on the discovery call, we prepare a tailored proposal outlining our recommended approach, scope, timeline, and investment.' },
];

const HELP_CARDS = [
  { num: '01', title: 'Build a New Website', desc: 'You need a modern, high-performing website that represents your brand and drives business results.' },
  { num: '02', title: 'Develop a Mobile App', desc: 'You have an app idea and need a reliable team to design, build, and launch it across Android and iOS.' },
  { num: '03', title: 'Implement AI in Your Business', desc: 'You want to automate operations, improve decision-making, or build AI-powered products and experiences.' },
  { num: '04', title: 'Move to the Cloud', desc: 'You need to migrate your infrastructure to a secure, scalable, and cost-efficient cloud environment.' },
  { num: '05', title: 'Build or Customize a CRM', desc: 'You need a smarter way to manage customer relationships, sales pipelines, and business workflows.' },
  { num: '06', title: 'Improve Your Digital Marketing', desc: 'You want to grow your online visibility, attract more leads, and maximize your marketing ROI.' },
  { num: '07', title: 'Hire Skilled Professionals', desc: 'You need to quickly find and onboard qualified IT or non-IT talent for your team or projects.' },
  { num: '08', title: 'Something Else', desc: 'Your challenge is unique. Tell us about it — we are good at figuring out the right path forward together.' },
];

const FAQS = [
  { q: 'How quickly can TRONEXA start on my project?', a: 'After an initial consultation and agreement on scope, most projects can begin within 1–2 weeks. We maintain dedicated teams across our service domains to ensure fast mobilization without compromising on quality.' },
  { q: 'Do you work with startups or only large enterprises?', a: 'We work with businesses of all sizes — from early-stage startups building their first product to large enterprises undergoing full digital transformation. Our solutions are tailored to your specific stage, budget, and goals.' },
  { q: 'Can TRONEXA handle the full project or only part of it?', a: 'We offer both. We can manage an end-to-end project from strategy and design through development, testing, and post-launch support — or we can plug into a specific stage of your existing project where you need additional expertise.' },
  { q: 'What industries does TRONEXA work in?', a: 'We serve clients across healthcare, retail, finance, education, real estate, manufacturing, logistics, hospitality, media, SaaS, government, and more. Our technology solutions are adaptable across industries.' },
  { q: 'How do you handle project communication and updates?', a: 'We assign a dedicated project manager to every engagement. You receive regular progress updates, milestone reports, and have direct access to your project team through your preferred communication channel — email, Slack, or video call.' },
  { q: 'Is my project information kept confidential?', a: 'Absolutely. We are happy to sign a Non-Disclosure Agreement (NDA) before any project discussion. Client confidentiality is a non-negotiable standard at TRONEXA.' },
  { q: 'Do you provide post-launch support and maintenance?', a: 'Yes. All our projects include a post-launch support period, and we offer ongoing maintenance, monitoring, and optimization packages to keep your solution performing at its best.' },
  { q: 'How can I get a cost estimate for my project?', a: 'Share your project requirements through the contact form or book a discovery call with our team. We will assess your needs and provide a detailed, transparent proposal with scope, timeline, and investment breakdown.' },
];

const SOCIALS = [
  { label: 'LinkedIn', handle: 'linkedin.com/company/tronexa', href: 'https://linkedin.com/company/tronexa', icon: 'in' },
  { label: 'Instagram', handle: '@tronexa', href: 'https://instagram.com/tronexa', icon: 'ig' },
  { label: 'Twitter / X', handle: '@tronexa', href: 'https://twitter.com/tronexa', icon: 'x' },
  { label: 'Facebook', handle: 'facebook.com/tronexa', href: 'https://facebook.com/tronexa', icon: 'fb' },
  { label: 'YouTube', handle: 'youtube.com/tronexa', href: 'https://youtube.com/tronexa', icon: 'yt' },
];

export default function ContactContent() {
  const { setIsLoaded } = useLoadingContext();

  const [activeLocation, setActiveLocation] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', dialCode: '', phone: '',
    company: '', service: '', message: '', consent: false,
  });
  const [fileName, setFileName] = useState('No file chosen');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : 'No file chosen');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'white',
    padding: '14px 18px',
    fontSize: '13px',
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
    clipPath: CLIP,
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 600,
    marginBottom: '8px',
  };

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── SECTION 1: HERO ─────────────────────────────────────── */}
      <section className="page-hero" style={{
        minHeight: '100vh',
        background: '#0d0f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 60px 100px',
        textAlign: 'center',
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
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px' }}>
          <SectionLabel text="Get In Touch" />

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 32px',
          }}>
            Let&apos;s build something<br />great together
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '15px',
            lineHeight: 1.8,
            maxWidth: '640px',
            margin: '0 auto 52px',
          }}>
            Connect with our team to discuss digital transformation, innovative technology solutions,
            and how TRONEXA can help accelerate your business growth. Whether you have a project in mind,
            a question about our services, or simply want to explore possibilities — we are here and ready to talk.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#contact-form"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#cdd4eb', color: '#0d0f1a',
                padding: '14px 34px', fontSize: '11px',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                fontWeight: 700, textDecoration: 'none', clipPath: CLIP,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#cdd4eb'; }}
            >
              Drop Us a Message →
            </a>
            <a
              href="/services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'transparent', color: '#cdd4eb',
                border: '1px solid rgba(205,212,235,0.35)',
                padding: '14px 34px', fontSize: '11px',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                fontWeight: 700, textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#cdd4eb';
                (e.currentTarget as HTMLElement).style.color = 'white';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(205,212,235,0.35)';
                (e.currentTarget as HTMLElement).style.color = '#cdd4eb';
              }}
            >
              Explore Our Services →
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: CONTACT OPTIONS STRIP ───────────────────── */}
      <section className="page-strip" style={{
        background: '#0d0f1a',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '0 60px',
      }}>
        <div className="page-contact-strip" style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {[
            {
              num: '01', label: 'Call Us',
              main: '+1 713-732-6262',
              sub: 'Available during business hours across USA, UAE, and India time zones.',
              cta: null, href: 'tel:+17137326262',
            },
            {
              num: '02', label: 'Email Us',
              main: 'info@tronexa.com',
              sub: 'We respond to all inquiries within 1–2 business days.',
              cta: null, href: 'mailto:info@tronexa.com',
            },
            {
              num: '03', label: 'Chat With Us',
              main: 'WhatsApp / Live Chat',
              sub: 'Prefer a quick conversation? Reach us directly on WhatsApp for faster responses.',
              cta: 'Start Chat →', href: 'https://wa.me/17137326262',
            },
          ].map((card, i) => (
            <div key={i} className="page-contact-strip-cell" style={{
              padding: '52px 40px',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div style={{
                fontSize: '10px', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                fontWeight: 600, marginBottom: '20px',
              }}>
                {card.num}
              </div>
              <div style={{
                fontSize: '10px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#cdd4eb',
                fontWeight: 600, marginBottom: '12px',
              }}>
                {card.label}
              </div>
              <a
                href={card.href}
                style={{
                  display: 'block',
                  fontSize: 'clamp(1rem, 1.5vw, 1.35rem)',
                  fontWeight: 700, color: 'white',
                  letterSpacing: '-0.01em', marginBottom: '14px',
                  textDecoration: 'none',
                }}
              >
                {card.main}
              </a>
              <p style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7, margin: '0 0 16px',
              }}>
                {card.sub}
              </p>
              {card.cta && (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '10px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', fontWeight: 700,
                    color: '#cdd4eb', textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#cdd4eb'; }}
                >
                  {card.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: CONTACT FORM ─────────────────────────────── */}
      <section id="contact-form" className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div className="page-grid-asym" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <SectionLabel text="Drop Us a Line" />
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
              fontWeight: 800, letterSpacing: '-0.02em',
              lineHeight: 1.12, textTransform: 'uppercase',
              color: 'white', margin: '0 0 24px',
            }}>
              Tell us about<br />your project
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.8, margin: 0 }}>
              Fill in the form and one of our team members will get back to you within 1–2 business days.
              The more detail you provide, the better we can prepare for our first conversation.
            </p>

            <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: '☎', label: '+1 713-732-6262' },
                { icon: '✉', label: 'info@tronexa.com' },
                { icon: '⊞', label: 'USA · UAE · India' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '13px', color: '#cdd4eb', width: '20px' }}>{item.icon}</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.02em' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div style={{
                padding: '60px 40px',
                border: '1px solid rgba(205,212,235,0.2)',
                textAlign: 'center',
                clipPath: CLIP_LG,
                background: 'rgba(205,212,235,0.04)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '20px' }}>✓</div>
                <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                  Message Sent
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.8, margin: '0 0 28px' }}>
                  Thank you for reaching out. Our team will review your inquiry and get back to you within 1–2 business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: '#cdd4eb', color: '#0d0f1a', border: 'none',
                    padding: '12px 28px', fontSize: '11px',
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    fontWeight: 700, cursor: 'pointer', clipPath: CLIP,
                  }}
                >
                  Send Another Message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Row 1 */}
                <div className="page-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>First Name *</label>
                    <input
                      name="firstName" required value={formData.firstName}
                      onChange={handleFormChange} placeholder="Enter first name"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name *</label>
                    <input
                      name="lastName" required value={formData.lastName}
                      onChange={handleFormChange} placeholder="Enter last name"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="page-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email" name="email" required value={formData.email}
                      onChange={handleFormChange} placeholder="your@email.com"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Dialing Code *</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        name="dialCode" required value={formData.dialCode}
                        onChange={handleFormChange}
                        style={{ ...inputStyle, paddingRight: '36px' }}
                      >
                        <option value="" disabled>United States (+1)</option>
                        {DIAL_CODES.map(d => (
                          <option key={d.code} value={d.code} style={{ background: '#0d0f1a' }}>{d.label}</option>
                        ))}
                      </select>
                      <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none', fontSize: '10px' }}>▼</span>
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="page-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      type="tel" name="phone" required value={formData.phone}
                      onChange={handleFormChange} placeholder="Enter phone number"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company Name</label>
                    <input
                      name="company" value={formData.company}
                      onChange={handleFormChange} placeholder="Enter your company name"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div>
                  <label style={labelStyle}>Service You Are Interested In</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      name="service" value={formData.service}
                      onChange={handleFormChange}
                      style={{ ...inputStyle, paddingRight: '36px' }}
                    >
                      <option value="" style={{ background: '#0d0f1a' }}>Select a service</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s} style={{ background: '#0d0f1a' }}>{s}</option>
                      ))}
                    </select>
                    <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none', fontSize: '10px' }}>▼</span>
                  </div>
                </div>

                {/* Row 5 */}
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message" required value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell us about your project"
                    rows={6}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '130px',
                      clipPath: 'polygon(0% 0%, calc(100% - 14px) 0%, 100% 14px, 100% 100%, 0% 100%)',
                    }}
                  />
                </div>

                {/* Row 6 — File */}
                <div>
                  <label style={labelStyle}>Attach a File (Optional)</label>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: '0 0 10px' }}>
                    PDF, DOC, PNG — max 10MB
                  </p>
                  <label style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    border: '1px dashed rgba(255,255,255,0.15)',
                    padding: '14px 18px', cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(205,212,235,0.4)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
                  >
                    <span style={{ fontSize: '13px', color: '#cdd4eb' }}>⊞</span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', flex: 1 }}>{fileName}</span>
                    <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Browse</span>
                    <input type="file" accept=".pdf,.doc,.docx,.png,.jpg" onChange={handleFileChange} style={{ display: 'none' }} />
                  </label>
                </div>

                {/* Row 7 — Consent */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <input
                    type="checkbox" name="consent" required
                    checked={formData.consent}
                    onChange={handleFormChange}
                    style={{ marginTop: '2px', accentColor: '#cdd4eb', cursor: 'pointer' }}
                  />
                  <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, cursor: 'pointer' }}>
                    By sending this form you agree to the{' '}
                    <a href="#" style={{ color: '#cdd4eb', textDecoration: 'underline' }}>Terms &amp; Conditions</a>
                    {' '}and{' '}
                    <a href="#" style={{ color: '#cdd4eb', textDecoration: 'underline' }}>Privacy Policy</a>
                    {' '}of TRONEXA.
                  </label>
                </div>

                <button
                  type="submit"
                  style={{
                    alignSelf: 'flex-start',
                    background: '#cdd4eb', color: '#0d0f1a',
                    border: 'none', padding: '15px 38px',
                    fontSize: '11px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', fontWeight: 700,
                    cursor: 'pointer', clipPath: CLIP,
                    transition: 'background 0.2s',
                    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#cdd4eb'; }}
                >
                  Send Message →
                </button>

                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, margin: '4px 0 0' }}>
                  We take your privacy seriously. Your information is never sold, shared with third parties,
                  or used for unsolicited communication.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: OFFICE LOCATIONS ─────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '60px' }}>
            <div>
              <SectionLabel text="Where We Are" dark />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800, letterSpacing: '-0.02em',
                lineHeight: 1.12, textTransform: 'uppercase',
                color: '#0d0f1a', margin: 0,
              }}>
                Three global locations.<br />One unified team.
              </h2>
            </div>
            <p style={{ color: 'rgba(13,15,26,0.6)', fontSize: '14px', lineHeight: 1.8, margin: 'auto 0 0', paddingTop: '40px' }}>
              TRONEXA operates from offices across the USA, UAE, and India — giving our clients access to
              round-the-clock support, global delivery capability, and teams that understand local markets.
            </p>
          </div>

          <div className="page-locations-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {LOCATIONS.map((loc, i) => (
              <div
                key={i}
                onClick={() => setActiveLocation(i)}
                style={{
                  padding: '44px 36px',
                  background: activeLocation === i ? '#0d0f1a' : 'transparent',
                  border: activeLocation === i ? 'none' : '1px solid rgba(13,15,26,0.15)',
                  clipPath: activeLocation === i ? CLIP_LG : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{loc.flag}</div>
                <div style={{
                  fontSize: '10px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontWeight: 600,
                  marginBottom: '8px',
                  color: activeLocation === i ? '#cdd4eb' : 'rgba(13,15,26,0.45)',
                }}>
                  {loc.label}
                </div>
                <div style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                  fontWeight: 800, letterSpacing: '-0.01em',
                  color: activeLocation === i ? 'white' : '#0d0f1a',
                  marginBottom: '20px',
                }}>
                  {loc.country}
                </div>
                <pre style={{
                  fontSize: '13px', lineHeight: 1.7,
                  color: activeLocation === i ? 'rgba(255,255,255,0.55)' : 'rgba(13,15,26,0.55)',
                  margin: '0 0 16px', fontFamily: 'inherit', whiteSpace: 'pre-wrap',
                }}>
                  {loc.address}
                </pre>
                <div style={{ fontSize: '12px', color: activeLocation === i ? 'rgba(255,255,255,0.5)' : 'rgba(13,15,26,0.5)', marginBottom: '4px' }}>
                  {loc.phone}
                </div>
                <div style={{ fontSize: '12px', color: activeLocation === i ? 'rgba(255,255,255,0.5)' : 'rgba(13,15,26,0.5)', marginBottom: '24px' }}>
                  {loc.email}
                </div>
                <a
                  href={`https://maps.google.com/maps?q=${loc.mapQ}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    fontSize: '10px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', fontWeight: 700,
                    color: activeLocation === i ? '#cdd4eb' : '#0d0f1a',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.65'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  Get Directions →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: MAP ──────────────────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel text="Find Us" />
          <h2 style={{
            fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
            fontWeight: 800, letterSpacing: '-0.02em',
            lineHeight: 1.12, textTransform: 'uppercase',
            color: 'white', margin: '0 0 48px',
          }}>
            Visit us at any<br />of our three locations
          </h2>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
            {LOCATIONS.map((loc, i) => (
              <button
                key={i}
                onClick={() => setActiveLocation(i)}
                style={{
                  background: activeLocation === i ? '#cdd4eb' : 'transparent',
                  color: activeLocation === i ? '#0d0f1a' : 'rgba(255,255,255,0.5)',
                  border: `1px solid ${activeLocation === i ? '#cdd4eb' : 'rgba(255,255,255,0.15)'}`,
                  padding: '10px 22px', fontSize: '10px',
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  fontWeight: 700, cursor: 'pointer',
                  clipPath: activeLocation === i ? CLIP : 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
                }}
              >
                {loc.flag} {loc.country}
              </button>
            ))}
          </div>

          <div className="page-map-frame" style={{
            width: '100%', height: '480px',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            clipPath: CLIP_LG,
            background: 'rgba(255,255,255,0.03)',
          }}>
            <iframe
              key={activeLocation}
              src={`https://maps.google.com/maps?q=${LOCATIONS[activeLocation].mapQ}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(30%) invert(5%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map — ${LOCATIONS[activeLocation].country}`}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 6: WHAT HAPPENS NEXT ────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#0d0f1a', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '72px' }}>
            <div>
              <SectionLabel text="What to Expect" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800, letterSpacing: '-0.02em',
                lineHeight: 1.12, textTransform: 'uppercase',
                color: 'white', margin: 0,
              }}>
                We make every conversation<br />count from the very first message
              </h2>
            </div>
            <p className="page-asym-right" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.8, margin: 'auto 0 0', paddingTop: '40px' }}>
              We know your time is valuable. Here is exactly what happens after you reach out to TRONEXA — so you always know where things stand.
            </p>
          </div>

          <div className="page-next-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} style={{
                background: '#0d0f1a',
                padding: '48px 36px',
                borderTop: '2px solid rgba(205,212,235,0.15)',
              }}>
                <div style={{
                  fontSize: '10px', letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
                  fontWeight: 600, marginBottom: '28px',
                }}>
                  {step.num}
                </div>
                <h3 style={{
                  fontSize: '1rem', fontWeight: 700,
                  letterSpacing: '-0.01em', textTransform: 'uppercase',
                  color: 'white', margin: '0 0 16px',
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: HOW WE CAN HELP ──────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '60px' }}>
            <div>
              <SectionLabel text="How We Can Help" dark />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800, letterSpacing: '-0.02em',
                lineHeight: 1.12, textTransform: 'uppercase',
                color: '#0d0f1a', margin: 0,
              }}>
                Whatever your technology<br />challenge — we are ready
              </h2>
            </div>
            <p className="page-asym-right" style={{ color: 'rgba(13,15,26,0.6)', fontSize: '14px', lineHeight: 1.8, margin: 'auto 0 0', paddingTop: '40px' }}>
              From a single service to a full digital transformation journey, TRONEXA is equipped to support
              businesses of every size and stage. Here are some of the most common reasons businesses reach out to us.
            </p>
          </div>

          <div className="page-help-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {HELP_CARDS.map((card, i) => (
              <div key={i} style={{
                padding: '36px 28px',
                border: '1px solid rgba(13,15,26,0.15)',
                background: 'transparent',
                transition: 'background 0.2s, border-color 0.2s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = '#0d0f1a';
                  (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                  const h = e.currentTarget.querySelector('[data-num]') as HTMLElement;
                  const title = e.currentTarget.querySelector('[data-title]') as HTMLElement;
                  const desc = e.currentTarget.querySelector('[data-desc]') as HTMLElement;
                  if (h) h.style.color = 'rgba(255,255,255,0.25)';
                  if (title) title.style.color = 'white';
                  if (desc) desc.style.color = 'rgba(255,255,255,0.45)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(13,15,26,0.15)';
                  const h = e.currentTarget.querySelector('[data-num]') as HTMLElement;
                  const title = e.currentTarget.querySelector('[data-title]') as HTMLElement;
                  const desc = e.currentTarget.querySelector('[data-desc]') as HTMLElement;
                  if (h) h.style.color = 'rgba(13,15,26,0.3)';
                  if (title) title.style.color = '#0d0f1a';
                  if (desc) desc.style.color = 'rgba(13,15,26,0.55)';
                }}
              >
                <div data-num style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(13,15,26,0.3)', marginBottom: '20px', transition: 'color 0.2s' }}>
                  {card.num}
                </div>
                <h3 data-title style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', color: '#0d0f1a', margin: '0 0 12px', transition: 'color 0.2s' }}>
                  {card.title}
                </h3>
                <p data-desc style={{ fontSize: '13px', color: 'rgba(13,15,26,0.55)', lineHeight: 1.7, margin: 0, transition: 'color 0.2s' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FAQ ──────────────────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start', marginBottom: '60px' }}>
            <div>
              <SectionLabel text="FAQs" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800, letterSpacing: '-0.02em',
                lineHeight: 1.12, textTransform: 'uppercase',
                color: 'white', margin: 0,
              }}>
                Common questions<br />before getting in touch
              </h2>
            </div>
            <p className="page-asym-right" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.8, margin: 'auto 0 0', paddingTop: '40px' }}>
              Here are some questions we frequently receive from businesses exploring a partnership with TRONEXA.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: '#0d0f1a' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="page-faq-btn"
                  style={{
                    width: '100%', textAlign: 'left',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '28px 36px', background: 'none', border: 'none',
                    cursor: 'pointer', gap: '24px',
                    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'white', letterSpacing: '-0.01em' }}>
                    {faq.q}
                  </span>
                  <span style={{
                    fontSize: '16px', color: '#cdd4eb', flexShrink: 0,
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.25s',
                    display: 'inline-block',
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="page-faq-answer" style={{ padding: '0 36px 28px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: '20px 0 0' }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: SOCIAL MEDIA ─────────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel text="Follow TRONEXA" dark />
          <div className="page-grid-asym" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '80px', alignItems: 'start', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
              fontWeight: 800, letterSpacing: '-0.02em',
              lineHeight: 1.12, textTransform: 'uppercase',
              color: '#0d0f1a', margin: 0,
            }}>
              Stay connected and<br />up to date with our work
            </h2>
            <p style={{ color: 'rgba(13,15,26,0.6)', fontSize: '14px', lineHeight: 1.8, paddingTop: '12px' }}>
              Follow TRONEXA on social media to explore our latest projects, technology insights, team updates, and industry news.
            </p>
          </div>

          <div className="page-socials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', flexDirection: 'column', gap: '12px',
                  padding: '32px 24px',
                  border: '1px solid rgba(13,15,26,0.15)',
                  background: 'transparent',
                  textDecoration: 'none',
                  clipPath: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = '#0d0f1a';
                  (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.clipPath = CLIP;
                  const label = e.currentTarget.querySelector('[data-label]') as HTMLElement;
                  const handle = e.currentTarget.querySelector('[data-handle]') as HTMLElement;
                  if (label) label.style.color = 'white';
                  if (handle) handle.style.color = 'rgba(255,255,255,0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(13,15,26,0.15)';
                  (e.currentTarget as HTMLElement).style.clipPath = 'none';
                  const label = e.currentTarget.querySelector('[data-label]') as HTMLElement;
                  const handle = e.currentTarget.querySelector('[data-handle]') as HTMLElement;
                  if (label) label.style.color = '#0d0f1a';
                  if (handle) handle.style.color = 'rgba(13,15,26,0.45)';
                }}
              >
                <div style={{
                  width: '36px', height: '36px',
                  border: '1px solid rgba(13,15,26,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 800, color: '#0d0f1a',
                  letterSpacing: '0.05em',
                }}>
                  {s.icon.toUpperCase()}
                </div>
                <div>
                  <div data-label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0d0f1a', marginBottom: '4px', transition: 'color 0.2s' }}>
                    {s.label}
                  </div>
                  <div data-handle style={{ fontSize: '11px', color: 'rgba(13,15,26,0.45)', transition: 'color 0.2s' }}>
                    {s.handle}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: CTA BANNER ──────────────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '140px 60px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            fontWeight: 800, letterSpacing: '-0.02em',
            lineHeight: 1.08, textTransform: 'uppercase',
            color: 'white', margin: '0 0 28px',
          }}>
            Contact us to explore<br />the TRONEXA vision
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)', fontSize: '15px',
            lineHeight: 1.8, maxWidth: '560px',
            margin: '0 auto 52px',
          }}>
            Whether you are ready to start a project, looking for the right technology partner, or just want to
            understand how we work — reach out. We would love to hear from you.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#contact-form"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#cdd4eb', color: '#0d0f1a',
                padding: '14px 34px', fontSize: '11px',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                fontWeight: 700, textDecoration: 'none', clipPath: CLIP,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#cdd4eb'; }}
            >
              Send Us a Message →
            </a>
            <a
              href="/services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'transparent', color: '#cdd4eb',
                border: '1px solid rgba(205,212,235,0.35)',
                padding: '14px 34px', fontSize: '11px',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                fontWeight: 700, textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#cdd4eb';
                (e.currentTarget as HTMLElement).style.color = 'white';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(205,212,235,0.35)';
                (e.currentTarget as HTMLElement).style.color = '#cdd4eb';
              }}
            >
              Explore Our Services →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
