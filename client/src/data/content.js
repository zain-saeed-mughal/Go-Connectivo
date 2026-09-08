export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Legal Compliance', path: '/compliance' },
  { label: 'Marketing Partners', path: '/partners' },
  { label: 'FAQs', path: '/faqs' },
];

/** Display order is intentional — keep this sequence in nav + partners page. */
export const marketingPartners = [
  {
    id: 'sangoma',
    name: 'Sangoma',
    monogram: 'SA',
    logo: '/partners/sangoma.svg',
    logoDark: '/partners/sangoma-white.svg',
    website: 'https://sangoma.com/',
    blurb: 'Business communications platforms, UCaaS, and SIP.',
  },
  {
    id: 'dial-world',
    name: 'Dial World',
    monogram: 'DW',
    logo: '/partners/dial-world.png',
    logoOnDark: true,
    website: 'https://www.dialworldcom.com/',
    blurb: 'VoIP termination, numbers, messaging, and BYOC for call centers.',
  },
  {
    id: 'did-central',
    name: 'DID Central',
    monogram: 'DC',
    logo: '/partners/did-central.png',
    logoOnLight: true,
    website: 'https://www.didcentral.io/',
    blurb: 'US & Australia wholesale termination and toll-free voice.',
  },
  {
    id: 'range',
    name: 'Range',
    monogram: 'RG',
    logo: '/partners/range.png',
    logoOnDark: true,
    website: 'https://rangetelecom.com/',
    blurb: 'Tier 1 VoIP termination, US DIDs, toll-free, and SMS.',
  },
];

export const contactInfo = {
  email: 'support@goconnectivo.com',
  address: '522 Glenwood Ave, Williamsport PA 17701, USA',
  support: '24/7 Customer Support',
  hours: 'Monday – Friday: 9:00 AM – 6:00 PM · Saturday: 9:00 AM – 2:00 PM',
};

export const heroContent = {
  eyebrow: 'Go Connectivo',
  titleStart: 'Transform Your Business',
  titleHighlight: 'Communication',
  description:
    'Enterprise dialers, business voice, inbound numbers, carrier termination, contact-center tools, and APIs built for call centers and growing teams that live on the phone.',
  primaryCta: { label: 'Get Started', to: '/contact' },
  secondaryCta: { label: 'Explore Services', to: '/services' },
  pillars: [
    { label: 'Business VoIP', to: '/services/business-voip' },
    { label: 'Contact Center', to: '/services/call-center-software' },
    { label: 'SIP Trunking', to: '/services/sip-trunking' },
    { label: 'VoIP Termination', to: '/services/voip-termination' },
  ],
  fcc: {
    eyebrow: 'FCC COMPLIANT / RMD CERTIFIED',
    highlight: 'FCC Compliant.',
    body: 'Go Connectivo is 100% compliant with FCC regulations and fully certified in the FCC Robocall Mitigation Database (RMD). We are committed to maintaining the highest level of network integrity, protecting consumers, and eliminating illegal robocalls and caller ID spoofing.',
    cta: { label: 'Talk to Sales', to: '/contact' },
  },
};

export const whyChoose = [
  {
    title: 'Reliable Voice Infrastructure',
    icon: 'ShieldCheck',
    description: 'Monitored trunks and redundant routes designed to keep agents reachable.',
  },
  {
    title: 'Clear Technical Support',
    icon: 'Headphones',
    description: 'Specialists who understand SIP, dialers, IVR, and PBX, not only ticket queues.',
  },
  {
    title: 'Practical Go-Live',
    icon: 'Maximize2',
    description: 'Scoped onboarding so seats, trunks, and numbers reach production quickly.',
  },
  {
    title: 'Flexible Business Pricing',
    icon: 'DollarSign',
    description: 'Origination and termination options aligned to how your floor actually dials.',
  },
];

