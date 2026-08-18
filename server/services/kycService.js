import { getDb, nowIso } from '../db/index.js';
import { decryptSensitive, encryptSensitive, maskCnic } from './crypto.js';
import { removeKycApplicationFiles, saveKycDocumentFile } from './storage.js';
import { writeAudit } from './audit.js';

const CONTACT_ROLES = [
  { key: 'primaryExecutive', label: 'Primary Executive' },
  { key: 'billing', label: 'Billing / Accounts Payable' },
  { key: 'noc', label: '24/7 NOC / Technical' },
  { key: 'compliance', label: 'Compliance / Legal' },
];

const DOC_LABELS = {
  certificateIncorporation: 'Certificate of Incorporation / Business Registration',
  photoIdOfficer: 'Government-issued Photo ID of Authorized Officer',
  proofAddress: 'Proof of Physical Address (last 90 days)',
  taxForm: 'W-9 or W-8BEN-E Tax Form',
  fcc499Cert: 'FCC 499 Registration Certificate',
  signature: 'Authorized Signature',
};

const SENSITIVE_DOCS = new Set(['photoIdOfficer', 'signature']);

export const KYC_STATUSES = [
  'submitted',
  'under_review',
  'more_info_required',
  'approved',
  'rejected',
  'suspended',
];

function j(v) {
  return JSON.stringify(v ?? []);
}

function parseJ(v, fallback = []) {
  try {
    return JSON.parse(v || 'null') ?? fallback;
  } catch {
    return fallback;
  }
}

export function nextKycId(db = getDb()) {
  const year = new Date().getFullYear();
  const row = db.prepare('SELECT last_seq FROM kyc_id_sequence WHERE year = ?').get(year);
  let seq;
  if (!row) {
    db.prepare('INSERT INTO kyc_id_sequence (year, last_seq) VALUES (?, 1)').run(year);
    seq = 1;
  } else {
    seq = row.last_seq + 1;
    db.prepare('UPDATE kyc_id_sequence SET last_seq = ? WHERE year = ?').run(seq, year);
  }
  return `GC-KYC-${year}-${String(seq).padStart(6, '0')}`;
}

export function computeRiskFlags(payload) {
  const flags = [];
  const tech = payload.technical || {};
  const profiles = tech.trafficProfiles || [];
  if (profiles.some((p) => /Call Center|High-Volume|Outbound/i.test(p))) {
    flags.push('high_volume_outbound');
  }
  if (profiles.some((p) => /SMS|A2P/i.test(p))) flags.push('sms_a2p');
  if (profiles.some((p) => /Resale/i.test(p))) flags.push('sip_resale');
  if (tech.resellsCapacity === 'yes') flags.push('resells_capacity');
  if (tech.usesAutodialer === 'yes') flags.push('autodialer');
  if (/B2C|consumers/i.test(String(tech.customerType || ''))) flags.push('b2c_traffic');
  const volume = String(tech.monthlyVolume || '');
  if (/\d{5,}/.test(volume.replace(/[^\d]/g, ''))) flags.push('high_monthly_volume');
  return flags;
}

/**
 * Permanently store a KYC submission (immutable insert — never overwrite).
 */
