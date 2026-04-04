export interface CounsellingQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; icon?: string }[];
}

export interface CareerPath {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  demandLevel: 'Very High' | 'High' | 'Medium' | 'Low' | 'N/A';
  avgSalary: string;
  growthRate: string;
  description: string;
  detailedAnalysis: {
    overview: string;
    industryDemand: string;
    salaryProgression: { role: string; experience: string; salary: string }[];
    prosAndCons: { pros: string[]; cons: string[] };
    topCompanies: string[];
    futureOutlook: string;
    bitterTruth: string;
  };
  roadmap: {
    phases: { title: string; duration: string; tasks: string[]; milestone: string }[];
    certifications: string[];
    projects: string[];
  };
  suggestedBranches: string[];
  matchingCollegeTypes: string[];
}

export const counsellingQuestions: CounsellingQuestion[] = [
  {
    id: 'passion',
    question: 'What excites you the most?',
    options: [
      { label: 'Building apps & websites', value: 'software' },
      { label: 'Working with data & numbers', value: 'data' },
      { label: 'Creating intelligent machines', value: 'ai' },
      { label: 'Designing & creating things', value: 'design' },
      { label: 'Understanding how hardware works', value: 'hardware' },
      { label: 'Business & entrepreneurship', value: 'business' },
    ],
  },
  {
    id: 'workstyle',
    question: 'How do you prefer to work?',
    options: [
      { label: 'Alone, deep focus coding', value: 'solo' },
      { label: 'In teams, collaborative projects', value: 'team' },
      { label: 'Mix of both', value: 'mixed' },
      { label: 'Leading and managing people', value: 'lead' },
    ],
  },
  {
    id: 'goal',
    question: 'What is your primary career goal?',
    options: [
      { label: 'High-paying job at a top MNC', value: 'mnc' },
      { label: 'Start my own company', value: 'startup' },
      { label: 'Go abroad for MS/PhD', value: 'abroad' },
      { label: 'Government job / PSU / GATE', value: 'govt' },
      { label: 'Freelance / Remote work', value: 'freelance' },
    ],
  },
  {
    id: 'strength',
    question: 'What are you naturally good at?',
    options: [
      { label: 'Logical thinking & problem solving', value: 'logic' },
      { label: 'Creative thinking & innovation', value: 'creative' },
      { label: 'Communication & people skills', value: 'communication' },
      { label: 'Math & analytical reasoning', value: 'math' },
    ],
  },
  {
    id: 'risktolerance',
    question: 'How much risk are you willing to take?',
    options: [
      { label: 'Play it safe — stable career path', value: 'safe' },
      { label: 'Moderate risk — balanced approach', value: 'moderate' },
      { label: 'High risk — go big or go home', value: 'high' },
    ],
  },
];

