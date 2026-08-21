/** Go Connectivo KYC, form aligned to official Go Connectivo KYC application */

export const KYC_STEPS = [
  { id: 'company', label: 'Company', short: '01' },
  { id: 'contacts', label: 'Contacts', short: '02' },
  { id: 'technical', label: 'Use Case', short: '03' },
  { id: 'documents', label: 'Documents', short: '04' },
  { id: 'compliance', label: 'Compliance', short: '05' },
  { id: 'review', label: 'Review', short: '06' },
  { id: 'submit', label: 'Submit', short: '07' },
];

export const ENTITY_TYPES = ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship'];

export const CONTACT_ROLES = [
  { key: 'primaryExecutive', label: 'Primary Executive' },
  { key: 'billing', label: 'Billing / Accounts Payable' },
  { key: 'noc', label: '24/7 NOC / Technical' },
  { key: 'compliance', label: 'Compliance / Legal' },
];

export const TRAFFIC_PROFILES = [
  'Conversational / Corporate PBX',
  'Call Center / High-Volume Outbound',
  'SMS / A2P Messaging',
  'SIP Trunking Resale',
];

export const CUSTOMER_TYPES = [
  'Own employees / internal PBX',
  'B2B / enterprise clients',
  'B2C / consumers',
  'Wholesale / other carriers',
  'Mixed',
];

export const CLI_SOURCES = [
  'Company-owned DIDs / numbers',
  'Customer-provided caller IDs',
  'Mixed',
];

export const DOCUMENT_TYPES = [
  {
    key: 'certificateIncorporation',
    label: 'Certificate of Incorporation / Business Registration',
    required: true,
  },
  {
    key: 'photoIdOfficer',
    label: 'Government-issued Photo ID (Passport or Driver’s License) of Authorized Officer',
    required: true,
  },
  {
    key: 'proofAddress',
    label: 'Proof of Physical Address (Utility bill or bank statement within last 90 days)',
    required: true,
  },
  {
    key: 'taxForm',
    label: 'W-9 or W-8BEN-E Tax Form',
    required: true,
  },
  {
    key: 'fcc499Cert',
    label: 'FCC 499 Registration Certificate (if applicable)',
    required: false,
  },
];

export const ACCEPTED_UPLOAD =
  'application/pdf,image/jpeg,image/png,image/webp,.pdf,.jpg,.jpeg,.png,.webp';

export const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB

function emptyContact() {
  return { name: '', title: '', email: '', phone: '' };
}

function emptyUbo() {
  return {
    name: '',
    title: '',
    ownershipPercent: '',
    idPassport: '',
  };
}

export function createEmptyKycForm() {
  return {
    company: {
      legalEntityName: '',
      dba: '',
      entityType: '',
      countryStateIncorporation: '',
      taxId: '',
      fcc499FilerId: '',
      website: '',
      physicalAddress: '',
      cityStateZipCountry: '',
    },
    contacts: {
      primaryExecutive: emptyContact(),
      billing: emptyContact(),
      noc: emptyContact(),
      compliance: emptyContact(),
    },
    ubos: [emptyUbo(), emptyUbo()],
    technical: {
      businessDescription: '',
      intendedUse: '',
      customerType: '',
      resellsCapacity: '',
      usesAutodialer: '',
      cliSource: '',
      peakConcurrentCalls: '',
      trafficProfiles: [],
      monthlyVolume: '',
      originatingIps: '',
      targetDestinations: '',
    },
    compliance: {
      lawsAttest: false,
      robocallProhibit: false,
      suspendAck: false,
    },
    documents: DOCUMENT_TYPES.reduce((acc, doc) => {
      acc[doc.key] = null;
      return acc;
    }, {}),
    authorization: {
      authorizedName: '',
      title: '',
      signature: null,
      date: '',
    },
  };
}

export { emptyUbo, emptyContact };

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim());
const req = (v) => String(v || '').trim().length > 0;

