'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

/**
 * Decorative full-bleed background video.
 *
 * Why a dedicated component: React does NOT reliably set the `muted` DOM
 * *property* from the JSX `muted` attribute, and iOS Safari decides at first
 * paint whether to treat a prominent video as controllable media (surfacing the
 * big center play/pause overlay). Two things make that overlay stick even after
 * previous fixes:
 *
 *  1. `useEffect` runs AFTER first paint, so the muted property isn't set in time
 *     for Safari's autoplay/controls decision. We use a CALLBACK REF instead — it
 *     fires the moment the node is attached, before Safari evaluates the element.
 *  2. Safari draws its center play button as browser chrome on top of a video it
 *     considers a tappable, prominent media element. `pointer-events: none` makes
 *     the element non-interactive so taps pass through and Safari stops surfacing
 *     a control to tap. It's decorative, so nothing is lost.
 *
 * Combined with the global MediaSessionSuppressor this keeps the overlay away.
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
  const nodeRef = useRef<HTMLVideoElement | null>(null);

  const tryPlay = useCallback((v: HTMLVideoElement) => {
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => { /* autoplay may be blocked; retried by suppressor */ });
  }, []);

  // Callback ref: runs synchronously when the <video> mounts — earlier than
  // useEffect — so `muted` is a real property before Safari's first-paint check.
  const setRef = useCallback((v: HTMLVideoElement | null) => {
    nodeRef.current = v;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.controls = false;
    tryPlay(v);
  }, [tryPlay]);

  useEffect(() => {
    // resume if the browser (not the user) auto-pauses on tab focus regain
    const onVisible = () => {
      const v = nodeRef.current;
      if (v && !document.hidden && v.paused) tryPlay(v);
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [tryPlay]);

  return (
    <video
      ref={setRef}
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
      // pointer-events: none → Safari won't surface its tappable center play
      // overlay on a non-interactive decorative video (merged last so it wins)
      style={{ ...style, pointerEvents: 'none' }}
      // non-standard iOS attribute (honoured by older iOS Safari); passed as a
      // raw attribute since it's not in React's HTMLVideoElement prop types
      {...{ 'webkit-playsinline': 'true' }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
