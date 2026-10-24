import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { FadeIn, ImageReveal } from "@/components/motion/Interactions";
import { Eyebrow } from "./SectionHeading";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };
type Line = React.ComponentProps<typeof AnimatedText>["lines"][number];

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <li>
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden="true" className="size-3.5 text-subtle" />
            {c.href ? (
              <Link href={c.href} className="hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  imageAlt = "",
  actions,
  aside,
  className,
}: {
  eyebrow?: string;
  title: Line[];
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative pt-32 md:pt-40", className)}>
      <div className="container-x">
        {crumbs && (
          <FadeIn y={8}>
            <Breadcrumbs items={crumbs} />
          </FadeIn>
        )}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="flex max-w-5xl flex-col gap-7">
            {eyebrow && (
              <FadeIn y={8} delay={0.05}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </FadeIn>
            )}
            <AnimatedText as="h1" trigger="mount" delay={0.1} lines={title} className="text-h1 text-balance" />
            {lead && (
              <FadeIn delay={0.45} className="text-lead max-w-2xl text-muted">
                {lead}
              </FadeIn>
            )}
            {actions && (
              <FadeIn delay={0.6} className="flex flex-wrap gap-3">
                {actions}
              </FadeIn>
            )}
          </div>
          {aside && <FadeIn delay={0.6}>{aside}</FadeIn>}
        </div>
      </div>
      {image && (
        <div className="container-x mt-14 md:mt-20">
          <ImageReveal onMount delay={0.35} className="relative aspect-[16/9] rounded-[var(--radius-xl)] md:aspect-[21/9]">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1408px) 1344px, 100vw" className="object-cover" />
          </ImageReveal>
        </div>
      )}
    </section>
  );
}
