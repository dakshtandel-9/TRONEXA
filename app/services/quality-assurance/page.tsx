import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Quality Assurance — TRONEXA | Deliver Software With Confidence',
  description:
    'TRONEXA provides manual testing, automation testing, functional, performance, regression, security, API, mobile, and web application testing services.',
};

const data: ServicePageData = {
  num: '12',
  label: 'Quality Assurance',
  heroHeading: 'Deliver Software\nWith Confidence',
  heroDesc:
    'Ensure exceptional quality, reliability, and performance through comprehensive testing and quality assurance services.',
  overview:
    'TRONEXA helps organizations launch stable, secure, and high-performing digital products through rigorous testing methodologies. Our QA specialists identify issues early, reduce risks, and ensure applications perform flawlessly across platforms and environments.',
  deliverables: [
    { num: '01', title: 'Manual Testing', desc: 'Performing detailed exploratory and scripted testing to identify bugs, usability issues, and edge-case failures.' },
    { num: '02', title: 'Automation Testing', desc: 'Building automated test suites that accelerate regression cycles and provide continuous quality validation.' },
    { num: '03', title: 'Functional Testing', desc: 'Verifying that every feature, workflow, and business rule works exactly as specified and expected.' },
    { num: '04', title: 'Performance Testing', desc: 'Stress-testing systems under load to identify bottlenecks, optimize response times, and ensure scalability.' },
    { num: '05', title: 'Regression Testing', desc: 'Ensuring that new releases and updates do not break existing functionality across the application.' },
    { num: '06', title: 'Security Testing', desc: 'Identifying vulnerabilities, misconfigurations, and attack vectors before they reach production environments.' },
    { num: '07', title: 'API Testing', desc: 'Validating API endpoints for correctness, performance, security, and contract compliance.' },
    { num: '08', title: 'Mobile Application Testing', desc: 'Testing mobile apps across devices, OS versions, and network conditions for consistent performance.' },
    { num: '09', title: 'Web Application Testing', desc: 'Ensuring web applications function correctly across browsers, screen sizes, and user environments.' },
    { num: '10', title: 'QA Consulting', desc: 'Helping organizations build effective QA strategies, test plans, tooling, and quality culture from the ground up.' },
  ],
  whyPoints: [
    { title: 'Reduced Production Risks', desc: 'Our comprehensive test coverage catches critical defects before go-live — dramatically reducing the cost and impact of post-release issues.' },
    { title: 'Faster Releases', desc: 'Our automation frameworks and shift-left QA practices accelerate release cycles without sacrificing quality or coverage.' },
    { title: 'Better User Experience', desc: 'We test through the lens of the end user — identifying friction points, accessibility issues, and failure scenarios that automated tools miss.' },
    { title: 'Comprehensive Test Coverage', desc: 'From unit and integration tests to end-to-end, performance, and security testing, we ensure every layer of your application is validated.' },
    { title: 'Enterprise Quality Standards', desc: 'Our QA processes align with industry standards — ISO 25010, ISTQB methodologies, and sector-specific compliance requirements where applicable.' },
  ],
  cta: 'Ensure Product Quality',
};

export default function QualityAssurancePage() {
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
