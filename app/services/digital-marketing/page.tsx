import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Digital Marketing — TRONEXA | Drive Visibility, Leads And Business Growth',
  description:
    'TRONEXA delivers SEO, PPC, social media marketing, content marketing, email campaigns, brand strategy, and performance analytics for measurable business growth.',
};

const data: ServicePageData = {
  num: '13',
  label: 'Digital Marketing',
  heroHeading: 'Drive Visibility, Leads\nAnd Business Growth',
  heroDesc:
    'Reach the right audience with data-driven digital marketing strategies designed to increase awareness, engagement, and conversions.',
  overview:
    'TRONEXA combines creativity, analytics, and performance marketing to help brands grow in competitive digital markets. We develop customized marketing strategies that improve visibility, attract qualified leads, and generate measurable business outcomes.',
  deliverables: [
    { num: '01', title: 'Search Engine Optimization (SEO)', desc: 'Improving organic rankings and search visibility through technical SEO, on-page optimization, and authoritative link building.' },
    { num: '02', title: 'Pay-Per-Click Advertising', desc: 'Generating high-quality leads through targeted Google Ads, Bing Ads, and display campaigns optimized for ROI.' },
    { num: '03', title: 'Social Media Marketing', desc: 'Building brand presence and driving engagement across LinkedIn, Instagram, Facebook, and other platforms.' },
    { num: '04', title: 'Content Marketing', desc: 'Creating valuable, SEO-optimized content that attracts audiences, builds authority, and converts visitors into leads.' },
    { num: '05', title: 'Marketing Automation', desc: 'Streamlining customer journeys and campaign delivery through intelligent automation tools and workflow design.' },
    { num: '06', title: 'Email Marketing', desc: 'Designing and automating targeted email campaigns for lead nurturing, customer retention, and promotions.' },
    { num: '07', title: 'Brand Strategy', desc: 'Building strong, consistent brand identities — including messaging, visual assets, and positioning frameworks.' },
    { num: '08', title: 'Lead Generation Campaigns', desc: 'Creating multi-channel campaigns designed to attract, capture, and qualify high-intent business leads at scale.' },
    { num: '09', title: 'Conversion Rate Optimization', desc: 'Analyzing user behavior and testing page elements to improve conversion rates across landing pages and funnels.' },
    { num: '10', title: 'Performance Analytics', desc: 'Tracking and reporting campaign performance with clear attribution models to continuously improve marketing outcomes.' },
  ],
  whyPoints: [
    { title: 'Data-Driven Strategies', desc: 'Every decision we make is backed by data — from audience research and competitive analysis to campaign testing and attribution modeling.' },
    { title: 'ROI-Focused Campaigns', desc: 'We tie every marketing activity to business outcomes — leads, pipeline, and revenue — not just impressions and clicks.' },
    { title: 'Multi-Channel Expertise', desc: 'We create cohesive strategies across search, social, email, and content — ensuring consistent messaging and compounding results across channels.' },
    { title: 'Transparent Reporting', desc: 'You always know exactly what is working and why. We provide clear, honest reporting with actionable recommendations every month.' },
    { title: 'Sustainable Growth', desc: 'We balance short-term performance marketing with long-term brand building — creating sustainable growth that compounds over time.' },
  ],
  cta: 'Grow Your Digital Presence',
};

export default function DigitalMarketingPage() {
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
