import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Interactions";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCTA({
  title = ["Let's find the right", [{ text: "way forward.", className: "serif-accent text-accent" }]],
  body = "Whether you're building a team or exploring your next opportunity, we're ready to help.",
}: {
  title?: React.ComponentProps<typeof AnimatedText>["lines"];
  body?: string;
}) {
  return (
    <section className="section-y relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-paper px-6 py-16 md:px-14 md:py-24">
          <svg
            aria-hidden="true"
            viewBox="0 0 200 200"
            className="pointer-events-none absolute -right-24 -top-24 size-[28rem] text-sky/15 motion-safe:animate-[spin_80s_linear_infinite]"
          >
            <path d="M100 8 180 54v92l-80 46-80-46V54z" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <path d="M100 48 145 74v52l-45 26-45-26V74z" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </svg>

          <div className="relative max-w-4xl">
            <AnimatedText as="h2" className="text-h1 text-balance" lines={title} />
            <Reveal delay={0.2} className="mt-6 max-w-xl text-lead text-muted">
              <p>{body}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <ButtonLink href="/employers#enquiry" size="lg">
                  Discuss Your Hiring Needs
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="/careers" size="lg" variant="outline">
                Explore Careers
              </ButtonLink>
            </Reveal>
          </div>

          <div className="relative mt-16 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-2">
            {[
              { k: "Employers", t: "Submit a vacancy or hiring brief", href: "/employers#enquiry" },
              { k: "Candidates", t: "Register your CV for future roles", href: "/candidates/register" },
            ].map((x) => (
              <Link key={x.k} href={x.href} className="group flex items-center justify-between gap-6 bg-paper p-6 transition-colors hover:bg-ivory md:p-8">
                <span>
                  <span className="text-eyebrow text-subtle">{x.k}</span>
                  <span className="mt-2 block text-lg font-semibold tracking-tight group-hover:text-accent">{x.t}</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