export function getRecommendedPaths(answers: Record<string, string>): CareerPath[] {
  const allPaths = getAllPaths();
  const scored: { path: CareerPath; score: number }[] = allPaths.map(path => {
    let score = 0;
    // passion matching
    if (answers.passion === 'software' && ['fullstack', 'mobile', 'devops'].includes(path.id)) score += 3;
    if (answers.passion === 'data' && ['data-science', 'data-engineer'].includes(path.id)) score += 3;
    if (answers.passion === 'ai' && ['ai-ml', 'data-science'].includes(path.id)) score += 3;
    if (answers.passion === 'design' && ['ui-ux', 'fullstack'].includes(path.id)) score += 3;
    if (answers.passion === 'hardware' && ['embedded', 'iot', 'vlsi'].includes(path.id)) score += 3;
    if (answers.passion === 'business' && ['product-mgmt', 'startup-founder'].includes(path.id)) score += 3;

    // goal matching
    if (answers.goal === 'mnc' && ['fullstack', 'data-science', 'ai-ml', 'devops'].includes(path.id)) score += 2;
    if (answers.goal === 'startup' && ['startup-founder', 'fullstack', 'product-mgmt'].includes(path.id)) score += 2;
    if (answers.goal === 'abroad' && ['ai-ml', 'data-science', 'cybersecurity'].includes(path.id)) score += 2;
    if (answers.goal === 'govt' && ['embedded', 'vlsi', 'data-engineer'].includes(path.id)) score += 2;
    if (answers.goal === 'freelance' && ['fullstack', 'mobile', 'ui-ux'].includes(path.id)) score += 2;

    // strength matching
    if (answers.strength === 'logic' && ['fullstack', 'devops', 'cybersecurity', 'data-engineer'].includes(path.id)) score += 1;
    if (answers.strength === 'creative' && ['ui-ux', 'mobile', 'product-mgmt'].includes(path.id)) score += 1;
    if (answers.strength === 'math' && ['ai-ml', 'data-science', 'vlsi'].includes(path.id)) score += 1;
    if (answers.strength === 'communication' && ['product-mgmt', 'startup-founder'].includes(path.id)) score += 1;

    // risk tolerance
    if (answers.risktolerance === 'high' && ['startup-founder', 'ai-ml'].includes(path.id)) score += 1;
    if (answers.risktolerance === 'safe' && ['fullstack', 'devops', 'data-engineer'].includes(path.id)) score += 1;

    return { path, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map(s => s.path);
}

function getAllPaths(): CareerPath[] {
  return [
    {
      id: 'fullstack',
      title: 'Full-Stack Web Development',
      tagline: 'Build the entire web — front to back',
      icon: '🌐',
      demandLevel: 'Very High',
      avgSalary: '₹6-25 LPA',
      growthRate: '22% YoY',
      description: 'Design, build, and deploy complete web applications using modern frameworks. The most in-demand skill in tech.',
      detailedAnalysis: {
        overview: 'Full-stack development covers everything from user interfaces to server logic and databases. You become a one-person tech army capable of building complete products.',
        industryDemand: 'Every single company — from startups to FAANG — needs full-stack developers. This is the highest volume hiring category in Indian IT. But the BITTER TRUTH is: the market is also the most saturated at entry level.',
        salaryProgression: [
          { role: 'Junior Developer', experience: '0-1 year', salary: '₹3-6 LPA' },
          { role: 'Mid Developer', experience: '2-4 years', salary: '₹8-15 LPA' },
          { role: 'Senior Developer', experience: '4-7 years', salary: '₹15-30 LPA' },
          { role: 'Tech Lead / Architect', experience: '7+ years', salary: '₹30-60 LPA' },
        ],
        prosAndCons: {
          pros: ['Highest number of job openings', 'Can freelance easily', 'Build your own products', 'Remote work friendly'],
          cons: ['Extremely saturated at entry level', 'Constant learning required', 'Burnout is real', 'Many low-quality bootcamps flooding market'],
        },
        topCompanies: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Razorpay', 'Swiggy', 'Zerodha', 'Atlassian'],
        futureOutlook: 'AI tools will automate basic coding, but complex architecture and problem-solving will keep demand strong. Focus on system design, not just React tutorials.',
        bitterTruth: 'Knowing React and Node.js does NOT make you a full-stack developer. Most "full-stack" freshers can barely build a CRUD app. Companies want problem solvers, not tutorial followers. If you can\'t design a system whiteboard, you\'re just another applicant.',
      },
      roadmap: {
        phases: [
          { title: 'Foundation', duration: '3 months', tasks: ['HTML, CSS, JavaScript fundamentals', 'Git & GitHub', 'Basic data structures', 'Build 3 static websites'], milestone: 'Deploy your first website' },
          { title: 'Frontend Mastery', duration: '3 months', tasks: ['React.js deep dive', 'TypeScript', 'State management (Redux/Zustand)', 'Responsive design & Tailwind CSS'], milestone: 'Build a complex SPA' },
          { title: 'Backend & Database', duration: '3 months', tasks: ['Node.js & Express', 'PostgreSQL & MongoDB', 'REST APIs & authentication', 'Cloud deployment (AWS/Vercel)'], milestone: 'Build a full-stack app with auth' },
          { title: 'Advanced & Job-Ready', duration: '3 months', tasks: ['System design basics', 'Testing & CI/CD', 'DSA for interviews (200+ problems)', 'Build 2 production-quality projects'], milestone: 'Get interview-ready' },
        ],
        certifications: ['AWS Cloud Practitioner', 'Meta Front-End Developer Certificate', 'MongoDB Associate Developer'],
        projects: ['E-commerce platform with payments', 'Real-time chat application', 'Project management dashboard', 'Personal portfolio with blog'],
      },
      suggestedBranches: ['CSE', 'IT', 'AI', 'Data Science'],
      matchingCollegeTypes: ['IIT', 'NIT', 'IIIT', 'Autonomous', 'Private'],
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning Engineer',
      tagline: 'Build systems that think and learn',
      icon: '🤖',
      demandLevel: 'Very High',
      avgSalary: '₹8-40 LPA',
      growthRate: '35% YoY',
      description: 'Create intelligent systems using machine learning, deep learning, and neural networks. The frontier of tech innovation.',
      detailedAnalysis: {
        overview: 'AI/ML engineers build models that can learn from data, make predictions, and automate decisions. This includes everything from recommendation systems to self-driving cars.',
        industryDemand: 'Massive demand but with a catch — companies want people with REAL skills, not just those who completed a Coursera course. The field is overhyped at the entry level but genuinely transformative at the top.',
        salaryProgression: [
          { role: 'ML Intern/Junior', experience: '0-1 year', salary: '₹4-8 LPA' },
          { role: 'ML Engineer', experience: '2-4 years', salary: '₹12-25 LPA' },
          { role: 'Senior ML Engineer', experience: '4-7 years', salary: '₹25-50 LPA' },
          { role: 'Research Scientist / Lead', experience: '7+ years', salary: '₹50-1.2 Cr' },
        ],
        prosAndCons: {
          pros: ['Highest salary ceiling', 'Cutting-edge work', 'Research opportunities', 'Global demand'],
          cons: ['Requires strong math foundation', 'PhD preferred for top roles', 'Overhyped entry-level market', 'Hardware costs for training models'],
        },
        topCompanies: ['Google DeepMind', 'OpenAI', 'Meta AI', 'Microsoft Research', 'NVIDIA', 'Amazon Science', 'Fractal Analytics'],
        futureOutlook: 'AI is the defining technology of this decade. But the field will bifurcate: AI application developers (using APIs) vs AI researchers (building new architectures). Choose wisely.',
        bitterTruth: 'If your math isn\'t strong (linear algebra, probability, calculus), you\'ll hit a ceiling fast. Most "AI engineers" are just API callers. True ML engineering requires deep mathematical understanding. Also, 90% of AI projects in Indian companies are just fancy dashboards.',
      },
      roadmap: {
        phases: [
          { title: 'Math & Programming', duration: '3 months', tasks: ['Python mastery', 'Linear Algebra & Calculus', 'Probability & Statistics', 'NumPy, Pandas deep dive'], milestone: 'Solve 50 math-based coding problems' },
          { title: 'Core ML', duration: '4 months', tasks: ['Supervised & unsupervised learning', 'Scikit-learn mastery', 'Feature engineering', 'Model evaluation & tuning'], milestone: 'Build 5 ML models on real datasets' },
          { title: 'Deep Learning', duration: '4 months', tasks: ['Neural networks from scratch', 'PyTorch / TensorFlow', 'CNNs, RNNs, Transformers', 'NLP & Computer Vision projects'], milestone: 'Publish a model on HuggingFace' },
          { title: 'Production & Research', duration: '3 months', tasks: ['MLOps & model deployment', 'Read and implement 5 research papers', 'Kaggle competitions (top 10%)', 'End-to-end ML system project'], milestone: 'Production-ready ML portfolio' },
        ],
        certifications: ['Stanford ML Specialization (Coursera)', 'Deep Learning Specialization (Andrew Ng)', 'Google TensorFlow Developer Certificate'],
        projects: ['Sentiment analysis on Indian news', 'Image classification system', 'Recommendation engine', 'Chatbot with LLM fine-tuning'],
      },
      suggestedBranches: ['CSE', 'AI', 'Data Science', 'ECE'],
      matchingCollegeTypes: ['IIT', 'IIIT', 'NIT'],
    },
    {
      id: 'data-science',
      title: 'Data Science & Analytics',
      tagline: 'Turn data into decisions',
      icon: '📊',
      demandLevel: 'High',
      avgSalary: '₹6-30 LPA',
      growthRate: '28% YoY',
      description: 'Extract insights from data to drive business decisions. A blend of statistics, programming, and domain expertise.',
      detailedAnalysis: {
        overview: 'Data scientists analyze complex datasets to find patterns, build predictive models, and communicate insights to stakeholders. It\'s the bridge between technical ML and business impact.',
        industryDemand: 'Every industry needs data scientists — banking, healthcare, e-commerce, logistics. But the title is overly broad and many companies use it interchangeably with "data analyst" (much lower pay).',
        salaryProgression: [
          { role: 'Data Analyst', experience: '0-1 year', salary: '₹3-6 LPA' },
          { role: 'Data Scientist', experience: '2-4 years', salary: '₹8-18 LPA' },
          { role: 'Senior Data Scientist', experience: '4-7 years', salary: '₹18-35 LPA' },
          { role: 'Lead / Principal DS', experience: '7+ years', salary: '₹35-70 LPA' },
        ],
        prosAndCons: {
          pros: ['Cross-industry demand', 'Intellectually stimulating', 'Good work-life balance', 'Can transition to ML easily'],
          cons: ['Title inflation (analyst vs scientist)', 'Requires domain expertise', 'Many roles are glorified Excel work', 'Business politics can limit impact'],
        },
        topCompanies: ['McKinsey', 'Tiger Analytics', 'Mu Sigma', 'Flipkart', 'PhonePe', 'Uber', 'Walmart Labs'],
        futureOutlook: 'Data science is maturing. Pure statistics roles are being automated. The future belongs to those who can combine data skills with deep domain expertise and storytelling ability.',
        bitterTruth: 'Half the "data science" jobs in India are actually data analyst roles paying ₹4-6 LPA. The sexy Kaggle competition stuff rarely happens in real companies. Most of your time will be cleaning messy data and making PowerPoint slides for management.',
      },
      roadmap: {
        phases: [
          { title: 'Foundations', duration: '2 months', tasks: ['Python & SQL mastery', 'Statistics & probability', 'Excel & data visualization', 'Exploratory Data Analysis'], milestone: 'Analyze 3 real-world datasets' },
          { title: 'Core Data Science', duration: '3 months', tasks: ['Machine learning basics', 'Feature engineering', 'A/B testing', 'Tableau / Power BI'], milestone: 'Complete 2 end-to-end analyses' },
          { title: 'Advanced Analytics', duration: '3 months', tasks: ['Time series forecasting', 'NLP for text analytics', 'Deep learning basics', 'Big data tools (Spark, Hadoop)'], milestone: 'Build a prediction dashboard' },
          { title: 'Domain & Portfolio', duration: '2 months', tasks: ['Choose a domain specialization', 'Case study practice', 'Blog / publish findings', 'Interview prep'], milestone: 'Job-ready portfolio' },
        ],
        certifications: ['Google Data Analytics Certificate', 'IBM Data Science Professional', 'Tableau Desktop Specialist'],
        projects: ['Customer churn prediction', 'Sales forecasting dashboard', 'Social media sentiment tracker', 'Healthcare data analysis'],
      },
      suggestedBranches: ['CSE', 'Data Science', 'AI', 'IT'],
      matchingCollegeTypes: ['IIT', 'NIT', 'IIIT', 'Autonomous'],
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Specialist',
      tagline: 'Defend the digital world',
      icon: '🛡️',
      demandLevel: 'Very High',
      avgSalary: '₹5-35 LPA',
      growthRate: '32% YoY',
      description: 'Protect organizations from cyber threats, vulnerabilities, and attacks. A field with massive talent shortage globally.',
      detailedAnalysis: {
        overview: 'Cybersecurity professionals identify vulnerabilities, respond to incidents, and build secure systems. With increasing digitization, this field has a massive global talent gap of 3.5 million professionals.',
        industryDemand: 'Critical demand across banking, defense, government, and tech. India alone needs 1.5 million cybersecurity professionals by 2025. Unlike other fields, demand genuinely exceeds supply.',
        salaryProgression: [
          { role: 'SOC Analyst', experience: '0-1 year', salary: '₹3-6 LPA' },
          { role: 'Security Engineer', experience: '2-4 years', salary: '₹8-18 LPA' },
          { role: 'Senior Security Engineer', experience: '4-7 years', salary: '₹18-35 LPA' },
          { role: 'CISO / Security Architect', experience: '10+ years', salary: '₹40-1 Cr' },
        ],
        prosAndCons: {
          pros: ['Massive talent shortage', 'High job security', 'Intellectually challenging', 'Can work in defense/government'],
          cons: ['High stress & on-call duties', 'Constant upskilling needed', 'Entry-level roles can be monotonous', 'Certifications are expensive'],
        },
        topCompanies: ['Palo Alto Networks', 'CrowdStrike', 'Deloitte', 'EY', 'KPMG', 'TCS Cyber', 'Wipro Cybersecurity'],
        futureOutlook: 'AI will automate basic threat detection, but sophisticated attacks will always need human defenders. Offensive security (ethical hacking) and cloud security are the hottest sub-fields.',
        bitterTruth: 'Starting salaries in India are low despite the hype. Entry-level SOC analyst work is basically staring at dashboards for 12 hours. The cool "hacking" jobs require years of deep expertise. Also, many Indian companies treat security as an afterthought, so you might feel powerless.',
      },
      roadmap: {
        phases: [
          { title: 'Networking & OS', duration: '3 months', tasks: ['Linux administration', 'Networking fundamentals (TCP/IP, DNS)', 'Windows Server basics', 'Command line mastery'], milestone: 'Set up a home lab' },
          { title: 'Security Fundamentals', duration: '3 months', tasks: ['OWASP Top 10', 'Encryption & cryptography', 'Security tools (Wireshark, Nmap)', 'Vulnerability assessment'], milestone: 'Complete CTF challenges' },
          { title: 'Specialization', duration: '4 months', tasks: ['Choose: Offensive/Defensive/Cloud security', 'Penetration testing or incident response', 'Cloud security (AWS/Azure)', 'Malware analysis basics'], milestone: 'Get CEH or CompTIA Security+' },
          { title: 'Advanced & Career', duration: '3 months', tasks: ['Bug bounty programs', 'Red/Blue team exercises', 'Compliance frameworks (ISO 27001)', 'Build security portfolio'], milestone: 'Land first security role' },
        ],
        certifications: ['CompTIA Security+', 'CEH (Certified Ethical Hacker)', 'OSCP', 'AWS Security Specialty'],
        projects: ['Network vulnerability scanner', 'Web application firewall', 'Phishing simulation tool', 'Security audit report'],
      },
      suggestedBranches: ['CSE', 'IT', 'ECE'],
      matchingCollegeTypes: ['IIT', 'NIT', 'IIIT', 'Autonomous'],
    },
    {
      id: 'mobile',
      title: 'Mobile App Development',
      tagline: 'Build apps that millions use daily',
      icon: '📱',
      demandLevel: 'High',
      avgSalary: '₹5-25 LPA',
      growthRate: '18% YoY',
      description: 'Create mobile applications for Android and iOS. India is the largest app market, making this a highly relevant career.',
      detailedAnalysis: {
        overview: 'Mobile developers build applications for smartphones and tablets. With India having 750M+ smartphone users, mobile development is crucial for every business.',
        industryDemand: 'Strong demand but shifting towards cross-platform (React Native, Flutter) over native. Companies prefer developers who can build for both platforms efficiently.',
        salaryProgression: [
          { role: 'Junior Mobile Dev', experience: '0-1 year', salary: '₹3-7 LPA' },
          { role: 'Mobile Developer', experience: '2-4 years', salary: '₹8-18 LPA' },
          { role: 'Senior Mobile Dev', experience: '4-7 years', salary: '₹18-30 LPA' },
          { role: 'Mobile Architect', experience: '7+ years', salary: '₹30-50 LPA' },
        ],
        prosAndCons: {
          pros: ['Visible impact — apps used by millions', 'Freelance friendly', 'Can publish own apps', 'Growing Indian market'],
          cons: ['Platform fragmentation (Android versions)', 'App store policies are restrictive', 'UI testing is complex', 'Cross-platform can feel hacky'],
        },
        topCompanies: ['Google', 'PhonePe', 'Swiggy', 'Zomato', 'CRED', 'Dream11', 'Byju\'s'],
        futureOutlook: 'Flutter and React Native are dominating. Native development (Swift/Kotlin) is still valued for performance-critical apps. AR/VR mobile experiences are the next frontier.',
        bitterTruth: 'Making a TODO app does not make you a mobile developer. Real mobile dev involves complex state management, offline handling, performance optimization, and dealing with 1000+ Android device variations. The Play Store is also brutal — most apps get zero downloads.',
      },
      roadmap: {
        phases: [
          { title: 'Programming Basics', duration: '2 months', tasks: ['Dart or Kotlin/Swift', 'OOP concepts', 'UI/UX principles for mobile', 'Version control'], milestone: 'Build your first app' },
          { title: 'Framework Mastery', duration: '3 months', tasks: ['Flutter or React Native deep dive', 'State management', 'Navigation & routing', 'API integration'], milestone: 'Publish app on Play Store' },
          { title: 'Advanced Features', duration: '3 months', tasks: ['Local storage & offline', 'Push notifications', 'Maps & location services', 'Payment integration'], milestone: 'Build a production-quality app' },
          { title: 'Career Ready', duration: '2 months', tasks: ['Performance optimization', 'Testing & CI/CD', 'App monetization strategies', 'Portfolio with 3+ apps'], milestone: 'Interview-ready portfolio' },
        ],
        certifications: ['Google Associate Android Developer', 'Meta React Native Specialization', 'Flutter Development Bootcamp (Udemy)'],
        projects: ['Food delivery app clone', 'Expense tracker with analytics', 'Social media app with real-time chat', 'Fitness tracking app'],
      },
      suggestedBranches: ['CSE', 'IT', 'AI'],
      matchingCollegeTypes: ['IIT', 'NIT', 'IIIT', 'Autonomous', 'Private'],
    },
    {
      id: 'devops',
      title: 'DevOps & Cloud Engineering',
      tagline: 'Automate, deploy, scale everything',
      icon: '☁️',
      demandLevel: 'Very High',
      avgSalary: '₹6-30 LPA',
      growthRate: '25% YoY',
      description: 'Bridge development and operations. Automate deployments, manage cloud infrastructure, and ensure system reliability.',
      detailedAnalysis: {
        overview: 'DevOps engineers automate the software delivery pipeline, manage cloud infrastructure, and ensure applications run reliably at scale. It\'s the backbone of modern software delivery.',
        industryDemand: 'Explosive demand. Every company moving to cloud needs DevOps. AWS, Azure, and GCP certifications are practically a guaranteed job ticket in 2024-25.',
        salaryProgression: [
          { role: 'Junior DevOps', experience: '0-1 year', salary: '₹4-7 LPA' },
          { role: 'DevOps Engineer', experience: '2-4 years', salary: '₹10-20 LPA' },
          { role: 'Senior DevOps / SRE', experience: '4-7 years', salary: '₹20-40 LPA' },
          { role: 'Principal / Cloud Architect', experience: '7+ years', salary: '₹40-80 LPA' },
        ],
        prosAndCons: {
          pros: ['High demand, less competition than dev roles', 'Cloud certifications boost salary', 'Remote-work friendly', 'Relevant across all industries'],
          cons: ['On-call rotations (2 AM alerts)', 'Steep initial learning curve', 'Can feel repetitive', 'Infrastructure costs for practice'],
        },
        topCompanies: ['Amazon AWS', 'Microsoft Azure', 'Google Cloud', 'HashiCorp', 'Atlassian', 'Red Hat', 'Infosys (Cloud division)'],
        futureOutlook: 'Platform engineering and infrastructure-as-code are the future. Kubernetes mastery and cloud-native development will be the differentiators.',
        bitterTruth: 'DevOps is NOT just "using Docker and Jenkins." Real DevOps requires deep Linux knowledge, networking understanding, and scripting skills. Many people jump into Kubernetes without understanding basic networking — and it shows in interviews. Also, the on-call life is genuinely terrible.',
      },
      roadmap: {
        phases: [
          { title: 'Linux & Scripting', duration: '2 months', tasks: ['Linux administration', 'Bash scripting', 'Python for automation', 'Networking basics'], milestone: 'Automate 5 server tasks' },
          { title: 'Core DevOps', duration: '3 months', tasks: ['Docker & containerization', 'CI/CD (GitHub Actions, Jenkins)', 'Infrastructure as Code (Terraform)', 'Configuration management (Ansible)'], milestone: 'Build a CI/CD pipeline' },
          { title: 'Cloud & Kubernetes', duration: '3 months', tasks: ['AWS / Azure deep dive', 'Kubernetes orchestration', 'Monitoring (Prometheus, Grafana)', 'Security & compliance'], milestone: 'Get AWS Solutions Architect cert' },
          { title: 'Advanced & SRE', duration: '2 months', tasks: ['Site Reliability Engineering', 'Chaos engineering', 'Cost optimization', 'Multi-cloud architecture'], milestone: 'Deploy a production-grade system' },
        ],
        certifications: ['AWS Solutions Architect Associate', 'CKA (Certified Kubernetes Administrator)', 'Terraform Associate', 'Azure Administrator'],
        projects: ['Automated deployment pipeline', 'Multi-container microservices app', 'Infrastructure monitoring dashboard', 'Disaster recovery setup'],
      },
      suggestedBranches: ['CSE', 'IT', 'ECE'],
      matchingCollegeTypes: ['IIT', 'NIT', 'IIIT', 'Autonomous'],
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design Engineering',
      tagline: 'Design experiences people love',
      icon: '🎨',
      demandLevel: 'High',
      avgSalary: '₹4-20 LPA',
      growthRate: '20% YoY',
      description: 'Combine design thinking with frontend development. Create beautiful, user-friendly digital experiences.',
      detailedAnalysis: {
        overview: 'UI/UX designers research user needs, create wireframes, design interfaces, and test usability. Design engineers also implement their designs in code, making them highly valuable.',
        industryDemand: 'Growing rapidly in India as companies realize good design = better business. Product companies especially value design engineers who can both design and code.',
        salaryProgression: [
          { role: 'UI/UX Intern', experience: '0-1 year', salary: '₹3-5 LPA' },
          { role: 'UI/UX Designer', experience: '2-4 years', salary: '₹6-15 LPA' },
          { role: 'Senior Designer', experience: '4-7 years', salary: '₹15-25 LPA' },
          { role: 'Design Lead / Manager', experience: '7+ years', salary: '₹25-45 LPA' },
        ],
        prosAndCons: {
          pros: ['Creative and fulfilling', 'Less competitive than pure dev', 'Freelance opportunities', 'Can transition to product management'],
          cons: ['Subjective — everyone has opinions', 'Lower starting salary than dev', 'Need to constantly follow trends', 'Design tools change frequently'],
        },
        topCompanies: ['Google', 'Apple', 'Figma', 'Razorpay', 'CRED', 'Swiggy', 'Notion'],
        futureOutlook: 'AI design tools will automate basic UI creation, but user research, strategy, and complex interaction design will remain deeply human. Design systems expertise is increasingly valuable.',
        bitterTruth: 'In India, many companies still treat design as "making things pretty." You\'ll often fight for design decisions against engineers and PMs who don\'t value UX. Also, the pay gap between design and engineering is real and frustrating.',
      },
      roadmap: {
        phases: [
          { title: 'Design Foundations', duration: '2 months', tasks: ['Design principles & typography', 'Color theory & composition', 'Figma mastery', 'Study 50 great designs'], milestone: 'Redesign 3 existing apps' },
          { title: 'UX Research & Strategy', duration: '3 months', tasks: ['User research methods', 'Information architecture', 'Wireframing & prototyping', 'Usability testing'], milestone: 'Complete 2 UX case studies' },
          { title: 'Frontend Implementation', duration: '3 months', tasks: ['HTML, CSS, JavaScript', 'React basics', 'Animation & micro-interactions', 'Design systems'], milestone: 'Build a design system' },
          { title: 'Portfolio & Career', duration: '2 months', tasks: ['Build portfolio website', '3-5 detailed case studies', 'Behance/Dribbble presence', 'Interview prep'], milestone: 'Job-ready portfolio' },
        ],
        certifications: ['Google UX Design Certificate', 'Interaction Design Foundation', 'Nielsen Norman Group UX Certification'],
        projects: ['Mobile app redesign case study', 'Design system for a startup', 'Accessibility audit & fix', 'Dashboard design & implementation'],
      },
      suggestedBranches: ['CSE', 'IT', 'Design'],
      matchingCollegeTypes: ['IIT', 'NIT', 'IIIT', 'Private'],
    },
    {
      id: 'product-mgmt',
      title: 'Product Management',
      tagline: 'Build the right product, the right way',
      icon: '🚀',
      demandLevel: 'High',
      avgSalary: '₹8-35 LPA',
      growthRate: '15% YoY',
      description: 'Define what to build, why, and for whom. Product managers are the CEOs of their products, driving strategy and execution.',
      detailedAnalysis: {
        overview: 'Product managers sit at the intersection of business, technology, and design. They define product vision, prioritize features, analyze metrics, and coordinate across teams to deliver user value.',
        industryDemand: 'High demand in product companies (not service companies). But PM roles are extremely competitive — most companies prefer candidates with 2+ years of engineering experience first.',
        salaryProgression: [
          { role: 'Associate PM', experience: '0-2 years', salary: '₹6-12 LPA' },
          { role: 'Product Manager', experience: '2-5 years', salary: '₹15-30 LPA' },
          { role: 'Senior PM', experience: '5-8 years', salary: '₹30-50 LPA' },
          { role: 'Director / VP Product', experience: '10+ years', salary: '₹50-1.5 Cr' },
        ],
        prosAndCons: {
          pros: ['High influence and impact', 'Diverse skill set', 'Great salary progression', 'Path to leadership / CEO'],
          cons: ['Responsibility without authority', 'Hard to break into without engineering background', 'Ambiguous success metrics', 'Very competitive roles'],
        },
        topCompanies: ['Google', 'Amazon', 'Flipkart', 'Razorpay', 'CRED', 'Zerodha', 'PhonePe'],
        futureOutlook: 'AI-first product management is emerging. PMs who understand data, AI capabilities, and can think in terms of AI-native features will be the most valuable.',
        bitterTruth: 'You CANNOT become a PM straight out of college in 99% of cases. Most companies want 2-3 years of engineering experience first. The "APM programs" at Google/Flipkart accept maybe 10-15 people from thousands of applicants. Also, PM at a service company (TCS, Infosys) is NOT real product management.',
      },
      roadmap: {
        phases: [
          { title: 'Technical Foundation', duration: '12 months', tasks: ['Work as a software engineer first', 'Learn system design', 'Understand analytics tools', 'Study business models'], milestone: 'Ship features as an engineer' },
          { title: 'PM Skills', duration: '3 months', tasks: ['Product strategy frameworks', 'User research & analytics', 'SQL for data analysis', 'Write PRDs & product specs'], milestone: 'Complete 3 product teardowns' },
          { title: 'Build PM Portfolio', duration: '3 months', tasks: ['Side project as PM', 'Product case studies', 'Metrics & experimentation', 'Stakeholder management'], milestone: 'Apply to APM programs' },
          { title: 'Transition', duration: '3 months', tasks: ['PM interview prep (guesstimates, product design)', 'Mock interviews', 'Networking with PMs', 'Internal transition or external applications'], milestone: 'Land PM role' },
        ],
        certifications: ['Product School Certification', 'Pragmatic Institute', 'Google Project Management Certificate'],
        projects: ['Product teardown blog', 'Feature prioritization framework', 'Go-to-market strategy document', 'Metrics dashboard for a product'],
      },
      suggestedBranches: ['CSE', 'IT', 'Any Engineering Branch'],
      matchingCollegeTypes: ['IIT', 'NIT', 'IIIT'],
    },
    {
      id: 'data-engineer',
      title: 'Data Engineering',
      tagline: 'Build the pipelines that power data',
      icon: '🔧',
      demandLevel: 'Very High',
      avgSalary: '₹6-30 LPA',
      growthRate: '30% YoY',
      description: 'Build and maintain the data infrastructure that data scientists and analysts depend on. The unsung heroes of the data world.',
      detailedAnalysis: {
        overview: 'Data engineers design, build, and maintain data pipelines, warehouses, and lakes. They ensure data flows reliably from source to consumption, enabling analytics and ML at scale.',
        industryDemand: 'One of the most in-demand and undersupplied roles in tech. For every data scientist, companies need 3-5 data engineers. Yet most students chase the "sexier" data science title.',
        salaryProgression: [
          { role: 'Junior Data Engineer', experience: '0-1 year', salary: '₹4-8 LPA' },
          { role: 'Data Engineer', experience: '2-4 years', salary: '₹10-20 LPA' },
          { role: 'Senior Data Engineer', experience: '4-7 years', salary: '₹20-40 LPA' },
          { role: 'Principal / Staff DE', experience: '7+ years', salary: '₹40-70 LPA' },
        ],
        prosAndCons: {
          pros: ['Higher demand than data science', 'Less math-heavy', 'Clear career progression', 'Essential in every data team'],
          cons: ['Less glamorous than ML/AI', 'Debugging data pipelines at 3 AM', 'Can be repetitive', 'Requires understanding multiple systems'],
        },
        topCompanies: ['Netflix', 'Uber', 'LinkedIn', 'Walmart Labs', 'Flipkart', 'PhonePe', 'Databricks'],
        futureOutlook: 'With data volumes exploding, data engineering will only grow. Real-time streaming, data mesh architecture, and AI-augmented pipelines are the future.',
        bitterTruth: 'Nobody talks about data engineering in college because it\'s not "cool." But it pays better than most data science roles and has less competition. The truth is — data scientists can\'t do anything without data engineers building reliable pipelines first.',
      },
      roadmap: {
        phases: [
          { title: 'Foundations', duration: '2 months', tasks: ['SQL mastery (advanced queries)', 'Python for data processing', 'Linux & command line', 'Database design & modeling'], milestone: 'Design a normalized database' },
          { title: 'Core Data Engineering', duration: '3 months', tasks: ['ETL/ELT pipelines', 'Apache Spark basics', 'Data warehousing concepts', 'Airflow for orchestration'], milestone: 'Build an end-to-end pipeline' },
          { title: 'Cloud & Streaming', duration: '3 months', tasks: ['AWS/GCP data services', 'Kafka for streaming', 'Data lake architecture', 'dbt for transformations'], milestone: 'Build a streaming data pipeline' },
          { title: 'Advanced & Career', duration: '2 months', tasks: ['Data mesh & governance', 'Performance optimization', 'Data quality frameworks', 'Interview prep'], milestone: 'Production-grade portfolio' },
        ],
        certifications: ['Google Cloud Data Engineer', 'AWS Data Analytics Specialty', 'Databricks Certified DE'],
        projects: ['Real-time data pipeline with Kafka', 'Data warehouse for e-commerce', 'Automated data quality monitoring', 'Log analytics platform'],
      },
      suggestedBranches: ['CSE', 'IT', 'Data Science'],
      matchingCollegeTypes: ['IIT', 'NIT', 'IIIT', 'Autonomous'],
    },
    {
      id: 'embedded',
      title: 'Embedded Systems & IoT',
      tagline: 'Program the physical world',
      icon: '🔌',
      demandLevel: 'Medium',
      avgSalary: '₹4-20 LPA',
      growthRate: '15% YoY',
      description: 'Program microcontrollers, sensors, and connected devices. The intersection of hardware and software.',
      detailedAnalysis: {
        overview: 'Embedded engineers write firmware and software that runs on specialized hardware — from car ECUs to medical devices to smart home systems. IoT extends this to internet-connected devices.',
        industryDemand: 'Steady demand in automotive, aerospace, defense, and manufacturing. India\'s semiconductor push (₹76,000 Cr investment) is boosting this field significantly.',
        salaryProgression: [
          { role: 'Embedded Intern', experience: '0-1 year', salary: '₹3-5 LPA' },
          { role: 'Embedded Engineer', experience: '2-4 years', salary: '₹6-14 LPA' },
          { role: 'Senior Embedded Engineer', experience: '4-7 years', salary: '₹14-25 LPA' },
          { role: 'Architect / Lead', experience: '7+ years', salary: '₹25-45 LPA' },
        ],
        prosAndCons: {
          pros: ['Less competition than software', 'Tangible impact (physical products)', 'Growing with India\'s semiconductor push', 'Niche expertise = job security'],
          cons: ['Lower starting salaries', 'Hardware debugging is painful', 'Fewer remote work options', 'Slower career growth'],
        },
        topCompanies: ['Texas Instruments', 'Qualcomm', 'Intel', 'Bosch', 'Continental', 'Samsung R&D', 'ISRO'],
        futureOutlook: 'India\'s semiconductor manufacturing push and the IoT explosion make this a strategically important field. RISC-V and edge AI are exciting frontiers.',
        bitterTruth: 'Embedded pays significantly less than software development, especially in the first 5 years. College placements for core branches are declining. But if you genuinely love hardware and are patient, the long-term prospects are solid with India\'s manufacturing push.',
      },
      roadmap: {
        phases: [
          { title: 'Foundations', duration: '3 months', tasks: ['C programming mastery', 'Digital electronics', 'Microcontroller basics (Arduino)', 'Basic circuit design'], milestone: 'Build 3 Arduino projects' },
          { title: 'Core Embedded', duration: '4 months', tasks: ['ARM architecture', 'RTOS concepts (FreeRTOS)', 'Communication protocols (I2C, SPI, UART)', 'Embedded C deep dive'], milestone: 'Program an STM32 board' },
          { title: 'IoT & Connected', duration: '3 months', tasks: ['WiFi/BLE/LoRa protocols', 'MQTT & cloud integration', 'Sensor interfacing', 'PCB design basics'], milestone: 'Build an IoT product prototype' },
          { title: 'Advanced & Career', duration: '2 months', tasks: ['Linux device drivers', 'Automotive (AUTOSAR)', 'Edge AI on microcontrollers', 'Portfolio & interview prep'], milestone: 'Industry-ready portfolio' },
        ],
        certifications: ['ARM Accredited Engineer', 'AWS IoT Specialty', 'Embedded Linux (Linux Foundation)'],
        projects: ['Smart home automation system', 'Weather monitoring station', 'Gesture-controlled robot', 'Wearable health monitor'],
      },
      suggestedBranches: ['ECE', 'EEE', 'CSE', 'Mechanical (Mechatronics)'],
      matchingCollegeTypes: ['IIT', 'NIT', 'Autonomous'],
    },
    {
      id: 'vlsi',
      title: 'VLSI & Chip Design',
      tagline: 'Design the chips that power everything',
      icon: '💎',
      demandLevel: 'High',
      avgSalary: '₹5-25 LPA',
      growthRate: '20% YoY',
      description: 'Design integrated circuits and semiconductor chips. India\'s semiconductor mission makes this a strategically important career.',
      detailedAnalysis: {
        overview: 'VLSI engineers design the silicon chips that power everything from phones to supercomputers. With India investing ₹76,000 Cr in semiconductor manufacturing, this is a strategic national priority.',
        industryDemand: 'Booming due to India\'s semiconductor push. Multiple fab plants being set up (Micron in Gujarat, Tata in Assam). Design centers already exist for Intel, AMD, Qualcomm, and Samsung in India.',
        salaryProgression: [
          { role: 'VLSI Trainee', experience: '0-1 year', salary: '₹4-6 LPA' },
          { role: 'Design Engineer', experience: '2-4 years', salary: '₹8-16 LPA' },
          { role: 'Senior Design Engineer', experience: '4-7 years', salary: '₹16-30 LPA' },
          { role: 'Principal / Architect', experience: '7+ years', salary: '₹30-60 LPA' },
        ],
        prosAndCons: {
          pros: ['Government support & subsidies', 'Less competition than software', 'High job security', 'Work on cutting-edge technology'],
          cons: ['Requires strong fundamentals', 'MS preferred for top roles', 'Limited companies in India', 'Long design cycles'],
        },
        topCompanies: ['Intel', 'AMD', 'Qualcomm', 'Samsung Semiconductor', 'Texas Instruments', 'Synopsys', 'Cadence'],
        futureOutlook: 'India\'s semiconductor dream is real but will take 5-7 years to fully materialize. RISC-V open-source chip design is democratizing the field.',
        bitterTruth: 'VLSI jobs in India are mostly in Bangalore and Hyderabad. Starting salary is lower than software. Most companies prefer MS/M.Tech candidates for design roles. B.Tech graduates often get verification (testing) roles, not actual design. The semiconductor "boom" in India is still mostly on paper.',
      },
      roadmap: {
        phases: [
          { title: 'Foundations', duration: '3 months', tasks: ['Digital logic design', 'Verilog / VHDL programming', 'Computer architecture', 'Boolean algebra & state machines'], milestone: 'Design a basic processor in Verilog' },
          { title: 'Core VLSI', duration: '4 months', tasks: ['RTL design methodology', 'Synthesis & timing analysis', 'Verification (SystemVerilog, UVM)', 'FPGA implementation'], milestone: 'Implement a design on FPGA' },
          { title: 'Specialization', duration: '3 months', tasks: ['Choose: Design / Verification / Physical design', 'EDA tools (Cadence, Synopsys)', 'Low power design techniques', 'SoC architecture'], milestone: 'Complete a chip design project' },
          { title: 'Career & GATE', duration: '3 months', tasks: ['GATE preparation (for M.Tech)', 'Industry certifications', 'Research paper / project', 'Apply to semiconductor companies'], milestone: 'GATE qualified or industry role' },
        ],
        certifications: ['VLSI Design (NPTEL)', 'Cadence Certified', 'Synopsys DesignWare'],
        projects: ['RISC-V processor design', 'SPI/I2C controller in Verilog', 'Image processing on FPGA', 'Low-power ALU design'],
      },
      suggestedBranches: ['ECE', 'EEE', 'CSE'],
      matchingCollegeTypes: ['IIT', 'NIT', 'IIIT'],
    },
    {
      id: 'startup-founder',
      title: 'Startup Founder / Entrepreneur',
      tagline: 'Build something the world needs',
      icon: '💡',
      demandLevel: 'N/A',
      avgSalary: '₹0 to ∞',
      growthRate: 'N/A',
      description: 'Build your own company. The most rewarding and risky path. India\'s startup ecosystem is the 3rd largest globally.',
      detailedAnalysis: {
        overview: 'Entrepreneurship means identifying a problem, building a solution, and creating a sustainable business. India produced 100+ unicorns, and the ecosystem is supportive of young founders.',
        industryDemand: 'Not a "job" — but the skills (problem-solving, tech, hustle) are universally valuable. Even if your startup fails, the experience makes you more employable than most.',
        salaryProgression: [
          { role: 'Year 1-2', experience: 'Pre-revenue', salary: '₹0 (you\'re paying, not earning)' },
          { role: 'Year 2-3', experience: 'Early traction', salary: '₹3-8 LPA (founder salary)' },
          { role: 'Year 3-5', experience: 'Growth stage', salary: '₹10-30 LPA + equity' },
          { role: 'Year 5+', experience: 'Scale/Exit', salary: '₹50 LPA to ₹100 Cr+ (if successful)' },
        ],
        prosAndCons: {
          pros: ['Unlimited upside', 'Work on what you love', 'India\'s ecosystem is supportive', 'Most fulfilling career path'],
          cons: ['95% of startups fail', 'Financial stress for years', 'Mental health toll is severe', 'No guaranteed income'],
        },
        topCompanies: ['Not applicable — YOU are the company'],
        futureOutlook: 'India\'s startup ecosystem is maturing. AI-native startups, deep tech, and B2B SaaS are the hottest sectors. Government schemes (Startup India) provide funding and tax benefits.',
        bitterTruth: '95% of startups fail. Your parents will worry. Your friends with jobs will earn 10x you for the first 3 years. You\'ll question your decision every week. But the 5% who succeed change the world. Just make sure you have a financial safety net and genuine problem-solving skills — not just "I want to be a CEO" energy.',
      },
      roadmap: {
        phases: [
          { title: 'Build Skills', duration: '12 months', tasks: ['Learn to code (full-stack)', 'Work at a startup first', 'Study business models', 'Network with founders'], milestone: 'Work at a startup for 1 year' },
          { title: 'Ideation & Validation', duration: '3 months', tasks: ['Identify a real problem', 'Talk to 50+ potential users', 'Build an MVP', 'Get first 10 users'], milestone: 'MVP with real users' },
          { title: 'Launch & Iterate', duration: '6 months', tasks: ['Launch publicly', 'Get feedback and iterate fast', 'Apply to incubators (Y Combinator, NASSCOM)', 'Build a team'], milestone: 'Product-market fit signals' },
          { title: 'Growth & Funding', duration: '6 months', tasks: ['Revenue or strong traction', 'Pitch to angel investors', 'Scale operations', 'Build company culture'], milestone: 'Seed funding or profitable' },
        ],
        certifications: ['Y Combinator Startup School (free)', 'Stanford Entrepreneurship (Coursera)', 'Startup India registration'],
        projects: ['Build and launch a real product', 'Pitch deck for investors', 'Business model canvas', 'Customer discovery interviews'],
      },
      suggestedBranches: ['CSE', 'IT', 'Any Branch'],
      matchingCollegeTypes: ['IIT', 'NIT', 'IIIT', 'Autonomous'],
    },
  ];
}
