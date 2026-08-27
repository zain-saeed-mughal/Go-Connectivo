import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const roots = [
  path.resolve(__dirname, '../src/pages/admin'),
  path.resolve(__dirname, '../src/components/admin'),
];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(jsx?|tsx?|css)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const pairs = [
  // Pale lavender borders that read as white on dark UI
  [/border-\[rgba\(198,\s*200,\s*253,0\.\d+\)\]/g, 'border-transparent'],
  [/border-b border-\[rgba\(198,\s*200,\s*253,0\.\d+\)\]/g, 'border-b border-transparent'],
  [/border border-\[#C6C8FD\]\/\d+/g, 'border border-transparent'],
  [/border-\[#C6C8FD\]\/\d+/g, 'border-transparent'],
  [/border-\[#C6C8FD\]/g, 'border-[#844FFC]'],
  [/!border-\[#C6C8FD\]\/\d+/g, '!border-transparent'],
  // Soften active filter glow
  [/shadow-\[0_6px_16px_rgba\(73,30,184,0\.3\)\]/g, ''],
  [/shadow-\[0_6px_16px_rgba\(73,30,184,0\.28\)\]/g, ''],
];

let changed = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    let s = fs.readFileSync(file, 'utf8');
    const orig = s;
    for (const [re, rep] of pairs) s = s.replace(re, rep);
    // cleanup double spaces in class strings
    s = s.replace(/ {2,}/g, ' ');
    if (s !== orig) {
      fs.writeFileSync(file, s);
      changed += 1;
      console.log('updated', path.relative(path.resolve(__dirname, '../src'), file));
    }
  }
}
console.log('done', changed, 'files');
