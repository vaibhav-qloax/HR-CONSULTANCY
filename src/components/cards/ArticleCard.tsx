import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";
import { getReadingTime } from "@/content/articles";
import { cn, formatDate } from "@/lib/utils";

export function ArticleCard({
  article,
  size = "md",
  className,
  headingLevel = "h3",
}: {
  article: Article;
  size?: "md" | "lg";
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div
        data-cursor="Read"
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-lg)] bg-ivory-deep",
          size === "lg" ? "aspect-[4/3] lg:aspect-[16/11]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={article.cover}
          alt={article.coverAlt}
          fill
          sizes={size === "lg" ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-semibold backdrop-blur">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="text-sm text-subtle">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden="true"> · </span>
          {getReadingTime(article)} min read
        </p>
        <H
          className={cn(
            "mt-3 font-semibold tracking-[-0.025em] transition-colors group-hover:text-accent",
            size === "lg" ? "text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.1]" : "text-xl leading-snug md:text-[1.35rem]",
          )}
        >
          <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </H>
        <p className={cn("mt-3 text-muted", size === "lg" ? "text-lg" : "line-clamp-2")}>{article.excerpt}</p>
      </div>
    </article>
  );
}
