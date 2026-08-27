import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, LoaderCircle, Send, TriangleAlert } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { submitContact } from '../../lib/api';

const initialState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const fieldClass =
  'peer gc-input w-full min-h-11 rounded-xl border border-[color:var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] focus:border-[var(--accent-secondary)] focus:bg-[var(--surface)] focus:shadow-[0_0_0_4px_var(--focus-ring)] sm:rounded-2xl';

function Field({ label, error, children }) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium text-[var(--text-secondary)] transition-colors duration-300">{label}</span>
      <span className="relative block">
        {children}
        <span className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[calc(100%-2rem)] -translate-x-1/2 origin-center scale-x-0 bg-gradient-to-r from-transparent via-[var(--accent-secondary)] to-transparent transition-transform duration-400 peer-focus:scale-x-100" />
      </span>
      <AnimatePresence initial={false}>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.25 }}
            className="block text-xs text-rose-600"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateClient = () => {
    const errors = {};
    if (form.name.trim().length < 2) errors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = 'Please enter a valid email.';
    }
    if (form.subject.trim().length < 3) errors.subject = 'Please add a subject.';
    if (form.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters.';
    }
    return errors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });

    const errors = validateClient();
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    setLoading(true);
    try {
      const result = await submitContact(form);
      setForm(initialState);
      setFieldErrors({});
      setStatus({
        type: 'success',
        message: result.message || 'Message sent successfully.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to send your message.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={fieldErrors.name}>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className={fieldClass}
            placeholder="John Smith"
            autoComplete="name"
          />
        </Field>

        <Field label="Email Address" error={fieldErrors.email}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className={fieldClass}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone Number">
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            className={fieldClass}
            placeholder="+1 555 000 0000"
            autoComplete="tel"
            inputMode="tel"
          />
        </Field>

        <Field label="Subject" error={fieldErrors.subject}>
          <input
            name="subject"
            value={form.subject}
            onChange={onChange}
            className={fieldClass}
            placeholder="How can we help?"
          />
        </Field>
      </div>

      <Field label="Message" error={fieldErrors.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={8}
          className={`${fieldClass} min-h-[12.5rem] resize-y sm:min-h-[14rem]`}
          placeholder="Tell us about your business needs and we’ll recommend the right setup."
        />
      </Field>

      <AnimatePresence initial={false}>
        {status.message && (
          <motion.div
            key={status.message}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center gap-2.5 overflow-hidden rounded-2xl border px-4 py-3 text-sm font-medium ${
              status.type === 'success'
                ? 'border-emerald-400/40 bg-emerald-500/12 text-[var(--text-primary)]'
                : 'border-rose-400/40 bg-rose-500/12 text-[var(--text-primary)]'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
            ) : (
              <TriangleAlert size={16} className="shrink-0 text-rose-500" />
            )}
            {status.message}
          </motion.div>
        )}
      </AnimatePresence>

      <MagneticButton type="submit" disabled={loading} magnetic={false} motionFx={false} className="w-full">
        {loading ? (
          <>
            <LoaderCircle size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send
              size={16}
              className="transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
            Send Message
          </>
        )}
      </MagneticButton>
    </form>
  );
}
