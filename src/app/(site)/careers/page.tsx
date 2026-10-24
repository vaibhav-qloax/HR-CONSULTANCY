import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { LoadingState } from "@/components/ui/States";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { JobBoard } from "@/components/jobs/JobBoard";
import { candidateFaqs } from "@/data/company";
import { getOpenJobs } from "@/lib/jobs";
import { toJobCard } from "@/lib/job-card";

export const metadata: Metadata = {
  title: "Careers & Job Opportunities",
  description: "Search roles recruited by QLOAX by keyword, location, job type and work mode.",
  alternates: { canonical: "/careers" },
};

export default async function CareersPage() {
  const jobs = (await getOpenJobs()).map(toJobCard);
  const hasSamples = jobs.some((j) => j.isSample);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers" }]}
        eyebrow="Careers"
        title={["Your next opportunity", [{ text: "starts here.", className: "serif-accent text-accent" }]]}
        lead="Browse roles we are recruiting for. Every application is read by a consultant, and we only share your details with an employer once you agree."
        actions={
          <ButtonLink href="/candidates/register" variant="outline">
            Register your CV
          </ButtonLink>
        }
      />

      <section className="section-y pt-14 md:pt-20">
        <div className="container-x">
          {hasSamples && (
            <Reveal className="mb-8">
              <p className="rounded-[var(--radius-md)] border border-warning/20 bg-[#fff9e8] px-4 py-3 text-sm text-warning">
                The roles below are sample listings that demonstrate the job board. They are not real vacancies.
              </p>
            </Reveal>
          )}
          <Suspense fallback={<LoadingState label="Loading jobs" rows={4} className="md:grid-cols-2" />}>
            <JobBoard jobs={jobs} />
          </Suspense>
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="For candidates"
            title={["Questions about", [{ text: "applying?", className: "serif-accent text-accent" }]]}
          />
          <div className="lg:col-span-7">
            <FAQAccordion items={candidateFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
