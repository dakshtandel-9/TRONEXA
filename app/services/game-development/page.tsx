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
    'Our game development team builds interactive and visually compelling games for mobile, desktop, web, AR, and VR environments using Unity and Unreal Engine. From concept design, art direction, and gameplay mechanics to multiplayer networking, deployment, and live-ops optimization, we deliver gaming experiences that maximize engagement, retention, and monetization across every platform.',
  deliverablesLabel: 'Game Capabilities',
  deliverablesHeading: 'Immersive games across\nevery platform and engine',
  deliverables: [
    { num: '01', title: '2D Game Development', desc: 'Engaging 2D games with smooth animations, responsive controls, and tight, optimized performance — from casual mobile titles to narrative-driven side-scrollers built to delight and retain players.' },
    { num: '02', title: '3D Game Development', desc: 'Immersive 3D games with realistic graphics, richly detailed environments, and dynamic gameplay — engineered for visual impact and consistent frame rates across target hardware.' },
    { num: '03', title: 'Mobile Game Development', desc: 'Optimized games for Android and iOS with seamless performance, efficient battery use, and monetization-ready architecture supporting in-app purchases, ads, and live events.' },
    { num: '04', title: 'PC Game Development', desc: 'High-performance desktop titles with engaging mechanics, immersive storytelling, and rich visuals — built to take full advantage of modern PC hardware.' },
    { num: '05', title: 'Multiplayer Games', desc: 'Real-time multiplayer experiences with secure, low-latency networking, matchmaking, and backends architected to support thousands of concurrent players without degradation.' },
    { num: '06', title: 'AR/VR Experiences', desc: 'Immersive augmented and virtual reality games with advanced spatial interactions, motion tracking, and presence-driven design for headsets and AR-capable devices.' },
    { num: '07', title: 'Unity Development', desc: 'Scalable, visually appealing games built in Unity for true cross-platform compatibility — one codebase deployed across mobile, desktop, console, and web.' },
    { num: '08', title: 'Unreal Engine Development', desc: 'Advanced games with photorealistic visuals and high performance using Unreal Engine — leveraging cutting-edge rendering, physics, and cinematic tooling.' },
    { num: '09', title: 'Simulation Games', desc: 'Simulation-based games for training, education, and entertainment — accurately modeling real-world systems and behaviors for both learning and immersive play.' },
    { num: '10', title: 'Gamification Solutions', desc: 'Game mechanics integrated into apps and platforms — points, rewards, leaderboards, and progression systems that boost engagement, loyalty, and user interaction.' },
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
