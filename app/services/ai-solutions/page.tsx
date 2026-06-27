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
    'TRONEXA delivers end-to-end Artificial Intelligence solutions that help businesses transform data into actionable insights. From machine learning and predictive analytics to automation and recommendation systems, we design, train, deploy, and continuously optimize intelligent technologies on scalable, GPU-accelerated cloud infrastructure — every solution tied to measurable business impact rather than technical benchmarks alone.',
  deliverablesLabel: 'AI Capabilities',
  deliverablesHeading: 'Intelligence engineered for\nmeasurable business impact',
  deliverables: [
    { num: '01', title: 'AI Consulting & Strategy', desc: 'Identifying high-value AI opportunities across your operations and building a clear roadmap — prioritizing initiatives by impact, feasibility, and ROI before a single model is trained.' },
    { num: '02', title: 'Machine Learning Development', desc: 'Intelligent systems that learn from your data to improve predictions and decision-making over time — built, validated, and continuously retrained for sustained accuracy in production.' },
    { num: '03', title: 'Predictive Analytics', desc: 'AI models that analyze trends and forecast outcomes — demand, churn, risk, and revenue — giving leadership the foresight to make smarter, faster, data-backed decisions.' },
    { num: '04', title: 'Recommendation Systems', desc: 'Personalized recommendation engines for products, content, and experiences — driving engagement, retention, and revenue through context-aware suggestions tailored to each user.' },
    { num: '05', title: 'AI Chatbot Development', desc: 'Intelligent chatbots and virtual assistants for customer support and business automation — resolving queries instantly while seamlessly escalating complex cases to human teams.' },
    { num: '06', title: 'Intelligent Process Automation', desc: 'Automating repetitive, rules-based, and document-heavy tasks at scale — improving accuracy, freeing up staff for higher-value work, and accelerating end-to-end processing.' },
    { num: '07', title: 'Fraud Detection Systems', desc: 'Real-time AI models that detect anomalies and fraudulent patterns across transactions — protecting revenue and customers while minimizing false positives and manual review.' },
    { num: '08', title: 'Decision Intelligence Systems', desc: 'AI that synthesizes data from multiple sources to support complex decisions — surfacing the right insights, scenarios, and recommendations at the moment of choice.' },
    { num: '09', title: 'Robotics & Intelligent Automation', desc: 'Integrating AI with robotic and software systems to automate physical and digital workflows — bringing intelligent orchestration to enterprise operations end to end.' },
    { num: '10', title: 'Custom AI Solutions', desc: 'Tailored AI built around your unique business requirements, data environment, and goals — from proof of concept to fully deployed, monitored, production-grade systems.' },
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
