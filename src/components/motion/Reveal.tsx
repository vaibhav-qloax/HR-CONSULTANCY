"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { duration, ease, stagger, viewport } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "span";
};

/** Fades + lifts content into view once. Stays visible afterwards. */
export function Reveal({ delay = 0, y = 28, as = "div", children, ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: duration.reveal, ease: ease.outExpo, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Container that staggers its <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger.items, delayChildren: delay } },
      }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  ...rest
}: HTMLMotionProps<"div"> & { as?: "div" | "li" | "article" }) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: ease.outExpo } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
