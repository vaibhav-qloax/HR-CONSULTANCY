"use client";

import { motion } from "motion/react";
import { CircleAlert, CircleCheck, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { ease } from "@/lib/motion";

export function FormSuccess({
  title,
  children,
  reference,
  action,
}: {
  title: string;
  children: React.ReactNode;
  reference: string;
  action?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: ease.outExpo }}
      className="rounded-[var(--radius-lg)] border border-success/20 bg-mint/50 p-8 outline-none md:p-10"
    >
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: ease.outExpo, delay: 0.15 }}
        className="flex size-14 items-center justify-center rounded-full bg-success text-white"
      >
        <CircleCheck aria-hidden="true" className="size-7" />
      </motion.span>
      <h3 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 max-w-xl text-muted">{children}</div>
      <p className="mt-5 text-sm text-muted">
        Reference: <span className="font-mono font-semibold text-ink">{reference}</span>
      </p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}

/** Inside a <form>, the retry button simply resubmits the form. */
export function FormError({ message, retry = true }: { message: string; retry?: boolean }) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-danger/25 bg-danger/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="flex items-start gap-2 text-[0.95rem] font-medium text-danger">
        <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        {message}
      </p>
      {retry && (
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-danger/30 px-3 py-1.5 text-sm font-semibold text-danger hover:bg-danger/5"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Try again
        </button>
      )}
    </div>
  );
}

export function PrivacyNote({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-muted">{children}</p>;
}
