"use client";

import { CircleAlert, FileText, Upload, X } from "lucide-react";
import { forwardRef, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-[var(--radius-sm)] border bg-paper px-4 text-[1rem] text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-subtle hover:border-ink/40 focus:border-accent focus:shadow-[0_0_0_4px_rgb(27_79_216/0.12)] focus:outline-none aria-[invalid=true]:border-danger aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgb(180_35_24/0.1)]";

export function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.92rem] font-semibold">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}*
          </span>
        ) : (
          <span className="font-normal text-subtle"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-medium text-danger">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  return [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
}

type BaseProps = { label: string; error?: string; hint?: string; required?: boolean; className?: string };

export const TextField = forwardRef<HTMLInputElement, BaseProps & React.InputHTMLAttributes<HTMLInputElement>>(
  function TextField({ label, error, hint, required, className, id: idProp, ...rest }, ref) {
    const auto = useId();
    const id = idProp ?? auto;
    return (
      <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
        <input
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-required={required}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(control, "h-12", error ? "border-danger" : "border-line-strong")}
          {...rest}
        />
      </FieldShell>
    );
  },
);

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextAreaField({ label, error, hint, required, className, id: idProp, rows = 5, ...rest }, ref) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-required={required}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(control, "resize-y py-3 leading-relaxed", error ? "border-danger" : "border-line-strong")}
        {...rest}
      />
    </FieldShell>
  );
});

export const SelectField = forwardRef<
  HTMLSelectElement,
  BaseProps & React.SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder?: string }
>(function SelectField({ label, error, hint, required, className, id: idProp, options, placeholder = "Select…", ...rest }, ref) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <select
        ref={ref}
        id={id}
        aria-invalid={Boolean(error)}
        aria-required={required}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(
          control,
          "h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23171717%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10",
          error ? "border-danger" : "border-line-strong",
        )}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  );
});

export const CheckboxField = forwardRef<
  HTMLInputElement,
  { label: React.ReactNode; error?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>
>(function CheckboxField({ label, error, className, id: idProp, ...rest }, ref) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-line-strong accent-[var(--color-accent)]"
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer text-[0.95rem] leading-snug text-ink-soft">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 pl-8 text-sm font-medium text-danger">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
});

/** Multi-select chips backed by native checkboxes (keyboard + screen reader friendly). */
export function ChipGroup({
  legend,
  options,
  value,
  onChange,
  error,
  required,
}: {
  legend: string;
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
  error?: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined} className="flex flex-col gap-3">
      <legend className="mb-3 text-[0.92rem] font-semibold">
        {legend}
        {required && <span className="text-danger" aria-hidden="true"> *</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value.includes(o);
          return (
            <label
              key={o}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                checked ? "border-ink bg-ink text-white" : "border-line-strong bg-paper hover:border-ink",
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => onChange(checked ? value.filter((v) => v !== o) : [...value, o])}
              />
              {o}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-medium text-danger">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </fieldset>
  );
}

function formatBytes(n: number) {
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

/** Drag-and-drop resume input with validation feedback. */
export function FileField({
  label,
  file,
  onFile,
  error,
  accept,
  hint,
  required,
}: {
  label: string;
  file: File | null;
  onFile: (f: File | null) => void;
  error?: string;
  accept: string;
  hint: string;
  required?: boolean;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={file ? undefined : hint}>
      {file ? (
        <div className="flex items-center gap-4 rounded-[var(--radius-sm)] border border-line-strong bg-paper p-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <FileText aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{file.name}</p>
            <p className="text-sm text-muted">{formatBytes(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onFile(null);
              if (input.current) input.current.value = "";
            }}
            className="flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-ivory hover:text-ink"
            aria-label={`Remove ${file.name}`}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onFile(f);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-sm)] border border-dashed px-6 py-9 text-center transition-colors has-[:focus-visible]:border-accent has-[:focus-visible]:bg-accent-soft/40",
            drag ? "border-accent bg-accent-soft/50" : error ? "border-danger bg-danger/[0.02]" : "border-line-strong bg-paper hover:border-ink/40",
          )}
        >
          <Upload aria-hidden="true" className="size-6 text-accent" strokeWidth={1.5} />
          <span className="font-semibold">
            Drop your file here or <span className="text-accent underline underline-offset-4">browse</span>
          </span>
        </label>
      )}
      <input
        ref={input}
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : `${id}-hint`}
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </FieldShell>
  );
}

/** Off-screen honeypot. Real users never see or fill it. */
export function Honeypot(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}
