import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import ProjectShowcaseContent, { ProjectShowcaseData } from '@/components/ProjectShowcaseContent';

export const metadata: Metadata = {
  title: 'CRM Solutions — TRONEXA | Centralized Customer Management Platform Case Study',
  description:
    'How Tronexa built a custom CRM platform that centralizes customer data, automates sales workflows, and delivers real-time business insights — driving revenue growth and operational excellence.',
};

const data: ProjectShowcaseData = {
  category: 'CRM Solutions',
  heroTitle: 'Intelligent CRM Platform\nFor Business Growth',
  heroDesc: 'How Tronexa built a centralized Customer Relationship Management platform that unified customer data, automated workflows, and empowered sales, marketing, and support teams to drive exceptional customer experiences.',
  heroTags: [
    { label: 'Category', value: 'CRM Solutions' },
    { label: 'Type', value: 'Web & Mobile CRM' },
    { label: 'Stack', value: 'React · Node.js · PostgreSQL' },
  ],
  introTitle: 'A unified platform for every customer interaction',
  introParagraphs: [
    'In today\'s competitive business environment, managing customer relationships effectively is essential for driving sales, improving customer satisfaction, and achieving sustainable growth. Many organizations struggle with fragmented customer data, disconnected communication channels, and inefficient sales processes that limit their ability to deliver exceptional customer experiences.',
    'Tronexa specializes in developing customized CRM solutions that centralize customer information, automate workflows, and provide actionable business insights. Our CRM platforms empower sales, marketing, and customer support teams with the tools they need to build stronger customer relationships and improve operational efficiency.',
    'By combining automation, analytics, and seamless integrations, Tronexa delivers CRM solutions that help businesses streamline operations, increase revenue, and create personalized customer experiences at scale.',
  ],
  problemTitle: 'Fragmented data and missed opportunities',
  problemIntro: 'Many businesses face challenges in managing customer interactions efficiently due to scattered data, manual processes, and lack of visibility into customer journeys — resulting in lower retention and missed revenue.',
  problems: [
    'Customer information stored across multiple systems and spreadsheets — creating data inconsistencies and team inefficiency',
    'Inefficient lead tracking and sales pipeline management causing missed opportunities and slow conversion cycles',
    'Lack of centralized communication and customer interaction history preventing personalized, informed engagement',
    'Limited visibility into customer behavior and business opportunities leading to reactive rather than proactive strategies',
    'Manual reporting processes resulting in delayed decision-making and inaccurate performance insights',
  ],
  solutionTitle: 'How Tronexa built the CRM platform',
  solutionIntro: 'Tronexa developed a centralized CRM platform designed to streamline customer management, automate processes, and improve team collaboration — empowering teams to manage relationships more effectively and make data-driven decisions.',
  solutions: [
    'Implemented a centralized customer database with complete interaction history, communication logs, and relationship timeline',
    'Automated lead management and sales pipeline tracking workflows to eliminate manual status updates',
    'Integrated communication channels including email, calls, SMS, and support tickets into a single customer view',
    'Enabled real-time analytics and reporting dashboards for pipeline health, team performance, and revenue forecasting',
    'Developed role-based access controls and workflow automation to streamline approvals and inter-team handoffs',
  ],
  featuresTitle: 'The complete CRM platform delivered',
  featuresSubtitle: 'A comprehensive suite of CRM capabilities designed to improve customer engagement, sales performance, and operational efficiency.',
  features: [
    { title: 'Customer Management Dashboard', desc: 'Centralized view of all customer information and activities — giving teams complete context for every customer relationship.' },
    { title: 'Lead Capture & Management', desc: 'Automated lead collection, assignment, and tracking — capturing prospects from web forms, emails, and integrations automatically.' },
    { title: 'Sales Pipeline Tracking', desc: 'Visual sales funnel with deal stage management — tracking opportunities, forecasting revenue, and identifying bottlenecks.' },
    { title: 'Contact Management', desc: 'Organized storage of customer profiles, communications, and history — a comprehensive, searchable record of every interaction.' },
    { title: 'Task & Activity Management', desc: 'Scheduling, reminders, and follow-up tracking — ensuring no customer interaction falls through the cracks.' },
    { title: 'Email Integration', desc: 'Seamless email communication and activity logging — connecting Gmail, Outlook, and SMTP to automatically capture correspondence.' },
    { title: 'Call Tracking & Notes', desc: 'Record customer conversations and interaction history — maintaining a complete timeline of every touchpoint with every customer.' },
    { title: 'Marketing Campaign Management', desc: 'Track campaign performance and customer engagement — measuring marketing impact against pipeline and revenue outcomes.' },
    { title: 'Customer Support Ticketing', desc: 'Centralized support request management and resolution tracking — linking issues directly to customer profiles.' },
    { title: 'Workflow Automation', desc: 'Automated tasks, notifications, and approval processes — eliminating manual handoffs and ensuring consistent responses.' },
    { title: 'Real-Time Analytics Dashboard', desc: 'Performance monitoring and business intelligence — tracking sales performance, pipeline health, and team productivity.' },
    { title: 'Document Management', desc: 'Secure storage and sharing of customer-related documents — contracts, proposals, and correspondence accessible in context.' },
    { title: 'Multi-User Role Management', desc: 'Access controls for sales, support, marketing, and management — ensuring appropriate visibility at every level.' },
    { title: 'Mobile CRM Access', desc: 'Manage customer relationships from any device — a fully featured mobile CRM keeping field teams connected.' },
    { title: 'Third-Party Integrations', desc: 'ERP, accounting, payment gateways, Twilio, SendGrid, and WhatsApp Business API — seamlessly connected.' },
  ],
  techStackIntro: 'Tronexa utilized a modern technology stack to build a scalable, secure, and high-performance CRM solution with real-time analytics, communication integrations, and mobile accessibility.',
  techStack: [
    { label: 'Platform', value: 'Web-Based CRM & Mobile CRM Applications' },
    { label: 'Frontend', value: 'React.js, Angular, Vue.js, Flutter' },
    { label: 'Backend', value: 'Node.js, Express.js, NestJS, .NET Core' },
    { label: 'Database', value: 'PostgreSQL, MySQL, MongoDB' },
    { label: 'Authentication', value: 'JWT, OAuth 2.0, Single Sign-On (SSO)' },
    { label: 'APIs & Integrations', value: 'REST APIs, GraphQL, Third-Party Integrations' },
    { label: 'Communication Services', value: 'Twilio, SendGrid, SMTP, WhatsApp Business API' },
    { label: 'Analytics', value: 'Power BI, Google Analytics, Custom Reporting Dashboards' },
    { label: 'Security', value: 'SSL Encryption, Role-Based Access Control, Data Protection' },
    { label: 'Cloud Services', value: 'AWS, Microsoft Azure, Google Cloud Platform' },
    { label: 'DevOps', value: 'Docker, Kubernetes, CI/CD Pipelines' },
    { label: 'CDN', value: 'Cloudflare, AWS CloudFront' },
  ],
  hostingTitle: 'Reliable, secure cloud hosting\nfor all customer data',
  hostingIntro: 'To ensure reliability, scalability, and secure access, Tronexa deployed the CRM solution using enterprise-grade cloud infrastructure with automated backup, auto-scaling, and 24/7 monitoring.',
  hosting: [
    { label: 'Primary Cloud', value: 'AWS Cloud Hosting Infrastructure' },
    { label: 'Secondary Cloud', value: 'Microsoft Azure CRM Deployment' },
    { label: 'Additional Support', value: 'Google Cloud Platform Support' },
    { label: 'Availability', value: 'High Availability Server Architecture' },
    { label: 'Data', value: 'Automated Data Backup & Recovery Systems' },
    { label: 'Security', value: 'SSL Security & End-to-End Data Encryption' },
    { label: 'Scaling', value: 'Auto-Scaling Infrastructure for Growing User Bases' },
    { label: 'Monitoring', value: '24/7 Performance Monitoring and Management' },
  ],
  teamTitle: 'A dedicated CRM implementation\nand support team',
  teamIntro: 'Tronexa provided a dedicated CRM team to ensure successful delivery, adoption, and long-term optimization — working closely with stakeholders for smooth implementation and maximum platform value.',
  team: [
    { role: 'Business Analysts', desc: 'Process mapping, requirement gathering, and sales workflow analysis aligned with business objectives' },
    { role: 'CRM Solution Architects', desc: 'System design, data modeling, and CRM workflow planning for scalability and usability' },
    { role: 'Frontend & Backend Developers', desc: 'Platform development, API integrations, and custom module implementation' },
    { role: 'QA Engineers', desc: 'Functional, security, and performance testing across all CRM components and integrations' },
    { role: 'DevOps Specialists', desc: 'Deployment automation, monitoring, and cloud infrastructure management' },
    { role: 'Training & Support', desc: 'User onboarding, platform training, and post-launch continuous improvement support' },
  ],
  maintenanceTitle: 'Ongoing evolution as\nbusiness needs change',
  maintenanceIntro: 'Following deployment, Tronexa provided ongoing CRM maintenance to ensure platform stability, security, and performance — with regular updates, workflow improvements, and continuous optimization.',
  maintenance: [
    'Regular updates introducing new features, workflow improvements, and UI enhancements based on user feedback',
    'Security assessments and access control updates to maintain data protection and compliance standards',
    'Compatibility maintenance for integrated systems — ensuring CRM remains synchronized with connected platforms',
    'Performance tuning and database optimization as customer data volumes and user bases grow',
    'Continuous monitoring and proactive issue resolution to maximize platform uptime and reliability',
  ],
  conclusionTitle: 'Stronger customer relationships\nand sustainable revenue growth',
  conclusionParagraphs: [
    'Tronexa successfully delivered a powerful CRM solution that transformed how businesses manage customer relationships, sales processes, and operational workflows. By centralizing customer data, automating routine tasks, and providing actionable insights, the platform enabled organizations to improve productivity, strengthen customer engagement, and increase revenue opportunities.',
    'The solution empowered teams with greater visibility, improved collaboration, and streamlined processes that supported long-term business growth. Through strategic planning, modern technology implementation, and ongoing support, Tronexa helped businesses build stronger customer relationships and achieve sustainable success in an increasingly competitive marketplace.',
  ],
};

export default function CRMSolutionsProjectPage() {
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
