import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'App Development — TRONEXA | Scalable Mobile Applications for Modern Enterprises',
  description:
    'TRONEXA builds high-performance mobile applications for Android, iOS, and cross-platform — with intuitive UI/UX, secure architecture, real-time features, and scalable cloud infrastructure.',
};

const data: ServicePageData = {
  num: '02',
  label: 'App Development',
  heroHeading: 'Transforming Business Ideas\nInto Scalable Mobile Solutions',
  heroDesc:
    'In today\'s mobile-first world, businesses need applications that not only look great but also deliver exceptional user experiences and measurable business outcomes. Tronexa specializes in designing and developing custom mobile applications that help organizations streamline operations, engage customers, and accelerate growth.',
  overview:
    'Our team combines strategic planning, intuitive UI/UX design, robust development practices, and scalable architecture to create mobile applications that perform seamlessly across devices. Whether it\'s a customer-facing platform, an enterprise solution, or a startup MVP, Tronexa delivers mobile experiences built for long-term success.',
  deliverables: [
    { num: '01', title: 'Cross-Platform Compatibility', desc: 'Seamless performance across Android and iOS devices using Flutter and React Native — one codebase, multiple platforms, zero compromise on quality.' },
    { num: '02', title: 'User Authentication & Role Management', desc: 'Secure login, registration, and granular access controls — supporting JWT, OAuth 2.0, Firebase Authentication, and Single Sign-On (SSO) workflows.' },
    { num: '03', title: 'Real-Time Notifications', desc: 'Push notifications for instant user communication — keeping your audience engaged and informed with timely, targeted messaging.' },
    { num: '04', title: 'Interactive Dashboard', desc: 'Personalized dashboards with real-time information and insights — giving users and administrators complete visibility into key data and actions.' },
    { num: '05', title: 'Advanced Search & Filters', desc: 'Quick access to relevant content and services through intelligent search, filtering, and sorting capabilities built for scale and speed.' },
    { num: '06', title: 'In-App Messaging', desc: 'Secure communication between users and administrators — fully integrated into your application with real-time delivery and read receipts.' },
    { num: '07', title: 'Payment Gateway Integration', desc: 'Support for secure online transactions and subscriptions via Stripe, Razorpay, and PayPal — fully PCI-compliant and optimized for conversion.' },
    { num: '08', title: 'GPS & Location Services', desc: 'Location tracking, mapping, and geo-based features — enabling delivery tracking, store finders, proximity alerts, and location-aware personalization.' },
    { num: '09', title: 'Cloud Data Synchronization', desc: 'Real-time syncing across multiple devices and platforms — ensuring users always have the latest data regardless of where they access the application.' },
    { num: '10', title: 'Analytics & Reporting', desc: 'User behavior tracking and business performance insights — powered by Google Analytics, Firebase Analytics, and Mixpanel for data-driven decision-making.' },
    { num: '11', title: 'Offline Mode Support', desc: 'Access to key features even without internet connectivity — ensuring continuity of service and a seamless user experience in low-connectivity environments.' },
    { num: '12', title: 'Admin Control Panel', desc: 'Centralized management of users, content, and business operations — giving administrators full control over the platform from a single, powerful interface.' },
  ],
  whyPoints: [
    { title: 'Native & Cross-Platform Expertise', desc: 'We build for every platform — native Android, native iOS, and cross-platform — choosing the best approach for your performance, timeline, and budget goals.' },
    { title: 'User-Centered Design', desc: 'Our design process is grounded in real user research, ensuring every interaction is intuitive, accessible, and delightful across all screen sizes and devices.' },
    { title: 'Secure Development Process', desc: 'From authentication and data encryption to API security and app store compliance, security is built into every layer of our development process by design.' },
    { title: 'Agile Delivery Model', desc: 'We deliver in short sprints with continuous feedback loops, keeping you in control and enabling rapid iteration based on real usage data and business priorities.' },
    { title: 'Enterprise-Grade Performance', desc: 'Our apps are optimized for speed, stability, and scalability — capable of handling millions of users without degradation in performance or user experience.' },
  ],
  cta: 'Build Your Mobile App',
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
