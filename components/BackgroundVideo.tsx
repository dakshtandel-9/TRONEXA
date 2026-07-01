'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

/**
 * Decorative full-bleed background video.
 *
 * Why a dedicated component: React does NOT reliably set the `muted` DOM
 * *property* from the JSX `muted` attribute, and iOS Safari decides at first
 * paint whether to treat a prominent video as controllable media (surfacing the
 * big center play/pause overlay). We set `muted` as a real property via a ref
 * BEFORE the browser makes that call, plus every attribute that opts the element
 * out of remote playback / PiP / native controls. Combined with the global
 * MediaSessionSuppressor this stops the play-button overlay from appearing.
 */
export default function BackgroundVideo({
  src,
  poster,
  style,
  className,
}: {
  src: string;
  poster?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // real DOM property (not just the attribute) so Safari allows inline autoplay
    v.muted = true;
    v.defaultMuted = true;
    v.controls = false;
    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => { /* autoplay may be blocked; retried by suppressor */ });
    };
    play();
    // resume if the browser (not the user) auto-pauses on tab focus regain
    const onVisible = () => { if (!document.hidden && v.paused) play(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      // opt out of everything that turns a decorative clip into "real" media
      controls={false}
      disableRemotePlayback
      disablePictureInPicture
      poster={poster}
      className={className}
      style={style}
      // non-standard iOS attribute (honoured by older iOS Safari); passed as a
      // raw attribute since it's not in React's HTMLVideoElement prop types
      {...{ 'webkit-playsinline': 'true' }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
