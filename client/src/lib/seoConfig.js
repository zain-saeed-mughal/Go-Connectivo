/**
 * Canonical site SEO config (audit-aligned).
 * Preferred host: https://www.goconnectivo.com
 */

export const SITE_URL = 'https://www.goconnectivo.com';
export const SITE_NAME = 'Go Connectivo';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon-192.png`;

export const organization = {
  name: 'GO CONNECTIVO LLC',
  legalName: 'GO CONNECTIVO LLC',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-192.png`,
  email: 'support@goconnectivo.com',
  address: {
    streetAddress: '522 Glenwood Ave',
    addressLocality: 'Williamsport',
    addressRegion: 'PA',
    postalCode: '17701',
    addressCountry: 'US',
  },
};

/** Static marketing pages (service details added from catalog at runtime). */
export const staticPages = {
  '/': {
    title: 'Go Connectivo | Business VoIP, Contact Center, SIP & VoIP Termination',
    description:
      'Go Connectivo delivers Business VoIP, contact center platforms, SIP trunking, DID numbers, and VoIP termination for call centers and growing teams. FCC RMD certified.',
    h1: 'Transform Your Business Communication',
  },
  '/about': {
    title: 'About Go Connectivo | VoIP & Communications Partner',
    description:
      'Learn about Go Connectivo, a voice infrastructure partner for Business VoIP, contact center platforms, SIP, numbers, and VoIP termination.',
    h1: 'Your Trusted VoIP Partner',
  },
  '/services': {
    title: 'VoIP, Dialer & Contact Center Services | Go Connectivo',
    description:
      'Explore Go Connectivo services: dialers, Business VoIP, hosted PBX, SIP trunking, DID numbers, VoIP termination, call center software, SMS, and voice APIs.',
    h1: 'Complete Voice Stack, Built for Teams',
  },
  '/partners': {
    title: 'Marketing Partners | Go Connectivo',
    description:
      'Go Connectivo marketing partners: Commio, Sangoma, Callivex, Vestacall, Dial World, DID Central, and Range — trusted voice and dialer ecosystem partners.',
    h1: 'Built with Trusted Partners',
  },
  '/faqs': {
    title: 'VoIP & Dialer FAQs | Go Connectivo',
    description:
      'Answers about Go Connectivo dialers, Business VoIP, SIP, numbers, VoIP termination, contact-center tools, APIs, onboarding, and support.',
    h1: 'Frequently Asked Questions',
  },
  '/compliance': {
    title: 'Voice Compliance & Caller Authentication | Go Connectivo',
    description:
      'How Go Connectivo approaches robocall mitigation, caller authentication, KYC, and responsible use of voice services.',
    h1: 'Legal Compliance',
  },
  '/compliance/robocall-mitigation-plan': {
    title: 'Robocall Mitigation Plan | Go Connectivo',
    description:
      'Read Go Connectivo’s Robocall Mitigation Plan covering network integrity, traceback cooperation, and unlawful traffic controls.',
    h1: 'Robocall Mitigation Plan',
  },
  '/compliance/acceptable-use-policy': {
    title: 'Acceptable Use & Calling Policy | Go Connectivo',
    description:
      'Go Connectivo Acceptable Use & Calling Policy for lawful use of dialers, VoIP, messaging, and related voice services.',
    h1: 'Acceptable Use & Calling Policy',
  },
  '/contact': {
    title: 'Contact Go Connectivo | VoIP & Dialer Sales Support',
    description:
      'Contact Go Connectivo for Business VoIP, dialers, SIP, numbers, termination, and call center solutions. Email support@goconnectivo.com.',
    h1: 'Contact Us',
  },
  '/privacy': {
    title: 'Privacy Policy | Go Connectivo',
    description:
      'How Go Connectivo handles information submitted through the website, contact forms, and related services.',
    h1: 'Privacy Policy',
  },
  '/terms': {
    title: 'Terms & Conditions | Go Connectivo',
    description:
      'Terms and conditions for using the Go Connectivo website and related online materials.',
    h1: 'Terms & Conditions',
  },
};

export function absoluteUrl(pathname = '/') {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.replace(/\/$/, '')}`;
}

export function escapeAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    legalName: organization.legalName,
    url: organization.url,
    logo: organization.logo,
    email: organization.email,
    address: {
      '@type': 'PostalAddress',
      ...organization.address,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: organization.email,
        availableLanguage: ['English'],
      },
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      '@type': 'Organization',
      name: organization.name,
      url: SITE_URL,
    },
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildServiceSchema({ name, description, urlPath }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(urlPath),
    provider: {
      '@type': 'Organization',
      name: organization.name,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };
}

export function buildWebPageSchema({ name, description, urlPath }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl(urlPath),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
