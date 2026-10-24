"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ServiceIcon } from "@/components/ui/Icon";
import type { IconName } from "@/types";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type ServicePreview = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  icon: IconName;
};

/**
 * Editorial service index. On large screens a sticky preview image follows
 * the hovered or focused row; on small screens each row carries its own image.
 */
export function ServicesShowcase({ items }: { items: ServicePreview[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ol className="border-t border-line lg:col-span-7">
        {items.map((s, i) => (
          <motion.li
            key={s.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.7, ease: ease.outExpo, delay: i * 0.04 }}
            className="border-b border-line"
          >
            <Link
              href={`/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-3 py-7 md:gap-x-8 md:py-8"
            >
              <span
                className={cn(
                  "pt-1.5 text-sm font-semibold tabular-nums transition-colors duration-300",
                  active === i ? "text-accent" : "text-subtle",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span
                  className={cn(
                    "block text-[clamp(1.45rem,2.6vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] transition-[color,transform] duration-500 ease-[var(--ease-out-expo)]",
                    active === i ? "lg:translate-x-2 lg:text-ink" : "lg:text-ink/55",
                  )}
                >
                  {s.title}
                </span>
                <span className="mt-2 block max-w-lg text-[0.97rem] leading-relaxed text-muted">{s.summary}</span>
                <span className="relative mt-5 block aspect-[16/9] overflow-hidden rounded-[var(--radius-md)] lg:hidden">
                  <Image src={s.image} alt="" fill sizes="100vw" className="object-cover" />
                </span>
              </span>
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-out-expo)]",
                  active === i
                    ? "border-accent bg-accent text-white lg:rotate-45"
                    : "border-line-strong text-ink group-hover:border-ink",
                )}
              >
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </Link>
          </motion.li>
        ))}
      </ol>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] bg-ivory-deep" data-cursor="View">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 0.8, ease: ease.outExpo }}
              >
                <Image src={current.image} alt="" fill sizes="38vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-[var(--radius-md)] bg-paper/92 p-4 backdrop-blur">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <ServiceIcon name={current.icon} className="size-5" />
              </span>
              <p className="text-[0.95rem] font-semibold leading-snug">{current.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
