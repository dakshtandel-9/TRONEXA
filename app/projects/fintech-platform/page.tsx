import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import FinTechContent from '@/components/FinTechContent';

export const metadata: Metadata = {
  title: 'FinTech Platform — TRONEXA | Secure & Scalable Digital Financial Ecosystem',
  description:
    'How Tronexa built a next-generation FinTech platform with digital wallets, P2P transfers, multi-payment integration, real-time processing, fraud detection, and PCI-DSS compliant infrastructure.',
};

export default function FinTechPlatformPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <FinTechContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
