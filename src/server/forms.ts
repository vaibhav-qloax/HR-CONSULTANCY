import "server-only";
import { NextResponse } from "next/server";
import type { z } from "zod";
import { clientIp, rateLimit, sameOrigin } from "./guard";
import { resumeFileError } from "@/lib/validation";

export type Parsed<T> =
  | { ok: true; data: T; file: File | null }
  | { ok: false; response: NextResponse };

export function fail(status: number, error: string, fieldErrors?: Record<string, string>) {
  return NextResponse.json({ ok: false, error, fieldErrors }, { status });
}

export function success(reference: string) {
  return NextResponse.json({ ok: true, reference }, { status: 201 });
}

/** Short, human-friendly reference shown to the person who submitted. */
export function referenceFrom(id: string, prefix: string) {
  return `${prefix}-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

const MAX_BODY = 6 * 1024 * 1024;

/**
 * Shared request handling for public forms: origin check, rate limit,
 * multipart parsing, schema validation, honeypot and optional resume.
 */
export async function parseFormRequest<T extends { website?: string }>(
  request: Request,
  schema: z.ZodType<T>,
  opts: { key: string; requireResume?: boolean },
): Promise<Parsed<T>> {
  if (!sameOrigin(request.headers)) {
    return { ok: false, response: fail(403, "This form can only be submitted from the QLOAX website.") };
  }
  if (!rateLimit(`${opts.key}:${clientIp(request.headers)}`, 6, 10 * 60 * 1000, Date.now())) {
    return {
      ok: false,
      response: fail(429, "You've sent several submissions in a short time. Please wait a few minutes and try again."),
    };
  }
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) {
    return { ok: false, response: fail(413, "The upload is too large. Resumes must be 5 MB or smaller.", { resume: "File is too large." }) };
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return { ok: false, response: fail(400, "We couldn't read your submission. Please try again.") };
  }

  let raw: unknown;
  try {
    raw = JSON.parse(String(form.get("payload") ?? ""));
  } catch {
    return { ok: false, response: fail(400, "We couldn't read your submission. Please try again.") };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path.map(String).join(".");
      if (k && !fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return { ok: false, response: fail(422, "Please check the highlighted fields and try again.", fieldErrors) };
  }

  const fileEntry = form.get("resume");
  const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;
  if (opts.requireResume) {
    const err = resumeFileError(file);
    if (err) return { ok: false, response: fail(422, err, { resume: err }) };
  }

  return { ok: true, data: parsed.data, file };
}

export const storageFailure = () =>
  fail(
    503,
    "We couldn't save your submission because of a technical problem on our side. Nothing was sent. Please try again later or contact us directly.",
  );
