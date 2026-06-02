import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'IoT Solutions — TRONEXA | Connect The Physical And Digital World',
  description:
    'TRONEXA builds intelligent connected ecosystems — smart devices, industrial IoT, sensor networks, predictive maintenance, and real-time monitoring solutions.',
};

const data: ServicePageData = {
  num: '08',
  label: 'IoT Solutions',
  heroHeading: 'Connect The Physical\nAnd Digital World',
  heroDesc:
    'Build intelligent connected ecosystems that improve efficiency, automate operations, and provide real-time visibility across devices, systems, and environments.',
  overview:
    'TRONEXA helps organizations leverage the power of the Internet of Things to create smarter operations and data-driven decision-making processes. From connected devices and smart sensors to industrial automation and predictive monitoring, we build scalable IoT ecosystems that enhance productivity, reduce costs, and unlock new business opportunities.',
  deliverables: [
    { num: '01', title: 'Smart Device Integration', desc: 'Connecting sensors, devices, and systems into unified ecosystems for seamless communication and automation.' },
    { num: '02', title: 'Industrial IoT Solutions', desc: 'Developing IoT systems for manufacturing, logistics, and industrial automation that improve uptime and reduce waste.' },
    { num: '03', title: 'Sensor Networks', desc: 'Designing and deploying scalable sensor networks for environmental monitoring, asset tracking, and data collection.' },
    { num: '04', title: 'Predictive Maintenance', desc: 'Using IoT data and AI models to predict equipment failures before they occur, reducing downtime and maintenance costs.' },
    { num: '05', title: 'Real-Time Monitoring Systems', desc: 'Building dashboards and alert systems that provide live visibility into device performance, health, and status.' },
    { num: '06', title: 'Smart Manufacturing', desc: 'Implementing connected factory solutions that automate production lines and deliver real-time operational insights.' },
    { num: '07', title: 'Connected Asset Tracking', desc: 'Tracking physical assets, vehicles, and inventory in real time using GPS, RFID, and IoT sensor technologies.' },
    { num: '08', title: 'IoT Analytics Platforms', desc: 'Analyzing device-generated data to surface actionable insights, trends, and optimization opportunities.' },
    { num: '09', title: 'Remote Management Systems', desc: 'Enabling remote monitoring, configuration, and control of connected devices and infrastructure.' },
    { num: '10', title: 'Custom IoT Solutions', desc: 'Creating tailored IoT ecosystems designed for specific industries, use cases, and operational environments.' },
  ],
  whyPoints: [
    { title: 'Secure IoT Architecture', desc: 'Every IoT system we build incorporates end-to-end encryption, device authentication, and network segmentation to protect against threats.' },
    { title: 'Real-Time Data Insights', desc: 'Our platforms process and surface IoT data in real time — giving your teams the visibility they need to act fast and decisively.' },
    { title: 'Cloud Integration', desc: 'We connect IoT ecosystems with leading cloud platforms — AWS, Azure, GCP — enabling scalable storage, processing, and analytics.' },
    { title: 'Scalable Infrastructure', desc: 'Our IoT architectures are designed to grow from dozens of devices to millions without architectural rewrites or performance degradation.' },
    { title: 'Industry-Specific Solutions', desc: 'We bring deep domain knowledge across manufacturing, logistics, healthcare, energy, and agriculture — tailoring every solution to sector needs.' },
  ],
  cta: 'Build Your IoT Solution',
};

export default function IoTSolutionsPage() {
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
