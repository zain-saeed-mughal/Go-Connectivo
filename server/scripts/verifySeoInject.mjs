import fs from 'node:fs';
import { injectSeoIntoHtml, isSpaRoute, normalizePathname } from '../seo.js';

const html = fs.readFileSync('../client/dist/index.html', 'utf8');
for (const p of ['/', '/about', '/services/hosted-pbx', '/not-real']) {
  const pathname = normalizePathname(p);
  const known = isSpaRoute(pathname);
  const status = known ? 200 : 404;
  const out = injectSeoIntoHtml(html, { pathname, status });
  const title = (out.match(/<title>([^<]+)<\/title>/) || [])[1];
  const canons = [...out.matchAll(/rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  const h1 = (out.match(/<h1>([^<]+)<\/h1>/) || [])[1];
  const ld = (out.match(/application\/ld\+json/g) || []).length;
  console.log(JSON.stringify({ p, status, known, title, canons, h1, ld }));
}
console.log('--- robots ---');
console.log(fs.readFileSync('../client/dist/robots.txt', 'utf8'));
console.log('sitemap locs', (fs.readFileSync('../client/dist/sitemap.xml', 'utf8').match(/<loc>/g) || []).length);
