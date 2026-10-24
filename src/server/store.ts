import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Job } from "@/types";
import { sampleJobs } from "@/data/sample-jobs";

/**
 * File-based storage adapter.
 *
 * Data is written as JSON under DATA_DIR (default `./.data`, which is
 * git-ignored and never served publicly). Uploaded resumes live in
 * DATA_DIR/uploads with random file names and are only reachable through
 * the authenticated admin download route.
 *
 * This suits a single self-hosted Node server (`next start`, a VPS or a
 * container with a persistent volume). Serverless platforms with read-only
 * or ephemeral file systems need a database + object-storage adapter that
 * implements the same functions — see README → "Storage".
 */

const DATA_DIR = path.resolve(process.env.DATA_DIR ?? path.join(process.cwd(), ".data"));
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

type Collection = "jobs" | "applications" | "enquiries" | "candidates";

export type StoredFile = {
  id: string; // random file name on disk
  originalName: string;
  size: number;
  contentType: string;
};

export type ApplicationRecord = {
  id: string;
  createdAt: string;
  jobSlug: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  noticePeriod: string;
  linkedin: string;
  coverLetter: string;
  futureConsent: boolean;
  resume: StoredFile;
};

export type EnquiryRecord = {
  id: string;
  createdAt: string;
  kind: "contact" | "employer";
  name: string;
  email: string;
  phone: string;
  company?: string;
  industry?: string;
  requirement?: string;
  vacancies?: string;
  enquiryType?: string;
  message: string;
};

export type CandidateRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  experience: string;
  industries: string[];
  jobTypes: string[];
  workMode: string;
  linkedin: string;
  summary: string;
  resume: StoredFile;
};

/* ------------------------------------------------------------------ */
/* Low-level helpers                                                   */
/* ------------------------------------------------------------------ */

let queue: Promise<unknown> = Promise.resolve();
/** Serialise writes within this process to avoid lost updates. */
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = queue.then(fn, fn);
  queue = next.catch(() => undefined);
  return next;
}

function fileFor(collection: Collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

async function readCollection<T>(collection: Collection): Promise<T[] | null> {
  try {
    const raw = await fs.readFile(fileFor(collection), "utf8");
    return JSON.parse(raw) as T[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

async function writeCollection<T>(collection: Collection, data: T[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const target = fileFor(collection);
  const tmp = `${target}.${randomUUID()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), { encoding: "utf8", mode: 0o600 });
  await fs.rename(tmp, target);
}

async function append<T>(collection: Collection, record: T) {
  return withLock(async () => {
    const existing = (await readCollection<T>(collection)) ?? [];
    existing.unshift(record);
    await writeCollection(collection, existing);
    return record;
  });
}

/* ------------------------------------------------------------------ */
/* Jobs                                                                */
/* ------------------------------------------------------------------ */

const seedSamples = process.env.SEED_SAMPLE_JOBS !== "false";

export async function readJobs(): Promise<Job[]> {
  const jobs = await readCollection<Job>("jobs");
  if (jobs) return jobs;
  return seedSamples ? sampleJobs : [];
}

export async function saveJob(job: Job) {
  return withLock(async () => {
    const jobs = await readJobs();
    const index = jobs.findIndex((j) => j.id === job.id);
    if (jobs.some((j) => j.slug === job.slug && j.id !== job.id)) {
      throw new Error("SLUG_TAKEN");
    }
    if (index === -1) jobs.unshift(job);
    else jobs[index] = job;
    await writeCollection("jobs", jobs);
    return job;
  });
}

export async function deleteJob(id: string) {
  return withLock(async () => {
    const jobs = await readJobs();
    await writeCollection(
      "jobs",
      jobs.filter((j) => j.id !== id),
    );
  });
}

/* ------------------------------------------------------------------ */
/* Submissions                                                         */
/* ------------------------------------------------------------------ */

export const createApplication = (r: ApplicationRecord) => append("applications", r);
export const createEnquiry = (r: EnquiryRecord) => append("enquiries", r);
export const createCandidate = (r: CandidateRecord) => append("candidates", r);

export async function listApplications() {
  return (await readCollection<ApplicationRecord>("applications")) ?? [];
}
export async function listEnquiries() {
  return (await readCollection<EnquiryRecord>("enquiries")) ?? [];
}
export async function listCandidates() {
  return (await readCollection<CandidateRecord>("candidates")) ?? [];
}

/* ------------------------------------------------------------------ */
/* Files                                                               */
/* ------------------------------------------------------------------ */

const SIGNATURES: { ext: string; contentType: string; magic: number[] }[] = [
  { ext: ".pdf", contentType: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] },
  {
    ext: ".docx",
    contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    magic: [0x50, 0x4b, 0x03, 0x04],
  },
  { ext: ".doc", contentType: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] },
];

/** Validates the real file signature (not just the extension) and stores it. */
export async function saveResume(file: File): Promise<StoredFile> {
  const lower = file.name.toLowerCase();
  const sig = SIGNATURES.find((s) => lower.endsWith(s.ext));
  if (!sig) throw new Error("INVALID_FILE_TYPE");

  const bytes = Buffer.from(await file.arrayBuffer());
  const matches = sig.magic.every((b, i) => bytes[i] === b);
  if (!matches) throw new Error("INVALID_FILE_CONTENT");

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const id = `${randomUUID()}${sig.ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, id), bytes, { mode: 0o600 });

  return {
    id,
    originalName: file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120),
    size: bytes.length,
    contentType: sig.contentType,
  };
}

export async function deleteStoredFile(id: string) {
  if (!/^[0-9a-f-]{36}\.(pdf|docx|doc)$/.test(id)) return;
  await fs.rm(path.join(UPLOAD_DIR, id), { force: true });
}

export async function readStoredFile(id: string) {
  // Only allow the exact names this module generates — blocks path traversal.
  if (!/^[0-9a-f-]{36}\.(pdf|docx|doc)$/.test(id)) return null;
  try {
    return await fs.readFile(path.join(UPLOAD_DIR, id));
  } catch {
    return null;
  }
}

export function newId() {
  return randomUUID();
}
