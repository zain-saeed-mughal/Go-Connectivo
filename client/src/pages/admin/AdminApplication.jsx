import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Eye,
  FileText,
  Printer,
} from 'lucide-react';
import {
  adminAddNote,
  adminAssign,
  adminExportUrl,
  adminFetchDocumentBlob,
  adminGetApplication,
  adminReviewers,
  adminSetStatus,
} from '../../lib/adminApi';
import { useAdminAuth } from '../../components/admin/AdminLayout';

function Section({ title, children }) {
  return (
    <section className="rounded-2xl border border-[rgba(47,76,115,0.12)] bg-white p-5 shadow-sm">
      <h2 className="mb-4 border-b border-[rgba(47,76,115,0.1)] pb-2 font-display text-lg font-bold text-[#1C314F]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, value }) {
  const display = Array.isArray(value) ? value.join(', ') || '—' : value ?? '—';
  return (
    <div>
      <dt className="text-xs text-[#6B7C8F]">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium break-words text-[#1C314F]">{String(display)}</dd>
    </div>
  );
}

export default function AdminApplication() {
  const { id } = useParams();
  const { user } = useAdminAuth();
  const [app, setApp] = useState(null);
  const [reviewers, setReviewers] = useState([]);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [reviewerId, setReviewerId] = useState('');
  const [busy, setBusy] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  const canDecide = ['super_admin', 'compliance_lead'].includes(user?.role);
  const canAssign = canDecide;
  const canNote = ['super_admin', 'compliance_lead', 'reviewer'].includes(user?.role);

  const load = useCallback(() => {
    return adminGetApplication(id)
      .then((res) => setApp(res.data))
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    load();
    adminReviewers()
      .then((res) => setReviewers(res.data))
      .catch(() => {});
  }, [load]);

  const run = async (fn) => {
    setBusy(true);
    setError('');
    try {
      const res = await fn();
      if (res?.data) setApp(res.data);
      else await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!app && !error) {
    return <p className="text-sm text-[#5A6F86]">Loading application…</p>;
  }
  if (!app) {
    return (
      <div>
        <p className="text-rose-600">{error}</p>
        <Link to="/admin" className="mt-3 inline-block text-sm text-[#2F4C73] underline">
          Back to list
        </Link>
      </div>
    );
  }

  const openDoc = async (doc, download = false) => {
    try {
      const url = await adminFetchDocumentBlob(doc.id, download);
      if (download) {
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.originalName || 'document';
        a.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
        return;
      }
      setPreviewDoc((prev) => {
        if (prev?.objectUrl) URL.revokeObjectURL(prev.objectUrl);
        return { ...doc, url, objectUrl: url };
      });
    } catch (err) {
      setError(err.message || 'Document access failed.');
    }
  };

  return (
    <div className="space-y-5 print:space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3 print:hidden">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1 text-sm text-[#4A6B94] hover:underline">
            <ArrowLeft className="h-4 w-4" />
            All applications
          </Link>
          <h1 className="mt-2 font-display text-2xl font-bold text-[#1C314F]">{app.kycId}</h1>
          <p className="text-sm text-[#5A6F86]">
            {app.company.legalEntityName} · submitted{' '}
            {new Date(app.submittedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={adminExportUrl(app.kycId)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[rgba(47,76,115,0.16)] bg-white px-3 py-2 text-xs font-semibold"
          >
            <Download className="h-3.5 w-3.5" />
            Export JSON
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[rgba(47,76,115,0.16)] bg-white px-3 py-2 text-xs font-semibold"
          >
            <Printer className="h-3.5 w-3.5" />
            Print KYC
          </button>
        </div>
      </div>

      {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700 print:hidden">{error}</p> : null}

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-[rgba(47,76,115,0.16)] bg-white px-3 py-1 font-medium capitalize">
          Status: {app.status.replace(/_/g, ' ')}
        </span>
        <span className="rounded-full border border-[rgba(47,76,115,0.16)] bg-white px-3 py-1">
          Reviewer: {app.reviewer?.fullName || 'Unassigned'}
        </span>
        {app.riskFlags?.map((f) => (
          <span key={f} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-900">
            {f.replace(/_/g, ' ')}
          </span>
        ))}
      </div>

      {/* Actions */}
      <Section title="Review actions">
        <div className="grid gap-4 print:hidden lg:grid-cols-2">
          {canAssign ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Assign reviewer</p>
              <div className="flex gap-2">
                <select
                  value={reviewerId}
                  onChange={(e) => setReviewerId(e.target.value)}
                  className="flex-1 rounded-xl border border-[rgba(47,76,115,0.14)] bg-[#F8FAFC] px-3 py-2 text-sm"
                >
                  <option value="">Select reviewer…</option>
                  {reviewers.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.fullName} ({r.role})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  disabled={!reviewerId || busy}
                  onClick={() => run(() => adminAssign(app.kycId, Number(reviewerId)))}
                  className="rounded-xl bg-[#2F4C73] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                >
                  Assign
                </button>
              </div>
            </div>
          ) : null}

          {canNote ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Add internal note</p>
              <div className="flex gap-2">
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Internal compliance note…"
                  className="flex-1 rounded-xl border border-[rgba(47,76,115,0.14)] bg-[#F8FAFC] px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  disabled={!note.trim() || busy}
                  onClick={() =>
                    run(async () => {
                      const res = await adminAddNote(app.kycId, note.trim());
                      setNote('');
                      return res;
                    })
                  }
                  className="rounded-xl bg-[#2F4C73] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 print:hidden">
          {canNote ? (
            <>
              <ActionBtn
                disabled={busy}
                onClick={() => run(() => adminSetStatus(app.kycId, 'under_review', 'Moved to under review'))}
              >
                Under Review
              </ActionBtn>
              <ActionBtn
                disabled={busy}
                onClick={() =>
                  run(() =>
                    adminSetStatus(app.kycId, 'more_info_required', 'Additional information requested'),
                  )
                }
              >
                Request More Information
              </ActionBtn>
            </>
          ) : null}
          {canDecide ? (
            <>
              <ActionBtn
                disabled={busy}
                className="!bg-emerald-700 !text-white !border-emerald-700"
                onClick={() => run(() => adminSetStatus(app.kycId, 'approved', 'KYC approved'))}
              >
                Approve
              </ActionBtn>
              <ActionBtn
                disabled={busy}
                className="!bg-rose-700 !text-white !border-rose-700"
                onClick={() => run(() => adminSetStatus(app.kycId, 'rejected', 'KYC rejected'))}
              >
                Reject
              </ActionBtn>
              <ActionBtn
                disabled={busy}
                onClick={() => run(() => adminSetStatus(app.kycId, 'suspended', 'Account / interconnect suspended'))}
              >
                Suspend
              </ActionBtn>
            </>
          ) : null}
        </div>
      </Section>

      <Section title="1. Company Information">
        <dl className="grid gap-3 sm:grid-cols-2">
          <Field label="Legal Entity Name" value={app.company.legalEntityName} />
          <Field label="DBA" value={app.company.dba} />
          <Field label="Entity Type" value={app.company.entityType} />
          <Field label="Country & State of Incorporation" value={app.company.countryStateIncorporation} />
          <Field label="Tax ID (EIN/VAT)" value={app.company.taxId} />
          <Field label="FCC 499 Filer ID" value={app.company.fcc499FilerId} />
          <Field label="Website" value={app.company.website} />
          <Field label="City / State / Zip / Country" value={app.company.cityStateZipCountry} />
          <div className="sm:col-span-2">
            <Field label="Physical Business Address" value={app.company.physicalAddress} />
          </div>
        </dl>
      </Section>

      <Section title="2. Primary Contacts">
        <div className="space-y-3">
          {(app.contacts || []).map((row) => (
            <div key={row.roleKey} className="rounded-xl bg-[#F8FAFC] p-3 text-sm">
              <p className="font-semibold text-[#4A6B94]">{row.roleLabel}</p>
              <p>
                {row.name} · {row.title} · {row.email} · {row.phone}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="3. Ultimate Beneficial Ownership">
        <div className="space-y-3">
          {(app.ubos || []).map((u) => (
            <div key={u.id} className="rounded-xl border border-[rgba(47,76,115,0.08)] p-3 text-sm">
              <p className="font-semibold text-[#1C314F]">
                {u.name}, {u.ownershipPercent}% · {u.title}
              </p>
              <p className="text-[#5A6F86]">ID / Passport: {u.idPassport}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="4. Business / Use-Case & Technical Profile">
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Nature of business" value={app.technical?.businessDescription} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Intended use" value={app.technical?.intendedUse} />
          </div>
          <Field label="Customers served" value={app.technical?.customerType} />
          <Field
            label="Resells capacity"
            value={
              app.technical?.resellsCapacity === 'yes'
                ? 'Yes'
                : app.technical?.resellsCapacity === 'no'
                  ? 'No'
                  : app.technical?.resellsCapacity
            }
          />
          <Field
            label="Autodialer campaigns"
            value={
              app.technical?.usesAutodialer === 'yes'
                ? 'Yes'
                : app.technical?.usesAutodialer === 'no'
                  ? 'No'
                  : app.technical?.usesAutodialer
            }
          />
          <Field label="CLI source" value={app.technical?.cliSource} />
          <Field label="Peak concurrent calls" value={app.technical?.peakConcurrentCalls} />
          <Field label="Traffic Profile" value={app.technical?.trafficProfiles} />
          <Field label="Monthly Volume" value={app.technical?.monthlyVolume} />
          <div className="sm:col-span-2">
            <Field label="Originating IPs" value={app.technical?.originatingIps} />
          </div>
          <div className="sm:col-span-2">
            <Field label="Target Destinations" value={app.technical?.targetDestinations} />
          </div>
        </dl>
      </Section>

      <Section title="5. Regulatory & Anti-Fraud Compliance">
        <dl className="grid gap-3 sm:grid-cols-2">
          <Field label="TSR / TCPA / STIR-SHAKEN attestation" value={app.declaration.lawsAttest ? 'Yes' : 'No'} />
          <Field label="No robocalls / spoofing" value={app.declaration.robocallProhibit ? 'Yes' : 'No'} />
          <Field label="Suspension acknowledgement" value={app.declaration.suspendAck ? 'Yes' : 'No'} />
        </dl>
      </Section>

      <Section title="6. Supporting Documents">
        <ul className="space-y-2">
          {app.documents.map((doc) => (
            <li
              key={doc.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[rgba(47,76,115,0.1)] bg-[#F8FAFC] px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#1C314F]">{doc.docLabel}</p>
                <p className="text-xs text-[#6B7C8F]">
                  {doc.originalName} · {(doc.sizeBytes / 1024).toFixed(1)} KB
                  {doc.isSensitive ? ' · sensitive' : ''}
                </p>
              </div>
              <div className="flex gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() => openDoc(doc, false)}
                  className="inline-flex items-center gap-1 rounded-lg border border-[rgba(47,76,115,0.14)] bg-white px-2.5 py-1.5 text-xs font-medium"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => openDoc(doc, true)}
                  className="inline-flex items-center gap-1 rounded-lg border border-[rgba(47,76,115,0.14)] bg-white px-2.5 py-1.5 text-xs font-medium"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="5. Compliance & Sign-Off">
        <dl className="grid gap-3 sm:grid-cols-2">
          <Field label="Authorized Representative" value={app.declaration.authorizedName} />
          <Field label="Title" value={app.declaration.title} />
          <Field label="Date" value={app.declaration.date} />
          <Field label="Laws / TSR / TCPA / STIR-SHAKEN" value={app.declaration.lawsAttest ? 'Yes' : 'No'} />
          <Field label="No robocalls / spoofing" value={app.declaration.robocallProhibit ? 'Yes' : 'No'} />
          <Field label="Suspension acknowledgement" value={app.declaration.suspendAck ? 'Yes' : 'No'} />
        </dl>
      </Section>

      <Section title="Status history">
        <ol className="space-y-2 text-sm">
          {app.statusHistory.map((h) => (
            <li key={h.id} className="rounded-xl bg-[#F8FAFC] px-3 py-2">
              <p className="font-medium text-[#1C314F]">
                {h.fromStatus ? `${h.fromStatus} → ${h.toStatus}` : h.toStatus}
              </p>
              <p className="text-xs text-[#6B7C8F]">
                {new Date(h.createdAt).toLocaleString()}
                {h.changedBy ? ` · ${h.changedBy}` : ' · system'}
                {h.note ? ` · ${h.note}` : ''}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Internal notes">
        {app.notes.length === 0 ? (
          <p className="text-sm text-[#6B7C8F]">No notes yet.</p>
        ) : (
          <ul className="space-y-2">
            {app.notes.map((n) => (
              <li key={n.id} className="rounded-xl border border-[rgba(47,76,115,0.08)] px-3 py-2 text-sm">
                <p>{n.note}</p>
                <p className="mt-1 text-xs text-[#6B7C8F]">
                  {n.authorName} · {new Date(n.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {previewDoc ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <p className="truncate text-sm font-semibold">{previewDoc.docLabel}</p>
              <button
                type="button"
                onClick={() => {
                  if (previewDoc?.objectUrl) URL.revokeObjectURL(previewDoc.objectUrl);
                  setPreviewDoc(null);
                }}
                className="text-sm text-[#4A6B94]"
              >
                Close
              </button>
            </div>
            <div className="min-h-[50vh] flex-1 bg-[#F4F6F9]">
              {previewDoc.mimeType?.startsWith('image/') ? (
                <img src={previewDoc.url} alt="" className="mx-auto max-h-[75vh] object-contain p-4" />
              ) : previewDoc.mimeType === 'application/pdf' ? (
                <iframe title="Document" src={previewDoc.url} className="h-[75vh] w-full" />
              ) : (
                <div className="grid h-64 place-items-center text-sm text-[#5A6F86]">
                  <FileText className="mb-2 h-8 w-8" />
                  Preview not available, use Download
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ActionBtn({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`rounded-xl border border-[rgba(47,76,115,0.16)] bg-white px-3 py-2 text-xs font-semibold text-[#2F4C73] disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
