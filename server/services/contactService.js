import { randomUUID } from 'node:crypto';
import { getDb, nowIso } from '../db/index.js';

function mapRow(row) {
  if (!row) return null;
  return {
    id: row.public_id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    subject: row.subject,
    service: row.service || '',
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
    readAt: row.read_at,
    readerName: row.reader_name || null,
  };
}

export function createInquiry({ name, email, phone, subject, service, message, ip, userAgent }) {
  const db = getDb();
  const publicId = `inq_${randomUUID()}`;
  const createdAt = nowIso();

  db.prepare(
    `INSERT INTO contact_inquiries
      (public_id, name, email, phone, subject, service, message, status, submitter_ip, submitter_user_agent, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?)`,
  ).run(
    publicId,
    name,
    email,
    phone || '',
    subject,
    service || '',
    message,
    ip || null,
    userAgent || null,
    createdAt,
  );

  return { id: publicId, createdAt };
}

export function contactStats() {
  const db = getDb();
  const byStatus = db
    .prepare(`SELECT status, COUNT(*) AS count FROM contact_inquiries GROUP BY status`)
    .all();
  const total = db.prepare(`SELECT COUNT(*) AS n FROM contact_inquiries`).get().n;
  const unread = db.prepare(`SELECT COUNT(*) AS n FROM contact_inquiries WHERE status = 'new'`).get().n;
  return { total, unread, byStatus };
}

export function listInquiries({ status, q, page = 1, pageSize = 20 } = {}) {
  const db = getDb();
  const where = [];
  const params = [];

  if (status && status !== 'all') {
    where.push('c.status = ?');
    params.push(status);
  }
  if (q && String(q).trim()) {
    const like = `%${String(q).trim()}%`;
    where.push(
      `(c.public_id LIKE ? OR c.name LIKE ? OR c.email LIKE ? OR c.phone LIKE ? OR c.subject LIKE ? OR c.message LIKE ?)`,
    );
    params.push(like, like, like, like, like, like);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const total = db.prepare(`SELECT COUNT(*) AS n FROM contact_inquiries c ${whereSql}`).get(...params).n;

  const pageNum = Math.max(1, Number(page) || 1);
  const size = Math.min(100, Math.max(1, Number(pageSize) || 20));
  const offset = (pageNum - 1) * size;

  const rows = db
    .prepare(
      `SELECT c.*, u.full_name AS reader_name
       FROM contact_inquiries c
       LEFT JOIN admin_users u ON u.id = c.read_by
       ${whereSql}
       ORDER BY c.created_at DESC
       LIMIT ? OFFSET ?`,
    )
    .all(...params, size, offset);

  return {
    items: rows.map(mapRow),
    pagination: {
      page: pageNum,
      pageSize: size,
      total,
      totalPages: Math.max(1, Math.ceil(total / size)),
    },
  };
}

export function getInquiry(publicId) {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT c.*, u.full_name AS reader_name
       FROM contact_inquiries c
       LEFT JOIN admin_users u ON u.id = c.read_by
       WHERE c.public_id = ?`,
    )
    .get(publicId);
  return mapRow(row);
}

export function markInquiryStatus(publicId, status, adminUser) {
  if (!['new', 'read', 'archived'].includes(status)) {
    throw new Error('Invalid status.');
  }
  const db = getDb();
  const existing = db.prepare(`SELECT * FROM contact_inquiries WHERE public_id = ?`).get(publicId);
  if (!existing) return null;

  const now = nowIso();
  if (status === 'read' || status === 'archived') {
    db.prepare(
      `UPDATE contact_inquiries
       SET status = ?, read_at = COALESCE(read_at, ?), read_by = COALESCE(read_by, ?)
       WHERE public_id = ?`,
    ).run(status, now, adminUser?.id || null, publicId);
  } else {
    db.prepare(
      `UPDATE contact_inquiries SET status = ?, read_at = NULL, read_by = NULL WHERE public_id = ?`,
    ).run(status, publicId);
  }

  return getInquiry(publicId);
}

export function deleteInquiry(publicId) {
  const db = getDb();
  const existing = db.prepare(`SELECT public_id FROM contact_inquiries WHERE public_id = ?`).get(publicId);
  if (!existing) return null;
  db.prepare(`DELETE FROM contact_inquiries WHERE public_id = ?`).run(publicId);
  return { id: publicId };
}
