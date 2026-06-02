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
    'Build stronger teams with flexible staffing solutions designed to connect businesses with exceptional talent.',
  overview:
    'TRONEXA provides IT and non-IT staffing services that help organizations find highly qualified professionals quickly and efficiently. Whether you need contract resources, project-based specialists, remote talent, or permanent hires, we deliver workforce solutions that support business growth and operational success.',
  deliverables: [
    { num: '01', title: 'IT Staffing', desc: 'Providing skilled IT professionals for development, cloud, AI, QA, cybersecurity, and technical support roles.' },
    { num: '02', title: 'Non-IT Staffing', desc: 'Hiring professionals for operations, HR, finance, sales, administration, and management functions.' },
    { num: '03', title: 'Permanent Recruitment', desc: 'Recruiting full-time employees who align with your long-term business goals, culture, and team dynamics.' },
    { num: '04', title: 'Contract Staffing', desc: 'Placing professionals on a contract basis for specialized, time-bound, or project-specific requirements.' },
    { num: '05', title: 'Remote Talent Acquisition', desc: 'Sourcing and vetting skilled remote professionals from global talent pools for distributed team needs.' },
    { num: '06', title: 'Executive Search', desc: 'Identifying and recruiting senior-level leaders and C-suite talent with the experience to drive organizational growth.' },
    { num: '07', title: 'Project-Based Hiring', desc: 'Rapidly assembling specialized project teams for fixed-scope initiatives, product launches, or digital transformations.' },
    { num: '08', title: 'Workforce Planning', desc: 'Helping organizations forecast talent needs, map skill gaps, and build proactive hiring strategies aligned with growth plans.' },
    { num: '09', title: 'Technical Recruitment', desc: 'Specialized hiring for software engineers, AI specialists, cloud architects, DevOps professionals, and data scientists.' },
    { num: '10', title: 'Managed Staffing Services', desc: 'Handling end-to-end workforce management — sourcing, screening, onboarding, and retention — so you can focus on your business.' },
  ],
  whyPoints: [
    { title: 'Access To Top Talent', desc: 'Our extensive talent network and proactive sourcing strategies give you access to qualified candidates — including passive talent not actively job-searching.' },
    { title: 'Faster Hiring Process', desc: 'Our streamlined screening and matching process reduces time-to-hire significantly, getting the right people into your teams when you need them.' },
    { title: 'Flexible Staffing Models', desc: 'From short-term contracts and project teams to permanent placements and executive search, we adapt our model to your workforce reality.' },
    { title: 'Reduced Recruitment Costs', desc: 'Our efficient process eliminates wasted interviews and bad hires — reducing the true cost of recruitment for your organization.' },
    { title: 'Scalable Workforce Solutions', desc: 'Whether you need one specialist or a hundred, we scale our staffing services to match your hiring volume and timelines without compromising quality.' },
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
