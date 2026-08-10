import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = process.env.AUDIT_BASE || 'http://localhost:5174';
const OUT = path.resolve('scripts/audit');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: 'new',
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });

  // Does the hero actually animate in, or is it just there instantly?
  const frames = [150, 450, 900, 1600, 3200];
  let last = 0;
  for (const at of frames) {
    await wait(at - last);
    last = at;
    const state = await page.evaluate(() => {
      const pick = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const s = getComputedStyle(el);
        return { opacity: +s.opacity, transform: s.transform.slice(0, 46) };
      };
      const word = document.querySelector('[data-hero-word]');
      const track = document.querySelector('[data-track]');
      return {
        eyebrow: pick('[data-hero="eyebrow"]'),
        firstWord: word
          ? { opacity: +getComputedStyle(word).opacity, transform: getComputedStyle(word).transform.slice(0, 46) }
          : null,
        copy: pick('[data-hero="copy"]'),
        marquee: track ? getComputedStyle(track).transform.slice(0, 46) : null,
      };
    });
    console.log(`t=${at}ms`, JSON.stringify(state));
    await page.screenshot({ path: path.join(OUT, `hero-${at}.png`) });
  }

  // Marquee should keep moving on its own.
  const m1 = await page.evaluate(() => getComputedStyle(document.querySelector('[data-track]')).transform);
  await wait(1500);
  const m2 = await page.evaluate(() => getComputedStyle(document.querySelector('[data-track]')).transform);
  console.log('marquee moving:', m1 !== m2, m1, '->', m2);

  // Scroll slowly into a card grid and watch whether it eases in or snaps.
  await page.evaluate(() => window.scrollTo({ top: 1500, behavior: 'instant' }));
  for (const at of [80, 300, 700, 1400]) {
    await wait(at === 80 ? 80 : 250);
    await page.screenshot({ path: path.join(OUT, `scroll-${at}.png`) });
  }

  const sample = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[data-reveal-pending]'));
    return cards.slice(0, 6).map((el) => ({
      cls: el.className.toString().slice(0, 50),
      opacity: +getComputedStyle(el).opacity,
    }));
  });
  console.log('pending mid-scroll:', JSON.stringify(sample));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
