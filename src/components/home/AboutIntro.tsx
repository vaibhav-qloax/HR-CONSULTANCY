import Image from "next/image";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { ImageReveal, Parallax } from "@/components/motion/Interactions";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

const points = [
  {
    title: "We start with understanding",
    body: "Every search begins with a proper brief: the role, the team, the culture and what success looks like.",
  },
  {
    title: "We put fit before volume",
    body: "A short, well-considered shortlist saves your managers time and leads to better decisions.",
  },
  {
    title: "We look after both sides",
    body: "Employers and candidates both get clear, honest communication from first call to first day.",
  },
];

export function AboutIntro() {
  return (
    <section className="section-y relative">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal y={12}>
            <Eyebrow>Who we are</Eyebrow>
          </Reveal>
          <AnimatedText
            as="h2"
            className="text-h2 mt-6 text-balance"
            lines={[
              "Great businesses are",
              ["built by", { text: "great people.", className: "serif-accent text-accent" }],
            ]}
          />
          <Reveal delay={0.15} className="mt-8 max-w-2xl space-y-5 text-lead text-muted">
            <p>
              QLOAX is a recruitment and HR consultancy for organisations that take hiring seriously. We help
              you identify the right people, improve the way you hire and create better experiences for
              everyone involved.
            </p>
            <p>
              We combine careful search with practical people expertise, so every engagement leaves your team
              stronger than we found it.
            </p>
          </Reveal>

          <RevealGroup as="ol" className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-3">
            {points.map((p, i) => (
              <RevealItem as="li" key={p.title} className="bg-ivory p-6">
                <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-10">
            <TextLink href="/about">More about QLOAX</TextLink>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <div className="grid grid-cols-5 gap-4 lg:sticky lg:top-28">
            <ImageReveal className="col-span-5 aspect-[4/3] rounded-[var(--radius-xl)] lg:col-span-5">
              <Parallax offset={40} className="h-full">
                <Image
                  src="/images/about-collab.jpg"
                  alt="Colleagues planning together around a whiteboard covered in sticky notes"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
            </ImageReveal>
            <ImageReveal delay={0.15} direction="left" className="col-span-3 col-start-3 -mt-20 aspect-square rounded-[var(--radius-lg)] ring-8 ring-ivory">
              <Image
                src="/images/handshake.jpg"
                alt="Two people shaking hands in an office"
                fill
                sizes="(min-width: 1024px) 22vw, 60vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
