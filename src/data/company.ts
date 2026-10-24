import type { CaseStudy, FAQ, TeamMember, Testimonial } from "@/types";

export const approachSteps = [
  {
    number: "01",
    title: "Understand",
    body: "We learn about your requirements, culture and hiring goals, and agree what a successful hire looks like before the search begins.",
  },
  {
    number: "02",
    title: "Discover",
    body: "We identify and approach suitable candidates through targeted search, our network and referrals, not just job-board volume.",
  },
  {
    number: "03",
    title: "Evaluate",
    body: "We coordinate screening, assessments and interviews against agreed criteria, so every shortlisted candidate is easy to compare.",
  },
  {
    number: "04",
    title: "Connect",
    body: "We help employers and candidates move through the selection process with clear communication, feedback and offer support.",
  },
  {
    number: "05",
    title: "Support",
    body: "We stay in touch after the offer is accepted, supporting onboarding and following up in line with the service you have engaged us for.",
  },
] as const;

export const differentiators = [
  {
    title: "Matching over volume",
    body: "We would rather send you three people worth meeting than thirty CVs to sift. Quality of fit is the measure we care about.",
  },
  {
    title: "Communication you can rely on",
    body: "Regular, honest updates for employers and candidates, including when the news is not what anyone hoped for.",
  },
  {
    title: "Industry understanding",
    body: "We take time to learn the language, roles and realities of the sectors we recruit for.",
  },
  {
    title: "A thoughtful process",
    body: "Structured briefs, consistent screening and clear criteria make hiring decisions easier and fairer.",
  },
  {
    title: "Support on both sides",
    body: "Candidates are people, not pipeline. We guide them as carefully as we serve the businesses we hire for.",
  },
  {
    title: "Relationships, not transactions",
    body: "We aim to be the partner you call first, because we understood your business the last time.",
  },
] as const;

export const values = [
  { title: "People first", body: "Every hire changes someone's working life. We treat that responsibility seriously." },
  { title: "Candour", body: "We give honest advice about the market, the role and the fit, even when it is inconvenient." },
  { title: "Craft", body: "Recruitment is a skill. We keep improving how we brief, search, assess and communicate." },
  { title: "Fairness", body: "Consistent criteria and inclusive practice give every candidate a fair hearing." },
] as const;

/**
 * Case studies. Entries marked `isSample` are illustrative templates and
 * render with a visible "Illustrative example" label. Replace them with
 * verified client outcomes (with permission) before launch.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "sample-scale-up-engineering",
    industry: "Information Technology",
    title: "Building an engineering team ahead of a product launch",
    challenge:
      "A growing software business needs several engineers within a fixed launch window, while its small team is fully occupied shipping the product.",
    approach:
      "A joint brief with the engineering lead, a structured technical screen agreed in advance and a weekly shortlist review to keep decisions moving.",
    outcome:
      "Record the verified result here, for example how many roles were filled, how long it took and what the client said about the process.",
    image: "/images/hero-team.jpg",
    isSample: true,
  },
  {
    id: "sample-seasonal-logistics",
    industry: "Logistics & Supply Chain",
    title: "Preparing a distribution site for seasonal demand",
    challenge:
      "A distribution operation expects a seasonal surge and needs dependable temporary staff across multiple shifts without overloading site managers.",
    approach:
      "Shift-by-shift workforce planning, a simplified screening flow for operational roles and a single point of contact for site managers.",
    outcome:
      "Record the verified result here, including measurable outcomes only where they have been confirmed by the client.",
    image: "/images/ind-logistics.jpg",
    isSample: true,
  },
  {
    id: "sample-leadership-search",
    industry: "Professional Services",
    title: "A confidential search for a functional leader",
    challenge:
      "A professional services firm needs to appoint a new functional head discreetly, without unsettling the existing team or clients.",
    approach:
      "Market mapping, confidential approaches to passive candidates and in-depth assessment conversations with a small, senior shortlist.",
    outcome:
      "Record the verified result here once the client has approved what can be shared publicly.",
    image: "/images/handshake.jpg",
    isSample: true,
  },
];

/**
 * Add genuine, approved testimonials here. While the list is empty the
 * homepage shows a development-only placeholder and nothing in production.
 */
export const testimonials: Testimonial[] = [];

/**
 * Add verified team members here. While empty, the team section shows a
 * development-only placeholder and is hidden in production.
 */
export const team: TeamMember[] = [];

/** Neutral industry labels for the trust strip; not client names. */
export const trustIndustries = [
  "Technology",
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Retail & E-commerce",
  "Logistics",
  "Professional Services",
];

export const employerFaqs: FAQ[] = [
  {
    question: "How do we start working with QLOAX?",
    answer:
      "Share your hiring needs through the enquiry form or contact page. We will arrange a short conversation to understand the roles, timelines and the kind of support that would help, then confirm terms in writing before work begins.",
  },
  {
    question: "Which roles and levels do you recruit for?",
    answer:
      "We support roles from early-career positions through to senior leadership across the industries listed on this site. If a brief is outside our expertise, we will tell you.",
  },
  {
    question: "How long does a typical search take?",
    answer:
      "Timelines vary with the role, location, seniority and market conditions. We give you a realistic estimate after the briefing call and keep you updated as the search progresses.",
  },
  {
    question: "How do you assess candidates?",
    answer:
      "We agree assessment criteria with you during the brief, then screen every candidate against the same criteria through structured conversations and, where appropriate, assessments you approve.",
  },
  {
    question: "How do you handle candidate data?",
    answer:
      "Candidate information is used only for recruitment purposes, shared with employers only with the candidate's knowledge, and handled in line with our privacy policy.",
  },
];

export const candidateFaqs: FAQ[] = [
  {
    question: "Do candidates pay any fees?",
    answer: "No. QLOAX does not charge candidates for job search or placement support.",
  },
  {
    question: "Will you share my CV without asking?",
    answer: "No. We discuss each opportunity with you and only share your details with an employer once you agree.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "A consultant reviews every application. If your experience matches the role, we will contact you to talk it through. If it does not, we may keep your details for future roles where you have agreed to that.",
  },
];
