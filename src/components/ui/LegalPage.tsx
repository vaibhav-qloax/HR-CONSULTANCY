import { TriangleAlert } from "lucide-react";
import { PageHero } from "./PageHero";

export type LegalSection = { heading: string; body: (string | string[])[] };

/** Shared layout for editable legal templates. */
export function LegalPage({
  title,
  crumb,
  intro,
  updated,
  sections,
}: {
  title: string;
  crumb: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero crumbs={[{ label: crumb }]} eyebrow="Legal" title={[title]} lead={intro} />
      <section className="section-y pt-14 md:pt-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-28 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#section-${i + 1}`} className="text-muted transition-colors hover:text-accent">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="lg:col-span-9">
            <div role="note" className="flex gap-3 rounded-[var(--radius-lg)] border border-warning/20 bg-[#fff9e8] p-5">
              <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-warning" />
              <p className="text-[0.95rem]">
                <strong>Template — requires business and legal review before launch.</strong> Replace the bracketed
                placeholders and confirm every statement reflects how QLOAX actually operates and the laws that
                apply to it.
              </p>
            </div>
            <p className="mt-8 text-sm text-muted">Last updated: {updated}</p>
            <div className="prose-qloax mt-8 max-w-3xl">
              {sections.map((s, i) => (
                <section key={s.heading} id={`section-${i + 1}`} className="scroll-mt-28">
                  <h2>
                    {i + 1}. {s.heading}
                  </h2>
                  {s.body.map((b, j) =>
                    Array.isArray(b) ? (
                      <ul key={j}>
                        {b.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j}>{b}</p>
                    ),
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
