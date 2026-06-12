import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import ProjectShowcaseContent, { ProjectShowcaseData } from '@/components/ProjectShowcaseContent';

export const metadata: Metadata = {
  title: 'Quality Assurance — TRONEXA | End-to-End QA Services Case Study',
  description:
    'How Tronexa delivered comprehensive QA services — functional testing, automation, performance, security, mobile, and cross-browser testing — ensuring flawless software quality and faster release cycles.',
};

const data: ProjectShowcaseData = {
  category: 'Quality Assurance',
  heroTitle: 'Ensuring Software Excellence\nThrough End-to-End QA',
  heroDesc: 'How Tronexa implemented comprehensive Quality Assurance strategies that helped businesses deliver reliable, secure, and high-performing software — with structured testing, automation frameworks, and CI/CD integration.',
  heroTags: [
    { label: 'Category', value: 'Quality Assurance' },
    { label: 'Type', value: 'End-to-End QA Services' },
    { label: 'Tools', value: 'Selenium · Cypress · Appium' },
  ],
  introTitle: 'Quality built into every stage of development',
  introParagraphs: [
    'In today\'s fast-paced digital landscape, software quality plays a critical role in customer satisfaction, business reputation, and operational success. Even minor defects can lead to security vulnerabilities, performance issues, revenue loss, and poor user experiences.',
    'Tronexa provides comprehensive Quality Assurance services designed to ensure that software products meet the highest standards of reliability, functionality, performance, and security. Our QA experts work closely with development teams to identify issues early, reduce risks, and deliver flawless digital experiences.',
    'By implementing structured testing processes, advanced automation frameworks, and continuous quality monitoring, Tronexa helps organizations launch software products with confidence and maintain long-term operational excellence.',
  ],
  problemTitle: 'The quality risks threatening software success',
  problemIntro: 'Many businesses face challenges delivering stable and bug-free software due to tight deadlines, complex systems, and inadequate testing processes — risking production failures, customer dissatisfaction, and reputational damage.',
  problems: [
    'Software defects impacting user experience and customer satisfaction — discovered late in the cycle when fixes are most expensive',
    'Performance bottlenecks causing slow response times and system instability under real-world load conditions',
    'Security vulnerabilities exposing applications to potential threats, data breaches, and regulatory non-compliance',
    'Lack of automated testing resulting in increased release risks, longer test cycles, and higher QA costs',
    'Inconsistent quality across devices, browsers, and operating environments creating fragmented user experiences',
  ],
  solutionTitle: 'How Tronexa implemented the QA framework',
  solutionIntro: 'Tronexa implemented a comprehensive QA framework that ensured software quality throughout the development lifecycle — enabling businesses to deliver high-quality software faster while minimizing risks and reducing defects.',
  solutions: [
    'Conducted functional, integration, and regression testing across all application layers and business workflows',
    'Implemented automated testing frameworks using Selenium, Cypress, and Playwright to accelerate release cycles',
    'Performed security, performance, and load testing to identify critical risks before production deployment',
    'Executed cross-browser, cross-platform, and device compatibility testing using BrowserStack and Appium',
    'Established continuous testing processes fully integrated into CI/CD pipelines for every code commit',
  ],
  featuresTitle: 'The complete QA engagement delivered',
  featuresSubtitle: 'A comprehensive suite of testing and quality management capabilities designed to ensure software excellence across every dimension.',
  features: [
    { title: 'Functional Testing', desc: 'Validation of application features, workflows, and business requirements — ensuring every user story is met before release.' },
    { title: 'Automated Testing Framework', desc: 'Reusable automated test cases for faster and more reliable testing — built with Selenium, Cypress, and Playwright.' },
    { title: 'Regression Testing', desc: 'Verification that new changes do not impact existing functionality — catching unintended breakage automatically on every commit.' },
    { title: 'Performance Testing', desc: 'Evaluation of system speed, responsiveness, and scalability under load — using Apache JMeter and Gatling.' },
    { title: 'Load & Stress Testing', desc: 'Analysis of application behavior during peak traffic conditions — simulating thousands of concurrent users.' },
    { title: 'Security Testing', desc: 'Identification of vulnerabilities, threats, and compliance issues — using OWASP ZAP, Burp Suite, and SonarQube.' },
    { title: 'API Testing', desc: 'Validation of backend services, integrations, and data exchange processes — using Postman and REST Assured.' },
    { title: 'Cross-Browser Testing', desc: 'Consistent performance across major browsers and versions — using BrowserStack and Sauce Labs.' },
    { title: 'Mobile Application Testing', desc: 'Verification across Android and iOS devices — using Appium and Firebase Test Lab on real devices and emulators.' },
    { title: 'User Acceptance Testing (UAT)', desc: 'Validation against business requirements and user expectations — structured sessions with real stakeholders.' },
    { title: 'Compatibility Testing', desc: 'Ensuring seamless operation across multiple environments, OS versions, and device configurations.' },
    { title: 'Test Case Management', desc: 'Structured documentation and execution of testing scenarios — managed in TestRail, Zephyr, and Azure DevOps.' },
    { title: 'Defect Tracking & Reporting', desc: 'Comprehensive bug management and resolution workflows — using Jira and Azure DevOps with full traceability.' },
    { title: 'Continuous Integration Testing', desc: 'Automated testing integrated with deployment pipelines — blocking releases that fail quality gates automatically.' },
    { title: 'Quality Metrics Dashboard', desc: 'Real-time reporting of test coverage, defects, and release readiness — giving stakeholders accurate quality data.' },
  ],
  techStackIntro: 'Tronexa leveraged industry-leading testing tools and technologies to deliver comprehensive Quality Assurance services across functional, performance, security, and mobile testing dimensions.',
  techStack: [
    { label: 'Test Automation', value: 'Selenium, Cypress, Playwright, Appium' },
    { label: 'API Testing', value: 'Postman, Swagger, REST Assured' },
    { label: 'Performance Testing', value: 'Apache JMeter, LoadRunner, Gatling' },
    { label: 'Mobile Testing', value: 'Appium, BrowserStack, Firebase Test Lab' },
    { label: 'Security Testing', value: 'OWASP ZAP, Burp Suite, SonarQube' },
    { label: 'CI/CD Integration', value: 'Jenkins, GitHub Actions, GitLab CI/CD' },
    { label: 'Bug Tracking', value: 'Jira, Azure DevOps, Trello' },
    { label: 'Test Management', value: 'TestRail, Zephyr, Xray' },
    { label: 'Programming Languages', value: 'Java, JavaScript, Python, TypeScript' },
    { label: 'Cloud Testing Platforms', value: 'BrowserStack, Sauce Labs, LambdaTest' },
    { label: 'Monitoring Tools', value: 'Grafana, Prometheus, New Relic' },
    { label: 'Reporting & Analytics', value: 'Power BI, Custom QA Dashboards' },
  ],
  hostingTitle: 'Secure testing environments\nfor every deployment scenario',
  hostingIntro: 'Tronexa utilized secure and scalable testing environments to ensure comprehensive validation across multiple deployment scenarios, device types, and real-world usage conditions.',
  hosting: [
    { label: 'QA Environments', value: 'Dedicated QA Testing & Staging Environments' },
    { label: 'Cloud Testing', value: 'Cloud-Based Testing Infrastructure' },
    { label: 'Device Cloud', value: 'BrowserStack & Device Cloud Integration' },
    { label: 'Staging Validation', value: 'Staging Environment Deployment Validation' },
    { label: 'CI/CD Testing', value: 'Automated CI/CD Testing Pipelines' },
    { label: 'Test Data', value: 'Secure Test Data Management & Masking' },
    { label: 'Performance Infra', value: 'Dedicated Performance Testing Infrastructure' },
    { label: 'Reporting', value: 'Continuous Monitoring & Quality Reporting Systems' },
  ],
  teamTitle: 'Specialized QA engineers\nfor every testing discipline',
  teamIntro: 'Tronexa assembled a specialized Quality Assurance team dedicated to maintaining software quality throughout the project lifecycle — collaborating closely with developers and stakeholders for every release.',
  team: [
    { role: 'QA Engineers', desc: 'Manual and automated testing execution across functional, regression, and integration test suites' },
    { role: 'Test Automation Specialists', desc: 'Automation framework development, maintenance, and CI/CD integration for continuous testing' },
    { role: 'Performance Engineers', desc: 'Load, stress, and scalability testing to validate system behavior under real-world conditions' },
    { role: 'Security Testing Experts', desc: 'Vulnerability assessment, penetration testing, and compliance risk mitigation' },
    { role: 'QA Leads', desc: 'Test planning, quality governance, release gate decisions, and stakeholder reporting' },
    { role: 'Mobile QA Specialists', desc: 'Cross-device and cross-OS testing for Android and iOS application quality assurance' },
  ],
  maintenanceTitle: 'Ongoing quality monitoring\nacross every release',
  maintenanceIntro: 'Following project delivery, Tronexa provided ongoing QA support and quality monitoring to ensure continued software reliability — with regression testing, security assessments, and performance monitoring.',
  maintenance: [
    'Regression testing for new feature releases to ensure existing functionality remains intact and performant',
    'Automated test suite maintenance and expansion as the application evolves and new scenarios emerge',
    'Security vulnerability assessments and compliance checks aligned with evolving security standards',
    'Performance monitoring and load testing for new infrastructure changes and traffic pattern shifts',
    'Continuous quality audits and proactive issue identification to maintain high software quality standards',
  ],
  conclusionTitle: 'Reliable, secure software\nthat exceeds user expectations',
  conclusionParagraphs: [
    'Tronexa successfully implemented a comprehensive Quality Assurance strategy that enabled businesses to deliver reliable, secure, and high-performing software products. Through a combination of manual testing, automation, performance validation, and security assessments, we helped organizations minimize risks and maximize product quality.',
    'The result was improved customer satisfaction, reduced production issues, faster release cycles, and greater confidence in software deployments. By integrating quality into every stage of the development process, Tronexa empowered businesses to achieve operational excellence and build digital products that consistently exceed user expectations.',
  ],
};

export default function QualityAssuranceProjectPage() {
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
