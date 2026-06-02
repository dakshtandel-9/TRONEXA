'use client';

import { useEffect } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';

const CLIP = 'polygon(0% 0%, calc(100% - 14px) 0%, 100% 14px, 100% 100%, 0% 100%)';
const CLIP_LG = 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 0% 100%)';

function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  const color = dark ? '#0d0f1a' : '#cdd4eb';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
      <span style={{ fontSize: '10px', color }}>■</span>
      <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color, fontWeight: 600 }}>
        {text}
      </span>
    </div>
  );
}

const STATS = [
  { num: '150+', label: 'Completed Projects' },
  { num: '50+', label: 'Active Engagements' },
  { num: '14', label: 'Service Domains' },
  { num: '20+', label: 'Countries Served' },
];

const SERVICE_CARDS = [
  { num: '01', title: 'Web Development', desc: 'Build powerful, responsive, and high-performing websites tailored to your business goals.' },
  { num: '02', title: 'App Development', desc: 'Develop innovative mobile and desktop applications that enhance customer engagement.' },
  { num: '03', title: 'Game Development', desc: 'Transform creative ideas into immersive gaming experiences across all platforms.' },
  { num: '04', title: 'Generative AI', desc: 'Create intelligent content, automate workflows, and build next-gen AI experiences with generative models.' },
  { num: '05', title: 'Computer Vision', desc: 'Enable machines to see and interpret the world through image recognition, detection, and video analytics.' },
  { num: '06', title: 'NLP Solutions', desc: 'Unlock the power of human language with advanced text analysis, sentiment detection, and language models.' },
  { num: '07', title: 'AI Solutions', desc: 'Leverage Artificial Intelligence to automate processes and unlock business intelligence.' },
  { num: '08', title: 'IoT Solutions', desc: 'Connect devices and systems seamlessly with intelligent, scalable IoT ecosystems.' },
  { num: '09', title: 'Cloud Solutions', desc: 'Empower your business with secure, scalable, and cost-efficient cloud infrastructure.' },
  { num: '10', title: 'CRM Solutions', desc: 'Enhance customer relationships and productivity with intelligent CRM systems.' },
  { num: '11', title: 'ServiceNow', desc: 'Streamline enterprise workflows and IT operations with ServiceNow solutions.' },
  { num: '12', title: 'Quality Assurance', desc: 'Ensure flawless performance, reliability, and security through comprehensive testing.' },
  { num: '13', title: 'Digital Marketing', desc: 'Drive visibility, traffic, and growth with data-driven marketing strategies.' },
  { num: '14', title: 'Staffing (IT & Non-IT)', desc: 'Find the right talent to accelerate your business growth — IT and non-IT roles.' },
];

