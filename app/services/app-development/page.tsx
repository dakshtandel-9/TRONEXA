import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'App Development — TRONEXA | Mobile Experiences Built For Growth',
  description:
    'TRONEXA develops intelligent Android, iOS, and cross-platform mobile applications with intuitive interfaces, secure architectures, and scalable infrastructure.',
};

const data: ServicePageData = {
  num: '02',
  label: 'App Development',
  heroHeading: 'Mobile Experiences\nBuilt For Growth',
  heroDesc:
    'TRONEXA develops intelligent mobile applications that help businesses connect with customers, streamline operations, and create seamless digital experiences across devices.',
  overview:
    'We specialize in building Android, iOS, and cross-platform applications with intuitive interfaces, secure architectures, and scalable infrastructures. Whether you\'re launching a startup product or modernizing enterprise operations, our mobile solutions are built for performance and long-term success.',
  deliverables: [
    { num: '01', title: 'Android App Development', desc: 'Building scalable Android applications with smooth functionality and seamless user experiences.' },
    { num: '02', title: 'iOS App Development', desc: 'Creating secure and high-performance applications for Apple devices with intuitive designs.' },
    { num: '03', title: 'Cross-Platform Applications', desc: 'Developing apps that function seamlessly across multiple operating systems using React Native and Flutter.' },
    { num: '04', title: 'Enterprise Mobility Solutions', desc: 'Building secure business applications to improve productivity and streamline enterprise operations.' },
    { num: '05', title: 'E-Commerce Applications', desc: 'Building feature-rich shopping applications with secure payments and product management.' },
    { num: '06', title: 'SaaS Applications', desc: 'Building cloud-based software applications with scalable and secure infrastructure.' },
    { num: '07', title: 'API & Backend Development', desc: 'Developing secure backend systems and integrating third-party APIs for seamless connectivity.' },
    { num: '08', title: 'Mobile UI/UX Design', desc: 'Designing intuitive interfaces and seamless experiences for better usability and engagement.' },
    { num: '09', title: 'App Maintenance & Support', desc: 'Providing regular updates, bug fixes, optimization, and technical support post-launch.' },
    { num: '10', title: 'Progressive Web Apps', desc: 'Creating app-like web experiences with offline accessibility and improved performance.' },
  ],
  whyPoints: [
    { title: 'Native & Cross-Platform Expertise', desc: 'We build for every platform — native Android, native iOS, and cross-platform — choosing the best approach for your performance and budget goals.' },
    { title: 'User-Centered Design', desc: 'Our design process is grounded in real user research, ensuring every interaction is intuitive, accessible, and delightful.' },
    { title: 'Secure Development Process', desc: 'From authentication and data encryption to API security and app store compliance, security is built into every layer of our development.' },
    { title: 'Agile Delivery Model', desc: 'We deliver in short sprints with continuous feedback loops, keeping you in control and enabling rapid iteration based on real usage data.' },
    { title: 'Enterprise-Grade Performance', desc: 'Our apps are optimized for speed, stability, and scalability — capable of handling millions of users without degradation.' },
  ],
  cta: 'Build Your App',
};

export default function AppDevelopmentPage() {
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
