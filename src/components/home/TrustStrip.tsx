import { trustIndustries } from "@/data/company";

function Hex() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 shrink-0 text-sky">
      <path d="M12 2 21 7v10l-9 5-9-5V7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** Neutral industry marquee — sectors served, never client names or logos. */
export function TrustStrip() {
  const row = [...trustIndustries, ...trustIndustries];
  return (
    <section id="trust" aria-label="Industries we support" className="border-y border-line bg-paper">
      <div className="container-x flex flex-col gap-4 py-7 md:flex-row md:items-center md:gap-10">
        <p className="text-eyebrow shrink-0 text-subtle">Supporting teams across</p>
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="animate-marquee flex w-max items-center gap-10 hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:gap-x-8 motion-reduce:gap-y-3">
            {row.map((name, i) => (
              <li
                key={`${name}-${i}`}
                aria-hidden={i >= trustIndustries.length || undefined}
                className="flex items-center gap-10 whitespace-nowrap text-lg font-semibold tracking-[-0.02em] text-ink-soft md:text-xl motion-reduce:[&:nth-child(n+8)]:hidden"
              >
                {name}
                <Hex />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
