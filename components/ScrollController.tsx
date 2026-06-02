'use client';

import { useEffect, useRef } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';

const TOTAL_SECTIONS = 6;
const AUTO_FRACTION = 0.50; // 50% of each section auto-scrolled
const DURATION = 1400; // ms for the auto-scroll animation
const SCROLL_MULTIPLIER = 0.7; // natural scroll speed — animation advances slowly
const SNAP_DELAY = 350; // ms of scroll inactivity before snapping to next section

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function ScrollController() {
  const { isLoaded } = useLoadingContext();
  const completedRef = useRef<Set<number>>(new Set());
  const isScrollingRef = useRef(false);
  const prevSectionRef = useRef(-1);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastWheelDirRef = useRef<1 | -1>(1);

  useEffect(() => {
    if (!isLoaded) return;

    function getMaxScroll() {
      return document.body.scrollHeight - window.innerHeight;
    }

    function getTarget(sectionIndex: number): number {
      return getMaxScroll() * ((sectionIndex + AUTO_FRACTION) / TOTAL_SECTIONS);
    }

    function getSectionStart(sectionIndex: number): number {
      return getMaxScroll() * (sectionIndex / TOTAL_SECTIONS);
    }

    function getCurrentSection(): number {
      const max = getMaxScroll();
      const progress = max > 0 ? window.scrollY / max : 0;
      return Math.min(TOTAL_SECTIONS - 1, Math.floor(progress * TOTAL_SECTIONS));
    }

    // Single wheel handler: multiplies scroll speed, and blocks during auto-scroll
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrollingRef.current) return;

      lastWheelDirRef.current = e.deltaY >= 0 ? 1 : -1;
      window.scrollBy(0, e.deltaY * SCROLL_MULTIPLIER);

      // Reset snap timer on every wheel event
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      snapTimerRef.current = setTimeout(() => {
        if (isScrollingRef.current) return;
        const section = getCurrentSection();

        // Section 0 (hero): allow free manual + reverse scroll — no forced snapping.
        // onScroll handles auto-scrolling when the user crosses into section 1.
        if (section === 0) return;

        const sectionStart = getSectionStart(section);
        const sectionEnd = getSectionStart(section + 1);
        const midpoint = (sectionStart + sectionEnd) / 2;

        function snapTo(target: number) {
          isScrollingRef.current = true;
          lockExtras();
          animateTo(target, () => {
            unlockExtras();
            isScrollingRef.current = false;
          });
        }

        if (lastWheelDirRef.current > 0 && section < TOTAL_SECTIONS - 1) {
          // Scrolled down: snap to next section (uses existing auto-scroll which goes to 50%)
          animateToSection(section + 1);
        } else if (lastWheelDirRef.current < 0 && window.scrollY > sectionStart) {
          // Scrolled up: snap back to start of current section
          snapTo(sectionStart);
        } else if (window.scrollY > midpoint && section < TOTAL_SECTIONS - 1) {
          snapTo(getSectionStart(section + 1));
        } else {
          snapTo(sectionStart);
        }
      }, SNAP_DELAY);
    };

    const preventTouch = (e: TouchEvent) => { e.preventDefault(); };
    const preventKey = (e: KeyboardEvent) => {
      const blocked = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '];
      if (blocked.includes(e.key)) e.preventDefault();
    };

    function lockExtras() {
      window.addEventListener('touchmove', preventTouch, { passive: false });
      window.addEventListener('keydown', preventKey);
    }

    function unlockExtras() {
      window.removeEventListener('touchmove', preventTouch);
      window.removeEventListener('keydown', preventKey);
    }

    function animateTo(target: number, onDone: () => void) {
      const start = window.scrollY;
      const distance = target - start;
      const t0 = performance.now();

      function tick(now: number) {
        const t = Math.min(1, (now - t0) / DURATION);
        window.scrollTo(0, start + distance * easeInOut(t));
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          window.scrollTo(0, target);
          onDone();
        }
      }

      requestAnimationFrame(tick);
    }

    function animateToSection(sectionIndex: number) {
      if (isScrollingRef.current) return;
      const target = getTarget(sectionIndex);
      if (window.scrollY >= target) return;
      isScrollingRef.current = true;
      completedRef.current.add(sectionIndex);
      lockExtras();
      animateTo(target, () => {
        unlockExtras();
        isScrollingRef.current = false;
        prevSectionRef.current = sectionIndex;
      });
    }

    function triggerAutoScroll(sectionIndex: number) {
      if (completedRef.current.has(sectionIndex)) return;
      animateToSection(sectionIndex);
    }

    function onScroll() {
      if (isScrollingRef.current) return;
      const section = getCurrentSection();
      if (section !== prevSectionRef.current) {
        prevSectionRef.current = section;
        if (!completedRef.current.has(section)) {
          triggerAutoScroll(section);
        }
      }
    }

    // Wheel listener stays active the whole time (handles both lock + multiplier)
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Trigger section 0 auto-scroll immediately after loading
    triggerAutoScroll(0);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      unlockExtras();
    };
  }, [isLoaded]);

  return null;
}
