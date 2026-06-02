import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'AI Solutions — TRONEXA | Intelligence That Drives Business Growth',
  description:
    'TRONEXA delivers end-to-end AI solutions — machine learning, predictive analytics, automation, recommendation systems, and custom AI development for measurable business impact.',
};

const data: ServicePageData = {
  num: '07',
  label: 'AI Solutions',
  heroHeading: 'Intelligence That\nDrives Business Growth',
  heroDesc:
    'Accelerate innovation and improve decision-making with intelligent AI solutions designed to automate processes, optimize operations, and unlock new opportunities.',
  overview:
    'TRONEXA delivers end-to-end Artificial Intelligence solutions that help businesses transform data into actionable insights. From machine learning and predictive analytics to automation and recommendation systems, we create intelligent technologies that generate measurable business impact.',
  deliverables: [
    { num: '01', title: 'AI Consulting & Strategy', desc: 'Helping businesses identify AI opportunities and implement intelligent solutions for growth and automation.' },
    { num: '02', title: 'Machine Learning Development', desc: 'Building intelligent systems that learn from data to improve predictions and decision-making over time.' },
    { num: '03', title: 'Predictive Analytics', desc: 'Using AI models to analyze trends and forecast business outcomes for smarter, faster decisions.' },
    { num: '04', title: 'Recommendation Systems', desc: 'Creating personalized recommendation engines for products, content, and customer experiences.' },
    { num: '05', title: 'AI Chatbot Development', desc: 'Creating intelligent chatbots and virtual assistants for customer support and business automation.' },
    { num: '06', title: 'Intelligent Process Automation', desc: 'Automating repetitive business tasks to improve efficiency and reduce manual effort at scale.' },
    { num: '07', title: 'Fraud Detection Systems', desc: 'Deploying AI models that detect anomalies and fraudulent patterns in real time across transactions.' },
    { num: '08', title: 'Decision Intelligence Systems', desc: 'Building AI systems that synthesize data from multiple sources to support complex business decisions.' },
    { num: '09', title: 'Robotics & Intelligent Automation', desc: 'Integrating AI with robotic systems to automate physical and digital workflows in enterprise environments.' },
    { num: '10', title: 'Custom AI Solutions', desc: 'Building tailored AI solutions based on unique business requirements, data environments, and goals.' },
  ],
  whyPoints: [
    { title: 'AI-First Development Approach', desc: 'We do not bolt AI onto existing systems as an afterthought — we architect your solution from the ground up with intelligence at its core.' },
    { title: 'Business-Focused Implementation', desc: 'Every AI system we build is tied to measurable business outcomes — not just technical benchmarks. We define success in your terms.' },
    { title: 'Scalable AI Infrastructure', desc: 'Our ML infrastructure is built to scale — from a few predictions per second to billions — using cloud-native, GPU-accelerated architectures.' },
    { title: 'Secure Data Processing', desc: 'We implement strict data governance, encryption, access controls, and compliance frameworks to keep your data safe throughout the AI lifecycle.' },
    { title: 'Measurable ROI', desc: 'We establish clear baselines, track impact metrics, and iterate continuously — so you can see exactly what your AI investment is delivering.' },
  ],
  cta: 'Explore AI Solutions',
};

export default function AISolutionsPage() {
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
