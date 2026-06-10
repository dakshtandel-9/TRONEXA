import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'ERP Solutions — TRONEXA | Unified Enterprise Resource Planning',
  description:
    'TRONEXA delivers fully managed ERP services — implementation, configuration, integration, and ongoing support across SAP, Oracle, Microsoft Dynamics, Workday, and more.',
};

const data: ServicePageData = {
  num: '13',
  label: 'ERP Solutions',
  heroHeading: 'Unify Your Operations With\nIntelligent ERP',
  heroDesc:
    'In today\'s fast-moving IT landscape, disconnected systems and manual processes are the biggest barriers to growth. An ERP (Enterprise Resource Planning) platform brings every critical function — from project management and resource planning to finance, procurement, and client delivery — into one intelligent, unified system. It gives IT companies real-time visibility across operations, eliminates inefficiencies, and enables data-driven decision-making at every level.',
  overview:
    'At Tronexa, we go beyond software — we provide ERP as a fully managed service, handling implementation, configuration, integration, and ongoing support so your team can stay focused on what they do best: delivering exceptional technology solutions.',
  deliverables: [
    { num: '01', title: 'SAP S/4HANA', desc: 'For IT enterprises managing complex operations at scale, SAP S/4HANA delivers real-time intelligence across every business function. Tronexa implements and fully manages your SAP environment — from initial setup and data migration to system monitoring and continuous optimization — so you get maximum value without the overhead of an in-house SAP team.' },
    { num: '02', title: 'Oracle NetSuite', desc: 'Oracle NetSuite is the cloud ERP of choice for IT companies that need to manage financials, projects, billing, and vendor relationships in one place. Tronexa handles your complete NetSuite deployment and day-to-day management, ensuring your platform stays configured, updated, and aligned with how your business operates.' },
    { num: '03', title: 'Microsoft Dynamics 365', desc: 'Built for organizations running on the Microsoft stack, Dynamics 365 connects your ERP and CRM into a single, unified platform. Tronexa takes care of the entire lifecycle — from licensing and integration with your Microsoft 365 environment to user training and ongoing system administration — so adoption is smooth and ROI is fast.' },
    { num: '04', title: 'Workday ERP', desc: 'IT companies with large, distributed workforces rely on Workday to manage HR, payroll, talent, and financial planning in one cloud-native platform. Tronexa manages your Workday environment end-to-end, ensuring your people data and financial reporting are always accurate, compliant, and accessible to the right stakeholders.' },
    { num: '05', title: 'Infor CloudSuite', desc: 'Infor CloudSuite brings industry-tailored ERP capabilities to IT service and technology companies looking for a solution that fits their workflows out of the box. With Tronexa as your managed service partner, you benefit from faster deployment, fewer customizations, and a team that proactively monitors and maintains your system around the clock.' },
    { num: '06', title: 'Epicor ERP', desc: 'For IT companies with hardware distribution or technology manufacturing operations, Epicor ERP delivers precise control over supply chain, inventory, and production processes. Tronexa manages your Epicor environment fully — handling upgrades, integrations, and performance tuning — so your operations run without interruption.' },
    { num: '07', title: 'Acumatica', desc: 'Acumatica\'s open, cloud-native architecture makes it a strong fit for growing IT businesses that need flexibility without compromising on functionality. Tronexa configures, integrates, and manages your Acumatica platform as a complete service — giving your team a powerful ERP experience with zero infrastructure burden.' },
    { num: '08', title: 'Sage X3', desc: 'Sage X3 is a proven ERP for IT companies with multi-entity structures, global operations, or complex financial requirements. Tronexa takes full ownership of your Sage X3 environment — from initial rollout and data migration to compliance management and system health monitoring — so you always have a reliable, high-performing platform.' },
    { num: '09', title: 'SYSPRO ERP', desc: 'IT companies involved in technology distribution or hardware supply chains benefit from SYSPRO\'s deep inventory, procurement, and logistics capabilities. Tronexa manages your SYSPRO deployment as a fully handled service, keeping your system optimized, your data clean, and your operations running at peak efficiency.' },
    { num: '10', title: 'IFS Applications', desc: 'For IT organizations delivering managed services, field operations, or long-term technology projects, IFS Applications provides unmatched control over service delivery, asset management, and project financials. Tronexa handles your entire IFS environment so your teams always have the tools they need to deliver, without the complexity of managing the platform themselves.' },
  ],
  whyPoints: [
    { title: 'Fully Managed Service', desc: 'We handle every aspect of your ERP — implementation, configuration, integrations, upgrades, and ongoing support — so your internal teams never carry the operational burden of running a complex enterprise platform.' },
    { title: 'Multi-Platform Expertise', desc: 'Our team has deep hands-on experience across the leading ERP platforms including SAP, Oracle NetSuite, Microsoft Dynamics 365, Workday, Infor, Epicor, Acumatica, Sage X3, SYSPRO, and IFS — giving you the right solution for your environment.' },
    { title: 'End-to-End Integration', desc: 'We integrate your ERP with your existing technology stack — CRM, ITSM, project tools, finance systems, and third-party APIs — creating a single, unified source of truth across your entire organization.' },
    { title: 'Business Continuity Focus', desc: 'Proactive monitoring, scheduled maintenance, and rapid incident response ensure your ERP environment stays available, performant, and secure — minimizing downtime and protecting your operations at all times.' },
    { title: 'Scalable for IT Growth', desc: 'Whether you\'re a growing MSP, a large system integrator, or a technology enterprise, our ERP managed services scale with your business — adding users, modules, and capabilities as your needs evolve.' },
  ],
  cta: 'Start Your ERP Transformation',
};

export default function ERPSolutionsPage() {
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