export function validateStep(stepId, form) {
  const errors = {};

  if (stepId === 'company') {
    const c = form.company;
    if (!req(c.legalEntityName)) errors.legalEntityName = 'Required';
    if (!req(c.entityType)) errors.entityType = 'Select entity type';
    if (!req(c.countryStateIncorporation)) errors.countryStateIncorporation = 'Required';
    if (!req(c.taxId)) errors.taxId = 'Required';
    if (!req(c.fcc499FilerId)) errors.fcc499FilerId = 'Required';
    if (!req(c.website)) errors.website = 'Required';
    if (!req(c.physicalAddress)) errors.physicalAddress = 'Required';
    if (!req(c.cityStateZipCountry)) errors.cityStateZipCountry = 'Required';
  }

  if (stepId === 'contacts') {
    CONTACT_ROLES.forEach(({ key, label }) => {
      const row = form.contacts[key] || {};
      if (!req(row.name)) errors[`contacts.${key}.name`] = `${label}: name required`;
      if (!req(row.title)) errors[`contacts.${key}.title`] = `${label}: title required`;
      if (!emailOk(row.email)) errors[`contacts.${key}.email`] = `${label}: valid email required`;
      if (!req(row.phone)) errors[`contacts.${key}.phone`] = `${label}: phone required`;
    });

    const filled = (form.ubos || []).filter((row) => req(row.name));
    if (filled.length < 1) {
      errors.ubos = 'List at least one owner (25%+) or controlling officer';
    }
    (form.ubos || []).forEach((row, i) => {
      const any =
        req(row.name) || req(row.title) || req(row.ownershipPercent) || req(row.idPassport);
      if (!any) return;
      if (!req(row.name)) errors[`ubo.${i}.name`] = 'Required';
      if (!req(row.title)) errors[`ubo.${i}.title`] = 'Required';
      if (!req(row.ownershipPercent)) errors[`ubo.${i}.ownershipPercent`] = 'Required';
      const pct = Number(row.ownershipPercent);
      if (Number.isNaN(pct) || pct < 0 || pct > 100) {
        errors[`ubo.${i}.ownershipPercent`] = 'Must be 0–100%';
      }
      if (!req(row.idPassport)) errors[`ubo.${i}.idPassport`] = 'Required';
    });
  }

  if (stepId === 'technical') {
    const t = form.technical;
    if (!req(t.businessDescription)) errors.businessDescription = 'Required';
    if (!req(t.intendedUse)) errors.intendedUse = 'Required';
    if (!req(t.customerType)) errors.customerType = 'Select who you serve';
    if (!req(t.resellsCapacity)) errors.resellsCapacity = 'Required';
    if (!req(t.usesAutodialer)) errors.usesAutodialer = 'Required';
    if (!req(t.cliSource)) errors.cliSource = 'Select CLI source';
    if (!req(t.peakConcurrentCalls)) errors.peakConcurrentCalls = 'Required';
    if (!t.trafficProfiles?.length) errors.trafficProfiles = 'Select at least one use case';
    if (!req(t.monthlyVolume)) errors.monthlyVolume = 'Required';
    if (!req(t.originatingIps)) errors.originatingIps = 'Required';
    if (!req(t.targetDestinations)) errors.targetDestinations = 'Required';
  }

  if (stepId === 'compliance') {
    const c = form.compliance;
    if (!c.lawsAttest) errors.lawsAttest = 'Required';
    if (!c.robocallProhibit) errors.robocallProhibit = 'Required';
    if (!c.suspendAck) errors.suspendAck = 'Required';
    const a = form.authorization;
    if (!req(a.authorizedName)) errors.authorizedName = 'Required';
    if (!req(a.title)) errors.title = 'Required';
    if (!a.signature?.dataUrl) {
      errors.signature = a.signature?.needsReupload
        ? 'Please re-draw or re-upload signature'
        : 'E-signature is required';
    }
    if (!req(a.date)) errors.date = 'Required';
  }

  if (stepId === 'documents') {
    DOCUMENT_TYPES.forEach((doc) => {
      const file = form.documents[doc.key];
      if (doc.required && (!file || !file.dataUrl)) {
        errors[`doc.${doc.key}`] = file?.needsReupload
          ? 'Please re-upload this document (draft restored without file data)'
          : 'Upload required';
      }
    });
  }

  if (stepId === 'review' || stepId === 'submit') {
    [
      'company',
      'contacts',
      'technical',
      'documents',
      'compliance',
    ].forEach((id) => {
      Object.assign(errors, validateStep(id, form));
    });
  }

  return errors;
}

export function stepIsComplete(stepId, form) {
  return Object.keys(validateStep(stepId, form)).length === 0;
}
