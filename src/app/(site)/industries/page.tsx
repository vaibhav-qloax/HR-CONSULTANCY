import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { industries } from "@/data/industries";
import { getServicesBySlugs } from "@/data/services";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Recruitment and HR support for technology, financial services, healthcare, manufacturing, retail, logistics and professional services.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries" }]}
        eyebrow="Industries"
        title={["Specialist understanding,", [{ text: "sector by sector.", className: "serif-accent text-accent" }]]}
        lead="Every industry hires differently. We learn the roles, the language and the realities of each sector so we can recommend people who will thrive in them."
      />

      <section className="section-y">
        <div className="container-x">
          <ol className="border-t border-line">
            {industries.map((ind, i) => {
              const related = getServicesBySlugs(ind.services);
              return (
                <Reveal as="li" key={ind.slug} className="group grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8 md:py-12">
                    <span className="text-sm font-semibold text-subtle md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                    <div className="md:col-span-5">
                      <h2 className="text-[clamp(1.7rem,3vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] transition-colors group-hover:text-accent">
                        <Link href={`/industries/${ind.slug}`}>{ind.name}</Link>
                      </h2>
                      <p className="mt-4 max-w-md text-muted">{ind.summary}</p>
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Services for ${ind.name}`}>
                        {related.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              className="inline-block rounded-full border border-line-strong px-3 py-1.5 text-xs font-semibold transition-colors hover:border-ink"
                            >
                              {s.shortTitle ?? s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/industries/${ind.slug}`}
                      data-cursor="View"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] md:col-span-5 md:aspect-[16/10]"
                    >
                      <Image
                        src={ind.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                      />
                    </Link>
                    <div className="flex md:col-span-1 md:justify-end">
                      <Link
                        href={`/industries/${ind.slug}`}
                        className="flex size-12 items-center justify-center rounded-full border border-line-strong transition-[background-color,color,border-color] duration-300 hover:border-accent hover:bg-accent hover:text-white"
                        aria-label={`Explore ${ind.name}`}
                      >
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
