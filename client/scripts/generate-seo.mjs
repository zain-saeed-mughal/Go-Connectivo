/**
 * Build sitemap.xml + seo-manifest.json for Express HTML injection.
 * Run as part of client build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const repoRoot = path.resolve(root, '..');

async function main() {
  const seoMod = await import(pathToFileURL(path.join(root, 'src/lib/seoConfig.js')).href);
  const contentMod = await import(pathToFileURL(path.join(root, 'src/data/content.js')).href);
  const serviceSeoMod = await import(
    pathToFileURL(path.join(root, 'src/data/serviceSeoContent.js')).href
  );

  const {
    SITE_URL,
    staticPages,
    absoluteUrl,
    buildOrganizationSchema,
    buildWebSiteSchema,
    buildBreadcrumbSchema,
    buildServiceSchema,
    buildWebPageSchema,
  } = seoMod;

  const catalog = contentMod.getCatalogServices();
  const getServiceSeoContent = serviceSeoMod.getServiceSeoContent;

  const routes = [];

  for (const [pathname, meta] of Object.entries(staticPages)) {
    const schemas = [];
    if (pathname === '/') {
      schemas.push(buildOrganizationSchema(), buildWebSiteSchema());
    } else if (pathname === '/services') {
      schemas.push(
        buildWebPageSchema({
          name: meta.title,
          description: meta.description,
          urlPath: pathname,
        }),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]),
      );
    } else if (pathname.startsWith('/compliance')) {
      schemas.push(
        buildWebPageSchema({
          name: meta.title,
          description: meta.description,
          urlPath: pathname,
        }),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Compliance', path: '/compliance' },
          ...(pathname !== '/compliance'
            ? [{ name: meta.h1, path: pathname }]
            : []),
        ]),
      );
    } else {
      schemas.push(
        buildWebPageSchema({
          name: meta.title,
          description: meta.description,
          urlPath: pathname,
        }),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: meta.h1, path: pathname },
        ]),
      );
    }

    routes.push({
      path: pathname,
      title: meta.title,
      description: meta.description,
      h1: meta.h1,
      noindex: false,
      jsonLd: schemas,
      changefreq: pathname === '/' ? 'weekly' : 'monthly',
      priority: pathname === '/' ? '1.0' : pathname === '/services' || pathname === '/contact' ? '0.9' : '0.7',
    });
  }

  for (const service of catalog) {
    const pathname = `/services/${service.id}`;
    const seo = getServiceSeoContent(service);
    const title = seo?.metaTitle || `${service.title} | Go Connectivo`;
    const description =
      seo?.metaDescription ||
      service.description ||
      `${service.title} from Go Connectivo.`;

    routes.push({
      path: pathname,
      title,
      description,
      h1: service.title,
      noindex: false,
      jsonLd: [
        buildServiceSchema({
          name: service.title,
          description,
          urlPath: pathname,
        }),
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: pathname },
        ]),
      ],
      changefreq: 'monthly',
      priority: '0.8',
    });
  }

  // Hidden catalog pages: routable but noindex / not in sitemap
  const hidden = contentMod.services.filter((s) => s.hiddenFromCatalog);
  for (const service of hidden) {
    const pathname = `/services/${service.id}`;
    const seo = getServiceSeoContent(service);
    routes.push({
      path: pathname,
      title: seo?.metaTitle || `${service.title} | Go Connectivo`,
      description: seo?.metaDescription || service.description,
      h1: service.title,
      noindex: true,
      includeInSitemap: false,
      jsonLd: [],
    });
  }

  // Private portals — known SPA routes, always noindex
  for (const pathname of ['/admin', '/admin/login', '/kyc']) {
    routes.push({
      path: pathname,
      title: pathname.startsWith('/admin') ? 'Admin | Go Connectivo' : 'KYC Onboarding | Go Connectivo',
      description: 'Private Go Connectivo portal.',
      h1: pathname.startsWith('/admin') ? 'Admin' : 'KYC Onboarding',
      noindex: true,
      includeInSitemap: false,
      jsonLd: [],
    });
  }

  const sitemapRoutes = routes.filter((r) => r.includeInSitemap !== false && !r.noindex);
  const lastmod = new Date().toISOString().slice(0, 10);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    (r) => `  <url>
    <loc>${absoluteUrl(r.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq || 'monthly'}</changefreq>
    <priority>${r.priority || '0.6'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /kyc/

Sitemap: ${SITE_URL}/sitemap.xml
`;

  const publicDir = path.join(root, 'public');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');

  const manifest = {
    siteUrl: SITE_URL,
    generatedAt: new Date().toISOString(),
    routes: routes.map(({ path: p, title, description, h1, noindex, jsonLd }) => ({
      path: p,
      title,
      description,
      h1,
      noindex: Boolean(noindex),
      jsonLd: jsonLd || [],
    })),
    // Paths that may receive the SPA shell (including nested admin)
    spaPrefixes: ['/admin', '/kyc'],
    spaExact: sitemapRoutes.map((r) => r.path).concat(
      routes.filter((r) => r.noindex).map((r) => r.path),
    ),
  };

  const serverDataDir = path.join(repoRoot, 'server', 'data');
  fs.mkdirSync(serverDataDir, { recursive: true });
  fs.writeFileSync(path.join(serverDataDir, 'seo-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  // Also copy into dist after build — write a post-build note path under public (copied by vite)
  console.log(`[seo] Wrote public/sitemap.xml (${sitemapRoutes.length} URLs)`);
  console.log(`[seo] Wrote public/robots.txt`);
  console.log(`[seo] Wrote server/data/seo-manifest.json (${manifest.routes.length} routes)`);
}

main().catch((err) => {
  console.error('[seo] Failed:', err);
  process.exit(1);
});
