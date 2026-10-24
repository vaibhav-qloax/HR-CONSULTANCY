import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Briefcase, Building2, CalendarClock, Clock, Laptop, MapPin, Wallet } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SampleBadge } from "@/components/ui/States";
import { JobCard } from "@/components/jobs/JobCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getPublicJob, getPublicJobs, getOpenJobs } from "@/lib/jobs";
import { toJobCard } from "@/lib/job-card";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const jobs = await getPublicJobs();
  // Cache Components requires at least one param; unknown slugs render on demand.
  return jobs.length ? jobs.map((j) => ({ slug: j.slug })) : [{ slug: "no-open-roles" }];
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublicJob(slug);
  if (!job) return { title: "Job not found" };
  return {
    title: `${job.title} — ${job.location}`,
    description: job.summary,
    alternates: { canonical: `/careers/${job.slug}` },
    robots: job.isSample || !job.isOpen ? { index: false } : undefined,
  };
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className="prose-qloax mt-5">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

const employmentType: Record<string, string> = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Contract: "CONTRACTOR",
  Temporary: "TEMPORARY",
  Internship: "INTERN",
};

export default async function JobPage({ params }: PageProps<"/careers/[slug]">) {
  const { slug } = await params;
  const job = await getPublicJob(slug);
  if (!job) notFound();

  const related = (await getOpenJobs())
    .filter((j) => j.slug !== job.slug)
    .sort((a, b) => Number(b.industry === job.industry) - Number(a.industry === job.industry))
    .slice(0, 2)
    .map(toJobCard);

  // JobPosting schema only for genuine, open listings.
  const jsonLd =
    !job.isSample && job.isOpen
      ? {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: [job.description, ...job.responsibilities, ...job.requirements].join(" "),
          datePosted: job.postedAt,
          ...(job.closesAt ? { validThrough: job.closesAt } : {}),
          employmentType: employmentType[job.type],
          hiringOrganization: { "@type": "Organization", name: job.company ?? siteConfig.name, sameAs: siteConfig.url },
          jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location } },
          ...(job.workMode === "Remote" ? { jobLocationType: "TELECOMMUTE" } : {}),
        }
      : null;

  const facts = [
    { icon: Building2, label: "Company", value: job.company ?? "Confidential client" },
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Laptop, label: "Work mode", value: job.workMode },
    { icon: Briefcase, label: "Job type", value: job.type },
    { icon: Clock, label: "Experience", value: job.experience },
    ...(job.salary ? [{ icon: Wallet, label: "Salary", value: job.salary }] : []),
    { icon: CalendarClock, label: "Posted", value: formatDate(job.postedAt) },
    ...(job.closesAt ? [{ icon: CalendarClock, label: "Closing date", value: formatDate(job.closesAt) }] : []),
  ];

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      <PageHero
        crumbs={[{ label: "Careers", href: "/careers" }, { label: job.title }]}
        eyebrow={`${job.type} · ${job.workMode}`}
        title={[job.title]}
        lead={job.summary}
        actions={
          job.isOpen ? (
            <>
              <ButtonLink href={`/careers/${job.slug}/apply`}>Apply for this role</ButtonLink>
              <ButtonLink href="/careers" variant="outline">
                All jobs
              </ButtonLink>
            </>
          ) : (
            <ButtonLink href="/careers">See open roles</ButtonLink>
          )
        }
        aside={job.isSample ? <SampleBadge /> : undefined}
      />

      <section className="section-y pt-14 md:pt-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            {!job.isOpen && (
              <Reveal>
                <div role="status" className="rounded-[var(--radius-lg)] border border-warning/20 bg-[#fff9e8] p-6">
                  <p className="text-lg font-semibold">This role is no longer accepting applications.</p>
                  <p className="mt-1 text-muted">
                    Browse current openings or register your CV so we can contact you about similar roles.
                  </p>
                </div>
              </Reveal>
            )}
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight">About the role</h2>
              <p className="prose-qloax mt-5">{job.description}</p>
            </Reveal>
            <Reveal>
              <List title="Responsibilities" items={job.responsibilities} />
            </Reveal>
            <Reveal>
              <List title="Requirements" items={job.requirements} />
            </Reveal>
            {job.benefits.length > 0 && (
              <Reveal>
                <List title="Benefits" items={job.benefits} />
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-4">
            <Reveal delay={0.1} className="rounded-[var(--radius-xl)] border border-line bg-paper p-7 lg:sticky lg:top-28">
              <h2 className="text-eyebrow text-subtle">Role details</h2>
              <dl className="mt-5 divide-y divide-line">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 py-3">
                    <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                    <dt className="sr-only">{label}</dt>
                    <dd>
                      <span className="block text-xs text-subtle">{label}</span>
                      <span className="font-semibold">{value}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              {job.isOpen ? (
                <ButtonLink href={`/careers/${job.slug}/apply`} className="mt-6 w-full">
                  Apply now
                </ButtonLink>
              ) : (
                <ButtonLink href="/candidates/register" variant="outline" className="mt-6 w-full">
                  Register your CV
                </ButtonLink>
              )}
            </Reveal>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-y border-t border-line bg-paper">
          <div className="container-x">
            <SectionHeading
              eyebrow="Keep exploring"
              title={["Related", [{ text: "roles.", className: "serif-accent text-accent" }]]}
            />
            <RevealGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-2">
              {related.map((j) => (
                <RevealItem as="li" key={j.slug} className="flex">
                  <JobCard job={j} className="w-full" />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
