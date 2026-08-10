import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = process.env.AUDIT_BASE || 'http://localhost:5174';
const OUT = path.resolve('scripts/audit');
const ROUTES = ['/', '/about', '/services', '/faqs', '/contact'];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** Walks the page top to bottom the way a reader would, letting reveals fire. */
async function scrollThrough(page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  const viewport = await page.evaluate(() => window.innerHeight);
  for (let y = 0; y < height; y += Math.round(viewport * 0.6)) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await wait(450);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await wait(600);
}

function collectHidden() {
  const out = [];
  const nodes = document.querySelectorAll('body *');

  nodes.forEach((el) => {
    const text = (el.textContent || '').trim();
    if (!text && !el.matches('img,svg,[data-reveal-inner]')) return;

    const style = getComputedStyle(el);
    if (style.display === 'none') return;

    const rect = el.getBoundingClientRect();
    const absTop = rect.top + window.scrollY;
    if (rect.width === 0 || rect.height === 0) return;

    const opacity = parseFloat(style.opacity);
    const clipped =
      style.clipPath && style.clipPath !== 'none' && /100%|9\d(\.\d+)?%/.test(style.clipPath);
    const transformed =
      style.transform &&
      style.transform !== 'none' &&
      !el.className.toString().includes('translate');

    const problem =
      opacity < 0.9 || style.visibility === 'hidden' || clipped;

    if (!problem) return;

    out.push({
      tag: el.tagName.toLowerCase(),
      cls: (el.className.toString() || '').slice(0, 70),
      text: text.slice(0, 60),
      opacity,
      visibility: style.visibility,
      clipPath: style.clipPath,
      transform: transformed ? style.transform.slice(0, 40) : undefined,
      absTop: Math.round(absTop),
      pending: el.hasAttribute('data-reveal-pending'),
    });
  });

  return {
    hidden: out,
    stillPending: document.querySelectorAll('[data-reveal-pending]').length,
    docWidth: document.documentElement.scrollWidth,
    winWidth: window.innerWidth,
  };
}

async function auditRoute(browser, route, width, height, label) {
  const page = await browser.newPage();
  await page.setViewport({ width, height });

  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text().slice(0, 200));
  });
  page.on('pageerror', (e) => errors.push(`pageerror: ${String(e).slice(0, 200)}`));

  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle2', timeout: 45000 });
  await wait(2500);

  const initial = await page.evaluate(collectHidden);
  await scrollThrough(page);
  const after = await page.evaluate(collectHidden);

  const name = `${label}${route === '/' ? 'home' : route.replace(/\//g, '-')}`;
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });

  await page.close();

  return { route, label, errors, initial, after };
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: 'new',
    args: ['--no-sandbox', '--force-device-scale-factor=1'],
  });

  const results = [];
  for (const route of ROUTES) {
    results.push(await auditRoute(browser, route, 1440, 900, 'desktop-'));
  }
  results.push(await auditRoute(browser, '/', 390, 844, 'mobile-'));

  await browser.close();

  for (const r of results) {
    console.log(`\n=== ${r.label}${r.route} ===`);
    console.log(`console errors: ${r.errors.length}`);
    r.errors.slice(0, 5).forEach((e) => console.log(`   ! ${e}`));
    console.log(
      `overflow: doc ${r.after.docWidth} vs win ${r.after.winWidth}` +
        (r.after.docWidth > r.after.winWidth ? '  <-- HORIZONTAL OVERFLOW' : ''),
    );
    console.log(`hidden after scroll: ${r.after.hidden.length} (pending ${r.after.stillPending})`);
    r.after.hidden.slice(0, 12).forEach((h) => {
      console.log(
        `   - <${h.tag}> top:${h.absTop} op:${h.opacity} vis:${h.visibility} clip:${h.clipPath} pending:${h.pending} "${h.text}"`,
      );
    });
  }

  await fs.writeFile(path.join(OUT, 'report.json'), JSON.stringify(results, null, 2));
  console.log(`\nScreenshots + report written to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
