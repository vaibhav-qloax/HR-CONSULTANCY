"use client";

import { useState } from "react";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

type ApiResponse =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Posts a form to one of the /api/forms endpoints. Success is only reported
 * when the server confirms the submission was stored.
 */
export function useFormSubmit(endpoint: string) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function submit(payload: unknown, file?: File | null) {
    setState({ status: "submitting" });
    try {
      const body = new FormData();
      body.set("payload", JSON.stringify(payload));
      if (file) body.set("resume", file);
      const res = await fetch(endpoint, { method: "POST", body });
      let data: ApiResponse | null = null;
      try {
        data = (await res.json()) as ApiResponse;
      } catch {
        data = null;
      }
      if (res.ok && data?.ok) {
        setState({ status: "success", reference: data.reference });
        return true;
      }
      setState({
        status: "error",
        message:
          (data && !data.ok && data.error) ||
          "We couldn't submit your form right now. Please try again in a moment.",
        fieldErrors: data && !data.ok ? data.fieldErrors : undefined,
      });
      return false;
    } catch {
      setState({
        status: "error",
        message: "We couldn't reach the server. Check your connection and try again.",
      });
      return false;
    }
  }

  return { state, submit, reset: () => setState({ status: "idle" }) };
}
