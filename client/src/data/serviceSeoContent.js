/**
 * Per-service SEO / long-form copy for Go Connectivo. Keys match service ids in content.js.
 */

export const SERVICE_SEO = {
  'auto-dialer': {
    metaTitle: 'Auto Dialer Software for Call Centers | Go Connectivo',
    metaDescription: 'Go Connectivo auto dialer paces outbound lists, detects live answers, and queues agents so sales floors dial less and talk more. Campaign reporting included.',
    overview: {
      heading: 'Auto dialer built for paced outbound campaigns',
      paragraphs: [
        'Go Connectivo’s smart auto dialer automates outbound so agents spend time on live conversations instead of punching numbers. Pace lists, detect answers, and hand off ready calls to your floor.',
        'Campaign controls, CRM dispositions, and reporting keep supervisors in control of volume, connect quality, and compliance-friendly pacing across US call-center teams.',
      ],
    },
    benefits: {
      heading: 'Why teams choose our auto dialer',
      items: [
        { title: 'List pacing controls', text: 'Tune dial speed to agent capacity so abandon risk stays manageable.' },
        { title: 'Live answer detection', text: 'Filter machine answers and connect agents to real people faster.' },
        { title: 'Agent connect queue', text: 'Ready calls land with available reps instead of ringing empty desks.' },
        { title: 'Campaign reporting', text: 'Track connects, talk time, and dispositions by list and campaign.' },
      ],
    },
    howItWorks: {
      heading: 'How the auto dialer works',
      steps: [
        { title: 'Load your lists', text: 'Import leads and map CRM fields for dialing and disposition sync.' },
        { title: 'Set pacing rules', text: 'Choose dial ratios, windows, and DNC safeguards for each campaign.' },
        { title: 'Agents go live', text: 'Answered calls route to free agents with scripts and wrap-up timers.' },
        { title: 'Review results', text: 'Use dashboards and exports to refine lists and coaching.' },
      ],
    },
    useCases: {
      heading: 'Common auto dialer use cases',
      items: ['Outbound sales floors needing higher talk time', 'Appointment-setting and lead-qualification teams', 'Collections and outreach with paced dialing', 'BPO campaigns with multi-client list control', 'Hybrid desks combining CRM click-to-call and auto dial'],
    },
    faqs: {
      heading: 'Auto dialer FAQs',
      items: [
        { q: 'How is an auto dialer different from predictive?', a: 'Auto dialing paces lists with simpler ratios; predictive adjusts dynamically to agent availability and abandon targets.' },
        { q: 'Can we sync dispositions to our CRM?', a: 'Yes. Campaign outcomes can push back to common CRM workflows so follow-ups stay accurate.' },
        { q: 'Does it work with our VoIP trunks?', a: 'The dialer is designed to run on Go Connectivo voice routes and SIP capacity used by call centers.' },
      ],
    },
    closing: {
      heading: 'Ready to automate outbound dialing?',
      paragraphs: ['Talk to Go Connectivo about auto dialer setup, pacing, and carrier voice so your agents connect more and dial less.'],
    },
  },

  'predictive-dialer': {
    metaTitle: 'Predictive Dialer Software | Go Connectivo',
    metaDescription: 'Boost connects per hour with Go Connectivo predictive dialer, adaptive ratios, abandon safeguards, skill routing, and live dashboards for US call centers.',
    overview: {
      heading: 'Predictive dialer for high-connect outbound floors',
      paragraphs: [
        'Go Connectivo predictive dialer uses adaptive algorithms to balance dial volume against agent availability, raising connects per hour while watching abandon risk.',
        'Skill-based routing, real-time dashboards, and compliance-friendly pacing help supervisors run aggressive campaigns without losing control of quality.',
      ],
    },
    benefits: {
      heading: 'Predictive dialer advantages',
      items: [
        { title: 'Adaptive dial ratios', text: 'Algorithms adjust pacing as agent free time and answer rates change.' },
        { title: 'Abandon-rate safeguards', text: 'Guardrails help keep campaigns within policy-friendly abandon bands.' },
        { title: 'Skill-based routing', text: 'Matched agents take the right conversations for higher conversion.' },
        { title: 'Real-time dashboards', text: 'Watch occupancy, wait, and campaign KPIs as the floor runs.' },
      ],
    },
    howItWorks: {
      heading: 'How predictive dialing works',
      steps: [
        { title: 'Configure campaigns', text: 'Define lists, skills, windows, and abandon targets before go-live.' },
        { title: 'Algorithm paces dials', text: 'The dialer forecasts agent availability and places calls ahead of idle time.' },
        { title: 'Agents receive connects', text: 'Live answers route to ready agents with context and scripts.' },
        { title: 'Ops tune in real time', text: 'Supervisors adjust ratios and queues from live wallboards.' },
      ],
    },
    useCases: {
      heading: 'Where predictive dialers excel',
      items: ['High-volume sales and lead conversion floors', 'Insurance and financial outreach campaigns', 'BPO multi-client predictive programs', 'Renewals and win-back calling at scale', 'Teams graduating from power dial to predictive'],
    },
    faqs: {
      heading: 'Predictive dialer FAQs',
      items: [
        { q: 'Will predictive increase abandon rates?', a: 'Properly tuned ratios and safeguards keep abandon within your policy bands while lifting talk time.' },
        { q: 'Can we mix predictive and progressive modes?', a: 'Many floors run progressive for sensitive lists and predictive for high-volume campaigns on the same stack.' },
        { q: 'Do you support skill queues?', a: 'Yes. Skill-based routing pairs answered calls with agents trained for that offer or client.' },
      ],
    },
    closing: {
      heading: 'Scale connects with predictive dialing',
      paragraphs: ['Ask Go Connectivo how predictive dialer, SIP capacity, and termination routes work together for sustained outbound performance.'],
    },
  },

  'power-dialer': {
    metaTitle: 'Power Dialer for Sales Teams | Go Connectivo',
    metaDescription: 'One-to-one power dialer from Go Connectivo, click-next dialing, local presence, scripting hooks, and supervisor listen for high-touch sales floors.',
    overview: {
      heading: 'Power dialer for controlled, high-touch outbound',
      paragraphs: [
        'Go Connectivo power dialer keeps one-to-one control while cutting dead time between calls. Agents click next, hear the ring, and stay focused on conversation quality.',
        'Local presence, scripting hooks, wrap-up timers, and supervisor listen/whisper support coaching without slowing dials, ideal when predictive is too aggressive.',
      ],
    },
    benefits: {
      heading: 'Power dialer benefits',
      items: [
        { title: 'Click-next dialing', text: 'Agents move through lists without retyping numbers or hunting CRM screens.' },
        { title: 'Local presence options', text: 'Present familiar area codes to improve answer rates in target markets.' },
        { title: 'Call scripting hooks', text: 'Surface talk tracks and prompts at the moment the call connects.' },
        { title: 'Supervisor coaching', text: 'Listen and whisper tools help leads coach without interrupting flow.' },
      ],
    },
    howItWorks: {
      heading: 'Power dial workflow',
      steps: [
        { title: 'Queue the list', text: 'Assign prioritized leads to agents or teams from the dialer console.' },
        { title: 'Agent dials next', text: 'One click places the call with controlled caller ID.' },
        { title: 'Talk and wrap', text: 'Scripts and wrap-up timers keep dispositions clean between dials.' },
        { title: 'Coach and improve', text: 'Supervisors review live calls and outcomes to refine pitches.' },
      ],
    },
    useCases: {
      heading: 'Power dialer use cases',
      items: ['Enterprise SDR and AE outbound teams', 'High-value B2B prospecting', 'Renewals where every conversation counts', 'Hybrid floors mixing power and progressive modes', 'Training floors that need supervisor whisper'],
    },
    faqs: {
      heading: 'Power dialer FAQs',
      items: [
        { q: 'Is power dialing one call per agent?', a: 'Yes. Power mode keeps a one-to-one relationship so agents control pace and conversation quality.' },
        { q: 'Can we use local presence?', a: 'Local presence options help present market-matched caller ID where available.' },
        { q: 'Does it integrate with CRM?', a: 'Click-next dialing and disposition sync are designed around common CRM-driven sales workflows.' },
      ],
    },
    closing: {
      heading: 'Give reps a faster dial without losing control',
      paragraphs: ['Contact Go Connectivo to deploy power dialer on reliable VoIP routes built for sales floors.'],
    },
  },

  'progressive-dialer': {
    metaTitle: 'Progressive Dialer Solutions | Go Connectivo',
    metaDescription: 'Progressive dialer from Go Connectivo dials only when agents are free, preview, priority queues, DNC enforcement, and detailed outcomes for quality-first floors.',
    overview: {
      heading: 'Progressive dialer when quality beats raw volume',
      paragraphs: [
        'Go Connectivo progressive dialer places the next call only when an agent is free, so every connect gets full attention. Preview before connect keeps context sharp.',
        'Priority queues, DNC enforcement, and detailed outcomes help regulated or high-touch programs stay compliant and measurable.',
      ],
    },
    benefits: {
      heading: 'Progressive dialer strengths',
      items: [
        { title: 'Agent-ready dialing', text: 'No orphaned connects, dials fire only when a rep can take the call.' },
        { title: 'Preview before connect', text: 'Agents review lead context before the customer answers.' },
        { title: 'Priority queues', text: 'Hot leads and VIP lists jump ahead of cold volume.' },
        { title: 'DNC enforcement', text: 'Do-not-call lists stay enforced across progressive campaigns.' },
      ],
    },
    howItWorks: {
      heading: 'Progressive dial steps',
      steps: [
        { title: 'Build priority lists', text: 'Segment and rank leads for progressive campaigns.' },
        { title: 'Agent becomes available', text: 'System waits for wrap-up and ready status before dialing.' },
        { title: 'Preview then connect', text: 'Rep reviews the record; the dialer places the call.' },
        { title: 'Capture outcomes', text: 'Detailed dispositions feed coaching and follow-up workflows.' },
      ],
    },
    useCases: {
      heading: 'Progressive dialer scenarios',
      items: ['Healthcare and regulated outreach', 'VIP customer retention calling', 'Complex product sales needing prep time', 'Training cohorts moving off manual dial', 'Mixed campaigns alongside predictive modes'],
    },
    faqs: {
      heading: 'Progressive dialer FAQs',
      items: [
        { q: 'How does progressive differ from power dial?', a: 'Progressive can automate the next dial as soon as an agent is free; power often emphasizes agent-initiated click-next control.' },
        { q: 'Can we enforce DNC lists?', a: 'Yes. Progressive campaigns support DNC enforcement before dials are placed.' },
        { q: 'Is preview mode available?', a: 'Preview before connect lets agents read context prior to the customer answer.' },
      ],
    },
    closing: {
      heading: 'Dial with intention, not noise',
      paragraphs: ['Partner with Go Connectivo for progressive dialer, voice quality, and reporting that protect brand experience on every connect.'],
    },
  },

  'business-voip': {
    metaTitle: 'Business VoIP Phone Systems | Go Connectivo',
    metaDescription: 'Enterprise-ready business VoIP from Go Connectivo, HD voice, multi-device softphones, flexible seats, and numbers that travel with your US team.',
    overview: {
      heading: 'Business VoIP for clear, flexible team calling',
      paragraphs: [
        'Go Connectivo business VoIP replaces brittle desk-phone islands with cloud calling: HD audio, business caller ID, and seats that scale as you hire.',
        'Desktop and mobile softphones keep the same number with hybrid staff. Pair with SIP trunks, dialers, or contact-center tools when you grow.',
      ],
    },
    benefits: {
      heading: 'Business VoIP benefits',
      items: [
        { title: 'HD voice quality', text: 'Carrier-minded routes deliver clear audio for customer-facing teams.' },
        { title: 'Business caller ID', text: 'Present a professional identity on outbound and inbound calls.' },
        { title: 'Multi-device softphones', text: 'Answer from desk, laptop, or phone without missing the ring.' },
        { title: 'Seat-based scaling', text: 'Add or remove seats as headcount and campaigns change.' },
      ],
    },
    howItWorks: {
      heading: 'Getting on business VoIP',
      steps: [
        { title: 'Choose numbers and seats', text: 'Provision DIDs or port existing business numbers.' },
        { title: 'Configure users', text: 'Assign extensions, caller ID, and device preferences.' },
        { title: 'Connect apps or phones', text: 'Roll out softphones and optional desk sets.' },
        { title: 'Monitor and expand', text: 'Add trunks, IVR, or dialers when volume grows.' },
      ],
    },
    useCases: {
      heading: 'Business VoIP use cases',
      items: ['Growing offices leaving legacy PRI', 'Hybrid teams needing one business number', 'Branch locations on a shared voice plan', 'Sales pods needing clear outbound audio', 'Companies preparing for hosted PBX features'],
    },
    faqs: {
      heading: 'Business VoIP FAQs',
      items: [
        { q: 'Can we keep our existing numbers?', a: 'Number porting and DID provisioning are available so customers keep familiar contact points.' },
        { q: 'Is mobile included?', a: 'Desktop and mobile apps support the same business identity for on-the-go staff.' },
        { q: 'How does this differ from hosted PBX?', a: 'Business VoIP covers core calling; hosted PBX adds richer extensions, IVR, and office features.' },
      ],
    },
    closing: {
      heading: 'Modernize office voice with Go Connectivo',
      paragraphs: ['Get a quote for business VoIP seats, numbers, and optional SIP capacity tailored to your US footprint.'],
    },
  },

  'hosted-pbx': {
    metaTitle: 'Cloud PBX | Go Connectivo',
    metaDescription: 'Hosted cloud PBX from Go Connectivo, extensions, IVR, ring groups, recording options, and softphones managed in the browser for growing offices.',
    overview: {
      heading: 'Hosted cloud PBX without on-site hardware',
      paragraphs: [
        'Go Connectivo hosted PBX delivers extensions, auto-attendant, and office calling from the cloud. Manage features in the browser and grow seats without a phone closet.',
        'Ring groups, voicemail-to-email, recording options, and softphone or desk-phone support cover everyday business voice needs.',
      ],
    },
    benefits: {
      heading: 'Hosted PBX benefits',
      items: [
        { title: 'Extensions & ring groups', text: 'Route by team or department without physical cross-connects.' },
        { title: 'Auto-attendant / IVR', text: 'Greet and route callers professionally after hours and peak times.' },
        { title: 'Call recording options', text: 'Enable recording where training or compliance requires it.' },
        { title: 'Voicemail-to-email', text: 'Capture messages where staff already work, the inbox.' },
      ],
    },
    howItWorks: {
      heading: 'Hosted PBX rollout',
      steps: [
        { title: 'Design the dial plan', text: 'Map extensions, menus, and ring groups to your org.' },
        { title: 'Port or provision numbers', text: 'Bring main lines and DIDs onto the cloud PBX.' },
        { title: 'Deploy endpoints', text: 'Register softphones and compatible desk phones.' },
        { title: 'Train and go live', text: 'Admins manage users and features from the portal.' },
      ],
    },
    useCases: {
      heading: 'Hosted PBX use cases',
      items: ['Multi-location offices on one dial plan', 'Companies retiring aging on-prem PBX', 'Teams needing IVR without a contact-center suite', 'Remote staff on softphones with shared extensions', 'Businesses preparing to add queues later'],
    },
    faqs: {
      heading: 'Hosted PBX FAQs',
      items: [
        { q: 'Do we need on-site hardware?', a: 'Core PBX logic runs in the cloud; you mainly need endpoints and reliable internet.' },
        { q: 'Can we keep desk phones?', a: 'Softphone and compatible desk-phone support are both available.' },
        { q: 'Is IVR included?', a: 'Auto-attendant and IVR menus are part of the hosted PBX feature set.' },
      ],
    },
    closing: {
      heading: 'Move the PBX to the cloud',
      paragraphs: ['Speak with Go Connectivo about hosted PBX, number porting, and voice quality for your offices.'],
    },
  },

  'sip-trunking': {
    metaTitle: 'SIP Trunking Services | Go Connectivo',
    metaDescription: 'Elastic SIP trunking from Go Connectivo, replace PRI with concurrent channels, failover trunks, codec flexibility, and transparent rate decks for PBX platforms.',
    overview: {
      heading: 'SIP trunking that scales with concurrent demand',
      paragraphs: [
        'Go Connectivo SIP trunking replaces PRI and legacy trunks with elastic concurrent channels. Connect your PBX or platform to carrier-grade voice routes.',
        'BYO or hosted PBX interconnect, failover trunks, and transparent rate decks help call centers and multi-site businesses forecast spend.',
      ],
    },
    benefits: {
      heading: 'SIP trunking benefits',
      items: [
        { title: 'Elastic channels', text: 'Scale concurrent calls up or down without truck rolls.' },
        { title: 'PBX interconnect', text: 'Bring your own PBX or pair with our hosted voice stack.' },
        { title: 'Failover trunks', text: 'Secondary paths protect uptime when a primary route fails.' },
        { title: 'Transparent rates', text: 'Clear decks support budgeting for inbound and outbound minutes.' },
      ],
    },
    howItWorks: {
      heading: 'SIP trunk onboarding',
      steps: [
        { title: 'Size capacity', text: 'Estimate peak concurrent channels and codec needs.' },
        { title: 'Interconnect', text: 'Register SIP endpoints or SBCs to Go Connectivo trunks.' },
        { title: 'Test & failover', text: 'Validate audio, CLI, and backup routes before cutover.' },
        { title: 'Go live & monitor', text: 'Watch quality and usage; expand channels as campaigns grow.' },
      ],
    },
    useCases: {
      heading: 'SIP trunking use cases',
      items: ['Call centers needing burst concurrent capacity', 'Enterprises retiring PRI circuits', 'Hosted PBX platforms aggregating customer trunks', 'Multi-site companies consolidating carriers', 'Dialer platforms requiring stable SIP interconnect'],
    },
    faqs: {
      heading: 'SIP trunking FAQs',
      items: [
        { q: 'Can we keep our existing PBX?', a: 'Yes. SIP trunks interconnect to compatible BYO PBX and platform setups.' },
        { q: 'How fast can we add channels?', a: 'Elastic capacity is designed so concurrent channels can grow with campaign demand.' },
        { q: 'Do you support failover?', a: 'Failover trunks help maintain service if a primary path is impaired.' },
      ],
    },
    closing: {
      heading: 'Replace PRI with elastic SIP',
      paragraphs: ['Request a SIP trunking proposal from Go Connectivo with capacity guidance and rate transparency.'],
    },
  },

  'mobile-voip': {
    metaTitle: 'Mobile VoIP App for Business | Go Connectivo',
    metaDescription: 'Mobile VoIP from Go Connectivo, make and receive business calls on your smartphone with business caller ID, transfer, voicemail, and WiFi calling.',
    overview: {
      heading: 'Business calls from your smartphone',
      paragraphs: [
        'Go Connectivo mobile VoIP keeps field reps and hybrid staff on the company number without exposing personal lines.',
        'Transfer, voicemail, call flip, and WiFi calling support real workdays away from the desk. Pair with hosted PBX or business VoIP seats.',
      ],
    },
    benefits: {
      heading: 'Mobile VoIP benefits',
      items: [
        { title: 'Business caller ID', text: 'Outbound shows the company identity customers already trust.' },
        { title: 'Call transfer', text: 'Hand off to desk colleagues without dropping the customer.' },
        { title: 'Voicemail access', text: 'Check business voicemail from the mobile app.' },
        { title: 'WiFi calling', text: 'Stay reachable on WiFi when cellular coverage is weak.' },
      ],
    },
    howItWorks: {
      heading: 'Mobile VoIP setup',
      steps: [
        { title: 'Assign a business number', text: 'Link the user’s DID or extension to mobile softphone access.' },
        { title: 'Install the app', text: 'Staff sign in on iOS or Android with secure credentials.' },
        { title: 'Configure features', text: 'Enable transfer, flip, and voicemail preferences.' },
        { title: 'Use anywhere', text: 'Place and answer business calls from the field or home office.' },
      ],
    },
    useCases: {
      heading: 'Mobile VoIP use cases',
      items: ['Field sales and account managers', 'Hybrid employees without desk phones', 'After-hours on-call rotations', 'Branch managers covering multiple sites', 'Executives needing one business identity'],
    },
    faqs: {
      heading: 'Mobile VoIP FAQs',
      items: [
        { q: 'Will customers see my personal number?', a: 'Calls use business caller ID so personal lines stay private.' },
        { q: 'Does it work on WiFi?', a: 'WiFi calling helps when you are indoors or on travel networks.' },
        { q: 'Can I flip calls to my desk?', a: 'Call flip supports moving active conversations between devices.' },
      ],
    },
    closing: {
      heading: 'Take business voice mobile',
      paragraphs: ['Ask Go Connectivo about mobile VoIP seats tied to your hosted PBX or business VoIP plan.'],
    },
  },

  'click-to-call': {
    metaTitle: 'Click-to-Call for CRM & Web | Go Connectivo',
    metaDescription: 'Click-to-call from Go Connectivo launches outbound VoIP calls from CRM or browser, fewer misdials, caller ID control, notes capture, and agent activity logs.',
    overview: {
      heading: 'One-click outbound from CRM and web panels',
      paragraphs: [
        'Go Connectivo click-to-call lets agents launch outbound VoIP from CRM records or browser panels, fewer misdials, faster follow-ups, cleaner notes.',
        'Caller ID control, webhook hooks, and activity logs give ops visibility. Use alone or alongside power and auto dialers.',
      ],
    },
    benefits: {
      heading: 'Click-to-call benefits',
      items: [
        { title: 'Browser / CRM launch', text: 'Start calls from the screen where lead context already lives.' },
        { title: 'Caller ID control', text: 'Choose presentation numbers that match campaign or market.' },
        { title: 'Call notes capture', text: 'Keep conversation notes tied to the dial event.' },
        { title: 'Webhook & API hooks', text: 'Notify your systems when calls start, end, or disposition.' },
      ],
    },
    howItWorks: {
      heading: 'Click-to-call flow',
      steps: [
        { title: 'Connect CRM or panel', text: 'Enable click-to-call on supported web or CRM surfaces.' },
        { title: 'Agent clicks the number', text: 'The platform places the VoIP call with selected caller ID.' },
        { title: 'Conversation & notes', text: 'Capture outcomes without leaving the workspace.' },
        { title: 'Log & automate', text: 'Activity logs and webhooks feed reporting and follow-up jobs.' },
      ],
    },
    useCases: {
      heading: 'Click-to-call use cases',
      items: ['CRM-driven SDR follow-ups', 'Support callbacks from ticket systems', 'Account management outreach', 'Inside sales with low misdial tolerance', 'Web panels for distributed agent teams'],
    },
    faqs: {
      heading: 'Click-to-call FAQs',
      items: [
        { q: 'Does click-to-call require a dialer campaign?', a: 'No. It can run as standalone CRM/web launch or alongside dialer modes.' },
        { q: 'Can we control caller ID?', a: 'Yes. Presentation numbers can be selected per call or campaign policy.' },
        { q: 'Are there API hooks?', a: 'Webhook and API hooks support custom automation around call events.' },
      ],
    },
    closing: {
      heading: 'Dial from the record, not the keypad',
      paragraphs: ['Contact Go Connectivo to enable click-to-call on your CRM and VoIP seats.'],
    },
  },

  'inbound-services': {
    metaTitle: 'Inbound Voice Services | Go Connectivo',
    metaDescription: 'Inbound voice from Go Connectivo, IVR, skill queues, time-based routing, overflow, recording, and missed-call recovery for US customer lines.',
    overview: {
      heading: 'Inbound voice that finds the right desk',
      paragraphs: [
        'Go Connectivo inbound services route customer calls with intelligent queues, time-of-day rules, and failover so inquiries reach the right desk.',
        'IVR, skill queues, recording, and missed-call recovery protect answer rates during peaks and after hours.',
      ],
    },
    benefits: {
      heading: 'Inbound service benefits',
      items: [
        { title: 'IVR & skill queues', text: 'Guide callers and land them with trained agents.' },
        { title: 'Time-based routing', text: 'Different paths for business hours, holidays, and nights.' },
        { title: 'Overflow & failover', text: 'Keep answering when primary queues are saturated.' },
        { title: 'Missed-call recovery', text: 'Reduce lost opportunities when agents cannot pick up.' },
      ],
    },
    howItWorks: {
      heading: 'Inbound routing setup',
      steps: [
        { title: 'Provision inbound numbers', text: 'Add local, toll-free, or virtual numbers for campaigns.' },
        { title: 'Build IVR and queues', text: 'Define menus, skills, and schedules.' },
        { title: 'Connect agents or PBX', text: 'Land calls on softphones, desks, or hosted PBX.' },
        { title: 'Monitor & refine', text: 'Use recording and reports to tighten wait times.' },
      ],
    },
    useCases: {
      heading: 'Inbound voice use cases',
      items: ['Customer support hotlines', 'Order and appointment desks', 'Multi-department company main lines', 'Overflow for peak marketing responses', 'After-hours messaging with daytime queues'],
    },
    faqs: {
      heading: 'Inbound services FAQs',
      items: [
        { q: 'Can we mix local and toll-free inbound?', a: 'Yes. Local DIDs and toll-free origination can share routing logic.' },
        { q: 'Do you support overflow?', a: 'Overflow and failover paths help when primary queues are full.' },
        { q: 'Is recording available?', a: 'Call recording options support training and quality programs.' },
      ],
    },
    closing: {
      heading: 'Make every inbound call countable',
      paragraphs: ['Work with Go Connectivo to design inbound voice routing, numbers, and agent delivery for your US lines.'],
    },
  },

  'toll-free-origination': {
    metaTitle: 'Toll-Free Origination (8xx) | Go Connectivo',
    metaDescription: 'Toll-free origination from Go Connectivo, 800/888/877 numbers that land on IVR, agents, or cloud PBX with provisioning, routing, and usage reporting.',
    overview: {
      heading: 'Toll-free numbers that land where you work',
      paragraphs: [
        'Go Connectivo toll-free origination gives customers a free way in with 8xx numbers that terminate to your IVR, agents, or cloud PBX.',
        'Provision 800, 888, 877 and more, route to dialer or PBX, and track usage. Vanity options available where inventory allows.',
      ],
    },
    benefits: {
      heading: 'Toll-free origination benefits',
      items: [
        { title: 'Wide 8xx coverage', text: 'Access common toll-free prefixes for national reach.' },
        { title: 'Flexible routing', text: 'Send calls to PBX, dialer, or agent queues.' },
        { title: 'Usage reporting', text: 'See inbound volume and patterns for staffing.' },
        { title: 'Vanity options', text: 'Pursue memorable numbers when inventory permits.' },
      ],
    },
    howItWorks: {
      heading: 'Toll-free origination steps',
      steps: [
        { title: 'Select or port 8xx', text: 'Provision new toll-free or port existing numbers.' },
        { title: 'Point routing', text: 'Aim calls at IVR, SIP, or agent destinations.' },
        { title: 'Test audio & CLI', text: 'Validate quality before marketing the number.' },
        { title: 'Launch & report', text: 'Publish the number and monitor usage dashboards.' },
      ],
    },
    useCases: {
      heading: 'Toll-free origination use cases',
      items: ['National customer service lines', 'Catalog and e-commerce order desks', 'Insurance claims and intake', 'Franchise shared support numbers', 'Campaign response lines in ads'],
    },
    faqs: {
      heading: 'Toll-free origination FAQs',
      items: [
        { q: 'Can we port our existing 800 number?', a: 'Porting existing toll-free numbers is a common onboarding path.' },
        { q: 'Where do toll-free calls land?', a: 'Route to IVR, cloud PBX, dialer, or agent platforms as designed.' },
        { q: 'Do you offer vanity numbers?', a: 'Vanity options are available subject to inventory.' },
      ],
    },
    closing: {
      heading: 'Give customers a free way to reach you',
      paragraphs: ['Ask Go Connectivo for toll-free origination, routing design, and inbound reporting.'],
    },
  },

  'did-services': {
    metaTitle: 'DID & Virtual Numbers | Go Connectivo',
    metaDescription:
      'DID and virtual numbers from Go Connectivo, local area codes, number portability, virtual presence, and forwarding for multi-market teams.',
    overview: {
      heading: 'Local and virtual number presence',
      paragraphs: [
        'Go Connectivo DID & Virtual Numbers put local and virtual inventory in the markets you serve while keeping routing centralized.',
        'Area-code inventory, portability, virtual presence, and forwarding support sales, support, and multi-location brands.',
      ],
    },
    benefits: {
      heading: 'DID service benefits',
      items: [
        { title: 'Local area codes', text: 'Match caller expectations in each metro you target.' },
        { title: 'Number portability', text: 'Bring valued local numbers when you change providers.' },
        { title: 'Virtual presence', text: 'Appear local without opening a physical office.' },
        { title: 'Call forwarding', text: 'Land DIDs on central queues, SIP, or mobile users.' },
      ],
    },
    howItWorks: {
      heading: 'DID provisioning flow',
      steps: [
        { title: 'Pick markets', text: 'Choose area codes that match your campaigns or branches.' },
        { title: 'Provision or port', text: 'Activate new DIDs or port existing local numbers.' },
        { title: 'Set destinations', text: 'Forward to PBX, agents, or hunt groups.' },
        { title: 'Track & expand', text: 'Add markets as campaigns roll out.' },
      ],
    },
    useCases: {
      heading: 'DID use cases',
      items: ['Local presence dialing for outbound teams', 'Regional support lines', 'Franchise location numbers', 'Market-specific ad tracking numbers', 'Centralized ops with local brand identity'],
    },
    faqs: {
      heading: 'DID services FAQs',
      items: [
        { q: 'Can DIDs forward to our cloud PBX?', a: 'Yes. DIDs commonly terminate to SIP, PBX, or agent platforms.' },
        { q: 'Do you support number porting?', a: 'Portability helps you keep established local numbers during migration.' },
        { q: 'How fast can we add area codes?', a: 'Inventory-dependent provisioning is designed for campaign rollouts across markets.' },
      ],
    },
    closing: {
      heading: 'Look local, operate centrally',
      paragraphs: ['Talk to Go Connectivo about DID inventory, porting, and inbound delivery for your markets.'],
    },
  },

  'virtual-numbers': {
    metaTitle: 'Virtual Phone Numbers | Go Connectivo',
    metaDescription: 'Virtual numbers from Go Connectivo, instant inventory, forward to SIP or PSTN, campaign pools, easy activate/release, and CDR visibility for marketers.',
    overview: {
      heading: 'Virtual numbers for campaigns and departments',
      paragraphs: [
        'Go Connectivo virtual numbers ring to your PBX, apps, or agents, ideal for campaigns, departments, and multi-market presence without hardware.',
        'Instant inventory, SIP/PSTN forwarding, campaign pools, and CDR visibility keep number ops agile and attributable.',
      ],
    },
    benefits: {
      heading: 'Virtual number benefits',
      items: [
        { title: 'Instant inventory', text: 'Spin up numbers quickly for new campaigns.' },
        { title: 'Flexible forwarding', text: 'Send rings to SIP endpoints or PSTN destinations.' },
        { title: 'Campaign pools', text: 'Isolate tracking numbers per offer or channel.' },
        { title: 'Easy lifecycle', text: 'Activate and release numbers as campaigns start and stop.' },
      ],
    },
    howItWorks: {
      heading: 'Using virtual numbers',
      steps: [
        { title: 'Select numbers', text: 'Choose from available inventory for target regions.' },
        { title: 'Map destinations', text: 'Point each number to SIP, PBX, or agent queues.' },
        { title: 'Publish in campaigns', text: 'Place numbers in ads, sites, and print.' },
        { title: 'Measure CDRs', text: 'Review usage and release idle numbers.' },
      ],
    },
    useCases: {
      heading: 'Virtual number use cases',
      items: ['Paid media response tracking', 'Departmental lines without desk hardware', 'Temporary event and promo hotlines', 'Multi-brand companies on one platform', 'Test markets before permanent DID commits'],
    },
    faqs: {
      heading: 'Virtual numbers FAQs',
      items: [
        { q: 'How are virtual numbers different from DIDs?', a: 'They are often used for flexible campaign and department routing with fast activate/release lifecycles.' },
        { q: 'Can we forward to SIP?', a: 'Yes. Forwarding to SIP or PSTN destinations is supported.' },
        { q: 'Do we get CDR visibility?', a: 'Usage and CDR views help attribute inbound activity.' },
      ],
    },
    closing: {
      heading: 'Provision numbers as fast as campaigns',
      paragraphs: ['Reach Go Connectivo for virtual number pools tied to your inbound and SIP stack.'],
    },
  },

  'outbound-services': {
    metaTitle: 'Outbound Voice for Dialer Campaigns | Go Connectivo',
    metaDescription:
      'Campaign outbound voice from Go Connectivo for dialer floors: SIP campaign trunks, caller ID control, concurrent scaling, and quality monitoring, distinct from wholesale or toll-free termination.',
    overview: {
      heading: 'Outbound voice for dialer-led campaigns',
      paragraphs: [
        'Outbound Services is for contact-center and sales floors that need campaign-ready voice trunks behind auto, predictive, power, or progressive dialers.',
        'This page is about agent-facing outbound capacity and CLI control. If you need carrier wholesale minutes, 8xx termination only, or general VoIP termination for mixed apps, use those dedicated pages instead.',
      ],
    },
    benefits: {
      heading: 'Outbound campaign benefits',
      items: [
        { title: 'Campaign trunks', text: 'Capacity patterns sized for dialer concurrent call plans.' },
        { title: 'Caller ID management', text: 'Presentation controls for brand and local presence strategies.' },
        { title: 'Dialer interconnect', text: 'SIP handoff designed for call-center dialer platforms.' },
        { title: 'Quality monitoring', text: 'Watch audio and answer performance during peak dialing windows.' },
      ],
    },
    howItWorks: {
      heading: 'Outbound voice onboarding',
      steps: [
        { title: 'Profile traffic', text: 'Share dialer volume, destinations, and CLI needs.' },
        { title: 'Provision trunks', text: 'Stand up SIP capacity sized for peak concurrent calls.' },
        { title: 'Integrate dialer', text: 'Connect auto, predictive, or power dialer platforms.' },
        { title: 'Optimize routes', text: 'Tune quality using live campaign analytics.' },
      ],
    },
    useCases: {
      heading: 'Outbound service use cases',
      items: [
        'Sales dialer campaigns',
        'Appointment-setting programs',
        'Survey and research calling',
        'Collections outreach',
        'Multi-client BPO outbound floors',
      ],
    },
    faqs: {
      heading: 'Outbound services FAQs',
      items: [
        {
          q: 'How is this different from VoIP termination?',
          a: 'Outbound Services focuses on dialer campaign trunks and CLI. VoIP Termination is the broader termination product for domestic/international call completion across apps and seats.',
        },
        {
          q: 'When should I choose wholesale instead?',
          a: 'Choose Wholesale Termination when you are a platform or reseller buying minutes at partner scale, not a single dialer floor.',
        },
        {
          q: 'Will this work with our dialer?',
          a: 'Outbound trunks are designed for call-center dialer interconnect over SIP.',
        },
      ],
    },
    related: [
      { label: 'VoIP termination', to: '/services/voip-termination' },
      { label: 'Wholesale termination', to: '/services/wholesale-termination' },
      { label: 'Smart auto dialer', to: '/services/auto-dialer' },
      { label: 'Robocall mitigation', to: '/compliance/KYC-RMD' },
    ],
    closing: {
      heading: 'Fuel dialers with campaign outbound voice',
      paragraphs: [
        'Request outbound campaign trunk capacity from Go Connectivo, or compare wholesale and VoIP termination if your buying model is different.',
      ],
    },
  },

  'toll-free-termination': {
    metaTitle: 'Toll-Free (8xx) Termination | Go Connectivo',
    metaDescription:
      'Terminate outbound calls to toll-free 8xx destinations with Go Connectivo: TF-focused routes, rate decks, failover carriers, and CDRs, distinct from dialer trunks or wholesale minutes.',
    overview: {
      heading: 'Toll-free termination for 8xx destinations',
      paragraphs: [
        'Toll-Free Termination completes outbound traffic to 8xx numbers. Use it when your mix is toll-free heavy and you need TF-focused routing and rating.',
        'It is not a substitute for Wholesale Termination (partner-scale minutes) or Outbound Services (dialer campaign trunks).',
      ],
    },
    benefits: {
      heading: 'Toll-free termination benefits',
      items: [
        { title: '8xx-focused routes', text: 'Paths built for toll-free destination completion.' },
        { title: 'Transparent TF rates', text: 'Price decks scoped to toll-free termination usage.' },
        { title: 'Failover carriers', text: 'Secondary paths reduce single-route risk on TF traffic.' },
        { title: 'CDR access', text: 'Reconcile usage and investigate anomalies quickly.' },
      ],
    },
    howItWorks: {
      heading: 'Toll-free termination setup',
      steps: [
        { title: 'Share TF profile', text: 'Outline volumes and destination mix for 8xx termination.' },
        { title: 'Enable routes', text: 'Activate toll-free termination with agreed rates.' },
        { title: 'Test quality', text: 'Validate audio and completion before full cutover.' },
        { title: 'Operate with CDRs', text: 'Use reporting and monitoring for ongoing control.' },
      ],
    },
    useCases: {
      heading: 'Toll-free termination use cases',
      items: [
        'Customer-care callbacks to 8xx lines',
        'Platforms terminating TF-heavy traffic',
        'Overflow TF routes beside primary carriers',
        'Campaigns that must reach toll-free endpoints',
      ],
    },
    faqs: {
      heading: 'Toll-free termination FAQs',
      items: [
        {
          q: 'Is this the same as outbound dialer voice?',
          a: 'No. Outbound Services covers dialer campaign trunks. Toll-free Termination completes calls to 8xx destinations.',
        },
        {
          q: 'Do you also sell wholesale minutes?',
          a: 'Wholesale Termination is a separate product for partner-scale domestic/international minute buying.',
        },
        { q: 'Can we see CDRs?', a: 'CDR access is part of operating toll-free termination with Go Connectivo.' },
      ],
    },
    related: [
      { label: 'Outbound voice (dialers)', to: '/services/outbound-services' },
      { label: 'VoIP termination', to: '/services/voip-termination' },
      { label: 'Wholesale termination', to: '/services/wholesale-termination' },
      { label: 'Acceptable use', to: '/compliance/acceptable-use-policy' },
    ],
    closing: {
      heading: 'Stabilize your 8xx termination',
      paragraphs: [
        'Talk with Go Connectivo about toll-free termination routes and rates, or review wholesale and VoIP termination if your needs are wider than 8xx.',
      ],
    },
  },

  'wholesale-termination': {
    metaTitle: 'Wholesale Voice Termination for Platforms | Go Connectivo',
    metaDescription:
      'Wholesale voice termination for platforms and resellers: domestic/international routes, SIP interconnect, concurrency, and tiered rates, not single-floor dialer trunks or 8xx-only TF termination.',
    overview: {
      heading: 'Wholesale termination at partner scale',
      paragraphs: [
        'Wholesale Termination is for platforms, resellers, and aggregators buying domestic and international minutes at partner scale over SIP interconnect.',
        'Choose Outbound Services for a single dialer floor, Toll-Free Termination for 8xx-only completion, or VoIP Termination when you need a general termination product for seats and apps.',
      ],
    },
    benefits: {
      heading: 'Wholesale termination benefits',
      items: [
        { title: 'Domestic & intl routes', text: 'Coverage for multi-market wholesale traffic mixes.' },
        { title: 'SIP interconnect', text: 'Standard SIP trunk handoff for platforms and carriers.' },
        { title: 'High concurrency', text: 'Capacity for bursty wholesale and aggregator loads.' },
        { title: 'Tiered rates', text: 'Options that fit volume commitments and route quality needs.' },
      ],
    },
    howItWorks: {
      heading: 'Wholesale onboarding',
      steps: [
        { title: 'Traffic discovery', text: 'Review destinations, ACD, and concurrency requirements.' },
        { title: 'Interconnect', text: 'Establish SIP trunks and authentication.' },
        { title: 'Route & rate', text: 'Assign decks and quality tiers to your profile.' },
        { title: 'Operate with NOC support', text: 'Monitor incidents and growth with voice operations support.' },
      ],
    },
    useCases: {
      heading: 'Wholesale termination use cases',
      items: [
        'CPaaS and UCaaS platforms',
        'Reseller voice partners',
        'International calling products',
        'High-volume dialer aggregators',
        'Backup wholesale routes for primary carriers',
      ],
    },
    faqs: {
      heading: 'Wholesale termination FAQs',
      items: [
        {
          q: 'Is wholesale the same as VoIP termination?',
          a: 'Wholesale is partner-scale minute buying. VoIP Termination is the general termination product for call centers, seats, and application-originated calls.',
        },
        {
          q: 'Do you support international termination?',
          a: 'Domestic and international wholesale routes are part of the offer.',
        },
        {
          q: 'Can rates be tiered by volume?',
          a: 'Tiered rate options help align pricing with committed traffic.',
        },
      ],
    },
    related: [
      { label: 'VoIP termination', to: '/services/voip-termination' },
      { label: 'Outbound voice (dialers)', to: '/services/outbound-services' },
      { label: 'Toll-free termination', to: '/services/toll-free-termination' },
      { label: 'Compliance hub', to: '/compliance' },
    ],
    closing: {
      heading: 'Scale wholesale minutes with clear interconnect',
      paragraphs: [
        'Contact Go Connectivo for wholesale termination interconnect, rates, and capacity planning.',
      ],
    },
  },

  'voip-termination': {
    metaTitle: 'VoIP Termination for Call Centers & Apps | Go Connectivo',
    metaDescription:
      'VoIP termination for call centers, PBX seats, and application-originated calls: domestic/international completion with monitored routes, distinct from wholesale partner minutes or 8xx-only TF termination.',
    overview: {
      heading: 'VoIP termination for mixed business traffic',
      paragraphs: [
        'VoIP Termination is the general call-completion product for dialers, hosted PBX seats, and application-originated calling across domestic and international destinations.',
        'Audio quality and completion are monitored for business traffic. For partner-scale minute buying use Wholesale; for 8xx-only use Toll-Free Termination; for dialer campaign trunks use Outbound Services.',
      ],
    },
    benefits: {
      heading: 'VoIP termination benefits',
      items: [
        { title: 'Domestic termination', text: 'US-focused routes tuned for business and contact-center traffic.' },
        { title: 'International termination', text: 'Reach global destinations from the same interconnect model.' },
        { title: 'Practical rate design', text: 'Control spend without unsupported “lowest rate” claims.' },
        { title: 'Technical support', text: 'Specialists available when codecs, CLI, or destination quality need attention.' },
      ],
    },
    howItWorks: {
      heading: 'VoIP termination path',
      steps: [
        { title: 'Connect via SIP', text: 'Hand off calls over SIP trunks to Go Connectivo.' },
        { title: 'Route selection', text: 'Traffic follows quality-aware domestic or international paths.' },
        { title: 'Complete the call', text: 'PSTN or downstream carriers deliver to the destination.' },
        { title: 'Review & optimize', text: 'Use support and reporting to refine quality and cost.' },
      ],
    },
    useCases: {
      heading: 'VoIP termination use cases',
      items: [
        'Call-center outbound termination',
        'Business VoIP seat outbound minutes',
        'Application and API-originated calls',
        'International customer outreach',
        'Backup termination for primary carriers',
      ],
    },
    faqs: {
      heading: 'VoIP termination FAQs',
      items: [
        {
          q: 'How is this different from wholesale?',
          a: 'Wholesale targets platforms buying minutes at partner scale. VoIP Termination serves call centers, seats, and apps that need completion routes.',
        },
        {
          q: 'Do you cover international?',
          a: 'International termination is available alongside domestic routes.',
        },
        {
          q: 'Who do we call for issues?',
          a: 'Voice technical support is available for termination troubleshooting.',
        },
      ],
    },
    related: [
      { label: 'Wholesale termination', to: '/services/wholesale-termination' },
      { label: 'Outbound voice (dialers)', to: '/services/outbound-services' },
      { label: 'Toll-free termination', to: '/services/toll-free-termination' },
      { label: 'Robocall mitigation', to: '/compliance/KYC-RMD' },
    ],
    closing: {
      heading: 'Terminate with Go Connectivo',
      paragraphs: [
        'Get VoIP termination interconnect details tailored to your dialer, PBX, or application traffic.',
      ],
    },
  },

  'call-center-software': {
    metaTitle: 'Contact Center Software Platform | Go Connectivo',
    metaDescription: 'Call center software from Go Connectivo, ACD queues, agent and supervisor tools, live monitoring, SLA metrics, and a voice core ready for omnichannel growth.',
    overview: {
      heading: 'Run inbound and outbound desks from one console',
      paragraphs: [
        'Go Connectivo call center software unifies queues, agents, supervisors, and live wallboards so floors run inbound and outbound from one place.',
        'ACD, occupancy metrics, and monitoring give ops the levers to hit SLAs. Expand toward omnichannel when your roadmap demands it.',
      ],
    },
    benefits: {
      heading: 'Call center software benefits',
      items: [
        { title: 'ACD queues', text: 'Distribute calls fairly across skilled agents.' },
        { title: 'Agent & supervisor tools', text: 'Desktops for handling, coaching, and escalation.' },
        { title: 'Live monitoring', text: 'Hear and see floor health as it happens.' },
        { title: 'SLA & occupancy metrics', text: 'Staff to service levels with measurable KPIs.' },
      ],
    },
    howItWorks: {
      heading: 'Call center software rollout',
      steps: [
        { title: 'Define queues and skills', text: 'Map lines of business to ACD logic.' },
        { title: 'Onboard agents', text: 'Provision users, softphones, and supervisor roles.' },
        { title: 'Connect voice', text: 'Attach DIDs, toll-free, and outbound trunks.' },
        { title: 'Operate with wallboards', text: 'Coach from live metrics and historical reports.' },
      ],
    },
    useCases: {
      heading: 'Call center software use cases',
      items: ['Inbound support contact centers', 'Blended inbound/outbound floors', 'BPO multi-client agent groups', 'Sales floors needing supervisor tools', 'Growing teams leaving basic PBX hunt groups'],
    },
    faqs: {
      heading: 'Call center software FAQs',
      items: [
        { q: 'Does it support blended desks?', a: 'The platform is built for inbound and outbound desks sharing one console.' },
        { q: 'Can supervisors monitor live?', a: 'Live monitoring and wallboards are core supervisor tools.' },
        { q: 'Will it work with your dialers?', a: 'Call-center voice core integrates with Go Connectivo dialer and trunk offerings.' },
      ],
    },
    closing: {
      heading: 'Modernize the agent desktop',
      paragraphs: ['Schedule a walkthrough of Go Connectivo call center software, queues, and voice interconnect.'],
    },
  },

  'virtual-contact-center': {
    metaTitle: 'Virtual Contact Center | Go Connectivo',
    metaDescription: 'Virtual contact center from Go Connectivo, remote agent login, unified queues, supervisor dashboards, secure softphones, and multi-site routing for hybrid teams.',
    overview: {
      heading: 'A contact center that works from any location',
      paragraphs: [
        'Go Connectivo virtual contact center stands up distributed agent floors for remote or hybrid teams, same queues, same quality, any location.',
        'Remote login, unified queues, supervisor dashboards, and secure softphones keep coaching and SLAs intact off-site.',
      ],
    },
    benefits: {
      heading: 'Virtual contact center benefits',
      items: [
        { title: 'Remote agent login', text: 'Agents join queues securely from home or branch sites.' },
        { title: 'Unified queues', text: 'One logical floor even when people are scattered.' },
        { title: 'Supervisor dashboards', text: 'See occupancy and service levels across locations.' },
        { title: 'Secure softphones', text: 'Protect access while delivering clear VoIP audio.' },
      ],
    },
    howItWorks: {
      heading: 'Virtual contact center launch',
      steps: [
        { title: 'Design multi-site routing', text: 'Decide how work splits across regions and teams.' },
        { title: 'Provision remote agents', text: 'Issue credentials and softphone profiles.' },
        { title: 'Connect numbers & trunks', text: 'Point inbound and outbound voice to the virtual floor.' },
        { title: 'Supervise anywhere', text: 'Use dashboards to coach without being on-prem.' },
      ],
    },
    useCases: {
      heading: 'Virtual contact center use cases',
      items: ['Work-from-home agent programs', 'Hybrid corporate support teams', 'Multi-city sales floors', 'Disaster-recovery agent capacity', 'BPO overflow with shared queues'],
    },
    faqs: {
      heading: 'Virtual contact center FAQs',
      items: [
        { q: 'Can remote agents use the same queues as office staff?', a: 'Yes. Unified queues treat remote and on-site agents as one floor.' },
        { q: 'How do supervisors coach remotely?', a: 'Dashboards and monitoring tools support listen and performance review off-site.' },
        { q: 'Is softphone access secure?', a: 'Secure softphone access is part of the virtual contact center design.' },
      ],
    },
    closing: {
      heading: 'Distribute the floor, not the standards',
      paragraphs: ['Ask Go Connectivo how a virtual contact center can mirror your on-prem SLAs for hybrid teams.'],
    },
  },

  'ivr-auto-attendant': {
    metaTitle: 'IVR & Auto Attendant | Go Connectivo',
    metaDescription: 'IVR and auto attendant from Go Connectivo, multi-level menus, business-hours routing, DTMF/speech options, custom prompts, and overflow to voicemail or queues.',
    overview: {
      heading: 'Guide callers with professional IVR menus',
      paragraphs: [
        'Go Connectivo IVR and auto attendant route callers to the right queue, extension, or message with multi-level menus and polished prompts.',
        'Business-hours logic, DTMF and speech options, and overflow paths keep experiences consistent after hours and during peaks.',
      ],
    },
    benefits: {
      heading: 'IVR & auto attendant benefits',
      items: [
        { title: 'Multi-level IVR trees', text: 'Organize complex departments without human greeters on every call.' },
        { title: 'Business-hours menus', text: 'Different treatment for open, closed, and holiday schedules.' },
        { title: 'DTMF & speech options', text: 'Let callers navigate by keys or spoken choices where enabled.' },
        { title: 'Custom prompts', text: 'Brand the experience with your own recorded messages.' },
      ],
    },
    howItWorks: {
      heading: 'Building an IVR',
      steps: [
        { title: 'Map caller intents', text: 'List departments, FAQs, and emergency paths.' },
        { title: 'Design the tree', text: 'Create menus, schedules, and overflow rules.' },
        { title: 'Record prompts', text: 'Upload branded audio for each menu node.' },
        { title: 'Connect destinations', text: 'Point options to queues, extensions, or voicemail.' },
      ],
    },
    useCases: {
      heading: 'IVR use cases',
      items: ['Company main-line auto attendant', 'Support self-service before agent connect', 'After-hours messaging with emergency escape', 'Multi-language greeting paths', 'Campaign lines with simple menu splits'],
    },
    faqs: {
      heading: 'IVR FAQs',
      items: [
        { q: 'Can menus change by time of day?', a: 'Business-hours menus support open, closed, and holiday behavior.' },
        { q: 'Do you support custom audio?', a: 'Custom prompts let you brand every step of the IVR.' },
        { q: 'Where can IVR send callers?', a: 'Queues, extensions, voicemail, and overflow paths are common destinations.' },
      ],
    },
    closing: {
      heading: 'Make the first 30 seconds count',
      paragraphs: ['Work with Go Connectivo to design IVR trees that protect brand experience and agent time.'],
    },
  },

  'call-routing-queues': {
    metaTitle: 'Call Routing & Queues | Go Connectivo',
    metaDescription: 'Call routing and queues from Go Connectivo, skill and priority queues, time-of-day rules, overflow, callbacks, announcements, and supervisor override.',
    overview: {
      heading: 'Skill-based routing that protects wait times',
      paragraphs: [
        'Go Connectivo call routing and queues use skill-based logic, priority lanes, and overflow rules to keep wait times low and the right agents engaged.',
        'Time-of-day routing, queue announcements, and supervisor override give ops control during spikes and special events.',
      ],
    },
    benefits: {
      heading: 'Routing & queue benefits',
      items: [
        { title: 'Skill & priority queues', text: 'Match callers to trained agents; elevate VIP traffic.' },
        { title: 'Time-of-day routing', text: 'Change destinations automatically by schedule.' },
        { title: 'Overflow & callback', text: 'Offer relief when live answer capacity is exhausted.' },
        { title: 'Supervisor override', text: 'Intervene when campaigns or incidents need manual control.' },
      ],
    },
    howItWorks: {
      heading: 'Queue configuration',
      steps: [
        { title: 'Define skills', text: 'Tag agents and queues by product, language, or client.' },
        { title: 'Set priorities', text: 'Rank VIP, SLA, and overflow behaviors.' },
        { title: 'Add announcements', text: 'Keep callers informed while waiting.' },
        { title: 'Monitor & adjust', text: 'Use live metrics to rebalance staffing and rules.' },
      ],
    },
    useCases: {
      heading: 'Routing & queue use cases',
      items: ['Multi-skill support centers', 'Priority VIP customer lanes', 'Language-based routing', 'Overflow to partner BPOs', 'Seasonal peak staffing plans'],
    },
    faqs: {
      heading: 'Call routing FAQs',
      items: [
        { q: 'Can we prioritize certain callers?', a: 'Priority queues elevate designated traffic ahead of general volume.' },
        { q: 'What happens when queues overflow?', a: 'Overflow and callback options help protect abandon rates.' },
        { q: 'Can supervisors change routing live?', a: 'Supervisor override supports rapid response during incidents.' },
      ],
    },
    closing: {
      heading: 'Route smarter, wait less',
      paragraphs: ['Let Go Connectivo help design skill queues and overflow that match your staffing model.'],
    },
  },

  'call-recording': {
    metaTitle: 'Call Recording for Contact Centers | Go Connectivo',
    metaDescription: 'Secure call recording from Go Connectivo, on-demand or always-on capture, cloud storage, role-based playback, retention policies, and quality review workflows.',
    overview: {
      heading: 'Secure recording for training, compliance, and QA',
      paragraphs: [
        'Go Connectivo call recording captures conversations for training, compliance, and quality with access controls built for supervisors and ops.',
        'Choose on-demand or always-on modes, store securely in the cloud, and apply retention policies with role-based playback.',
      ],
    },
    benefits: {
      heading: 'Call recording benefits',
      items: [
        { title: 'Flexible capture modes', text: 'Record always-on or trigger on demand by policy.' },
        { title: 'Secure cloud storage', text: 'Keep audio protected with controlled access.' },
        { title: 'Role-based playback', text: 'Limit who can hear which recordings.' },
        { title: 'QA workflows', text: 'Support structured quality review and coaching.' },
      ],
    },
    howItWorks: {
      heading: 'Call recording workflow',
      steps: [
        { title: 'Set policy', text: 'Choose which queues and campaigns record.' },
        { title: 'Capture audio', text: 'Recordings land in secure storage as calls complete.' },
        { title: 'Review with roles', text: 'Supervisors play back based on permissions.' },
        { title: 'Retain or purge', text: 'Apply retention rules aligned to your obligations.' },
      ],
    },
    useCases: {
      heading: 'Call recording use cases',
      items: ['Agent coaching and calibration', 'Dispute and compliance evidence', 'New-hire training libraries', 'QA scorecards tied to audio', 'Regulated industry retention needs'],
    },
    faqs: {
      heading: 'Call recording FAQs',
      items: [
        { q: 'Can we record only certain queues?', a: 'Policies can target specific campaigns or queues for capture.' },
        { q: 'Who can play recordings?', a: 'Role-based playback restricts access to authorized users.' },
        { q: 'Do you support retention policies?', a: 'Retention controls help align storage with operational and compliance needs.' },
      ],
    },
    closing: {
      heading: 'Record with purpose and control',
      paragraphs: ['Ask Go Connectivo about call recording modes, storage, and QA workflows for your floor.'],
    },
  },

  'call-analytics': {
    metaTitle: 'Call Analytics & Reporting | Go Connectivo',
    metaDescription: 'Call analytics from Go Connectivo, real-time wallboards, campaign and queue reports, agent scorecards, exportable CDRs, and custom date ranges for ops coaching.',
    overview: {
      heading: 'Live and historical insight for voice ops',
      paragraphs: [
        'Go Connectivo call analytics turns answer rates, handle time, campaigns, and agent performance into decisions supervisors can act on.',
        'Real-time wallboards, historical reports, scorecards, and exportable CDRs support coaching, client billing, and continuous improvement.',
      ],
    },
    benefits: {
      heading: 'Call analytics benefits',
      items: [
        { title: 'Real-time wallboards', text: 'See queue health and agent states as calls happen.' },
        { title: 'Campaign & queue reports', text: 'Compare performance across programs and skills.' },
        { title: 'Agent scorecards', text: 'Coach with handle time, dispositions, and occupancy.' },
        { title: 'Exportable CDRs', text: 'Reconcile usage and investigate outliers offline.' },
      ],
    },
    howItWorks: {
      heading: 'Analytics in practice',
      steps: [
        { title: 'Instrument the floor', text: 'Ensure dialers, queues, and trunks feed reporting.' },
        { title: 'Watch live KPIs', text: 'Use wallboards during peaks and launches.' },
        { title: 'Review history', text: 'Run campaign and agent reports on custom ranges.' },
        { title: 'Coach & iterate', text: 'Turn scorecards into training actions.' },
      ],
    },
    useCases: {
      heading: 'Call analytics use cases',
      items: ['Intraday staffing adjustments', 'Client SLA reporting for BPOs', 'Campaign ROI and connect analysis', 'Agent performance management', 'Finance reconciliation via CDRs'],
    },
    faqs: {
      heading: 'Call analytics FAQs',
      items: [
        { q: 'Are wallboards real time?', a: 'Real-time wallboards surface live queue and agent metrics for the floor.' },
        { q: 'Can we export CDRs?', a: 'Exportable CDRs support offline analysis and reconciliation.' },
        { q: 'Do reports cover agents and campaigns?', a: 'Campaign, queue, and agent scorecard views are part of the analytics set.' },
      ],
    },
    closing: {
      heading: 'Coach with data, not anecdotes',
      paragraphs: ['Explore Go Connectivo call analytics for wallboards, scorecards, and CDR exports built for contact centers.'],
    },
  },

  'voice-api': {
    metaTitle: 'Programmable Voice API | Go Connectivo',
    metaDescription:
      'Programmable Voice API from Go Connectivo, embed inbound and outbound calling with REST, webhooks, click-to-call, programmable IVR, and SIP. Docs shared during onboarding.',
    overview: {
      heading: 'Programmable voice for product and platform teams',
      paragraphs: [
        'Go Connectivo voice API is designed to embed outbound and inbound calling into applications using REST-style control, webhooks, and SIP where required.',
        'Public self-serve API docs are not published on this website. Endpoint details, sandbox access, and limits are shared during technical onboarding after you contact our team.',
      ],
    },
    benefits: {
      heading: 'Voice API benefits',
      items: [
        { title: 'REST & webhooks', text: 'Event-driven control of call lifecycle from your backend.' },
        { title: 'Click-to-call & alerts', text: 'Trigger conversations and voice notifications from product UX.' },
        { title: 'Programmable IVR', text: 'Script menus and routing in code, not only in portals.' },
        { title: 'SIP & media control', text: 'Integrate with existing SIP endpoints where needed.' },
      ],
    },
    howItWorks: {
      heading: 'Voice API development path',
      steps: [
        { title: 'Scope & approve access', text: 'Contact our team to define use cases and receive credentials when approved.' },
        { title: 'Wire webhooks', text: 'Receive call events into your application logic.' },
        { title: 'Place or answer calls', text: 'Use REST and SIP controls for media paths.' },
        { title: 'Monitor & scale', text: 'Watch quality and concurrency as usage grows.' },
      ],
    },
    useCases: {
      heading: 'Voice API use cases',
      items: ['In-app click-to-call for marketplaces', 'Appointment reminder voice bots', 'Two-legged verification calls', 'Custom IVR inside SaaS products', 'Platforms reselling programmable voice'],
    },
    faqs: {
      heading: 'Voice API FAQs',
      items: [
        { q: 'Do you provide a sandbox?', a: 'Sandbox and production credentials are discussed during onboarding once API access is approved.' },
        { q: 'Where is the API documentation?', a: 'Detailed endpoint documentation is provided to approved technical contacts rather than as a public portal on this site.' },
        { q: 'Is SIP supported?', a: 'SIP and media control options help integrate with existing telephony assets.' },
      ],
    },
    related: [
      { label: 'SIP trunking', to: '/services/sip-trunking' },
      { label: 'Call center software', to: '/services/call-center-software' },
      { label: 'SMS solutions', to: '/services/sms-solutions' },
      { label: 'Contact sales', to: '/contact' },
    ],
    closing: {
      heading: 'Ship calling features faster',
      paragraphs: ['Talk to Go Connectivo about voice API access, webhooks, and the carrier routes behind your product. We will share technical documentation after scoping.'],
    },
  },

  'sms-solutions': {
    metaTitle: 'A2P SMS Messaging | Go Connectivo',
    metaDescription:
      'A2P SMS Messaging from Go Connectivo, A2P messaging, two-way conversations, delivery receipts, API and portal send, plus number and brand registration help.',
    overview: {
      heading: 'Business SMS beside your voice stack',
      paragraphs: [
        'Go Connectivo A2P SMS Messaging covers alerts, OTP, campaign follow-ups, and agent messaging alongside your VoIP and dialer platforms.',
        'A2P support, two-way conversations, delivery receipts, and registration help keep customer messaging accountable.',
      ],
    },
    benefits: {
      heading: 'A2P SMS Messaging benefits',
      items: [
        { title: 'A2P messaging support', text: 'Business-to-consumer traffic paths designed for application messaging.' },
        { title: 'Two-way conversations', text: 'Let customers reply into agent or automated workflows.' },
        { title: 'Delivery receipts', text: 'Know whether messages reached the handset path.' },
        { title: 'API & portal send', text: 'Engineers automate; ops can also send from a portal.' },
      ],
    },
    howItWorks: {
      heading: 'SMS onboarding',
      steps: [
        { title: 'Register brand & numbers', text: 'Complete required registration steps for A2P where applicable.' },
        { title: 'Choose send paths', text: 'Use API integration and/or portal sending.' },
        { title: 'Build templates', text: 'Create OTP, alert, and campaign message patterns.' },
        { title: 'Monitor delivery', text: 'Track receipts and refine lists and timing.' },
      ],
    },
    useCases: {
      heading: 'SMS use cases',
      items: ['OTP and security codes', 'Appointment and shipping alerts', 'Dialer campaign follow-up texts', 'Two-way agent SMS desks', 'Abandoned-cart or win-back nudges'],
    },
    faqs: {
      heading: 'A2P SMS Messaging FAQs',
      items: [
        { q: 'Do you help with brand registration?', a: 'Number and brand registration help is available for compliant A2P messaging.' },
        { q: 'Can messaging be two-way?', a: 'Two-way conversations support customer replies into your workflows.' },
        { q: 'API and portal both available?', a: 'Yes. Send programmatically or from an operations portal.' },
      ],
    },
    closing: {
      heading: 'Add SMS to the same Go Connectivo relationship',
      paragraphs: ['Ask about A2P SMS Messaging that sits next to your voice, dialer, and API stack.'],
    },
  },

  'ringless-voicemail': {
    metaTitle: 'Ringless Voicemail Drop | Go Connectivo',
    metaDescription: 'Ringless voicemail from Go Connectivo, compliant inbox drops, bulk campaigns, audio templates, schedule windows, delivery reporting, and list segmentation.',
    overview: {
      heading: 'Land voicemail without interrupting the day',
      paragraphs: [
        'Go Connectivo ringless voicemail drops messages into inboxes so outreach lands without a live ring interrupting the recipient.',
        'Bulk campaigns, audio templates, schedule windows, list segmentation, and delivery reporting support structured drops beside dialers and SMS.',
      ],
    },
    benefits: {
      heading: 'Ringless voicemail benefits',
      items: [
        { title: 'Bulk drop campaigns', text: 'Reach large lists with prepared audio messages.' },
        { title: 'Audio template library', text: 'Reuse approved scripts across programs.' },
        { title: 'Schedule windows', text: 'Send during approved outreach hours.' },
        { title: 'Delivery reporting', text: 'Track campaign results for ops and clients.' },
      ],
    },
    howItWorks: {
      heading: 'Ringless voicemail flow',
      steps: [
        { title: 'Prepare audio', text: 'Record or select templates for the campaign.' },
        { title: 'Segment lists', text: 'Target the right contacts and suppress exclusions.' },
        { title: 'Schedule the drop', text: 'Choose windows that match your outreach policy.' },
        { title: 'Review delivery', text: 'Use reporting to refine creative and timing.' },
      ],
    },
    useCases: {
      heading: 'Ringless voicemail use cases',
      items: ['Appointment reminder drops', 'Political and nonprofit outreach where permitted', 'Collections soft-touch messaging', 'Event promotion follow-ups', 'Multi-channel sequences with dialer and SMS'],
    },
    faqs: {
      heading: 'Ringless voicemail FAQs',
      items: [
        { q: 'Does the phone ring for the recipient?', a: 'Ringless drops are designed to place a voicemail without a standard live ring interruption.' },
        { q: 'Can we schedule campaigns?', a: 'Schedule windows control when drops are attempted.' },
        { q: 'Is reporting included?', a: 'Delivery reporting helps measure campaign performance.' },
      ],
    },
    closing: {
      heading: 'Add asynchronous voice to your outreach mix',
      paragraphs: ['Contact Go Connectivo about ringless voicemail campaigns alongside dialer and SMS programs.'],
    },
  },
};

