export type FAQ = { question: string; answer: string };

export type Service = {
  slug: string;
  title: string;
  shortTitle?: string;
  summary: string;
  intro: string;
  icon: IconName;
  image: string;
  enabled: boolean;
  problems: string[];
  process: { title: string; body: string }[];
  benefits: { title: string; body: string }[];
  faqs: FAQ[];
  related: string[];
};

export type Industry = {
  slug: string;
  name: string;
  summary: string;
  intro: string;
  image: string;
  challenges: string[];
  roles: string[];
  services: string[];
};

export type IconName =
  | "user-check"
  | "clock"
  | "crown"
  | "workflow"
  | "compass"
  | "chart"
  | "search"
  | "shield";

export type JobType = "Full-time" | "Part-time" | "Contract" | "Temporary" | "Internship";
export type WorkMode = "On-site" | "Hybrid" | "Remote";
export type JobStatus = "published" | "draft" | "closed";

export type Job = {
  id: string;
  slug: string;
  title: string;
  company: string | null; // null => confidential
  location: string;
  type: JobType;
  workMode: WorkMode;
  industry: string; // industry slug
  experience: string; // e.g. "3–5 years"
  salary: string | null;
  postedAt: string; // ISO date
  closesAt: string | null; // ISO date
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: JobStatus;
  /** Sample listings are for demonstration only and never get JobPosting schema. */
  isSample: boolean;
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  cover: string;
  coverAlt: string;
  publishedAt: string;
  author: string;
  body: ArticleBlock[];
};

export type ArticleCategory =
  | "Career Advice"
  | "Hiring Advice"
  | "Workplace Culture"
  | "Talent Strategy";

export type CaseStudy = {
  id: string;
  industry: string;
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  image: string;
  isSample: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  portrait?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  portrait?: string;
  linkedin?: string;
};
