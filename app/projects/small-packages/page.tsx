import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import SmallPackagesContent from '@/components/SmallPackagesContent';

export const metadata: Metadata = {
  title: 'Small Packages — TRONEXA | Shopify Gift Platform Case Study',
  description:
    'How Tronexa built a premium Shopify gift curation and box-builder platform for Small Packages — serving both retail shoppers and corporate clients with a seamless gifting experience.',
};

export default function SmallPackagesPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <SmallPackagesContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
