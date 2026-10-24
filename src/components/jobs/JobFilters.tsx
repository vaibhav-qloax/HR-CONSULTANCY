"use client";

import { Search, X } from "lucide-react";
import { useId } from "react";
import { hasActiveFilters, type JobFilterState } from "./filtering";
import { cn } from "@/lib/utils";

type Options = { locations: string[]; types: string[]; modes: string[] };

function SelectFilter({
  label,
  value,
  options,
  onChange,
  allLabel,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  allLabel: string;
}) {
  const id = useId();
  return (
    <div className="relative flex min-w-0 flex-col">
      <label htmlFor={id} className="text-eyebrow px-1 pb-2 text-subtle">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-12 w-full appearance-none rounded-full border bg-paper bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23171717%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pl-4 pr-10 text-[0.95rem] transition-colors hover:border-ink focus:border-accent",
          value ? "border-ink font-semibold" : "border-line-strong",
        )}
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function JobFilters({
  value,
  onChange,
  options,
  compact = false,
  resultCount,
}: {
  value: JobFilterState;
  onChange: (next: JobFilterState) => void;
  options: Options;
  compact?: boolean;
  resultCount?: number;
}) {
  const searchId = useId();
  const set = (patch: Partial<JobFilterState>) => onChange({ ...value, ...patch });

  return (
    <div
      role="search"
      aria-label="Filter jobs"
      className={cn(
        "rounded-[var(--radius-lg)] border border-line bg-paper/80 p-4 shadow-[var(--shadow-soft)] backdrop-blur md:p-5",
      )}
    >
      <div className={cn("grid gap-4", compact ? "md:grid-cols-[1.6fr_1fr_1fr_1fr]" : "md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr]")}>
        <div className="flex min-w-0 flex-col">
          <label htmlFor={searchId} className="text-eyebrow px-1 pb-2 text-subtle">
            Keyword
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              id={searchId}
              type="search"
              value={value.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Job title, skill or keyword"
              autoComplete="off"
              className="h-12 w-full rounded-full border border-line-strong bg-paper pl-11 pr-4 text-[0.95rem] transition-colors placeholder:text-subtle hover:border-ink focus:border-accent"
            />
          </div>
        </div>
        <SelectFilter label="Location" allLabel="All locations" value={value.location} options={options.locations} onChange={(v) => set({ location: v })} />
        <SelectFilter label="Job type" allLabel="All job types" value={value.type} options={options.types} onChange={(v) => set({ type: v })} />
        <SelectFilter label="Work mode" allLabel="Any work mode" value={value.mode} options={options.modes} onChange={(v) => set({ mode: v })} />
      </div>

      <div className="mt-4 flex min-h-8 flex-wrap items-center justify-between gap-3 px-1 text-sm">
        <p aria-live="polite" className="text-muted">
          {typeof resultCount === "number" && (
            <>
              <span className="font-semibold text-ink">{resultCount}</span> {resultCount === 1 ? "role" : "roles"} found
            </>
          )}
        </p>
        {hasActiveFilters(value) && (
          <button
            type="button"
            onClick={() => onChange({ q: "", location: "", type: "", mode: "" })}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-accent transition-colors hover:bg-accent-soft"
          >
            <X aria-hidden="true" className="size-3.5" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
