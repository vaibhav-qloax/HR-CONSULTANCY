"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState } from "react";
import type { CaseStudy } from "@/types";
import { SampleBadge } from "@/components/ui/States";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Accessible tabbed case-study viewer (WAI-ARIA tabs pattern). */
export function CaseStudies({ items }: { items: CaseStudy[] }) {
  const [index, setIndex] = useState(0);
  const baseId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[index];

  function onKeyDown(e: React.KeyboardEvent) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    setIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Case studies" className="flex gap-2 overflow-x-auto pb-2" onKeyDown={onKeyDown}>
        {items.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === index}
            aria-controls={`${baseId}-panel`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => setIndex(i)}
            className={cn(
              "relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
              i === index ? "border-ink text-white" : "border-line-strong text-ink-soft hover:border-ink",
            )}
          >
            {i === index && (
              <motion.span
                layoutId={`${baseId}-pill`}
                className="absolute inset-0 -z-0 rounded-full bg-ink"
                transition={{ duration: 0.45, ease: ease.outExpo }}
              />
            )}
            <span className="relative">{c.industry}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${index}`}
        tabIndex={0}
        className="mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-paper"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: ease.outExpo }}
            className="grid lg:grid-cols-12"
          >
            <div className="relative aspect-[16/10] lg:col-span-5 lg:aspect-auto">
              <Image src={current.image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              {current.isSample && <SampleBadge label="Illustrative example" className="absolute left-5 top-5" />}
            </div>
            <div className="p-7 md:p-10 lg:col-span-7 lg:p-12">
              <p className="text-eyebrow text-accent">{current.industry}</p>
              <h3 className="mt-4 text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                {current.title}
              </h3>
              <dl className="mt-8 grid gap-6 md:grid-cols-3">
                {(
                  [
                    ["The challenge", current.challenge],
                    ["Our approach", current.approach],
                    ["The outcome", current.outcome],
                  ] as const
                ).map(([term, text]) => (
                  <div key={term} className="border-t border-line pt-4">
                    <dt className="text-sm font-semibold">{term}</dt>
                    <dd className={cn("mt-2 text-[0.95rem] leading-relaxed text-muted", current.isSample && term === "The outcome" && "italic")}>
                      {text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {items.some((c) => c.isSample) && (
        <p className="mt-4 text-sm text-subtle">
          Illustrative examples show how case studies will be presented. They do not describe real clients or
          results.
        </p>
      )}
    </div>
  );
}
