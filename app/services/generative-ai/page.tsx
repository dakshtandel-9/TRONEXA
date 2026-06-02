import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Generative AI — TRONEXA | Unlock The Power Of Intelligent Creation',
  description:
    'TRONEXA helps organizations harness Generative AI to automate content creation, enhance productivity, and build intelligent systems for text, images, video, voice, and code.',
};

const data: ServicePageData = {
  num: '04',
  label: 'Generative AI',
  heroHeading: 'Unlock The Power Of\nIntelligent Creation',
  heroDesc:
    'Leverage Generative AI to automate workflows, accelerate innovation, and create intelligent digital experiences that transform business operations.',
  overview:
    'TRONEXA helps organizations harness Generative AI to automate content creation, enhance productivity, and build intelligent systems capable of generating text, images, videos, voice, and code. Our solutions are secure, scalable, and tailored to business goals.',
  deliverables: [
    { num: '01', title: 'AI Chatbots', desc: 'Developing advanced conversational agents powered by large language models for customer and enterprise use.' },
    { num: '02', title: 'Virtual Assistants', desc: 'Building intelligent voice and text assistants that understand context and complete complex tasks autonomously.' },
    { num: '03', title: 'AI Content Generation', desc: 'Building systems that automatically generate text, images, video, and audio content at scale.' },
    { num: '04', title: 'AI Image Generation', desc: 'Integrating state-of-the-art diffusion models to generate on-brand visuals, product images, and creative assets.' },
    { num: '05', title: 'AI Video Generation', desc: 'Automating video production workflows with AI-generated scenes, voiceovers, and visual storytelling.' },
    { num: '06', title: 'AI Voice Generation', desc: 'Creating natural-sounding synthetic voices for customer service, e-learning, and media applications.' },
    { num: '07', title: 'AI Code Generation', desc: 'Accelerating software development with AI-powered code generation, review, and completion tools.' },
    { num: '08', title: 'Prompt Engineering', desc: 'Designing and refining prompts to maximize accuracy, safety, and performance of AI outputs.' },
    { num: '09', title: 'Document Intelligence', desc: 'Automating extraction, summarization, and classification of information from complex documents.' },
    { num: '10', title: 'Custom Generative AI Solutions', desc: 'Building end-to-end proprietary AI platforms tailored to unique business needs and data environments.' },
  ],
  whyPoints: [
    { title: 'Enterprise AI Expertise', desc: 'Our team has deep hands-on experience deploying LLMs, diffusion models, and multimodal AI in production enterprise environments.' },
    { title: 'Secure AI Integration', desc: 'We prioritize data privacy and security — ensuring your AI systems operate within compliance boundaries and never expose sensitive information.' },
    { title: 'Workflow Automation', desc: 'We map your existing workflows and identify the highest-value automation opportunities, then deploy AI to eliminate manual bottlenecks at scale.' },
    { title: 'Custom AI Models', desc: 'When off-the-shelf models are not enough, we fine-tune or build domain-specific models trained on your data for superior accuracy.' },
    { title: 'Future-Ready Architecture', desc: 'Our Generative AI systems are built to evolve — with modular designs that can swap in new models as the technology landscape advances.' },
  ],
  cta: 'Explore Generative AI',
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
