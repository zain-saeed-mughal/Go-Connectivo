import { getDb, nowIso } from '../db/index.js';

export function writeAudit({
  adminUserId = null,
  action,
  entityType = null,
  entityId = null,
  applicationId = null,
  ipAddress = null,
  userAgent = null,
  meta = null,
}) {
  const db = getDb();
  db.prepare(
    `INSERT INTO audit_logs
      (admin_user_id, action, entity_type, entity_id, application_id, ip_address, user_agent, meta_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    adminUserId,
    action,
    entityType,
    entityId != null ? String(entityId) : null,
    applicationId,
    ipAddress,
    userAgent,
    meta ? JSON.stringify(meta) : null,
    nowIso(),
  );
}

export function listAuditLogs({ applicationId, limit = 100 } = {}) {
  const db = getDb();
  if (applicationId) {
    return db
      .prepare(
        `SELECT a.*, u.full_name AS admin_name, u.email AS admin_email
         FROM audit_logs a
         LEFT JOIN admin_users u ON u.id = a.admin_user_id
         WHERE a.application_id = ?
         ORDER BY a.id DESC LIMIT ?`,
      )
      .all(applicationId, limit);
  }
  return db
    .prepare(
      `SELECT a.*, u.full_name AS admin_name, u.email AS admin_email
       FROM audit_logs a
       LEFT JOIN admin_users u ON u.id = a.admin_user_id
       ORDER BY a.id DESC LIMIT ?`,
    )
    .all(limit);
}
