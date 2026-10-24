/**
 * Central brand + business configuration for QLOAX.
 *
 * Anything set to `null` or an empty array is intentionally left blank
 * until the business supplies verified details. Components hide those
 * fields gracefully, so never fill them with invented information.
 */
export const siteConfig = {
  name: "QLOAX",
  legalName: "QLOAX", // TODO: replace with the registered legal entity name
  tagline: "People first. Possibilities without limits.",
  description:
    "QLOAX is an HR consultancy and recruitment partner helping ambitious businesses find exceptional talent and build stronger teams through thoughtful recruitment and people-focused HR solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: "/logo.png",
  copyrightYear: 2026,

  contact: {
    email: null as string | null, // e.g. "hello@yourdomain.com"
    phone: null as string | null, // e.g. "+91 00000 00000"
    address: null as null | {
      street: string;
      city: string;
      region?: string;
      postalCode?: string;
      country: string;
      mapEmbedUrl?: string;
    },
    hours: null as string | null, // e.g. "Monday to Friday, 9:30 am – 6:30 pm"
  },

  /** Only add profiles that exist. Supported keys map to icons in the footer. */
  socials: [] as { label: "LinkedIn" | "Instagram" | "X" | "Facebook" | "YouTube"; href: string }[],

  ctas: {
    hire: { label: "Hire Talent", href: "/employers#enquiry" },
    jobs: { label: "Find a Job", href: "/careers" },
    explore: { label: "Explore Opportunities", href: "/careers" },
  },

  /** Limits shared by client + server validation. */
  uploads: {
    maxResumeBytes: 5 * 1024 * 1024,
    acceptedResumeExtensions: [".pdf", ".doc", ".docx"],
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" }, // children injected from data/services
  { label: "Industries", href: "/industries" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];
