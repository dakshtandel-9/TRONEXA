'use client';

import { useEffect, useRef } from 'react';

const LOCATIONS = [
  { lat: 39.1597, lng: -75.5247, altitude: 800,  tilt: 60, heading: 20  },
  { lat: 24.8884, lng: 55.1507,  altitude: 1000, tilt: 60, heading: -30 },
  { lat: 22.7242, lng: 75.8596,  altitude: 800,  tilt: 60, heading: 10  },
];

type Map3DElement = HTMLElement & {
  center: object;
  tilt: number;
  heading: number;
  range: number;
  flyCameraTo?: (opts: object) => void;
};

let scriptPromise: Promise<void> | null = null;

function loadGoogleMaps3D(apiKey: string): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    if (document.getElementById('gmap-3d-script')) {
      customElements.whenDefined('gmp-map-3d').then(() => resolve());
      return;
    }
    const script = document.createElement('script');
    script.id = 'gmap-3d-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=alpha&libraries=maps3d&loading=async`;
    script.async = true;
    script.onload = () => customElements.whenDefined('gmp-map-3d').then(() => resolve());
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return scriptPromise;
}

interface GoogleMap3DProps {
  activeLocation: number;
}

export default function GoogleMap3D({ activeLocation }: GoogleMap3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map3DElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey || apiKey === 'your_api_key_here') return;
    if (!containerRef.current) return;

    loadGoogleMaps3D(apiKey).then(() => {
      if (!containerRef.current || mapRef.current) return;

      const loc = LOCATIONS[0];
      const map3d = document.createElement('gmp-map-3d') as Map3DElement;

      map3d.style.width = '100%';
      map3d.style.height = '100%';
      map3d.style.display = 'block';
      map3d.center  = { lat: loc.lat, lng: loc.lng, altitude: loc.altitude };
      map3d.tilt    = loc.tilt;
      map3d.heading = loc.heading;
      map3d.range   = 1200;

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(map3d);
      mapRef.current = map3d;
    }).catch(console.error);

    return () => { mapRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map3d = mapRef.current;
    if (!map3d) return;
    const loc = LOCATIONS[activeLocation];

    if (typeof map3d.flyCameraTo === 'function') {
      map3d.flyCameraTo({
        endCamera: {
          center: { lat: loc.lat, lng: loc.lng, altitude: loc.altitude },
          tilt: loc.tilt,
          heading: loc.heading,
          range: 1200,
        },
        durationMillis: 2000,
      });
    } else {
      map3d.center  = { lat: loc.lat, lng: loc.lng, altitude: loc.altitude };
      map3d.tilt    = loc.tilt;
      map3d.heading = loc.heading;
    }
  }, [activeLocation]);

  if (!apiKey || apiKey === 'your_api_key_here') {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.03)',
        color: 'rgba(255,255,255,0.35)', gap: '12px',
      }}>
        <div style={{ fontSize: '28px', opacity: 0.4 }}>⊞</div>
        <div style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
          Add API key to .env.local
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0d0f1a' }}>
      {/* Dark navy tint overlay — matches site theme, pointer-events off so map stays interactive */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, rgba(30,50,120,0.22) 0%, rgba(13,15,26,0.12) 100%)',
        mixBlendMode: 'multiply',
      }} />
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          filter: 'saturate(0.55) brightness(0.72) contrast(1.15) hue-rotate(200deg) sepia(0.25)',
        }}
      />
    </div>
  );
}
