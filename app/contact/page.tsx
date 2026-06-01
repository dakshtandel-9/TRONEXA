import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ContactContent from '@/components/ContactContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Contact Us — TRONEXA | Let\'s Build Something Great Together',
  description:
    'Get in touch with TRONEXA. Reach our teams in the USA, UAE, and India to discuss your project, explore our services, or start a digital transformation conversation.',
};

export default function ContactPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <ContactContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
