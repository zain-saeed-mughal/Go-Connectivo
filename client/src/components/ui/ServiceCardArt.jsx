/**
 * Low-opacity telecom line-art for service cards.
 * Keys accept Lucide icon names or service-ish aliases.
 */
const ART = {
  PhoneCall: (
    <>
      <circle cx="78" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M66 28h24M78 16v24" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M28 72c8-14 22-22 38-22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <rect x="18" y="58" width="22" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  Activity: (
    <>
      <path
        d="M12 58h18l8-22 12 44 10-30h28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="82" cy="28" r="10" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
  Zap: (
    <>
      <path d="M58 12 36 52h18L42 92l36-48H58L70 12Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="22" cy="78" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
    </>
  ),
  ListOrdered: (
    <>
      <path d="M28 24h52M28 48h40M28 72h46" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="16" cy="24" r="4" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="16" cy="48" r="4" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="16" cy="72" r="4" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
  Phone: (
    <>
      <rect x="34" y="18" width="32" height="64" rx="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="70" r="3.5" fill="currentColor" opacity="0.35" />
      <path d="M42 28h16" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),
  Cloud: (
    <>
      <path
        d="M34 62h40a16 16 0 0 0 0-32 20 20 0 0 0-38-4 14 14 0 0 0-2 36Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M42 74v10M54 74v14M66 74v8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="42" cy="90" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="54" cy="94" r="2.5" fill="currentColor" opacity="0.4" />
      <circle cx="66" cy="88" r="2.5" fill="currentColor" opacity="0.4" />
    </>
  ),
  Cable: (
    <>
      <path d="M20 30h28v40H20Z" fill="none" stroke="currentColor" strokeWidth="1.2" rx="4" />
      <path d="M52 40h28v20H52Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M48 50h4M36 70v12M66 60v22" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
      <circle cx="36" cy="88" r="4" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="66" cy="88" r="4" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
  Smartphone: (
    <>
      <rect x="38" y="16" width="24" height="48" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M22 78h56" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M50 64v14M34 78l16 10 16-10" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
  PhoneIncoming: (
    <>
      <path
        d="M28 72c6-18 22-30 42-34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path d="M58 28l14 2-2 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <rect x="18" y="58" width="24" height="28" rx="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  PhoneForwarded: (
    <>
      <path d="M22 50h40" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M52 38l18 12-18 12" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <circle cx="78" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1.15" />
    </>
  ),
  MapPin: (
    <>
      <path
        d="M50 18c-12 0-22 9-22 22 0 16 22 42 22 42s22-26 22-42c0-13-10-22-22-22Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="50" cy="40" r="7" fill="none" stroke="currentColor" strokeWidth="1.15" />
    </>
  ),
  Hash: (
    <>
      <path d="M34 28v48M54 28v48M26 42h44M26 62h44" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="78" cy="28" r="8" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
  PhoneOutgoing: (
    <>
      <path
        d="M72 28c-6 18-22 30-42 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path d="M28 52l14-2 2-14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <rect x="58" y="58" width="24" height="28" rx="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  ArrowUpRight: (
    <>
      <path d="M28 72 72 28" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M48 28h24v24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="28" cy="72" r="6" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
  Globe: (
    <>
      <circle cx="50" cy="48" r="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="50" cy="48" rx="12" ry="28" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M22 48h56M28 34h44M28 62h44" stroke="currentColor" strokeWidth="1" />
    </>
  ),
  Radio: (
    <>
      <circle cx="50" cy="52" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M32 36a26 26 0 0 1 36 0M24 26a38 38 0 0 1 52 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path d="M50 62v22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  Headset: (
    <>
      <path
        d="M28 58v-8a22 22 0 0 1 44 0v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <rect x="20" y="54" width="14" height="22" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="66" y="54" width="14" height="22" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M80 66h6a6 6 0 0 1 6 6v4" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
  Monitor: (
    <>
      <rect x="18" y="24" width="64" height="42" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M40 78h20M50 66v12" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M28 38h20M28 46h28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </>
  ),
  Mic: (
    <>
      <rect x="42" y="18" width="16" height="36" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M30 48a20 20 0 0 0 40 0M50 68v16M38 84h24" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
    </>
  ),
  GitBranch: (
    <>
      <circle cx="28" cy="28" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="28" cy="72" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="72" cy="50" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M28 35v30M28 40c0 10 14 14 37 14" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  Disc: (
    <>
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1.15" />
      <path d="M50 22v10M50 68v10M22 50h10M68 50h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </>
  ),
  BarChart3: (
    <>
      <path d="M24 78V48M44 78V28M64 78V40M84 78V56" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M16 84h72" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),
  Code2: (
    <>
      <path d="M36 32 18 50l18 18M64 32l18 18-18 18" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M54 28 46 72" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
    </>
  ),
  MessageSquare: (
    <>
      <path
        d="M22 28h56v36H42l-12 14v-14H22Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M34 42h28M34 52h18" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),
  Voicemail: (
    <>
      <circle cx="32" cy="52" r="14" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="68" cy="52" r="14" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M46 52h8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </>
  ),
  MousePointerClick: (
    <>
      <path d="M30 22 30 70l14-10 8 18 10-4-8-18 20-2Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="72" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </>
  ),
};

const DEFAULT_ART = (
  <>
    <circle cx="70" cy="30" r="16" fill="none" stroke="currentColor" strokeWidth="1.15" />
    <circle cx="70" cy="30" r="4" fill="currentColor" opacity="0.35" />
    <path d="M54 40 34 58M60 46 42 72M76 46l12 26" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <circle cx="28" cy="64" r="5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="40" cy="78" r="5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="88" cy="78" r="5" fill="none" stroke="currentColor" strokeWidth="1.1" />
  </>
);

export function getServiceArtKey(iconName) {
  return ART[iconName] ? iconName : 'default';
}

export default function ServiceCardArt({ name = 'default', className = '' }) {
  const art = ART[name] || DEFAULT_ART;

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      focusable="false"
    >
      {art}
    </svg>
  );
}
