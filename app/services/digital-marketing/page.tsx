import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Digital Marketing — TRONEXA | Data-Driven Marketing That Drives Visibility & Revenue',
  description:
    'TRONEXA builds data-driven digital marketing strategies — SEO, PPC, social media, content marketing, email automation, and conversion optimization to grow your brand and increase revenue.',
};

const data: ServicePageData = {
  num: '10',
  label: 'Digital Marketing',
  heroHeading: 'Accelerating Brand Growth\nThrough Digital Marketing',
  heroDesc:
    'In an increasingly competitive digital landscape, businesses need more than just an online presence — they need strategic marketing that drives measurable results. From attracting qualified leads to building brand awareness and increasing customer retention, digital marketing plays a crucial role in modern business growth.',
  overview:
    'Tronexa helps businesses achieve their marketing goals through comprehensive digital marketing solutions tailored to their industry, audience, and objectives. By leveraging data-driven strategies across multiple digital channels, Tronexa empowers organizations to strengthen their online presence, maximize return on investment, and achieve sustainable business growth.',
  deliverables: [
    { num: '01', title: 'Search Engine Optimization (SEO)', desc: 'On-page, off-page, and technical SEO strategies for improved rankings — conducting keyword research, content optimization, link building, and Core Web Vitals improvements to drive sustainable organic traffic growth.' },
    { num: '02', title: 'Pay-Per-Click Advertising (PPC)', desc: 'Targeted campaigns across Google Ads, Bing Ads, and other networks — with strategic keyword selection, compelling ad copy, and continuous bid optimization to maximize return on ad spend.' },
    { num: '03', title: 'Social Media Marketing', desc: 'Content creation, audience engagement, and campaign management across Facebook, Instagram, LinkedIn, X, YouTube, and TikTok — building brand presence and community while driving measurable business outcomes.' },
    { num: '04', title: 'Content Marketing', desc: 'Blogs, articles, landing pages, and brand-focused content strategies — creating high-value content that educates your audience, builds authority, and converts visitors into qualified leads.' },
    { num: '05', title: 'Email Marketing Automation', desc: 'Personalized email campaigns and customer nurturing workflows — using Mailchimp, HubSpot, and ActiveCampaign to deliver the right message to the right person at the right moment in their journey.' },
    { num: '06', title: 'Conversion Rate Optimization (CRO)', desc: 'Improving website performance and lead conversion rates — through A/B testing, heatmap analysis, user session recording, and landing page optimization to turn more visitors into customers.' },
    { num: '07', title: 'Lead Generation Campaigns', desc: 'Targeted acquisition strategies across multiple digital channels — designing and executing multi-touch campaigns that attract qualified prospects and move them through your sales funnel efficiently.' },
    { num: '08', title: 'Brand Reputation Management', desc: 'Monitoring and enhancing online brand perception — tracking mentions, managing reviews, responding to feedback, and building a positive brand narrative across all digital platforms.' },
    { num: '09', title: 'Influencer Marketing', desc: 'Strategic collaborations with industry influencers and creators — identifying and partnering with voices that authentically align with your brand to expand reach and build credibility with new audiences.' },
    { num: '10', title: 'Retargeting Campaigns', desc: 'Re-engagement strategies for website visitors and prospects — using Meta Pixel, Google Tag Manager, and LinkedIn Insight Tag to bring warm leads back to your brand with highly relevant messaging.' },
    { num: '11', title: 'Local SEO Optimization', desc: 'Enhanced visibility for location-based searches and local audiences — optimizing Google Business Profile, local citations, and geo-targeted content to capture customers searching near you.' },
    { num: '12', title: 'Marketing Analytics Dashboard', desc: 'Real-time campaign tracking and performance reporting — using Google Analytics 4, Looker Studio, and custom dashboards to give you complete visibility into what\'s working and where to invest next.' },
  ],
  whyPoints: [
    { title: 'Data-Driven Strategy', desc: 'Every marketing decision is grounded in data — we analyze market trends, audience behavior, competitor positioning, and campaign performance to build strategies that consistently deliver measurable business results.' },
    { title: 'Full-Funnel Approach', desc: 'We cover the entire customer journey — from awareness and consideration to conversion and retention — ensuring your marketing investment creates compounding value across every stage of the funnel.' },
    { title: 'Multi-Channel Expertise', desc: 'From SEO and PPC to social media, email, and influencer marketing, our team has deep expertise across every major digital channel — building integrated campaigns that amplify each other\'s impact.' },
    { title: 'Transparent Reporting', desc: 'You always know exactly what your marketing budget is doing — our real-time dashboards and regular reporting give you complete visibility into spend, performance, and ROI across every campaign.' },
    { title: 'Continuous Optimization', desc: 'We don\'t set and forget — our team continuously monitors, tests, and refines campaigns based on performance data, ensuring your marketing improves month over month as we learn what resonates with your audience.' },
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
