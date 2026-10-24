import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { FadeIn, ImageReveal } from "@/components/motion/Interactions";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ShareLinks } from "@/components/cards/ShareLinks";
import { FinalCTA } from "@/components/home/FinalCTA";
import { articles, getArticle, getReadingTime, sortedArticles } from "@/content/articles";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import type { ArticleBlock } from "@/types";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      images: [{ url: article.cover, alt: article.coverAlt }],
    },
  };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    default:
      return <p>{block.text}</p>;
  }
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = sortedArticles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 3);
  const url = new URL(`/insights/${article.slug}`, siteConfig.url).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    image: new URL(article.cover, siteConfig.url).toString(),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article>
        <header className="relative pt-32 md:pt-40">
          <div className="container-x">
            <div className="mx-auto max-w-3xl">
              <FadeIn y={8}>
                <Breadcrumbs items={[{ label: "Insights", href: "/insights" }, { label: article.category }]} />
              </FadeIn>
              <FadeIn y={8} delay={0.05} className="mt-10">
                <span className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent">{article.category}</span>
              </FadeIn>
              <AnimatedText
                as="h1"
                trigger="mount"
                delay={0.1}
                lines={[article.title]}
                className="mt-6 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-balance"
              />
              <FadeIn delay={0.4} className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-muted">
                <span>{article.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span>{getReadingTime(article)} min read</span>
              </FadeIn>
            </div>
          </div>
          <div className="container-x mt-12 md:mt-16">
            <ImageReveal onMount delay={0.3} className="relative mx-auto aspect-[16/9] max-w-5xl rounded-[var(--radius-xl)]">
              <Image src={article.cover} alt={article.coverAlt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
            </ImageReveal>
          </div>
        </header>

        <div className="pb-20 pt-14 md:pt-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl">
              <FadeIn delay={0.5}>
                <p className="text-[1.3rem] leading-relaxed text-ink">{article.excerpt}</p>
              </FadeIn>
              <div className="prose-qloax mt-10">
                {article.body.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </div>
              <div className="mt-14 border-t border-line pt-8">
                <ShareLinks url={url} title={article.title} />
              </div>
            </div>
          </div>
        </div>
      </article>

      <section aria-label="Related articles" className="section-y border-t border-line bg-paper">
        <div className="container-x">
          <SectionHeading eyebrow="Keep reading" title={["More ideas for", [{ text: "hiring and careers.", className: "serif-accent text-accent" }]]} />
          <RevealGroup as="ul" className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {related.map((a) => (
              <RevealItem as="li" key={a.slug}>
                <ArticleCard article={a} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
