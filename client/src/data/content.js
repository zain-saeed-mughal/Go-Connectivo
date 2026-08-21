export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Legal Compliance', path: '/compliance' },
  { label: 'FAQs', path: '/faqs' },
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
  secondaryCta: { label: 'Contact Us', to: '/contact' },
  fcc: {
    eyebrow: 'FCC COMPLIANT / RMD CERTIFIED',
    highlight: 'FCC Compliant.',
    body: 'Go Connectivo is 100% compliant with FCC regulations and fully certified in the FCC Robocall Mitigation Database (RMD). We are committed to maintaining the highest level of network integrity, protecting consumers, and eliminating illegal robocalls and caller ID spoofing.',
    cta: { label: 'Get Started', to: '/contact' },
  },
};

export const whyChoose = [
  {
    title: '99.9% Uptime',
    icon: 'ShieldCheck',
    description:
      'Carrier-grade routes and redundant voice infrastructure so your agents stay on the line.',
  },
  {
    title: 'Scalable Dialers',
    icon: 'Maximize2',
    description: 'Grow from a small floor to high-volume outbound without ripping out your stack.',
  },
  {
    title: '24/7 Support',
    icon: 'Headphones',
    description:
      'Voice specialists available around the clock when campaigns, trunks, or PBX need attention.',
  },
  {
    title: 'Cost Effective',
    icon: 'DollarSign',
    description:
      'Competitive origination and termination rates that cut traditional telephony spend.',
  },
];

/** Service pillars for mega menu, Services page, and related navigation. */
export const serviceCategories = [
  {
    id: 'dialer-solutions',
    title: 'Dialer Solutions',
    icon: 'PhoneCall',
    description: 'Multi-mode dialers that keep agents talking and campaigns connecting.',
    serviceIds: ['auto-dialer', 'predictive-dialer', 'power-dialer', 'progressive-dialer'],
  },
  {
    id: 'business-voice',
    title: 'Business Voice',
    icon: 'Cloud',
    description: 'Hosted calling, SIP trunks, and mobile voice for modern offices.',
    serviceIds: ['business-voip', 'hosted-pbx', 'sip-trunking', 'mobile-voip', 'click-to-call'],
  },
  {
    id: 'inbound-numbers',
    title: 'Inbound & Numbers',
    icon: 'PhoneIncoming',
    description: 'Local, toll-free, and virtual numbers with clean inbound routing.',
    serviceIds: [
      'inbound-services',
      'toll-free-origination',
      'did-services',
      'virtual-numbers',
    ],
  },
  {
    id: 'outbound-carrier',
    title: 'Outbound & Carrier Voice',
    icon: 'PhoneOutgoing',
    description: 'Campaign outbound plus wholesale and VoIP termination at scale.',
    serviceIds: [
      'outbound-services',
      'toll-free-termination',
      'wholesale-termination',
      'voip-termination',
    ],
  },
  {
    id: 'contact-center',
    title: 'Contact Center',
    icon: 'Headset',
    description: 'Agent tools, IVR, queues, recording, and analytics for live floors.',
    serviceIds: [
      'call-center-software',
      'virtual-contact-center',
      'ivr-auto-attendant',
      'call-routing-queues',
      'call-recording',
      'call-analytics',
    ],
  },
  {
    id: 'api-messaging',
    title: 'API & Messaging',
    icon: 'Code2',
    description: 'Programmable voice and SMS to embed calling into your product.',
    serviceIds: ['voice-api', 'sms-solutions'],
  },
];

export const voipSolutions = [
  {
    id: 'dialer-solutions',
    title: 'Dialer Solutions',
    icon: 'PhoneCall',
    description:
      'Smart auto, predictive, power, and progressive dialing built for high-volume sales floors.',
  },
  {
    id: 'business-voice',
    title: 'Business Voice',
    icon: 'Cloud',
    description:
      'Business VoIP, hosted PBX, SIP trunking, and Mobile VoIP without on-site hardware.',
  },
  {
    id: 'outbound-carrier',
    title: 'Outbound & Carrier Voice',
    icon: 'PhoneOutgoing',
    description:
      'Outbound voice plus toll-free, wholesale, and dedicated VoIP Termination routes.',
  },
];

