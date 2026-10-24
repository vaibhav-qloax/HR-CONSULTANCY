import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "For Employers", href: "/employers" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const candidateLinks = [
  { label: "Browse Jobs", href: "/careers" },
  { label: "Register Your CV", href: "/candidates/register" },
  { label: "Career Advice", href: "/insights?category=Career+Advice" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-eyebrow text-subtle">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[0.95rem] text-ink-soft transition-colors duration-200 hover:text-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { contact, socials } = siteConfig;
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-line bg-paper">
      <div className="container-x pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-sm text-muted">{siteConfig.description}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.ctas.hire.href} size="sm">
                {siteConfig.ctas.hire.label}
              </ButtonLink>
              <ButtonLink href={siteConfig.ctas.jobs.href} size="sm" variant="outline">
                {siteConfig.ctas.jobs.label}
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Column title="Company" links={companyLinks} />
            <Column
              title="Services"
              links={services.slice(0, 6).map((s) => ({ label: s.shortTitle ?? s.title, href: `/services/${s.slug}` }))}
            />
            <Column
              title="Industries"
              links={industries.slice(0, 6).map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))}
            />
            <div className="flex flex-col gap-10">
              <Column title="Candidates" links={candidateLinks} />
              <div>
                <h2 className="text-eyebrow text-subtle">Get in touch</h2>
                <ul className="mt-5 space-y-3 text-[0.95rem] text-ink-soft">
                  {contact.email && (
                    <li>
                      <a href={`mailto:${contact.email}`} className="hover:text-accent">
                        {contact.email}
                      </a>
                    </li>
                  )}
                  {contact.phone && (
                    <li>
                      <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:text-accent">
                        {contact.phone}
                      </a>
                    </li>
                  )}
                  {contact.address && (
                    <li className="text-muted">
                      {contact.address.city}, {contact.address.country}
                    </li>
                  )}
                  <li>
                    <Link href="/contact" className="hover:text-accent">
                      Contact form
                    </Link>
                  </li>
                  {socials.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-accent"
                      >
                        {s.label}
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none mt-20 select-none text-center text-[clamp(5rem,24vw,22rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-ivory-deep"
        >
          {siteConfig.name}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-ink">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ink">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-ink" prefetch={false}>
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
