import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { getDb, nowIso } from '../db/index.js';
import { writeAudit } from './audit.js';

const SESSION_DAYS = 7;
const SALT_ROUNDS = 12;

export const ROLES = {
  super_admin: 100,
  compliance_lead: 80,
  reviewer: 50,
  viewer: 10,
};

export function roleAtLeast(role, minRole) {
  return (ROLES[role] || 0) >= (ROLES[minRole] || 0);
}

export async function createAdminUser({ email, password, fullName, role = 'reviewer' }) {
  const db = getDb();
  const now = nowIso();
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const result = db
    .prepare(
      `INSERT INTO admin_users (email, password_hash, full_name, role, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, 1, ?, ?)`,
    )
    .run(email.trim().toLowerCase(), hash, fullName, role, now, now);
  return db.prepare(`SELECT id, email, full_name, role, is_active, created_at FROM admin_users WHERE id = ?`).get(
    result.lastInsertRowid,
  );
}

export async function authenticateAdmin(email, password, meta = {}) {
  const db = getDb();
  const user = db
    .prepare(`SELECT * FROM admin_users WHERE email = ? COLLATE NOCASE`)
    .get(String(email || '').trim().toLowerCase());

  if (!user || !user.is_active) {
    writeAudit({
      action: 'admin.login_failed',
      entityType: 'admin_user',
      entityId: email,
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return null;
  }

  const ok = await bcrypt.compare(String(password || ''), user.password_hash);
  if (!ok) {
    writeAudit({
      adminUserId: user.id,
      action: 'admin.login_failed',
      entityType: 'admin_user',
      entityId: String(user.id),
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
    return null;
  }

  const sessionId = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  db.prepare(
    `INSERT INTO admin_sessions (id, admin_user_id, expires_at, ip_address, user_agent, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(sessionId, user.id, expires, meta.ip || null, meta.userAgent || null, nowIso());

  db.prepare(`UPDATE admin_users SET last_login_at = ?, updated_at = ? WHERE id = ?`).run(
    nowIso(),
    nowIso(),
    user.id,
  );

  writeAudit({
    adminUserId: user.id,
    action: 'admin.login',
    entityType: 'admin_user',
    entityId: String(user.id),
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return {
    sessionId,
    expiresAt: expires,
    user: publicAdmin(user),
  };
}

export function publicAdmin(user) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    role: user.role,
  };
}

export function getSessionUser(sessionId) {
  if (!sessionId) return null;
  const db = getDb();
  const row = db
    .prepare(
      `SELECT s.id AS session_id, s.expires_at, u.*
       FROM admin_sessions s
       JOIN admin_users u ON u.id = s.admin_user_id
       WHERE s.id = ? AND u.is_active = 1`,
    )
    .get(sessionId);
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    db.prepare(`DELETE FROM admin_sessions WHERE id = ?`).run(sessionId);
    return null;
  }
  return { sessionId: row.session_id, user: publicAdmin(row) };
}

export function destroySession(sessionId, admin, meta = {}) {
  if (!sessionId) return;
  getDb().prepare(`DELETE FROM admin_sessions WHERE id = ?`).run(sessionId);
  if (admin) {
    writeAudit({
      adminUserId: admin.id,
      action: 'admin.logout',
      entityType: 'admin_user',
      entityId: String(admin.id),
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
    });
  }
}

export function listAdmins() {
  return getDb()
    .prepare(
      `SELECT id, email, full_name, role, is_active, last_login_at, created_at
       FROM admin_users ORDER BY full_name`,
    )
    .all();
}

export function cleanupExpiredSessions() {
  getDb().prepare(`DELETE FROM admin_sessions WHERE expires_at < ?`).run(nowIso());
}
