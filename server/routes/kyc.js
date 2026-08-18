import { Router } from 'express';
import express from 'express';
import { createKycApplication } from '../services/kycService.js';
import { clientMeta } from '../middleware/adminAuth.js';

const router = Router();
router.use(express.json({ limit: '80mb' }));

const CONTACT_KEYS = ['primaryExecutive', 'billing', 'noc', 'compliance'];
const REQUIRED_DOCS = [
  'certificateIncorporation',
  'photoIdOfficer',
  'proofAddress',
  'taxForm',
];

function hasFile(meta) {
  return Boolean(meta?.dataUrl && meta?.name);
}

function validateKycBody(body) {
  if (!body || typeof body !== 'object') return 'Invalid payload.';
  const c = body.company || {};
  if (!c.legalEntityName?.trim()) return 'Legal entity name is required.';
  if (!c.entityType?.trim()) return 'Entity type is required.';
  if (!c.countryStateIncorporation?.trim()) return 'Country & state of incorporation is required.';
  if (!c.taxId?.trim()) return 'Company registration / tax ID is required.';
  if (!c.fcc499FilerId?.trim()) return 'FCC 499 Filer ID is required.';
  if (!c.website?.trim()) return 'Company website is required.';
  if (!c.physicalAddress?.trim() || !c.cityStateZipCountry?.trim()) {
    return 'Physical business address is incomplete.';
  }

  for (const key of CONTACT_KEYS) {
    const row = body.contacts?.[key];
    if (!row?.name?.trim() || !row?.title?.trim() || !row?.email?.trim() || !row?.phone?.trim()) {
      return `Primary contact incomplete: ${key}`;
    }
  }

  const ubos = (body.ubos || []).filter((u) => String(u.name || '').trim());
  if (ubos.length < 1) return 'At least one UBO / controlling officer is required.';
  for (const u of ubos) {
    const pct = Number(u.ownershipPercent);
    if (!u.title?.trim() || !u.idPassport?.trim()) return 'UBO rows are incomplete.';
    if (!Number.isFinite(pct) || pct < 0 || pct > 100) {
      return 'Each UBO ownership must be between 0% and 100%.';
    }
  }

  const t = body.technical || {};
  if (!t.trafficProfiles?.length) return 'Select at least one primary traffic profile.';
  if (
    !t.businessDescription?.trim() ||
    !t.intendedUse?.trim() ||
    !t.customerType?.trim() ||
    !t.resellsCapacity ||
    !t.usesAutodialer ||
    !t.cliSource?.trim() ||
    !t.peakConcurrentCalls?.trim()
  ) {
    return 'Business / use-case fields are incomplete.';
  }
  if (!t.monthlyVolume?.trim() || !t.originatingIps?.trim() || !t.targetDestinations?.trim()) {
    return 'Technical profile fields are incomplete.';
  }

  const comp = body.compliance || {};
  if (!comp.lawsAttest || !comp.robocallProhibit || !comp.suspendAck) {
    return 'All compliance attestations must be accepted.';
  }

  for (const key of REQUIRED_DOCS) {
    if (!hasFile(body.documents?.[key])) {
      return `Required document missing or incomplete: ${key}`;
    }
  }

  const auth = body.authorization || {};
  if (!auth.authorizedName?.trim() || !auth.title?.trim() || !auth.date) {
    return 'Authorization sign-off fields are incomplete.';
  }
  if (!hasFile(auth.signature)) return 'E-signature is required.';

  return null;
}

router.post('/submit', (req, res) => {
  try {
    const err = validateKycBody(req.body);
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }

    const meta = clientMeta(req);
    const created = createKycApplication(req.body, meta);

    console.log('[kyc] Stored application:', {
      kycId: created.kycId,
      company: req.body.company?.legalEntityName,
    });

    return res.status(201).json({
      success: true,
      message: 'KYC application received. Our compliance team will review your submission.',
      data: {
        id: created.kycId,
        kycId: created.kycId,
        status: created.status,
        submittedAt: created.submittedAt,
      },
    });
  } catch (error) {
    console.error('[kyc] Submit failed:', error);
    return res.status(500).json({
      success: false,
      message: error?.message?.includes('Missing file') || error?.message?.includes('Invalid file')
        ? error.message
        : 'Unable to store KYC application. Please try again.',
    });
  }
});

export default router;
