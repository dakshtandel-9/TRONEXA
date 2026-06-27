import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'IoT Solutions — TRONEXA | Intelligent IoT Ecosystems for Real-Time Monitoring & Automation',
  description:
    'TRONEXA builds end-to-end IoT solutions connecting devices, sensors, and cloud platforms — enabling real-time monitoring, predictive maintenance, industrial automation, and operational intelligence.',
};

const data: ServicePageData = {
  num: '06',
  label: 'IoT Solutions',
  heroHeading: 'Connecting The Physical And\nDigital World With IoT',
  heroDesc:
    'As industries become increasingly connected, businesses require intelligent systems that can collect, analyze, and act on real-time data from physical assets and devices. The Internet of Things is transforming operations by enabling organizations to improve efficiency, reduce costs, and make data-driven decisions faster than ever before.',
  overview:
    'Tronexa specializes in developing end-to-end IoT solutions that seamlessly connect devices, sensors, machines, and cloud platforms into a unified ecosystem. From smart manufacturing and logistics tracking to healthcare monitoring and industrial automation, Tronexa delivers scalable IoT solutions designed to drive operational excellence and long-term growth.',
  deliverablesLabel: 'IoT Platform Capabilities',
  deliverablesHeading: 'Connected intelligence across\nevery device and asset',
  deliverables: [
    { num: '01', title: 'Real-Time Device Monitoring', desc: 'Continuous tracking of connected devices and assets — providing operations teams with live visibility into system status, performance metrics, and operational health across all connected infrastructure.' },
    { num: '02', title: 'Sensor Data Collection', desc: 'Automated acquisition of environmental, operational, and equipment data — transforming raw sensor readings into structured, actionable information for analysis and decision-making.' },
    { num: '03', title: 'Smart Dashboard', desc: 'Centralized monitoring with live metrics, charts, and analytics — giving operators a single pane of glass to view, analyze, and act on all IoT data across the organization.' },
    { num: '04', title: 'Remote Device Management', desc: 'Configure, update, and control devices remotely — enabling teams to manage firmware, settings, and operational parameters across thousands of devices from a central platform.' },
    { num: '05', title: 'Predictive Maintenance', desc: 'AI-driven detection of potential equipment failures before breakdowns occur — reducing unplanned downtime, extending asset lifespan, and optimizing maintenance scheduling and costs.' },
    { num: '06', title: 'Automated Alerts & Notifications', desc: 'Instant alerts via mobile, email, or SMS for critical events and anomalies — ensuring the right people are notified immediately when conditions fall outside acceptable thresholds.' },
    { num: '07', title: 'Asset Tracking System', desc: 'GPS-enabled location monitoring for vehicles, equipment, and inventory — providing real-time visibility into the location and movement of high-value assets across facilities and supply chains.' },
    { num: '08', title: 'Energy Consumption Monitoring', desc: 'Track and optimize power usage across facilities and operations — identifying inefficiencies, reducing energy costs, and supporting sustainability goals with granular consumption data.' },
    { num: '09', title: 'Industrial Automation Controls', desc: 'Automated machine operations and workflow management — integrating IoT controls with PLCs, SCADA systems, and manufacturing equipment for seamless industrial process automation.' },
    { num: '10', title: 'Data Analytics & Reporting', desc: 'Detailed performance reports and operational intelligence — turning IoT data streams into meaningful insights that support strategic planning and continuous operational improvement.' },
    { num: '11', title: 'Multi-Device Connectivity', desc: 'Support for sensors, gateways, machines, and smart devices — handling diverse hardware platforms including Arduino, Raspberry Pi, ESP32, and industrial PLCs across communication protocols.' },
    { num: '12', title: 'Mobile Monitoring Application', desc: 'Access real-time IoT insights from anywhere — a fully featured mobile companion app that keeps field teams and management connected to operational data at all times.' },
  ],
  whyPoints: [
    { title: 'End-to-End IoT Expertise', desc: 'From hardware selection and embedded programming to cloud infrastructure and analytics dashboards, our team covers the complete IoT stack — eliminating the need to manage multiple specialist vendors.' },
    { title: 'Protocol-Agnostic Architecture', desc: 'We work across all major IoT communication protocols — MQTT, CoAP, HTTP, WebSockets, and Modbus — ensuring seamless connectivity regardless of your existing hardware ecosystem.' },
    { title: 'Predictive Intelligence Built In', desc: 'Our IoT solutions incorporate machine learning for predictive maintenance and anomaly detection — moving beyond reactive monitoring to proactive operational management.' },
    { title: 'Enterprise Security Standards', desc: 'Every IoT deployment is secured with TLS encryption, device authentication, and secure API management — protecting your operational data and connected infrastructure from threats.' },
    { title: 'Scalable Cloud Infrastructure', desc: 'Built on AWS IoT Core, Azure IoT Hub, and Google Cloud IoT, our solutions scale from tens to hundreds of thousands of connected devices as your operations grow.' },
  ],
  cta: 'Build Your IoT Ecosystem',
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
