import 'dotenv/config';
import { migrate } from '../db/index.js';
import { createAdminUser, listAdmins } from '../services/adminAuth.js';
import { ensureStorageRoot } from '../services/storage.js';

async function main() {
  migrate();
  ensureStorageRoot();

  const existing = listAdmins();
  if (existing.length) {
    console.log(`Admin users already exist (${existing.length}). Skipping seed.`);
    existing.forEach((u) => console.log(` - ${u.email} [${u.role}]`));
    return;
  }

  const email = process.env.ADMIN_EMAIL || 'admin@goconnectivo.com';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe!GC2026';
  const fullName = process.env.ADMIN_NAME || 'Go Connectivo Admin';

  const user = await createAdminUser({
    email,
    password,
    fullName,
    role: 'super_admin',
  });

  // Secondary compliance reviewer for assign demos
  await createAdminUser({
    email: process.env.REVIEWER_EMAIL || 'compliance@goconnectivo.com',
    password: process.env.REVIEWER_PASSWORD || 'Reviewer!GC2026',
    fullName: 'Compliance Reviewer',
    role: 'compliance_lead',
  });

  console.log('Seeded admin users:');
  console.log(`  Super admin: ${user.email} / (see ADMIN_PASSWORD)`);
  console.log('  Compliance: compliance@goconnectivo.com / (see REVIEWER_PASSWORD)');
  console.log('Change default passwords before production use.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
