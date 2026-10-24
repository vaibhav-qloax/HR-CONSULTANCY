import "server-only";

/**
 * Optional email notification via Resend (https://resend.com).
 * Configure RESEND_API_KEY, NOTIFY_EMAIL_TO and NOTIFY_EMAIL_FROM.
 *
 * Notifications only contain a short summary and a link to the admin area.
 * Resumes are never attached and personal details are kept to a minimum.
 * A failed notification never fails the submission, because the record
 * has already been stored.
 */
export async function notifyTeam(subject: string, lines: string[]) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  const from = process.env.NOTIFY_EMAIL_FROM;
  if (!key || !to || !from) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const text = [...lines, "", `Review it in the admin area: ${siteUrl}/admin`].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), subject, text }),
    });
    if (!res.ok) console.error(`[notify] email provider responded with ${res.status}`);
  } catch {
    console.error("[notify] email notification failed");
  }
}
