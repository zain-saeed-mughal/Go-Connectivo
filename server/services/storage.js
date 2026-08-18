import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const STORAGE_ROOT = path.resolve(__dirname, '../storage/kyc');

const EXT_MAP = {
  'application/pdf': '.pdf',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

export function ensureStorageRoot() {
  fs.mkdirSync(STORAGE_ROOT, { recursive: true });
}

function parseDataUrl(dataUrl) {
  const match = String(dataUrl || '').match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return { mime: match[1], buffer: Buffer.from(match[2], 'base64') };
}

/**
 * Persist an uploaded KYC document privately. Returns metadata for DB (no binary).
 */
export function saveKycDocumentFile({ applicationId, docKey, fileMeta }) {
  ensureStorageRoot();
  if (!fileMeta?.dataUrl) {
    throw new Error(`Missing file data for ${docKey}`);
  }
  const parsed = parseDataUrl(fileMeta.dataUrl);
  if (!parsed) throw new Error(`Invalid file encoding for ${docKey}`);

  const dir = path.join(STORAGE_ROOT, String(applicationId));
  fs.mkdirSync(dir, { recursive: true });

  const ext =
    EXT_MAP[parsed.mime] ||
    path.extname(fileMeta.name || '') ||
    '.bin';
  const safeKey = String(docKey).replace(/[^\w-]+/g, '_');
  const filename = `${safeKey}-${crypto.randomBytes(8).toString('hex')}${ext}`;
  const abs = path.join(dir, filename);
  fs.writeFileSync(abs, parsed.buffer);

  const storagePath = path.join(String(applicationId), filename);

  return {
    originalName: fileMeta.name || filename,
    mimeType: parsed.mime || fileMeta.type || 'application/octet-stream',
    sizeBytes: parsed.buffer.length,
    storagePath,
  };
}

export function resolveStoragePath(storagePath) {
  const abs = path.resolve(STORAGE_ROOT, storagePath);
  const rel = path.relative(STORAGE_ROOT, abs);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error('Invalid storage path');
  }
  return abs;
}

export function readStoredFile(storagePath) {
  const abs = resolveStoragePath(storagePath);
  if (!fs.existsSync(abs)) throw new Error('File not found on disk');
  return fs.readFileSync(abs);
}

export function removeKycApplicationFiles(applicationId) {
  const abs = path.resolve(STORAGE_ROOT, String(applicationId));
  const rel = path.relative(STORAGE_ROOT, abs);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error('Invalid storage path');
  }
  fs.rmSync(abs, { recursive: true, force: true });
}
