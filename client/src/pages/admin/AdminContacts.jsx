import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Archive, Mail, MailOpen, Search, Trash2 } from 'lucide-react';
import {
  adminDeleteContact,
  adminListContacts,
  adminSetContactStatus,
  adminStats,
} from '../../lib/adminApi';
import { useAdminAuth } from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const STATUSES = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'archived', label: 'Archived' },
];

function statusClass(status) {
  const map = {
    new: 'bg-sky-50 text-sky-800 border-sky-200',
    read: 'bg-slate-50 text-slate-700 border-slate-200',
    archived: 'bg-amber-50 text-amber-900 border-amber-200',
  };
  return map[status] || 'bg-slate-50 text-slate-700 border-slate-200';
}

export default function AdminContacts() {
  const { user } = useAdminAuth();
  const canWrite = ['super_admin', 'compliance_lead', 'reviewer'].includes(user?.role);
  const canDelete = ['super_admin', 'compliance_lead'].includes(user?.role);
  const [searchParams, setSearchParams] = useSearchParams();
  const [stats, setStats] = useState(null);
  const [data, setData] = useState({ items: [], pagination: { page: 1, totalPages: 1, total: 0 } });
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const status = searchParams.get('status') || 'all';
  const q = searchParams.get('q') || '';
  const page = Number(searchParams.get('page') || 1);

  useEffect(() => {
    adminStats()
      .then((res) => setStats(res.data?.contacts || null))
      .catch(() => {});
  }, [refresh]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    adminListContacts({ status, q, page, pageSize: 20 })
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

  const openInquiry = async (row) => {
    setSelected(row);
    if (canWrite && row.status === 'new') {
      try {
        const res = await adminSetContactStatus(row.id, 'read');
        setSelected(res.data);
        setData((prev) => ({
          ...prev,
          items: prev.items.map((item) => (item.id === row.id ? res.data : item)),
        }));
        setStats((prev) =>
          prev
            ? {
                ...prev,
                unread: Math.max(0, (prev.unread || 1) - 1),
                byStatus: (prev.byStatus || []).map((s) => {
                  if (s.status === 'new') return { ...s, count: Math.max(0, s.count - 1) };
                  if (s.status === 'read') return { ...s, count: (s.count || 0) + 1 };
                  return s;
                }),
              }
            : prev,
        );
      } catch {
        /* viewing still allowed */
      }
    }
  };

  const setStatus = async (id, nextStatus) => {
    try {
      const res = await adminSetContactStatus(id, nextStatus);
      setSelected(res.data);
      setRefresh((n) => n + 1);
    } catch (err) {
      setError(err.message || 'Unable to update this message.');
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setError('');
    try {
      await adminDeleteContact(pendingDelete.id);
      if (selected?.id === pendingDelete.id) setSelected(null);
      setPendingDelete(null);
      setRefresh((n) => n + 1);
    } catch (err) {
      setError(err.message || 'Unable to delete this message.');
    } finally {
      setDeleting(false);
    }
  };

  const statusCounts = Object.fromEntries((stats?.byStatus || []).map((s) => [s.status, s.count]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#1C314F]">Contact inquiries</h1>
        <p className="mt-1 text-sm text-[#5A6F86]">
          Messages submitted from the public contact form.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Total messages" value={stats?.total ?? '—'} />
        <StatCard label="New" value={statusCounts.new ?? stats?.unread ?? 0} accent />
        <StatCard label="Read" value={statusCounts.read ?? 0} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
        <div className="rounded-2xl border border-[rgba(47,76,115,0.12)] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#6B8AB0]" />
              <input
                defaultValue={q}
                placeholder="Search name, email, subject…"
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
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[rgba(47,76,115,0.1)] text-xs uppercase tracking-wide text-[#6B7C8F]">
                  <th className="px-2 py-3 font-semibold">Received</th>
                  <th className="px-2 py-3 font-semibold">Name</th>
                  <th className="px-2 py-3 font-semibold">Email</th>
                  <th className="px-2 py-3 font-semibold">Subject</th>
                  <th className="px-2 py-3 font-semibold">Status</th>
                  {canDelete ? (
                    <th className="px-2 py-3 text-center font-semibold">Actions</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={canDelete ? 6 : 5} className="px-2 py-8 text-center text-[#6B7C8F]">
                      Loading messages…
                    </td>
                  </tr>
                ) : data.items.length === 0 ? (
                  <tr>
                    <td colSpan={canDelete ? 6 : 5} className="px-2 py-8 text-center text-[#6B7C8F]">
                      No contact messages yet.
                    </td>
                  </tr>
                ) : (
                  data.items.map((row) => (
                    <tr
                      key={row.id}
                      className={`cursor-pointer border-b border-[rgba(47,76,115,0.06)] hover:bg-[#F8FAFC] ${
                        selected?.id === row.id ? 'bg-[#F4F7FB]' : ''
                      } ${row.status === 'new' ? 'font-semibold' : ''}`}
                      onClick={() => openInquiry(row)}
                    >
                      <td className="px-2 py-3 text-xs text-[#5A6F86]">
                        {new Date(row.createdAt).toLocaleString()}
                      </td>
                      <td className="px-2 py-3 text-[#1C314F]">{row.name}</td>
                      <td className="px-2 py-3 text-[#5A6F86]">{row.email}</td>
                      <td className="px-2 py-3">{row.subject}</td>
                      <td className="px-2 py-3">
                        <span
                          className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusClass(row.status)}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      {canDelete ? (
                        <td className="px-2 py-3 text-center">
                          <button
                            type="button"
                            aria-label={`Delete message from ${row.name}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              setPendingDelete(row);
                            }}
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

        <aside className="rounded-2xl border border-[rgba(47,76,115,0.12)] bg-white p-4 shadow-sm">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B8AB0]">
                    Message
                  </p>
                  <h2 className="mt-1 font-display text-lg font-bold text-[#1C314F]">{selected.subject}</h2>
                </div>
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusClass(selected.status)}`}
                >
                  {selected.status}
                </span>
              </div>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-xs text-[#6B7C8F]">From</dt>
                  <dd className="font-medium text-[#1C314F]">{selected.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#6B7C8F]">Email</dt>
                  <dd>
                    <a className="text-[#2F4C73] underline-offset-2 hover:underline" href={`mailto:${selected.email}`}>
                      {selected.email}
                    </a>
                  </dd>
                </div>
                {selected.phone ? (
                  <div>
                    <dt className="text-xs text-[#6B7C8F]">Phone</dt>
                    <dd>{selected.phone}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs text-[#6B7C8F]">Received</dt>
                  <dd>{new Date(selected.createdAt).toLocaleString()}</dd>
                </div>
              </dl>
              <div className="rounded-xl bg-[#F8FAFC] p-3 text-sm leading-relaxed whitespace-pre-wrap text-[#2F4C73]">
                {selected.message}
              </div>
              {canWrite ? (
                <div className="flex flex-wrap gap-2">
                  {selected.status !== 'new' ? (
                    <button
                      type="button"
                      onClick={() => setStatus(selected.id, 'new')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(47,76,115,0.14)] px-3 py-1.5 text-xs font-medium hover:bg-[#F4F6F9]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Mark new
                    </button>
                  ) : null}
                  {selected.status !== 'archived' ? (
                    <button
                      type="button"
                      onClick={() => setStatus(selected.id, 'archived')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(47,76,115,0.14)] px-3 py-1.5 text-xs font-medium hover:bg-[#F4F6F9]"
                    >
                      <Archive className="h-3.5 w-3.5" />
                      Archive
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStatus(selected.id, 'read')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(47,76,115,0.14)] px-3 py-1.5 text-xs font-medium hover:bg-[#F4F6F9]"
                    >
                      <MailOpen className="h-3.5 w-3.5" />
                      Unarchive
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="grid min-h-[240px] place-items-center text-center text-sm text-[#6B7C8F]">
              Select a message to read the full inquiry.
            </div>
          )}
        </aside>
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete message"
        message={
          pendingDelete
            ? `Delete the message from ${pendingDelete.name}? This cannot be undone.`
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
        accent ? 'border-amber-200 bg-amber-50' : 'border-[rgba(47,76,115,0.12)] bg-white'
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7C8F]">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-[#1C314F]">{value}</p>
    </div>
  );
}
