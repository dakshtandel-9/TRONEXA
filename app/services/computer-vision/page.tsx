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
    'TRONEXA develops intelligent computer vision systems capable of recognizing objects, analyzing images, monitoring video streams, and automating visual decision-making processes. Our solutions help businesses improve efficiency, security, and operational performance.',
  deliverables: [
    { num: '01', title: 'Object Detection & Recognition', desc: 'Detecting and tracking multiple objects in real time across images and video streams with high accuracy.' },
    { num: '02', title: 'Facial Recognition Systems', desc: 'Developing secure identity verification and access control systems using facial analysis.' },
    { num: '03', title: 'Image Classification', desc: 'Building models that identify and categorize objects, scenes, and attributes within images.' },
    { num: '04', title: 'Video Analytics', desc: 'Analyzing video footage for behavior detection, crowd monitoring, and event recognition.' },
    { num: '05', title: 'OCR Solutions', desc: 'Extracting text and structured data from images, scanned documents, and forms with high precision.' },
    { num: '06', title: 'Medical Image Analysis', desc: 'Applying CV models to analyze radiology, pathology, and diagnostic imaging data for clinical insights.' },
    { num: '07', title: 'Quality Inspection Systems', desc: 'Automating visual quality control in manufacturing with AI-powered defect detection pipelines.' },
    { num: '08', title: 'Retail Analytics', desc: 'Analyzing in-store behavior, foot traffic, and product interactions to optimize retail operations.' },
    { num: '09', title: 'Autonomous Vision Systems', desc: 'Building vision systems for autonomous vehicles, drones, and robotic platforms.' },
    { num: '10', title: 'Smart Surveillance Solutions', desc: 'Deploying intelligent camera systems with real-time alerts, anomaly detection, and behavioral analysis.' },
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
