import { employerSchema } from "@/lib/validation";
import { parseFormRequest, referenceFrom, storageFailure, success } from "@/server/forms";
import { createEnquiry, newId } from "@/server/store";
import { notifyTeam } from "@/server/notify";

export async function POST(request: Request) {
  const parsed = await parseFormRequest(request, employerSchema, { key: "employer" });
  if (!parsed.ok) return parsed.response;
  const d = parsed.data;

  const id = newId();
  try {
    await createEnquiry({
      id,
      createdAt: new Date().toISOString(),
      kind: "employer",
      name: d.name,
      email: d.email,
      phone: d.phone,
      company: d.company,
      industry: d.industry,
      requirement: d.requirement,
      vacancies: d.vacancies,
      message: d.message,
    });
  } catch (err) {
    console.error("[employer] could not store enquiry", (err as Error).message);
    return storageFailure();
  }

  await notifyTeam(`New hiring enquiry from ${d.company}`, [
    `Requirement: ${d.requirement}`,
    `Industry: ${d.industry}`,
    d.vacancies ? `Vacancies: ${d.vacancies}` : "Vacancies: not specified",
  ]);
  return success(referenceFrom(id, "HIRE"));
}
