"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const email = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const pill =
    "inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-muted">Share</span>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className={pill}>
        LinkedIn<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={email} className={pill}>
        Email
      </a>
      <button type="button" onClick={copy} className={pill}>
        {copied ? <Check aria-hidden="true" className="size-4 text-success" /> : <Link2 aria-hidden="true" className="size-4" />}
        <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
