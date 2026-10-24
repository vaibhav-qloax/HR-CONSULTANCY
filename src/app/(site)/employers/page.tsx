import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ApproachSection } from "@/components/home/ApproachSection";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { EmployerEnquiryForm } from "@/components/forms/EmployerEnquiryForm";
import { employerFaqs } from "@/data/company";
import { getServicesBySlugs } from "@/data/services";
import { industries } from "@/data/industries";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "For Employers",
  description:
    "Recruitment and HR solutions for employers: permanent hiring, contract staffing, executive search and RPO. Submit a hiring enquiry.",
  alternates: { canonical: "/employers" },
};

const expectations = [
  "A consultant who learns your business before searching",
  "Shortlists with clear notes on every candidate",
  "Regular, honest updates throughout",
  "Terms agreed in writing before work begins",
];

const employerServices = getServicesBySlugs([
  "permanent-recruitment",
  "recruitment-process-outsourcing",
  "contract-staffing",
  "executive-search",
]);

export default function EmployersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "For Employers" }]}
        eyebrow="For employers"
        title={["Hire with", [{ text: "confidence.", className: "serif-accent text-accent" }]]}
        lead="From one critical role to an embedded recruitment function, we help you find people who fit and stay."
        image="/images/hero-team.jpg"
        imageAlt="A team working together around a shared table"
        actions={
          <>
            <ButtonLink href="#enquiry">{siteConfig.ctas.hire.label}</ButtonLink>
            <ButtonLink href="/services" variant="outline">
              Our services
            </ButtonLink>
          </>
        }
      />

      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              className="lg:col-span-8"
              eyebrow="Hiring solutions"
              title={["The right support", [{ text: "for every hire.", className: "serif-accent text-accent" }]]}
            />
            <Reveal delay={0.2} className="lg:col-span-4">
              <p className="text-lead text-muted">
                Choose the model that fits the role, the timeline and how much of the process you want to own.
              </p>
            </Reveal>
          </div>
          <div className="mt-16">
            <ServicesShowcase
              items={employerServices.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary, image: s.image, icon: s.icon }))}
            />
          </div>
        </div>
      </section>

      <ApproachSection />

      <section className="section-y border-t border-line bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-5" eyebrow="Employer FAQs" title={["Before you", "get in touch."]} />
          <div className="lg:col-span-7">
            <FAQAccordion items={employerFaqs} />
          </div>
        </div>
      </section>

      <section id="enquiry" className="section-y scroll-mt-24 border-t border-line">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Hiring enquiry"
              title={["Tell us about", [{ text: "your roles.", className: "serif-accent text-accent" }]]}
              description="Share a few details. A consultant will review them and contact you to arrange a conversation."
            />
            <RevealGroup as="ul" className="mt-10 space-y-4">
              {expectations.map((e) => (
                <RevealItem as="li" key={e} className="flex gap-3 text-ink-soft">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-mint text-success">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  {e}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.1} className="rounded-[var(--radius-xl)] border border-line bg-paper p-6 md:p-10 lg:col-span-7">
            <EmployerEnquiryForm industries={industries.map((i) => i.name)} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
