import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import ProjectShowcaseContent, { ProjectShowcaseData } from '@/components/ProjectShowcaseContent';

export const metadata: Metadata = {
  title: 'App Development — TRONEXA | High-Performance Mobile Applications Case Study',
  description:
    'How Tronexa built scalable, cross-platform mobile applications for modern enterprises — featuring real-time notifications, secure authentication, payment integration, GPS, and offline support.',
};

const data: ProjectShowcaseData = {
  category: 'App Development',
  heroTitle: 'Scalable Mobile Solutions\nFor Modern Enterprises',
  heroDesc: 'How Tronexa transformed business ideas into high-performance mobile applications — combining intuitive UI/UX design, robust architecture, and modern technology to deliver mobile experiences built for long-term success.',
  heroTags: [
    { label: 'Category', value: 'App Development' },
    { label: 'Platforms', value: 'Android & iOS' },
    { label: 'Stack', value: 'Flutter · React Native · Node.js' },
  ],
  introTitle: 'Mobile-first experiences that drive measurable outcomes',
  introParagraphs: [
    'In today\'s mobile-first world, businesses need applications that not only look great but also deliver exceptional user experiences and measurable business outcomes. Tronexa specializes in designing and developing custom mobile applications that help organizations streamline operations, engage customers, and accelerate growth.',
    'Our team combines strategic planning, intuitive UI/UX design, robust development practices, and scalable architecture to create mobile applications that perform seamlessly across devices. Whether it\'s a customer-facing platform, an enterprise solution, or a startup MVP, Tronexa delivers mobile experiences built for long-term success.',
    'By leveraging modern technologies and industry best practices, we help businesses transform their ideas into powerful digital products that drive real value.',
  ],
  problemTitle: 'The barriers limiting mobile business growth',
  problemIntro: 'Many businesses struggle to meet growing customer expectations due to outdated systems, disconnected processes, and the absence of a strong mobile presence — missing opportunities to improve satisfaction, revenue, and competitive advantage.',
  problems: [
    'Limited customer engagement due to lack of mobile accessibility — keeping businesses invisible to a growing mobile-first consumer base',
    'Manual business processes causing inefficiencies, operational delays, and reduced team productivity',
    'Poor user experience leading to low customer retention rates and high app abandonment',
    'Difficulty scaling existing digital solutions to accommodate rapid user and revenue growth',
    'Lack of real-time data access and communication capabilities slowing decision-making and responsiveness',
  ],
  solutionTitle: 'How Tronexa built the mobile solution',
  solutionIntro: 'Tronexa developed custom mobile applications tailored to business objectives, user needs, and future scalability requirements — delivering a high-performing app that streamlined operations and provided a strong foundation for future expansion.',
  solutions: [
    'Designed intuitive and user-friendly mobile interfaces for enhanced engagement across all user segments',
    'Implemented scalable backend architecture on AWS to support growing user bases without performance degradation',
    'Enabled real-time notifications, in-app messaging, and data synchronization across devices',
    'Integrated third-party services, payment gateways, analytics tools, and location services seamlessly',
    'Optimized performance, security, and responsiveness across Android and iOS devices at every screen size',
  ],
  featuresTitle: 'Everything built into the application',
  featuresSubtitle: 'A comprehensive suite of mobile capabilities designed to maximize user engagement, operational efficiency, and business growth.',
  features: [
    { title: 'Cross-Platform Compatibility', desc: 'Seamless performance across Android and iOS devices — one codebase, multiple platforms, zero compromise on quality or user experience.' },
    { title: 'User Authentication & Role Management', desc: 'Secure login, registration, and access controls — supporting JWT, OAuth 2.0, Firebase Authentication, and role-based permission structures.' },
    { title: 'Real-Time Notifications', desc: 'Push notifications for instant user communication — keeping audiences engaged and informed with timely, targeted messaging across all devices.' },
    { title: 'Interactive Dashboard', desc: 'Personalized dashboards with real-time information and insights — giving users and administrators complete visibility into key data and actions.' },
    { title: 'Advanced Search & Filters', desc: 'Quick access to relevant content and services through intelligent search, filtering, and sorting capabilities built for scale.' },
    { title: 'In-App Messaging', desc: 'Secure communication between users and administrators — fully integrated with real-time delivery, read receipts, and notification support.' },
    { title: 'Payment Gateway Integration', desc: 'Support for secure online transactions via Stripe, Razorpay, and PayPal — fully PCI-compliant and optimized for conversion.' },
    { title: 'GPS & Location Services', desc: 'Location tracking, mapping, and geo-based features — enabling delivery tracking, store finders, proximity alerts, and geo-personalization.' },
    { title: 'Cloud Data Synchronization', desc: 'Real-time syncing across multiple devices and platforms — ensuring users always have the latest data regardless of access point.' },
    { title: 'Analytics & Reporting', desc: 'User behavior tracking and business performance insights — powered by Google Analytics, Firebase Analytics, and Mixpanel.' },
    { title: 'Offline Mode Support', desc: 'Access to key features even without internet connectivity — ensuring continuity of service in low-connectivity environments.' },
    { title: 'Mobile Security Framework', desc: 'Data encryption, secure API architecture, and role-based access control — protecting user data across every layer of the application.' },
    { title: 'Multi-Language Support', desc: 'Enhanced accessibility for global audiences — localized interfaces and content for diverse user communities across regions.' },
    { title: 'Admin Control Panel', desc: 'Centralized management of users, content, and business operations from a single, powerful administrative interface.' },
    { title: 'Responsive UI/UX Design', desc: 'Optimized experiences across various screen sizes and devices — pixel-perfect layouts that adapt beautifully to every form factor.' },
  ],
  techStackIntro: 'Tronexa utilized a modern and scalable technology stack to ensure performance, security, and future-ready capabilities across Android and iOS platforms.',
  techStack: [
    { label: 'Platform', value: 'Android & iOS Mobile Applications' },
    { label: 'Frontend', value: 'Flutter, React Native, Swift, Kotlin' },
    { label: 'Backend', value: 'Node.js, Express.js, NestJS' },
    { label: 'Database', value: 'PostgreSQL, MySQL, MongoDB, Firebase Firestore' },
    { label: 'Cloud Services', value: 'AWS, Google Cloud Platform, Microsoft Azure' },
    { label: 'Authentication', value: 'JWT, OAuth 2.0, Firebase Authentication' },
    { label: 'APIs & Integrations', value: 'REST APIs, GraphQL, Third-Party Service Integrations' },
    { label: 'Payment Gateway', value: 'Stripe, Razorpay, PayPal' },
    { label: 'Analytics', value: 'Google Analytics, Firebase Analytics, Mixpanel' },
    { label: 'Security', value: 'SSL Encryption, Secure API Architecture, Role-Based Access Control' },
    { label: 'CDN', value: 'Cloudflare CDN, AWS CloudFront' },
    { label: 'DevOps & CI/CD', value: 'GitHub Actions, Docker, Kubernetes, Bitbucket Pipelines' },
  ],
  hostingTitle: 'Enterprise-grade cloud\nfor maximum reliability',
  hostingIntro: 'To ensure reliability, scalability, and high availability, Tronexa deployed the application using enterprise-grade cloud infrastructure with auto-scaling, CDN integration, and 24/7 monitoring.',
  hosting: [
    { label: 'Primary Cloud', value: 'AWS Cloud Hosting Infrastructure' },
    { label: 'Secondary Cloud', value: 'Google Cloud Platform Deployment' },
    { label: 'Scaling', value: 'Auto-Scaling Server Configuration' },
    { label: 'Database', value: 'Cloud Database Hosting & Backup Management' },
    { label: 'CDN', value: 'Global Content Delivery via CloudFront & Cloudflare' },
    { label: 'Security', value: 'SSL Security & DDoS Protection' },
    { label: 'Recovery', value: 'Disaster Recovery & Automated Backup Systems' },
    { label: 'Monitoring', value: '24/7 Infrastructure Monitoring & Alerting' },
  ],
  teamTitle: 'A dedicated cross-functional\ndevelopment team',
  teamIntro: 'Tronexa provided a dedicated cross-functional team to ensure successful planning, development, deployment, and post-launch support — working closely with stakeholders for transparent communication and timely delivery.',
  team: [
    { role: 'Business Analysts', desc: 'Requirement gathering, user story mapping, and solution planning aligned with business goals' },
    { role: 'UI/UX Designers', desc: 'Intuitive user experiences, mobile interface design, and accessibility-focused interaction design' },
    { role: 'Mobile Developers', desc: 'Native Android and iOS development, cross-platform Flutter and React Native engineering' },
    { role: 'Backend Engineers', desc: 'Scalable API development, database architecture, and third-party service integrations' },
    { role: 'QA Engineers', desc: 'Performance, security, usability, and cross-device testing across all platform variants' },
    { role: 'DevOps Specialists', desc: 'Deployment automation, CI/CD pipelines, infrastructure management, and monitoring' },
  ],
  maintenanceTitle: 'Ongoing optimization after\nevery release',
  maintenanceIntro: 'Following deployment, Tronexa provided ongoing maintenance and support services to ensure application stability, security, and performance across all platforms and OS versions.',
  maintenance: [
    'Regular updates introducing new features, UI improvements, and performance enhancements based on user feedback',
    'Security vulnerability assessments and patching to maintain compliance and protect user data',
    'Compatibility maintenance for latest Android and iOS releases and new device form factors',
    'Continuous performance monitoring and optimization to maximize uptime and responsiveness',
    'Proactive issue resolution and rapid incident response to minimize user impact',
  ],
  conclusionTitle: 'Powerful, scalable apps\nthat deliver real results',
  conclusionParagraphs: [
    'Tronexa successfully transformed business requirements into a powerful, scalable, and user-centric mobile application that delivered measurable results. By combining innovative design, robust development practices, and modern technology, we created a solution that enhanced customer engagement, streamlined operations, and supported long-term business growth.',
    'Our end-to-end approach — from strategy and design to deployment and maintenance — ensured the application remained secure, reliable, and adaptable to future demands. Through continuous collaboration and technical excellence, Tronexa empowered businesses to strengthen their digital presence and achieve sustainable success in an increasingly mobile-driven world.',
  ],
};

export default function AppDevelopmentProjectPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <ProjectShowcaseContent data={data} />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
