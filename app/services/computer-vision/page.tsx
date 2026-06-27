import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Computer Vision — TRONEXA | Enable Machines To See And Understand',
  description:
    'TRONEXA builds intelligent computer vision systems for object detection, facial recognition, image classification, video analytics, OCR, and quality inspection.',
};

const data: ServicePageData = {
  num: '05',
  label: 'Computer Vision',
  heroHeading: 'Enable Machines To\nSee And Understand',
  heroDesc:
    'Transform visual data into actionable intelligence with advanced computer vision solutions powered by Artificial Intelligence.',
  overview:
    'TRONEXA develops intelligent computer vision systems capable of recognizing objects, analyzing images, monitoring video streams, and automating visual decision-making processes. Built on deep-learning architectures and optimized for real-time inference on edge devices, GPUs, and the cloud, our solutions help businesses across manufacturing, healthcare, retail, logistics, and security improve efficiency, safety, and operational performance.',
  deliverablesLabel: 'Computer Vision Capabilities',
  deliverablesHeading: 'Turning visual data into\nactionable intelligence',
  deliverables: [
    { num: '01', title: 'Object Detection & Recognition', desc: 'Detecting and tracking multiple objects in real time across images and video streams with high accuracy — powering everything from inventory counting to safety monitoring and automated workflows.' },
    { num: '02', title: 'Facial Recognition Systems', desc: 'Secure identity verification and access control built on facial analysis — with anti-spoofing safeguards, privacy compliance, and on-premise deployment options for sensitive environments.' },
    { num: '03', title: 'Image Classification', desc: 'Models that identify and categorize objects, scenes, and attributes within images — fine-tuned on your domain-specific data to achieve production-grade accuracy at scale.' },
    { num: '04', title: 'Video Analytics', desc: 'Analyzing live and recorded footage for behavior detection, crowd monitoring, and event recognition — converting hours of video into structured, searchable, actionable insights.' },
    { num: '05', title: 'OCR Solutions', desc: 'Extracting text and structured data from images, scanned documents, and forms with high precision — automating data entry from invoices, IDs, contracts, and handwritten records.' },
    { num: '06', title: 'Medical Image Analysis', desc: 'Vision models that analyze radiology, pathology, and diagnostic imaging — assisting clinicians with faster, more consistent insights while maintaining strict data privacy and compliance.' },
    { num: '07', title: 'Quality Inspection Systems', desc: 'Automated visual quality control for manufacturing — AI-powered defect detection pipelines that catch flaws human inspectors miss, reducing waste and improving consistency.' },
    { num: '08', title: 'Retail Analytics', desc: 'Analyzing in-store behavior, foot traffic, and product interactions — giving retailers the data to optimize layouts, staffing, merchandising, and the overall shopping experience.' },
    { num: '09', title: 'Autonomous Vision Systems', desc: 'Vision systems for autonomous vehicles, drones, and robotic platforms — enabling navigation, obstacle avoidance, and real-time environmental understanding with low-latency processing.' },
    { num: '10', title: 'Smart Surveillance Solutions', desc: 'Intelligent camera systems with real-time alerts, anomaly detection, and behavioral analysis — proactively flagging security threats and operational issues the moment they occur.' },
  ],
  whyPoints: [
    { title: 'High Accuracy Models', desc: 'We train and fine-tune models on domain-specific datasets, achieving accuracy levels that meet the demands of safety-critical and production environments.' },
    { title: 'Real-Time Processing', desc: 'Our pipelines are optimized for low-latency inference — delivering real-time results on edge devices, GPUs, and cloud infrastructure alike.' },
    { title: 'Scalable Architecture', desc: 'From a single camera stream to thousands of concurrent feeds, our computer vision systems scale horizontally without loss of performance.' },
    { title: 'Industry-Specific Solutions', desc: 'We have built vision systems for manufacturing, healthcare, retail, logistics, and security — adapting our approach to each sector\'s unique requirements.' },
    { title: 'Secure Deployment', desc: 'Our systems are designed with privacy compliance in mind — supporting on-premise deployment, data anonymization, and role-based access controls.' },
  ],
  cta: 'Build Your Vision Solution',
};

export default function ComputerVisionPage() {
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
