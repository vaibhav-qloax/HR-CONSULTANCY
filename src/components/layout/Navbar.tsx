"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Briefcase, ChevronDown, Menu } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Interactions";
import { MobileNav } from "./MobileNav";
import { siteConfig, type NavItem } from "@/config/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 480 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on route change and Escape.
  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden && !openMenu ? "-110%" : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: ease.outExpo }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || openMenu
            ? "border-line bg-ivory/85 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Main" className="container-x flex h-[72px] items-center justify-between gap-6">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              const hasChildren = Boolean(item.children?.length);
              const expanded = openMenu === item.href;
              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenMenu(item.href)}
                  onMouseLeave={() => hasChildren && setOpenMenu(null)}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-3 py-2 text-[0.92rem] font-medium transition-colors duration-200",
                        active ? "text-ink" : "text-ink-soft/80 hover:text-ink",
                      )}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-accent"
                          transition={{ duration: 0.5, ease: ease.outExpo }}
                        />
                      )}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`menu-${item.label}`}
                        aria-label={`${item.label} menu`}
                        onClick={() => setOpenMenu(expanded ? null : item.href)}
                        className="-ml-2 flex size-7 items-center justify-center rounded-full text-muted hover:text-ink"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn("size-3.5 transition-transform duration-300", expanded && "rotate-180")}
                        />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {hasChildren && expanded && (
                      <motion.div
                        id={`menu-${item.label}`}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.28, ease: ease.outExpo }}
                        className="absolute left-1/2 top-full w-[min(44rem,80vw)] -translate-x-1/2 pt-3"
                      >
                        <div className="grid grid-cols-[1fr_15rem] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper shadow-[var(--shadow-lift)]">
                          <ul className="grid grid-cols-2 gap-1 p-3">
                            {item.children!.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="group/item block rounded-[var(--radius-md)] p-3 transition-colors hover:bg-ivory"
                                >
                                  <span className="flex items-center justify-between text-[0.92rem] font-semibold">
                                    {child.label}
                                    <span
                                      aria-hidden="true"
                                      className="text-accent opacity-0 transition-[opacity,transform] duration-300 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                                    >
                                      →
                                    </span>
                                  </span>
                                  {child.description && (
                                    <span className="mt-1 line-clamp-2 block text-[0.8rem] leading-snug text-muted">
                                      {child.description}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-col justify-between bg-ink p-6 text-white">
                            <p className="text-eyebrow text-white/60">{item.label}</p>
                            <div>
                              <p className="text-lg font-semibold leading-snug tracking-tight">
                                Not sure where to start?
                              </p>
                              <Link
                                href={item.href}
                                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-lime hover:underline"
                              >
                                View all {item.label.toLowerCase()} →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={siteConfig.ctas.jobs.href}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.92rem] font-semibold text-ink transition-colors hover:text-accent md:inline-flex"
            >
              <Briefcase aria-hidden="true" className="size-4" strokeWidth={1.75} />
              {siteConfig.ctas.jobs.label}
            </Link>
            <Magnetic className="hidden sm:inline-block">
              <ButtonLink href={siteConfig.ctas.hire.href} size="sm" className="px-5">
                {siteConfig.ctas.hire.label}
              </ButtonLink>
            </Magnetic>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="flex h-10 items-center gap-2 rounded-full border border-ink/15 bg-paper/70 px-4 text-sm font-semibold lg:hidden"
            >
              <Menu aria-hidden="true" className="size-4" />
              Menu
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileNav
        open={mobileOpen}
        onClose={closeMobile}
        items={items}
        pathname={pathname}
      />
    </>
  );
}
