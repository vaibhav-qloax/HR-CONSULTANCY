"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo, useState } from "react";
import type { Article, ArticleCategory } from "@/types";
import { ArticleCard } from "./ArticleCard";
import { EmptyState } from "@/components/ui/States";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function InsightsBrowser({ articles, categories }: { articles: Article[]; categories: ArticleCategory[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pillId = useId();
  const initial = params.get("category");
  const [category, setCategory] = useState<string>(initial && categories.includes(initial as ArticleCategory) ? initial : "All");
  const [query, setQuery] = useState("");

  function choose(c: string) {
    setCategory(c);
    router.replace(c === "All" ? pathname : `${pathname}?category=${encodeURIComponent(c)}`, { scroll: false });
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (category === "All" || a.category === category) &&
        (!q || `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(q)),
    );
  }, [articles, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => choose(c)}
              className={cn(
                "relative rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300",
                category === c ? "border-ink text-white" : "border-line-strong bg-paper text-ink-soft hover:border-ink",
              )}
            >
              {category === c && (
                <motion.span
                  layoutId={`${pillId}-pill`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ duration: 0.45, ease: ease.outExpo }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
        <label className="relative block lg:w-80">
          <span className="sr-only">Search articles</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="h-11 w-full rounded-full border border-line-strong bg-paper pl-11 pr-4 transition-colors hover:border-ink focus:border-accent"
          />
        </label>
      </div>

      <p aria-live="polite" className="sr-only">
        {results.length} articles shown
      </p>

      {results.length ? (
        <ul className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((a, i) => (
              <motion.li
                key={a.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: ease.outExpo, delay: Math.min(i, 5) * 0.05 }}
              >
                <ArticleCard article={a} headingLevel="h2" />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <EmptyState className="mt-12" title="No articles found" description="Try another category or search term." />
      )}
    </div>
  );
}
