import { useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  CLI_SOURCES,
  CONTACT_ROLES,
  CUSTOMER_TYPES,
  DOCUMENT_TYPES,
  ENTITY_TYPES,
  TRAFFIC_PROFILES,
  emptyUbo,
  emptyContact,
} from '../../data/kycSchema';
import {
  CheckboxGroup,
  Field,
  Grid,
  RadioGroup,
  SectionCard,
  TextArea,
  TextInput,
  YesNoGroup,
} from './KycFields';
import KycUpload from './KycUpload';
import KycESign from './KycESign';

export function StepCompany({ form, setForm, errors }) {
  const c = form.company;
  const set = (key, value) =>
    setForm((prev) => ({ ...prev, company: { ...prev.company, [key]: value } }));

  return (
    <SectionCard
      title="1. Company Information"
      subtitle="Legal entity details for Go Connectivo KYC onboarding."
    >
      <Grid>
        <Field label="Legal Entity Name" required error={errors.legalEntityName}>
          <TextInput
            value={c.legalEntityName}
            onChange={(e) => set('legalEntityName', e.target.value)}
            error={errors.legalEntityName}
          />
        </Field>
        <Field label="Doing Business As (DBA)" hint="If applicable">
          <TextInput value={c.dba} onChange={(e) => set('dba', e.target.value)} />
        </Field>
      </Grid>

      <div className="mt-5">
        <Field label="Type of Entity" required error={errors.entityType}>
          <RadioGroup
            name="entityType"
            options={ENTITY_TYPES}
            value={c.entityType}
            onChange={(v) => set('entityType', v)}
            error={errors.entityType}
            columns={2}
          />
        </Field>
      </div>

      <Grid className="mt-5">
        <Field
          label="Country & State of Incorporation"
          required
          error={errors.countryStateIncorporation}
        >
          <TextInput
            value={c.countryStateIncorporation}
            onChange={(e) => set('countryStateIncorporation', e.target.value)}
            error={errors.countryStateIncorporation}
          />
        </Field>
        <Field label="Company Registration / Tax ID (EIN/VAT)" required error={errors.taxId}>
          <TextInput value={c.taxId} onChange={(e) => set('taxId', e.target.value)} error={errors.taxId} />
        </Field>
        <Field label="FCC 499 Filer ID" required error={errors.fcc499FilerId}>
          <TextInput
            value={c.fcc499FilerId}
            onChange={(e) => set('fcc499FilerId', e.target.value)}
            error={errors.fcc499FilerId}
          />
        </Field>
        <Field label="Company Website" required error={errors.website}>
          <TextInput
            type="url"
            placeholder="https://"
            value={c.website}
            onChange={(e) => set('website', e.target.value)}
            error={errors.website}
          />
        </Field>
      </Grid>

      <div className="mt-5 space-y-4">
        <Field label="Physical Business Address" required error={errors.physicalAddress}>
          <TextArea
            value={c.physicalAddress}
            onChange={(e) => set('physicalAddress', e.target.value)}
            error={errors.physicalAddress}
          />
        </Field>
        <Field
          label="City, State/Province, Zip/Postal Code, Country"
          required
          error={errors.cityStateZipCountry}
        >
          <TextInput
            value={c.cityStateZipCountry}
            onChange={(e) => set('cityStateZipCountry', e.target.value)}
            error={errors.cityStateZipCountry}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export function StepContacts({ form, setForm, errors }) {
  const setContact = (role, key, value) =>
    setForm((prev) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        [role]: { ...(prev.contacts[role] || emptyContact()), [key]: value },
      },
    }));

  const setUbo = (index, key, value) =>
    setForm((prev) => ({
      ...prev,
      ubos: prev.ubos.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    }));

  const addUbo = () => setForm((prev) => ({ ...prev, ubos: [...prev.ubos, emptyUbo()] }));
  const removeUbo = (index) =>
    setForm((prev) => ({
      ...prev,
      ubos: prev.ubos.length <= 1 ? prev.ubos : prev.ubos.filter((_, i) => i !== index),
    }));

  return (
    <div className="space-y-6">
      <SectionCard
        title="2. Primary Contacts"
        subtitle="Provide name, title, email, and phone for each role."
      >
        <div className="space-y-6">
          {CONTACT_ROLES.map(({ key, label }) => {
            const row = form.contacts[key] || emptyContact();
            return (
              <div
                key={key}
                className="rounded-2xl border border-[rgba(47,76,115,0.1)] bg-[#F8FAFC]/80 p-4 sm:p-5"
              >
                <h3 className="mb-3 text-sm font-semibold tracking-[0.06em] text-[#4A6B94] uppercase">
                  {label}
                </h3>
                <Grid>
                  <Field label="Name" required error={errors[`contacts.${key}.name`]}>
                    <TextInput
                      value={row.name}
                      onChange={(e) => setContact(key, 'name', e.target.value)}
                      error={errors[`contacts.${key}.name`]}
                    />
                  </Field>
                  <Field label="Title" required error={errors[`contacts.${key}.title`]}>
                    <TextInput
                      value={row.title}
                      onChange={(e) => setContact(key, 'title', e.target.value)}
                      error={errors[`contacts.${key}.title`]}
                    />
                  </Field>
                  <Field label="Email Address" required error={errors[`contacts.${key}.email`]}>
                    <TextInput
                      type="email"
                      value={row.email}
                      onChange={(e) => setContact(key, 'email', e.target.value)}
                      error={errors[`contacts.${key}.email`]}
                    />
                  </Field>
                  <Field label="Phone Number" required error={errors[`contacts.${key}.phone`]}>
                    <TextInput
                      value={row.phone}
                      onChange={(e) => setContact(key, 'phone', e.target.value)}
                      error={errors[`contacts.${key}.phone`]}
                    />
                  </Field>
                </Grid>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard
        title="Ultimate Beneficial Ownership (UBO)"
        subtitle="List individuals who own 25% or more, or an executive officer with significant management control."
      >
        {errors.ubos ? <p className="mb-3 text-sm text-rose-600">{errors.ubos}</p> : null}

        <div className="space-y-5">
          {form.ubos.map((row, index) => (
            <div
              key={`ubo-${index}`}
              className="rounded-2xl border border-[rgba(47,76,115,0.1)] bg-[#F8FAFC]/80 p-4 sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-[#2F4C73]">
                  Principal Officer / Owner {index + 1}
                </h3>
                {form.ubos.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeUbo(index)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                ) : null}
              </div>
              <Grid>
                <Field label="Name" required={index === 0} error={errors[`ubo.${index}.name`]}>
                  <TextInput
                    value={row.name}
                    onChange={(e) => setUbo(index, 'name', e.target.value)}
                    error={errors[`ubo.${index}.name`]}
                  />
                </Field>
                <Field label="Title" error={errors[`ubo.${index}.title`]}>
                  <TextInput
                    value={row.title}
                    onChange={(e) => setUbo(index, 'title', e.target.value)}
                    error={errors[`ubo.${index}.title`]}
                  />
                </Field>
                <Field label="Ownership %" error={errors[`ubo.${index}.ownershipPercent`]}>
                  <TextInput
                    inputMode="decimal"
                    placeholder="e.g. 25"
                    value={row.ownershipPercent}
                    onChange={(e) => setUbo(index, 'ownershipPercent', e.target.value)}
                    error={errors[`ubo.${index}.ownershipPercent`]}
                  />
                </Field>
                <Field label="ID / Passport #" error={errors[`ubo.${index}.idPassport`]}>
                  <TextInput
                    value={row.idPassport}
                    onChange={(e) => setUbo(index, 'idPassport', e.target.value)}
                    error={errors[`ubo.${index}.idPassport`]}
                  />
                </Field>
              </Grid>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addUbo}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[rgba(47,76,115,0.16)] bg-white px-4 py-2.5 text-sm font-semibold text-[#2F4C73] hover:bg-[#F4F6F9]"
        >
          <Plus className="h-4 w-4" />
          Add another owner / officer
        </button>
      </SectionCard>
    </div>
  );
}

export function StepTechnical({ form, setForm, errors }) {
  const t = form.technical;
  const set = (key, value) =>
    setForm((prev) => ({ ...prev, technical: { ...prev.technical, [key]: value } }));

  return (
    <div className="space-y-5">
      <SectionCard
        title="3. Business / Use-Case"
        subtitle="Describe how your company will use Go Connectivo services."
      >
        <Field label="Nature of business" required error={errors.businessDescription}>
          <TextArea
            value={t.businessDescription}
            onChange={(e) => set('businessDescription', e.target.value)}
            error={errors.businessDescription}
            placeholder="What does the company do? Industry, products, and operating model."
          />
        </Field>

        <div className="mt-5">
          <Field
            label="Intended use of Go Connectivo services"
            required
            error={errors.intendedUse}
          >
            <TextArea
              value={t.intendedUse}
              onChange={(e) => set('intendedUse', e.target.value)}
              error={errors.intendedUse}
              placeholder="e.g. outbound call-center termination, hosted PBX for employees, wholesale SIP to downstream carriers."
            />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Who will you serve with this traffic?" required error={errors.customerType}>
            <RadioGroup
              name="customerType"
              options={CUSTOMER_TYPES}
              value={t.customerType}
              onChange={(value) => set('customerType', value)}
              error={errors.customerType}
            />
          </Field>
        </div>

        <Grid className="mt-5">
          <Field
            label="Will you resell capacity to third parties?"
            required
            error={errors.resellsCapacity}
          >
            <YesNoGroup
              name="resellsCapacity"
              value={t.resellsCapacity}
              onChange={(value) => set('resellsCapacity', value)}
              error={errors.resellsCapacity}
            />
          </Field>
          <Field
            label="Will traffic include autodialer / predictive / power dialer campaigns?"
            required
            error={errors.usesAutodialer}
          >
            <YesNoGroup
              name="usesAutodialer"
              value={t.usesAutodialer}
              onChange={(value) => set('usesAutodialer', value)}
              error={errors.usesAutodialer}
            />
          </Field>
        </Grid>

        <div className="mt-5">
          <Field label="Caller ID / CLI source" required error={errors.cliSource}>
            <RadioGroup
              name="cliSource"
              options={CLI_SOURCES}
              value={t.cliSource}
              onChange={(value) => set('cliSource', value)}
              error={errors.cliSource}
              columns={1}
            />
          </Field>
        </div>

        <div className="mt-5">
          <Field
            label="Estimated peak concurrent calls (channels)"
            required
            error={errors.peakConcurrentCalls}
          >
            <TextInput
              value={t.peakConcurrentCalls}
              onChange={(e) => set('peakConcurrentCalls', e.target.value)}
              error={errors.peakConcurrentCalls}
              placeholder="e.g. 50, 200, 1,000"
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title="Technical Profile"
        subtitle="Helps with route planning and fraud monitoring."
      >
        <Field label="Primary Traffic Profile" required error={errors.trafficProfiles}>
          <CheckboxGroup
            options={TRAFFIC_PROFILES}
            values={t.trafficProfiles}
            onChange={(values) => set('trafficProfiles', values)}
            error={errors.trafficProfiles}
          />
        </Field>

        <Grid className="mt-5">
          <Field
            label="Estimated Monthly Volume (Minutes / Spend)"
            required
            error={errors.monthlyVolume}
          >
            <TextInput
              value={t.monthlyVolume}
              onChange={(e) => set('monthlyVolume', e.target.value)}
              error={errors.monthlyVolume}
            />
          </Field>
          <Field
            label="Originating IP Address(es) for SIP Interconnect"
            required
            error={errors.originatingIps}
            hint="Comma or line-separated"
          >
            <TextArea
              value={t.originatingIps}
              onChange={(e) => set('originatingIps', e.target.value)}
              error={errors.originatingIps}
            />
          </Field>
        </Grid>

        <div className="mt-5">
          <Field
            label="Primary Target Destinations (Countries / Regions)"
            required
            error={errors.targetDestinations}
          >
            <TextArea
              value={t.targetDestinations}
              onChange={(e) => set('targetDestinations', e.target.value)}
              error={errors.targetDestinations}
            />
          </Field>
        </div>
      </SectionCard>
    </div>
  );
}

export function StepCompliance({ form, setForm, errors }) {
  const c = form.compliance;
  const a = form.authorization;
  const set = (key, value) =>
    setForm((prev) => ({ ...prev, compliance: { ...prev.compliance, [key]: value } }));
  const setAuth = (key, value) =>
    setForm((prev) => ({
      ...prev,
      authorization: { ...prev.authorization, [key]: value },
    }));

  useEffect(() => {
    if (a.date) return undefined;
    const today = new Date().toISOString().slice(0, 10);
    setForm((prev) => ({
      ...prev,
      authorization: {
        ...prev.authorization,
        date: prev.authorization.date || today,
      },
    }));
    return undefined;
  }, [a.date, setForm]);

  const items = [
    {
      key: 'lawsAttest',
      label:
        'Applicant certifies that all traffic originated through the network complies with applicable telecommunications laws, including TSR (Telemarketing Sales Rule), TCPA, and STIR/SHAKEN framework requirements.',
    },
    {
      key: 'robocallProhibit',
      label:
        'Applicant explicitly prohibits the transmission of illegal robocalls, spoofed caller IDs, deceptive CLI manipulation, or fraudulent voice traffic.',
    },
    {
      key: 'suspendAck',
      label:
        'Applicant agrees that service may be suspended immediately upon receipt of illegal traffic notifications or traceback requests from upstream tier-1 carriers or regulatory bodies.',
    },
  ];

  return (
    <div className="space-y-5">
      <SectionCard
        title="5. Regulatory & Anti-Fraud Compliance Attestation"
        subtitle="All declarations must be accepted to proceed."
      >
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.key}>
              <label
                className={`flex cursor-pointer gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${
                  errors[item.key]
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-[rgba(47,76,115,0.12)] bg-[#F8FAFC]'
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-[#2F4C73]"
                  checked={Boolean(c[item.key])}
                  onChange={(e) => set(item.key, e.target.checked)}
                />
                <span className="text-[#4A5D73]">{item.label}</span>
              </label>
              {errors[item.key] ? (
                <p className="mt-1 text-xs text-rose-600">{errors[item.key]}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard
        title="Authorization & E-Signature"
        subtitle="Authorized representative confirms the application is complete and accurate, then signs in the box."
      >
        <Grid>
          <Field label="Authorized Representative Name" required error={errors.authorizedName}>
            <TextInput
              value={a.authorizedName}
              onChange={(e) => setAuth('authorizedName', e.target.value)}
              error={errors.authorizedName}
            />
          </Field>
          <Field label="Title" required error={errors.title}>
            <TextInput value={a.title} onChange={(e) => setAuth('title', e.target.value)} error={errors.title} />
          </Field>
          <Field label="Date" required error={errors.date}>
            <TextInput
              type="date"
              value={a.date}
              onChange={(e) => setAuth('date', e.target.value)}
              error={errors.date}
            />
          </Field>
        </Grid>

        <div className="mt-5">
          <KycESign
            value={a.signature}
            error={errors.signature}
            onChange={(meta) => setAuth('signature', meta)}
          />
        </div>

        <div className="mt-5 border-t border-[rgba(47,76,115,0.1)] pt-5">
          <KycUpload
            label="Or upload a signature image"
            required={false}
            value={a.signature?.method === 'draw' ? null : a.signature}
            error={null}
            onChange={(meta) =>
              setAuth('signature', meta ? { ...meta, method: 'upload' } : null)
            }
            hint="Optional if you already signed above · PDF or image · max 8MB"
          />
        </div>
      </SectionCard>
    </div>
  );
}

export function StepDocuments({ form, setForm, errors }) {
  const setDoc = (key, meta) =>
    setForm((prev) => ({
      ...prev,
      documents: { ...prev.documents, [key]: meta },
    }));

  return (
    <SectionCard
      title="4. Required Supporting Documents"
      subtitle="Attach the following files with this completed form."
    >
      <div className="space-y-4">
        {DOCUMENT_TYPES.map((doc) => (
          <KycUpload
            key={doc.key}
            label={doc.label}
            required={doc.required}
            value={form.documents[doc.key]}
            error={errors[`doc.${doc.key}`]}
            onChange={(meta) => setDoc(doc.key, meta)}
          />
        ))}
      </div>
    </SectionCard>
  );
}

function ReviewBlock({ title, children }) {
  return (
    <div className="rounded-2xl border border-[rgba(47,76,115,0.1)] bg-white p-4 sm:p-5">
      <h3 className="mb-3 text-sm font-semibold tracking-[0.08em] text-[#4A6B94] uppercase">
        {title}
      </h3>
      <dl className="grid gap-3 sm:grid-cols-2">{children}</dl>
    </div>
  );
}

function ReviewItem({ label, value }) {
  const display = Array.isArray(value)
    ? value.join(', ')
    : value === true
      ? 'Yes'
      : value === false
        ? 'No'
        : value || '—';
  return (
    <div>
      <dt className="text-xs font-medium text-[#6B7C8F]">{label}</dt>
      <dd className="mt-0.5 text-sm text-[#2F4C73]">{display}</dd>
    </div>
  );
}

export function StepReview({ form }) {
  const c = form.company;
  const t = form.technical;
  const a = form.authorization;

  return (
    <SectionCard
      title="Review & Submit"
      subtitle="Confirm every section before final submission. You can jump back using the step bar."
    >
      <div className="space-y-4">
        <ReviewBlock title="Company">
          <ReviewItem label="Legal Entity Name" value={c.legalEntityName} />
          <ReviewItem label="DBA" value={c.dba} />
          <ReviewItem label="Entity Type" value={c.entityType} />
          <ReviewItem label="Incorporation" value={c.countryStateIncorporation} />
          <ReviewItem label="Tax ID" value={c.taxId} />
          <ReviewItem label="FCC 499 Filer ID" value={c.fcc499FilerId} />
          <ReviewItem label="Website" value={c.website} />
          <ReviewItem label="Physical Address" value={c.physicalAddress} />
          <ReviewItem label="City / State / Zip / Country" value={c.cityStateZipCountry} />
        </ReviewBlock>

        <ReviewBlock title="Primary Contacts">
          {CONTACT_ROLES.map(({ key, label }) => {
            const row = form.contacts[key] || emptyContact();
            return (
              <ReviewItem
                key={key}
                label={label}
                value={`${row.name} · ${row.title} · ${row.email} · ${row.phone}`}
              />
            );
          })}
        </ReviewBlock>

        <ReviewBlock title="UBO">
          {form.ubos
            .filter((u) => u.name)
            .map((u, i) => (
              <ReviewItem
                key={`r-ubo-${i}`}
                label={`Owner ${i + 1}`}
                value={`${u.name} · ${u.title} · ${u.ownershipPercent}% · ${u.idPassport}`}
              />
            ))}
        </ReviewBlock>

        <ReviewBlock title="Business / Use-Case">
          <ReviewItem label="Nature of business" value={t.businessDescription} />
          <ReviewItem label="Intended use" value={t.intendedUse} />
          <ReviewItem label="Customers served" value={t.customerType} />
          <ReviewItem label="Resells capacity" value={t.resellsCapacity === 'yes' ? 'Yes' : t.resellsCapacity === 'no' ? 'No' : t.resellsCapacity} />
          <ReviewItem label="Autodialer campaigns" value={t.usesAutodialer === 'yes' ? 'Yes' : t.usesAutodialer === 'no' ? 'No' : t.usesAutodialer} />
          <ReviewItem label="CLI source" value={t.cliSource} />
          <ReviewItem label="Peak concurrent calls" value={t.peakConcurrentCalls} />
        </ReviewBlock>

        <ReviewBlock title="Technical">
          <ReviewItem label="Traffic Profile" value={t.trafficProfiles} />
          <ReviewItem label="Monthly Volume" value={t.monthlyVolume} />
          <ReviewItem label="Originating IPs" value={t.originatingIps} />
          <ReviewItem label="Target Destinations" value={t.targetDestinations} />
        </ReviewBlock>

        <ReviewBlock title="Documents">
          {DOCUMENT_TYPES.map((doc) => (
            <ReviewItem
              key={doc.key}
              label={doc.label}
              value={form.documents[doc.key]?.name || (doc.required ? 'Missing' : 'Not attached')}
            />
          ))}
        </ReviewBlock>

        <ReviewBlock title="Compliance & Sign-Off">
          <ReviewItem label="Laws / TSR / TCPA / STIR-SHAKEN" value={form.compliance.lawsAttest} />
          <ReviewItem label="No illegal robocalls / spoofing" value={form.compliance.robocallProhibit} />
          <ReviewItem label="Suspension acknowledgement" value={form.compliance.suspendAck} />
          <ReviewItem label="Authorized Representative" value={a.authorizedName} />
          <ReviewItem label="Title" value={a.title} />
          <ReviewItem label="Date" value={a.date} />
          {a.signature?.dataUrl && String(a.signature.type || '').startsWith('image/') ? (
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium text-[#6B7C8F]">E-signature</dt>
              <dd className="mt-1">
                <img
                  src={a.signature.dataUrl}
                  alt="Applicant e-signature"
                  className="h-20 max-w-full rounded-lg border border-[rgba(47,76,115,0.12)] bg-white object-contain"
                />
              </dd>
            </div>
          ) : (
            <ReviewItem label="Signature" value={a.signature?.name || 'Missing'} />
          )}
        </ReviewBlock>
      </div>
    </SectionCard>
  );
}

export function StepSubmitSuccess({ result }) {
  return (
    <SectionCard title="Application received" subtitle="Thank you, your KYC package is with our compliance team.">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-6 text-center">
        <p className="font-display text-xl font-bold text-[#1C314F]">Submission successful</p>
        <p className="mt-2 text-sm text-[#4A5D73]">
          Reference ID:{' '}
          <span className="font-semibold text-[#2F4C73]">{result?.data?.kycId || result?.data?.id}</span>
        </p>
        <p className="mt-3 text-sm text-[#5A6F86]">
          Keep this ID for follow-ups. We will contact your Primary Executive or Compliance contact if
          more information is required.
        </p>
      </div>
    </SectionCard>
  );
}
