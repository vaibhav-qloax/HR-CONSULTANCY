import Link from "next/link";
import { ArrowRight, ArrowUpRight, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-[var(--dur-base)] ease-[var(--ease-out-expo)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-55 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-accent shadow-[0_1px_0_rgb(255_255_255/0.08)_inset]",
  accent: "bg-accent text-white hover:bg-accent-deep",
  outline: "border border-ink/15 bg-paper/60 text-ink backdrop-blur hover:border-ink hover:bg-paper",
  ghost: "text-ink hover:text-accent px-0!",
  light: "bg-paper text-ink hover:bg-lime",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

function Arrow({ external }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <span aria-hidden="true" className="relative inline-flex size-4 overflow-hidden">
      <Icon className="size-4 shrink-0 transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover/btn:translate-x-[150%]" />
      <Icon className="absolute inset-0 size-4 -translate-x-[150%] transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0" />
    </span>
  );
}

type Common = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  children,
  external,
  ...rest
}: Common & { href: string; external?: boolean } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow external={external} />}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  loading = false,
  loadingLabel = "Submitting…",
  className,
  children,
  type = "button",
  disabled,
  ...rest
}: Common & {
  loading?: boolean;
  loadingLabel?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <>
          <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          {arrow && <Arrow />}
        </>
      )}
    </button>
  );
}

/** Inline text link with animated underline + arrow. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-accent",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:origin-left group-hover/link:scale-x-100"
        />
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover/link:translate-x-1"
      />
    </Link>
  );
}
