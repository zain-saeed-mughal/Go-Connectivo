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
    else if (/\.jsx?$/.test(e.name)) acc.push(p);
  }
  return acc;
}

/** Only token swaps — never touch whitespace. */
const pairs = [
  // Backgrounds
  [/bg-\[#E8ECF2\]/gi, 'bg-[#151B2E]'],
  [/bg-\[#F8FAFC\]/gi, 'bg-[#151B2E]'],
  [/bg-\[#F4F6F9\]/gi, 'bg-[#0D1321]'],
  [/bg-\[#EEF3F8\]/gi, 'bg-[#1A2238]'],
  [/bg-\[#1C314F\]/gi, 'bg-[#0D1321]'],
  [/bg-\[#243d5c\]/gi, 'bg-[#491EB8]'],
  [/bg-\[#2F4C73\]/gi, 'bg-[#491EB8]'],
  [/hover:bg-\[#243d5c\]/gi, 'hover:bg-[#491EB8]'],
  [/hover:bg-\[#2F4C73\]/gi, 'hover:bg-[#491EB8]'],
  [/focus:border-\[#4A6B94\]/gi, 'focus:border-[#844FFC]'],
  [/border-\[#2F4C73\]/gi, 'border-[#844FFC]'],
  [/border-\[#4A6B94\]/gi, 'border-[#844FFC]'],

  // Text (keep readable on dark)
  [/text-\[#1C314F\]/gi, 'text-[#F7F7FB]'],
  [/text-\[#2F4C73\]/gi, 'text-[#F7F7FB]'],
  [/text-\[#5A6F86\]/gi, 'text-[#C6C8FD]'],
  [/text-\[#6B7C8F\]/gi, 'text-[#C6C8FD]'],
  [/text-\[#6B8AB0\]/gi, 'text-[#C6C8FD]'],
  [/text-\[#9BB0C9\]/gi, 'text-[#C6C8FD]'],
  [/hover:text-\[#1C314F\]/gi, 'hover:text-[#F7F7FB]'],

  // Borders that read as white/grey lines → invisible
  [/border-\[rgba\(47,\s*76,\s*115,0\.\d+\)\]/g, 'border-transparent'],
  [/border-b border-\[rgba\(47,\s*76,\s*115,0\.\d+\)\]/g, 'border-b border-transparent'],
  [/border-white\/\d+/g, 'border-transparent'],
  [/border-sky-200/g, 'border-transparent'],
  [/border-amber-200/g, 'border-transparent'],
  [/border-orange-200/g, 'border-transparent'],
  [/border-emerald-200/g, 'border-transparent'],
  [/border-rose-200/g, 'border-transparent'],
  [/border-slate-200/g, 'border-transparent'],
  [/border-slate-300/g, 'border-transparent'],

  // Status / alert surfaces → dark, no loud borders
  [/bg-sky-50/g, 'bg-[#1A2238]'],
  [/text-sky-800/g, 'text-[#F7F7FB]'],
  [/text-sky-900/g, 'text-[#F7F7FB]'],
  [/bg-amber-50/g, 'bg-[#151B2E]'],
  [/text-amber-800/g, 'text-[#C6C8FD]'],
  [/text-amber-900/g, 'text-[#C6C8FD]'],
  [/bg-orange-50/g, 'bg-[#1A2238]'],
  [/text-orange-900/g, 'text-[#F7F7FB]'],
  [/bg-emerald-50/g, 'bg-[#1A2238]'],
  [/text-emerald-800/g, 'text-[#F7F7FB]'],
  [/text-emerald-900/g, 'text-[#F7F7FB]'],
  [/bg-rose-50/g, 'bg-[#151B2E]'],
  [/text-rose-600/g, 'text-[#C6C8FD]'],
  [/text-rose-700/g, 'text-[#F7F7FB]'],
  [/text-rose-800/g, 'text-[#F7F7FB]'],
  [/text-rose-900/g, 'text-[#F7F7FB]'],
  [/bg-slate-50/g, 'bg-[#151B2E]'],
  [/bg-slate-100/g, 'bg-[#0D1321]'],
  [/text-slate-700/g, 'text-[#C6C8FD]'],
  [/text-slate-800/g, 'text-[#C6C8FD]'],
  [/hover:bg-rose-50/g, 'hover:bg-[#1A2238]'],

  // White panels → dark surfaces
  [/bg-white(?![/\]])/g, 'bg-[#1A2238]'],
  [/focus:bg-white/g, 'focus:bg-[#1A2238]'],
  [/hover:bg-\[#F8FAFC\]/g, 'hover:bg-[#151B2E]'],
  [/hover:bg-\[#151B2E\]/g, 'hover:bg-[#151B2E]'],
];

let changed = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    let s = fs.readFileSync(file, 'utf8');
    const orig = s;
    for (const [re, rep] of pairs) s = s.replace(re, rep);
    if (s !== orig) {
      fs.writeFileSync(file, s);
      changed += 1;
      console.log('updated', path.relative(path.resolve(__dirname, '../src'), file));
    }
  }
}
console.log('done', changed, 'files');
