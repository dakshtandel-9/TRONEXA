import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Web Development — TRONEXA | Powerful Digital Experiences',
  description:
    'TRONEXA delivers modern, responsive, and high-performance web development solutions — from corporate websites and eCommerce to SaaS platforms and enterprise applications.',
};

const data: ServicePageData = {
  num: '01',
  label: 'Web Development',
  heroHeading: 'Build Powerful\nDigital Experiences',
  heroDesc:
    'TRONEXA delivers modern web development solutions designed to help businesses establish a strong digital presence, improve customer engagement, and accelerate growth. We create responsive, scalable, and high-performance websites and web applications tailored to business objectives and user expectations.',
  overview:
    'From corporate websites and enterprise platforms to SaaS products and eCommerce solutions, our team combines innovative design with robust engineering to build digital experiences that perform seamlessly across devices. We build with modern frameworks like React, Next.js, and Node.js, backed by secure databases and cloud infrastructure, and structured metadata, canonical URLs, and OpenGraph tags baked in for SEO. Every solution is optimized for speed, security, scalability, and long-term growth.',
  deliverablesLabel: 'Web Capabilities',
  deliverablesHeading: 'Full-spectrum web engineering\nfrom front end to cloud',
  deliverables: [
    { num: '01', title: 'Front-End Development', desc: 'Responsive, visually polished interfaces with smooth navigation, interactive elements, and pixel-perfect rendering across every screen size — built with React, Next.js, and modern CSS for fast, accessible user experiences.' },
    { num: '02', title: 'Back-End Development', desc: 'Secure server-side systems, databases, APIs, and business logic engineered for reliability — with authentication, role-based access, input validation, and clean architecture that scales as your traffic and data grow.' },
    { num: '03', title: 'Full-Stack Development', desc: 'Complete front-end and back-end solutions delivered by one team — ensuring tight integration, consistent quality, and a single point of accountability for scalable, high-performing web applications.' },
    { num: '04', title: 'E-Commerce Development', desc: 'Secure online stores with payment gateway integration, product and inventory management, promotional tooling, and conversion-optimized checkout flows that turn visitors into loyal customers.' },
    { num: '05', title: 'CMS Development', desc: 'Easy-to-manage websites built on flexible content management systems — empowering your team to update content, launch campaigns, and publish pages without writing a single line of code.' },
    { num: '06', title: 'Custom Web Applications', desc: 'Tailored applications such as dashboards, booking systems, customer portals, and internal automation tools — designed precisely around your workflows to eliminate manual effort and inefficiency.' },
    { num: '07', title: 'Enterprise Web Solutions', desc: 'Secure, scalable enterprise applications including CRM, ERP front-ends, and workflow systems — engineered for high availability, governance, and integration with your existing technology stack.' },
    { num: '08', title: 'SaaS Platforms', desc: 'Cloud-based, multi-tenant software platforms with secure subscription access, usage analytics, billing integration, and architecture built to support thousands of concurrent users.' },
    { num: '09', title: 'API Development & Integration', desc: 'Robust REST and GraphQL APIs that connect your website with third-party platforms, payment systems, CRMs, and cloud services — creating a seamless, unified digital ecosystem.' },
    { num: '10', title: 'Website Optimization & Maintenance', desc: 'Ongoing updates, bug fixing, security monitoring, and Core Web Vitals optimization — keeping your site fast, secure, and aligned with the latest standards long after launch.' },
  ],
  whyPoints: [
    { title: 'Modern Technology Stack', desc: 'We build with the latest frameworks and tools — React, Next.js, Node.js, and more — ensuring your solution stays current and maintainable.' },
    { title: 'SEO Optimized Architecture', desc: 'Every website is built with SEO best practices baked in, from structured data and Core Web Vitals to clean URL structures and meta management.' },
    { title: 'Scalable Infrastructure', desc: 'Our architectures are designed to grow with your business — handling increased traffic, data, and features without costly rewrites.' },
    { title: 'Secure Development Practices', desc: 'Security is embedded at every layer — from input validation and authentication to HTTPS enforcement and regular vulnerability audits.' },
    { title: 'Performance-Focused Approach', desc: 'We obsess over load times, rendering efficiency, and user experience metrics to ensure your site performs flawlessly under real conditions.' },
  ],
  cta: 'Start Your Web Project',
};

export default function WebDevelopmentPage() {
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
