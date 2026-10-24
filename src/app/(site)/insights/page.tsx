import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { LoadingState } from "@/components/ui/States";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { InsightsBrowser } from "@/components/cards/InsightsBrowser";
import { articleCategories, sortedArticles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical advice on hiring, careers, workplace culture and talent strategy from QLOAX.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const [featured] = sortedArticles;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Insights" }]}
        eyebrow="Insights & resources"
        title={["Ideas for better hiring", [{ text: "and better careers.", className: "serif-accent text-accent" }]]}
        lead="Practical advice for employers building teams and for people planning their next move."
      />

      {featured && (
        <section className="pb-16 pt-14 md:pb-20 md:pt-20">
          <div className="container-x">
            <Reveal y={12} className="mb-8">
              <Eyebrow>Latest article</Eyebrow>
            </Reveal>
            <Reveal>
              <ArticleCard article={featured} size="lg" headingLevel="h2" />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-y border-t border-line bg-paper">
        <div className="container-x">
          <Suspense fallback={<LoadingState label="Loading articles" rows={3} className="md:grid-cols-3" />}>
            <InsightsBrowser articles={sortedArticles} categories={articleCategories} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
