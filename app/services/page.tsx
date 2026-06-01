import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicesContent from '@/components/ServicesContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Services — TRONEXA | End-to-End Technology Solutions',
  description:
    'TRONEXA provides innovative, scalable technology solutions across Web, App, AI, IoT, Cloud, CRM, ServiceNow, QA, Digital Marketing, Game Development, and Staffing.',
};

export default function ServicesPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <ServicesContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
