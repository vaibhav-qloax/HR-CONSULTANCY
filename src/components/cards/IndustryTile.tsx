import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Industry } from "@/types";
import { cn } from "@/lib/utils";

export function IndustryTile({
  industry,
  index,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  industry: Industry;
  index: number;
  className?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      data-cursor="View"
      className={cn(
        "group relative isolate flex min-h-[18rem] flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] bg-ink p-6 text-white md:p-7",
        className,
      )}
    >
      <Image
        src={industry.image}
        alt=""
        fill
        sizes={sizes}
        className="-z-10 object-cover opacity-80 transition-[transform,opacity] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06] group-hover:opacity-60"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/0"
      />
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-white/70">{String(index + 1).padStart(2, "0")}</span>
        <span className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition-[background-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-white group-hover:text-ink">
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-semibold tracking-[-0.025em] md:text-[1.75rem]">{industry.name}</h3>
        <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-white/80 transition-[opacity,transform] duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
          {industry.summary}
        </p>
      </div>
    </Link>
  );
}
