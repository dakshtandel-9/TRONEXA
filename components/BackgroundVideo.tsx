'use client';

import dynamic from 'next/dynamic';
import type { CSSProperties } from 'react';

// Client-only: the streaks render on a WebGL <Canvas> and must not SSR.
const BackgroundStreaks = dynamic(() => import('@/components/BackgroundStreaks'), { ssr: false });

/**
 * Decorative full-bleed page background.
 *
 * Previously an autoplaying <video> (allPagebg.mp4). Safari repeatedly blocked
 * autoplay and surfaced a centre play overlay, so this now renders an animated
 * Three.js scene (BackgroundStreaks) that recreates the video's look — sweeping
 * blue energy streaks over a dark navy field, looping forever on the GPU. No
 * media element means no autoplay policy, no controls, and identical behaviour
 * in every browser.
 *
 * The `src` / `poster` props are accepted but ignored so every existing call
 * site keeps working without changes.
 */
export default function BackgroundVideo({
  src: _src,
  poster: _poster,
  style,
  className,
}: {
  src?: string;
  poster?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return <BackgroundStreaks style={style} className={className} />;
}
