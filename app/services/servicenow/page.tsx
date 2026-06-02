import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'ServiceNow Solutions — TRONEXA | Automate Enterprise Operations',
  description:
    'TRONEXA delivers ServiceNow implementation, ITSM, workflow automation, employee service delivery, incident management, and platform customization services.',
};

const data: ServicePageData = {
  num: '11',
  label: 'ServiceNow Solutions',
  heroHeading: 'Automate Enterprise\nOperations With ServiceNow',
  heroDesc:
    'Streamline workflows, improve service delivery, and accelerate digital transformation with intelligent ServiceNow solutions.',
  overview:
    'TRONEXA provides comprehensive ServiceNow services that help organizations automate processes, improve operational visibility, and optimize enterprise performance. From implementation and customization to integrations and ongoing support, we help businesses unlock the full value of the ServiceNow platform.',
  deliverables: [
    { num: '01', title: 'ServiceNow Implementation', desc: 'Deploying ServiceNow modules tailored to your organization\'s workflows, processes, and business objectives.' },
    { num: '02', title: 'IT Service Management', desc: 'Streamlining incident, problem, change, and service request management for improved IT performance and SLA compliance.' },
    { num: '03', title: 'Workflow Automation', desc: 'Automating business and IT workflows to eliminate manual steps, reduce errors, and accelerate service delivery.' },
    { num: '04', title: 'Employee Service Delivery', desc: 'Building self-service portals and automated HR workflows that improve the employee experience from onboarding to offboarding.' },
    { num: '05', title: 'Incident Management', desc: 'Implementing structured incident response processes with automated routing, escalation, and resolution tracking.' },
    { num: '06', title: 'Service Portal Development', desc: 'Designing intuitive, branded service portals that make it easy for employees and customers to request and track services.' },
    { num: '07', title: 'ServiceNow Integrations', desc: 'Connecting ServiceNow with enterprise tools — ERP, monitoring, ITSM, HR, and security platforms — for unified operations.' },
    { num: '08', title: 'Process Optimization', desc: 'Auditing existing ServiceNow implementations to identify inefficiencies and redesign processes for better performance.' },
    { num: '09', title: 'Platform Customization', desc: 'Extending ServiceNow with custom applications, scripts, and configurations to meet unique business requirements.' },
    { num: '10', title: 'Managed ServiceNow Support', desc: 'Providing ongoing platform administration, upgrades, monitoring, and user support to keep your instance performing optimally.' },
  ],
  whyPoints: [
    { title: 'Certified Expertise', desc: 'Our ServiceNow specialists hold platform certifications and have delivered complex enterprise implementations across IT, HR, and customer service functions.' },
    { title: 'Faster Workflow Automation', desc: 'We map your most time-consuming workflows first and automate them rapidly — delivering measurable efficiency gains within weeks of engagement.' },
    { title: 'Improved Service Delivery', desc: 'Our implementations consistently reduce mean time to resolution, improve SLA adherence, and increase user satisfaction scores across service teams.' },
    { title: 'Enterprise Scalability', desc: 'We architect ServiceNow environments to support thousands of users across global operations without degradation in performance or reliability.' },
    { title: 'Reduced Operational Complexity', desc: 'By consolidating fragmented tools and manual processes onto ServiceNow, we reduce operational overhead and give leadership clear visibility into performance.' },
  ],
  cta: 'Optimize Your Enterprise Operations',
};

export default function ServiceNowPage() {
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
