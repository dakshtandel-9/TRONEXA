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
    // Force every background video to be muted + inline + non-remote. This is the
    // attribute setup that stops Safari/iOS from treating it as "real" playable
    // media that deserves transport controls / a center play button.
    const enforceAttrs = () => {
      document.querySelectorAll('video').forEach((v) => {
        // Set the muted *property* (not just the attribute) — Safari blocks
        // autoplay on a video it considers unmuted and then paints the big center
        // play-button overlay. Forcing these guarantees inline autoplay.
        if (!v.muted) v.muted = true;
        v.defaultMuted = true;
        v.setAttribute('disableRemotePlayback', '');
        v.setAttribute('disablePictureInPicture', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
        // background videos are decorative → never expose native controls
        v.removeAttribute('controls');
        v.controls = false;
        // non-interactive → Safari won't paint its tappable center play overlay
        v.style.pointerEvents = 'none';
      });
    };

    // Resume ONLY videos that the browser auto-paused (tab backgrounded, Safari's
    // power-saver, media-session steal). We must NOT force-replay here on every
    // pause event — when the user manually taps Safari's play/pause overlay, an
    // immediate .play() fights that gesture and Safari re-shows the overlay in a
    // loop. So resuming is gated behind explicit triggers (visibility/mount), and
    // never runs from the generic 'pause' listener.
    const resumeIfPaused = () => {
      document.querySelectorAll('video').forEach((v) => {
        if (v.paused) {
          const p = v.play();
          if (p && typeof p.catch === 'function') p.catch(() => { /* autoplay blocked; retried on next tick */ });
        }
      });
    };

    // convenience: enforce attrs then (safely) resume — used on mount/visibility
    const enforceMuted = () => {
      enforceAttrs();
      resumeIfPaused();
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

    // On pause, only re-assert the muted/inline attributes — do NOT call play()
    // here. Force-replaying on every pause fights a user's manual pause tap and
    // makes Safari re-paint the center play overlay repeatedly.
    const onPause = () => { enforceAttrs(); };
    document.addEventListener('pause', onPause, true);
    // When the tab becomes visible again it's safe to resume auto-paused videos.
    const onVisible = () => { if (!document.hidden) enforceMuted(); };
    document.addEventListener('visibilitychange', onVisible);

    // Safari blocks autoplay until the first user gesture. Once the user touches
    // or clicks anywhere, retry all paused videos — this is the fix for Safari
    // showing a blank/paused video until the user interacts with the page.
    let gestureUnlocked = false;
    const onGesture = () => {
      if (gestureUnlocked) return;
      gestureUnlocked = true;
      enforceMuted();
      // Remove after first gesture — no need to fire on every click/tap
      document.removeEventListener('touchstart', onGesture, true);
      document.removeEventListener('click', onGesture, true);
    };
    document.addEventListener('touchstart', onGesture, { capture: true, passive: true });
    document.addEventListener('click', onGesture, { capture: true, passive: true });

    // First-load race: the muted property may not be set before Safari's initial
    // autoplay decision, so re-enforce a few times right after mount.
    const ticks = [100, 300, 800, 1500].map((ms) => window.setTimeout(enforceMuted, ms));

    return () => {
      observer.disconnect();
      document.removeEventListener('play', onPlay, true);
      document.removeEventListener('pause', onPause, true);
      document.removeEventListener('visibilitychange', onVisible);
      document.removeEventListener('touchstart', onGesture, true);
      document.removeEventListener('click', onGesture, true);
      ticks.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