export const services = [
  {
    id: 'auto-dialer',
    title: 'Smart Auto Dialer',
    icon: 'PhoneCall',
    category: 'dialer-solutions',
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
    category: 'dialer-solutions',
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
    category: 'dialer-solutions',
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
    category: 'dialer-solutions',
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
    category: 'business-voice',
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
    title: 'Hosted Cloud PBX',
    icon: 'Cloud',
    category: 'business-voice',
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
    category: 'business-voice',
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
    category: 'business-voice',
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
    category: 'business-voice',
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
  },
  {
    id: 'inbound-services',
    title: 'Inbound Voice',
    icon: 'PhoneIncoming',
    category: 'inbound-numbers',
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
    category: 'inbound-numbers',
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
    title: 'Local Numbers (DID Solutions)',
    icon: 'MapPin',
    category: 'inbound-numbers',
    description:
      'Get local presence in any market with our Direct Inward Dialing solutions. Establish local identity while maintaining centralized operations.',
    capabilities: [
      'Local area codes',
      'Number portability',
      'Virtual presence',
      'Call forwarding',
    ],
    span: '',
  },
  {
    id: 'virtual-numbers',
    title: 'Virtual Numbers',
    icon: 'Hash',
    category: 'inbound-numbers',
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
  },
  {
    id: 'outbound-services',
    title: 'Outbound Voice',
    icon: 'PhoneOutgoing',
    category: 'outbound-carrier',
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
    category: 'outbound-carrier',
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
    title: 'Wholesale Voice Termination',
    icon: 'Globe',
    category: 'outbound-carrier',
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
    category: 'outbound-carrier',
    description:
      'Reliable domestic and international VoIP termination services with competitive rates and crystal-clear call quality.',
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
    title: 'Call Center Software',
    icon: 'Headset',
    category: 'contact-center',
    description:
      'Run inbound and outbound desks from one console, queues, agents, supervisors, and live wallboards included.',
    capabilities: [
      'ACD queues',
      'Agent & supervisor tools',
      'Live monitoring',
      'SLA & occupancy metrics',
      'Omnichannel-ready voice core',
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
    title: 'Voice API / Programmable Voice',
    icon: 'Code2',
    category: 'api-messaging',
    description:
      'Embed outbound and inbound calling into your apps with programmable voice APIs, webhooks, SIP, and developer-friendly docs.',
    capabilities: [
      'REST & webhook events',
      'Click-to-call & notifications',
      'Programmable IVR flows',
      'SIP & media control',
      'Sandbox & production keys',
    ],
    span: '',
  },
  {
    id: 'sms-solutions',
    title: 'SMS/A2P Solutions',
    icon: 'MessageSquare',
    category: 'api-messaging',
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
    category: 'business-voice',
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
  { value: 5000, suffix: '+', label: 'Businesses Served' },
  { value: 99.9, suffix: '%', label: 'Uptime Guarantee' },
  { value: 24, suffix: '/7', label: 'Support Available' },
  { value: 60, suffix: '%', label: 'Average Cost Savings' },
];

export const aboutIntro = [
  'Go Connectivo helps contact centers, sales teams, and service desks run on a complete voice stack, dialer solutions, business VoIP and hosted PBX, inbound numbers, outbound and carrier termination (including VoIP Termination), contact-center tools, plus voice API and SMS.',
  'Our focus is practical telecom infrastructure: clear audio, predictable rates, and platforms that keep agents productive whether they sit on one floor or across many locations.',
];

export const coreValues = [
  {
    title: 'Reliability',
    description: '99.9% uptime mindset with redundant routes and monitored voice paths.',
  },
  {
    title: 'Innovation',
    description:
      'Dialers, SIP trunks, IVR, analytics, and programmable voice that keep pace with how modern floors operate.',
  },
  {
    title: 'Support',
    description: '24/7 specialists who understand trunks, campaigns, and contact-center workflows.',
  },
  {
    title: 'Transparency',
    description: 'Clear rate decks, honest timelines, and no surprise scope on voice services.',
  },
  {
    title: 'Growth',
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
    title: 'Lower Voice Costs',
    description:
      'Competitive origination, VoIP Termination, and wholesale rates versus legacy carriers.',
  },
  {
    title: 'Faster Go-Live',
    description: 'Dialers, PBX seats, SIP trunks, and numbers provisioned quickly with guided onboarding.',
  },
  {
    title: '24/7 Voice Support',
    description: 'Round-the-clock help for trunks, campaigns, IVR, and routing issues.',
  },
  {
    title: 'Full Voice Stack',
    description:
      'From dialers and contact-center tools to carrier voice, numbers, APIs, and SMS, one partner.',
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
    group: 'Business Voice',
    items: ['Business VoIP', 'Hosted Cloud PBX', 'SIP trunking', 'Mobile VoIP', 'Click-to-call'],
  },
  {
    group: 'Inbound & Numbers',
    items: [
      'Inbound voice',
      'Toll-free origination',
      'Local Numbers (DID)',
      'Virtual numbers',
    ],
  },
  {
    group: 'Outbound & Carrier',
    items: [
      'Outbound voice',
      'Toll-free termination',
      'Wholesale voice termination',
      'VoIP termination',
    ],
  },
  {
    group: 'Contact Center',
    items: [
      'Call center software',
      'IVR & auto attendant',
      'Routing & queues',
      'Call recording',
      'Analytics',
    ],
  },
  {
    group: 'API & Messaging',
    items: ['Voice API', 'Programmable voice', 'SMS/A2P Solutions', 'Webhooks'],
  },
  {
    group: 'Dialer Solutions',
    items: ['Smart auto dialer', 'Predictive dialer', 'Power dialer', 'Progressive dialer'],
  },
];

export const testimonials = [
  {
    quote:
      'Go Connectivo gave our outbound team a dialer stack we could trust. Connect rates improved and supervisors finally had visibility they needed on one floor.',
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
  },
  {
    quote:
      'We stood up a virtual contact center for remote agents in under a week. Inbound queues and hosted PBX just worked, support stayed with us through cutover.',
    name: 'Michael Chen',
    role: 'Operations Director, GlobalTech',
  },
  {
    quote:
      'Wholesale termination and VoIP Termination quality have been consistent and the rate deck is straightforward. We’ve cut voice spend while keeping campaign audio clear.',
    name: 'Jennifer Martinez',
    role: 'CTO, Innovate Solutions',
  },
];

export const faqCategories = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How do I get started with Go Connectivo?',
        a: 'Tell us whether you need dialers, business voice (PBX / SIP / Mobile VoIP), inbound numbers, VoIP Termination or wholesale routes, contact-center tools, or Voice API / SMS, or a mix. We’ll scope seats and capacity, provision access, and most teams are live within 24–48 hours.',
      },
      {
        q: 'What equipment do I need?',
        a: 'A stable internet connection and headsets or softphones for agents. Desk phones are optional; many floors run entirely in the browser or with SIP softphones we can help you choose.',
      },
      {
        q: 'Can I keep my existing phone numbers?',
        a: 'Yes. We support porting for most DIDs and toll-free numbers. Port windows typically take 7–10 business days, and we coordinate paperwork so your lines stay reachable.',
      },
    ],
  },
  {
    category: 'Features & Functionality',
    items: [
      {
        q: 'Which dialer modes do you support?',
        a: 'Go Connectivo supports smart auto, predictive, power, and progressive dialing so agents stay productive and campaigns keep connecting.',
      },
      {
        q: 'Do you offer hosted PBX and call center tools?',
        a: 'Yes. Business Voice covers Business VoIP, hosted cloud PBX, SIP trunking, and Mobile VoIP. Contact Center adds call center software, IVR, queues, recording, and analytics.',
      },
      {
        q: 'What inbound and outbound voice services are available?',
        a: 'Inbound & Numbers includes inbound voice, toll-free origination, Local Numbers (DID Solutions), and virtual numbers. Outbound & Carrier Voice covers outbound voice, toll-free termination, wholesale voice termination, and VoIP Termination as a separate service.',
      },
      {
        q: 'Do you offer APIs or SMS?',
        a: 'Yes. API & Messaging includes Voice API / Programmable Voice for embedding calling in your apps, plus SMS/A2P Solutions for alerts, OTP, and two-way business messaging.',
      },
      {
        q: 'Is call recording available?',
        a: 'Yes, Call Recording is a dedicated Contact Center service, and recording can also be enabled on PBX seats where your plan and compliance needs allow.',
      },
    ],
  },
  {
    category: 'Pricing & Billing',
    items: [
      {
        q: 'Are there any setup fees?',
        a: 'Standard cloud telephony and dialer seats typically have no setup fees. Custom interconnect or enterprise cutovers are quoted transparently before work begins.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept major credit cards and ACH bank transfers. Larger wholesale and enterprise accounts can arrange monthly invoicing.',
      },
      {
        q: 'Is there a contract or commitment?',
        a: 'Many seats are month-to-month. Wholesale termination and enterprise packages may include volume commitments, we’ll outline terms clearly before you sign.',
      },
      {
        q: 'Do you offer a free trial?',
        a: 'We offer a 14-day evaluation for eligible dialer and PBX seats so your team can test call quality and workflows before committing.',
      },
    ],
  },
  {
    category: 'Technical Support',
    items: [
      {
        q: 'What internet speed do I need?',
        a: 'Plan roughly 100 kbps up and down per concurrent call, plus headroom for your office apps. Contact-center floors should use wired connections where possible.',
      },
      {
        q: 'What happens if my internet goes down?',
        a: 'We can configure failover forwarding, backup SIP paths, and overflow rules so inbound calls still reach a reachable destination when a site drops offline.',
      },
      {
        q: 'How do I get technical support?',
        a: '24/7 support is available by phone, email, and chat, with a knowledge base for self-serve guides on dialers, PBX, and trunks.',
      },
      {
        q: 'Do you offer training for my team?',
        a: 'Yes, onboarding covers agent consoles, supervisor tools, and campaign setup, plus documentation your ops leads can reuse for new hires.',
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
  'auto-dialer',
  'hosted-pbx',
  'call-center-software',
  'inbound-services',
  'outbound-services',
  'voip-termination',
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
  return category.serviceIds.map((id) => getServiceById(id)).filter(Boolean);
}

/** Services shown on /services catalog (excludes legacy hidden entries). */
export function getCatalogServices() {
  return services.filter((service) => !service.hiddenFromCatalog);
}
