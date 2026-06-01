'use client';

import { useEffect, useRef } from 'react';
import { useSoundContext } from '@/contexts/SoundContext';

export default function ClickSound() {
  const { soundOn } = useSoundContext();
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const playClick = () => {
      if (!soundOn) return;

      if (!ctxRef.current) {
        ctxRef.current = new AudioContext();
      }
      const ac = ctxRef.current;

      const osc = ac.createOscillator();
      const gain = ac.createGain();

      osc.connect(gain);
      gain.connect(ac.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ac.currentTime + 0.06);

      gain.gain.setValueAtTime(0.18, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.08);

      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 0.08);
    };

    window.addEventListener('mousedown', playClick);
    return () => window.removeEventListener('mousedown', playClick);
  }, [soundOn]);

  return null;
}
