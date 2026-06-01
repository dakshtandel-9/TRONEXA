import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import TermsContent from '@/components/TermsContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Terms & Conditions — TRONEXA',
  description:
    'Read TRONEXA\'s Terms & Conditions. Understand the rules governing use of our website and services.',
};

export default function TermsPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <TermsContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
