/**
 * Extra SEO card sections for service detail pages.
 * Card order/selection is seeded by service id (stable per page, varied across services).
 */

function hashSeed(str) {
  let h = 2166136261;
  const s = String(str || '');
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(list, rand) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pick(list, rand, count) {
  return shuffle(list, rand).slice(0, Math.min(count, list.length));
}

function fill(tpl, ctx) {
  return String(tpl || '')
    .replaceAll('{title}', ctx.title)
    .replaceAll('{category}', ctx.category)
    .replaceAll('{brand}', 'Go Connectivo');
}

/** Shared banks — titles/text are keyword-aware with {title} / {category} placeholders. */
const FEATURE_BANK = [
  {
    title: 'Campaign-ready controls',
    text: '{title} includes practical controls so supervisors can pace volume, protect answer quality, and keep {category} campaigns on plan.',
  },
  {
    title: 'CRM-friendly workflows',
    text: 'Map dispositions, notes, and follow-ups so {title} stays aligned with the CRM process your floor already runs.',
  },
  {
    title: 'Clear voice paths',
    text: '{brand} pairs {title} with carrier-minded VoIP routes so agents hear clearer audio on live connects.',
  },
  {
    title: 'Role-based access',
    text: 'Give admins, supervisors, and agents the right {title} permissions without exposing every setting to the floor.',
  },
  {
    title: 'Live operational visibility',
    text: 'Track connects, occupancy, and outcomes while {title} is running so coaching happens the same day—not next week.',
  },
  {
    title: 'Scalable capacity',
    text: 'Grow seats, trunks, or concurrent sessions for {title} as {category} demand rises without ripping out your stack.',
  },
  {
    title: 'Compliance-minded safeguards',
    text: 'Use windows, DNC-friendly patterns, and audit-friendly logging around {title} to support responsible outbound and inbound practice.',
  },
  {
    title: 'Fast onboarding path',
    text: '{brand} helps you configure {title}, train leads, and go live with a checklist built for US call-center timelines.',
  },
  {
    title: 'Multi-team routing options',
    text: 'Send {title} traffic to the right skill group, client queue, or regional desk without manual triage.',
  },
  {
    title: 'Reporting you can act on',
    text: 'Export and dashboard views for {title} help ops refine lists, scripts, and staffing with evidence—not guesswork.',
  },
];

const AUDIENCE_BANK = [
  {
    title: 'Outbound sales floors',
    text: 'SDR and AE teams use {title} to raise talk time and keep high-value conversations on a predictable rhythm.',
  },
  {
    title: 'Inbound support desks',
    text: 'Support and retention teams rely on {title} to answer faster, route smarter, and document every customer touch.',
  },
  {
    title: 'BPO and multi-client ops',
    text: 'BPOs deploy {title} when each client needs separate queues, reporting, and voice capacity under one roof.',
  },
  {
    title: 'Collections and renewals',
    text: 'Collections, renewals, and win-back programs use {title} for paced outreach with clearer agent focus.',
  },
  {
    title: 'Growing US businesses',
    text: 'Companies graduating from consumer VoIP choose {title} when reliability and reporting start to matter.',
  },
  {
    title: 'Contact center leadership',
    text: 'Ops leaders pick {title} to standardize tools across {category} programs without locking into rigid legacy suites.',
  },
  {
    title: 'Platform and product teams',
    text: 'Product teams embed or interconnect with {title} when voice must sit beside apps, CRM, and messaging.',
  },
  {
    title: 'Hybrid remote agent teams',
    text: 'Distributed agents run {title} over softphones and cloud seats while supervisors keep one operational view.',
  },
];

const OUTCOME_BANK = [
  {
    title: 'Higher productive talk time',
    text: 'With {title}, agents spend more minutes on live conversations and less time hunting numbers or idle screens.',
  },
  {
    title: 'Cleaner handoffs',
    text: 'Structured routing and context around {title} reduce dropped context between IVR, queues, and live agents.',
  },
  {
    title: 'Faster coaching loops',
    text: 'Supervisors can coach from live and recent {title} activity instead of waiting for end-of-week spreadsheets.',
  },
  {
    title: 'More predictable capacity',
    text: 'Clearer visibility into {title} load helps staffing match peak hours in your {category} programs.',
  },
  {
    title: 'Better campaign learnings',
    text: 'Outcome data from {title} shows which lists, scripts, and windows actually move conversion.',
  },
  {
    title: 'Lower operational friction',
    text: 'One {brand} stack for {title} cuts tool-switching and keeps voice, dialing, and reporting in sync.',
  },
  {
    title: 'Confidence at go-live',
    text: 'Practical setup and support around {title} help new programs launch without week-long guesswork.',
  },
  {
    title: 'Room to expand',
    text: 'Start with {title}, then add related dialer, number, termination, or contact-center services as you grow.',
  },
];

const GUIDE_BANK = [
  {
    title: 'Define success metrics first',
    text: 'Before go-live, decide what {title} must improve—connect rate, ASA, talk time, or conversion—so reporting stays honest.',
  },
  {
    title: 'Align lists and skills',
    text: 'Match {title} queues and skills to campaign intent so the right agents take the right conversations.',
  },
  {
    title: 'Keep scripts short and current',
    text: 'Pair {title} with concise talk tracks that agents can update weekly based on real outcomes.',
  },
  {
    title: 'Review abandon and wait daily',
    text: 'Daily checks on wait, abandon, and occupancy keep {title} campaigns inside healthy operating bands.',
  },
  {
    title: 'Document dispositions consistently',
    text: 'Standard disposition codes for {title} make CRM follow-ups and coaching comparisons meaningful.',
  },
  {
    title: 'Plan voice capacity early',
    text: 'Size SIP and termination capacity with {title} so peak hours do not surprise the floor.',
  },
  {
    title: 'Train supervisors on the console',
    text: 'A short {title} supervisor walkthrough prevents misconfigured pacing, queues, or permissions after launch.',
  },
  {
    title: 'Iterate in small batches',
    text: 'Change one {title} variable at a time—list, window, or script—so wins are easy to prove.',
  },
];

const SECTION_DEFS = [
  {
    key: 'features',
    heading: 'Key capabilities of {title}',
    intro: 'Practical building blocks that make {title} useful on real {category} floors—not just on a feature checklist.',
    bank: FEATURE_BANK,
    count: 4,
  },
  {
    key: 'audience',
    heading: 'Who {title} is built for',
    intro: 'Teams across sales, support, and BPO programs use {title} when voice performance and workflow clarity both matter.',
    bank: AUDIENCE_BANK,
    count: 3,
  },
  {
    key: 'outcomes',
    heading: 'Results teams aim for with {title}',
    intro: 'Clear outcomes help stakeholders judge whether {title} is doing its job after the first weeks of production traffic.',
    bank: OUTCOME_BANK,
    count: 3,
  },
  {
    key: 'guides',
    heading: 'Best-practice tips for {title}',
    intro: 'Simple operating habits that help {brand} customers get more value from {title} without overcomplicating day-one setup.',
    bank: GUIDE_BANK,
    count: 4,
  },
];

/**
 * Builds 2–3 SEO card sections with shuffled order and card content (stable for a given service id).
 */
export function buildServiceSeoCardSections(service) {
  if (!service?.title) return [];

  const ctx = {
    title: service.title,
    category: service.category ? String(service.category).replace(/-/g, ' ') : 'voice and contact center',
    brand: 'Go Connectivo',
  };

  const rand = mulberry32(hashSeed(service.id || service.title));
  const sectionCount = 2 + Math.floor(rand() * 2); // 2 or 3 sections
  const sections = pick(SECTION_DEFS, rand, sectionCount).map((section) => {
    const cards = pick(section.bank, rand, section.count).map((card) => ({
      title: fill(card.title, ctx),
      text: fill(card.text, ctx),
    }));

    return {
      key: section.key,
      heading: fill(section.heading, ctx),
      intro: fill(section.intro, ctx),
      cards,
    };
  });

  const caps = Array.isArray(service.capabilities) ? service.capabilities.filter(Boolean) : [];
  if (caps.length >= 3 && rand() > 0.35) {
    const selectedCaps = pick(caps, rand, Math.min(4, caps.length));
    sections.splice(Math.floor(rand() * (sections.length + 1)), 0, {
      key: 'included',
      heading: `What is included with ${ctx.title}`,
      intro: `Core inclusions teams evaluate when comparing ${ctx.title} providers for ${ctx.category} programs.`,
      cards: selectedCaps.map((cap) => ({
        title: String(cap),
        text: `${ctx.brand} delivers ${String(cap).toLowerCase()} as part of ${ctx.title}, so your floor can launch with the essentials already covered.`,
      })),
    });
  }

  // Keep at most 3 card sections so pages stay readable.
  return sections.slice(0, 3);
}

/** Deterministic shuffle of mid-page SEO block keys for varied layouts. */
export function shuffleSeoBlockOrder(serviceId, keys) {
  const rand = mulberry32(hashSeed(`order:${serviceId || 'service'}`));
  return shuffle(keys, rand);
}