/** Returns SEO content for a service; builds fallback from title/description/capabilities when id is unknown. */
export function getServiceSeoContent(service) {
  if (!service || typeof service !== 'object') return null;

  const { id, title, description, capabilities = [], category } = service;
  if (id && SERVICE_SEO[id]) return SERVICE_SEO[id];

  const name = title || 'Voice Service';
  const desc =
    description ||
    `${name} from Go Connectivo, carrier-minded VoIP and call-center infrastructure for US businesses.`;
  const caps = Array.isArray(capabilities) ? capabilities.filter(Boolean) : [];
  const categoryLabel = category ? String(category).replace(/-/g, ' ') : 'telecom';

  const benefitItems = (caps.length
    ? caps.slice(0, 4)
    : ['Clear VoIP audio', 'Scalable capacity', 'Call-center ready workflows', '24/7 specialist support']
  ).map((cap) => ({
    title: typeof cap === 'string' ? cap : 'Capability',
    text: `Go Connectivo includes ${typeof cap === 'string' ? cap.toLowerCase() : 'this capability'} as part of ${name} for ${categoryLabel} teams.`,
  }));
  while (benefitItems.length < 4) {
    benefitItems.push({
      title: 'Reliable voice infrastructure',
      text: `${name} runs on Go Connectivo routes and platforms built for contact centers and growing businesses.`,
    });
  }

  const metaDescription =
    desc.length >= 140 && desc.length <= 160
      ? desc
      : `${name} from Go Connectivo, VoIP and call-center tools with clear audio, flexible capacity, and support for US business teams.`.slice(0, 160);

  return {
    metaTitle: `${name} | Go Connectivo`,
    metaDescription,
    overview: {
      heading: `About ${name}`,
      paragraphs: [
        desc,
        `Go Connectivo delivers ${name} as part of a broader dialer, business voice, inbound, termination, and contact-center stack for US teams that live on the phone.`,
        caps.length
          ? `Key capabilities include ${caps.slice(0, 3).join(', ')}${caps.length > 3 ? ', and more' : ''}.`
          : `${name} is designed to work with SIP, VoIP seats, and call-center workflows without unnecessary complexity.`,
      ],
    },
    benefits: { heading: `Why choose ${name}`, items: benefitItems.slice(0, 4) },
    howItWorks: {
      heading: `How ${name} works with Go Connectivo`,
      steps: [
        { title: 'Share your requirements', text: `Tell us how you plan to use ${name}, including volume and integrations.` },
        { title: 'Configure the service', text: 'We align numbers, trunks, dialers, or agent tools to your workflow.' },
        { title: 'Connect your team', text: 'Agents and admins go live on softphones, PBX, or platform interconnect.' },
        { title: 'Monitor and grow', text: 'Use reporting and support to refine quality, capacity, and campaigns.' },
      ],
    },
    useCases: {
      heading: `${name} use cases`,
      items: [
        `Call centers adopting ${name}`,
        `Sales teams needing dependable VoIP around ${name}`,
        `Support desks pairing ${name} with inbound queues`,
        `Growing businesses replacing legacy telephony`,
        `Platforms interconnecting via SIP with Go Connectivo`,
      ],
    },
    faqs: {
      heading: `${name} FAQs`,
      items: [
        { q: `What is ${name}?`, a: desc },
        { q: 'Who is this for?', a: `${name} is built for US call centers, sales floors, and businesses that need practical telecom infrastructure from Go Connectivo.` },
        { q: 'How do we get started?', a: 'Contact Go Connectivo with your volume, numbers, and integration needs, we will recommend the right voice path.' },
      ],
    },
    closing: {
      heading: `Get started with ${name}`,
      paragraphs: [
        `Reach out to Go Connectivo to deploy ${name} with carrier-minded VoIP, dialer, and contact-center options that fit your floor.`,
      ],
    },
  };
}
