import { migrate, getDb } from '../db/index.js';

migrate();
const db = getDb();
const tables = db
  .prepare(`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`)
  .all()
  .map((r) => r.name);
console.log('tables:', tables.join(', '));
console.log('admins:', db.prepare('SELECT email, role FROM admin_users').all());
