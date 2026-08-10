import puppeteer from 'puppeteer-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = process.env.AUDIT_BASE || 'http://localhost:5174';

const browser = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Sample from inside the page so timings are not distorted by CDP round trips.
await page.evaluateOnNewDocument(() => {
  window.__samples = [];
  const tick = () => {
    const el = document.querySelector('[data-hero="eyebrow"]');
    const word = document.querySelector('[data-hero-word]');
    if (el) {
      window.__samples.push({
        t: Math.round(performance.now()),
        eyebrow: +getComputedStyle(el).opacity,
        word: word ? +getComputedStyle(word).opacity : null,
        wordY: word ? getComputedStyle(word).transform : null,
        pending: el.hasAttribute('data-reveal-pending'),
      });
    }
    if (performance.now() < 5000) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  window.__lag = [];
  let prev = performance.now();
  const lagTick = () => {
    const now = performance.now();
    const delta = now - prev;
    if (delta > 120) window.__lag.push({ at: Math.round(now), stall: Math.round(delta) });
    prev = now;
    if (now < 5000) requestAnimationFrame(lagTick);
  };
  requestAnimationFrame(lagTick);
});

await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await new Promise((r) => setTimeout(r, 6000));

const { samples, lag } = await page.evaluate(() => ({ samples: window.__samples, lag: window.__lag }));

console.log('long frames (>120ms):', JSON.stringify(lag));

const changes = [];
let prev = null;
for (const s of samples) {
  const key = `${s.eyebrow.toFixed(2)}|${s.word?.toFixed(2)}|${s.pending}`;
  if (key !== prev) {
    changes.push(s);
    prev = key;
  }
}
console.log(`\nsamples: ${samples.length}, first t=${samples[0]?.t}, last t=${samples.at(-1)?.t}`);
console.log('transitions:');
changes.slice(0, 40).forEach((c) =>
  console.log(`  t=${c.t} eyebrow=${c.eyebrow.toFixed(2)} word=${c.word?.toFixed(2)} pending=${c.pending} ${c.wordY}`),
);

await browser.close();
