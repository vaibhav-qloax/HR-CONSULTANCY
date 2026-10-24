"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { FadeIn, ImageReveal, Magnetic } from "@/components/motion/Interactions";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { ease } from "@/lib/motion";

/** Line-art hexagon echoing the QLOAX mark. */
function HexMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      <path d="M100 8 180 54v92l-80 46-80-46V54z" stroke="currentColor" strokeWidth="1" />
      <path d="M100 48 145 74v52l-45 26-45-26V74z" stroke="currentColor" strokeWidth="1" />
      <path d="M100 8v40M180 54l-35 20M180 146l-35-20M100 192v-40M20 146l35-20M20 54l35 20" stroke="currentColor" strokeWidth="1" />
      {[
        [100, 8],
        [180, 146],
        [20, 54],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" />
      ))}
    </svg>
  );
}

export function Hero({ industryCount }: { industryCount: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const yFront = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 60]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36 lg:min-h-[100svh]">
      {/* subtle grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgb(23_23_23/0.045)_1px,transparent_1px)] [background-size:calc(100%/12)_100%] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgb(34_142_211/0.12),transparent_65%)]"
      />

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative z-10 lg:col-span-7">
          <FadeIn y={10} delay={0.05}>
            <p className="text-eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
              <span>Recruitment</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
              <span>People</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
              <span>Growth</span>
            </p>
          </FadeIn>

          <AnimatedText
            as="h1"
            trigger="mount"
            delay={0.15}
            className="text-display mt-7"
            lines={[
              "People First.",
              [{ text: "Possibilities", className: "serif-accent text-accent pr-[0.06em]" }],
              "Without Limits.",
            ]}
          />

          <FadeIn delay={0.7} className="mt-8 max-w-xl">
            <p className="text-lead text-muted">
              We help ambitious businesses find exceptional talent and build stronger teams through thoughtful
              recruitment and people-focused HR solutions.
            </p>
          </FadeIn>

          <FadeIn delay={0.85} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <ButtonLink href={siteConfig.ctas.hire.href} size="lg">
                {siteConfig.ctas.hire.label}
              </ButtonLink>
            </Magnetic>
            <ButtonLink href={siteConfig.ctas.explore.href} size="lg" variant="outline">
              {siteConfig.ctas.explore.label}
            </ButtonLink>
          </FadeIn>

          <FadeIn delay={1} className="mt-12 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line">
            <Link href="/employers" className="group bg-ivory p-4 transition-colors hover:bg-paper">
              <span className="text-eyebrow text-subtle">For employers</span>
              <span className="mt-2 block font-semibold group-hover:text-accent">Recruitment &amp; HR solutions →</span>
            </Link>
            <Link href="/candidates/register" className="group bg-ivory p-4 transition-colors hover:bg-paper">
              <span className="text-eyebrow text-subtle">For candidates</span>
              <span className="mt-2 block font-semibold group-hover:text-accent">Register your CV →</span>
            </Link>
          </FadeIn>
        </div>

        {/* Image composition */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-[4/5]">
            <motion.div style={{ y: yBack }} className="absolute right-0 top-0 h-[88%] w-[78%]">
              <ImageReveal onMount delay={0.3} className="h-full w-full rounded-[var(--radius-xl)]">
                <Image
                  src="/images/hero-portrait.jpg"
                  alt="A smiling professional standing in a bright modern office"
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, 78vw"
                  className="object-cover object-top"
                />
              </ImageReveal>
            </motion.div>

            <motion.div style={{ y: yFront }} className="absolute bottom-0 left-0 w-[58%]">
              <ImageReveal
                onMount
                delay={0.55}
                direction="right"
                className="aspect-[4/3] rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)] ring-8 ring-ivory"
              >
                <Image
                  src="/images/hero-meeting.jpg"
                  alt="Two colleagues celebrating a successful outcome at their desks"
                  fill
                  priority
                  sizes="(min-width: 1024px) 24vw, 58vw"
                  className="object-cover"
                />
              </ImageReveal>
            </motion.div>

            <motion.div
              style={{ rotate }}
              className="absolute -left-4 top-6 size-28 text-sky md:size-36"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: ease.outExpo, delay: 0.9 }}
            >
              <HexMark className="h-full w-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: ease.outExpo, delay: 1.15 }}
              className="absolute right-3 bottom-[18%] rounded-[var(--radius-md)] border border-line bg-paper/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur md:right-[-1rem]"
            >
              <p className="text-eyebrow text-subtle">Sectors</p>
              <p className="mt-1.5 text-sm font-semibold">Recruiting across {industryCount} industries</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: ease.outExpo, delay: 1.3 }}
              className="absolute left-[40%] top-[6%] hidden items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink shadow-[var(--shadow-soft)] sm:flex"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
                <span className="relative inline-flex size-2 rounded-full bg-ink" />
              </span>
              Permanent · Contract · Executive
            </motion.div>
          </div>
        </div>
      </div>

      <FadeIn delay={1.4} className="container-x mt-14 hidden lg:block">
        <a href="#trust" className="group inline-flex items-center gap-3 text-sm font-medium text-muted hover:text-ink">
          <span className="relative h-10 w-px overflow-hidden bg-line-strong">
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-ink" />
          </span>
          Scroll to explore
          <ArrowDown aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-y-0.5" />
        </a>
      </FadeIn>
    </section>
  );
}
