import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (/\.(jsx?|tsx?|css)$/.test(e.name)) files.push(p);
  }
  return files;
}

const files = await walk(root);
const importRe = /from\s+['"](\.[^'"]+)['"]/g;
const missing = [];

for (const file of files) {
  const text = await readFile(file, 'utf8');
  let m;
  while ((m = importRe.exec(text))) {
    const rel = m[1];
    const base = path.dirname(file);
    const candidates = [
      path.resolve(base, rel),
      path.resolve(base, `${rel}.js`),
      path.resolve(base, `${rel}.jsx`),
      path.resolve(base, `${rel}.css`),
      path.resolve(base, `${rel}.webp`),
      path.resolve(base, `${rel}.mp4`),
      path.resolve(base, rel, 'index.js'),
      path.resolve(base, rel, 'index.jsx'),
    ];
    let ok = false;
    for (const c of candidates) {
      try {
        await access(c);
        ok = true;
        break;
      } catch {
        /* continue */
      }
    }
    if (!ok) missing.push(`${path.relative(root, file)} -> ${rel}`);
  }
}

if (missing.length === 0) {
  console.log(`OK: all relative imports resolve (${files.length} files)`);
} else {
  console.log(`Missing: ${missing.length}`);
  for (const line of missing) console.log(line);
  process.exitCode = 1;
}
