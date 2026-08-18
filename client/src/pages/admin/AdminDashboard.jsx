import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertTriangle, Search, Trash2 } from 'lucide-react';
import { adminDeleteApplication, adminListApplications, adminStats } from '../../lib/adminApi';
import { useAdminAuth } from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const STATUSES = [
  { value: 'all', label: 'All' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'more_info_required', label: 'More Info Required' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'suspended', label: 'Suspended' },
];

function statusClass(status) {
  const map = {
    submitted: 'bg-sky-50 text-sky-800 border-sky-200',
    under_review: 'bg-amber-50 text-amber-900 border-amber-200',
    more_info_required: 'bg-orange-50 text-orange-900 border-orange-200',
    approved: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    rejected: 'bg-rose-50 text-rose-900 border-rose-200',
    suspended: 'bg-slate-100 text-slate-800 border-slate-300',
  };
  return map[status] || 'bg-slate-50 text-slate-700 border-slate-200';
}

export default function AdminDashboard() {
  const { user } = useAdminAuth();
  const canDelete = ['super_admin', 'compliance_lead'].includes(user?.role);
  const [searchParams, setSearchParams] = useSearchParams();
  const [stats, setStats] = useState(null);
  const [data, setData] = useState({ items: [], pagination: { page: 1, totalPages: 1, total: 0 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const status = searchParams.get('status') || 'all';
  const q = searchParams.get('q') || '';
  const page = Number(searchParams.get('page') || 1);
  const colCount = canDelete ? 8 : 7;

  useEffect(() => {
    adminStats().then((res) => setStats(res.data)).catch(() => {});
  }, [refresh]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    adminListApplications({ status, q, page, pageSize: 15 })
      .then((res) => {
        if (alive) setData(res.data);
      })
      .catch((err) => {
        if (alive) setError(err.message);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [status, q, page, refresh]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all') next.delete(key);
    else next.set(key, value);
    if (key !== 'page') next.delete('page');
    setSearchParams(next);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setError('');
    try {
      await adminDeleteApplication(pendingDelete.kycId);
      setPendingDelete(null);
      setRefresh((n) => n + 1);
    } catch (err) {
      setError(err.message || 'Unable to delete application.');
    } finally {
      setDeleting(false);
    }
  };

  const statusCounts = Object.fromEntries((stats?.byStatus || []).map((s) => [s.status, s.count]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#1C314F]">KYC Applications</h1>
        <p className="mt-1 text-sm text-[#5A6F86]">
          Review call-center onboarding packages submitted via the hidden KYC portal.
        </p>
      </div>

      {stats?.contacts?.unread > 0 ? (
        <Link
          to="/admin/contacts"
          className="block rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900"
        >
          {stats.contacts.unread} new contact {stats.contacts.unread === 1 ? 'message' : 'messages'} waiting in
          Contact inquiries.
        </Link>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total applications" value={stats?.total ?? '—'} />
        <StatCard label="Open risk flags" value={stats?.flagged ?? '—'} accent />
        <StatCard label="Submitted" value={statusCounts.submitted ?? 0} />
        <StatCard label="Under review" value={statusCounts.under_review ?? 0} />
      </div>

      <div className="rounded-2xl border border-[rgba(47,76,115,0.12)] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#6B8AB0]" />
            <input
              defaultValue={q}
              placeholder="Search KYC ID, company, NTN, contact…"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setParam('q', e.currentTarget.value);
              }}
              className="w-full rounded-xl border border-[rgba(47,76,115,0.14)] bg-[#F8FAFC] py-2.5 pr-3 pl-9 text-sm outline-none focus:border-[#4A6B94]"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STATUSES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setParam('status', s.value)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                  status === s.value
                    ? 'bg-[#2F4C73] text-white'
                    : 'bg-[#F4F6F9] text-[#2F4C73] hover:bg-[#EEF3F8]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(47,76,115,0.1)] text-xs uppercase tracking-wide text-[#6B7C8F]">
                <th className="px-2 py-3 font-semibold">KYC ID</th>
                <th className="px-2 py-3 font-semibold">Company</th>
                <th className="px-2 py-3 font-semibold">Contact</th>
                <th className="px-2 py-3 font-semibold">Submitted</th>
                <th className="px-2 py-3 font-semibold">Status</th>
                <th className="px-2 py-3 font-semibold">Risk</th>
                <th className="px-2 py-3 font-semibold">Reviewer</th>
                {canDelete ? (
                  <th className="px-2 py-3 text-center font-semibold">Actions</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={colCount} className="px-2 py-8 text-center text-[#6B7C8F]">
                    Loading applications…
                  </td>
                </tr>
              ) : data.items.length === 0 ? (
                <tr>
                  <td colSpan={colCount} className="px-2 py-8 text-center text-[#6B7C8F]">
                    No applications match these filters.
                  </td>
                </tr>
              ) : (
                data.items.map((row) => (
                  <tr key={row.kycId} className="border-b border-[rgba(47,76,115,0.06)] hover:bg-[#F8FAFC]">
                    <td className="px-2 py-3">
                      <Link
                        to={`/admin/applications/${encodeURIComponent(row.kycId)}`}
                        className="font-semibold text-[#2F4C73] underline-offset-2 hover:underline"
                      >
                        {row.kycId}
                      </Link>
                    </td>
                    <td className="px-2 py-3">
                      <p className="font-medium text-[#1C314F]">{row.companyName}</p>
                      <p className="text-xs text-[#6B7C8F]">{row.operatingName}</p>
                    </td>
                    <td className="px-2 py-3">
                      <p>{row.contactName}</p>
                      <p className="text-xs text-[#6B7C8F]">{row.contactEmail}</p>
                    </td>
                    <td className="px-2 py-3 text-xs text-[#5A6F86]">
                      {new Date(row.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-2 py-3">
                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusClass(row.status)}`}>
                        {row.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      {row.riskFlags?.length ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-800">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          {row.riskFlags.length}
                        </span>
                      ) : (
                        <span className="text-xs text-[#6B7C8F]">—</span>
                      )}
                    </td>
                    <td className="px-2 py-3 text-xs">{row.reviewerName || 'Unassigned'}</td>
                    {canDelete ? (
                      <td className="px-2 py-3 text-center">
                        <button
                          type="button"
                          aria-label={`Delete ${row.kycId}`}
                          onClick={() => setPendingDelete(row)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-[#6B7C8F]">
            {data.pagination.total} result{data.pagination.total === 1 ? '' : 's'}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setParam('page', String(page - 1))}
              className="rounded-lg border border-[rgba(47,76,115,0.14)] px-3 py-1.5 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-2 py-1.5 text-[#5A6F86]">
              {page} / {data.pagination.totalPages}
            </span>
            <button
              type="button"
              disabled={page >= data.pagination.totalPages}
              onClick={() => setParam('page', String(page + 1))}
              className="rounded-lg border border-[rgba(47,76,115,0.14)] px-3 py-1.5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete application"
        message={
          pendingDelete
            ? `Delete ${pendingDelete.kycId}${pendingDelete.companyName ? ` (${pendingDelete.companyName})` : ''}? This cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        danger
        busy={deleting}
        onCancel={() => {
          if (!deleting) setPendingDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${
        accent
          ? 'border-amber-200 bg-amber-50'
          : 'border-[rgba(47,76,115,0.12)] bg-white'
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7C8F]">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-[#1C314F]">{value}</p>
    </div>
  );
}