const SERVICE_DETAILS = [
  {
    num: '01',
    label: 'Web Development',
    heading: 'Build powerful digital experiences\nfor the modern web',
    overview: 'At TRONEXA, we build modern, responsive, secure, and scalable web solutions designed to help businesses establish a strong digital presence and achieve long-term growth. Our web development services focus on creating visually appealing, high-performing, and user-friendly websites tailored to specific business objectives — whether for startups, enterprises, or growing organizations.\n\nFrom corporate websites and eCommerce platforms to customer portals, enterprise systems, and custom web applications, we deliver solutions that combine innovative design with powerful functionality.',
    items: [
      { num: '01', title: 'Front-End Development', desc: 'Creating responsive and visually appealing website interfaces with smooth navigation and interactive elements.' },
      { num: '02', title: 'Back-End Development', desc: 'Building secure server-side systems, databases, APIs, and business logic for seamless functionality.' },
      { num: '03', title: 'Full-Stack Development', desc: 'Providing complete front-end and back-end solutions for scalable, high-performing web applications.' },
      { num: '04', title: 'E-Commerce Development', desc: 'Developing secure online stores with payment gateways, product management, and seamless shopping experiences.' },
      { num: '05', title: 'Custom Web Application Development', desc: 'Building tailored web applications such as dashboards, booking systems, portals, and automation tools.' },
      { num: '06', title: 'CMS Website Development', desc: 'Creating easy-to-manage websites using content management systems for effortless updates.' },
      { num: '07', title: 'Enterprise Web Development', desc: 'Developing secure and scalable enterprise applications including CRM, ERP, and workflow systems.' },
      { num: '08', title: 'Progressive Web App (PWA) Development', desc: 'Building fast, app-like websites with offline access and enhanced user experiences.' },
      { num: '09', title: 'API Development & Integration', desc: 'Connecting websites with third-party platforms, payment systems, and cloud services.' },
      { num: '10', title: 'Website Maintenance & Support', desc: 'Providing updates, bug fixing, security monitoring, and performance optimization services.' },
      { num: '11', title: 'Landing Page Development', desc: 'Creating high-converting landing pages for marketing campaigns, promotions, and lead generation.' },
      { num: '12', title: 'Website Redesign & Optimization', desc: 'Improving outdated websites with modern designs, faster speed, and better responsiveness.' },
      { num: '13', title: 'Portal Development', desc: 'Building secure portals for customers, employees, vendors, and business management.' },
      { num: '14', title: 'SaaS Web Application Development', desc: 'Developing cloud-based software platforms with secure, scalable, and subscription-based access.' },
      { num: '15', title: 'AI-Powered Web Solutions', desc: 'Integrating AI features like chatbots, automation, analytics, and smart recommendations into websites.' },
    ],
    cta: 'Start Your Web Project',
  },
  {
    num: '02',
    label: 'App Development',
    heading: 'Scalable mobile applications\nbuilt for every platform',
    overview: 'TRONEXA delivers innovative and scalable mobile and application development solutions that empower businesses to connect with users through seamless digital experiences. We specialize in building high-performance Android, iOS, and cross-platform applications that are intuitive, secure, and designed to meet unique business goals.\n\nWhether it is an on-demand platform, eCommerce application, enterprise mobility solution, customer engagement app, or business automation tool — our team focuses on creating feature-rich applications with smooth functionality.',
    items: [
      { num: '01', title: 'Android App Development', desc: 'Building scalable Android applications with smooth functionality and seamless user experiences.' },
      { num: '02', title: 'iOS App Development', desc: 'Creating secure and high-performance applications for Apple devices with intuitive designs.' },
      { num: '03', title: 'Cross-Platform App Development', desc: 'Developing apps that function seamlessly across multiple operating systems.' },
      { num: '04', title: 'Hybrid App Development', desc: 'Building cost-effective applications using a combination of web and native technologies.' },
      { num: '05', title: 'Native App Development', desc: 'Creating platform-specific applications with better speed, performance, and responsiveness.' },
      { num: '06', title: 'Enterprise App Development', desc: 'Developing secure business applications to improve productivity and operational efficiency.' },
      { num: '07', title: 'E-Commerce App Development', desc: 'Building feature-rich shopping applications with secure payments and product management.' },
      { num: '08', title: 'On-Demand App Development', desc: 'Creating service-based applications for delivery, booking, healthcare, and transportation.' },
      { num: '09', title: 'Web App Development', desc: 'Developing browser-based applications with responsive and seamless functionality.' },
      { num: '10', title: 'Progressive Web App (PWA) Development', desc: 'Creating app-like web experiences with offline accessibility and improved performance.' },
      { num: '11', title: 'SaaS Application Development', desc: 'Building cloud-based software applications with scalable and secure infrastructure.' },
      { num: '12', title: 'Mobile App UI/UX Design', desc: 'Designing intuitive interfaces and seamless experiences for better usability and engagement.' },
      { num: '13', title: 'API Integration & Backend Development', desc: 'Developing secure backend systems and integrating third-party APIs.' },
      { num: '14', title: 'App Maintenance & Support', desc: 'Providing regular updates, bug fixes, optimization, and technical support.' },
      { num: '15', title: 'Custom Application Development', desc: 'Creating tailored applications designed specifically for unique business needs and goals.' },
    ],
    cta: 'Build Your App',
  },
  {
    num: '03',
    label: 'Game Development',
    heading: 'Immersive gaming experiences\nacross every platform',
    overview: 'At TRONEXA, we transform creative concepts into immersive and engaging gaming experiences through innovative game development solutions tailored for multiple platforms. Our team specializes in designing and developing interactive, visually appealing, and high-performance games for mobile, desktop, web, and emerging digital ecosystems.\n\nFrom concept creation and game mechanics to character design, graphics, animations, multiplayer integrations, and performance optimization — we focus on delivering captivating gameplay experiences that maximize user engagement.',
    items: [
      { num: '01', title: '2D Game Development', desc: 'Creating engaging 2D games with smooth animations, interactive gameplay, and optimized performance.' },
      { num: '02', title: '3D Game Development', desc: 'Building immersive 3D games with realistic graphics, environments, and gameplay experiences.' },
      { num: '03', title: 'Mobile Game Development', desc: 'Developing optimized mobile games for Android and iOS devices with seamless performance.' },
      { num: '04', title: 'PC Game Development', desc: 'Creating high-performance desktop games with engaging mechanics and immersive storytelling.' },
      { num: '05', title: 'Multiplayer Game Development', desc: 'Building real-time multiplayer games with secure connectivity and interactive experiences.' },
      { num: '06', title: 'AR/VR Game Development', desc: 'Developing immersive augmented and virtual reality gaming experiences with advanced interactions.' },
      { num: '07', title: 'Cross-Platform Game Development', desc: 'Creating games that work seamlessly across mobile, desktop, console, and web platforms.' },
      { num: '08', title: 'Educational Game Development', desc: 'Building interactive educational games that improve learning through engagement and gamification.' },
      { num: '09', title: 'Simulation Game Development', desc: 'Developing simulation-based games for training, entertainment, and real-world experiences.' },
      { num: '10', title: 'Unity Game Development', desc: 'Creating scalable and visually appealing games using Unity for cross-platform compatibility.' },
      { num: '11', title: 'Unreal Engine Game Development', desc: 'Building advanced games with realistic visuals and high performance using Unreal Engine.' },
      { num: '12', title: 'Game UI/UX Design', desc: 'Designing intuitive game interfaces for enhanced player experiences and engagement.' },
      { num: '13', title: 'Game Testing & QA', desc: 'Ensuring bug-free, optimized, and smooth-performing games through rigorous testing.' },
      { num: '14', title: 'Custom Game Development', desc: 'Creating tailor-made gaming solutions based on unique ideas, business goals, and audiences.' },
      { num: '15', title: 'Gamification Solutions', desc: 'Integrating game mechanics into applications and platforms to boost engagement and interaction.' },
    ],
    cta: 'Start Your Game Project',
  },
  {
    num: '04',
    label: 'Generative AI',
    heading: 'Generative AI that creates,\nautomates, and transforms',
    overview: 'TRONEXA helps businesses harness the power of Generative AI to create intelligent content, automate complex workflows, and build innovative products powered by large language models and multimodal AI systems. From custom LLM integrations and AI-generated media to intelligent document processing and conversational agents, we design generative solutions that drive efficiency and competitive advantage.\n\nOur Generative AI services span the full product lifecycle — from model selection and fine-tuning to deployment, prompt engineering, and continuous optimization — ensuring your AI systems remain accurate, safe, and aligned with business objectives.',
    items: [
      { num: '01', title: 'LLM Integration & Fine-Tuning', desc: 'Integrating and customizing large language models for domain-specific tasks and business workflows.' },
      { num: '02', title: 'AI Content Generation', desc: 'Building systems that automatically generate text, images, video, and audio at scale.' },
      { num: '03', title: 'Retrieval-Augmented Generation (RAG)', desc: 'Combining generative models with knowledge bases for accurate, grounded AI responses.' },
      { num: '04', title: 'Conversational AI & Chatbots', desc: 'Developing advanced conversational agents powered by generative models for customer and enterprise use.' },
      { num: '05', title: 'Prompt Engineering & Optimization', desc: 'Designing and refining prompts to maximize accuracy, safety, and performance of AI outputs.' },
      { num: '06', title: 'AI Document Processing', desc: 'Automating extraction, summarization, and classification of information from complex documents.' },
      { num: '07', title: 'Multimodal AI Solutions', desc: 'Building AI systems that process and generate across text, image, audio, and video modalities.' },
      { num: '08', title: 'Code Generation & AI Dev Tools', desc: 'Accelerating software development with AI-powered code generation, review, and completion tools.' },
      { num: '09', title: 'AI Model Evaluation & Safety', desc: 'Assessing model outputs for accuracy, bias, hallucinations, and alignment with ethical guidelines.' },
      { num: '10', title: 'Custom Generative AI Platforms', desc: 'Building end-to-end proprietary AI platforms tailored to unique business needs and data environments.' },
    ],
    cta: 'Explore Generative AI',
  },
  {
    num: '05',
    label: 'Computer Vision',
    heading: 'Intelligent vision systems that\nsee, analyze, and act',
    overview: 'TRONEXA delivers advanced Computer Vision solutions that enable machines to interpret and understand visual information from the real world. We build systems that automate visual inspection, detect objects in real time, recognize faces and patterns, analyze video streams, and extract actionable insights from images — across industries including manufacturing, retail, healthcare, security, and logistics.\n\nFrom model training on custom datasets to edge deployment and cloud-based inference pipelines, our Computer Vision services are engineered for accuracy, speed, and scalability in production environments.',
    items: [
      { num: '01', title: 'Image Recognition & Classification', desc: 'Building models that identify and categorize objects, scenes, and attributes within images.' },
      { num: '02', title: 'Object Detection & Tracking', desc: 'Detecting and tracking multiple objects in real time across images and video streams.' },
      { num: '03', title: 'Facial Recognition Systems', desc: 'Developing secure identity verification and access control systems using facial analysis.' },
      { num: '04', title: 'Optical Character Recognition (OCR)', desc: 'Extracting text and structured data from images, scanned documents, and forms.' },
      { num: '05', title: 'Video Analytics', desc: 'Analyzing video footage for behavior detection, crowd monitoring, and event recognition.' },
      { num: '06', title: 'Quality Inspection & Defect Detection', desc: 'Automating visual quality control in manufacturing with AI-powered defect detection.' },
      { num: '07', title: 'Medical Image Analysis', desc: 'Applying CV models to analyze radiology, pathology, and diagnostic imaging data.' },
      { num: '08', title: 'Augmented Reality Integration', desc: 'Combining computer vision with AR to overlay digital information on real-world environments.' },
      { num: '09', title: 'Pose Estimation & Gesture Recognition', desc: 'Detecting human body poses and gestures for fitness, gaming, and accessibility applications.' },
      { num: '10', title: 'Custom CV Pipeline Development', desc: 'Designing end-to-end computer vision pipelines from data collection and annotation to deployment.' },
    ],
    cta: 'Build Your Vision Solution',
  },
  {
    num: '06',
    label: 'NLP Solutions',
    heading: 'Language AI that understands,\nanalyzes, and communicates',
    overview: 'TRONEXA builds intelligent Natural Language Processing solutions that enable businesses to extract meaning from text, automate language-driven workflows, and create AI systems that communicate naturally with users. We apply advanced NLP techniques to power applications across customer support, document intelligence, search, compliance, and content operations.\n\nOur NLP services cover the complete pipeline — from data preprocessing, model training and fine-tuning to API integration, deployment, and ongoing optimization — ensuring solutions that are accurate, scalable, and tailored to your domain.',
    items: [
      { num: '01', title: 'Text Classification & Categorization', desc: 'Automatically classifying documents, emails, tickets, and content into structured categories.' },
      { num: '02', title: 'Sentiment & Emotion Analysis', desc: 'Analyzing customer feedback, reviews, and social data to detect sentiment and emotional tone.' },
      { num: '03', title: 'Named Entity Recognition (NER)', desc: 'Extracting key entities such as names, dates, locations, and organizations from unstructured text.' },
      { num: '04', title: 'Machine Translation', desc: 'Building accurate translation systems for multilingual content and global business communication.' },
      { num: '05', title: 'Text Summarization', desc: 'Automatically generating concise summaries from long documents, reports, and articles.' },
      { num: '06', title: 'Question Answering Systems', desc: 'Developing AI systems that understand questions and retrieve or generate accurate answers.' },
      { num: '07', title: 'Conversational AI & Dialogue Systems', desc: 'Building context-aware dialogue systems for customer service, HR, and enterprise automation.' },
      { num: '08', title: 'Information Extraction', desc: 'Extracting structured data and relationships from contracts, reports, and regulatory documents.' },
      { num: '09', title: 'Semantic Search & Recommendations', desc: 'Improving search relevance and content discovery using meaning-based similarity models.' },
      { num: '10', title: 'Custom NLP Model Development', desc: 'Training and fine-tuning NLP models on proprietary data for specialized business domains.' },
    ],
    cta: 'Unlock Language Intelligence',
  },
  {
    num: '07',
    label: 'Artificial Intelligence',
    heading: 'Intelligent AI solutions that\nautomate, predict, and transform',
    overview: 'TRONEXA empowers businesses with intelligent AI-driven solutions that improve efficiency, automate operations, and unlock smarter decision-making capabilities. Our Artificial Intelligence services are designed to help organizations leverage advanced technologies such as machine learning, predictive analytics, natural language processing, and intelligent automation.\n\nWe work closely with businesses to understand operational challenges and develop tailored AI systems that enhance productivity, reduce manual effort, optimize business processes, and provide actionable insights from data.',
    items: [
      { num: '01', title: 'AI Consulting & Strategy', desc: 'Helping businesses identify AI opportunities and implement intelligent solutions for growth and automation.' },
      { num: '02', title: 'Machine Learning Development', desc: 'Building intelligent systems that learn from data to improve predictions and decision-making.' },
      { num: '03', title: 'Generative AI Solutions', desc: 'Developing AI-powered tools for content generation, automation, image creation, and smart interactions.' },
      { num: '04', title: 'AI Chatbot Development', desc: 'Creating intelligent chatbots and virtual assistants for customer support and business automation.' },
      { num: '05', title: 'Natural Language Processing (NLP)', desc: 'Developing systems that understand, process, and analyze human language effectively.' },
      { num: '06', title: 'Computer Vision Solutions', desc: 'Building AI systems for image recognition, object detection, facial recognition, and video analysis.' },
      { num: '07', title: 'Predictive Analytics', desc: 'Using AI models to analyze trends and forecast business outcomes for smarter decisions.' },
      { num: '08', title: 'Recommendation Systems', desc: 'Creating personalized recommendation engines for products, content, and customer experiences.' },
      { num: '09', title: 'Intelligent Process Automation', desc: 'Automating repetitive business tasks to improve efficiency and reduce manual effort.' },
      { num: '10', title: 'Custom AI Development', desc: 'Building tailored AI solutions based on unique business requirements and goals.' },
    ],
    cta: 'Explore AI Solutions',
  },
  {
    num: '08',
    label: 'Internet of Things',
    heading: 'Connected ecosystems that\npower smarter operations',
    overview: 'TRONEXA provides innovative Internet of Things solutions that enable businesses to connect devices, systems, and operations into a unified smart ecosystem. We help organizations leverage connected technologies to improve automation, monitor real-time data, enhance operational efficiency, and make smarter decisions through intelligent connectivity.\n\nOur IoT services include device integration, smart sensors, industrial automation, predictive monitoring, remote management systems, and data analytics that enable businesses to optimize performance and reduce operational complexities.',
    items: [
      { num: '01', title: 'IoT Application Development', desc: 'Building smart applications for connected devices and real-time monitoring.' },
      { num: '02', title: 'Smart Device Integration', desc: 'Connecting sensors, devices, and systems for seamless communication and automation.' },
      { num: '03', title: 'Industrial IoT (IIoT) Solutions', desc: 'Developing IoT systems for manufacturing, logistics, and industrial automation.' },
      { num: '04', title: 'Smart Home Automation', desc: 'Creating intelligent home systems for lighting, security, and appliance control.' },
      { num: '05', title: 'IoT Cloud Integration', desc: 'Connecting IoT devices with cloud platforms for secure data storage and analytics.' },
      { num: '06', title: 'IoT Data Analytics', desc: 'Analyzing device-generated data for insights, optimization, and performance tracking.' },
      { num: '07', title: 'Remote Monitoring Solutions', desc: 'Developing systems to monitor devices and operations remotely in real time.' },
      { num: '08', title: 'IoT Security Solutions', desc: 'Ensuring secure communication and protection of connected devices and networks.' },
      { num: '09', title: 'Wearable IoT Solutions', desc: 'Building smart wearable technologies for healthcare, fitness, and tracking.' },
      { num: '10', title: 'Custom IoT Solutions', desc: 'Creating tailored IoT systems designed for specific industries and business needs.' },
    ],
    cta: 'Build Your IoT Solution',
  },
  {
    num: '09',
    label: 'Cloud Solutions',
    heading: 'Secure, scalable cloud infrastructure\nbuilt for business continuity',
    overview: 'At TRONEXA, we help businesses modernize their infrastructure through secure, scalable, and efficient cloud solutions designed to improve flexibility and operational performance. Our cloud services enable organizations to migrate, manage, and optimize digital environments while reducing infrastructure costs and improving system reliability.\n\nWhether businesses require cloud migration, storage management, infrastructure setup, cloud security, disaster recovery, or hybrid cloud solutions — our team delivers tailored strategies that support growth and business continuity.',
    items: [
      { num: '01', title: 'Cloud Consulting', desc: 'Helping businesses adopt cloud technologies for better scalability and efficiency.' },
      { num: '02', title: 'Cloud Migration', desc: 'Moving applications, servers, and data securely to cloud environments.' },
      { num: '03', title: 'Cloud Infrastructure Management', desc: 'Managing cloud servers, networks, and infrastructure for optimized performance.' },
      { num: '04', title: 'Multi-Cloud Solutions', desc: 'Managing and integrating multiple cloud platforms for flexibility and reliability.' },
      { num: '05', title: 'Cloud Security Services', desc: 'Protecting cloud environments with advanced security, compliance, and monitoring.' },
      { num: '06', title: 'DevOps & Cloud Automation', desc: 'Automating deployment, infrastructure, and operations for faster delivery.' },
      { num: '07', title: 'Cloud Backup & Disaster Recovery', desc: 'Ensuring business continuity through secure backup and recovery solutions.' },
      { num: '08', title: 'SaaS, PaaS & IaaS Solutions', desc: 'Delivering cloud-based software, platforms, and infrastructure services.' },
      { num: '09', title: 'Cloud Monitoring & Optimization', desc: 'Improving cloud performance, cost management, and system reliability.' },
      { num: '10', title: 'Custom Cloud Solutions', desc: 'Developing cloud-based systems tailored to business operations and goals.' },
    ],
    cta: 'Modernize Your Infrastructure',
  },
  {
    num: '10',
    label: 'CRM Solutions',
    heading: 'Intelligent CRM systems that\nstrengthen every customer relationship',
    overview: 'TRONEXA helps businesses strengthen customer relationships and improve operational efficiency through intelligent Customer Relationship Management solutions tailored to business goals. Our CRM services focus on helping organizations streamline customer interactions, automate workflows, improve sales performance, and centralize customer data for better decision-making.\n\nWhether implementing new CRM platforms, customizing existing systems, integrating third-party tools, or optimizing customer engagement processes — we ensure businesses gain a comprehensive view of customer relationships and sales pipelines.',
    items: [
      { num: '01', title: 'CRM Consulting', desc: 'Helping businesses choose and implement the right CRM strategy and platform.' },
      { num: '02', title: 'CRM Development & Customization', desc: 'Building customized CRM systems based on business workflows and requirements.' },
      { num: '03', title: 'Sales Automation', desc: 'Automating sales pipelines, lead management, and customer tracking processes.' },
      { num: '04', title: 'Customer Relationship Management', desc: 'Managing customer interactions to improve engagement and retention.' },
      { num: '05', title: 'CRM Integration', desc: 'Connecting CRM systems with websites, applications, marketing tools, and ERP systems.' },
      { num: '06', title: 'CRM Data Migration', desc: 'Securely transferring customer data from legacy systems to modern CRM platforms.' },
      { num: '07', title: 'Marketing Automation', desc: 'Automating customer campaigns, email marketing, and lead nurturing processes.' },
      { num: '08', title: 'Analytics & Reporting', desc: 'Generating reports and customer insights for data-driven decisions.' },
      { num: '09', title: 'CRM Maintenance & Support', desc: 'Providing updates, troubleshooting, and ongoing CRM optimization.' },
      { num: '10', title: 'Custom CRM Solutions', desc: 'Developing tailored CRM systems for unique business requirements.' },
    ],
    cta: 'Improve Customer Relationships',
  },
  {
    num: '11',
    label: 'ServiceNow Solutions',
    heading: 'Streamline enterprise workflows\nwith ServiceNow expertise',
    overview: 'TRONEXA delivers advanced ServiceNow solutions that help organizations streamline workflows, automate processes, and improve enterprise-wide operational efficiency. We assist businesses in implementing, customizing, integrating, and optimizing ServiceNow platforms to simplify IT service management, workflow automation, incident management, employee service delivery, and digital operations.\n\nOur approach focuses on creating intelligent and automated systems that reduce manual processes, improve service delivery speed, and enhance collaboration across departments.',
    items: [
      { num: '01', title: 'ServiceNow Consulting', desc: 'Helping organizations implement and optimize ServiceNow platforms.' },
      { num: '02', title: 'ServiceNow Implementation', desc: 'Deploying ServiceNow solutions tailored to business needs and workflows.' },
      { num: '03', title: 'IT Service Management (ITSM)', desc: 'Managing IT services, incidents, problems, and service requests efficiently.' },
      { num: '04', title: 'IT Operations Management (ITOM)', desc: 'Monitoring infrastructure and automating IT operations.' },
      { num: '05', title: 'IT Business Management (ITBM)', desc: 'Managing IT projects, resources, and business workflows effectively.' },
      { num: '06', title: 'HR Service Delivery', desc: 'Streamlining employee onboarding, support, and HR-related workflows.' },
      { num: '07', title: 'Customer Service Management (CSM)', desc: 'Improving customer service operations through automation and tracking.' },
      { num: '08', title: 'Workflow Automation', desc: 'Automating business and IT workflows to improve productivity.' },
      { num: '09', title: 'ServiceNow Integration', desc: 'Connecting ServiceNow with third-party systems and enterprise tools.' },
      { num: '10', title: 'ServiceNow Support & Maintenance', desc: 'Providing updates, troubleshooting, and platform optimization.' },
    ],
    cta: 'Optimize Your Enterprise Operations',
  },
  {
    num: '12',
    label: 'Quality Assurance',
    heading: 'Rigorous testing that ensures\nflawless digital performance',
    overview: 'At TRONEXA, we ensure digital products meet the highest standards of quality, functionality, security, and performance through comprehensive Quality Assurance services. Our QA process focuses on identifying issues early, minimizing risks, and ensuring applications deliver seamless user experiences before deployment.\n\nWe provide end-to-end testing solutions including manual testing, automation testing, functional testing, performance testing, regression testing, usability testing, and security validation to guarantee reliability across platforms and environments.',
    items: [
      { num: '01', title: 'Manual Testing', desc: 'Performing detailed testing to identify bugs and ensure software quality.' },
      { num: '02', title: 'Automation Testing', desc: 'Using automated tools to improve testing speed and accuracy.' },
      { num: '03', title: 'Functional Testing', desc: 'Verifying software features and functionality meet requirements.' },
      { num: '04', title: 'Performance Testing', desc: 'Ensuring systems perform efficiently under heavy traffic and load.' },
      { num: '05', title: 'Security Testing', desc: 'Identifying vulnerabilities and strengthening software security.' },
      { num: '06', title: 'Mobile App Testing', desc: 'Testing mobile applications for performance, usability, and compatibility.' },
      { num: '07', title: 'Web Application Testing', desc: 'Ensuring websites and web applications function properly across devices.' },
      { num: '08', title: 'API Testing', desc: 'Validating APIs for performance, functionality, and reliability.' },
      { num: '09', title: 'Regression Testing', desc: 'Ensuring new updates do not impact existing features.' },
      { num: '10', title: 'QA Consulting & Strategy', desc: 'Helping businesses establish effective testing and quality processes.' },
    ],
    cta: 'Ensure Product Quality',
  },
  {
    num: '13',
    label: 'Digital Marketing',
    heading: 'Data-driven marketing strategies\nthat grow your business online',
    overview: 'TRONEXA helps businesses build a strong online presence and drive measurable growth through strategic, data-driven digital marketing solutions tailored to brand objectives. Our services are designed to increase visibility, attract targeted audiences, improve engagement, and maximize return on investment through effective digital strategies.\n\nFrom search engine optimization, social media marketing, content creation, and paid advertising to branding, lead generation, and performance marketing — we create customized campaigns that align with business goals and market demands.',
    items: [
      { num: '01', title: 'Search Engine Optimization (SEO)', desc: 'Improving website visibility, organic rankings, and long-term search traffic through strategic on-page, off-page, and technical SEO.' },
      { num: '02', title: 'Pay-Per-Click (PPC) Advertising', desc: 'Generating high-quality leads and maximizing ROI through targeted Google Ads, Bing Ads, and display advertising campaigns.' },
      { num: '03', title: 'Social Media Marketing', desc: 'Building brand presence and driving engagement across platforms including LinkedIn, Instagram, Facebook, and Twitter.' },
      { num: '04', title: 'Content Marketing', desc: 'Creating valuable, SEO-optimized content that attracts audiences, builds authority, and drives conversions.' },
      { num: '05', title: 'Email Marketing', desc: 'Designing and automating targeted email campaigns for lead nurturing, customer retention, and promotions.' },
      { num: '06', title: 'Paid Social Advertising', desc: 'Running targeted social media ad campaigns to reach specific audiences and drive measurable results.' },
      { num: '07', title: 'Branding & Identity', desc: 'Building strong, consistent brand identities including logos, visual assets, and brand guidelines.' },
      { num: '08', title: 'Lead Generation', desc: 'Creating strategies and campaigns specifically designed to attract and convert high-quality business leads.' },
      { num: '09', title: 'Marketing Automation', desc: 'Streamlining marketing workflows, customer journeys, and campaign delivery through intelligent automation tools.' },
      { num: '10', title: 'Analytics & Performance Reporting', desc: 'Tracking, measuring, and reporting campaign performance to continuously improve marketing outcomes.' },
    ],
    cta: 'Grow Your Digital Presence',
  },
  {
    num: '14',
    label: 'Staffing Solutions',
    heading: 'The right talent, at the right time,\nfor every business need',
    overview: 'TRONEXA provides reliable and scalable IT and non-IT staffing solutions designed to help businesses find the right talent efficiently and effectively. We understand that building a strong workforce is essential for business success — which is why we focus on connecting organizations with highly skilled professionals who align with their operational goals, company culture, and long-term vision.\n\nWhether businesses require talent for short-term assignments, long-term projects, permanent positions, or remote work opportunities — our staffing services are tailored to meet diverse workforce demands across industries.',
    items: [
      { num: '01', title: 'IT Staffing', desc: 'Providing skilled IT professionals for development, cloud, AI, QA, cybersecurity, and support roles.' },
      { num: '02', title: 'Non-IT Staffing', desc: 'Hiring professionals for operations, HR, finance, sales, administration, and management roles.' },
      { num: '03', title: 'Permanent Staffing', desc: 'Recruiting full-time employees aligned with long-term business goals and company culture.' },
      { num: '04', title: 'Temporary Staffing', desc: 'Providing short-term workforce solutions for seasonal or project-based requirements.' },
      { num: '05', title: 'Contract Staffing', desc: 'Hiring professionals on a contract basis for specialized or time-bound requirements.' },
      { num: '06', title: 'Remote Staffing', desc: 'Sourcing and placing skilled remote professionals for global business operations.' },
      { num: '07', title: 'Executive Search', desc: 'Identifying and recruiting senior-level talent and leadership professionals.' },
      { num: '08', title: 'Technical Recruitment', desc: 'Specialized hiring for software engineers, AI specialists, cloud architects, and DevOps professionals.' },
      { num: '09', title: 'Bulk Hiring Solutions', desc: 'Managing large-scale recruitment drives efficiently for enterprises and growing organizations.' },
      { num: '10', title: 'Staff Augmentation', desc: 'Extending your existing team with skilled professionals to meet project demands quickly.' },
    ],
    cta: 'Find Your Next Hire',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Requirement Analysis', desc: 'We begin by understanding your business goals, challenges, target audience, and technical requirements through detailed consultation and research.' },
  { num: '02', title: 'Strategy & Planning', desc: 'We define the project scope, technology stack, timelines, milestones, and resource allocation — building a clear roadmap before a single line of code is written.' },
  { num: '03', title: 'Design & Prototyping', desc: 'Our design team creates wireframes, UI/UX designs, and interactive prototypes aligned with your brand identity and user experience goals.' },
  { num: '04', title: 'Development & Engineering', desc: 'Our engineering team builds the solution using modern technologies, agile sprints, and clean architecture — ensuring scalability, security, and performance.' },
  { num: '05', title: 'Testing & Quality Assurance', desc: 'Every deliverable goes through rigorous testing including functional, performance, security, and usability checks before release.' },
  { num: '06', title: 'Deployment & Ongoing Support', desc: 'We deploy the solution to production and provide post-launch support, maintenance, monitoring, and continuous optimization.' },
];

const WHY_CARDS = [
  { title: 'Full-Service Capability', desc: 'From web, mobile, and AI to cloud, IoT, CRM, and staffing — one partner for your entire technology journey, without managing multiple vendors.' },
  { title: 'Experienced Team', desc: 'A team of 150+ developers, designers, engineers, strategists, and specialists with deep expertise across 14 service domains and multiple industries.' },
  { title: 'Proven Delivery', desc: '150+ completed projects and 50+ active client engagements across startups, growing businesses, and enterprises in 20+ countries.' },
  { title: 'Innovation-First Approach', desc: 'We stay ahead of emerging technologies — from Generative AI and computer vision to IoT and cloud automation — so your solutions are always future-ready.' },
];

const INDUSTRIES = [
  'Healthcare & MedTech',
  'Retail & eCommerce',
  'Finance & Fintech',
  'Education & eLearning',
  'Real Estate & PropTech',
  'Manufacturing & Industrial',
  'Logistics & Supply Chain',
  'Hospitality & Travel',
  'Media & Entertainment',
  'SaaS & Technology Startups',
  'Government & Public Sector',
  'Non-Profit & Social Impact',
];

export default function ServicesContent() {
  const { setIsLoaded } = useLoadingContext();

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <div style={{ fontFamily: 'var(--font-geist-sans), Arial, sans-serif' }}>

      {/* ── SECTION 1: HERO ─────────────────────────────── */}
      <section className="page-hero" style={{
        minHeight: '100vh',
        background: '#0d0f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 60px 100px',
      }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <SectionLabel text="What We Offer" />
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 32px',
          }}>
            End-to-end technology solutions<br />for modern businesses
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '15px',
            lineHeight: 1.8,
            maxWidth: '660px',
            margin: '0 auto 52px',
          }}>
            At TRONEXA, we provide innovative, scalable, and business-focused technology solutions that help organizations accelerate growth, improve efficiency, and stay ahead in the digital era. From software development and AI to cloud solutions, staffing, and digital marketing — our expert teams deliver customized services tailored to your business needs.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#cdd4eb',
              color: '#0d0f1a',
              padding: '14px 34px',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
              clipPath: CLIP,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#cdd4eb'; }}
          >
            ⊞ Get In Touch →
          </a>
        </div>
      </section>

      {/* ── SECTION 2: STATS BAR ────────────────────────── */}
      <section className="page-strip" style={{
        background: '#0d0f1a',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '0 60px',
      }}>
        <div className="page-stats-grid" style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {STATS.map((stat, i) => (
            <div key={i} className="page-stats-cell" style={{
              padding: '52px 40px',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              textAlign: i === 0 ? 'left' : 'center',
            }}>
              <div style={{
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 800,
                color: '#cdd4eb',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '10px',
              }}>{stat.num}</div>
              <div style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 500,
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: SERVICES GRID ────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <div>
              <SectionLabel text="Our Services" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Everything your business needs<br />to grow and transform digitally
              </h2>
            </div>
            <p className="page-asym-right" style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              We specialize in delivering end-to-end digital solutions across 14 service domains. Whether you are building from scratch, scaling an existing system, or transforming your enterprise operations — TRONEXA has the expertise to make it happen.
            </p>
          </div>

          <div className="page-grid-3col page-service-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {SERVICE_CARDS.map((card, i) => (
              <div
                key={i}
                className="page-service-card-item"
                style={{
                  padding: '36px 32px',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  borderLeft: i % 3 > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  transition: 'background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(205,212,235,0.04)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-geist-mono)',
                  marginBottom: '16px',
                }}>{card.num}</div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'white',
                  marginBottom: '12px',
                }}>{card.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                }}>{card.desc}</div>
                <a
                  href={`#service-${card.num}`}
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#cdd4eb',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SERVICE DETAIL BLOCKS ────────────── */}
      {SERVICE_DETAILS.map((service, idx) => {
        const isLight = idx % 2 === 0;
        const bg = isLight ? '#0d0f1a' : '#080b14';

        return (
          <section
            key={service.num}
            id={`service-${service.num}`}
            className="page-section-sm-pad"
            style={{ background: bg, padding: '120px 60px', scrollMarginTop: '100px' }}
          >
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

              {/* Header row */}
              <div className="page-grid-asym" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.8fr',
                gap: '80px',
                alignItems: 'start',
                marginBottom: '64px',
              }}>
                <div>
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.22em',
                    fontFamily: 'var(--font-geist-mono)',
                    marginBottom: '16px',
                  }}>{service.num}</div>
                  <SectionLabel text={service.label} />
                  <h2 style={{
                    fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.12,
                    textTransform: 'uppercase',
                    color: 'white',
                    margin: '0 0 36px',
                    whiteSpace: 'pre-line',
                  }}>{service.heading}</h2>
                  <a
                    href="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#cdd4eb',
                      color: '#0d0f1a',
                      padding: '13px 28px',
                      fontSize: '10px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      textDecoration: 'none',
                      clipPath: CLIP,
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#cdd4eb'; }}
                  >
                    ⊞ {service.cta} →
                  </a>
                </div>
                <p className="page-asym-right" style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '14px',
                  lineHeight: 1.85,
                  margin: 0,
                  paddingTop: '52px',
                  whiteSpace: 'pre-line',
                }}>{service.overview}</p>
              </div>

              {/* Services list grid */}
              <div className="page-grid-3col page-service-items-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}>
                {service.items.map((item, j) => (
                  <div key={j} className="page-service-item-cell" style={{
                    padding: '28px 28px 28px 0',
                    paddingLeft: j % 3 > 0 ? '28px' : '0',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    borderLeft: j % 3 > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.2)',
                      letterSpacing: '0.16em',
                      fontFamily: 'var(--font-geist-mono)',
                      flexShrink: 0,
                      paddingTop: '2px',
                    }}>{item.num}</span>
                    <div>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'white',
                        marginBottom: '8px',
                      }}>{item.title}</div>
                      <div style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.42)',
                        lineHeight: 1.7,
                      }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        );
      })}

      {/* ── SECTION 5: OUR PROCESS ──────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel text="How We Deliver" dark />
          <div className="page-grid-asym" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              textTransform: 'uppercase',
              color: '#0d0f1a',
              margin: 0,
            }}>
              A clear, collaborative process<br />from idea to execution
            </h2>
            <p style={{
              color: 'rgba(13,15,26,0.6)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              Every project at TRONEXA follows a structured, transparent, and client-focused delivery process. We keep you informed and involved at every stage — from the first conversation to post-launch support.
            </p>
          </div>

          <div className="page-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(13,15,26,0.12)' }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} style={{
                padding: '44px 36px',
                background: '#cdd4eb',
                clipPath: i === 0 ? CLIP_LG : 'none',
              }}>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(13,15,26,0.25)',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-geist-mono)',
                  marginBottom: '24px',
                }}>{step.num}</div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color: '#0d0f1a',
                  marginBottom: '14px',
                }}>{step.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(13,15,26,0.58)',
                  lineHeight: 1.8,
                }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: WHY CHOOSE TRONEXA ───────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#080b14', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <div>
              <SectionLabel text="Why TRONEXA" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                A technology partner you can<br />trust to deliver results
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              We are more than a vendor — we are a strategic partner invested in your success. Our multidisciplinary team brings deep domain expertise, proven methodologies, and an innovation-first mindset to every engagement.
            </p>
          </div>

          <div className="page-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
            {WHY_CARDS.map((card, i) => (
              <div key={i} style={{
                padding: '44px 32px',
                background: '#080b14',
                clipPath: i === 0 ? CLIP_LG : 'none',
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#cdd4eb',
                  marginBottom: '16px',
                }}>{card.title}</div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.8,
                }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: INDUSTRIES WE SERVE ─────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#0d0f1a', padding: '120px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="page-grid-asym" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '80px',
            alignItems: 'start',
            marginBottom: '72px',
          }}>
            <div>
              <SectionLabel text="Industries" />
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                textTransform: 'uppercase',
                color: 'white',
                margin: 0,
              }}>
                Technology solutions across<br />every major industry
              </h2>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: 1.85,
              margin: 0,
              paddingTop: '66px',
            }}>
              Our cross-functional expertise enables us to serve businesses across a wide spectrum of industries — delivering tailored solutions that align with sector-specific challenges, regulatory requirements, and market dynamics.
            </p>
          </div>

          <div className="page-industries-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {INDUSTRIES.map((industry, i) => (
              <div key={i} className={`page-industry-cell page-industry-cell-${(i % 4) + 1}`} style={{
                padding: '24px 28px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderLeft: i % 4 > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(205,212,235,0.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ fontSize: '7px', color: '#cdd4eb', flexShrink: 0 }}>■</span>
                <span style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.65)',
                  letterSpacing: '0.04em',
                  fontWeight: 500,
                }}>{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: CTA BANNER ───────────────────────── */}
      <section className="page-section-sm-pad" style={{ background: '#cdd4eb', padding: '120px 60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            textTransform: 'uppercase',
            color: '#0d0f1a',
            margin: '0 0 28px',
          }}>
            Not sure which service<br />is right for your business?
          </h2>
          <p style={{
            color: 'rgba(13,15,26,0.6)',
            fontSize: '14px',
            lineHeight: 1.85,
            margin: '0 0 52px',
          }}>
            Talk to our team. We will understand your goals and recommend the right technology solutions to help you grow, transform, and succeed.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#0d0f1a',
                color: 'white',
                padding: '14px 34px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textDecoration: 'none',
                clipPath: CLIP,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a1e30'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0d0f1a'; }}
            >
              ⊞ Schedule a Consultation →
            </a>
            <a
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid rgba(13,15,26,0.35)',
                color: '#0d0f1a',
                padding: '14px 34px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#0d0f1a'; el.style.color = 'white'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#0d0f1a'; }}
            >
              ⊞ View Our Projects →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
