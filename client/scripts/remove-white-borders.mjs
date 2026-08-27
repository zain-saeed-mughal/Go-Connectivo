import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../src');

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'dist') continue;
      walk(p, acc);
    } else if (/\.(jsx?|tsx?|css)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const pairs = [
  [/border-\[rgba\(255,\s*255,\s*255,\s*0\.08\)\]/g, 'border-transparent'],
  [/border-\[rgba\(255,\s*255,\s*255,\s*0\.06\)\]/g, 'border-transparent'],
  [/border-white\/10/g, 'border-transparent'],
  [/border-white\/15/g, 'border-transparent'],
  [/border-white\/20/g, 'border-transparent'],
  [/border-white\/25/g, 'border-transparent'],
  [/border-white\/30/g, 'border-transparent'],
  [/hover:border-white\/50/g, 'hover:border-[#844FFC]/40'],
  [/border-white\/50/g, 'border-[#844FFC]/40'],
];

let changed = 0;
for (const file of walk(root)) {
  let s = fs.readFileSync(file, 'utf8');
  const orig = s;
  for (const [re, rep] of pairs) s = s.replace(re, rep);
  if (s !== orig) {
    fs.writeFileSync(file, s);
    changed += 1;
    console.log('updated', path.relative(root, file));
  }
}
console.log('done', changed, 'files');
