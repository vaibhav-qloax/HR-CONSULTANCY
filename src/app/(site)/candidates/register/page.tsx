import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CandidateRegistrationForm } from "@/components/forms/CandidateRegistrationForm";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Register Your CV",
  description: "Register with QLOAX so our consultants can contact you about suitable job opportunities.",
  alternates: { canonical: "/candidates/register" },
};

const promises = [
  "A consultant reviews every profile.",
  "We discuss every role with you before sharing your CV.",
  "You can update or delete your details at any time.",
];

export default function RegisterPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers", href: "/careers" }, { label: "Register your CV" }]}
        eyebrow="Candidates"
        title={["Let the right roles", [{ text: "find you.", className: "serif-accent text-accent" }]]}
        lead="Register once and we'll get in touch when a suitable opportunity comes up."
      />

      <section className="section-y pt-14 md:pt-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Reveal className="rounded-[var(--radius-xl)] bg-mint p-7 lg:sticky lg:top-28">
              <h2 className="text-xl font-semibold tracking-tight">Our promise to candidates</h2>
              <RevealGroup as="ul" className="mt-5 space-y-4">
                {promises.map((p) => (
                  <RevealItem as="li" key={p} className="flex gap-3 text-ink-soft">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success text-white">
                      <Check aria-hidden="true" className="size-3.5" />
                    </span>
                    {p}
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          </aside>
          <Reveal delay={0.1} className="rounded-[var(--radius-xl)] border border-line bg-paper p-6 md:p-12 lg:col-span-8">
            <CandidateRegistrationForm industries={industries.map((i) => i.name)} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
