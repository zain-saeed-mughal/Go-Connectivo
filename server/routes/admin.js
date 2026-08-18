import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { clientMeta, requireAdmin, requireRole } from '../middleware/adminAuth.js';
import {
  authenticateAdmin,
  destroySession,
  getSessionUser,
  listAdmins,
} from '../services/adminAuth.js';
import { writeAudit, listAuditLogs } from '../services/audit.js';
import {
  addReviewNote,
  assignReviewer,
  changeStatus,
  dashboardStats,
  deleteApplication,
  getApplicationDetail,
  getDocumentRow,
  listApplications,
} from '../services/kycService.js';
import {
  contactStats,
  deleteInquiry,
  getInquiry,
  listInquiries,
  markInquiryStatus,
} from '../services/contactService.js';
import { readStoredFile } from '../services/storage.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Try again later.' },
});

const COOKIE = 'gc_admin_session';
const cookieOpts = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.COOKIE_SECURE
    ? process.env.COOKIE_SECURE === 'true'
    : process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required.' });
    }
    const result = await authenticateAdmin(email, password, clientMeta(req));
    if (!result) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    res.cookie(COOKIE, result.sessionId, cookieOpts);
    return res.json({ success: true, data: { user: result.user, expiresAt: result.expiresAt } });
  } catch (error) {
    console.error('[admin] login error', error);
    return res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
  }
});

router.post('/logout', (req, res) => {
  const sessionId = req.cookies?.gc_admin_session;
  try {
    const live = getSessionUser(sessionId);
    destroySession(sessionId, live?.user || null, clientMeta(req));
  } catch {
    /* ignore */
  }
  res.clearCookie(COOKIE, { path: '/' });
  return res.json({ success: true });
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ success: true, data: { user: req.admin } });
});

router.get('/stats', requireAdmin, (req, res) => {
  res.json({ success: true, data: { ...dashboardStats(), contacts: contactStats() } });
});

router.get('/contacts/stats', requireAdmin, (_req, res) => {
  res.json({ success: true, data: contactStats() });
});

router.get('/contacts', requireAdmin, (req, res) => {
  const data = listInquiries({
    status: req.query.status,
    q: req.query.q,
    page: req.query.page,
    pageSize: req.query.pageSize,
  });
  writeAudit({
    adminUserId: req.admin.id,
    action: 'contact.list',
    entityType: 'contact_inquiry',
    ipAddress: clientMeta(req).ip,
    userAgent: clientMeta(req).userAgent,
    meta: { query: req.query },
  });
  res.json({ success: true, data });
});

router.get('/contacts/:id', requireAdmin, (req, res) => {
  const detail = getInquiry(req.params.id);
  if (!detail) return res.status(404).json({ success: false, message: 'Inquiry not found.' });

  writeAudit({
    adminUserId: req.admin.id,
    action: 'contact.view',
    entityType: 'contact_inquiry',
    entityId: detail.id,
    ipAddress: clientMeta(req).ip,
    userAgent: clientMeta(req).userAgent,
  });

  res.json({ success: true, data: detail });
});

