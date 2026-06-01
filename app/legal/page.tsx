import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import LegalContent from '@/components/LegalContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms — TRONEXA | Legal Information',
  description:
    'Read TRONEXA\'s Privacy Policy and Terms & Conditions. Learn how we collect, use, and protect your data, and the rules governing use of our website and services.',
};

export default function LegalPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <LegalContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
