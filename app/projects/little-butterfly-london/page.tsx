import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import LittleButterflyContent from '@/components/LittleButterflyContent';

export const metadata: Metadata = {
  title: 'Little Butterfly London — TRONEXA | Shopify Baby Skincare Case Study',
  description:
    'How Tronexa built a premium organic baby skincare e-commerce experience on Shopify for Little Butterfly London — with age-segmented collections, trust-first pages, and a seamless mobile checkout.',
};

export default function LittleButterflyPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <LittleButterflyContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
