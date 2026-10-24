import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ServiceIcon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EmployerEnquiryForm } from "@/components/forms/EmployerEnquiryForm";
import { getService, getServicesBySlugs, services } from "@/data/services";
import { industries } from "@/data/industries";
import { hiringRequirements } from "@/lib/validation";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.summary, images: [service.image] },
  };
}

const requirementBySlug: Record<string, (typeof hiringRequirements)[number]> = {
  "permanent-recruitment": "Permanent recruitment",
  "contract-staffing": "Contract or temporary staffing",
  "executive-search": "Executive search",
  "recruitment-process-outsourcing": "Recruitment process outsourcing",
  "hr-consulting": "HR consulting",
  "workforce-planning": "Workforce planning",
  "talent-acquisition-support": "Talent acquisition support",
};

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = getServicesBySlugs(service.related);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
        eyebrow="Service"
        title={[service.title]}
        lead={service.intro}
        image={service.image}
        actions={
          <>
            <ButtonLink href="#enquiry">Discuss your needs</ButtonLink>
            <ButtonLink href="/services" variant="outline">
              All services
            </ButtonLink>
          </>
        }
      />

      {/* Problems */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Challenges we solve"
            title={["When this service", "makes sense."]}
          />
          <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {service.problems.map((p, i) => (
              <RevealItem as="li" key={p} className="bg-ivory p-7">
                <span className="text-sm font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-[1.08rem] leading-snug text-ink-soft">{p}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="section-y bg-ivory-deep">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title={["A clear process,", "from brief to result."]} />
          <RevealGroup as="ol" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <RevealItem as="li" key={step.title} className="relative rounded-[var(--radius-lg)] border border-line bg-paper p-7">
                <span className="text-5xl font-semibold tracking-[-0.06em] text-ink/10">0{i + 1}</span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-muted">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Benefits" title={["What you", "can expect."]} />
            <Reveal delay={0.2} className="mt-8">
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-accent text-white">
                <ServiceIcon name={service.icon} className="size-7" />
              </span>
            </Reveal>
          </div>
          <RevealGroup as="ul" className="grid gap-8 lg:col-span-7">
            {service.benefits.map((b) => (
              <RevealItem as="li" key={b.title} className="flex gap-5 border-b border-line pb-8">
                <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-mint text-success">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-muted">{b.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="section-y border-t border-line bg-paper">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <SectionHeading className="lg:col-span-5" eyebrow="FAQs" title={["Common", "questions."]} />
            <div className="lg:col-span-7">
              <FAQAccordion items={service.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="section-y">
          <div className="container-x">
            <SectionHeading eyebrow="Related services" title={["You may also", "need."]} />
            <RevealGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <RevealItem as="li" key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-7 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                  >
                    <ServiceIcon name={r.icon} className="size-6 text-accent" />
                    <h3 className="mt-6 text-xl font-semibold tracking-tight group-hover:text-accent">{r.title}</h3>
                    <p className="mt-2 text-muted">{r.summary}</p>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Enquiry */}
      <section id="enquiry" className="section-y scroll-mt-24 border-t border-line bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Enquire"
            title={["Let's talk about", "your hiring needs."]}
            description="Share a few details and a consultant will contact you to arrange an initial conversation."
          />
          <div className="lg:col-span-7">
            <EmployerEnquiryForm
              industries={industries.map((i) => i.name)}
              defaultRequirement={requirementBySlug[service.slug]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
