import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Game Development — TRONEXA | Transform Ideas Into Immersive Experiences',
  description:
    'TRONEXA creates engaging 2D, 3D, mobile, PC, AR/VR, and multiplayer gaming experiences using Unity and Unreal Engine across all platforms.',
};

const data: ServicePageData = {
  num: '03',
  label: 'Game Development',
  heroHeading: 'Transform Ideas Into\nImmersive Experiences',
  heroDesc:
    'TRONEXA creates engaging gaming experiences that combine creativity, storytelling, and advanced technology to captivate users across platforms.',
  overview:
    'Our game development team builds interactive and visually compelling games for mobile, desktop, web, AR, and VR environments. From concept design and gameplay mechanics to deployment and optimization, we deliver gaming experiences that maximize engagement and retention.',
  deliverables: [
    { num: '01', title: '2D Game Development', desc: 'Creating engaging 2D games with smooth animations, interactive gameplay, and optimized performance.' },
    { num: '02', title: '3D Game Development', desc: 'Building immersive 3D games with realistic graphics, environments, and gameplay experiences.' },
    { num: '03', title: 'Mobile Game Development', desc: 'Developing optimized mobile games for Android and iOS devices with seamless performance.' },
    { num: '04', title: 'PC Game Development', desc: 'Creating high-performance desktop games with engaging mechanics and immersive storytelling.' },
    { num: '05', title: 'Multiplayer Games', desc: 'Building real-time multiplayer games with secure connectivity and interactive experiences.' },
    { num: '06', title: 'AR/VR Experiences', desc: 'Developing immersive augmented and virtual reality gaming experiences with advanced interactions.' },
    { num: '07', title: 'Unity Development', desc: 'Creating scalable and visually appealing games using Unity for cross-platform compatibility.' },
    { num: '08', title: 'Unreal Engine Development', desc: 'Building advanced games with realistic visuals and high performance using Unreal Engine.' },
    { num: '09', title: 'Simulation Games', desc: 'Developing simulation-based games for training, entertainment, and real-world experiences.' },
    { num: '10', title: 'Gamification Solutions', desc: 'Integrating game mechanics into applications and platforms to boost engagement and interaction.' },
  ],
  whyPoints: [
    { title: 'Creative Game Design', desc: 'Our game designers craft compelling concepts, narratives, and mechanics that keep players engaged from the first session to the hundredth.' },
    { title: 'Cross-Platform Development', desc: 'We build games that run on mobile, desktop, console, and web — reaching the widest possible audience without compromising quality.' },
    { title: 'Advanced Graphics & Animation', desc: 'From 2D pixel art to photorealistic 3D rendering, our artists and engineers deliver visuals that stand out in any market.' },
    { title: 'Multiplayer Infrastructure', desc: 'We architect robust real-time multiplayer backends capable of supporting thousands of concurrent players with low latency.' },
    { title: 'Performance Optimization', desc: 'Every game undergoes rigorous profiling and optimization to ensure smooth frame rates and fast load times across all target devices.' },
  ],
  cta: 'Start Your Game Project',
};

export default function GameDevelopmentPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <ServicePageContent data={data} />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
