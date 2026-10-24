import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { ApproachSection } from "@/components/home/ApproachSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { CaseStudies } from "@/components/home/CaseStudies";
import { TeamSection, TestimonialSection } from "@/components/home/PeopleSections";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FeaturedJobs } from "@/components/jobs/FeaturedJobs";
import { IndustryTile } from "@/components/cards/IndustryTile";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/company";
import { sortedArticles } from "@/content/articles";
import { getOpenJobs } from "@/lib/jobs";
import { toJobCard } from "@/lib/job-card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* Bento spans for the seven industry tiles on large screens. */
const industryLayout = [
  "lg:col-span-7 lg:row-span-2 lg:min-h-[34rem]",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-12 lg:min-h-[20rem]",
];

export default async function HomePage() {
  const jobs = (await getOpenJobs()).map(toJobCard);
  const [leadArticle, ...moreArticles] = sortedArticles.slice(0, 3);

  return (
    <>
      <Hero industryCount={industries.length} />
      <TrustStrip />
      <AboutIntro />

      {/* Services */}
      <section className="section-y border-t border-line bg-paper">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              className="lg:col-span-8"
              eyebrow="What we do"
              title={["People solutions that", [{ text: "move business forward.", className: "serif-accent text-accent" }]]}
            />
            <Reveal delay={0.2} className="lg:col-span-4">
              <p className="text-lead text-muted">
                From a single critical hire to an embedded recruitment function, we shape our support around
                what your organisation needs right now.
              </p>
            </Reveal>
          </div>
          <div className="mt-16">
            <ServicesShowcase
              items={services.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary, image: s.image, icon: s.icon }))}
            />
          </div>
          <Reveal className="mt-12">
            <TextLink href="/services">Explore all services</TextLink>
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Industries we serve"
              title={["Specialist understanding,", "sector by sector."]}
              description="Every industry hires differently. We take time to learn the roles, language and realities of the sectors we recruit for."
            />
            <Reveal delay={0.2} className="shrink-0">
              <ButtonLink href="/industries" variant="outline">
                All industries
              </ButtonLink>
            </Reveal>
          </div>
          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {industries.map((industry, i) => (
              <RevealItem key={industry.slug} className={cn("flex", industryLayout[i] ?? "lg:col-span-4", i === 6 && "md:col-span-2")}>
                <IndustryTile industry={industry} index={i} className="w-full" sizes={i === 0 || i === 6 ? "(min-width: 1024px) 60vw, 100vw" : undefined} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ApproachSection />

      {/* Featured jobs */}
      <section className="section-y" aria-labelledby="jobs-heading">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8" id="jobs-heading">
              <SectionHeading
                eyebrow="Featured opportunities"
                title={["Your next opportunity", [{ text: "starts here.", className: "serif-accent text-accent" }]]}
              />
            </div>
            <Reveal delay={0.2} className="lg:col-span-4">
              <p className="text-lead text-muted">
                Search current roles by keyword, location, job type and work mode. Every application is reviewed
                by a consultant.
              </p>
            </Reveal>
          </div>
          {jobs.some((j) => j.isSample) && (
            <p className="mt-8 rounded-[var(--radius-md)] border border-warning/20 bg-[#fff9e8] px-4 py-3 text-sm text-warning">
              These are sample listings used to demonstrate the job board. They are not real vacancies.
            </p>
          )}
          <div className="mt-8">
            <FeaturedJobs jobs={jobs} />
          </div>
        </div>
      </section>

      <WhyChoose />

      {/* Case studies */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Results & case studies"
            title={["How we approach", "hiring challenges."]}
            description="A look at the kinds of challenges we help with and how we tackle them."
          />
          <div className="mt-14">
            <CaseStudies items={caseStudies} />
          </div>
        </div>
      </section>

      <TestimonialSection />
      <TeamSection />

      {/* Insights */}
      <section className="section-y border-t border-line bg-paper">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Insights & resources" title={["Ideas for better hiring", "and better careers."]} />
            <Reveal delay={0.2} className="shrink-0">
              <ButtonLink href="/insights" variant="outline">
                All insights
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
            {leadArticle && (
              <Reveal className="lg:col-span-7">
                <ArticleCard article={leadArticle} size="lg" />
              </Reveal>
            )}
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {moreArticles.map((a, i) => (
                <Reveal key={a.slug} delay={0.1 * (i + 1)}>
                  <ArticleCard article={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
