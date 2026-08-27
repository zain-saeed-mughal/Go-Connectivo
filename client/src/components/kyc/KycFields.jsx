import { useId } from 'react';

export function SectionCard({ title, subtitle, children }) {
  return (
    <section className="kyc-card relative overflow-hidden rounded-2xl border border-[rgba(47,76,115,0.12)] bg-white/95 p-5 shadow-[0_12px_40px_rgba(28,49,79,0.06)] sm:p-7 md:p-8">
      <div className="mb-6 border-b border-[rgba(47,76,115,0.1)] pb-4">
        <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-[#1C314F] sm:text-2xl">
          {title}
        </h2>
        {subtitle ? <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-[#5A6F86]">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Field({ label, required, error, hint, children }) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="flex items-baseline gap-1 font-medium text-[#2F4C73]">
        {label}
        {required ? <span className="text-rose-600" aria-hidden>*</span> : null}
      </span>
      {children}
      {hint ? <span className="block text-xs text-[#6B7C8F]">{hint}</span> : null}
      {error ? <span className="block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}

const inputClass =
  'w-full min-h-11 rounded-xl border border-[rgba(47,76,115,0.14)] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#1C314F] outline-none transition focus:border-[#4A6B94] focus:bg-white focus:shadow-[0_0_0_3px_rgba(74,107,148,0.14)] disabled:opacity-60';

export function TextInput({ error, className = '', ...props }) {
  return (
    <input
      className={`${inputClass} ${error ? 'border-rose-400 focus:border-rose-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.12)]' : ''} ${className}`}
      {...props}
    />
  );
}

export function TextArea({ error, className = '', ...props }) {
  return (
    <textarea
      className={`${inputClass} min-h-[110px] resize-y ${error ? 'border-rose-400' : ''} ${className}`}
      {...props}
    />
  );
}

export function RadioGroup({ name, options, value, onChange, error, columns = 2 }) {
  return (
    <div className="space-y-2">
      <div
        className={`grid gap-2 ${columns === 1 ? 'grid-cols-1' : columns === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}
        role="radiogroup"
      >
        {options.map((opt) => {
          const id = `${name}-${opt.replace(/\W+/g, '-').toLowerCase()}`;
          const checked = value === opt;
          return (
            <label
              key={opt}
              htmlFor={id}
              className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition ${
                checked
                  ? 'border-[#4A6B94] bg-[#EEF3F8] text-[#1C314F]'
                  : 'border-[rgba(47,76,115,0.12)] bg-white text-[#2F4C73] hover:border-[#6B8AB0]/50'
              }`}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={opt}
                checked={checked}
                onChange={() => onChange(opt)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="mt-0.5 relative h-4 w-4 shrink-0 rounded-full border-2 border-[#6B8AB0] bg-white transition peer-checked:border-[#2F4C73] peer-focus-visible:ring-2 peer-focus-visible:ring-[#4A6B94]/35 after:absolute after:inset-[3px] after:rounded-full after:bg-[#2F4C73] after:opacity-0 after:transition-opacity peer-checked:after:opacity-100"
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

export function YesNoGroup({ name, value, onChange, error, yesLabel = 'Yes', noLabel = 'No' }) {
  return (
    <RadioGroup
      name={name}
      options={[yesLabel, noLabel]}
      value={value === 'yes' ? yesLabel : value === 'no' ? noLabel : ''}
      onChange={(v) => onChange(v === yesLabel ? 'yes' : 'no')}
      error={error}
      columns={2}
    />
  );
}

export function CheckboxGroup({ options, values = [], onChange, error, columns = 2 }) {
  const toggle = (opt) => {
    if (values.includes(opt)) onChange(values.filter((v) => v !== opt));
    else onChange([...values, opt]);
  };

  return (
    <div className="space-y-2">
      <div
        className={`grid gap-2 ${columns === 1 ? 'grid-cols-1' : columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}
      >
        {options.map((opt) => {
          const checked = values.includes(opt);
          return (
            <label
              key={opt}
              className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition ${
                checked
                  ? 'border-[#4A6B94] bg-[#EEF3F8] text-[#1C314F]'
                  : 'border-[rgba(47,76,115,0.12)] bg-white text-[#2F4C73] hover:border-[#6B8AB0]/50'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(opt)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="mt-0.5 relative h-4 w-4 shrink-0 rounded-[4px] border-2 border-[#6B8AB0] bg-white transition peer-checked:border-[#2F4C73] peer-checked:bg-[#2F4C73] peer-focus-visible:ring-2 peer-focus-visible:ring-[#4A6B94]/35 after:absolute after:top-[1px] after:left-[4px] after:h-[9px] after:w-[5px] after:rotate-45 after:border-r-2 after:border-b-2 after:border-white after:opacity-0 after:content-[''] peer-checked:after:opacity-100"
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

export function Grid({ cols = 2, className = '', children }) {
  return (
    <div
      className={`grid gap-4 ${cols === 3 ? 'md:grid-cols-3' : cols === 1 ? 'grid-cols-1' : 'md:grid-cols-2'} ${className}`}
    >
      {children}
    </div>
  );
}

export function useFieldId(prefix) {
  return useId() + prefix;
}
