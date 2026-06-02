import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'NLP Solutions — TRONEXA | Transform Human Language Into Business Intelligence',
  description:
    'TRONEXA builds advanced NLP solutions for conversational AI, sentiment analysis, translation, speech recognition, text classification, and intelligent search.',
};

const data: ServicePageData = {
  num: '06',
  label: 'NLP Solutions',
  heroHeading: 'Transform Human Language\nInto Business Intelligence',
  heroDesc:
    'Empower your organization with intelligent language processing systems that understand, analyze, and respond to human communication.',
  overview:
    'TRONEXA builds advanced NLP solutions that enable businesses to automate communication, improve customer experiences, and extract valuable insights from text and voice data. Our systems are designed for accuracy, scalability, and enterprise performance.',
  deliverables: [
    { num: '01', title: 'Conversational AI', desc: 'Building context-aware dialogue systems for customer service, HR, and enterprise automation.' },
    { num: '02', title: 'Sentiment Analysis', desc: 'Analyzing customer feedback, reviews, and social data to detect sentiment and emotional tone.' },
    { num: '03', title: 'Language Translation', desc: 'Building accurate translation systems for multilingual content and global business communication.' },
    { num: '04', title: 'Speech Recognition', desc: 'Converting spoken language to text with high accuracy for voice interfaces and transcription.' },
    { num: '05', title: 'Text Classification', desc: 'Automatically classifying documents, emails, tickets, and content into structured categories.' },
    { num: '06', title: 'Text Summarization', desc: 'Automatically generating concise summaries from long documents, reports, and articles.' },
    { num: '07', title: 'Intelligent Search Systems', desc: 'Improving search relevance and content discovery using meaning-based semantic similarity models.' },
    { num: '08', title: 'Document Processing Automation', desc: 'Extracting structured data and relationships from contracts, reports, and regulatory documents.' },
    { num: '09', title: 'Voice Assistants', desc: 'Creating natural-sounding voice AI systems for customer service, devices, and enterprise applications.' },
    { num: '10', title: 'Custom NLP Solutions', desc: 'Training and fine-tuning NLP models on proprietary data for specialized business domains.' },
  ],
  whyPoints: [
    { title: 'Advanced Language Models', desc: 'We work with the latest transformer-based architectures — BERT, GPT, T5, and beyond — selecting and fine-tuning the right model for each use case.' },
    { title: 'Multilingual Capabilities', desc: 'Our NLP systems support dozens of languages, enabling businesses to serve global audiences with consistent quality and accuracy.' },
    { title: 'Enterprise Automation', desc: 'We identify the highest-impact language workflows in your operations and automate them — reducing manual effort and accelerating processing speed.' },
    { title: 'Real-Time Processing', desc: 'Our NLP pipelines are optimized for low-latency inference, enabling real-time language understanding in customer-facing applications.' },
    { title: 'High Accuracy Results', desc: 'Through domain-specific fine-tuning and rigorous evaluation, our models achieve accuracy levels that meet production requirements in regulated industries.' },
  ],
  cta: 'Unlock Language Intelligence',
};

export default function NLPSolutionsPage() {
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
