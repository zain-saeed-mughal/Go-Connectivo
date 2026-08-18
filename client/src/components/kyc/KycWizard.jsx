import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react';
import { KYC_STEPS, stepIsComplete, validateStep } from '../../data/kycSchema';
import { submitKyc } from '../../lib/api';
import { clearKycDraft, loadKycDraft, saveKycDraft } from '../../lib/kycStorage';
import {
  StepCompany,
  StepCompliance,
  StepContacts,
  StepDocuments,
  StepReview,
  StepSubmitSuccess,
  StepTechnical,
} from './KycSteps';

const CONTENT_STEPS = ['company', 'contacts', 'technical', 'documents', 'compliance'];

export default function KycWizard() {
  const draft = useMemo(() => loadKycDraft(), []);
  const [form, setForm] = useState(draft.form);
  const [stepIndex, setStepIndex] = useState(Math.min(draft.stepIndex, KYC_STEPS.length - 2));
  const [errors, setErrors] = useState({});
  const [draftMsg, setDraftMsg] = useState(draft.savedAt ? 'Draft restored' : '');
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const step = KYC_STEPS[stepIndex];
  const isSubmitStep = step.id === 'submit';
  const progress = ((stepIndex + 1) / KYC_STEPS.length) * 100;

  useEffect(() => {
    if (!draftMsg) return undefined;
    const t = window.setTimeout(() => setDraftMsg(''), 2500);
    return () => window.clearTimeout(t);
  }, [draftMsg]);

  const saveDraft = () => {
    try {
      const result = saveKycDraft(form, stepIndex);
      const time = new Date(result.savedAt).toLocaleTimeString();
      setDraftMsg(
        result.filesStripped
          ? `Draft saved ${time} (text fields kept — re-attach documents before submit)`
          : `Draft saved ${time}`,
      );
    } catch {
      setDraftMsg('Could not save draft in this browser. Continue filling — submit still works.');
    }
  };

  const goNext = () => {
    if (step.id === 'review') {
      const allErrors = validateStep('review', form);
      setErrors(allErrors);
      if (Object.keys(allErrors).length) {
        const firstIncomplete = KYC_STEPS.findIndex(
          (s) => CONTENT_STEPS.includes(s.id) && !stepIsComplete(s.id, form),
        );
        if (firstIncomplete >= 0) setStepIndex(firstIncomplete);
        return;
      }
      handleFinalSubmit();
      return;
    }

    if (step.id === 'submit') return;

    const stepErrors = validateStep(step.id, form);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length) return;

    try {
      saveKycDraft(form, stepIndex + 1);
    } catch {
      /* draft optional */
    }
    setStepIndex((i) => Math.min(i + 1, KYC_STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrev = () => {
    if (isSubmitStep && submitResult) return;
    setErrors({});
    setStepIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const result = await submitKyc(form);
      setSubmitResult(result);
      clearKycDraft();
      setStepIndex(KYC_STEPS.findIndex((s) => s.id === 'submit'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err.message || 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const jumpTo = (index) => {
    if (isSubmitStep && submitResult) return;
    if (index > stepIndex) {
      for (let i = 0; i < index; i += 1) {
        const id = KYC_STEPS[i].id;
        if (id === 'submit' || id === 'review') continue;
        if (!stepIsComplete(id, form)) {
          setStepIndex(i);
          setErrors(validateStep(id, form));
          return;
        }
      }
    }
    setErrors({});
    setStepIndex(index);
  };

  return (
    <div className="relative">
      <div className="mb-6 rounded-2xl border border-[rgba(47,76,115,0.12)] bg-white/95 p-4 shadow-sm sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4A6B94]">
            Step {step.short} — {step.label}
          </p>
          <p className="text-xs text-[#6B7C8F]">{Math.round(progress)}% complete</p>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[rgba(47,76,115,0.1)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#2F4C73] via-[#4A6B94] to-[#6B8AB0] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
          {KYC_STEPS.map((s, i) => {
            const done =
              i < stepIndex ||
              (s.id !== 'submit' && s.id !== 'review' && stepIsComplete(s.id, form));
            const active = i === stepIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => jumpTo(i)}
                className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition sm:text-xs ${
                  active
                    ? 'bg-[#2F4C73] text-white'
                    : done
                      ? 'bg-[#EEF3F8] text-[#2F4C73]'
                      : 'bg-[#F4F6F9] text-[#6B7C8F]'
                }`}
              >
                <span className="mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[10px]">
                  {done && !active ? <Check className="h-3 w-3" /> : s.short}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {step.id === 'company' && <StepCompany form={form} setForm={setForm} errors={errors} />}
      {step.id === 'contacts' && <StepContacts form={form} setForm={setForm} errors={errors} />}
      {step.id === 'technical' && <StepTechnical form={form} setForm={setForm} errors={errors} />}
      {step.id === 'compliance' && <StepCompliance form={form} setForm={setForm} errors={errors} />}
      {step.id === 'documents' && <StepDocuments form={form} setForm={setForm} errors={errors} />}
      {step.id === 'review' && <StepReview form={form} />}
      {step.id === 'submit' && <StepSubmitSuccess result={submitResult} />}

      {submitError ? (
        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {submitError}
        </p>
      ) : null}

      {Object.keys(errors).length > 0 && step.id !== 'submit' ? (
        <p className="mt-4 text-sm text-rose-600">
          Please correct the highlighted fields before continuing.
        </p>
      ) : null}

      {!isSubmitStep || !submitResult ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={stepIndex === 0 || submitting}
              className="inline-flex items-center gap-2 rounded-xl border border-[rgba(47,76,115,0.16)] bg-white px-4 py-2.5 text-sm font-semibold text-[#2F4C73] hover:bg-[#F4F6F9] disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              onClick={saveDraft}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl border border-[rgba(47,76,115,0.16)] bg-white px-4 py-2.5 text-sm font-semibold text-[#2F4C73] hover:bg-[#F4F6F9]"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </button>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F4C73] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(47,76,115,0.28)] hover:bg-[#243d5c] disabled:opacity-60"
          >
            {submitting ? (
              'Submitting…'
            ) : step.id === 'review' ? (
              'Final Submit'
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      ) : null}

      {draftMsg ? (
        <p className="mt-3 text-center text-xs text-[#4A6B94]" role="status">
          {draftMsg}
        </p>
      ) : null}
    </div>
  );
}
