import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ImageReveal, Parallax } from "@/components/motion/Interactions";
import { WhyChoose } from "@/components/home/WhyChoose";
import { TeamSection } from "@/components/home/PeopleSections";
import { FinalCTA } from "@/components/home/FinalCTA";
import { values } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "QLOAX is a recruitment and HR consultancy built on understanding, honest advice and careful matching of people and roles.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        eyebrow="About QLOAX"
        title={["Great businesses are built", [{ text: "by great people.", className: "serif-accent text-accent" }]]}
        lead="We're a recruitment and HR consultancy for organisations that take hiring seriously, and for people who want work that fits."
        image="/images/office-wide.jpg"
        imageAlt="A bright, modern meeting space with large windows"
      />

      {/* Story */}
      <section className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Our story"
              title={["Hiring is personal.", [{ text: "We treat it that way.", className: "serif-accent text-accent" }]]}
            />
            <Reveal delay={0.15} className="mt-8 space-y-5 text-lead text-muted">
              <p>
                QLOAX was founded on a simple idea: the best hires come from genuinely understanding both the
                business and the person. That means proper briefs, honest conversations and shortlists built for
                fit rather than volume.
              </p>
              <p>
                Today we support employers with recruitment and practical HR expertise, and help candidates find
                roles where they can do their best work.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <ImageReveal className="relative aspect-[3/4] rounded-[var(--radius-xl)]">
              <Parallax offset={30} className="h-full">
                <Image
                  src="/images/about-collab.jpg"
                  alt="Colleagues planning around a whiteboard"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </Parallax>
            </ImageReveal>
            <ImageReveal delay={0.15} direction="left" className="relative mt-16 aspect-[3/4] rounded-[var(--radius-xl)]">
              <Image
                src="/images/handshake.jpg"
                alt="Two people shaking hands in an office"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Mission + values */}
      <section className="section-y bg-ivory-deep">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              className="lg:col-span-7"
              eyebrow="Mission & values"
              title={["Connecting people with work", [{ text: "that fits.", className: "serif-accent text-accent" }]]}
            />
            <Reveal delay={0.15} className="lg:col-span-5">
              <p className="text-lead text-muted">
                Our mission is to make hiring more thoughtful, more human and more effective for businesses and
                candidates alike.
              </p>
            </Reveal>
          </div>
          <RevealGroup
            as="ul"
            className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((v, i) => (
              <RevealItem
                as="li"
                key={v.title}
                className="group relative flex min-h-[15rem] flex-col bg-paper p-7 transition-colors duration-500 hover:bg-ivory md:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-0.5 w-0 bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
                />
                <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-auto pt-8 text-2xl font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-muted">{v.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <WhyChoose />
      <TeamSection />

      <section className="border-y border-line bg-ivory-deep py-16">
        <Reveal className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-xl text-2xl font-semibold tracking-tight">Curious how we&apos;d approach your next hire?</p>
          <ButtonLink href="/employers">See how we work with employers</ButtonLink>
        </Reveal>
      </section>

      <FinalCTA />
    </>
  );
}
