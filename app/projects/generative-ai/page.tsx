import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import ProjectShowcaseContent, { ProjectShowcaseData } from '@/components/ProjectShowcaseContent';

export const metadata: Metadata = {
  title: 'Generative AI Solutions — TRONEXA | Intelligent AI Systems Case Study',
  description:
    'How Tronexa built Generative AI solutions — intelligent chatbots, content generation, enterprise search, NLP, and workflow automation systems powered by GPT, Claude, Gemini, and LangChain.',
};

const data: ProjectShowcaseData = {
  category: 'Generative AI',
  heroTitle: 'Intelligent AI Systems\nDriving Automation & Growth',
  heroDesc: 'How Tronexa harnessed the full potential of Generative AI to build custom intelligent systems — automating workflows, enhancing customer engagement, and unlocking actionable insights from organizational data.',
  heroTags: [
    { label: 'Category', value: 'Generative AI' },
    { label: 'Models', value: 'GPT · Claude · Gemini' },
    { label: 'Stack', value: 'LangChain · Python · React' },
  ],
  introTitle: 'AI-powered systems that transform how businesses operate',
  introParagraphs: [
    'As businesses navigate an increasingly digital landscape, Generative AI has emerged as a powerful tool for enhancing productivity, automating workflows, and delivering personalized customer experiences. Organizations across industries are seeking innovative ways to leverage AI to reduce operational costs, improve decision-making, and unlock new growth opportunities.',
    'Tronexa helps businesses harness the full potential of Generative AI by developing custom AI-powered solutions tailored to their unique requirements. From intelligent chatbots and virtual assistants to content generation platforms and enterprise AI automation systems, our solutions are designed to create measurable business value.',
    'By combining advanced AI models, scalable cloud infrastructure, and seamless system integrations, Tronexa empowers organizations to transform how they operate, engage customers, and innovate at scale.',
  ],
  problemTitle: 'The operational limits of manual processes',
  problemIntro: 'Many organizations struggle to manage growing volumes of data, repetitive tasks, and customer interactions while maintaining efficiency and service quality — facing reduced productivity and missed opportunities for innovation.',
  problems: [
    'Manual workflows consuming significant employee time and resources, reducing capacity for high-value strategic work',
    'Customer support teams overwhelmed by increasing volumes of repetitive queries, leading to slow response times',
    'Content creation processes that are slow, expensive, and difficult to scale to meet growing marketing demands',
    'Business insights trapped within large volumes of unstructured data — inaccessible without specialized analysis',
    'Existing systems lacking intelligent automation and personalization capabilities required for modern digital experiences',
  ],
  solutionTitle: 'How Tronexa built the AI solution',
  solutionIntro: 'Tronexa developed customized Generative AI solutions that automate processes, enhance user experiences, and provide intelligent business assistance — enabling businesses to automate tasks, improve service quality, and unlock insights from organizational data.',
  solutions: [
    'Built AI-powered chatbots and virtual assistants for customer engagement and internal knowledge management',
    'Implemented intelligent content generation for marketing, sales, and operational communications at scale',
    'Developed AI-powered knowledge bases and enterprise search systems with RAG architecture',
    'Integrated advanced language models (GPT, Claude, Gemini) with existing business applications and workflows',
    'Enabled intelligent automation, document processing, sentiment analysis, and decision support systems',
  ],
  featuresTitle: 'Every intelligent capability delivered',
  featuresSubtitle: 'A comprehensive suite of AI-powered capabilities designed to improve productivity, automation, and customer engagement across the organization.',
  features: [
    { title: 'AI Chatbot & Virtual Assistant', desc: 'Human-like conversational experiences for customer support and internal operations — fine-tuned for context, intent, and business-specific knowledge.' },
    { title: 'Content Generation Engine', desc: 'Automated creation of blogs, emails, product descriptions, and marketing content — scaling content production without scaling headcount.' },
    { title: 'Knowledge Base Assistant', desc: 'AI-powered search and retrieval from company documents and databases — giving employees instant access to institutional knowledge.' },
    { title: 'Natural Language Processing (NLP)', desc: 'Understanding, analyzing, and responding to user queries in real time — with entity extraction, classification, and intelligent routing.' },
    { title: 'Document Summarization', desc: 'Automated extraction of key insights from lengthy documents and reports — reducing hours of reading to accurate AI-generated summaries.' },
    { title: 'AI Recommendation System', desc: 'Personalized suggestions based on user behavior and preferences — driving engagement, retention, and revenue through intelligent recommendations.' },
    { title: 'Multi-Language Support', desc: 'Communication and content generation across multiple languages — making AI accessible to global teams and diverse customer bases.' },
    { title: 'Workflow Automation', desc: 'AI-driven task execution and business process optimization — replacing manual, repetitive workflows with intelligent automation.' },
    { title: 'Custom AI Model Integration', desc: 'Fine-tuned models aligned with specific business requirements — built on OpenAI, Claude, Gemini, Llama, or Mistral.' },
    { title: 'Intelligent Data Extraction', desc: 'Automated processing of PDFs, forms, invoices, and contracts — extracting structured data from unstructured documents with high accuracy.' },
    { title: 'Sentiment Analysis', desc: 'Understanding customer emotions and feedback trends — enabling proactive responses to dissatisfaction and amplification of positive experiences.' },
    { title: 'Voice-to-Text & Text-to-Speech', desc: 'Enhanced accessibility and conversational interactions — enabling voice-driven workflows and audio content generation.' },
    { title: 'Enterprise Search System', desc: 'Instant retrieval of information from internal knowledge repositories — connecting employees with the right answers across all organizational data.' },
    { title: 'Analytics Dashboard', desc: 'AI usage tracking, performance metrics, and business insights — giving leadership full visibility into how AI drives value.' },
    { title: 'Secure Role-Based Access', desc: 'Controlled access to sensitive data and AI functionalities — ensuring the right people interact with the right AI capabilities.' },
  ],
  techStackIntro: 'Tronexa utilized a modern AI-focused technology stack to build scalable, secure, and high-performing Generative AI solutions with state-of-the-art language models and infrastructure.',
  techStack: [
    { label: 'AI Models', value: 'OpenAI GPT, Claude, Gemini, Llama, Mistral' },
    { label: 'Frontend', value: 'React.js, Next.js, Angular, Flutter' },
    { label: 'Backend', value: 'Node.js, Express.js, Python, FastAPI' },
    { label: 'AI Frameworks', value: 'LangChain, LlamaIndex, Hugging Face Transformers' },
    { label: 'Vector Databases', value: 'Pinecone, Weaviate, ChromaDB, FAISS' },
    { label: 'Databases', value: 'PostgreSQL, MongoDB, MySQL' },
    { label: 'Cloud Infrastructure', value: 'AWS, Google Cloud Platform, Microsoft Azure' },
    { label: 'API Integration', value: 'REST APIs, GraphQL, Enterprise System Integrations' },
    { label: 'Authentication', value: 'OAuth 2.0, JWT, Single Sign-On (SSO)' },
    { label: 'Analytics', value: 'Google Analytics, Mixpanel, Custom AI Monitoring Dashboards' },
    { label: 'Security', value: 'Data Encryption, Access Control, Secure API Management' },
    { label: 'DevOps', value: 'Docker, Kubernetes, GitHub Actions, CI/CD Pipelines' },
  ],
  hostingTitle: 'Scalable AI infrastructure\nfor enterprise performance',
  hostingIntro: 'Tronexa deployed the Generative AI platform using enterprise-grade cloud infrastructure designed for performance, scalability, and reliability — with global CDN, auto-scaling compute, and vector database hosting.',
  hosting: [
    { label: 'Primary Cloud', value: 'AWS Cloud Hosting & AI Services' },
    { label: 'AI Infrastructure', value: 'Google Cloud AI & Azure AI Deployment' },
    { label: 'Orchestration', value: 'Kubernetes-Based Container Management' },
    { label: 'Scaling', value: 'Auto-Scaling Compute Resources for AI Workloads' },
    { label: 'Vector Storage', value: 'Vector Database Hosting & Management' },
    { label: 'Knowledge Storage', value: 'Cloud Storage for AI Knowledge Repositories' },
    { label: 'Security', value: 'Global CDN and Multi-Layer Security Protection' },
    { label: 'Monitoring', value: 'Real-Time AI Performance & Usage Monitoring' },
  ],
  teamTitle: 'Specialized AI engineers\nand data scientists',
  teamIntro: 'Tronexa assembled a specialized AI delivery team to ensure successful implementation and continuous optimization — ensuring AI capabilities aligned with business objectives while maintaining security, reliability, and scalability.',
  team: [
    { role: 'AI Engineers', desc: 'Model integration, prompt engineering, RAG architecture, and AI system optimization' },
    { role: 'Backend Developers', desc: 'API development, system integrations, and scalable service architecture' },
    { role: 'Frontend Developers', desc: 'Intuitive AI-powered user interfaces and conversational UI design' },
    { role: 'Data Engineers', desc: 'Data preparation, processing, vector embedding, and knowledge management' },
    { role: 'QA & Security Specialists', desc: 'Testing, compliance validation, and AI safety evaluation' },
    { role: 'DevOps Engineers', desc: 'Infrastructure management, CI/CD pipelines, and cloud deployment' },
  ],
  maintenanceTitle: 'Continuous model improvement\nas requirements evolve',
  maintenanceIntro: 'Following deployment, Tronexa provided continuous monitoring, model optimization, and maintenance to ensure long-term success — with prompt refinement, AI model updates, and performance tuning.',
  maintenance: [
    'Prompt refinement and AI model fine-tuning to improve response accuracy and business relevance over time',
    'Infrastructure scaling and performance optimization to handle growing usage and evolving AI workloads',
    'Security enhancements and access control updates to protect sensitive business data and AI interactions',
    'Integration support for new enterprise systems, data sources, and API endpoints as the platform evolves',
    'Regular evaluations to improve response quality, reduce operational costs, and align with business objectives',
  ],
  conclusionTitle: 'Intelligent systems that\ntransform business operations',
  conclusionParagraphs: [
    'Tronexa successfully delivered a powerful Generative AI solution that transformed how businesses interact with customers, manage information, and automate operations. By combining cutting-edge AI technologies with scalable architecture and seamless integrations, we created intelligent systems capable of driving efficiency, innovation, and measurable business outcomes.',
    'The solution empowered organizations to streamline workflows, enhance customer experiences, reduce operational overhead, and unlock new opportunities for growth. Through strategic implementation and ongoing optimization, Tronexa helped businesses embrace the future of AI with confidence and achieve a sustainable competitive advantage in the digital era.',
  ],
};

export default function GenerativeAIProjectPage() {
  return (
    <SoundProvider>
      <LoadingProvider>
        <main style={{ background: '#0d0f1a', minHeight: '100vh' }}>
          <CustomCursor />
          <ClickSound />
          <Navbar />
          <ProjectShowcaseContent data={data} />
        </main>
      </LoadingProvider>
    </SoundProvider>
  );
}
