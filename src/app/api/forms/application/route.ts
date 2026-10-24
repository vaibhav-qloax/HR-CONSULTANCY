import { applicationSchema } from "@/lib/validation";
import { fail, parseFormRequest, referenceFrom, storageFailure, success } from "@/server/forms";
import { createApplication, deleteStoredFile, newId, readJobs, saveResume } from "@/server/store";
import { notifyTeam } from "@/server/notify";
import { applicationsAllowedFor } from "@/lib/jobs";

export async function POST(request: Request) {
  const parsed = await parseFormRequest(request, applicationSchema, { key: "application", requireResume: true });
  if (!parsed.ok) return parsed.response;
  const d = parsed.data;

  // Always check the live job record, not the cached public copy.
  const job = (await readJobs()).find((j) => j.slug === d.jobSlug);
  const today = new Date().toISOString().slice(0, 10);
  if (!job || job.status !== "published" || (job.closesAt && job.closesAt < today)) {
    return fail(410, "This role is no longer accepting applications.");
  }
  if (!applicationsAllowedFor(job)) {
    return fail(
      409,
      "This is a sample listing used to demonstrate the website, so applications can't be submitted for it. Please register your CV instead.",
    );
  }

  let resume;
  try {
    resume = await saveResume(parsed.file!);
  } catch (err) {
    const code = (err as Error).message;
    if (code === "INVALID_FILE_TYPE" || code === "INVALID_FILE_CONTENT") {
      const msg = "That file doesn't appear to be a valid PDF, DOC or DOCX document.";
      return fail(422, msg, { resume: msg });
    }
    console.error("[application] could not store resume");
    return storageFailure();
  }

  const id = newId();
  try {
    await createApplication({
      id,
      createdAt: new Date().toISOString(),
      jobSlug: job.slug,
      jobTitle: job.title,
      name: d.name,
      email: d.email,
      phone: d.phone,
      location: d.location,
      experience: d.experience,
      noticePeriod: d.noticePeriod,
      linkedin: d.linkedin,
      coverLetter: d.coverLetter,
      futureConsent: d.futureConsent,
      resume,
    });
  } catch {
    await deleteStoredFile(resume.id).catch(() => undefined);
    console.error("[application] could not store application");
    return storageFailure();
  }

  await notifyTeam(`New application: ${job.title}`, [`A new application was received for ${job.title}.`]);
  return success(referenceFrom(id, "APP"));
}
