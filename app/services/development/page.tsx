import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import DevelopmentContent from '@/components/DevelopmentContent';

export const metadata: Metadata = {
  title: 'Development — TRONEXA | Web, App & Game Development',
  description:
    'TRONEXA delivers end-to-end development solutions — modern websites, scalable mobile apps, and immersive gaming experiences built for growth.',
};

export default function DevelopmentPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <DevelopmentContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
