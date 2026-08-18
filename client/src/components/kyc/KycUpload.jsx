import { useRef, useState } from 'react';
import { FileText, LoaderCircle, Trash2, Upload } from 'lucide-react';
import { ACCEPTED_UPLOAD, MAX_FILE_BYTES } from '../../data/kycSchema';
import { fileToDraftMeta } from '../../lib/kycStorage';

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Secure upload box with progress, preview/remove.
 * Stores draft-friendly { name, size, type, dataUrl }.
 */
export default function KycUpload({
  label,
  required,
  value,
  onChange,
  error,
  hint = 'PDF or image · max 8MB',
}) {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState('');

  const readFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });

  const handleFile = async (file) => {
    setLocalError('');
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setLocalError('File exceeds 8MB limit.');
      return;
    }
    const okType =
      /pdf|jpeg|jpg|png|webp/i.test(file.type) ||
      /\.(pdf|jpe?g|png|webp)$/i.test(file.name);
    if (!okType) {
      setLocalError('Only PDF, JPG, PNG, or WEBP allowed.');
      return;
    }

    setBusy(true);
    setProgress(8);
    try {
      // Simulated staged progress for UX while FileReader runs
      const tick = window.setInterval(() => {
        setProgress((p) => (p < 88 ? p + 7 : p));
      }, 60);
      const dataUrl = await readFile(file);
      window.clearInterval(tick);
      setProgress(100);
      onChange(fileToDraftMeta(file, dataUrl));
    } catch {
      setLocalError('Upload failed. Please try again.');
      onChange(null);
    } finally {
      setBusy(false);
      window.setTimeout(() => setProgress(0), 400);
    }
  };

  const showError = error || localError;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium text-[#2F4C73]">
          {label}
          {required ? <span className="text-rose-600"> *</span> : null}
        </p>
        {hint ? <span className="text-[11px] text-[#6B7C8F]">{hint}</span> : null}
      </div>

      {!value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-7 text-center transition ${
            showError
              ? 'border-rose-400 bg-rose-50/50'
              : 'border-[rgba(47,76,115,0.22)] bg-[#F8FAFC] hover:border-[#4A6B94] hover:bg-[#EEF3F8]'
          }`}
        >
          {busy ? (
            <LoaderCircle className="h-6 w-6 animate-spin text-[#4A6B94]" />
          ) : (
            <Upload className="h-6 w-6 text-[#4A6B94]" />
          )}
          <span className="text-sm font-medium text-[#2F4C73]">
            {busy ? `Uploading… ${progress}%` : 'Click to upload document'}
          </span>
          {busy ? (
            <span className="mt-1 h-1.5 w-40 overflow-hidden rounded-full bg-[rgba(47,76,115,0.12)]">
              <span
                className="block h-full rounded-full bg-[#4A6B94] transition-all"
                style={{ width: `${progress}%` }}
              />
            </span>
          ) : null}
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-[rgba(47,76,115,0.14)] bg-white p-3">
          {value.type?.startsWith('image/') && value.dataUrl ? (
            <img
              src={value.dataUrl}
              alt=""
              className="h-14 w-14 rounded-lg object-cover border border-[rgba(47,76,115,0.1)]"
            />
          ) : (
            <span className="grid h-14 w-14 place-items-center rounded-lg bg-[#EEF3F8] text-[#4A6B94]">
              <FileText className="h-6 w-6" />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[#1C314F]">{value.name}</p>
            <p className="text-xs text-[#6B7C8F]">{formatBytes(value.size || 0)}</p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex items-center gap-1 rounded-lg border border-[rgba(47,76,115,0.14)] px-2.5 py-1.5 text-xs font-medium text-[#2F4C73] hover:bg-[#F4F6F9]"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_UPLOAD}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = '';
          handleFile(file);
        }}
      />
      {showError ? <p className="text-xs text-rose-600">{showError}</p> : null}
    </div>
  );
}
