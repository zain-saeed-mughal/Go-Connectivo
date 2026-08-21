const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Professional admin API client, clear errors when the API is down or returns HTML.
 */
async function adminFetch(path, options = {}) {
  const { headers: extraHeaders, ...rest } = options;
  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        ...(rest.body ? { 'Content-Type': 'application/json' } : {}),
        ...(extraHeaders || {}),
      },
      ...rest,
    });
  } catch {
    throw Object.assign(
      new Error(
        'Cannot reach the Go Connectivo API. Start the server with: cd server && npm run dev',
      ),
      { status: 0, code: 'NETWORK' },
    );
  }

  const contentType = response.headers.get('content-type') || '';
  const raw = await response.text();

  let data = null;
  if (raw) {
    if (contentType.includes('application/json')) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = null;
      }
    } else {
      // Proxy/HTML error pages when API is offline
      try {
        data = JSON.parse(raw);
      } catch {
        data = null;
      }
    }
  }

  if (!response.ok) {
    const message =
      data?.message ||
      (response.status === 401
        ? 'Invalid email or password.'
        : response.status === 403
          ? 'You do not have permission for this action.'
          : response.status === 404
            ? 'API route not found. Is the server running the latest code?'
            : response.status === 429
              ? 'Too many attempts. Please wait and try again.'
              : response.status >= 500
                ? 'Server error. Please try again in a moment.'
                : !data
                  ? 'API server is not responding. Run: cd server && npm run dev'
                  : 'Request failed.');

    throw Object.assign(new Error(message), {
      status: response.status,
      data,
      code: 'HTTP',
    });
  }

  if (data == null) {
    throw Object.assign(
      new Error('API returned an empty response. Ensure the backend is running on port 5000.'),
      { status: response.status, code: 'EMPTY' },
    );
  }

  return data;
}

export function adminLogin(email, password) {
  return adminFetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email: String(email).trim(), password }),
  });
}

export function adminLogout() {
  return adminFetch('/api/admin/logout', { method: 'POST' });
}

export function adminMe() {
  return adminFetch('/api/admin/me');
}

export function adminStats() {
  return adminFetch('/api/admin/stats');
}

export function adminListContacts(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== '') qs.set(k, v);
  });
  return adminFetch(`/api/admin/contacts?${qs}`);
}

export function adminGetContact(id) {
  return adminFetch(`/api/admin/contacts/${encodeURIComponent(id)}`);
}

export function adminSetContactStatus(id, status) {
  return adminFetch(`/api/admin/contacts/${encodeURIComponent(id)}/status`, {
    method: 'POST',
    body: JSON.stringify({ status }),
  });
}

export function adminDeleteContact(id) {
  return adminFetch(`/api/admin/contacts/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

export function adminListApplications(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== '') qs.set(k, v);
  });
  return adminFetch(`/api/admin/applications?${qs}`);
}

export function adminGetApplication(id, reveal = false) {
  return adminFetch(`/api/admin/applications/${encodeURIComponent(id)}${reveal ? '?reveal=1' : ''}`);
}

export function adminAssign(id, reviewerId) {
  return adminFetch(`/api/admin/applications/${encodeURIComponent(id)}/assign`, {
    method: 'POST',
    body: JSON.stringify({ reviewerId }),
  });
}

export function adminAddNote(id, note) {
  return adminFetch(`/api/admin/applications/${encodeURIComponent(id)}/notes`, {
    method: 'POST',
    body: JSON.stringify({ note }),
  });
}

export function adminSetStatus(id, status, note = '') {
  return adminFetch(`/api/admin/applications/${encodeURIComponent(id)}/status`, {
    method: 'POST',
    body: JSON.stringify({ status, note }),
  });
}

export function adminDeleteApplication(id) {
  return adminFetch(`/api/admin/applications/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

export function adminReviewers() {
  return adminFetch('/api/admin/reviewers');
}

export function adminDocumentUrl(docId, download = false) {
  return `${API_BASE}/api/admin/documents/${docId}${download ? '?download=1' : ''}`;
}

/** Fetch private document with session cookie → blob URL for preview/download. */
export async function adminFetchDocumentBlob(docId, download = false) {
  const response = await fetch(adminDocumentUrl(docId, download), {
    credentials: 'include',
    headers: { Accept: '*/*' },
  });
  if (!response.ok) {
    throw new Error('Unable to open document. You may need to sign in again.');
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export function adminExportUrl(id) {
  return `${API_BASE}/api/admin/applications/${encodeURIComponent(id)}/export`;
}

export async function adminHealth() {
  try {
    const response = await fetch(`${API_BASE}/api/health`, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return { ok: false };
    const data = await response.json();
    return { ok: Boolean(data?.success), data };
  } catch {
    return { ok: false };
  }
}
