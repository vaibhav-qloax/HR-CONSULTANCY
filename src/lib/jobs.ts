import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Job } from "@/types";
import { readJobs } from "@/server/store";

export const JOBS_TAG = "jobs";

export type PublicJob = Job & { isOpen: boolean };

function withOpenState(job: Job, today: string): PublicJob {
  const expired = job.closesAt ? job.closesAt < today : false;
  return { ...job, isOpen: job.status === "published" && !expired };
}

/** Jobs visible on the public site (published or closed; never drafts). */
export async function getPublicJobs(): Promise<PublicJob[]> {
  "use cache";
  cacheTag(JOBS_TAG);
  cacheLife("hours");
  const today = new Date().toISOString().slice(0, 10);
  const jobs = await readJobs();
  return jobs
    .filter((j) => j.status !== "draft")
    .map((j) => withOpenState(j, today))
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}

export async function getOpenJobs() {
  return (await getPublicJobs()).filter((j) => j.isOpen);
}

export async function getPublicJob(slug: string) {
  return (await getPublicJobs()).find((j) => j.slug === slug) ?? null;
}

export function applicationsAllowedFor(job: Pick<Job, "isSample">) {
  if (!job.isSample) return true;
  return process.env.NODE_ENV !== "production" || process.env.ALLOW_SAMPLE_APPLICATIONS === "true";
}
