import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group/logo inline-flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <Image
        src={siteConfig.logo}
        alt=""
        width={36}
        height={36}
        priority
        className="size-9 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/logo:rotate-[60deg]"
      />
      <span className="text-[1.3rem] font-extrabold tracking-[0.08em] text-ink">{siteConfig.name}</span>
    </Link>
  );
}
