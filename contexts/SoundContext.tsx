'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface SoundContextValue {
  soundOn: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/sound.mp3');
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleSound = () => {
    setSoundOn(v => {
      const next = !v;
      if (next) {
        audioRef.current?.play().catch(console.error);
      } else {
        audioRef.current?.pause();
      }
      return next;
    });
  };

  return (
    <SoundContext.Provider value={{ soundOn, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSoundContext must be used inside SoundProvider');
  return ctx;
}
