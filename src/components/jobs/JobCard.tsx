import Link from "next/link";
import { ArrowRight, Briefcase, Building2, Clock, Laptop, MapPin, Wallet } from "lucide-react";
import { SampleBadge } from "@/components/ui/States";
import { formatDate, cn } from "@/lib/utils";
import type { Job } from "@/types";

export type JobCardData = Pick<
  Job,
  "slug" | "title" | "company" | "location" | "type" | "workMode" | "experience" | "salary" | "postedAt" | "summary" | "isSample"
> & { isOpen: boolean };

function Meta({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      <Icon aria-hidden="true" className="size-3.5 text-subtle" strokeWidth={1.75} />
      {children}
    </li>
  );
}

export function JobCard({ job, className }: { job: JobCardData; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-5 rounded-[var(--radius-lg)] border border-line bg-paper p-6 transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-lift)] md:p-7",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-sm text-muted">
          <Building2 aria-hidden="true" className="size-4" strokeWidth={1.75} />
          {job.company ?? "Confidential client"}
        </p>
        <div className="flex items-center gap-2">
          {job.isSample && <SampleBadge />}
          {!job.isOpen && (
            <span className="rounded-full bg-ivory-deep px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-muted">
              Closed
            </span>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold tracking-[-0.02em] md:text-[1.4rem]">
          <Link
            href={`/careers/${job.slug}`}
            className="after:absolute after:inset-0 after:rounded-[var(--radius-lg)] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent"
          >
            {job.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.95rem] text-muted">{job.summary}</p>
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
        <Meta icon={MapPin}>{job.location}</Meta>
        <Meta icon={Briefcase}>{job.type}</Meta>
        <Meta icon={Laptop}>{job.workMode}</Meta>
        <Meta icon={Clock}>{job.experience}</Meta>
        {job.salary && <Meta icon={Wallet}>{job.salary}</Meta>}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
        <p className="text-sm text-subtle">
          Posted <time dateTime={job.postedAt}>{formatDate(job.postedAt)}</time>
        </p>
        {job.isOpen ? (
          <Link
            href={`/careers/${job.slug}/apply`}
            className="relative z-10 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent"
            aria-label={`Apply for ${job.title}`}
          >
            Apply
            <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <span className="text-sm font-medium text-muted">No longer accepting applications</span>
        )}
      </div>
    </article>
  );
}
