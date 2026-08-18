import crypto from 'node:crypto';

const ALGO = 'aes-256-gcm';

function getKey() {
  const raw = process.env.KYC_ENCRYPTION_KEY || process.env.SESSION_SECRET || 'dev-only-change-me-go-connectivo-32b';
  return crypto.createHash('sha256').update(String(raw)).digest();
}

/** Encrypt sensitive strings (CNIC / passport). Returns enc:iv:tag:ciphertext hex bundle. */
export function encryptSensitive(plain) {
  if (plain == null || plain === '') return '';
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv);
  const enc = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `enc:${iv.toString('hex')}:${tag.toString('hex')}:${enc.toString('hex')}`;
}

export function decryptSensitive(bundle) {
  if (!bundle) return '';
  if (!String(bundle).startsWith('enc:')) return String(bundle);
  const [, ivHex, tagHex, dataHex] = String(bundle).split(':');
  const decipher = crypto.createDecipheriv(ALGO, getKey(), Buffer.from(ivHex, 'hex'));
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
  const out = Buffer.concat([
    decipher.update(Buffer.from(dataHex, 'hex')),
    decipher.final(),
  ]);
  return out.toString('utf8');
}

/** Mask for list views — never show full CNIC in tables. */
export function maskCnic(value) {
  const v = String(value || '').replace(/\D/g, '');
  if (v.length < 5) return '••••';
  return `${v.slice(0, 5)}-••••••-${v.slice(-1)}`;
}
