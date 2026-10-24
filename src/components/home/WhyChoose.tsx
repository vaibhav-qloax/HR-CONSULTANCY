import { differentiators } from "@/data/company";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function WhyChoose() {
  return (
    <section className="section-y bg-paper">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Why QLOAX</Eyebrow>
            <AnimatedText
              as="h2"
              className="text-h2 mt-6 text-balance"
              lines={["Recruitment that", [{ text: "feels different.", className: "serif-accent text-accent" }]]}
            />
            <Reveal delay={0.15} className="mt-6 text-lead text-muted">
              <p>
                We focus on the parts of hiring that make the biggest difference: understanding, judgement and
                communication.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-8">
              <ButtonLink href="/employers" variant="outline">
                How we work with employers
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {differentiators.map((d, i) => (
            <RevealItem
              as="li"
              key={d.title}
              className="group relative flex min-h-[15rem] flex-col bg-paper p-8 transition-colors duration-500 hover:bg-ivory md:p-10"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-0.5 w-0 bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
              />
              <span className="text-sm font-semibold text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-auto pt-10 text-[1.45rem] font-semibold leading-tight tracking-[-0.025em]">{d.title}</h3>
              <p className="mt-3 text-muted">{d.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
