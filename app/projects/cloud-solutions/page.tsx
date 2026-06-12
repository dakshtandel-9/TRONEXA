import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import ProjectShowcaseContent, { ProjectShowcaseData } from '@/components/ProjectShowcaseContent';

export const metadata: Metadata = {
  title: 'Cloud Solutions — TRONEXA | Scalable Cloud Infrastructure Case Study',
  description:
    'How Tronexa built scalable, secure, and future-ready cloud infrastructure — cloud migration, multi-cloud deployments, disaster recovery, auto-scaling, and 24/7 infrastructure management.',
};

const data: ProjectShowcaseData = {
  category: 'Cloud Solutions',
  heroTitle: 'Scalable, Secure & Future-Ready\nCloud Infrastructure',
  heroDesc: 'How Tronexa accelerated digital transformation by modernizing IT environments with customized cloud solutions — improving performance, reducing costs, and enabling seamless multi-cloud operations.',
  heroTags: [
    { label: 'Category', value: 'Cloud Solutions' },
    { label: 'Platforms', value: 'AWS · Azure · GCP' },
    { label: 'Stack', value: 'Terraform · Kubernetes · Docker' },
  ],
  introTitle: 'Cloud infrastructure built for agility, scale, and resilience',
  introParagraphs: [
    'As businesses continue to embrace digital transformation, cloud technology has become the foundation for scalability, agility, and operational efficiency. Organizations require flexible infrastructure that can support rapid growth, secure critical data, and enable seamless collaboration across teams and locations.',
    'Tronexa helps businesses modernize their IT environments through customized cloud solutions designed to improve performance, reduce infrastructure costs, and enhance business continuity. From cloud migration and infrastructure management to hybrid and multi-cloud deployments, our expertise enables organizations to unlock the full potential of cloud computing.',
    'By leveraging industry-leading cloud platforms and best practices, Tronexa delivers reliable, secure, and high-performing cloud ecosystems that support long-term business success.',
  ],
  problemTitle: 'The limitations of outdated infrastructure',
  problemIntro: 'Many organizations face challenges with outdated infrastructure, rising maintenance costs, and limited scalability that restrict business growth, agility, and the ability to adapt to evolving market requirements.',
  problems: [
    'High operational expenses associated with on-premise infrastructure — hardware, maintenance, and dedicated IT overhead',
    'Difficulty scaling resources to meet changing business demands, causing performance bottlenecks during peak periods',
    'Limited system availability and disaster recovery capabilities creating business continuity risks',
    'Security risks due to outdated infrastructure, fragmented systems, and lack of centralized access management',
    'Lack of centralized access to data, applications, and business resources for distributed and remote teams',
  ],
  solutionTitle: 'How Tronexa modernized the infrastructure',
  solutionIntro: 'Tronexa designed and implemented a comprehensive cloud infrastructure that enabled businesses to operate more efficiently, securely, and at scale — providing a reliable and flexible ecosystem for future expansion.',
  solutions: [
    'Migrated applications, databases, and workloads to secure cloud environments with zero business disruption',
    'Implemented scalable cloud architecture with auto-scaling capabilities to handle variable demand efficiently',
    'Established disaster recovery and business continuity frameworks with automated failover and backup systems',
    'Enhanced security through advanced IAM, SSL/TLS encryption, VPN, and multi-factor authentication',
    'Enabled centralized monitoring, resource management, and performance optimization across all cloud environments',
  ],
  featuresTitle: 'Enterprise cloud capabilities delivered',
  featuresSubtitle: 'A comprehensive set of cloud features designed to maximize performance, security, reliability, and cost efficiency.',
  features: [
    { title: 'Cloud Infrastructure Deployment', desc: 'End-to-end setup of public, private, and hybrid cloud environments — architected for performance, security, and cost-efficiency.' },
    { title: 'Cloud Migration Services', desc: 'Seamless migration of applications, databases, and workloads — with minimal disruption and full data integrity throughout the process.' },
    { title: 'Auto-Scaling Architecture', desc: 'Dynamic resource allocation based on usage demands — expanding during peak loads and contracting during quiet periods automatically.' },
    { title: 'High Availability Configuration', desc: 'Redundant systems to ensure maximum uptime — with failover capabilities, load balancing, and multi-region redundancy.' },
    { title: 'Disaster Recovery Planning', desc: 'Automated backup and rapid recovery capabilities — with clearly defined recovery time and point objectives for business-critical systems.' },
    { title: 'Centralized Resource Management', desc: 'Unified control of cloud assets and services — managing all environments, costs, and performance from a single operations center.' },
    { title: 'Identity & Access Management', desc: 'Secure user authentication and permissions control — implementing least-privilege access, MFA, and role-based controls.' },
    { title: 'Data Encryption & Security', desc: 'Protection of data in transit and at rest — SSL/TLS, VPN, and compliance with industry security standards.' },
    { title: 'Multi-Cloud Support', desc: 'Integration across AWS, Azure, and Google Cloud — avoiding vendor lock-in with workloads running on the most appropriate platform.' },
    { title: 'Real-Time Monitoring & Alerts', desc: 'Infrastructure performance tracking and issue detection — using CloudWatch, Azure Monitor, Grafana, and Prometheus.' },
    { title: 'Containerization & Orchestration', desc: 'Deployment using Docker and Kubernetes — enabling consistent, portable application environments across cloud platforms.' },
    { title: 'Load Balancing', desc: 'Efficient traffic distribution across servers and services — ensuring consistent performance and eliminating single points of failure.' },
    { title: 'Cloud Storage Management', desc: 'Secure and scalable file and data storage — using Amazon S3, Azure Blob Storage, and Google Cloud Storage.' },
    { title: 'Cost Optimization Tools', desc: 'Resource usage analysis and expenditure management — right-sizing instances and implementing reserved capacity strategies.' },
    { title: 'API & Application Integration', desc: 'Seamless connectivity with enterprise systems and services — enabling cloud-native communication across the entire technology stack.' },
  ],
  techStackIntro: 'Tronexa utilized industry-leading cloud technologies to deliver a secure, scalable, and high-performance cloud ecosystem — using Infrastructure as Code, container orchestration, and multi-cloud management tools.',
  techStack: [
    { label: 'Cloud Platforms', value: 'Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP)' },
    { label: 'Infrastructure as Code', value: 'Terraform, AWS CloudFormation' },
    { label: 'Containerization', value: 'Docker' },
    { label: 'Orchestration', value: 'Kubernetes, Amazon EKS, Azure Kubernetes Service (AKS)' },
    { label: 'Backend Services', value: 'Node.js, Python, Java, .NET' },
    { label: 'Databases', value: 'PostgreSQL, MySQL, MongoDB, Amazon RDS, Cloud SQL' },
    { label: 'Storage Solutions', value: 'Amazon S3, Azure Blob Storage, Google Cloud Storage' },
    { label: 'Monitoring & Logging', value: 'Grafana, Prometheus, CloudWatch, Azure Monitor' },
    { label: 'Security', value: 'IAM, SSL/TLS, VPN, Multi-Factor Authentication (MFA)' },
    { label: 'DevOps & Automation', value: 'Jenkins, GitHub Actions, GitLab CI/CD' },
    { label: 'Networking', value: 'Load Balancers, CDN, Virtual Private Clouds (VPCs)' },
    { label: 'Analytics', value: 'Cloud Analytics Services and Business Intelligence Tools' },
  ],
  hostingTitle: 'Multi-region cloud for global\nreliability and availability',
  hostingIntro: 'Tronexa deployed the solution on enterprise-grade cloud infrastructure to ensure reliability, security, and global accessibility — with automated backup, load balancing, and 24/7 monitoring.',
  hosting: [
    { label: 'AWS', value: 'Amazon Web Services Primary Hosting Infrastructure' },
    { label: 'Azure', value: 'Microsoft Azure Cloud Infrastructure' },
    { label: 'GCP', value: 'Google Cloud Platform Deployment' },
    { label: 'CDN', value: 'Global Content Delivery Network Integration' },
    { label: 'Availability', value: 'Multi-Region Deployment for High Availability' },
    { label: 'Recovery', value: 'Automated Backup and Disaster Recovery Systems' },
    { label: 'Performance', value: 'Load Balancing and Auto-Scaling Configuration' },
    { label: 'Monitoring', value: '24/7 Infrastructure Monitoring and Management' },
  ],
  teamTitle: 'Dedicated cloud engineers\nand DevOps specialists',
  teamIntro: 'Tronexa assembled a dedicated cloud engineering team to manage every phase — from planning and migration to optimization and support — ensuring smooth cloud transition with maximum long-term benefits.',
  team: [
    { role: 'Cloud Architects', desc: 'Infrastructure design, multi-cloud strategy, and technology selection aligned with business objectives' },
    { role: 'DevOps Engineers', desc: 'Automation, deployment pipelines, CI/CD implementation, and infrastructure-as-code management' },
    { role: 'Cloud Security Specialists', desc: 'Compliance frameworks, encryption standards, IAM configuration, and access management' },
    { role: 'System Administrators', desc: 'Monitoring, maintenance, performance optimization, and operational management' },
    { role: 'Migration Specialists', desc: 'Application and data migration, dependency mapping, and rollback planning' },
    { role: 'Project Managers', desc: 'Stakeholder coordination, delivery management, and business continuity oversight' },
  ],
  maintenanceTitle: 'Continuous management for\noptimal cloud performance',
  maintenanceIntro: 'Following deployment, Tronexa provided continuous cloud management and maintenance to ensure optimal performance, security, and availability — with regular audits and proactive support.',
  maintenance: [
    'Continuous infrastructure monitoring, security patching, and compliance updates to maintain a secure cloud environment',
    'Backup verification and disaster recovery testing to ensure rapid restoration capabilities remain effective',
    'Resource optimization and cost management reviews to maximize cloud investment return month over month',
    'Performance tuning and capacity planning to accommodate business growth and changing workload patterns',
    'Regular security audits and penetration testing to identify and remediate vulnerabilities proactively',
  ],
  conclusionTitle: 'A modern cloud foundation\nfor sustainable growth',
  conclusionParagraphs: [
    'Tronexa successfully delivered a modern cloud solution that transformed traditional infrastructure into a scalable, secure, and future-ready digital ecosystem. By leveraging leading cloud technologies and best practices, we enabled businesses to improve operational efficiency, strengthen security, and accelerate innovation.',
    'The solution provided greater flexibility, reduced infrastructure costs, enhanced system reliability, and empowered organizations to respond quickly to changing market demands. Through strategic cloud adoption and continuous optimization, Tronexa helped businesses build a strong foundation for sustainable growth and long-term digital success.',
  ],
};

export default function CloudSolutionsProjectPage() {
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
