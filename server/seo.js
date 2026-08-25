import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST_PATH = path.resolve(__dirname, 'data/seo-manifest.json');

let cached = null;

export function loadSeoManifest() {
  if (cached) return cached;
  try {
    const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
    cached = JSON.parse(raw);
  } catch {
    cached = { siteUrl: 'https://www.goconnectivo.com', routes: [], spaExact: ['/'], spaPrefixes: ['/admin', '/kyc'] };
  }
  return cached;
}

export function normalizePathname(urlPath = '/') {
  try {
    const u = new URL(urlPath, 'http://localhost');
    let p = u.pathname || '/';
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p || '/';
  } catch {
    return '/';
  }
}

export function findSeoRoute(pathname) {
  const manifest = loadSeoManifest();
  const exact = manifest.routes.find((r) => r.path === pathname);
  if (exact) return exact;
  return null;
}

export function isSpaRoute(pathname) {
  const manifest = loadSeoManifest();
  if (manifest.spaExact?.includes(pathname)) return true;
  if (manifest.routes.some((r) => r.path === pathname)) return true;
  for (const prefix of manifest.spaPrefixes || []) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return true;
  }
  // Dynamic admin application detail
  if (/^\/admin\/applications\/[^/]+$/.test(pathname)) return true;
  return false;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Inject route-specific head tags + a crawlable text bootstrap into index.html.
 */
export function injectSeoIntoHtml(html, { pathname, status = 200 } = {}) {
  const manifest = loadSeoManifest();
  const route =
    findSeoRoute(pathname) ||
    (status === 404
      ? {
          title: 'Page Not Found | Go Connectivo',
          description: 'The requested page could not be found on Go Connectivo.',
          h1: 'Page not found',
          noindex: true,
          jsonLd: [],
        }
      : findSeoRoute('/') || {
          title: 'Go Connectivo',
          description: '',
          h1: 'Go Connectivo',
          noindex: false,
          jsonLd: [],
        });

  const siteUrl = manifest.siteUrl || 'https://www.goconnectivo.com';
  const canonicalPath = pathname === '/' ? '/' : pathname;
  const canonical =
    canonicalPath === '/' ? `${siteUrl}/` : `${siteUrl}${canonicalPath}`;
  const robots = route.noindex || status === 404 ? 'noindex, nofollow, noarchive' : 'index, follow';
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description || '');
  const h1 = escapeHtml(route.h1 || route.title);
  const ogImage = `${siteUrl}/favicon-192.png`;

  const jsonLdBlocks = Array.isArray(route.jsonLd) ? route.jsonLd : [];
  const jsonLdHtml = jsonLdBlocks
    .map(
      (block, i) =>
        `<script type="application/ld+json" id="seo-jsonld-${i}">${JSON.stringify(block)}</script>`,
    )
    .join('\n    ');

  const headExtras = `
    <link rel="canonical" href="${canonical}" data-seo="1" />
    <meta name="robots" content="${robots}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Go Connectivo" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />
    ${jsonLdHtml}
  `;

  // Crawlable bootstrap links (visible to non-JS / first HTML parse)
  const serviceLinks = (manifest.routes || [])
    .filter((r) => r.path.startsWith('/services/') && !r.noindex)
    .slice(0, 40)
    .map((r) => `<li><a href="${escapeHtml(r.path)}">${escapeHtml(r.h1 || r.path)}</a></li>`)
    .join('');

  const bootstrap = `
    <div id="seo-bootstrap" data-seo-bootstrap>
      <nav aria-label="Primary">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/resources">Resources</a></li>
          <li><a href="/faqs">FAQs</a></li>
          <li><a href="/compliance">Legal Compliance</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms &amp; Conditions</a></li>
        </ul>
      </nav>
      <main>
        <h1>${h1}</h1>
        <p>${description}</p>
        ${pathname === '/services' || pathname === '/' ? `<ul>${serviceLinks}</ul>` : ''}
        ${pathname === '/resources' ? `<ul><li><a href="/faqs">FAQs</a></li><li><a href="/compliance">Legal Compliance</a></li><li><a href="/compliance/robocall-mitigation-plan">Robocall Mitigation Plan</a></li><li><a href="/compliance/acceptable-use-policy">Acceptable Use Policy</a></li><li><a href="/services">All services</a></li></ul>` : ''}
        ${pathname.startsWith('/services/') ? `<p><a href="/services">All services</a> · <a href="/contact">Contact</a> · <a href="/resources">Resources</a></p>` : ''}
      </main>
    </div>
    <style>
      #seo-bootstrap{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;}
    </style>
  `;

  let out = html;
  // Remove prior SEO tags so route injection is authoritative
  out = out.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, '');
  out = out.replace(/<meta[^>]*name=["']robots["'][^>]*>/gi, '');
  out = out.replace(/<meta[^>]*property=["']og:[^"']+["'][^>]*>/gi, '');
  out = out.replace(/<meta[^>]*name=["']twitter:[^"']+["'][^>]*>/gi, '');
  out = out.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  if (/name=["']description["']/i.test(out)) {
    out = out.replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="description" content="${description}" />`,
    );
  } else {
    out = out.replace('</head>', `    <meta name="description" content="${description}" />\n  </head>`);
  }
  out = out.replace('</head>', `${headExtras}\n  </head>`);
  out = out.replace(/<div id="seo-bootstrap"[\s\S]*?<\/style>\s*/i, '');
  out = out.replace('<div id="root"></div>', `${bootstrap}\n    <div id="root"></div>`);
  return out;
}
