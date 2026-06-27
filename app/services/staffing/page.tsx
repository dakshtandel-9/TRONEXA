import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ClickSound from '@/components/ClickSound';
import ServicePageContent, { ServicePageData } from '@/components/ServicePageContent';
import { SoundProvider } from '@/contexts/SoundContext';
import { LoadingProvider } from '@/contexts/LoadingContext';

export const metadata: Metadata = {
  title: 'Staffing Solutions — TRONEXA | The Right Talent For Every Business Need',
  description:
    'TRONEXA provides IT and non-IT staffing — permanent recruitment, contract staffing, remote talent, executive search, and managed staffing services.',
};

const data: ServicePageData = {
  num: '14',
  label: 'Staffing Solutions',
  heroHeading: 'The Right Talent For\nEvery Business Need',
  heroDesc:
    'Finding and retaining the right people is one of the biggest challenges businesses face today — long recruitment cycles, skill gaps, and rising hiring costs slow down critical projects. Tronexa provides specialized IT and Non-IT staffing solutions that help organizations access highly qualified professionals quickly and efficiently, so you can scale your workforce with confidence.',
  overview:
    'Whether you need short-term project resources, dedicated development teams, contract staff, or permanent placements, Tronexa delivers talent that aligns with your technical requirements and business objectives. We combine a vast talent network, rigorous technical and behavioral screening, and a streamlined recruitment process powered by modern ATS, assessment, and workforce-management tools — covering technology roles across AI, Cloud, DevOps, Cybersecurity, Data Science, and Software Development, as well as non-IT functions across healthcare, manufacturing, logistics, retail, finance, administration, and customer service.',
  deliverablesLabel: 'Staffing Services',
  deliverablesHeading: 'Flexible talent solutions\nfor every business need',
  deliverables: [
    { num: '01', title: 'IT Staffing', desc: 'Skilled technology professionals for development, cloud, AI, QA, cybersecurity, data science, DevOps, and technical support roles — pre-vetted across multiple domains and matched on expertise, experience, and cultural fit.' },
    { num: '02', title: 'Non-IT Staffing', desc: 'Qualified professionals across healthcare, manufacturing, logistics, retail, finance, administration, sales, customer service, and management — delivered with the same rigor and speed as our technical hiring.' },
    { num: '03', title: 'Permanent Recruitment', desc: 'End-to-end hiring support for full-time roles — recruiting employees who align with your long-term business goals, culture, and team dynamics, backed by complete background and reference verification.' },
    { num: '04', title: 'Contract & Temporary Staffing', desc: 'Flexible workforce solutions for short-term, seasonal, and project-based requirements — placing specialists rapidly so your teams can scale up or down without long-term overhead.' },
    { num: '05', title: 'Dedicated Development Teams', desc: 'Fully managed, project-aligned teams assembled around your objectives — combining the right mix of engineers, specialists, and leads to deliver complex initiatives without traditional recruitment delays.' },
    { num: '06', title: 'Executive Search', desc: 'Discreet, targeted recruitment for leadership and C-suite roles — identifying senior talent with the experience and vision to drive organizational growth and transformation.' },
    { num: '07', title: 'Candidate Screening & Assessment', desc: 'Comprehensive technical and behavioral evaluations using platforms like HackerRank, Codility, TestGorilla, and Mercer Mettl — ensuring every candidate is validated before they reach your interview stage.' },
    { num: '08', title: 'Workforce Planning', desc: 'Strategic staffing recommendations, skill-gap mapping, and talent forecasting — helping you build proactive hiring roadmaps that keep capacity aligned with business growth and seasonal demand.' },
    { num: '09', title: 'Remote & On-Site Staffing', desc: 'Flexible deployment models with global talent access — sourcing and vetting skilled remote professionals or placing on-site staff wherever your operations require them.' },
    { num: '10', title: 'Compliance, Onboarding & Replacement', desc: 'Full payroll, documentation, and regulatory compliance support — including GDPR-compliant processes, smooth onboarding, performance monitoring, and rapid replacement services to minimize operational disruption.' },
  ],
  whyPoints: [
    { title: 'Access To Top Talent', desc: 'Our extensive talent network and proactive sourcing strategies give you access to qualified candidates across every domain — including passive talent not actively job-searching.' },
    { title: 'Faster Time-To-Fill', desc: 'Technology-driven sourcing, pre-vetted candidate pipelines, and streamlined screening dramatically reduce time-to-hire, getting the right people into your teams exactly when you need them.' },
    { title: 'Rigorous Screening & Validation', desc: 'Every candidate passes structured technical assessments, behavioral evaluation, and background verification — so the talent we place is proven, compliant, and ready to perform from day one.' },
    { title: 'Flexible Staffing Models', desc: 'From short-term contracts and dedicated teams to permanent placements and executive search, we adapt our model — IT or non-IT, remote or on-site — to your real workforce needs.' },
    { title: 'Ongoing Workforce Support', desc: 'Beyond placement, we provide candidate replacement, performance tracking, compliance management, and talent-pipeline development — scaling your workforce reliably as your business evolves.' },
  ],
  cta: 'Find Your Next Hire',
};

export default function StaffingPage() {
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