/** Service pillars for mega menu, Services page, and related navigation. */
export const serviceCategories = [
  {
    id: 'business-communications',
    title: 'Business Communications',
    icon: 'Cloud',
    description: 'Hosted calling, PBX, SIP trunks, and mobile voice for modern teams.',
    serviceIds: ['business-voip', 'hosted-pbx', 'sip-trunking', 'mobile-voip'],
  },
  {
    id: 'contact-center',
    title: 'Contact Center',
    icon: 'Headset',
    description: 'Dialers, agent platforms, IVR, queues, recording, and analytics.',
    serviceIds: [
      'auto-dialer',
      'predictive-dialer',
      'power-dialer',
      'progressive-dialer',
      'call-center-software',
      'ivr-auto-attendant',
      'call-routing-queues',
      'call-recording',
      'call-analytics',
      'outbound-services',
    ],
  },
  {
    id: 'numbers-inbound',
    title: 'Numbers & Inbound',
    icon: 'PhoneIncoming',
    description: 'Local, virtual, and toll-free numbers with clean inbound routing.',
    serviceIds: ['did-services', 'inbound-services', 'toll-free-origination'],
  },
  {
    id: 'carrier-voice',
    title: 'Carrier Voice',
    icon: 'Globe',
    description: 'VoIP termination, wholesale routes, and toll-free termination.',
    serviceIds: ['voip-termination', 'wholesale-termination', 'toll-free-termination'],
  },
  {
    id: 'apis-messaging',
    title: 'APIs & Messaging',
    icon: 'Code2',
    description: 'Programmable voice and A2P SMS for product and platform teams.',
    serviceIds: ['voice-api', 'sms-solutions'],
  },
];

export const voipSolutions = [
  {
    id: 'business-communications',
    title: 'Business Communications',
    icon: 'Cloud',
    description: 'Business VoIP, cloud PBX, SIP trunking, and Mobile VoIP without on-site hardware.',
  },
  {
    id: 'contact-center',
    title: 'Contact Center',
    icon: 'Headset',
    description: 'Auto, predictive, power, and progressive dialers plus contact-center software.',
  },
  {
    id: 'carrier-voice',
    title: 'Carrier Voice',
    icon: 'Globe',
    description: 'VoIP termination and wholesale voice for high-volume and carrier traffic.',
  },
];

