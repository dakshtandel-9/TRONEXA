import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Cloud Solutions — TRONEXA | Scalable, Secure & Future-Ready Cloud Infrastructure',
  description:
    'TRONEXA accelerates digital transformation with customized cloud solutions — cloud migration, multi-cloud deployments, disaster recovery, auto-scaling, and 24/7 infrastructure management.',
};

const data: ServicePageData = {
  num: '07',
  label: 'Cloud Solutions',
  heroHeading: 'Accelerating Digital Transformation\nWith Cloud Infrastructure',
  heroDesc:
    'As businesses continue to embrace digital transformation, cloud technology has become the foundation for scalability, agility, and operational efficiency. Organizations require flexible infrastructure that can support rapid growth, secure critical data, and enable seamless collaboration across teams and locations.',
  overview:
    'Tronexa helps businesses modernize their IT environments through customized cloud solutions designed to improve performance, reduce infrastructure costs, and enhance business continuity. From cloud migration and infrastructure management to hybrid and multi-cloud deployments, our expertise enables organizations to unlock the full potential of cloud computing.',
  deliverablesLabel: 'Cloud Capabilities',
  deliverablesHeading: 'Scalable, secure cloud\ninfrastructure end to end',
  deliverables: [
    { num: '01', title: 'Cloud Infrastructure Deployment', desc: 'End-to-end setup of public, private, and hybrid cloud environments — architected for performance, security, and cost-efficiency using AWS, Microsoft Azure, and Google Cloud Platform.' },
    { num: '02', title: 'Cloud Migration Services', desc: 'Seamless migration of applications, databases, and workloads — with minimal disruption to business operations and a structured approach that ensures data integrity throughout the process.' },
    { num: '03', title: 'Auto-Scaling Architecture', desc: 'Dynamic resource allocation based on usage demands — ensuring your infrastructure expands during peak loads and contracts during quiet periods, optimizing both performance and cost.' },
    { num: '04', title: 'High Availability Configuration', desc: 'Redundant systems to ensure maximum uptime — architected with failover capabilities, load balancing, and multi-region redundancy to support business-critical application requirements.' },
    { num: '05', title: 'Disaster Recovery Planning', desc: 'Automated backup and rapid recovery capabilities — ensuring your business can recover quickly from any infrastructure failure with clearly defined recovery time and point objectives.' },
    { num: '06', title: 'Identity & Access Management (IAM)', desc: 'Secure user authentication and permissions control — implementing least-privilege access principles, multi-factor authentication, and role-based controls across your entire cloud estate.' },
    { num: '07', title: 'Data Encryption & Security', desc: 'Protection of data in transit and at rest — with SSL/TLS encryption, VPN configuration, and compliance with industry security standards to safeguard your most critical business information.' },
    { num: '08', title: 'Multi-Cloud Support', desc: 'Integration across AWS, Azure, and Google Cloud environments — providing flexibility, avoiding vendor lock-in, and enabling workloads to run on the most appropriate platform for each use case.' },
    { num: '09', title: 'Containerization & Orchestration', desc: 'Deployment using Docker and Kubernetes — enabling consistent, portable application environments that simplify scaling, updates, and infrastructure management across cloud platforms.' },
    { num: '10', title: 'Real-Time Monitoring & Alerts', desc: 'Infrastructure performance tracking and issue detection — with Grafana, Prometheus, CloudWatch, and Azure Monitor providing continuous visibility into system health and resource utilization.' },
    { num: '11', title: 'Cloud Storage Management', desc: 'Secure and scalable file and data storage solutions — using Amazon S3, Azure Blob Storage, and Google Cloud Storage, configured for performance, redundancy, and cost optimization.' },
    { num: '12', title: 'Cost Optimization Tools', desc: 'Resource usage analysis and cloud expenditure management — identifying waste, right-sizing instances, and implementing reserved capacity strategies to maximize your cloud investment return.' },
  ],
  whyPoints: [
    { title: 'Multi-Cloud Architecture Expertise', desc: 'We design and manage infrastructure across AWS, Azure, and GCP — giving you the flexibility to leverage the best services from each platform without being locked into a single vendor ecosystem.' },
    { title: 'Zero-Downtime Migration', desc: 'Our migration methodology is designed to move your applications, data, and workloads to the cloud with zero business disruption — using phased approaches, testing environments, and rollback plans.' },
    { title: 'Security & Compliance First', desc: 'Every cloud deployment is built with enterprise security standards — IAM, encryption, VPN, MFA, and continuous compliance monitoring ensure your cloud environment meets regulatory requirements.' },
    { title: 'Infrastructure as Code', desc: 'We use Terraform and AWS CloudFormation to manage your cloud infrastructure programmatically — ensuring reproducibility, version control, and rapid provisioning of environments.' },
    { title: '24/7 Monitoring & Support', desc: 'Our cloud operations team monitors your infrastructure around the clock — providing proactive alerts, rapid incident response, and continuous optimization to maximize availability and performance.' },
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
