import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EmployerEnquiryForm } from "@/components/forms/EmployerEnquiryForm";
import { JobCard } from "@/components/jobs/JobCard";
import { getIndustry, industries } from "@/data/industries";
import { getServicesBySlugs } from "@/data/services";
import { getOpenJobs } from "@/lib/jobs";
import { toJobCard } from "@/lib/job-card";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "Industry not found" };
  return {
    title: `${industry.name} Recruitment`,
    description: industry.summary,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: { title: `${industry.name} Recruitment`, description: industry.summary, images: [industry.image] },
  };
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const related = getServicesBySlugs(industry.services);
  const jobs = (await getOpenJobs()).filter((j) => j.industry === industry.slug).slice(0, 4).map(toJobCard);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }, { label: industry.name }]}
        eyebrow="Industry"
        title={[industry.name]}
        lead={industry.intro}
        image={industry.image}
        actions={
          <>
            <ButtonLink href="#enquiry">Hire in {industry.name}</ButtonLink>
            <ButtonLink href="/careers" variant="outline">
              Find a job
            </ButtonLink>
          </>
        }
      />

      <section className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Hiring challenges" title={["What makes hiring", "here different."]} />
            <RevealGroup as="ul" className="mt-10 grid gap-4">
              {industry.challenges.map((c, i) => (
                <RevealItem as="li" key={c} className="flex gap-5 rounded-[var(--radius-md)] border border-line bg-paper p-6">
                  <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                  <p className="text-[1.05rem] text-ink-soft">{c}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div>
            <SectionHeading eyebrow="Roles we recruit" title={["Typical roles", "we support."]} />
            <RevealGroup as="ul" className="mt-10 flex flex-wrap gap-3">
              {industry.roles.map((r) => (
                <RevealItem as="li" key={r} className="rounded-full border border-line-strong bg-paper px-5 py-3 font-semibold">
                  {r}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section className="section-y bg-ivory-deep">
        <div className="container-x">
          <SectionHeading eyebrow="Relevant services" title={[`How we help ${industry.name.toLowerCase()} teams.`]} />
          <RevealGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((s) => (
              <RevealItem as="li" key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <ServiceIcon name={s.icon} className="size-6 text-accent" />
                  <h3 className="mt-6 text-xl font-semibold tracking-tight group-hover:text-accent">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.summary}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {jobs.length > 0 && (
        <section className="section-y">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="Current roles" title={[`Roles in ${industry.name}.`]} />
              <ButtonLink href="/careers" variant="outline">
                All jobs
              </ButtonLink>
            </div>
            <ul className="mt-12 grid gap-5 md:grid-cols-2">
              {jobs.map((j) => (
                <li key={j.slug} className="flex">
                  <JobCard job={j} className="w-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="enquiry" className="section-y scroll-mt-24 border-t border-line bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Enquire"
            title={["Hiring in", `${industry.name}?`]}
            description="Tell us about the roles you need to fill and we'll arrange a conversation."
          />
          <div className="lg:col-span-7">
            <EmployerEnquiryForm industries={industries.map((i) => i.name)} defaultIndustry={industry.name} />
          </div>
        </div>
      </section>
    </>
  );
}
