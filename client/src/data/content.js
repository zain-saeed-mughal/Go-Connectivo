export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Contact', path: '/contact' },
];

export const contactInfo = {
  email: 'compliance@goconnectivo.com',
  address: '522 Glenwood Ave, Williamsport PA 17701, USA',
  support: '24/7 Customer Support',
  hours: 'Monday – Friday: 9:00 AM – 6:00 PM · Saturday: 9:00 AM – 2:00 PM',
};

export const heroContent = {
  eyebrow: 'Go Connectivo',
  titleStart: 'Transform Your Business',
  titleHighlight: 'Communication',
  description:
    'Cloud telephony, dialer platforms, and inbound/outbound voice built for call centers and growing teams. Crystal-clear quality, reliable termination, and tools that scale with your campaigns.',
  primaryCta: { label: 'Get Started Today', to: '/contact' },
  secondaryCta: { label: 'Contact Us', to: '/contact' },
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

/** High-level pillars shown in menus / overview (adapted for Go Connectivo). */
export const serviceCategories = [
  {
    id: 'cloud-telephony',
    title: 'Cloud Telephony',
    icon: 'Cloud',
    description: 'Hosted calling platforms and dialer engines that keep your floor productive.',
    serviceIds: [
      'auto-dialer',
      'predictive-dialer',
      'power-dialer',
      'progressive-dialer',
      'ai-dialer',
      'hosted-pbx',
      'ringless-voicemail',
      'click-to-call',
      'call-center-software',
      'virtual-contact-center',
    ],
  },
  {
    id: 'inbound',
    title: 'Inbound',
    icon: 'PhoneIncoming',
    description: 'Bring customer calls in cleanly with toll-free and local number presence.',
    serviceIds: ['inbound-services', 'toll-free-origination', 'did-services'],
  },
  {
    id: 'outbound',
    title: 'Outbound',
    icon: 'PhoneOutgoing',
    description: 'Reach more prospects with dependable termination built for volume.',
    serviceIds: ['outbound-services', 'toll-free-termination', 'wholesale-termination'],
  },
];

export const voipSolutions = [
  {
    id: 'cloud-telephony',
    title: 'Cloud Telephony',
    icon: 'Cloud',
    description:
      'Hosted PBX and dialer platforms designed for modern contact centers — no heavy hardware required.',
  },
  {
    id: 'inbound-voice',
    title: 'Inbound Voice',
    icon: 'PhoneIncoming',
    description:
      'Toll-free origination and DID services so customers reach you on numbers that match their market.',
  },
  {
    id: 'outbound-voice',
    title: 'Outbound Voice',
    icon: 'PhoneOutgoing',
    description:
      'Wholesale and toll-free termination with clear audio and routes tuned for campaign volume.',
  },
];

export const services = [
  {
    id: 'auto-dialer',
    title: 'Smart Auto Dialer',
    icon: 'PhoneCall',
    category: 'cloud-telephony',
    description:
      'Automate outbound lists with paced dialing, answer detection, and agent-ready handoff so your team spends time talking — not punching numbers.',
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
    icon: 'Grid3x3',
    category: 'cloud-telephony',
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
    category: 'cloud-telephony',
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
    icon: 'PhoneForwarded',
    category: 'cloud-telephony',
    description:
      'Progressive mode dials the next lead only when an agent is free — ideal when quality beats raw volume.',
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
    id: 'ai-dialer',
    title: 'AI Dialer Assist',
    icon: 'Brain',
    category: 'cloud-telephony',
    description:
      'Use intelligent screening and assistive prompts to prioritize live conversations and reduce wasted agent time.',
    capabilities: [
      'Smarter lead prioritization',
      'Conversation assists',
      'Voicemail / AMD filtering',
      'Quality scoring hooks',
      'Campaign insights',
    ],
    span: '',
  },
  {
    id: 'hosted-pbx',
    title: 'Hosted Cloud PBX',
    icon: 'Cloud',
    category: 'cloud-telephony',
    description:
      'A full cloud PBX for extensions, IVR, and office calling — managed in the browser and ready to grow with your seats.',
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
    id: 'ringless-voicemail',
    title: 'Ringless Voicemail',
    icon: 'Voicemail',
    category: 'cloud-telephony',
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
  },
  {
    id: 'click-to-call',
    title: 'Click-to-Call',
    icon: 'MousePointerClick',
    category: 'cloud-telephony',
    description:
      'Launch outbound calls from your CRM or web panel with one click — fewer misdials, faster follow-ups.',
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
    id: 'call-center-software',
    title: 'Call Center Software',
    icon: 'Headset',
    category: 'cloud-telephony',
    description:
      'Run inbound and outbound desks from one console — queues, agents, supervisors, and live wallboards included.',
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
    id: 'inbound-services',
    title: 'Inbound Voice',
    icon: 'PhoneIncoming',
    category: 'inbound',
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
    id: 'outbound-services',
    title: 'Outbound Voice',
    icon: 'PhoneOutgoing',
    category: 'outbound',
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
    id: 'virtual-contact-center',
    title: 'Virtual Contact Center',
    icon: 'Monitor',
    category: 'cloud-telephony',
    description:
      'Stand up a distributed contact center for remote or hybrid teams — same queues, same quality, any location.',
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
    id: 'toll-free-origination',
    title: 'Toll-Free Origination',
    icon: 'PhoneForwarded',
    category: 'inbound',
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
    title: 'DID Number Services',
    icon: 'MapPin',
    category: 'inbound',
    description:
      'Local DIDs for market presence — keep a regional identity while answering from a centralized ops floor.',
    capabilities: [
      'Local area codes',
      'Number porting support',
      'Forwarding & hunt groups',
      'Easy inventory management',
      'Multi-market coverage',
    ],
    span: '',
  },
  {
    id: 'toll-free-termination',
    title: 'Toll-Free Termination',
    icon: 'PhoneOutgoing',
    category: 'outbound',
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
    category: 'outbound',
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
];

export const companyStats = [
  { value: 5000, suffix: '+', label: 'Businesses Served' },
  { value: 99.9, suffix: '%', label: 'Uptime Guarantee' },
  { value: 24, suffix: '/7', label: 'Support Available' },
  { value: 60, suffix: '%', label: 'Average Cost Savings' },
];

export const aboutIntro = [
  'Go Connectivo helps contact centers, sales teams, and service desks run on dependable cloud telephony — from hosted PBX and dialer platforms to inbound DIDs and outbound termination.',
  'Our focus is practical voice infrastructure: clear audio, predictable rates, and tools that keep agents productive whether they sit on one floor or across many locations.',
];

export const coreValues = [
  {
    title: 'Reliability',
    description: '99.9% uptime mindset with redundant routes and monitored voice paths.',
  },
  {
    title: 'Innovation',
    description: 'Dialer modes, cloud PBX, and routing that keep pace with how modern floors operate.',
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
  'Hosted Cloud PBX',
  'Smart Auto Dialer',
  'Predictive Dialer',
  'Power Dialer',
  'Progressive Dialer',
  'AI Dialer Assist',
  'Click-to-Call',
  'Ringless Voicemail',
  'Call Center Software',
  'Inbound Voice',
  'Outbound Voice',
  'Toll-Free Origination',
  'DID Numbers',
  'Toll-Free Termination',
  'Wholesale Termination',
  'Virtual Contact Center',
  'SIP Trunking',
  'Call Recording',
  'IVR & Queues',
  'Number Porting',
];

export const whyUs = [
  {
    title: 'Lower Voice Costs',
    description: 'Competitive origination and termination pricing versus legacy carriers.',
  },
  {
    title: 'Faster Go-Live',
    description: 'Cloud PBX and dialer seats provisioned quickly with guided onboarding.',
  },
  {
    title: '24/7 Voice Support',
    description: 'Round-the-clock help for trunks, campaigns, and routing issues.',
  },
  {
    title: 'Contact-Center Ready',
    description: 'Queues, supervisors, and dialer modes built for real production floors.',
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Define Your Stack',
    description: 'Choose dialer modes, PBX seats, inbound numbers, and outbound capacity.',
  },
  {
    step: '02',
    title: 'Provision Access',
    description: 'We create accounts, trunks, and agent logins — no heavy hardware rollout.',
  },
  {
    step: '03',
    title: 'Port or Assign Numbers',
    description: 'Move existing DIDs / toll-free or assign new inventory for your markets.',
  },
  {
    step: '04',
    title: 'Configure & Launch',
    description: 'IVR, queues, campaigns, and caller ID are tuned — most teams go live in 24–48 hours.',
  },
  {
    step: '05',
    title: 'Optimize & Support',
    description: 'Ongoing monitoring, training, and rate guidance as your call volume grows.',
  },
];

export const technologies = [
  {
    group: 'Dialers',
    items: ['Smart auto dialer', 'Predictive mode', 'Power dialer', 'Progressive dialer', 'AI assist'],
  },
  {
    group: 'Cloud PBX',
    items: ['Extensions & IVR', 'Ring groups', 'Call recording', 'Voicemail-to-email', 'Softphones'],
  },
  {
    group: 'Inbound',
    items: ['Toll-free origination', 'Local DIDs', 'ACD queues', 'Time-based routing', 'Failover'],
  },
  {
    group: 'Outbound',
    items: ['Wholesale termination', 'Toll-free termination', 'Caller ID control', 'Campaign trunks', 'CDR reports'],
  },
  {
    group: 'Contact Center',
    items: ['Agent console', 'Supervisor tools', 'Live wallboards', 'Click-to-call', 'Virtual floors'],
  },
  {
    group: 'Support',
    items: ['24/7 NOC & helpdesk', 'Onboarding sessions', 'Knowledge base', 'Route optimization'],
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
      'We stood up a virtual contact center for remote agents in under a week. Inbound queues and hosted PBX just worked — support stayed with us through cutover.',
    name: 'Michael Chen',
    role: 'Operations Director, GlobalTech',
  },
  {
    quote:
      'Wholesale termination quality has been consistent and the rate deck is straightforward. We’ve cut voice spend while keeping campaign audio clear.',
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
        a: 'Tell us whether you need dialers, hosted PBX, inbound numbers, outbound termination — or a mix. We’ll scope seats and capacity, provision access, and most teams are live within 24–48 hours.',
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
        a: 'Go Connectivo supports smart auto, predictive, power, and progressive dialing, plus AI-assisted screening to help agents focus on live conversations.',
      },
      {
        q: 'Do you offer hosted PBX and call center tools?',
        a: 'Yes. Hosted cloud PBX covers extensions, IVR, and recording options. Our call center software adds queues, supervisor monitoring, and wallboards for inbound and outbound desks.',
      },
      {
        q: 'What inbound and outbound voice services are available?',
        a: 'Inbound includes toll-free origination and local DID services. Outbound covers toll-free termination and wholesale voice termination for high-volume platforms and partners.',
      },
      {
        q: 'Is call recording available?',
        a: 'Call recording can be enabled on PBX and contact-center seats where your plan and compliance needs allow. Recordings are stored securely with access controls for supervisors.',
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
        a: 'Many seats are month-to-month. Wholesale termination and enterprise packages may include volume commitments — we’ll outline terms clearly before you sign.',
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
        a: 'Yes — onboarding covers agent consoles, supervisor tools, and campaign setup, plus documentation your ops leads can reuse for new hires.',
      },
    ],
  },
];

export const faqs = faqCategories.flatMap((group) => group.items);

export const serviceOptions = services.map((service) => service.title);

/** Flagship cards for home + hover slider (subset of full catalog). */
export const featuredServiceIds = [
  'auto-dialer',
  'hosted-pbx',
  'call-center-software',
  'inbound-services',
  'outbound-services',
  'wholesale-termination',
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
