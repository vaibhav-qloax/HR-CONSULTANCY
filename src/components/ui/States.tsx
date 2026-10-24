import { CircleAlert, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({ label = "Loading", rows = 3, className }: { label?: string; rows?: number; className?: string }) {
  return (
    <div role="status" aria-live="polite" className={cn("grid gap-4", className)}>
      <span className="sr-only">{label}…</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-[var(--radius-lg)] border border-line bg-paper p-6">
          <div className="skeleton h-4 w-24 rounded-full" />
          <div className="skeleton mt-5 h-7 w-3/5 rounded-full" />
          <div className="skeleton mt-4 h-4 w-4/5 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-[var(--radius-lg)] border border-dashed border-line-strong bg-paper/60 px-6 py-16 text-center",
        className,
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-ivory-deep text-muted">
        <SearchX aria-hidden="true" className="size-6" strokeWidth={1.5} />
      </span>
      <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
      {description && <p className="mt-2 max-w-md text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description,
  action,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center rounded-[var(--radius-lg)] border border-danger/20 bg-danger/[0.03] px-6 py-14 text-center",
        className,
      )}
    >
      <CircleAlert aria-hidden="true" className="size-8 text-danger" strokeWidth={1.5} />
      <h3 className="mt-4 text-xl font-semibold tracking-tight">{title}</h3>
      {description && <p className="mt-2 max-w-md text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function SampleBadge({ label = "Sample listing", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-warning/25 bg-[#fff7e0] px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-warning",
        className,
      )}
    >
      {label}
    </span>
  );
}

/** Development-only notice for sections that need real content. */
export function DevPlaceholder({ title, children }: { title: string; children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="rounded-[var(--radius-lg)] border border-dashed border-accent/40 bg-accent-soft/50 p-8">
      <p className="text-eyebrow text-accent">Development placeholder</p>
      <h3 className="mt-3 text-xl font-semibold">{title}</h3>
      <div className="mt-2 max-w-2xl text-muted">{children}</div>
    </div>
  );
}
