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
      <h1
        style={{
          color: 'white',
          fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          textShadow: '0 2px 16px rgba(0,0,0,0.8)',
          margin: '0 0 18px',
        }}
      >
        WE BUILD THE FUTURE<br />OF DIGITAL INNOVATION
      </h1>

      <p
        style={{
          color: 'rgba(255,255,255,0.72)',
          fontSize: '13px',
          lineHeight: 1.7,
          maxWidth: '480px',
          margin: '0 auto 26px',
          textShadow: '0 2px 12px rgba(0,0,0,0.8)',
        }}
      >
        For modern businesses seeking growth, TRONEXA delivers intelligent digital solutions across Web, Applications, AI, Cloud, CRM, ServiceNow, IoT, and enterprise IT services. From concept to execution, we help organizations transform operations, scale efficiently, and stay ahead in a technology-driven world.
      </p>

      <a
        href="/projects"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          border: '1px solid white',
          color: 'white',
          padding: '13px 30px',
          fontSize: '11px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          marginBottom: '28px',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'white';
          e.currentTarget.style.color = 'black';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'white';
        }}
      >
        ⊞ EXPLORE OUR PROJECTS
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
