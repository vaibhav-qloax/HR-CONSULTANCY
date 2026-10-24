import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { JobApplicationForm } from "@/components/forms/JobApplicationForm";
import { applicationsAllowedFor, getPublicJob, getPublicJobs } from "@/lib/jobs";

export async function generateStaticParams() {
  const jobs = await getPublicJobs();
  return jobs.length ? jobs.map((j) => ({ slug: j.slug })) : [{ slug: "no-open-roles" }];
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]/apply">): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublicJob(slug);
  return {
    title: job ? `Apply: ${job.title}` : "Apply",
    robots: { index: false },
    alternates: job ? { canonical: `/careers/${job.slug}/apply` } : undefined,
  };
}

export default async function ApplyPage({ params }: PageProps<"/careers/[slug]/apply">) {
  const { slug } = await params;
  const job = await getPublicJob(slug);
  if (!job) notFound();

  const canApply = job.isOpen && applicationsAllowedFor(job);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Careers", href: "/careers" },
          { label: job.title, href: `/careers/${job.slug}` },
          { label: "Apply" },
        ]}
        eyebrow="Application"
        title={["Apply for", [{ text: job.title, className: "serif-accent text-accent" }]]}
        lead={`${job.company ?? "Confidential client"} · ${job.location} · ${job.workMode}`}
      />

      <section className="section-y pt-14 md:pt-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-4xl">
            {canApply ? (
              <div className="rounded-[var(--radius-xl)] border border-line bg-paper p-6 md:p-12">
                <JobApplicationForm jobSlug={job.slug} jobTitle={job.title} />
              </div>
            ) : (
              <div role="status" className="rounded-[var(--radius-xl)] border border-warning/20 bg-[#fff9e8] p-8 md:p-12">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {job.isOpen
                    ? "Applications aren't available for this listing."
                    : "This role is no longer accepting applications."}
                </h2>
                <p className="mt-3 max-w-xl text-muted">
                  {job.isOpen
                    ? "This is a sample listing used to demonstrate the website. Register your CV and we'll contact you about genuine roles."
                    : "Browse current openings, or register your CV so we can contact you about similar roles."}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/candidates/register">Register your CV</ButtonLink>
                  <ButtonLink href="/careers" variant="outline">
                    Browse open roles
                  </ButtonLink>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
