import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'CRM Solutions — TRONEXA | Intelligent Customer Relationship Management Platforms',
  description:
    'TRONEXA builds custom CRM solutions that centralize customer data, automate sales workflows, and deliver actionable insights — empowering sales, marketing, and support teams to grow revenue.',
};

const data: ServicePageData = {
  num: '08',
  label: 'CRM Solutions',
  heroHeading: 'Transforming Customer Relationships\nWith Intelligent CRM',
  heroDesc:
    'In today\'s competitive business environment, managing customer relationships effectively is essential for driving sales, improving customer satisfaction, and achieving sustainable growth. Many organizations struggle with fragmented customer data, disconnected communication channels, and inefficient sales processes.',
  overview:
    'Tronexa specializes in developing customized Customer Relationship Management (CRM) solutions that centralize customer information, automate workflows, and provide actionable business insights. By combining automation, analytics, and seamless integrations, we deliver CRM platforms that help businesses streamline operations, increase revenue, and create personalized customer experiences at scale.',
  deliverablesLabel: 'CRM Capabilities',
  deliverablesHeading: 'Everything you need to manage\ncustomers in one platform',
  deliverables: [
    { num: '01', title: 'Customer Management Dashboard', desc: 'Centralized view of all customer information and activities — giving sales, support, and management teams complete context for every customer relationship in a single, unified interface.' },
    { num: '02', title: 'Lead Capture & Management', desc: 'Automated lead collection, assignment, and tracking — capturing prospects from web forms, emails, and integrations and routing them to the right team members with full interaction history.' },
    { num: '03', title: 'Sales Pipeline Tracking', desc: 'Visual sales funnel with deal stage management — enabling sales teams to track opportunities, forecast revenue, and identify bottlenecks across the entire pipeline in real time.' },
    { num: '04', title: 'Contact Management', desc: 'Organized storage of customer profiles, communications, and history — maintaining a comprehensive, searchable record of every interaction, document, and relationship across the business.' },
    { num: '05', title: 'Task & Activity Management', desc: 'Scheduling, reminders, and follow-up tracking — ensuring no customer interaction falls through the cracks with automated task assignment and priority-based activity management.' },
    { num: '06', title: 'Email Integration', desc: 'Seamless email communication and activity logging — connecting your CRM to Gmail, Outlook, and SMTP to automatically capture all customer correspondence within contact records.' },
    { num: '07', title: 'Marketing Campaign Management', desc: 'Track campaign performance and customer engagement — measuring the impact of email campaigns, social ads, and outreach initiatives against pipeline and revenue outcomes.' },
    { num: '08', title: 'Customer Support Ticketing', desc: 'Centralized support request management and resolution tracking — linking customer issues directly to their CRM profile for a complete view of relationship health and support history.' },
    { num: '09', title: 'Workflow Automation', desc: 'Automated tasks, notifications, and approval processes — eliminating manual handoffs and ensuring consistent, timely responses to customers and internal team members.' },
    { num: '10', title: 'Real-Time Analytics Dashboard', desc: 'Performance monitoring and business intelligence reporting — with customizable dashboards that track sales performance, pipeline health, team productivity, and customer satisfaction metrics.' },
    { num: '11', title: 'Mobile CRM Access', desc: 'Manage customer relationships from any device and location — a fully featured mobile CRM experience that keeps field sales teams and remote workers connected to critical customer data.' },
    { num: '12', title: 'Third-Party Integrations', desc: 'ERP, accounting systems, payment gateways, and external applications — seamless connectivity with Twilio, SendGrid, WhatsApp Business API, and hundreds of business tools your team already uses.' },
  ],
  whyPoints: [
    { title: 'Custom-Built for Your Business', desc: 'Unlike off-the-shelf CRM tools, we build platforms tailored to your specific sales processes, team structure, industry requirements, and integration needs — no unnecessary features, no missing capabilities.' },
    { title: 'Full Sales Funnel Visibility', desc: 'From first contact to closed deal, every stage of the customer journey is tracked and visible — giving leadership accurate pipeline data and giving sales teams the context to close faster.' },
    { title: 'Automation That Actually Works', desc: 'Our workflow automation is built around your real processes — automatically assigning leads, triggering follow-ups, sending notifications, and routing approvals without requiring manual intervention.' },
    { title: 'Seamless System Integration', desc: 'We integrate your CRM with ERP systems, marketing platforms, communication tools, and payment gateways — creating a unified business ecosystem where data flows freely between all departments.' },
    { title: 'Enterprise Security & Compliance', desc: 'Role-based access controls, SSL encryption, and data protection frameworks ensure your customer data is protected — with audit trails and compliance features that meet enterprise and regulatory standards.' },
  ],
  cta: 'Build Your CRM Platform',
};

export default function CRMSolutionsPage() {
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