router.post('/contacts/:id/status', requireAdmin, requireRole('reviewer'), (req, res) => {
  try {
    const detail = markInquiryStatus(req.params.id, req.body?.status, req.admin);
    if (!detail) return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    writeAudit({
      adminUserId: req.admin.id,
      action: 'contact.status',
      entityType: 'contact_inquiry',
      entityId: detail.id,
      ipAddress: clientMeta(req).ip,
      userAgent: clientMeta(req).userAgent,
      meta: { status: detail.status },
    });
    res.json({ success: true, data: detail });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/contacts/:id', requireAdmin, requireRole('compliance_lead'), (req, res) => {
  const deleted = deleteInquiry(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Inquiry not found.' });
  writeAudit({
    adminUserId: req.admin.id,
    action: 'contact.delete',
    entityType: 'contact_inquiry',
    entityId: deleted.id,
    ipAddress: clientMeta(req).ip,
    userAgent: clientMeta(req).userAgent,
  });
  res.json({ success: true, data: deleted });
});

router.get('/reviewers', requireAdmin, requireRole('reviewer'), (_req, res) => {
  const users = listAdmins().filter((u) => u.is_active && u.role !== 'viewer');
  res.json({
    success: true,
    data: users.map((u) => ({
      id: u.id,
      fullName: u.full_name,
      email: u.email,
      role: u.role,
    })),
  });
});

router.get('/applications', requireAdmin, (req, res) => {
  const data = listApplications({
    status: req.query.status,
    q: req.query.q,
    reviewerId: req.query.reviewerId,
    page: req.query.page,
    pageSize: req.query.pageSize,
  });
  writeAudit({
    adminUserId: req.admin.id,
    action: 'kyc.list',
    entityType: 'kyc_application',
    ipAddress: clientMeta(req).ip,
    userAgent: clientMeta(req).userAgent,
    meta: { query: req.query },
  });
  res.json({ success: true, data });
});

router.get('/applications/:id', requireAdmin, (req, res) => {
  try {
    const reveal = req.query.reveal === '1' && ['super_admin', 'compliance_lead'].includes(req.admin.role);
    const detail = getApplicationDetail(req.params.id, { revealSensitive: reveal });
    if (!detail) return res.status(404).json({ success: false, message: 'Application not found.' });

    writeAudit({
      adminUserId: req.admin.id,
      action: reveal ? 'kyc.view_sensitive' : 'kyc.view',
      entityType: 'kyc_application',
      entityId: detail.kycId,
      applicationId: detail.id,
      ipAddress: clientMeta(req).ip,
      userAgent: clientMeta(req).userAgent,
    });

    res.json({ success: true, data: detail });
  } catch (error) {
    console.error('[admin] application detail error', error);
    res.status(500).json({ success: false, message: 'Unable to load application.' });
  }
});

router.post('/applications/:id/assign', requireAdmin, requireRole('compliance_lead'), (req, res) => {
  try {
    const detail = assignReviewer(req.params.id, req.body?.reviewerId, req.admin, clientMeta(req));
    if (!detail) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.json({ success: true, data: detail });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/applications/:id/notes', requireAdmin, requireRole('reviewer'), (req, res) => {
  const note = String(req.body?.note || '').trim();
  if (note.length < 2) {
    return res.status(400).json({ success: false, message: 'Note is required.' });
  }
  const detail = addReviewNote(req.params.id, note, req.admin, clientMeta(req));
  if (!detail) return res.status(404).json({ success: false, message: 'Application not found.' });
  res.json({ success: true, data: detail });
});

router.delete('/applications/:id', requireAdmin, requireRole('compliance_lead'), (req, res) => {
  try {
    const deleted = deleteApplication(req.params.id, req.admin, clientMeta(req));
    if (!deleted) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.json({ success: true, data: deleted });
  } catch (error) {
    console.error('[admin] delete application error', error);
    res.status(500).json({ success: false, message: 'Unable to delete application.' });
  }
});

router.post('/applications/:id/status', requireAdmin, requireRole('reviewer'), (req, res) => {
  try {
    const { status, note } = req.body || {};
    // Viewers cannot change; reviewers can set under_review / more_info; approve/reject need lead+
    const restricted = ['approved', 'rejected', 'suspended'];
    if (restricted.includes(status) && !['super_admin', 'compliance_lead'].includes(req.admin.role)) {
      return res.status(403).json({ success: false, message: 'Only compliance leads can approve/reject/suspend.' });
    }
    const detail = changeStatus(req.params.id, status, note, req.admin, clientMeta(req));
    if (!detail) return res.status(404).json({ success: false, message: 'Application not found.' });
    res.json({ success: true, data: detail });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/applications/:id/history', requireAdmin, (req, res) => {
  const detail = getApplicationDetail(req.params.id);
  if (!detail) return res.status(404).json({ success: false, message: 'Application not found.' });
  writeAudit({
    adminUserId: req.admin.id,
    action: 'kyc.view_history',
    entityType: 'kyc_application',
    entityId: detail.kycId,
    applicationId: detail.id,
    ipAddress: clientMeta(req).ip,
    userAgent: clientMeta(req).userAgent,
  });
  res.json({ success: true, data: detail.statusHistory });
});

router.get('/documents/:docId', requireAdmin, (req, res) => {
  try {
    const doc = getDocumentRow(Number(req.params.docId));
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found.' });

    if (doc.is_sensitive && !['super_admin', 'compliance_lead', 'reviewer'].includes(req.admin.role)) {
      return res.status(403).json({ success: false, message: 'Sensitive document access denied.' });
    }

    const buf = readStoredFile(doc.storage_path);
    writeAudit({
      adminUserId: req.admin.id,
      action: req.query.download === '1' ? 'kyc.document_download' : 'kyc.document_view',
      entityType: 'kyc_document',
      entityId: String(doc.id),
      applicationId: doc.application_id,
      ipAddress: clientMeta(req).ip,
      userAgent: clientMeta(req).userAgent,
      meta: { docKey: doc.doc_key },
    });

    res.setHeader('Content-Type', doc.mime_type || 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `${req.query.download === '1' ? 'attachment' : 'inline'}; filename="${encodeURIComponent(doc.original_name)}"`,
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'private, no-store');
    return res.send(buf);
  } catch (error) {
    console.error('[admin] document error', error);
    return res.status(404).json({ success: false, message: 'Document unavailable.' });
  }
});

router.get('/applications/:id/export', requireAdmin, (req, res) => {
  const detail = getApplicationDetail(req.params.id, {
    revealSensitive: ['super_admin', 'compliance_lead'].includes(req.admin.role),
  });
  if (!detail) return res.status(404).json({ success: false, message: 'Application not found.' });

  writeAudit({
    adminUserId: req.admin.id,
    action: 'kyc.export',
    entityType: 'kyc_application',
    entityId: detail.kycId,
    applicationId: detail.id,
    ipAddress: clientMeta(req).ip,
    userAgent: clientMeta(req).userAgent,
  });

  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${detail.kycId}.json"`,
  );
  res.send(JSON.stringify(detail, null, 2));
});

router.get('/audit', requireAdmin, requireRole('compliance_lead'), (req, res) => {
  const logs = listAuditLogs({
    applicationId: req.query.applicationId ? Number(req.query.applicationId) : undefined,
    limit: Number(req.query.limit) || 200,
  });
  res.json({ success: true, data: logs });
});

export default router;
