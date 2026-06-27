import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Generative AI — TRONEXA | Intelligent AI Systems That Drive Automation & Growth',
  description:
    'TRONEXA builds custom Generative AI solutions — intelligent chatbots, content generation platforms, knowledge bases, and enterprise AI automation systems powered by GPT, Claude, Gemini, and more.',
};

const data: ServicePageData = {
  num: '04',
  label: 'Generative AI',
  heroHeading: 'Revolutionizing Business Operations\nWith Generative AI',
  heroDesc:
    'As businesses navigate an increasingly digital landscape, Generative AI has emerged as a powerful tool for enhancing productivity, automating workflows, and delivering personalized customer experiences. Tronexa helps businesses harness the full potential of Generative AI by developing custom AI-powered solutions tailored to their unique requirements.',
  overview:
    'From intelligent chatbots and virtual assistants to content generation platforms and enterprise AI automation systems, our solutions are designed to create measurable business value. By combining advanced AI models, scalable cloud infrastructure, and seamless system integrations, Tronexa empowers organizations to transform how they operate, engage customers, and innovate at scale.',
  deliverablesLabel: 'Generative AI Capabilities',
  deliverablesHeading: 'Intelligent capabilities that\nautomate, create, and scale',
  deliverables: [
    { num: '01', title: 'AI Chatbot & Virtual Assistant', desc: 'Human-like conversational experiences for customer support and internal operations — powered by fine-tuned language models that understand context, intent, and nuance.' },
    { num: '02', title: 'Content Generation Engine', desc: 'Automated creation of blogs, emails, product descriptions, and marketing content — enabling teams to scale content production without scaling headcount.' },
    { num: '03', title: 'Knowledge Base Assistant', desc: 'AI-powered search and retrieval from company documents and databases — giving employees instant access to institutional knowledge through natural language queries.' },
    { num: '04', title: 'Natural Language Processing (NLP)', desc: 'Understanding, analyzing, and responding to user queries in real time — enabling sentiment detection, entity extraction, classification, and intelligent routing.' },
    { num: '05', title: 'Document Summarization', desc: 'Automated extraction of key insights from lengthy documents and reports — reducing hours of reading to seconds of AI-generated, accurate summaries.' },
    { num: '06', title: 'AI-Powered Recommendation System', desc: 'Personalized suggestions based on user behavior and preferences — driving engagement, retention, and revenue through intelligent, context-aware recommendations.' },
    { num: '07', title: 'Workflow Automation', desc: 'AI-driven task execution and business process optimization — replacing manual, repetitive workflows with intelligent automation that improves accuracy and speed.' },
    { num: '08', title: 'Intelligent Data Extraction', desc: 'Automated processing of PDFs, forms, invoices, and contracts — extracting structured data from unstructured documents with high accuracy and minimal human review.' },
    { num: '09', title: 'Sentiment Analysis', desc: 'Understanding customer emotions and feedback trends — enabling businesses to respond proactively to dissatisfaction and amplify positive experiences at scale.' },
    { num: '10', title: 'Enterprise Search System', desc: 'Instant retrieval of information from internal knowledge repositories — connecting employees with the right answers from across your entire organizational data ecosystem.' },
    { num: '11', title: 'Custom AI Model Integration', desc: 'Fine-tuned models aligned with specific business requirements — built on OpenAI GPT, Claude, Gemini, Llama, or Mistral and integrated into your existing systems.' },
    { num: '12', title: 'Analytics Dashboard', desc: 'AI usage tracking, performance metrics, and business insights — giving leadership full visibility into how AI is driving value across the organization.' },
  ],
  whyPoints: [
    { title: 'Multi-Model Expertise', desc: 'Our team works across the full landscape of AI models — OpenAI GPT, Anthropic Claude, Google Gemini, Meta Llama, and Mistral — selecting and fine-tuning the right model for your specific business requirements.' },
    { title: 'Enterprise-Grade Integration', desc: 'We integrate Generative AI seamlessly with your existing business applications, CRM, ERP, knowledge bases, and workflows — no rip-and-replace, just intelligent augmentation of what you already have.' },
    { title: 'Secure & Compliant by Design', desc: 'All AI solutions are built with data privacy, access control, and compliance in mind — ensuring your sensitive business information is protected throughout every AI interaction.' },
    { title: 'Scalable Vector & RAG Architecture', desc: 'We implement Retrieval-Augmented Generation (RAG) and vector database architectures using Pinecone, Weaviate, and ChromaDB — enabling AI that reasons over your proprietary data accurately.' },
    { title: 'Continuous Optimization', desc: 'AI models improve over time with prompt refinement, fine-tuning, and feedback loops — our team provides ongoing optimization to ensure your AI system keeps delivering better results.' },
  ],
  cta: 'Build Your AI Solution',
};

export default function GenerativeAIPage() {
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