export function createKycApplication(payload, meta = {}) {
  const db = getDb();
  const created = db.transaction(() => {
    const kycId = nextKycId(db);
    const submittedAt = nowIso();
    const riskFlags = computeRiskFlags(payload);

    const appResult = db
      .prepare(
        `INSERT INTO kyc_applications
          (kyc_id, status, risk_flags, submitter_ip, submitter_user_agent, submitted_at, updated_at)
         VALUES (?, 'submitted', ?, ?, ?, ?, ?)`,
      )
      .run(
        kycId,
        j(riskFlags),
        meta.ip || null,
        meta.userAgent || null,
        submittedAt,
        submittedAt,
      );

    const applicationId = Number(appResult.lastInsertRowid);
    const c = payload.company;
    const t = payload.technical;
    const d = payload.compliance;
    const auth = payload.authorization;

    db.prepare(
      `INSERT INTO kyc_company (
        application_id, legal_entity_name, dba, entity_type, country_state_incorporation,
        tax_id, fcc499_filer_id, website, physical_address, city_state_zip_country
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      applicationId,
      c.legalEntityName,
      c.dba || '',
      c.entityType,
      c.countryStateIncorporation,
      c.taxId,
      c.fcc499FilerId || '',
      c.website,
      c.physicalAddress,
      c.cityStateZipCountry,
    );

    const contactStmt = db.prepare(
      `INSERT INTO kyc_management_contacts
        (application_id, role_key, role_label, contact_name, title, phone, email)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    );
    CONTACT_ROLES.forEach(({ key, label }) => {
      const row = payload.contacts[key];
      contactStmt.run(
        applicationId,
        key,
        label,
        row.name,
        row.title || '',
        row.phone,
        row.email,
      );
    });

    db.prepare(
      `INSERT INTO kyc_technical (
        application_id, business_description, intended_use, customer_type, resells_capacity,
        uses_autodialer, cli_source, peak_concurrent_calls,
        traffic_profiles, monthly_volume, originating_ips, target_destinations
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      applicationId,
      t.businessDescription || '',
      t.intendedUse || '',
      t.customerType || '',
      t.resellsCapacity || '',
      t.usesAutodialer || '',
      t.cliSource || '',
      t.peakConcurrentCalls || '',
      j(t.trafficProfiles),
      t.monthlyVolume,
      t.originatingIps,
      t.targetDestinations,
    );

    const uboStmt = db.prepare(
      `INSERT INTO kyc_ubos
        (application_id, sort_order, name, title, ownership_percent, id_passport_enc)
       VALUES (?, ?, ?, ?, ?, ?)`,
    );
    (payload.ubos || [])
      .filter((u) => String(u.name || '').trim())
      .forEach((u, i) => {
        uboStmt.run(
          applicationId,
          i,
          u.name,
          u.title || '',
          Number(u.ownershipPercent),
          encryptSensitive(u.idPassport),
        );
      });

    const docInsert = db.prepare(
      `INSERT INTO kyc_documents
        (application_id, doc_key, doc_label, original_name, mime_type, size_bytes, storage_path, is_sensitive, uploaded_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );

    let signatureDocId = null;
    const docs = { ...(payload.documents || {}) };
    if (auth?.signature) docs.signature = auth.signature;

    Object.entries(docs).forEach(([docKey, fileMeta]) => {
      if (!fileMeta) return;
      const saved = saveKycDocumentFile({ applicationId, docKey, fileMeta });
      const result = docInsert.run(
        applicationId,
        docKey,
        DOC_LABELS[docKey] || docKey,
        saved.originalName,
        saved.mimeType,
        saved.sizeBytes,
        saved.storagePath,
        SENSITIVE_DOCS.has(docKey) ? 1 : 0,
        submittedAt,
      );
      if (docKey === 'signature') signatureDocId = Number(result.lastInsertRowid);
    });

    db.prepare(
      `INSERT INTO kyc_declarations (
        application_id, laws_attest, robocall_prohibit, suspend_ack, authorized_name, title,
        declaration_date, signature_document_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      applicationId,
      d.lawsAttest ? 1 : 0,
      d.robocallProhibit ? 1 : 0,
      d.suspendAck ? 1 : 0,
      auth.authorizedName,
      auth.title,
      auth.date,
      signatureDocId,
    );

    db.prepare(
      `INSERT INTO kyc_status_history
        (application_id, from_status, to_status, changed_by, note, created_at)
       VALUES (?, NULL, 'submitted', NULL, 'Application received via /kyc portal', ?)`,
    ).run(applicationId, submittedAt);

    return {
      applicationId,
      kycId,
      status: 'submitted',
      submittedAt,
      riskFlags,
    };
  })();

  writeAudit({
    action: 'kyc.submit',
    entityType: 'kyc_application',
    entityId: created.kycId,
    applicationId: created.applicationId,
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
    meta: { riskFlags: created.riskFlags },
  });

  return created;
}

function mapListRow(row) {
  return {
    id: row.id,
    kycId: row.kyc_id,
    status: row.status,
    riskFlags: parseJ(row.risk_flags, []),
    companyName: row.legal_entity_name,
    operatingName: row.dba,
    contactName: row.primary_name,
    contactEmail: row.primary_email,
    contactMobile: row.primary_phone,
    ntn: row.tax_id,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
    reviewerId: row.assigned_reviewer_id,
    reviewerName: row.reviewer_name || null,
  };
}

export function listApplications({
  status,
  q,
  reviewerId,
  page = 1,
  pageSize = 20,
} = {}) {
  const db = getDb();
  const where = [];
  const params = [];

  if (status && status !== 'all') {
    where.push('a.status = ?');
    params.push(status);
  }
  if (reviewerId) {
    where.push('a.assigned_reviewer_id = ?');
    params.push(Number(reviewerId));
  }
  if (q && String(q).trim()) {
    where.push(
      `(a.kyc_id LIKE ? OR c.legal_entity_name LIKE ? OR c.dba LIKE ? OR c.tax_id LIKE ? OR p.contact_name LIKE ? OR p.email LIKE ?)`,
    );
    const like = `%${String(q).trim()}%`;
    params.push(like, like, like, like, like, like);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const total = db
    .prepare(
      `SELECT COUNT(*) AS n
       FROM kyc_applications a
       LEFT JOIN kyc_company c ON c.application_id = a.id
       LEFT JOIN kyc_management_contacts p
         ON p.application_id = a.id AND p.role_key = 'primaryExecutive'
       ${whereSql}`,
    )
    .get(...params).n;

  const pageNum = Math.max(1, Number(page) || 1);
  const size = Math.min(100, Math.max(1, Number(pageSize) || 20));
  const offset = (pageNum - 1) * size;

  const rows = db
    .prepare(
      `SELECT a.*, c.legal_entity_name, c.dba, c.tax_id,
              p.contact_name AS primary_name, p.email AS primary_email, p.phone AS primary_phone,
              u.full_name AS reviewer_name
       FROM kyc_applications a
       LEFT JOIN kyc_company c ON c.application_id = a.id
       LEFT JOIN kyc_management_contacts p
         ON p.application_id = a.id AND p.role_key = 'primaryExecutive'
       LEFT JOIN admin_users u ON u.id = a.assigned_reviewer_id
       ${whereSql}
       ORDER BY a.submitted_at DESC
       LIMIT ? OFFSET ?`,
    )
    .all(...params, size, offset);

  return {
    items: rows.map(mapListRow),
    pagination: {
      page: pageNum,
      pageSize: size,
      total,
      totalPages: Math.max(1, Math.ceil(total / size)),
    },
  };
}

export function getApplicationDetail(idOrKycId, { revealSensitive = false } = {}) {
  const db = getDb();
  const app =
    db.prepare(`SELECT * FROM kyc_applications WHERE id = ? OR kyc_id = ?`).get(idOrKycId, idOrKycId);
  if (!app) return null;

  const company = db.prepare(`SELECT * FROM kyc_company WHERE application_id = ?`).get(app.id);
  const contacts = db
    .prepare(`SELECT * FROM kyc_management_contacts WHERE application_id = ? ORDER BY id`)
    .all(app.id);
  const technical = db.prepare(`SELECT * FROM kyc_technical WHERE application_id = ?`).get(app.id);
  const ubos = db
    .prepare(`SELECT * FROM kyc_ubos WHERE application_id = ? ORDER BY sort_order, id`)
    .all(app.id);
  const documents = db
    .prepare(`SELECT * FROM kyc_documents WHERE application_id = ? ORDER BY id`)
    .all(app.id);
  const declaration = db
    .prepare(`SELECT * FROM kyc_declarations WHERE application_id = ?`)
    .get(app.id);
  const history = db
    .prepare(
      `SELECT h.*, u.full_name AS changed_by_name
       FROM kyc_status_history h
       LEFT JOIN admin_users u ON u.id = h.changed_by
       WHERE h.application_id = ?
       ORDER BY h.id ASC`,
    )
    .all(app.id);
  const notes = db
    .prepare(
      `SELECT n.*, u.full_name AS author_name, u.email AS author_email
       FROM kyc_review_notes n
       JOIN admin_users u ON u.id = n.admin_user_id
       WHERE n.application_id = ?
       ORDER BY n.id DESC`,
    )
    .all(app.id);
  const reviewerRow = app.assigned_reviewer_id
    ? db
        .prepare(`SELECT id, full_name, email, role FROM admin_users WHERE id = ?`)
        .get(app.assigned_reviewer_id)
    : null;

  return {
    id: app.id,
    kycId: app.kyc_id,
    status: app.status,
    riskFlags: parseJ(app.risk_flags, []),
    submittedAt: app.submitted_at,
    updatedAt: app.updated_at,
    submitterIp: app.submitter_ip,
    reviewer: reviewerRow
      ? {
          id: reviewerRow.id,
          fullName: reviewerRow.full_name,
          email: reviewerRow.email,
          role: reviewerRow.role,
        }
      : null,
    company: {
      legalEntityName: company?.legal_entity_name || '',
      dba: company?.dba || '',
      entityType: company?.entity_type || '',
      countryStateIncorporation: company?.country_state_incorporation || '',
      taxId: company?.tax_id || '',
      fcc499FilerId: company?.fcc499_filer_id || '',
      website: company?.website || '',
      physicalAddress: company?.physical_address || '',
      cityStateZipCountry: company?.city_state_zip_country || '',
    },
    contacts: contacts.map((r) => ({
      roleKey: r.role_key,
      roleLabel: r.role_label,
      name: r.contact_name,
      title: r.title,
      phone: r.phone,
      email: r.email,
    })),
    technical: {
      businessDescription: technical?.business_description || '',
      intendedUse: technical?.intended_use || '',
      customerType: technical?.customer_type || '',
      resellsCapacity: technical?.resells_capacity || '',
      usesAutodialer: technical?.uses_autodialer || '',
      cliSource: technical?.cli_source || '',
      peakConcurrentCalls: technical?.peak_concurrent_calls || '',
      trafficProfiles: parseJ(technical?.traffic_profiles),
      monthlyVolume: technical?.monthly_volume || '',
      originatingIps: technical?.originating_ips || '',
      targetDestinations: technical?.target_destinations || '',
    },
    ubos: ubos.map((u) => ({
      id: u.id,
      name: u.name,
      title: u.title,
      ownershipPercent: u.ownership_percent,
      idPassport: revealSensitive
        ? decryptSensitive(u.id_passport_enc)
        : maskCnic(decryptSensitive(u.id_passport_enc)),
    })),
    documents: documents.map((d) => ({
      id: d.id,
      docKey: d.doc_key,
      docLabel: d.doc_label,
      originalName: d.original_name,
      mimeType: d.mime_type,
      sizeBytes: d.size_bytes,
      isSensitive: Boolean(d.is_sensitive),
      uploadedAt: d.uploaded_at,
    })),
    declaration: {
      lawsAttest: Boolean(declaration?.laws_attest),
      robocallProhibit: Boolean(declaration?.robocall_prohibit),
      suspendAck: Boolean(declaration?.suspend_ack),
      authorizedName: declaration?.authorized_name || '',
      title: declaration?.title || '',
      date: declaration?.declaration_date || '',
      signatureDocumentId: declaration?.signature_document_id || null,
    },
    statusHistory: history.map((h) => ({
      id: h.id,
      fromStatus: h.from_status,
      toStatus: h.to_status,
      note: h.note,
      changedBy: h.changed_by_name,
      createdAt: h.created_at,
    })),
    notes: notes.map((n) => ({
      id: n.id,
      note: n.note,
      isInternal: Boolean(n.is_internal),
      authorName: n.author_name,
      authorEmail: n.author_email,
      createdAt: n.created_at,
    })),
  };
}

export function getDocumentRow(docId) {
  return getDb().prepare(`SELECT * FROM kyc_documents WHERE id = ?`).get(docId);
}

export function assignReviewer(applicationId, reviewerId, admin, meta) {
  const db = getDb();
  const app = db.prepare(`SELECT * FROM kyc_applications WHERE id = ? OR kyc_id = ?`).get(applicationId, applicationId);
  if (!app) return null;
  const reviewer = db
    .prepare(`SELECT id, full_name FROM admin_users WHERE id = ? AND is_active = 1`)
    .get(reviewerId);
  if (!reviewer) throw new Error('Reviewer not found');

  const now = nowIso();
  const nextStatus = app.status === 'submitted' ? 'under_review' : app.status;
  db.prepare(
    `UPDATE kyc_applications SET assigned_reviewer_id = ?, status = ?, updated_at = ? WHERE id = ?`,
  ).run(reviewer.id, nextStatus, now, app.id);

  if (nextStatus !== app.status) {
    db.prepare(
      `INSERT INTO kyc_status_history (application_id, from_status, to_status, changed_by, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    ).run(app.id, app.status, nextStatus, admin.id, `Assigned to ${reviewer.full_name}`, now);
  }

  writeAudit({
    adminUserId: admin.id,
    action: 'kyc.assign_reviewer',
    entityType: 'kyc_application',
    entityId: app.kyc_id,
    applicationId: app.id,
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
    meta: { reviewerId: reviewer.id },
  });

  return getApplicationDetail(app.id);
}

export function addReviewNote(applicationId, note, admin, meta) {
  const db = getDb();
  const app = db.prepare(`SELECT * FROM kyc_applications WHERE id = ? OR kyc_id = ?`).get(applicationId, applicationId);
  if (!app) return null;
  const now = nowIso();
  db.prepare(
    `INSERT INTO kyc_review_notes (application_id, admin_user_id, note, is_internal, created_at)
     VALUES (?, ?, ?, 1, ?)`,
  ).run(app.id, admin.id, note, now);
  db.prepare(`UPDATE kyc_applications SET updated_at = ? WHERE id = ?`).run(now, app.id);

  writeAudit({
    adminUserId: admin.id,
    action: 'kyc.add_note',
    entityType: 'kyc_application',
    entityId: app.kyc_id,
    applicationId: app.id,
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
  });

  return getApplicationDetail(app.id);
}

export function changeStatus(applicationId, toStatus, note, admin, meta) {
  if (!KYC_STATUSES.includes(toStatus)) throw new Error('Invalid status');
  const db = getDb();
  const app = db.prepare(`SELECT * FROM kyc_applications WHERE id = ? OR kyc_id = ?`).get(applicationId, applicationId);
  if (!app) return null;
  if (app.status === toStatus && !note) return getApplicationDetail(app.id);

  const now = nowIso();
  db.prepare(`UPDATE kyc_applications SET status = ?, updated_at = ? WHERE id = ?`).run(
    toStatus,
    now,
    app.id,
  );
  db.prepare(
    `INSERT INTO kyc_status_history (application_id, from_status, to_status, changed_by, note, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(app.id, app.status, toStatus, admin.id, note || null, now);

  writeAudit({
    adminUserId: admin.id,
    action: `kyc.status.${toStatus}`,
    entityType: 'kyc_application',
    entityId: app.kyc_id,
    applicationId: app.id,
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
    meta: { from: app.status, to: toStatus, note },
  });

  return getApplicationDetail(app.id);
}

export function deleteApplication(applicationId, admin, meta = {}) {
  const db = getDb();
  const app = db.prepare(`SELECT * FROM kyc_applications WHERE id = ? OR kyc_id = ?`).get(
    applicationId,
    applicationId,
  );
  if (!app) return null;

  const company = db.prepare(`SELECT legal_entity_name FROM kyc_company WHERE application_id = ?`).get(app.id);

  const run = db.transaction(() => {
    db.prepare(`UPDATE kyc_declarations SET signature_document_id = NULL WHERE application_id = ?`).run(app.id);
    db.prepare(`DELETE FROM kyc_review_notes WHERE application_id = ?`).run(app.id);
    db.prepare(`DELETE FROM kyc_status_history WHERE application_id = ?`).run(app.id);
    db.prepare(`DELETE FROM kyc_documents WHERE application_id = ?`).run(app.id);
    db.prepare(`DELETE FROM kyc_ubos WHERE application_id = ?`).run(app.id);
    db.prepare(`DELETE FROM kyc_technical WHERE application_id = ?`).run(app.id);
    db.prepare(`DELETE FROM kyc_management_contacts WHERE application_id = ?`).run(app.id);
    db.prepare(`DELETE FROM kyc_declarations WHERE application_id = ?`).run(app.id);
    db.prepare(`DELETE FROM kyc_company WHERE application_id = ?`).run(app.id);
    db.prepare(`UPDATE audit_logs SET application_id = NULL WHERE application_id = ?`).run(app.id);
    db.prepare(`DELETE FROM kyc_applications WHERE id = ?`).run(app.id);
  });
  run();

  try {
    removeKycApplicationFiles(app.id);
  } catch {
    /* files optional */
  }

  writeAudit({
    adminUserId: admin.id,
    action: 'kyc.delete',
    entityType: 'kyc_application',
    entityId: app.kyc_id,
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
    meta: { companyName: company?.legal_entity_name || null },
  });

  return { id: app.id, kycId: app.kyc_id };
}

export function dashboardStats() {
  const db = getDb();
  const byStatus = db
    .prepare(`SELECT status, COUNT(*) AS count FROM kyc_applications GROUP BY status`)
    .all();
  const total = db.prepare(`SELECT COUNT(*) AS n FROM kyc_applications`).get().n;
  const flagged = db
    .prepare(
      `SELECT COUNT(*) AS n FROM kyc_applications WHERE risk_flags != '[]' AND status NOT IN ('approved', 'rejected')`,
    )
    .get().n;
  return { total, flagged, byStatus };
}
