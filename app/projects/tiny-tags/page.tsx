import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import TinyTagsContent from '@/components/TinyTagsContent';

export const metadata: Metadata = {
  title: 'Tiny Tags® — TRONEXA | Shopify E-Commerce Case Study',
  description:
    'How Tronexa built a high-converting Shopify e-commerce platform for Tiny Tags®, a premium U.S.-based personalized jewelry brand — featuring advanced personalization, mobile-first design, and influencer collaboration pages.',
};

export default function TinyTagsPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <TinyTagsContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
