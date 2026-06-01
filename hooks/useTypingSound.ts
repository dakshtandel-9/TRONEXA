'use client';

import { useRef } from 'react';

export function useTypingSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  return () => {

    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    const ac = ctxRef.current;
    const now = ac.currentTime;

    // White noise buffer
    const bufferSize = ac.sampleRate * 0.045;
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }

    const source = ac.createBufferSource();
    source.buffer = buffer;

    // Band-pass to give it a mechanical "clack" character
    const bpf = ac.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.value = 1800;
    bpf.Q.value = 0.8;

    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    source.connect(bpf);
    bpf.connect(gain);
    gain.connect(ac.destination);

    source.start(now);
  };
}