export const services = [
  {
    id: 'auto-dialer',
    title: 'Auto Dialer Software',
    icon: 'PhoneCall',
    category: 'contact-center',
    description:
      'Automate outbound lists with paced dialing, answer detection, and agent-ready handoff so your team spends time talking, not punching numbers.',
    capabilities: [
      'List pacing controls',
      'Live answer detection',
      'Agent connect queue',
      'Campaign reporting',
      'CRM disposition sync',
    ],
    span: '',
  },
  {
    id: 'predictive-dialer',
    title: 'Predictive Dialer',
    icon: 'Activity',
    category: 'contact-center',
    description:
      'Increase connects per hour with predictive algorithms that balance abandon risk against agent availability.',
    capabilities: [
      'Adaptive dial ratios',
      'Abandon-rate safeguards',
      'Skill-based routing',
      'Real-time dashboards',
      'Compliance-friendly pacing',
    ],
    span: '',
  },
  {
    id: 'power-dialer',
    title: 'Power Dialer',
    icon: 'Zap',
    category: 'contact-center',
    description:
      'One-to-one power dialing for high-touch sales floors that need control without sacrificing speed.',
    capabilities: [
      'Click-next dialing',
      'Local presence options',
      'Call scripting hooks',
      'Wrap-up timers',
      'Supervisor listen / whisper',
    ],
    span: '',
  },
  {
    id: 'progressive-dialer',
    title: 'Progressive Dialer',
    icon: 'ListOrdered',
    category: 'contact-center',
    description:
      'Progressive mode dials the next lead only when an agent is free, ideal when quality beats raw volume.',
    capabilities: [
      'Agent-ready dialing',
      'Preview before connect',
      'Priority queues',
      'DNC list enforcement',
      'Detailed call outcomes',
    ],
    span: '',
  },
  {
    id: 'business-voip',
    title: 'Business VoIP',
    icon: 'Phone',
    category: 'business-communications',
    description:
      'Enterprise-ready VoIP calling for teams that need clear audio, flexible seats, and numbers that travel with the business.',
    capabilities: [
      'HD voice quality',
      'Business caller ID',
      'Multi-device softphones',
      'Seat-based scaling',
      'Desktop & mobile apps',
    ],
    span: '',
  },
  {
    id: 'hosted-pbx',
    title: 'Cloud PBX',
    icon: 'Cloud',
    category: 'business-communications',
    description:
      'A full cloud PBX for extensions, IVR, and office calling, managed in the browser and ready to grow with your seats.',
    capabilities: [
      'Extensions & ring groups',
      'Auto-attendant / IVR',
      'Call recording options',
      'Voicemail-to-email',
      'Softphone & desk phone support',
    ],
    span: '',
  },
  {
    id: 'sip-trunking',
    title: 'SIP Trunking',
    icon: 'Cable',
    category: 'business-communications',
    description:
      'Replace PRI and legacy trunks with elastic SIP capacity, connect your PBX or platform to carrier-grade voice routes.',
    capabilities: [
      'Elastic concurrent channels',
      'BYO or hosted PBX interconnect',
      'Failover trunks',
      'Codec flexibility',
      'Transparent rate decks',
    ],
    span: '',
  },
  {
    id: 'mobile-voip',
    title: 'Mobile VoIP',
    icon: 'Smartphone',
    category: 'business-communications',
    description:
      'Stay connected anywhere with our mobile VoIP app. Make and receive business calls from your smartphone using your business number.',
    capabilities: [
      'Business caller ID',
      'Call transfer',
      'Voicemail access',
      'Call flip',
      'WiFi calling',
    ],
    span: '',
  },
  {
    id: 'click-to-call',
    title: 'Click-to-Call',
    icon: 'MousePointerClick',
    category: 'apis-messaging',
    description:
      'Launch outbound calls from your CRM or web panel with one click, fewer misdials, faster follow-ups.',
    capabilities: [
      'Browser / CRM click launch',
      'Caller ID control',
      'Call notes capture',
      'Webhook & API hooks',
      'Agent activity logs',
    ],
    span: '',
    hiddenFromCatalog: true,
    redirectTo: 'voice-api',
  },
  {
    id: 'inbound-services',
    title: 'Inbound Voice',
    icon: 'PhoneIncoming',
    category: 'numbers-inbound',
    description:
      'Route customer calls with intelligent queues, time-of-day rules, and failover so every inquiry finds the right desk.',
    capabilities: [
      'IVR & skill queues',
      'Time-based routing',
      'Overflow & failover',
      'Call recording',
      'Missed-call recovery',
    ],
    span: '',
  },
  {
    id: 'toll-free-origination',
    title: 'Toll-Free Origination',
    icon: 'PhoneForwarded',
    category: 'numbers-inbound',
    description:
      'Give customers a free way in with 8xx origination that lands on your IVR, agents, or cloud PBX.',
    capabilities: [
      '800 / 888 / 877 & more',
      'Number provisioning',
      'Routing to PBX or dialer',
      'Usage reporting',
      'Vanity number options',
    ],
    span: '',
  },
  {
    id: 'did-services',
    title: 'DID & Virtual Numbers',
    icon: 'MapPin',
    category: 'numbers-inbound',
    description:
      'Local DIDs and virtual numbers for market presence, campaigns, and centralized routing to PBX, apps, or agents.',
    capabilities: [
      'Local area codes',
      'Virtual number inventory',
      'Number portability',
      'Forward to SIP / PSTN',
      'Campaign number pools',
    ],
    span: '',
  },
  {
    id: 'virtual-numbers',
    title: 'Virtual Numbers',
    icon: 'Hash',
    category: 'numbers-inbound',
    description:
      'Provision virtual numbers that ring to your PBX, apps, or agents, ideal for campaigns, departments, and multi-market presence.',
    capabilities: [
      'Instant number inventory',
      'Forward to SIP / PSTN',
      'Campaign number pools',
      'Easy activate / release',
      'Usage & CDR visibility',
    ],
    span: '',
    hiddenFromCatalog: true,
    redirectTo: 'did-services',
  },
  {
    id: 'outbound-services',
    title: 'Outbound Voice',
    icon: 'PhoneOutgoing',
    category: 'contact-center',
    description:
      'Campaign-ready outbound voice with clear audio, flexible caller ID, and routes built for sustained connect rates.',
    capabilities: [
      'Campaign trunks',
      'Caller ID management',
      'Concurrent call scaling',
      'Quality monitoring',
      'Usage analytics',
    ],
    span: '',
  },
  {
    id: 'toll-free-termination',
    title: 'Toll-Free Termination',
    icon: 'ArrowUpRight',
    category: 'carrier-voice',
    description:
      'Terminate outbound traffic to toll-free destinations with stable routes and transparent pricing.',
    capabilities: [
      '8xx termination routes',
      'Competitive rate decks',
      'Failover carriers',
      'CDR access',
      'Quality monitoring',
    ],
    span: '',
  },
  {
    id: 'wholesale-termination',
    title: 'Wholesale Voice',
    icon: 'Globe',
    category: 'carrier-voice',
    description:
      'Domestic and international wholesale termination for platforms and partners that need scale without surprises.',
    capabilities: [
      'Domestic & intl routes',
      'SIP trunk interconnect',
      'High concurrent capacity',
      'Tiered rate options',
      '24/7 NOC support',
    ],
    span: '',
  },
  {
    id: 'voip-termination',
    title: 'VoIP Termination',
    icon: 'Radio',
    category: 'carrier-voice',
    description:
      'Reliable domestic and international VoIP termination with competitive rates and monitored call quality.',
    capabilities: [
      'Domestic termination',
      'International termination',
      'Competitive rates',
      'High call quality',
      '24/7 technical support',
    ],
    span: '',
  },
  {
    id: 'call-center-software',
    title: 'Contact Center Software',
    icon: 'Headset',
    category: 'contact-center',
    description:
      'Run inbound and outbound desks, on-site or remote, from one console with queues, agents, supervisors, and live wallboards.',
    capabilities: [
      'ACD queues',
      'Remote & on-site agents',
      'Supervisor dashboards',
      'Live monitoring',
      'SLA & occupancy metrics',
    ],
    span: '',
  },
  {
    id: 'virtual-contact-center',
    title: 'Virtual Contact Center',
    icon: 'Monitor',
    category: 'contact-center',
    description:
      'Stand up a distributed contact center for remote or hybrid teams, same queues, same quality, any location.',
    capabilities: [
      'Remote agent login',
      'Unified queues',
      'Supervisor dashboards',
      'Secure softphone access',
      'Multi-site routing',
    ],
    span: '',
    hiddenFromCatalog: true,
    redirectTo: 'call-center-software',
  },
  {
    id: 'ivr-auto-attendant',
    title: 'IVR & Auto Attendant',
    icon: 'Mic',
    category: 'contact-center',
    description:
      'Guide callers with professional IVR menus and auto-attendants that route to the right queue, extension, or message.',
    capabilities: [
      'Multi-level IVR trees',
      'Business-hours menus',
      'DTMF & speech options',
      'Custom prompts',
      'Overflow & voicemail paths',
    ],
    span: '',
  },
  {
    id: 'call-routing-queues',
    title: 'Call Routing & Queues',
    icon: 'GitBranch',
    category: 'contact-center',
    description:
      'Skill-based routing, priority queues, and overflow rules that keep wait times low and the right agents engaged.',
    capabilities: [
      'Skill & priority queues',
      'Time-of-day routing',
      'Overflow & callback',
      'Queue announcements',
      'Supervisor override',
    ],
    span: '',
  },
  {
    id: 'call-recording',
    title: 'Call Recording',
    icon: 'Disc',
    category: 'contact-center',
    description:
      'Secure call recording for training, compliance, and quality, with access controls built for supervisors and ops.',
    capabilities: [
      'On-demand or always-on',
      'Secure cloud storage',
      'Role-based playback',
      'Retention policies',
      'Quality review workflows',
    ],
    span: '',
  },
  {
    id: 'call-analytics',
    title: 'Call Analytics & Reporting',
    icon: 'BarChart3',
    category: 'contact-center',
    description:
      'Live and historical reporting on answer rates, handle time, campaigns, and agent performance, so ops can coach with data.',
    capabilities: [
      'Real-time wallboards',
      'Campaign & queue reports',
      'Agent scorecards',
      'Exportable CDRs',
      'Custom date ranges',
    ],
    span: '',
  },
  {
    id: 'voice-api',
    title: 'Programmable Voice API',
    icon: 'Code2',
    category: 'apis-messaging',
    description:
      'Embed outbound and inbound calling into your apps with programmable voice APIs, webhooks, and SIP. Technical docs are shared during onboarding.',
    capabilities: [
      'REST & webhook events',
      'Click-to-call & notifications',
      'Programmable IVR flows',
      'SIP & media control',
      'Onboarding-shared API docs',
    ],
    span: '',
  },
  {
    id: 'sms-solutions',
    title: 'A2P SMS Messaging',
    icon: 'MessageSquare',
    category: 'apis-messaging',
    description:
      'Two-way business SMS for alerts, OTP, campaign follow-ups, and agent messaging alongside your voice stack.',
    capabilities: [
      'A2P messaging support',
      'Two-way conversations',
      'Delivery receipts',
      'API & portal send',
      'Number & brand registration help',
    ],
    span: '',
  },
  /** Legacy URL kept for existing bookmarks, not listed in menus. */
  {
    id: 'ringless-voicemail',
    title: 'Ringless Voicemail',
    icon: 'Voicemail',
    category: 'business-communications',
    description:
      'Drop compliant voicemail messages into inboxes so your outreach lands without interrupting the recipient’s day.',
    capabilities: [
      'Bulk drop campaigns',
      'Audio template library',
      'Schedule windows',
      'Delivery reporting',
      'List segmentation',
    ],
    span: '',
    hiddenFromCatalog: true,
  },
];

