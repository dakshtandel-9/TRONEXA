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
        if (!v.muted) v.muted = true;
        v.setAttribute('disableRemotePlayback', '');
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

    return () => {
      observer.disconnect();
      document.removeEventListener('play', onPlay, true);
    };
  }, []);

  return null;
}
