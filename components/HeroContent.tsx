'use client';

export default function HeroContent() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '820px',
        margin: '0 auto',
      }}
    >
      {/* Mobile-only label */}
      <div className="mobile-label" style={{ display: 'none' }}>
        <span style={{ fontSize: '7px' }}>■</span>
        FUTURE
      </div>

      <h1
        style={{
          color: '#e6edf8',
          fontSize: 'clamp(1.05rem, 1.68vw, 1.68rem)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          lineHeight: 1.12,
          textShadow: '0 2px 22px rgba(0,0,0,0.85)',
          margin: '0 0 20px',
        }}
      >
        WE BUILD THE FUTURE<br />OF DIGITAL INNOVATION
      </h1>

      <p
        style={{
          color: 'rgba(190,205,230,0.72)',
          fontSize: '9.45px',
          fontWeight: 400,
          lineHeight: 1.75,
          maxWidth: '500px',
          margin: '0 auto 30px',
          textShadow: '0 2px 14px rgba(0,0,0,0.8)',
        }}
      >
        For modern businesses seeking growth, TRONEXA delivers intelligent digital solutions across Web, Applications, AI, Cloud, CRM, ServiceNow, IoT, and enterprise IT services. From concept to execution, we help organizations transform operations, scale efficiently, and stay ahead in a technology-driven world.
      </p>

      <a
        href="/projects"
        className="mobile-cta"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid rgba(150,175,215,0.35)',
          background: 'rgba(8,14,30,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          color: '#e6edf8',
          padding: '15px 34px',
          fontSize: '7.7px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          marginBottom: '28px',
          clipPath:
            'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)',
          transition: 'background 0.25s, color 0.25s, border-color 0.25s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(40,70,130,0.6)';
          e.currentTarget.style.borderColor = 'rgba(150,175,215,0.7)';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(8,14,30,0.55)';
          e.currentTarget.style.borderColor = 'rgba(150,175,215,0.35)';
          e.currentTarget.style.color = '#e6edf8';
        }}
      >
        <span style={{ fontSize: '9.1px', opacity: 0.85 }}>⊟</span>
        EXPLORE OUR PROJECTS
      </a>

      <div
        style={{
          display: 'flex',
          gap: '36px',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.45)',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        <span>— USA</span>
        <span>— DUBAI</span>
        <span>— INDIA</span>
      </div>
    </div>
  );
}