export const companyStats = [
  { display: 'Business VoIP', label: 'Business calling & cloud PBX' },
  { display: 'DID & Numbers', label: 'Local, virtual & toll-free numbers' },
  { display: 'SIP & Carrier Voice', label: 'SIP trunks & VoIP termination' },
  { display: 'Contact Center', label: 'Contact center & dialer solutions' },
];

export const aboutIntro = [
  'Go Connectivo is a voice infrastructure partner for contact centers and growing teams. We bring dialers, Business VoIP, numbers, carrier termination, and contact-center tools into one practical operating stack.',
  'Our focus is dependable routes, clear audio, and specialist support so agents stay productive, whether they work on one floor or across locations.',
];

export const coreValues = [
  {
    title: 'Reliability',
    icon: 'ShieldCheck',
    description: 'Redundant routes and monitored voice paths with a reliability-first operating mindset.',
  },
  {
    title: 'Innovation',
    icon: 'Zap',
    description:
      'Dialers, SIP trunks, IVR, analytics, and programmable voice that keep pace with how modern floors operate.',
  },
  {
    title: 'Support',
    icon: 'Headphones',
    description: 'Specialists who understand trunks, campaigns, and contact-center workflows.',
  },
  {
    title: 'Transparency',
    icon: 'ListOrdered',
    description: 'Clear rate decks, honest timelines, and no surprise scope on voice services.',
  },
  {
    title: 'Growth',
    icon: 'Maximize2',
    description: 'Architecture that scales seats, concurrent calls, and markets without a rip-and-replace.',
  },
];

