'use client';

import React from 'react';

// Wraps the Three.js scenes so a WebGL/GPU failure on a device (common on some
// Android WebViews: context creation returns null, GLB decode throws, driver
// crash) can NEVER take down the whole page or freeze the loader. On error we
// simply render the fallback (a plain dark background) and let everything else —
// the loader countdown, the text overlays, the nav — keep working.
export default class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: () => void; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError?: () => void; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // surface the failure so the parent can stop waiting on the scene
    this.props.onError?.();
    if (typeof console !== 'undefined') {
      console.warn('[SceneErrorBoundary] scene failed to render:', error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
