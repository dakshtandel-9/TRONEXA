import ScrollSequence from '@/components/ScrollSequence';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import BottomBar from '@/components/BottomBar';
import ProgressBar from '@/components/ProgressBar';
import ScrollSections from '@/components/ScrollSections';
import BorderFrame from '@/components/BorderFrame';

export default function Home() {
  return (
    <main style={{ background: 'transparent' }}>
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
      <div style={{ height: '2600vh', position: 'relative', background: 'transparent' }}>
        <ScrollSections />
      </div>
    </main>
  );
}
