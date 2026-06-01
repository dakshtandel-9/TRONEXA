import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import AboutContent from '@/components/AboutContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'About TRONEXA — Global Technology & Digital Transformation Partner',
  description:
    'Learn about TRONEXA — a global technology company delivering intelligent digital solutions across Web, AI, Cloud, Mobile, IoT, and enterprise services.',
};

export default function AboutPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <AboutContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
