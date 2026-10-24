import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Clock, Mail, MapPin, Phone, UserPlus } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with QLOAX about hiring support, HR consulting or job opportunities.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { email, phone, address, hours } = siteConfig.contact;
  const details = [
    email && { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    phone && { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s+/g, "")}` },
    address && {
      icon: MapPin,
      label: "Office",
      value: [address.street, address.city, address.region, address.postalCode, address.country].filter(Boolean).join(", "),
    },
    hours && { icon: Clock, label: "Hours", value: hours },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title={["Let's start a", [{ text: "conversation.", className: "serif-accent text-accent" }]]}
        lead="Tell us how we can help and a member of the team will reply by email."
      />

      <section className="section-y pt-14 md:pt-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="rounded-[var(--radius-xl)] border border-line bg-paper p-6 md:p-12 lg:col-span-8">
            <ContactForm />
          </Reveal>

          <aside className="lg:col-span-4">
            <RevealGroup className="flex flex-col gap-4">
              {details.length > 0 && (
                <RevealItem className="rounded-[var(--radius-xl)] border border-line bg-paper p-7">
                  <h2 className="text-eyebrow text-subtle">Contact details</h2>
                  <ul className="mt-5 space-y-4">
                    {details.map(({ icon: Icon, label, value, href }) => (
                      <li key={label} className="flex gap-3">
                        <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span>
                          <span className="block text-xs text-subtle">{label}</span>
                          {href ? (
                            <a href={href} className="font-semibold hover:text-accent">
                              {value}
                            </a>
                          ) : (
                            <span className="font-semibold">{value}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              )}
              <RevealItem>
                <Link
                  href="/employers#enquiry"
                  className="group block rounded-[var(--radius-xl)] bg-accent-soft p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="flex items-start justify-between">
                    <Briefcase aria-hidden="true" className="size-6 text-accent" />
                    <ArrowUpRight aria-hidden="true" className="size-5 text-accent transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                  <span className="mt-5 block text-xl font-semibold tracking-tight">Hiring?</span>
                  <span className="mt-1 block text-muted">Send a detailed hiring brief through our employer enquiry form.</span>
                </Link>
              </RevealItem>
              <RevealItem>
                <Link
                  href="/candidates/register"
                  className="group block rounded-[var(--radius-xl)] bg-mint p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="flex items-start justify-between">
                    <UserPlus aria-hidden="true" className="size-6 text-success" />
                    <ArrowUpRight aria-hidden="true" className="size-5 text-success transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                  <span className="mt-5 block text-xl font-semibold tracking-tight">Looking for work?</span>
                  <span className="mt-1 block text-muted">Register your CV so we can contact you about suitable roles.</span>
                </Link>
              </RevealItem>
            </RevealGroup>
          </aside>
        </div>
      </section>

      {address?.mapEmbedUrl && (
        <section className="pb-[var(--section-y)]">
          <Reveal className="container-x">
            <iframe
              title={`Map showing the ${siteConfig.name} office`}
              src={address.mapEmbedUrl}
              loading="lazy"
              className="aspect-[21/9] w-full rounded-[var(--radius-xl)] border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </section>
      )}
    </>
  );
}
