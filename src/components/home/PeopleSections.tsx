import Image from "next/image";
import { Quote } from "lucide-react";
import { team, testimonials } from "@/data/company";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DevPlaceholder } from "@/components/ui/States";

/** Renders only genuine, approved testimonials. Hidden in production when empty. */
export function TestimonialSection() {
  if (!testimonials.length) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section className="section-y">
        <div className="container-x">
          <DevPlaceholder title="Testimonials">
            Add approved client and candidate quotes to <code>testimonials</code> in src/data/company.ts. This
            section stays hidden in production until genuine testimonials exist.
          </DevPlaceholder>
        </div>
      </section>
    );
  }

  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading eyebrow="In their words" title={["What people say about", "working with us."]} />
        <RevealGroup as="ul" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem as="li" key={t.name} className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-paper p-8">
              <Quote aria-hidden="true" className="size-7 text-accent" strokeWidth={1.5} />
              <blockquote className="mt-6 flex-1 font-serif text-[1.45rem] italic leading-snug">“{t.quote}”</blockquote>
              <div className="mt-8 flex items-center gap-4">
                {t.portrait && (
                  <Image src={t.portrait} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                )}
                <div>
                  <p className="font-semibold">{t.name}</p>
                  {(t.role || t.company) && (
                    <p className="text-sm text-muted">{[t.role, t.company].filter(Boolean).join(", ")}</p>
                  )}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** Renders only verified team members. Hidden in production when empty. */
export function TeamSection({ withHeading = true }: { withHeading?: boolean }) {
  if (!team.length) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section className="section-y pt-0">
        <div className="container-x">
          <DevPlaceholder title="Team">
            Add verified team members (name, role, short bio, optional portrait and LinkedIn URL) to{" "}
            <code>team</code> in src/data/company.ts. This section stays hidden in production until then.
          </DevPlaceholder>
        </div>
      </section>
    );
  }

  return (
    <section className="section-y">
      <div className="container-x">
        {withHeading && <SectionHeading eyebrow="Our people" title={["The team behind", "every search."]} />}
        <RevealGroup as="ul" className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <RevealItem as="li" key={m.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-ivory-deep">
                {m.portrait && (
                  <Image
                    src={m.portrait}
                    alt={`Portrait of ${m.name}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                )}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{m.name}</h3>
              <p className="text-sm text-accent">{m.role}</p>
              <p className="mt-2 text-[0.95rem] text-muted">{m.bio}</p>
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold underline-offset-4 hover:underline"
                >
                  LinkedIn<span className="sr-only"> profile of {m.name} (opens in a new tab)</span>
                </a>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
