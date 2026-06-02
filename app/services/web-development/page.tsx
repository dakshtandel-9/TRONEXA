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
    'From corporate websites and enterprise platforms to SaaS products and eCommerce solutions, our team combines innovative design with robust engineering to build digital experiences that perform seamlessly across devices. Every solution is optimized for speed, security, scalability, and long-term growth.',
  deliverables: [
    { num: '01', title: 'Front-End Development', desc: 'Creating responsive and visually appealing website interfaces with smooth navigation and interactive elements.' },
    { num: '02', title: 'Back-End Development', desc: 'Building secure server-side systems, databases, APIs, and business logic for seamless functionality.' },
    { num: '03', title: 'Full-Stack Development', desc: 'Providing complete front-end and back-end solutions for scalable, high-performing web applications.' },
    { num: '04', title: 'E-Commerce Development', desc: 'Developing secure online stores with payment gateways, product management, and seamless shopping experiences.' },
    { num: '05', title: 'CMS Development', desc: 'Creating easy-to-manage websites using content management systems for effortless updates.' },
    { num: '06', title: 'Custom Web Applications', desc: 'Building tailored web applications such as dashboards, booking systems, portals, and automation tools.' },
    { num: '07', title: 'Enterprise Web Solutions', desc: 'Developing secure and scalable enterprise applications including CRM, ERP, and workflow systems.' },
    { num: '08', title: 'SaaS Platforms', desc: 'Developing cloud-based software platforms with secure, scalable, and subscription-based access.' },
    { num: '09', title: 'API Development & Integration', desc: 'Connecting websites with third-party platforms, payment systems, and cloud services.' },
    { num: '10', title: 'Website Optimization & Maintenance', desc: 'Providing updates, bug fixing, security monitoring, and performance optimization services.' },
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
