import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mainNav, siteConfig, type NavItem } from "@/config/site";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

const navItems: NavItem[] = mainNav.map((item) => {
  if (item.href === "/services") {
    return {
      ...item,
      children: services.map((s) => ({
        label: s.shortTitle ?? s.title,
        href: `/services/${s.slug}`,
        description: s.summary,
      })),
    };
  }
  if (item.href === "/industries") {
    return {
      ...item,
      children: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}`, description: i.summary })),
    };
  }
  return item;
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: new URL(siteConfig.logo, siteConfig.url).toString(),
  description: siteConfig.description,
  ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
  ...(siteConfig.socials.length ? { sameAs: siteConfig.socials.map((s) => s.href) } : {}),
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar items={navItems} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
