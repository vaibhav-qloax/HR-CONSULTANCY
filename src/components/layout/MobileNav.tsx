"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { lockScroll } from "./SmoothScroll";
import { siteConfig, type NavItem } from "@/config/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

function active(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNav({
  open,
  onClose,
  items,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    // Focus the close button once the panel is mounted.
    const raf = requestAnimationFrame(() => focusables()[0]?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.7, ease: ease.inOutCirc }}
        >
          <div className="container-x flex h-[72px] shrink-0 items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="order-2 flex h-10 items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 text-sm font-semibold"
            >
              <X aria-hidden="true" className="size-4" />
              Close
            </button>
            <Logo onClick={onClose} className="order-1" />
          </div>

          <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-between gap-10 pb-10 pt-6">
            <ul className="flex flex-col">
              {items.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: ease.outExpo, delay: 0.25 + i * 0.05 }}
                  className="border-b border-line"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-baseline justify-between py-4 text-[clamp(1.9rem,8vw,2.6rem)] font-semibold tracking-[-0.035em]",
                      active(pathname, item.href) ? "text-accent" : "text-ink",
                    )}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-sm font-medium text-subtle">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 gap-3 xs:grid-cols-2">
                <ButtonLink href={siteConfig.ctas.hire.href} onClick={onClose} size="lg">
                  {siteConfig.ctas.hire.label}
                </ButtonLink>
                <ButtonLink href={siteConfig.ctas.jobs.href} onClick={onClose} variant="outline" size="lg">
                  {siteConfig.ctas.jobs.label}
                </ButtonLink>
              </div>
              {(siteConfig.contact.email || siteConfig.contact.phone) && (
                <div className="flex flex-col gap-1 text-muted">
                  {siteConfig.contact.email && (
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-ink">
                      {siteConfig.contact.email}
                    </a>
                  )}
                  {siteConfig.contact.phone && (
                    <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="hover:text-ink">
                      {siteConfig.contact.phone}
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
