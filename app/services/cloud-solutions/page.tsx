import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Cloud Solutions — TRONEXA | Build Secure And Scalable Cloud Infrastructure',
  description:
    'TRONEXA delivers cloud migration, infrastructure setup, DevOps, security, hybrid cloud, disaster recovery, and managed cloud services for modern businesses.',
};

const data: ServicePageData = {
  num: '09',
  label: 'Cloud Solutions',
  heroHeading: 'Build Secure And Scalable\nCloud Infrastructure',
  heroDesc:
    'Accelerate business growth with cloud technologies designed to improve flexibility, performance, security, and operational efficiency.',
  overview:
    'TRONEXA delivers cloud solutions that help businesses modernize infrastructure, optimize resources, and improve scalability. Whether you\'re migrating existing systems, implementing hybrid environments, or building cloud-native applications, we create reliable cloud ecosystems that support long-term business growth.',
  deliverables: [
    { num: '01', title: 'Cloud Migration', desc: 'Moving applications, databases, and workloads to the cloud securely with minimal disruption to operations.' },
    { num: '02', title: 'Cloud Infrastructure Setup', desc: 'Designing and deploying cloud environments on AWS, Azure, or GCP optimized for performance and cost.' },
    { num: '03', title: 'Cloud Security', desc: 'Protecting cloud environments with IAM, encryption, compliance frameworks, and continuous threat monitoring.' },
    { num: '04', title: 'DevOps & Automation', desc: 'Automating deployment pipelines, infrastructure provisioning, and operations for faster and more reliable delivery.' },
    { num: '05', title: 'Hybrid Cloud Solutions', desc: 'Integrating on-premise infrastructure with cloud environments to balance control, security, and scalability.' },
    { num: '06', title: 'Multi-Cloud Architecture', desc: 'Designing and managing workloads across multiple cloud providers to avoid lock-in and maximize resilience.' },
    { num: '07', title: 'Disaster Recovery', desc: 'Ensuring business continuity through automated backup strategies, failover systems, and recovery planning.' },
    { num: '08', title: 'Cloud Monitoring', desc: 'Providing real-time visibility into cloud health, performance metrics, costs, and anomaly alerts.' },
    { num: '09', title: 'Cloud Optimization', desc: 'Analyzing and rightsizing cloud resources to eliminate waste, reduce spend, and maximize efficiency.' },
    { num: '10', title: 'Managed Cloud Services', desc: 'Handling day-to-day cloud operations, patching, scaling, and support so your team can focus on the business.' },
  ],
  whyPoints: [
    { title: 'Enterprise Security', desc: 'We implement defense-in-depth security strategies — identity management, network controls, encryption, and compliance audits across your entire cloud estate.' },
    { title: 'High Availability', desc: 'Our architectures are designed for 99.9%+ uptime with multi-region redundancy, auto-scaling, and automated failover built in from day one.' },
    { title: 'Cost Optimization', desc: 'We continuously right-size resources, eliminate idle infrastructure, and implement reserved capacity strategies to reduce your cloud spend significantly.' },
    { title: 'Cloud Expertise', desc: 'Our certified engineers have deep hands-on experience across AWS, Azure, and GCP — bringing multi-cloud knowledge to every engagement.' },
    { title: 'Future-Ready Infrastructure', desc: 'We build cloud environments that can adopt new services, absorb new workloads, and scale without architectural rewrites as your business evolves.' },
  ],
  cta: 'Modernize Your Infrastructure',
};

export default function CloudSolutionsPage() {
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