export const techMarquee = [
  'STIR/SHAKEN Compliance',
  'FCC Robocall Mitigation Database Registered',
  'FCC Registered',
  'Registered FCC Form 499 Filer',
  'USAC Regulatory Compliance',
  'USF Regulatory Compliance',
  'TRS Regulatory Compliance',
  'NANP & Numbering Compliance',
  'CPNI & Customer Privacy',
  'Robocall Mitigation Program',
  'Industry Traceback Cooperation',
  'Customer Verification & KYC',
  'Zero-Tolerance Abuse Policy',
];

export const complianceItems = [
  {
    id: 'stir-shaken',
    mark: 'STIR',
    title: 'STIR/SHAKEN Compliance',
    body: 'Our network works with STIR/SHAKEN-enabled carrier infrastructure to support authenticated caller identity and responsible voice termination. Our voice network supports STIR/SHAKEN caller ID authentication and industry-standard call authentication practices designed to help protect the voice ecosystem against unlawful spoofing and fraudulent robocalling.',
  },
  {
    id: 'fcc-rmd',
    mark: 'FCC',
    title: 'FCC Robocall Mitigation Database Registered',
    body: "We maintain applicable registration and robocall mitigation information with the Federal Communications Commission's Robocall Mitigation Database and support measures designed to prevent illegal robocalling and caller-ID spoofing.",
  },
  {
    id: 'fcc-registered',
    mark: 'FCC',
    title: 'FCC Registered',
    body: 'FCC Registered VoIP Service Provider.',
  },
  {
    id: 'fcc-499',
    mark: '499',
    title: 'Registered FCC Form 499 Filer',
    body: 'We maintain applicable FCC Form 499 registration and telecommunications reporting obligations through the Universal Service Administrative Company (USAC).',
  },
  {
    id: 'usac',
    mark: 'USAC',
    title: 'USAC Regulatory Compliance',
    body: 'We maintain applicable telecommunications reporting requirements through USAC, including FCC Form 499 reporting and applicable federal contribution obligations.',
  },
  {
    id: 'usf',
    mark: 'USF',
    title: 'USF Regulatory Compliance',
    body: 'Applicable federal Universal Service Fund reporting and contribution requirements are maintained in accordance with FCC and USAC requirements.',
  },
  {
    id: 'trs',
    mark: 'TRS',
    title: 'TRS Regulatory Compliance',
    body: 'We maintain applicable Telecommunications Relay Services reporting and contribution obligations associated with our telecommunications services.',
  },
  {
    id: 'nanp',
    mark: 'NANP',
    title: 'NANP & Numbering Compliance',
    body: 'Our telecommunications operations follow applicable North American Numbering Plan and federal numbering requirements.',
  },
  {
    id: 'cpni',
    mark: 'CPNI',
    title: 'CPNI & Customer Privacy',
    body: 'We maintain safeguards designed to protect Customer Proprietary Network Information and customer account information in accordance with applicable FCC privacy requirements.',
  },
  {
    id: 'rmp',
    mark: 'RMP',
    title: 'Robocall Mitigation Program',
    body: 'We maintain policies and controls designed to identify, prevent and respond to suspected illegal robocalling, spoofing and abusive traffic across our network.',
  },
  {
    id: 'traceback',
    mark: 'ITG',
    title: 'Industry Traceback Cooperation',
    body: 'We cooperate with applicable traceback requests and maintain procedures designed to rapidly investigate suspected unlawful voice traffic originating from or traversing our network.',
  },
  {
    id: 'kyc',
    mark: 'KYC',
    title: 'Customer Verification & KYC',
    body: 'We maintain customer onboarding, identity verification and traffic-monitoring procedures designed to prevent misuse of our network.',
  },
  {
    id: 'zero-tolerance',
    mark: 'ZTA',
    title: 'Zero-Tolerance Abuse Policy',
    body: 'We prohibit unlawful robocalling, fraudulent traffic, caller-ID spoofing and other misuse of our telecommunications network and may suspend services associated with suspected unlawful activity.',
  },
];

