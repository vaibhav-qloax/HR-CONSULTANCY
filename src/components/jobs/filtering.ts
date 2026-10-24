import type { JobCardData } from "./JobCard";

export type JobFilterState = {
  q: string;
  location: string;
  type: string;
  mode: string;
};

export const emptyFilters: JobFilterState = { q: "", location: "", type: "", mode: "" };

export function filterJobs<T extends JobCardData & { industry?: string }>(jobs: T[], f: JobFilterState) {
  const q = f.q.trim().toLowerCase();
  const terms = q ? q.split(/\s+/) : [];
  return jobs.filter((job) => {
    if (f.location && job.location !== f.location) return false;
    if (f.type && job.type !== f.type) return false;
    if (f.mode && job.workMode !== f.mode) return false;
    if (terms.length) {
      const hay = `${job.title} ${job.summary} ${job.location} ${job.type} ${job.workMode} ${job.company ?? ""}`.toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return false;
    }
    return true;
  });
}

export function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export function hasActiveFilters(f: JobFilterState) {
  return Boolean(f.q || f.location || f.type || f.mode);
}

export function filtersToQuery(f: JobFilterState) {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.location) p.set("location", f.location);
  if (f.type) p.set("type", f.type);
  if (f.mode) p.set("mode", f.mode);
  return p.toString();
}
