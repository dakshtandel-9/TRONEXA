import ScrollSequence from '@/components/ScrollSequence';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import BottomBar from '@/components/BottomBar';
import ProgressBar from '@/components/ProgressBar';
import ScrollSections from '@/components/ScrollSections';
import BorderFrame from '@/components/BorderFrame';
import CustomCursor from '@/components/CustomCursor';
import ScrollController from '@/components/ScrollController';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export default function Home() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: 'transparent' }}>
          <CustomCursor />
          <ScrollController />

          {/* Fixed canvas — z-index: -1 */}
          <ScrollSequence />

          {/* Viewport border frame — chamfered corners via SVG polygon */}
          <BorderFrame />

          {/* Fixed UI chrome */}
          <Navbar />
          <Sidebar />
          <ProgressBar />
          <BottomBar />

          {/* Scroll container — 2000vh drives the slow scroll animation with 5 breaks */}
          <div style={{ height: '4000vh', position: 'relative', background: 'transparent' }}>
            <ScrollSections />
          </div>
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
