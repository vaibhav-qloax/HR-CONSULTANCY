"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { JobCard, type JobCardData } from "./JobCard";
import { JobFilters } from "./JobFilters";
import { filterJobs, filtersToQuery, uniqueSorted, type JobFilterState } from "./filtering";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { ease } from "@/lib/motion";

const PAGE_SIZE = 6;
const sorts = {
  newest: { label: "Newest first", fn: (a: JobCardData, b: JobCardData) => b.postedAt.localeCompare(a.postedAt) },
  oldest: { label: "Oldest first", fn: (a: JobCardData, b: JobCardData) => a.postedAt.localeCompare(b.postedAt) },
  title: { label: "Job title A–Z", fn: (a: JobCardData, b: JobCardData) => a.title.localeCompare(b.title) },
} as const;
type SortKey = keyof typeof sorts;

/**
 * Full job board. Filters live in the URL so results can be shared and the
 * back button works; filtering runs client-side against the published jobs.
 */
export function JobBoard({ jobs }: { jobs: JobCardData[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<JobFilterState>(() => ({
    q: params.get("q") ?? "",
    location: params.get("location") ?? "",
    type: params.get("type") ?? "",
    mode: params.get("mode") ?? "",
  }));
  const [sort, setSort] = useState<SortKey>(() => {
    const s = params.get("sort");
    return s && s in sorts ? (s as SortKey) : "newest";
  });
  const [limit, setLimit] = useState(PAGE_SIZE);

  // Keep the URL in sync, debounced so typing doesn't spam history.
  useEffect(() => {
    const id = window.setTimeout(() => {
      const p = new URLSearchParams(filtersToQuery(filters));
      if (sort !== "newest") p.set("sort", sort);
      const next = p.toString();
      if (next !== params.toString()) router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }, 300);
    return () => window.clearTimeout(id);
  }, [filters, sort, pathname, router, params]);

  const options = useMemo(
    () => ({
      locations: uniqueSorted(jobs.map((j) => j.location)),
      types: uniqueSorted(jobs.map((j) => j.type)),
      modes: uniqueSorted(jobs.map((j) => j.workMode)),
    }),
    [jobs],
  );

  const results = useMemo(() => [...filterJobs(jobs, filters)].sort(sorts[sort].fn), [jobs, filters, sort]);
  const visible = results.slice(0, limit);

  function update(next: JobFilterState) {
    setFilters(next);
    setLimit(PAGE_SIZE);
  }

  return (
    <div>
      <JobFilters value={filters} onChange={update} options={options} resultCount={results.length} />

      <div className="mt-8 flex items-center justify-end gap-3">
        <label htmlFor="job-sort" className="text-sm text-muted">
          Sort by
        </label>
        <select
          id="job-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="h-10 rounded-full border border-line-strong bg-paper px-4 text-sm font-semibold transition-colors hover:border-ink focus:border-accent"
        >
          {Object.entries(sorts).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      {visible.length ? (
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((job) => (
              <motion.li
                key={job.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: ease.outExpo }}
                className="flex"
              >
                <JobCard job={job} className="w-full" />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <EmptyState
          className="mt-6"
          title={jobs.length ? "No roles match your search" : "There are no open roles right now"}
          description={
            jobs.length
              ? "Try different keywords or clear some filters."
              : "New roles are added regularly. Register your CV and we'll contact you when something suitable comes up."
          }
          action={
            <ButtonLink href="/candidates/register" variant="outline" size="sm">
              Register your CV
            </ButtonLink>
          }
        />
      )}

      {results.length > visible.length && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            Showing {visible.length} of {results.length} roles
          </p>
          <Button variant="outline" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
            Load more roles
          </Button>
        </div>
      )}
    </div>
  );
}
