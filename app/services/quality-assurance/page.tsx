import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Quality Assurance — TRONEXA | End-to-End QA Services for Software Excellence',
  description:
    'TRONEXA delivers comprehensive Quality Assurance services — functional testing, test automation, performance, security, mobile, and cross-browser testing integrated into your CI/CD pipeline.',
};

const data: ServicePageData = {
  num: '09',
  label: 'Quality Assurance',
  heroHeading: 'Ensuring Software Excellence\nThrough Quality Assurance',
  heroDesc:
    'In today\'s fast-paced digital landscape, software quality plays a critical role in customer satisfaction, business reputation, and operational success. Even minor defects can lead to security vulnerabilities, performance issues, revenue loss, and poor user experiences. Tronexa provides comprehensive QA services designed to ensure software products meet the highest standards.',
  overview:
    'Our QA experts work closely with development teams to identify issues early, reduce risks, and deliver flawless digital experiences. By implementing structured testing processes, advanced automation frameworks, and continuous quality monitoring, Tronexa helps organizations launch software products with confidence and maintain long-term operational excellence.',
  deliverables: [
    { num: '01', title: 'Functional Testing', desc: 'Validation of application features, workflows, and business requirements — ensuring every user story and acceptance criterion is met before release through rigorous manual and scripted testing.' },
    { num: '02', title: 'Automated Testing Framework', desc: 'Reusable automated test cases for faster and more reliable testing — built with Selenium, Cypress, and Playwright and integrated directly into your CI/CD pipeline for continuous validation.' },
    { num: '03', title: 'Regression Testing', desc: 'Verification that new changes do not impact existing functionality — with comprehensive regression suites that run automatically on every code change to catch unintended breakage early.' },
    { num: '04', title: 'Performance Testing', desc: 'Evaluation of system speed, responsiveness, and scalability under load — using Apache JMeter and Gatling to identify bottlenecks before they impact real users in production.' },
    { num: '05', title: 'Load & Stress Testing', desc: 'Analysis of application behavior during peak traffic conditions — simulating thousands of concurrent users to validate that your system maintains performance under extreme demand.' },
    { num: '06', title: 'Security Testing', desc: 'Identification of vulnerabilities, threats, and compliance issues — using OWASP ZAP, Burp Suite, and SonarQube to assess and remediate security risks before they can be exploited.' },
    { num: '07', title: 'API Testing', desc: 'Validation of backend services, integrations, and data exchange processes — using Postman and REST Assured to ensure APIs behave correctly, securely, and at expected performance levels.' },
    { num: '08', title: 'Cross-Browser Testing', desc: 'Consistent performance across major browsers and versions — using BrowserStack and Sauce Labs to validate your application on Chrome, Firefox, Safari, and Edge across desktop and mobile.' },
    { num: '09', title: 'Mobile Application Testing', desc: 'Verification across Android and iOS devices — using Appium and Firebase Test Lab to test on real devices and emulators, covering gestures, orientation, connectivity, and platform-specific behaviors.' },
    { num: '10', title: 'User Acceptance Testing (UAT)', desc: 'Validation against business requirements and user expectations — structured UAT sessions with real stakeholders to confirm the software delivers the outcomes the business needs.' },
    { num: '11', title: 'Defect Tracking & Reporting', desc: 'Comprehensive bug management and resolution workflows — using Jira, Azure DevOps, and TestRail to log, prioritize, track, and resolve defects with full traceability to requirements.' },
    { num: '12', title: 'Quality Metrics Dashboard', desc: 'Real-time reporting of test coverage, defects, and release readiness — giving project managers and stakeholders accurate, up-to-date quality data to make confident release decisions.' },
  ],
  whyPoints: [
    { title: 'Shift-Left Testing Philosophy', desc: 'We integrate quality from the very beginning of development — catching defects early when they\'re cheapest to fix, rather than discovering them in production where the cost is exponentially higher.' },
    { title: 'Automation-First Approach', desc: 'Our automation frameworks are built for long-term value — reusable, maintainable test suites that provide fast feedback on every commit and dramatically reduce the effort required for each release cycle.' },
    { title: 'Full-Stack Testing Coverage', desc: 'From API layers and database queries to UI interactions and third-party integrations, we test the entire application stack — ensuring quality is validated at every level of your system architecture.' },
    { title: 'CI/CD Pipeline Integration', desc: 'All automated tests are integrated directly into your deployment pipeline — blocking releases that fail quality gates and providing developers with immediate, actionable feedback on every code change.' },
    { title: 'Security & Compliance Expertise', desc: 'Our security testing goes beyond basic vulnerability scanning — we perform penetration testing, compliance assessments, and threat modeling to ensure your application meets enterprise and regulatory standards.' },
  ],
  cta: 'Elevate Your Software Quality',
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
