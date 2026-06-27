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
    'TRONEXA builds advanced NLP solutions that enable businesses to automate communication, improve customer experiences, and extract valuable insights from text and voice data. Powered by state-of-the-art transformer models and fine-tuned on your domain data, our systems are designed for accuracy, multilingual reach, real-time performance, and enterprise-grade scalability.',
  deliverablesLabel: 'NLP Capabilities',
  deliverablesHeading: 'Language intelligence that\nunderstands and responds',
  deliverables: [
    { num: '01', title: 'Conversational AI', desc: 'Context-aware dialogue systems for customer service, HR, and enterprise automation — understanding intent and nuance to resolve queries and complete tasks through natural conversation.' },
    { num: '02', title: 'Sentiment Analysis', desc: 'Analyzing customer feedback, reviews, and social data to detect sentiment and emotional tone — enabling teams to respond proactively to dissatisfaction and amplify positive experiences at scale.' },
    { num: '03', title: 'Language Translation', desc: 'Accurate translation systems for multilingual content and global communication — preserving tone, context, and domain-specific terminology across dozens of languages.' },
    { num: '04', title: 'Speech Recognition', desc: 'High-accuracy speech-to-text for voice interfaces, transcription, and call analytics — robust to accents, background noise, and real-world audio conditions.' },
    { num: '05', title: 'Text Classification', desc: 'Automatically classifying documents, emails, tickets, and content into structured categories — routing and prioritizing high volumes of text without manual effort.' },
    { num: '06', title: 'Text Summarization', desc: 'Concise, accurate summaries generated from long documents, reports, and articles — turning hours of reading into seconds of actionable understanding.' },
    { num: '07', title: 'Intelligent Search Systems', desc: 'Meaning-based semantic search that improves relevance and content discovery — connecting users to the right information even when keywords do not match exactly.' },
    { num: '08', title: 'Document Processing Automation', desc: 'Extracting structured data and relationships from contracts, reports, and regulatory documents — automating compliance-heavy workflows with high accuracy and minimal review.' },
    { num: '09', title: 'Voice Assistants', desc: 'Natural-sounding voice AI for customer service, devices, and enterprise applications — combining speech recognition, language understanding, and lifelike text-to-speech.' },
    { num: '10', title: 'Custom NLP Solutions', desc: 'NLP models trained and fine-tuned on your proprietary data for specialized domains — delivering accuracy and vocabulary tailored to your industry and use case.' },
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
