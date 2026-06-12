import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import ProjectShowcaseContent, { ProjectShowcaseData } from '@/components/ProjectShowcaseContent';

export const metadata: Metadata = {
  title: 'Digital Marketing — TRONEXA | Data-Driven Marketing Strategy Case Study',
  description:
    'How Tronexa built data-driven digital marketing strategies — SEO, PPC, social media, content marketing, email automation, and conversion optimization that increased visibility, leads, and revenue.',
};

const data: ProjectShowcaseData = {
  category: 'Digital Marketing',
  heroTitle: 'Data-Driven Marketing That\nDrives Visibility & Revenue',
  heroDesc: 'How Tronexa built comprehensive digital marketing strategies that expanded brand reach, attracted qualified prospects, and delivered measurable growth across SEO, PPC, social media, and content channels.',
  heroTags: [
    { label: 'Category', value: 'Digital Marketing' },
    { label: 'Channels', value: 'SEO · PPC · Social · Content' },
    { label: 'Tools', value: 'GA4 · HubSpot · SEMrush' },
  ],
  introTitle: 'Strategic marketing that delivers measurable results',
  introParagraphs: [
    'In an increasingly competitive digital landscape, businesses need more than just an online presence — they need strategic marketing that drives measurable results. From attracting qualified leads to building brand awareness and increasing customer retention, digital marketing plays a crucial role in modern business growth.',
    'Tronexa helps businesses achieve their marketing goals through comprehensive digital marketing solutions tailored to their industry, audience, and objectives. Our team combines creativity, analytics, and cutting-edge marketing technologies to develop campaigns that generate traffic, engagement, and conversions.',
    'By leveraging data-driven strategies across multiple digital channels, Tronexa empowers organizations to strengthen their online presence, maximize return on investment, and achieve sustainable business growth.',
  ],
  problemTitle: 'The growth barriers limiting digital success',
  problemIntro: 'Many businesses struggle to generate consistent online visibility and qualified leads due to ineffective marketing strategies and rapidly changing digital trends — missing valuable growth opportunities and experiencing low conversion rates.',
  problems: [
    'Low website traffic and poor online visibility limiting the ability to attract new customers and grow awareness',
    'Difficulty generating qualified leads and customer inquiries despite significant investment in digital presence',
    'Ineffective social media engagement and audience growth resulting in low brand authority and reach',
    'Limited brand awareness in competitive markets preventing businesses from capturing their fair share of demand',
    'Lack of measurable marketing performance and ROI tracking making it impossible to optimize spend effectively',
  ],
  solutionTitle: 'How Tronexa built the marketing strategy',
  solutionIntro: 'Tronexa developed a comprehensive digital marketing strategy focused on increasing visibility, attracting qualified prospects, and improving conversion performance — enabling businesses to expand reach and achieve measurable success.',
  solutions: [
    'Implemented comprehensive SEO strategies to improve search engine rankings and organic traffic growth',
    'Created targeted social media campaigns to increase engagement, brand awareness, and community growth',
    'Launched paid advertising campaigns across Google Ads, Meta Ads, and LinkedIn Ads for qualified lead generation',
    'Developed content marketing initiatives including blogs, landing pages, and video content to educate and convert',
    'Established advanced analytics and reporting systems using GA4 and Looker Studio for continuous optimization',
  ],
  featuresTitle: 'Every marketing channel and capability delivered',
  featuresSubtitle: 'A comprehensive suite of digital marketing services designed to maximize online growth, brand visibility, and business performance.',
  features: [
    { title: 'Search Engine Optimization (SEO)', desc: 'On-page, off-page, and technical SEO strategies for improved rankings — keyword research, link building, and Core Web Vitals optimization.' },
    { title: 'Pay-Per-Click Advertising (PPC)', desc: 'Targeted campaigns across Google Ads, Bing Ads, and display networks — with strategic keyword selection and continuous bid optimization.' },
    { title: 'Social Media Marketing', desc: 'Content creation, audience engagement, and campaign management across Facebook, Instagram, LinkedIn, X, YouTube, and TikTok.' },
    { title: 'Content Marketing', desc: 'Blogs, articles, landing pages, and brand-focused content strategies — building authority and converting visitors into qualified leads.' },
    { title: 'Email Marketing Automation', desc: 'Personalized email campaigns and customer nurturing workflows — using Mailchimp, HubSpot, and ActiveCampaign.' },
    { title: 'Conversion Rate Optimization', desc: 'Improving website performance and lead conversion — through A/B testing, heatmap analysis, and landing page optimization.' },
    { title: 'Lead Generation Campaigns', desc: 'Targeted acquisition strategies across multiple digital channels — attracting qualified prospects and moving them through the funnel.' },
    { title: 'Brand Reputation Management', desc: 'Monitoring and enhancing online brand perception — managing reviews, tracking mentions, and building positive brand narratives.' },
    { title: 'Influencer Marketing', desc: 'Strategic collaborations with industry influencers — expanding reach and building credibility with new audiences authentically.' },
    { title: 'Video Marketing', desc: 'Creation and promotion of engaging video content across platforms — YouTube, Instagram Reels, TikTok, and LinkedIn video.' },
    { title: 'Local SEO Optimization', desc: 'Enhanced visibility for location-based searches — optimizing Google Business Profile, local citations, and geo-targeted content.' },
    { title: 'Marketing Analytics Dashboard', desc: 'Real-time campaign tracking and performance reporting — complete visibility into spend, conversions, and ROI across all channels.' },
    { title: 'Audience Segmentation', desc: 'Data-driven targeting for improved campaign effectiveness — behavioral, demographic, and intent-based audience segments.' },
    { title: 'Retargeting Campaigns', desc: 'Re-engagement strategies for website visitors and prospects — bringing warm leads back with highly relevant, personalized messaging.' },
    { title: 'Marketing Automation', desc: 'Streamlined workflows for lead nurturing and customer engagement — automating multi-touch campaigns across email, social, and ads.' },
  ],
  techStackIntro: 'Tronexa leveraged industry-leading marketing tools and platforms to execute, monitor, and continuously optimize digital marketing campaigns across every channel.',
  techStack: [
    { label: 'SEO Tools', value: 'SEMrush, Ahrefs, Moz, Google Search Console' },
    { label: 'Advertising Platforms', value: 'Google Ads, Microsoft Ads, Meta Ads, LinkedIn Ads' },
    { label: 'Social Media Platforms', value: 'Facebook, Instagram, LinkedIn, X (Twitter), YouTube, TikTok' },
    { label: 'Analytics', value: 'Google Analytics 4 (GA4), Looker Studio, Hotjar' },
    { label: 'Email Marketing', value: 'Mailchimp, HubSpot, ActiveCampaign, Brevo' },
    { label: 'Marketing Automation', value: 'HubSpot, Marketo, Zapier' },
    { label: 'Content Management', value: 'WordPress, Shopify, Webflow, Custom CMS Solutions' },
    { label: 'CRM Integration', value: 'Salesforce, HubSpot CRM, Zoho CRM' },
    { label: 'Conversion Tracking', value: 'Google Tag Manager, Meta Pixel, LinkedIn Insight Tag' },
    { label: 'A/B Testing Tools', value: 'Optimizely, VWO, Google Optimize Alternatives' },
    { label: 'Reporting & Dashboards', value: 'Power BI, Looker Studio, Custom Reporting Systems' },
    { label: 'CDN & Performance', value: 'Cloudflare, AWS CloudFront' },
  ],
  hostingTitle: 'High-performance infrastructure\nfor marketing assets',
  hostingIntro: 'Tronexa ensured all marketing assets, landing pages, and campaign infrastructure were deployed on secure, high-performance hosting with global CDN coverage and continuous uptime monitoring.',
  hosting: [
    { label: 'Landing Pages', value: 'High-Performance Cloud Hosting for Marketing Assets' },
    { label: 'CDN', value: 'Global CDN via Cloudflare & AWS CloudFront' },
    { label: 'Performance', value: 'Core Web Vitals Optimization & Speed Enhancement' },
    { label: 'Security', value: 'SSL/TLS Encryption & DDoS Protection' },
    { label: 'Analytics Infra', value: 'GA4 & Tag Manager Deployment and Management' },
    { label: 'Email Infra', value: 'Deliverability Optimization & Domain Authentication' },
    { label: 'Uptime', value: '24/7 Monitoring for Campaign-Critical Infrastructure' },
    { label: 'Compliance', value: 'GDPR & Privacy Compliance Frameworks' },
  ],
  teamTitle: 'A full-stack digital marketing\nand creative team',
  teamIntro: 'Tronexa assembled a full-service digital marketing team combining strategy, creativity, analytics, and technology — working as an extension of the client\'s team to drive consistent growth.',
  team: [
    { role: 'Digital Strategists', desc: 'Channel strategy, campaign planning, audience research, and go-to-market framework development' },
    { role: 'SEO Specialists', desc: 'Technical SEO, keyword strategy, content optimization, and link building for organic growth' },
    { role: 'Paid Media Managers', desc: 'Google Ads, Meta Ads, and LinkedIn Ads campaign management and bid optimization' },
    { role: 'Content Creators', desc: 'Blog writing, landing page copywriting, video scripts, and social media content production' },
    { role: 'Designers & Video Editors', desc: 'Ad creative, social graphics, video production, and brand-consistent visual content' },
    { role: 'Analytics & Reporting Specialists', desc: 'GA4 setup, dashboard creation, campaign attribution, and performance reporting' },
  ],
  maintenanceTitle: 'Continuous optimization as\ncampaigns learn and improve',
  maintenanceIntro: 'Digital marketing is never a set-and-forget engagement. Tronexa continuously monitored, tested, and refined campaigns based on performance data, audience behavior, and market trends.',
  maintenance: [
    'Monthly SEO audits, keyword performance reviews, and content updates to maintain and improve organic rankings',
    'Continuous PPC bid optimization, ad creative refreshes, and audience targeting refinement for better ROAS',
    'Social media content calendar management, community engagement, and performance-based strategy adjustments',
    'A/B testing of landing pages, ad creatives, and email subjects to continuously improve conversion rates',
    'Regular analytics reviews, attribution modeling, and ROI reporting to align marketing investment with business outcomes',
  ],
  conclusionTitle: 'Measurable growth across\nevery digital channel',
  conclusionParagraphs: [
    'Tronexa successfully built and executed a comprehensive digital marketing strategy that transformed online visibility, qualified lead generation, and customer acquisition for the businesses we serve. By combining data-driven strategy, creative excellence, and continuous optimization, we delivered campaigns that generated real, measurable business outcomes.',
    'The result was increased organic traffic, higher-quality leads, improved conversion rates, and stronger brand authority across all digital channels. Through strategic marketing, advanced analytics, and a relentless focus on performance, Tronexa helped businesses achieve sustainable digital growth and a stronger competitive position in their markets.',
  ],
};

export default function DigitalMarketingProjectPage() {
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
