-- Go Connectivo KYC relational schema (SQLite)

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS kyc_id_sequence (
  year INTEGER PRIMARY KEY,
  last_seq INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS app_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'compliance_lead', 'reviewer', 'viewer')),
  is_active INTEGER NOT NULL DEFAULT 1,
  last_login_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id TEXT PRIMARY KEY,
  admin_user_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS kyc_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kyc_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'submitted'
    CHECK (status IN ('submitted', 'under_review', 'more_info_required', 'approved', 'rejected', 'suspended')),
  risk_flags TEXT NOT NULL DEFAULT '[]',
  assigned_reviewer_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  submitter_ip TEXT,
  submitter_user_agent TEXT,
  submitted_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  locked_at TEXT
);

CREATE TABLE IF NOT EXISTS kyc_company (
  application_id INTEGER PRIMARY KEY REFERENCES kyc_applications(id) ON DELETE CASCADE,
  legal_entity_name TEXT NOT NULL,
  dba TEXT NOT NULL DEFAULT '',
  entity_type TEXT NOT NULL,
  country_state_incorporation TEXT NOT NULL,
  tax_id TEXT NOT NULL,
  fcc499_filer_id TEXT NOT NULL DEFAULT '',
  website TEXT NOT NULL,
  physical_address TEXT NOT NULL,
  city_state_zip_country TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS kyc_management_contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL REFERENCES kyc_applications(id) ON DELETE CASCADE,
  role_key TEXT NOT NULL,
  role_label TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  UNIQUE (application_id, role_key)
);

CREATE TABLE IF NOT EXISTS kyc_technical (
  application_id INTEGER PRIMARY KEY REFERENCES kyc_applications(id) ON DELETE CASCADE,
  business_description TEXT NOT NULL DEFAULT '',
  intended_use TEXT NOT NULL DEFAULT '',
  customer_type TEXT NOT NULL DEFAULT '',
  resells_capacity TEXT NOT NULL DEFAULT '',
  uses_autodialer TEXT NOT NULL DEFAULT '',
  cli_source TEXT NOT NULL DEFAULT '',
  peak_concurrent_calls TEXT NOT NULL DEFAULT '',
  traffic_profiles TEXT NOT NULL,
  monthly_volume TEXT NOT NULL,
  originating_ips TEXT NOT NULL,
  target_destinations TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS kyc_ubos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL REFERENCES kyc_applications(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  name TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  ownership_percent REAL NOT NULL,
  id_passport_enc TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS kyc_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL REFERENCES kyc_applications(id) ON DELETE CASCADE,
  doc_key TEXT NOT NULL,
  doc_label TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  is_sensitive INTEGER NOT NULL DEFAULT 0,
  uploaded_at TEXT NOT NULL,
  UNIQUE (application_id, doc_key)
);

CREATE TABLE IF NOT EXISTS kyc_declarations (
  application_id INTEGER PRIMARY KEY REFERENCES kyc_applications(id) ON DELETE CASCADE,
  laws_attest INTEGER NOT NULL,
  robocall_prohibit INTEGER NOT NULL,
  suspend_ack INTEGER NOT NULL,
  authorized_name TEXT NOT NULL,
  title TEXT NOT NULL,
  declaration_date TEXT NOT NULL,
  signature_document_id INTEGER REFERENCES kyc_documents(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS kyc_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL REFERENCES kyc_applications(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  note TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS kyc_review_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL REFERENCES kyc_applications(id) ON DELETE CASCADE,
  admin_user_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  is_internal INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_user_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  application_id INTEGER REFERENCES kyc_applications(id) ON DELETE SET NULL,
  ip_address TEXT,
  user_agent TEXT,
  meta_json TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL,
  service TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'read', 'archived')),
  submitter_ip TEXT,
  submitter_user_agent TEXT,
  created_at TEXT NOT NULL,
  read_at TEXT,
  read_by INTEGER REFERENCES admin_users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_inquiries(created_at);

CREATE INDEX IF NOT EXISTS idx_kyc_apps_status ON kyc_applications(status);
CREATE INDEX IF NOT EXISTS idx_kyc_apps_submitted ON kyc_applications(submitted_at);
CREATE INDEX IF NOT EXISTS idx_kyc_apps_reviewer ON kyc_applications(assigned_reviewer_id);
CREATE INDEX IF NOT EXISTS idx_kyc_company_name ON kyc_company(legal_entity_name);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON admin_sessions(expires_at);
