import { createEmptyKycForm } from '../data/kycSchema';

const DRAFT_KEY = 'gc_kyc_draft_v2';

function stripHeavyFiles(form) {
  const next = structuredClone
    ? structuredClone(form)
    : JSON.parse(JSON.stringify(form));

  Object.keys(next.documents || {}).forEach((key) => {
    const doc = next.documents[key];
    if (doc?.dataUrl) {
      next.documents[key] = {
        name: doc.name,
        size: doc.size,
        type: doc.type,
        uploadedAt: doc.uploadedAt,
        needsReupload: true,
      };
    }
  });

  if (next.authorization?.signature?.dataUrl) {
    const s = next.authorization.signature;
    next.authorization.signature = {
      name: s.name,
      size: s.size,
      type: s.type,
      uploadedAt: s.uploadedAt,
      method: s.method,
      needsReupload: true,
    };
  }

  return next;
}

export function loadKycDraft() {
  try {
    // Drop legacy Pakistan-form drafts
    localStorage.removeItem('gc_kyc_draft_v1');

    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return { form: createEmptyKycForm(), stepIndex: 0, savedAt: null };
    const parsed = JSON.parse(raw);
    const empty = createEmptyKycForm();
    let stepIndex = Number.isFinite(parsed.stepIndex) ? parsed.stepIndex : 0;
    const version = parsed.version || 2;
    // v2 drafts had a separate UBO step at index 2
    if (version < 3 && stepIndex >= 2) stepIndex -= 1;
    // v3 had Compliance then Documents; v4 swaps them at indices 3 and 4
    if (version < 4) {
      if (stepIndex === 3) stepIndex = 4;
      else if (stepIndex === 4) stepIndex = 3;
    }
    // v4 had a separate Sign-Off step at index 5; v5 folds it into Compliance
    if (version < 5 && stepIndex >= 5) stepIndex -= 1;
    return {
      form: {
        ...empty,
        ...parsed.form,
        company: { ...empty.company, ...parsed.form?.company },
        contacts: {
          ...empty.contacts,
          ...parsed.form?.contacts,
          primaryExecutive: {
            ...empty.contacts.primaryExecutive,
            ...parsed.form?.contacts?.primaryExecutive,
          },
          billing: { ...empty.contacts.billing, ...parsed.form?.contacts?.billing },
          noc: { ...empty.contacts.noc, ...parsed.form?.contacts?.noc },
          compliance: { ...empty.contacts.compliance, ...parsed.form?.contacts?.compliance },
        },
        technical: { ...empty.technical, ...parsed.form?.technical },
        compliance: { ...empty.compliance, ...parsed.form?.compliance },
        ubos: parsed.form?.ubos?.length ? parsed.form.ubos : empty.ubos,
        documents: { ...empty.documents, ...parsed.form?.documents },
        authorization: { ...empty.authorization, ...parsed.form?.authorization },
      },
      stepIndex,
      savedAt: parsed.savedAt || null,
      filesStripped: Boolean(parsed.filesStripped),
    };
  } catch {
    return { form: createEmptyKycForm(), stepIndex: 0, savedAt: null };
  }
}

export function saveKycDraft(form, stepIndex) {
  const savedAt = new Date().toISOString();
  const payload = { form, stepIndex, savedAt, version: 5, filesStripped: false };

  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    return { savedAt, filesStripped: false };
  } catch {
    const slim = stripHeavyFiles(form);
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        form: slim,
        stepIndex,
        savedAt,
        version: 5,
        filesStripped: true,
      }),
    );
    return { savedAt, filesStripped: true };
  }
}

export function clearKycDraft() {
  localStorage.removeItem(DRAFT_KEY);
  localStorage.removeItem('gc_kyc_draft_v1');
}

export function fileToDraftMeta(file, dataUrl) {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    dataUrl,
    uploadedAt: new Date().toISOString(),
  };
}
