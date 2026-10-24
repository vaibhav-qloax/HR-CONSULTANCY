import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-eyebrow inline-flex items-center gap-3 text-muted", className)}>
      <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

type Line = React.ComponentProps<typeof AnimatedText>["lines"][number];

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className,
  titleClassName,
  children,
}: {
  eyebrow?: string;
  title: Line[];
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal y={12}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <AnimatedText as={as} lines={title} className={cn(as === "h1" ? "text-h1" : "text-h2", "text-balance", titleClassName)} />
      {description && (
        <Reveal delay={0.15} className={cn("text-lead max-w-2xl text-muted", align === "center" && "mx-auto")}>
          {description}
        </Reveal>
      )}
      {children}
    </div>
  );
}
