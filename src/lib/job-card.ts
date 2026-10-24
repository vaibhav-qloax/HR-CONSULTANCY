import type { JobCardData } from "@/components/jobs/JobCard";
import type { PublicJob } from "@/lib/jobs";

/** Trim a job down to the fields cards need before sending it to the client. */
export function toJobCard(job: PublicJob): JobCardData & { industry: string } {
  return {
    slug: job.slug,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    workMode: job.workMode,
    experience: job.experience,
    salary: job.salary,
    postedAt: job.postedAt,
    summary: job.summary,
    isSample: job.isSample,
    isOpen: job.isOpen,
    industry: job.industry,
  };
}