export const legalNavItems = [
  {
    id: 'robocall-plan',
    title: 'Robocall Mitigation Plan',
    path: '/compliance/robocall-mitigation-plan',
    icon: 'ListOrdered',
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use & Calling Policy',
    path: '/compliance/acceptable-use-policy',
    icon: 'ShieldCheck',
  },
];

export const whyUs = [
  {
    title: 'Competitive Voice Rates',
    description:
      'Transparent origination, VoIP Termination, and wholesale options versus legacy carriers.',
  },
  {
    title: 'Faster Go-Live',
    description: 'Dialers, PBX seats, SIP trunks, and numbers provisioned with guided onboarding.',
  },
  {
    title: '24/7 Voice Support',
    description: 'Round-the-clock help for trunks, campaigns, IVR, and routing issues.',
  },
  {
    title: 'One Accountable Partner',
    description:
      'Business VoIP, contact center, SIP, numbers, and termination under one operating relationship.',
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Define Your Stack',
    description:
      'Choose dialers, business voice, numbers, termination, contact-center tools, or APIs.',
  },
  {
    step: '02',
    title: 'Provision Access',
    description: 'We create accounts, trunks, and agent logins, no heavy hardware rollout.',
  },
  {
    step: '03',
    title: 'Port or Assign Numbers',
    description: 'Move existing DIDs / toll-free or assign local and virtual inventory for your markets.',
  },
  {
    step: '04',
    title: 'Configure & Launch',
    description: 'IVR, queues, campaigns, and caller ID are tuned, most teams go live in 24–48 hours.',
  },
  {
    step: '05',
    title: 'Optimize & Support',
    description: 'Ongoing monitoring, training, and rate guidance as your call volume grows.',
  },
];

