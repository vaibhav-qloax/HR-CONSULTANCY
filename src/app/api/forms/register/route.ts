import { registrationSchema } from "@/lib/validation";
import { fail, parseFormRequest, referenceFrom, storageFailure, success } from "@/server/forms";
import { createCandidate, deleteStoredFile, newId, saveResume } from "@/server/store";
import { notifyTeam } from "@/server/notify";

export async function POST(request: Request) {
  const parsed = await parseFormRequest(request, registrationSchema, { key: "register", requireResume: true });
  if (!parsed.ok) return parsed.response;
  const d = parsed.data;

  let resume;
  try {
    resume = await saveResume(parsed.file!);
  } catch (err) {
    const code = (err as Error).message;
    if (code === "INVALID_FILE_TYPE" || code === "INVALID_FILE_CONTENT") {
      const msg = "That file doesn't appear to be a valid PDF, DOC or DOCX document.";
      return fail(422, msg, { resume: msg });
    }
    console.error("[register] could not store resume");
    return storageFailure();
  }

  const id = newId();
  try {
    await createCandidate({
      id,
      createdAt: new Date().toISOString(),
      name: d.name,
      email: d.email,
      phone: d.phone,
      location: d.location,
      currentRole: d.currentRole,
      experience: d.experience,
      industries: d.industries,
      jobTypes: d.jobTypes,
      workMode: d.workMode,
      linkedin: d.linkedin,
      summary: d.summary,
      resume,
    });
  } catch {
    await deleteStoredFile(resume.id).catch(() => undefined);
    console.error("[register] could not store registration");
    return storageFailure();
  }

  await notifyTeam("New candidate registration", ["A new candidate registered their profile."]);
  return success(referenceFrom(id, "CAN"));
}
