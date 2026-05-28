'use client';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    num: '01',
    title: 'Future',
    active: true,
    desc: 'We build the future of digital innovation',
    btn: { label: 'Explore our Projects', href: '/projects' },
  },
  {
    num: '02',
    title: 'Innovation',
    active: false,
    desc: 'We lead the way in technology transformation',
    btn: { label: 'Work with us', href: '/careers' },
  },
  {
    num: '03',
    title: 'Collaboration',
    active: false,
    desc: 'We work with a team of digital specialists',
    btn: null,
  },
  {
    num: '04',
    title: 'Excellence',
    active: false,
    desc: 'To create what businesses aspire to become',
    btn: { label: 'Discover our vision', href: '/about' },
  },
  {
    num: '05',
    title: 'Purpose',
    active: false,
    desc: 'Build the future with purpose',
    btn: null,
  },
  {
    num: '06',
    title: 'Legacy',
    active: false,
    desc: "Define tomorrow's digital landscape",
    btn: { label: 'Explore our Services', href: '/services' },
  },
];

export default function MenuOverlay({ isOpen, onClose }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.97)',
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        pointerEvents: isOpen ? 'auto' : 'none',
        overflowY: 'auto',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '28px',
          right: '40px',
          zIndex: 10,
          color: 'white',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
          letterSpacing: '0.05em',
          padding: '4px 8px',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.6'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        aria-label="Close menu"
      >
        ✕
      </button>

      {/* 2-col, 3-row grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '100vh',
          paddingTop: '80px',
        }}
      >
        {SECTIONS.map((s, i) => (
          <div
            key={s.num}
            style={{
              padding: '52px 56px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
          >
            {/* Label row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px',
              }}
            >
              {s.active && (
                <span style={{ color: 'white', fontSize: '10px', lineHeight: 1 }}>■</span>
              )}
              <span
                style={{
                  color: s.active ? 'white' : 'rgba(255,255,255,0.35)',
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {s.num}
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                color: 'white',
                fontSize: 'clamp(2rem, 3vw, 3rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                margin: '0 0 18px',
              }}
            >
              {s.title}
            </h2>

            {/* Description */}
            <p
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '14px',
                lineHeight: 1.65,
                margin: '0 0 28px',
                maxWidth: '340px',
              }}
            >
              {s.desc}
            </p>

            {/* CTA */}
            {s.btn && (
              <a
                href={s.btn.href}
                onClick={onClose}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255,255,255,0.35)',
                  color: 'white',
                  padding: '10px 24px',
                  fontSize: '11px',
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'white';
                  el.style.color = 'black';
                  el.style.borderColor = 'white';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'transparent';
                  el.style.color = 'white';
                  el.style.borderColor = 'rgba(255,255,255,0.35)';
                }}
              >
                {s.btn.label} →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
