/**
 * One-off asset pass: re-encodes every raster in src/assets to WebP, capped at
 * 1600px wide. Run with `npm run optimize:images` after adding new artwork.
 */
import { readdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(rootDir, 'src', 'assets');
const srcDir = path.join(rootDir, 'src');
const RASTER = new Set(['.png', '.jpg', '.jpeg']);
const MAX_WIDTH = 1600;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : Promise.resolve([full]);
    }),
  );
  return files.flat();
}

async function convert() {
  const files = (await walk(assetsDir)).filter((f) =>
    RASTER.has(path.extname(f).toLowerCase()),
  );

  let before = 0;
  let after = 0;
  const renames = new Map();

  for (const file of files) {
    const { size } = await stat(file);
    const target = file.replace(/\.(png|jpe?g)$/i, '.webp');

    const image = sharp(file);
    const meta = await image.metadata();
    if (meta.width && meta.width > MAX_WIDTH) image.resize({ width: MAX_WIDTH });

    await image.webp({ quality: 80, effort: 6 }).toFile(target);

    const { size: newSize } = await stat(target);
    before += size;
    after += newSize;
    await unlink(file);

    renames.set(path.basename(file), path.basename(target));
    console.log(
      `${path.relative(rootDir, file)}  ${(size / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB`,
    );
  }

  return { before, after, renames };
}

async function rewriteImports(renames) {
  const sources = (await walk(srcDir)).filter((f) =>
    ['.js', '.jsx', '.css'].includes(path.extname(f).toLowerCase()),
  );

  for (const file of sources) {
    const original = await readFile(file, 'utf8');
    let updated = original;

    for (const [from, to] of renames) {
      if (updated.includes(from)) updated = updated.split(from).join(to);
    }

    if (updated !== original) {
      await writeFile(file, updated, 'utf8');
      console.log(`updated imports: ${path.relative(rootDir, file)}`);
    }
  }
}

const { before, after, renames } = await convert();
await rewriteImports(renames);

console.log(
  `\nTotal: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB ` +
    `(${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
);
