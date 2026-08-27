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

/** Dark purple premium — order matters. */
const pairs = [
  // Backgrounds
  [/#0[Ff]0[Ee]47/gi, '#0D1321'],
  [/#070[Aa]14/gi, '#0D1321'],
  [/#080[Bb]16/gi, '#0D1321'],
  [/#0[Cc]111[Ff]/gi, '#0D1321'],
  [/#171[Bb]3[Dd]/gi, '#0D1321'],
  [/#272757/gi, '#151B2E'],
  [/#12182[Aa]/gi, '#151B2E'],
  [/#141[Bb]2[Ee]/gi, '#151B2E'],
  [/#1[Dd]2148/gi, '#151B2E'],
  [/#1[Aa]2238/gi, '#1A2238'],
  [/#252[Aa]59/gi, '#1A2238'],
  [/#505081/gi, '#1A2238'],
  [/#161[Dd]32/gi, '#1A2238'],
  [/#292[Ee]67/gi, '#1A2238'],

  // Old bright accents → purple palette
  [/#8686[Aa][Cc]/gi, '#C6C8FD'],
  [/#5757[Ff][Ff]/gi, '#491EB8'],
  [/#844[Ff][Cc]/gi, '#844FFC'],
  [/#12[Dd]4[Ff]4/gi, '#844FFC'],
  [/#424[Ee][Ee][Aa]/gi, '#844FFC'],
  [/#2[Bb]54[Ff][Ff]/gi, '#491EB8'],
  [/#5[Cc]8[Dd][Ff][Ff]/gi, '#491EB8'],
  [/#6[Bb]9[Ff][Ff][Ff]/gi, '#844FFC'],
  [/#4[Ee][Cc][Bb][Ff][Ff]/gi, '#844FFC'],
  [/#7[Ee][Cc]8[Ff][Ff]/gi, '#C6C8FD'],
  [/#8[Bb][Bb]4[Ff][Ff]/gi, '#BAA1F2'],
  [/#2[Ff]4[Cc]73/gi, '#491EB8'],
  [/#4[Aa]6[Bb]94/gi, '#491EB8'],
  [/#6[Bb]8[Aa][Bb]0/gi, '#BAA1F2'],

  // Text
  [/#F5F5FA/gi, '#F7F7FB'],
  [/#EAF7F7/gi, '#F7F7FB'],
  [/#F2F5FC/gi, '#F7F7FB'],
  [/#9[Dd][Aa]4[Cc]7/gi, '#CBC8D8'],
  [/#9[Aa][Aa]8[Cc]0/gi, '#CBC8D8'],

  // rgba glows
  [/rgba\(134,\s*134,\s*172/g, 'rgba(198, 200, 253'],
  [/rgba\(80,\s*80,\s*129/g, 'rgba(73, 30, 184'],
  [/rgba\(87,\s*87,\s*255/g, 'rgba(132, 79, 252'],
  [/rgba\(92,\s*141,\s*255/g, 'rgba(132, 79, 252'],
  [/rgba\(120,\s*150,\s*220/g, 'rgba(198, 200, 253'],
  [/rgba\(15,\s*14,\s*71/g, 'rgba(13, 19, 33'],
  [/rgba\(13,\s*19,\s*33/g, 'rgba(13, 19, 33'],

  // Gradients (after hex remap)
  [/from-\[#151B2E\] via-\[#1A2238\] to-\[#C6C8FD\]/g, 'from-[#491EB8] via-[#844FFC] to-[#844FFC]'],
  [/from-\[#151B2E\] to-\[#1A2238\]/g, 'from-[#491EB8] to-[#844FFC]'],
  [/via-\[#1A2238\] to-\[#C6C8FD\]/g, 'via-[#844FFC] to-[#844FFC]'],

  // CSS lowercase
  [/#0f0e47/g, '#0d1321'],
  [/#8686ac/g, '#c6c8fd'],
  [/#f5f5fa/g, '#f7f7fb'],
];

let changedFiles = 0;
for (const file of walk(root)) {
  let s = fs.readFileSync(file, 'utf8');
  const orig = s;
  for (const [re, rep] of pairs) s = s.replace(re, rep);
  if (s !== orig) {
    fs.writeFileSync(file, s);
    changedFiles += 1;
    console.log('updated', path.relative(root, file));
  }
}
console.log('done', changedFiles, 'files');
