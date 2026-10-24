"use client";

import { motion } from "motion/react";
import { Fragment } from "react";
import { duration, ease, stagger, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Segment = string | { text: string; className?: string };
type Line = Segment[] | string;

type AnimatedTextProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Each entry renders on its own line. Segments let you style single words. */
  lines: Line[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** "mount" for above-the-fold heroes, "inView" for everything else. */
  trigger?: "mount" | "inView";
};

/**
 * Word-by-word masked reveal. Screen readers get the plain sentence via an
 * sr-only copy; the animated words are hidden from assistive technology.
 */
export function AnimatedText({
  as = "h2",
  lines,
  className,
  lineClassName,
  delay = 0,
  trigger = "inView",
}: AnimatedTextProps) {
  const Tag = as;
  const normalised: Segment[][] = lines.map((l) => (typeof l === "string" ? [l] : l));
  const plain = normalised
    .map((segs) => segs.map((s) => (typeof s === "string" ? s : s.text)).join(" "))
    .join(" ");

  let wordIndex = 0;
  const animateProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "show" }
      : { initial: "hidden", whileInView: "show", viewport };

  return (
    <Tag className={className}>
      <span className="sr-only">{plain}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        {...animateProps}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger.words, delayChildren: delay } } }}
      >
        {normalised.map((segments, li) => (
          <span key={li} className={cn("block", lineClassName)}>
            {segments.map((seg, si) => {
              const text = typeof seg === "string" ? seg : seg.text;
              const segClass = typeof seg === "string" ? undefined : seg.className;
              const words = text.split(" ").filter(Boolean);
              return (
                <Fragment key={si}>
                  {words.map((word, wi) => {
                    wordIndex++;
                    return (
                      <Fragment key={`${si}-${wi}-${wordIndex}`}>
                        <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                          <motion.span
                            className={cn("inline-block will-change-transform", segClass)}
                            variants={{
                              hidden: { y: "110%", rotate: 2 },
                              show: {
                                y: "0%",
                                rotate: 0,
                                transition: { duration: duration.hero, ease: ease.outExpo },
                              },
                            }}
                          >
                            {word}
                          </motion.span>
                        </span>{" "}
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
