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

/** Blue Eclipse palette — order matters (specific before broad). */
const pairs = [
  // Backgrounds → primary darkest
  [/#070[Aa]14/gi, '#0F0E47'],
  [/#080[Bb]16/gi, '#0F0E47'],
  [/#0[Cc]111[Ff]/gi, '#0F0E47'],
  [/#171[Bb]3[Dd]/gi, '#0F0E47'],
  [/#0[Aa]0[Ee]1[Cc]/gi, '#272757'],
  [/#101628/gi, '#272757'],
  [/#12182[Aa]/gi, '#272757'],
  [/#141[Bb]2[Ee]/gi, '#272757'],
  [/#1[Dd]2148/gi, '#272757'],
  [/#1[Cc]314[Ff]/gi, '#272757'],
  [/#243[Cc]5[Cc]/gi, '#272757'],
  [/#243d5c/gi, '#272757'],

  // Surfaces / cards
  [/#161[Dd]32/gi, '#505081'],
  [/#1[Aa]2238/gi, '#505081'],
  [/#252[Aa]59/gi, '#505081'],
  [/#292[Ee]67/gi, '#505081'],

  // Remove bright accent hues → palette
  [/#12[Dd]4[Ff]4/gi, '#8686AC'],
  [/#424[Ee][Ee][Aa]/gi, '#8686AC'],
  [/#5757[Ff][Ff]/gi, '#8686AC'],
  [/#2[Bb]54[Ff][Ff]/gi, '#8686AC'],
  [/#3[Dd]6[Bb][Ff][Ff]/gi, '#8686AC'],
  [/#4[Ee][Cc][Bb][Ff][Ff]/gi, '#8686AC'],
  [/#5[Cc]8[Dd][Ff][Ff]/gi, '#8686AC'],
  [/#6[Bb]9[Ff][Ff][Ff]/gi, '#8686AC'],
  [/#7[Ee][Cc]8[Ff][Ff]/gi, '#8686AC'],
  [/#8[Bb][Bb]4[Ff][Ff]/gi, '#8686AC'],
  [/#9[Ee][Cc]4[Ee][Ff]/gi, '#8686AC'],
  [/#2[Ff]4[Cc]73/gi, '#505081'],
  [/#4[Aa]6[Bb]94/gi, '#505081'],
  [/#6[Bb]8[Aa][Bb]0/gi, '#8686AC'],
  [/#8[Bb][Aa]3[Cc]4/gi, '#8686AC'],

  // Orange brand mark in admin
  [/#F58220/gi, '#8686AC'],
  [/"#F58220"/gi, '"#8686AC"'],

  // Text
  [/#EAF7F7/gi, '#F5F5FA'],
  [/#F2F5FC/gi, '#F5F5FA'],
  [/#f7f9fc/gi, '#F5F5FA'],
  [/#9[Dd][Aa]4[Cc]7/gi, '#8686AC'],
  [/#9[Aa][Aa]8[Cc]0/gi, '#8686AC'],
  [/#B6[Cc]2[Dd]8/gi, '#8686AC'],
  [/#D5[Dd][Ff][Ff]0/gi, '#F5F5FA'],
  [/#6[Bb]7[Cc]8[Ff]/gi, '#8686AC'],
  [/#4[Aa]5[Dd]73/gi, '#8686AC'],
  [/#A8[Bb]6[Cc][Cc]/gi, '#8686AC'],
  [/#8[Bb]9[Bb][Bb]0/gi, '#8686AC'],
  [/#7[Aa]8[Ff][Aa]8/gi, '#8686AC'],
  [/#5[Aa]6[Ff]86/gi, '#8686AC'],
  [/#c5d6ea/gi, '#8686AC'],

  // Light surfaces mistaken as card bg
  [/#EEF3F8/gi, '#505081'],
  [/#E0E5ED/gi, '#505081'],
  [/#F4F6F9/gi, '#272757'],
  [/#E8[Ee][Cc][Ff]2/gi, '#272757'],

  // rgba glows → eclipse accent
  [/rgba\(18,\s*212,\s*244/g, 'rgba(134, 134, 172'],
  [/rgba\(43,\s*84,\s*255/g, 'rgba(134, 134, 172'],
  [/rgba\(87,\s*87,\s*255/g, 'rgba(134, 134, 172'],
  [/rgba\(92,\s*141,\s*255/g, 'rgba(134, 134, 172'],
  [/rgba\(120,\s*150,\s*220/g, 'rgba(134, 134, 172'],
  [/rgba\(107,\s*138,\s*176/g, 'rgba(134, 134, 172'],
  [/rgba\(28,\s*49,\s*79/g, 'rgba(15, 14, 71'],

  // Tailwind gradient shortcuts
  [/from-\[#8686AC\] to-\[#8686AC\]/g, 'from-[#272757] to-[#505081]'],
  [/from-\[#8686AC\] via-\[#8686AC\] to-\[#8686AC\]/g, 'from-[#272757] via-[#505081] to-[#8686AC]'],
  [/via-\[#8686AC\] to-\[#8686AC\]/g, 'via-[#505081] to-[#8686AC]'],

  // CSS lowercase
  [/#2f4c73/g, '#505081'],
  [/#4a6b94/g, '#505081'],
  [/#6b8ab0/g, '#8686AC'],
  [/#1c314f/g, '#272757'],
  [/#5c8dff/g, '#8686AC'],
  [/#9aa8c0/g, '#8686AC'],
  [/#f2f5fc/g, '#F5F5FA'],
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
