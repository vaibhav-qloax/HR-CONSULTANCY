import type { Industry } from "@/types";

/** Edit this list to match the sectors QLOAX genuinely serves. */
export const industries: Industry[] = [
  {
    slug: "information-technology",
    name: "Information Technology",
    summary: "Engineering, product, data and infrastructure talent for teams building and running technology.",
    intro:
      "Technology hiring moves quickly and skills evolve constantly. We help technology teams find people with the right technical depth and the communication skills to work well across the business.",
    image: "/images/ind-it.jpg",
    challenges: [
      "Competition for experienced engineers and specialists.",
      "Assessing technical depth fairly and efficiently.",
      "Balancing permanent hires with project-based expertise.",
    ],
    roles: ["Software Engineers", "Data & Analytics", "Cloud & DevOps", "Product & Design", "QA & Testing", "IT Support & Infrastructure"],
    services: ["permanent-recruitment", "contract-staffing", "talent-acquisition-support"],
  },
  {
    slug: "banking-financial-services",
    name: "Banking & Financial Services",
    summary: "Finance, risk, operations and customer roles where accuracy and trust matter.",
    intro:
      "Financial services roles demand precision, integrity and often specialist knowledge. We help organisations find professionals who combine technical capability with sound judgement.",
    image: "/images/ind-finance.jpg",
    challenges: [
      "Roles requiring specific domain or regulatory familiarity.",
      "Thorough screening expectations for trusted positions.",
      "Scaling operations teams around growth or change programmes.",
    ],
    roles: ["Finance & Accounting", "Risk & Compliance", "Operations", "Relationship Management", "Analytics", "Customer Service"],
    services: ["permanent-recruitment", "executive-search", "contract-staffing"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    summary: "Administrative, operational and management roles across healthcare organisations.",
    intro:
      "Healthcare organisations rely on dedicated people across clinical, administrative and operational teams. We support hiring for roles where care, reliability and teamwork are essential.",
    image: "/images/ind-health.jpg",
    challenges: [
      "Persistent demand across operational and support roles.",
      "Verifying qualifications and registrations where required.",
      "Recruiting for shift-based and multi-site teams.",
    ],
    roles: ["Healthcare Administration", "Operations & Facilities", "Patient Services", "Allied Support Roles", "Healthcare Management"],
    services: ["permanent-recruitment", "contract-staffing", "workforce-planning"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary: "Production, engineering, quality and supply roles that keep operations running.",
    intro:
      "Manufacturing businesses need dependable people on the floor and capable leaders around it. We help recruit across production, engineering, quality and plant management.",
    image: "/images/ind-manufacturing.jpg",
    challenges: [
      "Finding technically skilled people in specific locations.",
      "Scaling shifts in line with production demand.",
      "Hiring supervisors who can lead safely and effectively.",
    ],
    roles: ["Production & Operations", "Mechanical & Electrical Engineering", "Quality Assurance", "Maintenance", "Plant Leadership", "EHS"],
    services: ["contract-staffing", "permanent-recruitment", "workforce-planning"],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    summary: "Store, digital, merchandising and customer-experience talent for modern commerce.",
    intro:
      "Retail and e-commerce teams move at the pace of the customer. We help businesses hire across stores, digital channels, merchandising and fulfilment, including for seasonal peaks.",
    image: "/images/ind-retail.jpg",
    challenges: [
      "Seasonal peaks that require fast, reliable hiring.",
      "Blending store and digital skill sets.",
      "Retaining customer-facing staff.",
    ],
    roles: ["Store Management", "E-commerce & Digital Marketing", "Merchandising", "Customer Experience", "Category Management"],
    services: ["contract-staffing", "recruitment-process-outsourcing", "permanent-recruitment"],
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    summary: "Warehouse, transport, planning and supply-chain roles across the movement of goods.",
    intro:
      "Logistics depends on coordination and reliability at every step. We support hiring across warehousing, transport, planning and supply-chain management.",
    image: "/images/ind-logistics.jpg",
    challenges: [
      "High-volume hiring for operational roles.",
      "Shift patterns and multi-site requirements.",
      "Finding planners and managers with systems experience.",
    ],
    roles: ["Warehouse Operations", "Transport & Fleet", "Supply-Chain Planning", "Procurement", "Inventory Control"],
    services: ["contract-staffing", "recruitment-process-outsourcing", "workforce-planning"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    summary: "Consulting, advisory, legal-support and business-services talent for client-focused firms.",
    intro:
      "In professional services, people are the product. We help firms recruit professionals who combine expertise with strong client skills.",
    image: "/images/ind-professional.jpg",
    challenges: [
      "Hiring for both technical expertise and client presence.",
      "Building teams quickly around new client work.",
      "Attracting experienced professionals who are not actively looking.",
    ],
    roles: ["Consulting", "Business Support", "Legal Support", "Finance & Advisory", "Marketing & Business Development"],
    services: ["permanent-recruitment", "executive-search", "hr-consulting"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug) ?? null;
}
