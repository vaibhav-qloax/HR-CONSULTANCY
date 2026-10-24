"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { approachSteps } from "@/data/company";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * "Our approach" — on large screens with motion allowed, the section pins
 * and the steps travel horizontally as you scroll. Everywhere else it is a
 * normal, fully readable vertical timeline. Content is identical in both.
 */
export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const distance = () => track.scrollWidth - track.clientWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="approach-title" className="relative overflow-hidden bg-ivory-deep">
      <div className="container-x flex flex-col justify-center py-24 lg:min-h-[100svh] lg:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Our approach</Eyebrow>
            <div id="approach-title">
              <AnimatedText
                as="h2"
                className="text-h2 mt-6 text-balance"
                lines={["From hiring needs", ["to the", { text: "right people.", className: "serif-accent text-accent" }]]}
              />
            </div>
          </div>
          <p className="text-lead text-muted lg:col-span-5">
            A clear, five-stage process that keeps everyone informed and every decision grounded in what your
            business actually needs.
          </p>
        </div>

        <ol
          ref={trackRef}
          className="mt-14 flex flex-col gap-4 lg:mt-16 lg:grid lg:grid-cols-5 lg:gap-5 lg:motion-safe:flex lg:motion-safe:flex-row lg:motion-safe:will-change-transform"
        >
          {approachSteps.map((step, i) => (
            <li
              key={step.number}
              className="group relative flex shrink-0 flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7 transition-colors duration-500 hover:border-accent/40 lg:min-h-[23rem] lg:p-7 lg:motion-safe:w-[min(30rem,38vw)] lg:motion-safe:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.06em] text-ink/[0.08] transition-colors duration-500 group-hover:text-accent/25">
                  {step.number}
                </span>
                <span className="text-eyebrow text-subtle">
                  Step {i + 1} / {approachSteps.length}
                </span>
              </div>
              <h3 className="mt-auto pt-10 text-[clamp(1.6rem,2.4vw,2.2rem)] font-semibold tracking-[-0.03em]">
                {step.title}
              </h3>
              <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
          <li aria-hidden="true" className="hidden shrink-0 lg:motion-safe:block lg:w-[8vw]" />
        </ol>

        <div aria-hidden="true" className="mt-10 hidden h-px w-full overflow-hidden bg-line-strong lg:motion-safe:block">
          <div ref={progressRef} className="h-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </section>
  );
}
