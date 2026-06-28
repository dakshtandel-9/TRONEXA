'use client';

// Keyless map using OpenStreetMap embeds, tinted to match the site's dark
// navy theme. No API key or external billing required.

const LOCATIONS = [
  { lat: 39.1597, lng: -75.5247 }, // Dover, DE, USA
  { lat: 24.8884, lng: 55.1507 },  // Dubai South, UAE
  { lat: 22.7242, lng: 75.8596 },  // Indore, MP, India
];

interface GoogleMap3DProps {
  activeLocation: number;
}

// Build an OpenStreetMap embed URL with a small bounding box around the point
// and a marker on the exact coordinates.
function osmEmbedUrl(lat: number, lng: number): string {
  const d = 0.02; // ~2km half-window
  const bbox = `${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

export default function GoogleMap3D({ activeLocation }: GoogleMap3DProps) {
  const loc = LOCATIONS[activeLocation] ?? LOCATIONS[0];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0d0f1a' }}>
      {/* Dark navy tint overlay — matches site theme, pointer-events off so map stays interactive */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(30,50,120,0.28) 0%, rgba(13,15,26,0.18) 100%)',
        mixBlendMode: 'multiply',
      }} />
      <iframe
        key={activeLocation}
        title="Office location map"
        src={osmEmbedUrl(loc.lat, loc.lng)}
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          display: 'block',
          filter: 'saturate(0.55) brightness(0.7) contrast(1.15) hue-rotate(200deg) invert(0.92)',
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