export const technologies = [
  {
    group: 'Business Communications',
    items: ['Business VoIP', 'Cloud PBX', 'SIP trunking', 'Mobile VoIP'],
  },
  {
    group: 'Contact Center',
    items: [
      'Auto dialer software',
      'Predictive dialer',
      'Power dialer',
      'Progressive dialer',
      'Contact center software',
      'IVR & auto attendant',
    ],
  },
  {
    group: 'Numbers & Inbound',
    items: ['DID & virtual numbers', 'Inbound voice', 'Toll-free origination'],
  },
  {
    group: 'Carrier Voice',
    items: ['VoIP termination', 'Wholesale voice', 'Toll-free termination'],
  },
  {
    group: 'APIs & Messaging',
    items: ['Programmable Voice API', 'A2P SMS Messaging', 'Click-to-call', 'Webhooks'],
  },
];

export const testimonials = [];

/** Homepage proof cards — use cases only, no fabricated customer quotes. */
export const homeProofPoints = [
  {
    title: 'Outbound sales floors',
    text: 'Dialer modes, campaign trunks, and termination paths for teams measured on talk time.',
    to: '/services/auto-dialer',
  },
  {
    title: 'Distributed offices',
    text: 'Business VoIP, hosted PBX, and SIP trunking for desks that need clear, managed calling.',
    to: '/services/business-voip',
  },
  {
    title: 'Carrier voice teams',
    text: 'VoIP Termination and wholesale routes for high-volume outbound and partner traffic.',
    to: '/services/voip-termination',
  },
];

