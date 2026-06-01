import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import CareersContent from '@/components/CareersContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Careers — TRONEXA | Join Our Team and Build the Future of Technology',
  description:
    'Explore open positions at TRONEXA across engineering, design, AI, cloud, marketing, and more. Join a team driven by innovation, growth, and digital excellence.',
};

export default function CareersPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <CareersContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
