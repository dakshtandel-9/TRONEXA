import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'CRM Solutions — TRONEXA | Transform Customer Relationships Into Growth',
  description:
    'TRONEXA delivers CRM consulting, implementation, customization, sales automation, lead management, and analytics solutions for stronger customer relationships.',
};

const data: ServicePageData = {
  num: '10',
  label: 'CRM Solutions',
  heroHeading: 'Transform Customer\nRelationships Into Growth',
  heroDesc:
    'Empower sales, marketing, and customer service teams with intelligent CRM solutions designed to improve engagement and productivity.',
  overview:
    'TRONEXA helps organizations centralize customer data, streamline workflows, and improve sales performance through customized CRM implementations. We build systems that enable businesses to strengthen customer relationships, improve communication, and make smarter business decisions.',
  deliverables: [
    { num: '01', title: 'CRM Consulting', desc: 'Helping businesses choose the right CRM strategy, platform, and implementation roadmap aligned with business goals.' },
    { num: '02', title: 'CRM Implementation', desc: 'Deploying and configuring CRM platforms — Salesforce, HubSpot, Dynamics 365, and others — for your specific workflows.' },
    { num: '03', title: 'CRM Customization', desc: 'Tailoring CRM systems with custom fields, modules, workflows, and dashboards to match your unique business processes.' },
    { num: '04', title: 'Sales Automation', desc: 'Automating lead assignment, follow-up sequences, pipeline management, and deal tracking to improve sales efficiency.' },
    { num: '05', title: 'Customer Journey Management', desc: 'Mapping and automating touchpoints across the entire customer lifecycle to improve retention and satisfaction.' },
    { num: '06', title: 'Lead Management Systems', desc: 'Building intelligent lead capture, scoring, nurturing, and conversion workflows that improve pipeline quality.' },
    { num: '07', title: 'CRM Integrations', desc: 'Connecting CRM systems with websites, marketing tools, ERP platforms, and third-party services for unified data flow.' },
    { num: '08', title: 'Customer Support Workflows', desc: 'Automating case management, ticketing, escalations, and SLA tracking to improve service team performance.' },
    { num: '09', title: 'Reporting & Analytics', desc: 'Building real-time dashboards and custom reports that surface actionable insights across sales, marketing, and service.' },
    { num: '10', title: 'CRM Optimization', desc: 'Auditing and improving existing CRM implementations for better adoption, data quality, and business outcomes.' },
  ],
  whyPoints: [
    { title: 'Customer-Centric Approach', desc: 'We design every CRM system with the end customer experience in mind — ensuring your teams have the context they need at every interaction.' },
    { title: 'Workflow Automation', desc: 'We eliminate manual steps from your sales and service processes — automating routine tasks so your teams can focus on high-value work.' },
    { title: 'Scalable CRM Systems', desc: 'Our CRM implementations are built to grow with your business — handling more users, more data, and more complexity without performance loss.' },
    { title: 'Seamless Integrations', desc: 'We connect your CRM to every tool in your stack — marketing automation, ERP, support platforms, and billing systems — for a single source of truth.' },
    { title: 'Improved Sales Efficiency', desc: 'Our clients consistently see faster deal cycles, better pipeline visibility, and higher conversion rates after our CRM implementations.' },
  ],
  cta: 'Improve Customer Relationships',
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
