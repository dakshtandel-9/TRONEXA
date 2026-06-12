import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import ProjectShowcaseContent, { ProjectShowcaseData } from '@/components/ProjectShowcaseContent';

export const metadata: Metadata = {
  title: 'IoT Solutions — TRONEXA | Intelligent IoT Ecosystems Case Study',
  description:
    'How Tronexa built end-to-end IoT solutions connecting devices, sensors, and cloud platforms — enabling real-time monitoring, predictive maintenance, industrial automation, and operational intelligence.',
};

const data: ProjectShowcaseData = {
  category: 'IoT Solutions',
  heroTitle: 'Connecting The Physical And\nDigital World With IoT',
  heroDesc: 'How Tronexa built intelligent IoT ecosystems that connect devices, sensors, and cloud platforms into a unified system — enabling real-time monitoring, predictive maintenance, and operational automation at scale.',
  heroTags: [
    { label: 'Category', value: 'IoT Solutions' },
    { label: 'Protocols', value: 'MQTT · CoAP · WebSockets' },
    { label: 'Cloud', value: 'AWS IoT · Azure IoT · GCP' },
  ],
  introTitle: 'Real-time intelligence from connected physical assets',
  introParagraphs: [
    'As industries become increasingly connected, businesses require intelligent systems that can collect, analyze, and act on real-time data from physical assets and devices. The Internet of Things is transforming operations by enabling organizations to improve efficiency, reduce costs, and make data-driven decisions faster than ever before.',
    'Tronexa specializes in developing end-to-end IoT solutions that seamlessly connect devices, sensors, machines, and cloud platforms into a unified ecosystem. Our implementations help businesses gain real-time visibility into operations, automate critical processes, and unlock actionable insights from connected devices.',
    'From smart manufacturing and logistics tracking to healthcare monitoring and industrial automation, Tronexa delivers scalable IoT solutions designed to drive operational excellence and long-term growth.',
  ],
  problemTitle: 'The visibility gap in physical operations',
  problemIntro: 'Many organizations struggle with limited visibility into their operations due to disconnected systems, manual monitoring processes, and lack of real-time data access — facing productivity challenges and missed automation opportunities.',
  problems: [
    'Inability to monitor equipment and assets in real time, leading to reactive rather than proactive operational management',
    'Operational inefficiencies caused by manual data collection processes that are slow, error-prone, and resource-intensive',
    'Delayed response to equipment failures and maintenance requirements resulting in costly unplanned downtime',
    'Limited access to actionable business and operational insights due to data siloed in disconnected systems',
    'High operational costs due to resource wastage, energy inefficiency, and preventable equipment failures',
  ],
  solutionTitle: 'How Tronexa built the IoT ecosystem',
  solutionIntro: 'Tronexa developed a comprehensive IoT ecosystem that connected devices, sensors, and business applications through a secure and scalable infrastructure — providing complete operational visibility and enabling proactive, data-driven decisions.',
  solutions: [
    'Integrated smart sensors and connected devices for real-time data collection across facilities and assets',
    'Built cloud-based monitoring dashboards with live analytics, KPI tracking, and customizable reporting',
    'Implemented automated alerts and notifications for critical events, threshold breaches, and system anomalies',
    'Enabled remote device management, configuration updates, and operational control from a central platform',
    'Developed predictive maintenance workflows using AI models trained on sensor and equipment data',
  ],
  featuresTitle: 'The complete IoT platform delivered',
  featuresSubtitle: 'A robust suite of IoT capabilities spanning device management, analytics, automation, and mobile monitoring.',
  features: [
    { title: 'Real-Time Device Monitoring', desc: 'Continuous tracking of connected devices and assets — providing operations teams with live visibility into system status and performance.' },
    { title: 'Sensor Data Collection', desc: 'Automated acquisition of environmental, operational, and equipment data — transforming raw readings into structured, actionable information.' },
    { title: 'Smart Dashboard', desc: 'Centralized monitoring with live metrics, charts, and analytics — a single pane of glass for all IoT data across the organization.' },
    { title: 'Remote Device Management', desc: 'Configure, update, and control devices remotely — managing firmware, settings, and parameters across thousands of devices centrally.' },
    { title: 'Predictive Maintenance', desc: 'AI-driven detection of potential equipment failures before breakdowns occur — reducing unplanned downtime and extending asset lifespan.' },
    { title: 'Automated Alerts & Notifications', desc: 'Instant alerts via mobile, email, or SMS for critical events — ensuring the right people are notified immediately when thresholds are breached.' },
    { title: 'Asset Tracking System', desc: 'GPS-enabled location monitoring for vehicles, equipment, and inventory — real-time visibility into high-value asset movement and location.' },
    { title: 'Energy Consumption Monitoring', desc: 'Track and optimize power usage across facilities — identifying inefficiencies and supporting sustainability goals with granular data.' },
    { title: 'Industrial Automation Controls', desc: 'Automated machine operations and workflow management — integrating IoT controls with PLCs and SCADA systems for process automation.' },
    { title: 'Data Analytics & Reporting', desc: 'Detailed performance reports and operational intelligence — turning IoT data streams into insights that support strategic planning.' },
    { title: 'Multi-Device Connectivity', desc: 'Support for sensors, gateways, machines, and smart devices — handling diverse hardware platforms across communication protocols.' },
    { title: 'Cloud Synchronization', desc: 'Secure real-time data transfer between devices and cloud platforms — ensuring consistent, up-to-date information across all connected systems.' },
    { title: 'Role-Based Access Management', desc: 'Secure access controls for administrators and operators — ensuring the right people have the right level of access to platform capabilities.' },
    { title: 'API Integration Framework', desc: 'Seamless integration with ERP, CRM, and third-party systems — connecting IoT data into the broader business application ecosystem.' },
    { title: 'Mobile Monitoring Application', desc: 'Access real-time IoT insights from anywhere — a fully featured mobile companion keeping teams connected to operational data.' },
  ],
  techStackIntro: 'Tronexa utilized a modern IoT technology stack to build secure, scalable, and high-performance connected solutions — covering hardware, communication protocols, cloud platforms, and analytics.',
  techStack: [
    { label: 'IoT Devices', value: 'Smart Sensors, GPS Trackers, RFID Devices, Industrial Controllers' },
    { label: 'Hardware Platforms', value: 'Arduino, Raspberry Pi, ESP32, STM32, Industrial PLCs' },
    { label: 'Communication Protocols', value: 'MQTT, CoAP, HTTP, WebSockets, Modbus' },
    { label: 'Frontend', value: 'React.js, Angular, Flutter' },
    { label: 'Backend', value: 'Node.js, Express.js, Python, FastAPI' },
    { label: 'Databases', value: 'PostgreSQL, MongoDB, InfluxDB, TimescaleDB' },
    { label: 'Cloud Platforms', value: 'AWS IoT Core, Microsoft Azure IoT Hub, Google Cloud IoT' },
    { label: 'Analytics & Processing', value: 'Apache Kafka, Apache Spark, AI & Machine Learning Models' },
    { label: 'Security', value: 'TLS Encryption, Device Authentication, Secure API Management' },
    { label: 'Monitoring', value: 'Grafana, Prometheus, Custom Analytics Dashboards' },
    { label: 'DevOps', value: 'Docker, Kubernetes, CI/CD Pipelines' },
    { label: 'CDN', value: 'Cloudflare, AWS CloudFront' },
  ],
  hostingTitle: 'Multi-cloud infrastructure for\ncontinuous device connectivity',
  hostingIntro: 'To ensure reliable performance and continuous device connectivity, Tronexa deployed the IoT infrastructure using enterprise-grade cloud environments with global device management and real-time data processing.',
  hosting: [
    { label: 'AWS IoT', value: 'AWS IoT Core Infrastructure & Edge Services' },
    { label: 'Azure IoT', value: 'Microsoft Azure IoT Hub Deployment' },
    { label: 'GCP IoT', value: 'Google Cloud IoT Services & Analytics' },
    { label: 'Connectivity', value: 'Global Device Connectivity Management' },
    { label: 'Scaling', value: 'Auto-Scaling Cloud Resources for Peak Loads' },
    { label: 'Processing', value: 'Real-Time Data Processing Servers' },
    { label: 'Recovery', value: 'Cloud-Based Backup & Disaster Recovery' },
    { label: 'Security', value: 'Enterprise Security and Monitoring Framework' },
  ],
  teamTitle: 'A multidisciplinary team\nfrom hardware to cloud',
  teamIntro: 'Tronexa provided a multidisciplinary IoT team to manage the complete lifecycle — from hardware integration and embedded programming to cloud deployment and ongoing optimization.',
  team: [
    { role: 'IoT Solution Architects', desc: 'System design, infrastructure planning, and end-to-end IoT architecture strategy' },
    { role: 'Embedded Engineers', desc: 'Device programming, firmware development, and hardware integration' },
    { role: 'Software Developers', desc: 'Cloud platforms, monitoring dashboards, APIs, and mobile applications' },
    { role: 'Data Engineers', desc: 'Real-time data pipelines, analytics processing, and time-series database management' },
    { role: 'QA & Security Specialists', desc: 'Testing, reliability validation, device security, and compliance assessment' },
    { role: 'DevOps Engineers', desc: 'Cloud infrastructure, CI/CD, container orchestration, and deployment automation' },
  ],
  maintenanceTitle: 'Ongoing monitoring to keep\nthe ecosystem running',
  maintenanceIntro: 'Following deployment, Tronexa provided ongoing maintenance and monitoring services to ensure uninterrupted device connectivity, platform performance, and security across the entire IoT ecosystem.',
  maintenance: [
    'Regular firmware updates and device health monitoring to maintain reliability and performance of all connected hardware',
    'Cloud infrastructure optimization and scaling to accommodate growing device fleets and data volumes',
    'Security enhancements and device authentication updates to protect against evolving IoT threat landscapes',
    'Continuous support ensuring the IoT ecosystem remains scalable, secure, and aligned with business needs',
    'Analytics model retraining and predictive maintenance refinement based on accumulated operational data',
  ],
  conclusionTitle: 'Physical intelligence powering\nsmarter business decisions',
  conclusionParagraphs: [
    'Tronexa successfully delivered a comprehensive IoT solution that bridged the gap between physical assets and digital intelligence. By integrating connected devices, cloud infrastructure, analytics, and automation capabilities, we enabled businesses to gain unprecedented visibility into their operations and make smarter decisions in real time.',
    'The solution helped organizations improve productivity, reduce operational costs, minimize downtime, and create new opportunities for innovation. Through strategic planning, advanced technology implementation, and continuous support, Tronexa empowered businesses to unlock the full potential of the Internet of Things and achieve sustainable digital transformation.',
  ],
};

export default function IoTSolutionsProjectPage() {
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
