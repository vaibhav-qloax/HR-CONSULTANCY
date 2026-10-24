import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceIcon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { FinalCTA } from "@/components/home/FinalCTA";
import { services } from "@/data/services";
import { employerFaqs } from "@/data/company";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Recruitment & HR Services",
  description:
    "Permanent recruitment, contract staffing, executive search, RPO, HR consulting and workforce planning from QLOAX.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="Services"
        title={["People solutions that", [{ text: "move business forward.", className: "serif-accent text-accent" }]]}
        lead="Whether you need one critical hire, a flexible team for a project or a better way to hire at scale, we shape our support around your goals."
      />

      <section className="section-y">
        <div className="container-x">
          <RevealGroup as="ul" className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {services.map((s, i) => {
              const feature = i === 0 || i === 3;
              return (
                <RevealItem
                  as="li"
                  key={s.slug}
                  className={cn("flex", feature ? "lg:col-span-4" : i === services.length - 1 && services.length % 3 === 2 ? "lg:col-span-6" : "lg:col-span-2")}
                >
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative flex w-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                  >
                    {feature && (
                      <div className="relative aspect-[21/9] overflow-hidden">
                        <Image
                          src={s.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 60vw, 100vw"
                          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-7 md:p-8">
                      <div className="flex items-start justify-between">
                        <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                          <ServiceIcon name={s.icon} className="size-5" />
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-5 text-subtle transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-accent"
                        />
                      </div>
                      <h2 className="mt-8 text-[1.55rem] font-semibold leading-tight tracking-[-0.025em]">{s.title}</h2>
                      <p className="mt-3 text-muted">{s.summary}</p>
                      <span className="mt-auto pt-6 text-sm font-semibold text-accent">Learn more</span>
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-5" eyebrow="Questions" title={["Working with", "QLOAX."]} />
          <div className="lg:col-span-7">
            <FAQAccordion items={employerFaqs} />
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
