import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../src');

const SKIP = new Set(['admin', 'kyc']);

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP.has(e.name) || e.name === 'node_modules' || e.name === 'dist') continue;
      walk(p, acc);
    } else if (/\.(jsx?|tsx?)$/.test(e.name)) {
      // Skip admin/kyc page entrypoints
      const rel = path.relative(root, p).replace(/\\/g, '/');
      if (rel.startsWith('pages/admin/') || rel === 'pages/Kyc.jsx' || rel === 'pages/AdminRoutes.jsx') {
        continue;
      }
      acc.push(p);
    }
  }
  return acc;
}

/** Order matters — longer hex first where needed */
const pairs = [
  // Backgrounds / surfaces
  [/bg-\[#0[Dd]1321\]/g, 'bg-[var(--bg-primary)]'],
  [/bg-\[#151[Bb]2[Ee]\]/g, 'bg-[var(--bg-secondary)]'],
  [/bg-\[#1[Aa]2238\]/g, 'bg-[var(--surface)]'],
  [/from-\[#0[Dd]1321\]/g, 'from-[var(--bg-primary)]'],
  [/via-\[#0[Dd]1321\]/g, 'via-[var(--bg-primary)]'],
  [/to-\[#0[Dd]1321\]/g, 'to-[var(--bg-primary)]'],
  [/from-\[#151[Bb]2[Ee]\]/g, 'from-[var(--bg-secondary)]'],
  [/via-\[#151[Bb]2[Ee]\]/g, 'via-[var(--bg-secondary)]'],
  [/to-\[#151[Bb]2[Ee]\]/g, 'to-[var(--bg-secondary)]'],
  [/from-\[#1[Aa]2238\]/g, 'from-[var(--surface)]'],
  [/via-\[#1[Aa]2238\]/g, 'via-[var(--surface)]'],
  [/to-\[#1[Aa]2238\]/g, 'to-[var(--surface)]'],

  // Text
  [/text-\[#F7F7FB\]/g, 'text-[var(--text-primary)]'],
  [/text-\[#f7f7fb\]/g, 'text-[var(--text-primary)]'],
  [/text-\[#FFFFFF\]/g, 'text-[var(--text-primary)]'],
  [/text-\[#C6C8FD\]/g, 'text-[var(--text-secondary)]'],
  [/text-\[#c6c8fd\]/g, 'text-[var(--text-secondary)]'],
  [/text-\[#CBC8D8\]/g, 'text-[var(--text-muted)]'],
  [/text-\[#BAA1F2\]/g, 'text-[var(--accent-light)]'],

  // Accents
  [/from-\[#491[Ee][Bb]8\]/g, 'from-[var(--accent-primary)]'],
  [/via-\[#491[Ee][Bb]8\]/g, 'via-[var(--accent-primary)]'],
  [/to-\[#491[Ee][Bb]8\]/g, 'to-[var(--accent-primary)]'],
  [/bg-\[#491[Ee][Bb]8\]/g, 'bg-[var(--accent-primary)]'],
  [/from-\[#844[Ff][Ff][Cc]\]/g, 'from-[var(--accent-secondary)]'],
  [/via-\[#844[Ff][Ff][Cc]\]/g, 'via-[var(--accent-secondary)]'],
  [/to-\[#844[Ff][Ff][Cc]\]/g, 'to-[var(--accent-secondary)]'],
  [/bg-\[#844[Ff][Ff][Cc]\]/g, 'bg-[var(--accent-secondary)]'],
  [/border-\[#844[Ff][Ff][Cc]\]/g, 'border-[var(--accent-secondary)]'],
  [/border-\[#491[Ee][Bb]8\]/g, 'border-[var(--accent-primary)]'],
  [/border-\[#C6C8FD\]/g, 'border-[var(--accent-soft)]'],
  [/border-\[#BAA1F2\]/g, 'border-[var(--accent-light)]'],
  [/hover:text-\[#844[Ff][Ff][Cc]\]/g, 'hover:text-[var(--accent-secondary)]'],
  [/hover:text-\[#F7F7FB\]/g, 'hover:text-[var(--text-primary)]'],
  [/hover:text-\[#FFFFFF\]/g, 'hover:text-[var(--text-primary)]'],
  [/hover:bg-\[#0[Dd]1321\]/g, 'hover:bg-[var(--bg-primary)]'],
  [/hover:bg-\[#151[Bb]2[Ee]\]/g, 'hover:bg-[var(--bg-secondary)]'],
  [/hover:bg-\[#1[Aa]2238\]/g, 'hover:bg-[var(--surface)]'],
  [/hover:border-\[#844[Ff][Ff][Cc]\]/g, 'hover:border-[var(--accent-secondary)]'],
  [/hover:border-\[#C6C8FD\]/g, 'hover:border-[var(--accent-soft)]'],
  [/focus:border-\[#844[Ff][Ff][Cc]\]/g, 'focus:border-[var(--accent-secondary)]'],
  [/focus:border-\[#C6C8FD\]/g, 'focus:border-[var(--accent-soft)]'],
  [/focus:bg-\[#151[Bb]2[Ee]\]/g, 'focus:bg-[var(--bg-secondary)]'],
  [/focus:bg-\[#1[Aa]2238\]/g, 'focus:bg-[var(--surface)]'],
  [/placeholder:text-\[#C6C8FD\]/g, 'placeholder:text-[var(--text-secondary)]'],
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
