"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { JobCard, type JobCardData } from "./JobCard";
import { JobFilters } from "./JobFilters";
import { emptyFilters, filterJobs, filtersToQuery, uniqueSorted } from "./filtering";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { ease } from "@/lib/motion";

/** Homepage job discovery: real filtering over the published job data. */
export function FeaturedJobs({ jobs }: { jobs: JobCardData[] }) {
  const [filters, setFilters] = useState(emptyFilters);
  const options = useMemo(
    () => ({
      locations: uniqueSorted(jobs.map((j) => j.location)),
      types: uniqueSorted(jobs.map((j) => j.type)),
      modes: uniqueSorted(jobs.map((j) => j.workMode)),
    }),
    [jobs],
  );
  const results = useMemo(() => filterJobs(jobs, filters), [jobs, filters]);
  const visible = results.slice(0, 4);
  const query = filtersToQuery(filters);

  return (
    <div>
      <JobFilters value={filters} onChange={setFilters} options={options} compact resultCount={results.length} />

      {visible.length ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
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
          className="mt-8"
          title="No roles match those filters"
          description="Try a broader keyword or clear the filters. You can also register your CV so we can contact you about future roles."
          action={
            <ButtonLink href="/candidates/register" variant="outline" size="sm">
              Register your CV
            </ButtonLink>
          }
        />
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted">
          {results.length > visible.length
            ? `Showing ${visible.length} of ${results.length} matching roles.`
            : "Explore every open role, with more filters and sorting."}
        </p>
        <ButtonLink href={query ? `/careers?${query}` : "/careers"}>View All Jobs</ButtonLink>
      </div>
    </div>
  );
}
