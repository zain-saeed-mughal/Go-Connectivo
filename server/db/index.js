import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_PATH = process.env.KYC_DB_PATH || path.join(DATA_DIR, 'go-connectivo.sqlite');

const KYC_FORM_VERSION = '2';

let db;

export function getDb() {
  if (db) return db;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

function rebuildKycTables(database) {
  database.exec(`
    PRAGMA foreign_keys = OFF;
    DROP TABLE IF EXISTS kyc_review_notes;
    DROP TABLE IF EXISTS kyc_status_history;
    DROP TABLE IF EXISTS kyc_declarations;
    DROP TABLE IF EXISTS kyc_documents;
    DROP TABLE IF EXISTS kyc_ubos;
    DROP TABLE IF EXISTS kyc_technical;
    DROP TABLE IF EXISTS kyc_campaign;
    DROP TABLE IF EXISTS kyc_operations;
    DROP TABLE IF EXISTS kyc_management_contacts;
    DROP TABLE IF EXISTS kyc_management_primary;
    DROP TABLE IF EXISTS kyc_company;
    DROP TABLE IF EXISTS kyc_applications;
    PRAGMA foreign_keys = ON;
  `);

  // Re-apply only KYC table DDL from schema (admin tables already exist)
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  database.exec(schema);
  database
    .prepare(`INSERT INTO app_meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`)
    .run('kyc_form_version', KYC_FORM_VERSION);
}

function ensureColumn(database, table, column, typeSql) {
  if (!/^[a-z_]+$/.test(table) || !/^[a-z_]+$/.test(column)) {
    throw new Error('Invalid table or column name');
  }
  const cols = database.prepare(`PRAGMA table_info(${table})`).all();
  if (!cols.some((c) => c.name === column)) {
    database.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${typeSql}`);
  }
}

export function migrate() {
  const database = getDb();
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  database.exec(schema);

  const row = database.prepare(`SELECT value FROM app_meta WHERE key = 'kyc_form_version'`).get();
  const companyCols = database.prepare(`PRAGMA table_info(kyc_company)`).all();
  const hasLegacy =
    companyCols.some((c) => c.name === 'registered_business_name') ||
    companyCols.some((c) => c.name === 'secp_number');
  const hasNew = companyCols.some((c) => c.name === 'legal_entity_name');

  if (!row || row.value !== KYC_FORM_VERSION || hasLegacy || !hasNew) {
    rebuildKycTables(database);
  }

  ensureColumn(database, 'kyc_technical', 'business_description', "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, 'kyc_technical', 'intended_use', "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, 'kyc_technical', 'customer_type', "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, 'kyc_technical', 'resells_capacity', "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, 'kyc_technical', 'uses_autodialer', "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, 'kyc_technical', 'cli_source', "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, 'kyc_technical', 'peak_concurrent_calls', "TEXT NOT NULL DEFAULT ''");

  return database;
}

export function nowIso() {
  return new Date().toISOString();
}
