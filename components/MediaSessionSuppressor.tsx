'use client';

import { useEffect } from 'react';

/**
 * Background videos (allPagebg.mp4) are decorative. Without this, browsers
 * register the autoplaying <video> with the Media Session API, which surfaces
 * a play/pause button in the OS UI (iOS lock screen, Android notification shade,
 * Safari's media controls). We suppress that:
 *
 *  1. Force `muted` as a real DOM property on every video — React only sets the
 *     muted *attribute*, and a video the browser thinks is "unmuted" is far more
 *     likely to claim a media session.
 *  2. Neuter navigator.mediaSession so no transport controls / metadata appear.
 *
 * Mounted once at the root so it covers every page that uses the bg video.
 */
export default function MediaSessionSuppressor() {
  useEffect(() => {
    const enforceMuted = () => {
      document.querySelectorAll('video').forEach((v) => {
        // Set the muted *property* (not just the attribute) before play — Safari
        // blocks autoplay on a video it considers unmuted and then paints the
        // big center play-button overlay. Forcing these guarantees inline autoplay.
        if (!v.muted) v.muted = true;
        v.defaultMuted = true;
        v.setAttribute('disableRemotePlayback', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
        // Resume any video Safari paused (which is what surfaces the play button).
        if (v.paused) {
          const p = v.play();
          if (p && typeof p.catch === 'function') p.catch(() => { /* autoplay blocked; retried on next tick */ });
        }
      });
    };

    const clearMediaSession = () => {
      if (!('mediaSession' in navigator)) return;
      try {
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.playbackState = 'none';
        // Swallow any transport actions the OS might try to surface.
        for (const action of ['play', 'pause', 'previoustrack', 'nexttrack', 'seekbackward', 'seekforward', 'seekto', 'stop'] as MediaSessionAction[]) {
          try { navigator.mediaSession.setActionHandler(action, () => {}); } catch { /* unsupported action */ }
        }
      } catch { /* mediaSession not fully supported */ }
    };

    enforceMuted();
    clearMediaSession();

    // Re-apply on route changes / late-mounting videos.
    const observer = new MutationObserver(() => {
      enforceMuted();
      clearMediaSession();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Browsers can (re)claim a session when a video starts playing.
    const onPlay = () => { enforceMuted(); clearMediaSession(); };
    document.addEventListener('play', onPlay, true);

    // Safari pauses background videos when it shows the play overlay or when the
    // tab is backgrounded — re-assert autoplay on these events too.
    const onPause = () => { enforceMuted(); };
    document.addEventListener('pause', onPause, true);
    const onVisible = () => { if (!document.hidden) enforceMuted(); };
    document.addEventListener('visibilitychange', onVisible);

    // First-load race: the muted property may not be set before Safari's initial
    // autoplay decision, so re-enforce a few times right after mount.
    const ticks = [100, 300, 800, 1500].map((ms) => window.setTimeout(enforceMuted, ms));

    return () => {
      observer.disconnect();
      document.removeEventListener('play', onPlay, true);
      document.removeEventListener('pause', onPause, true);
      document.removeEventListener('visibilitychange', onVisible);
      ticks.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
