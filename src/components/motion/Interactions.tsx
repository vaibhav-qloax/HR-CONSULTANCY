"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { duration, ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Gently pulls its child toward the pointer. Fine pointers only. */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/** Vertical parallax for decorative imagery. Disabled for reduced motion. */
export function Parallax({
  children,
  offset = 60,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-offset, offset]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y, top: -offset, bottom: -offset }} className="absolute inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}

/** Clip-path mask reveal for images. */
export function ImageReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  onMount = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  onMount?: boolean;
}) {
  const hidden =
    direction === "up"
      ? "inset(100% 0% 0% 0%)"
      : direction === "left"
        ? "inset(0% 100% 0% 0%)"
        : "inset(0% 0% 0% 100%)";
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport };
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: { clipPath: hidden },
        show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: ease.outExpo, delay } },
      }}
    >
      <motion.div
        className="relative h-full w-full"
        variants={{
          hidden: { scale: 1.15 },
          show: { scale: 1, transition: { duration: 1.4, ease: ease.outExpo, delay } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Simple fade used for small UI elements on mount. */
export function FadeIn({
  children,
  delay = 0,
  className,
  y = 16,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.reveal, ease: ease.outExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
