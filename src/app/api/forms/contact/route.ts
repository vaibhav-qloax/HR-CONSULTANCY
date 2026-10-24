import { contactSchema } from "@/lib/validation";
import { parseFormRequest, referenceFrom, storageFailure, success } from "@/server/forms";
import { createEnquiry, newId } from "@/server/store";
import { notifyTeam } from "@/server/notify";

export async function POST(request: Request) {
  const parsed = await parseFormRequest(request, contactSchema, { key: "contact" });
  if (!parsed.ok) return parsed.response;
  const d = parsed.data;

  const id = newId();
  try {
    await createEnquiry({
      id,
      createdAt: new Date().toISOString(),
      kind: "contact",
      name: d.name,
      email: d.email,
      phone: d.phone,
      enquiryType: d.enquiryType,
      message: d.message,
    });
  } catch (err) {
    console.error("[contact] could not store enquiry", (err as Error).message);
    return storageFailure();
  }

  await notifyTeam(`New contact enquiry: ${d.enquiryType}`, [`A new ${d.enquiryType.toLowerCase()} enquiry was received.`]);
  return success(referenceFrom(id, "MSG"));
}