export const faqCategories = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How do I get started with Go Connectivo?',
        a: 'Tell us whether you need dialers, business voice (PBX / SIP / Mobile VoIP), inbound numbers, VoIP Termination or wholesale routes, contact-center tools, or Voice API / SMS, or a mix. We scope seats and capacity, then provision access with guided onboarding.',
        related: [
          { label: 'Contact sales', to: '/contact' },
          { label: 'Browse services', to: '/services' },
        ],
      },
      {
        q: 'What equipment do I need?',
        a: 'A stable internet connection and headsets or softphones for agents. Desk phones are optional; many floors run entirely in the browser or with SIP softphones we can help you choose.',
        related: [
          { label: 'Business VoIP', to: '/services/business-voip' },
          { label: 'Hosted PBX', to: '/services/hosted-pbx' },
        ],
      },
      {
        q: 'Can I keep my existing phone numbers?',
        a: 'Yes. We support porting for most DIDs and toll-free numbers. Port windows typically take 7–10 business days, and we coordinate paperwork so your lines stay reachable.',
        related: [
          { label: 'DID services', to: '/services/did-services' },
          { label: 'Toll-free origination', to: '/services/toll-free-origination' },
        ],
      },
    ],
  },
  {
    category: 'Features & Functionality',
    items: [
      {
        q: 'Which dialer modes do you support?',
        a: 'Go Connectivo supports smart auto, predictive, power, and progressive dialing so agents stay productive and campaigns keep connecting.',
        related: [
          { label: 'Smart auto dialer', to: '/services/auto-dialer' },
          { label: 'Predictive dialer', to: '/services/predictive-dialer' },
        ],
      },
      {
        q: 'Do you offer hosted PBX and call center tools?',
        a: 'Yes. Business Voice covers Business VoIP, hosted cloud PBX, SIP trunking, and Mobile VoIP. Contact Center adds call center software, IVR, queues, recording, and analytics.',
        related: [
          { label: 'Hosted PBX', to: '/services/hosted-pbx' },
          { label: 'Call center software', to: '/services/call-center-software' },
        ],
      },
      {
        q: 'What inbound and outbound voice services are available?',
        a: 'Inbound & Numbers includes inbound voice, toll-free origination, Local Numbers (DID Solutions), and virtual numbers. Outbound & Carrier Voice covers campaign outbound, toll-free termination, wholesale voice termination, and dedicated VoIP Termination, each with a distinct buying intent.',
        related: [
          { label: 'Outbound voice', to: '/services/outbound-services' },
          { label: 'VoIP termination', to: '/services/voip-termination' },
          { label: 'Wholesale termination', to: '/services/wholesale-termination' },
        ],
      },
      {
        q: 'Do you offer APIs or SMS?',
        a: 'Yes. API & Messaging includes Voice API / Programmable Voice for embedding calling in your apps, plus SMS/A2P Solutions for alerts, OTP, and two-way business messaging. Detailed endpoint documentation is shared during onboarding.',
        related: [
          { label: 'Voice API', to: '/services/voice-api' },
          { label: 'SMS solutions', to: '/services/sms-solutions' },
        ],
      },
      {
        q: 'Is call recording available?',
        a: 'Yes, Call Recording is a dedicated Contact Center service, and recording can also be enabled on PBX seats where your plan and compliance needs allow.',
        related: [
          { label: 'Call recording', to: '/services/call-recording' },
          { label: 'Acceptable use policy', to: '/compliance/acceptable-use-policy' },
        ],
      },
    ],
  },
  {
    category: 'Pricing & Billing',
    items: [
      {
        q: 'Are there any setup fees?',
        a: 'Standard cloud telephony and dialer seats typically have no setup fees. Custom interconnect or enterprise cutovers are quoted transparently before work begins.',
        related: [{ label: 'Request a quote', to: '/contact' }],
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept major credit cards and ACH bank transfers. Larger wholesale and enterprise accounts can arrange monthly invoicing.',
        related: [{ label: 'Contact billing', to: '/contact' }],
      },
      {
        q: 'Is there a contract or commitment?',
        a: 'Many seats are month-to-month. Wholesale termination and enterprise packages may include volume commitments; we outline terms clearly before you sign.',
        related: [
          { label: 'Wholesale termination', to: '/services/wholesale-termination' },
          { label: 'Talk to sales', to: '/contact' },
        ],
      },
      {
        q: 'Do you offer a free trial?',
        a: 'We offer a 14-day evaluation for eligible dialer and PBX seats so your team can test call quality and workflows before committing.',
        related: [{ label: 'Start evaluation', to: '/contact' }],
      },
    ],
  },
  {
    category: 'Technical Support',
    items: [
      {
        q: 'What internet speed do I need?',
        a: 'Plan roughly 100 kbps up and down per concurrent call, plus headroom for your office apps. Contact-center floors should use wired connections where possible.',
        related: [{ label: 'SIP trunking', to: '/services/sip-trunking' }],
      },
      {
        q: 'What happens if my internet goes down?',
        a: 'We can configure failover forwarding, backup SIP paths, and overflow rules so inbound calls still reach a reachable destination when a site drops offline.',
        related: [
          { label: 'Call routing & queues', to: '/services/call-routing-queues' },
          { label: 'Inbound services', to: '/services/inbound-services' },
        ],
      },
      {
        q: 'How do I get technical support?',
        a: 'Voice specialist support is available by phone, email, and chat for trunks, campaigns, IVR, and PBX issues. Business-hours coverage is listed on the Contact page; extended coverage can be scoped for wholesale and enterprise accounts.',
        related: [{ label: 'Contact support', to: '/contact' }],
      },
      {
        q: 'Do you offer training for my team?',
        a: 'Yes, onboarding covers agent consoles, supervisor tools, and campaign setup, plus documentation your ops leads can reuse for new hires.',
        related: [
          { label: 'Call center software', to: '/services/call-center-software' },
          { label: 'Contact support', to: '/contact' },
        ],
      },
    ],
  },
];

export const faqs = faqCategories.flatMap((group) => group.items);

export const serviceOptions = services
  .filter((service) => !service.hiddenFromCatalog)
  .map((service) => service.title);

/** Flagship cards for home + hover slider (subset of full catalog). */
export const featuredServiceIds = [
  'business-voip',
  'sip-trunking',
  'call-center-software',
  'voip-termination',
  'auto-dialer',
  'did-services',
];

export const featuredServices = featuredServiceIds
  .map((id) => services.find((service) => service.id === id))
  .filter(Boolean);

export function getServiceById(id) {
  return services.find((service) => service.id === id);
}

export function getCategoryById(id) {
  return serviceCategories.find((category) => category.id === id);
}

export function getServicesForCategory(categoryId) {
  const category = getCategoryById(categoryId);
  if (!category) return [];
  return category.serviceIds
    .map((id) => getServiceById(id))
    .filter((service) => service && !service.hiddenFromCatalog);
}

/** Services shown on /services catalog (excludes legacy hidden entries). */
export function getCatalogServices() {
  return services.filter((service) => !service.hiddenFromCatalog);
}
