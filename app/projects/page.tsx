import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ProjectsContent from '@/components/ProjectsContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Projects — TRONEXA | 150+ Successful Digital Projects Worldwide',
  description:
    'Explore TRONEXA\'s portfolio of 150+ delivered projects across web, mobile, AI, cloud, IoT, CRM, and enterprise technologies — spanning USA, UAE, and India.',
};

export default function ProjectsPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <ProjectsContent />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
