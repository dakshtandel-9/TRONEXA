import ScrollSequence from '@/components/ScrollSequence';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import BottomBar from '@/components/BottomBar';
import ScrollSections from '@/components/ScrollSections';
import BorderFrame from '@/components/BorderFrame';
import CustomCursor from '@/components/CustomCursor';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import ClickSound from '@/components/ClickSound';

export default function Home() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: 'transparent' }}>
          <CustomCursor showSoundToggle />
          <ClickSound />

          {/* Fixed canvas background — z-index: -1 */}
          <ScrollSequence />

          {/* Viewport border frame */}
          <BorderFrame />

          {/* Fixed UI chrome */}
          <Navbar />
          <Sidebar />
          <BottomBar />

          {/* Section text overlays — all position:fixed, driven by sectionchange events */}
          <ScrollSections />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
