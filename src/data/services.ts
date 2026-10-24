import type { Service } from "@/types";

/**
 * Service catalogue. Set `enabled: false` on anything QLOAX does not
 * actually offer; disabled services disappear from navigation, listings,
 * the sitemap and their detail routes.
 */
const allServices: Service[] = [
  {
    slug: "permanent-recruitment",
    title: "Permanent Recruitment",
    summary:
      "Considered, end-to-end search for the permanent hires that shape how your business grows.",
    intro:
      "A permanent hire is a long-term decision. We take the time to understand the role, the team it sits in and the culture around it, then run a focused search that puts a short list of genuinely suitable people in front of you.",
    icon: "user-check",
    image: "/images/interview.jpg",
    enabled: true,
    problems: [
      "Roles that stay open for months while the team absorbs the workload.",
      "High application volumes with very few candidates worth interviewing.",
      "Hires who look right on paper but struggle with the pace or culture.",
      "Hiring managers spending too much time on screening instead of their own work.",
    ],
    process: [
      { title: "Role discovery", body: "We work with you to define the role, success measures, must-have skills and the realities of the team." },
      { title: "Targeted search", body: "We combine active outreach, referrals and our candidate network rather than relying on job-board volume alone." },
      { title: "Structured screening", body: "Every candidate is assessed against the same criteria, so the shortlist is easy to compare." },
      { title: "Interview to offer", body: "We coordinate interviews, gather feedback on both sides and help you manage the offer conversation." },
    ],
    benefits: [
      { title: "Shortlists, not stacks", body: "You review a small number of well-matched profiles with clear notes on each." },
      { title: "Better-informed decisions", body: "Consistent assessment criteria make it easier to compare candidates fairly." },
      { title: "A smoother candidate experience", body: "Timely updates protect your employer brand, even with people you do not hire." },
    ],
    faqs: [
      { question: "What kinds of permanent roles do you recruit for?", answer: "We support roles from early-career to senior management across the industries we work in. Share the brief and we will tell you honestly whether it is a good fit for us." },
      { question: "How is the fee structured?", answer: "Fees depend on the role and the scope of the search. We agree commercial terms in writing before any search begins." },
      { question: "What happens if a placement does not work out?", answer: "Replacement terms are agreed as part of our terms of business. We will walk you through them before you engage us." },
    ],
    related: ["executive-search", "talent-acquisition-support", "workforce-planning"],
  },
  {
    slug: "contract-staffing",
    title: "Contract & Temporary Staffing",
    shortTitle: "Contract Staffing",
    summary:
      "Flexible, ready-to-start professionals for projects, peaks and cover, without slowing the business down.",
    intro:
      "When work arrives faster than you can hire, flexible talent keeps momentum. We help you bring in contract and temporary professionals who can contribute quickly, for as long as you need them.",
    icon: "clock",
    image: "/images/coworking.jpg",
    enabled: true,
    problems: [
      "Project deadlines that the existing team cannot absorb.",
      "Seasonal or unpredictable demand that makes permanent headcount risky.",
      "Leave, transitions or sudden departures that leave critical gaps.",
      "Specialist skills that are only needed for a defined period.",
    ],
    process: [
      { title: "Scope the need", body: "We confirm the deliverables, duration, working pattern and the skills required from day one." },
      { title: "Match available talent", body: "We identify professionals whose availability, skills and expectations fit the assignment." },
      { title: "Onboard quickly", body: "We coordinate documentation and start-date logistics so the contractor can begin promptly." },
      { title: "Check in throughout", body: "We stay in touch with you and the contractor during the assignment and plan for extensions or exits." },
    ],
    benefits: [
      { title: "Speed without shortcuts", body: "Screening is proportionate to the role, so pace does not come at the cost of fit." },
      { title: "Workforce flexibility", body: "Scale capacity up or down as projects and demand change." },
      { title: "Less admin for your team", body: "We handle coordination so your managers can focus on the work itself." },
    ],
    faqs: [
      { question: "How quickly can a contractor start?", answer: "It depends on the role, notice periods and the checks required. We will give you a realistic timeline once we understand the brief." },
      { question: "Can a contractor move to a permanent role?", answer: "Often, yes. Conversion terms are set out in our terms of business so there are no surprises." },
    ],
    related: ["permanent-recruitment", "workforce-planning", "payroll-compliance"],
  },
  {
    slug: "executive-search",
    title: "Executive Search",
    summary:
      "Discreet, research-led search for the leaders who will set direction for your organisation.",
    intro:
      "Leadership hires carry outsized impact and often require confidentiality. Our executive search is research-led and relationship-driven, focused on finding leaders whose experience, judgement and values suit the moment your business is in.",
    icon: "crown",
    image: "/images/candidate.jpg",
    enabled: true,
    problems: [
      "Senior roles where the strongest candidates are not actively looking.",
      "Searches that must stay confidential internally or in the market.",
      "Boards and founders who need an objective view of leadership talent.",
      "Leadership gaps that slow decisions across the business.",
    ],
    process: [
      { title: "Leadership brief", body: "We align with stakeholders on the mandate, the challenges ahead and what great leadership looks like for you." },
      { title: "Market mapping", body: "We research the market to identify and approach people with relevant experience, discreetly." },
      { title: "In-depth assessment", body: "Candidates are evaluated through detailed conversations, competency discussion and referencing." },
      { title: "Selection and transition", body: "We support final interviews, negotiation and the first steps of the new leader's transition." },
    ],
    benefits: [
      { title: "Access to passive talent", body: "Reach experienced leaders who would not respond to a job advert." },
      { title: "Confidential by design", body: "Approaches are handled discreetly to protect your business and the candidates." },
      { title: "A clear decision record", body: "Structured assessment notes support confident, defensible choices." },
    ],
    faqs: [
      { question: "Do you handle confidential replacements?", answer: "Yes. We agree communication protocols with you at the start and keep the search discreet throughout." },
      { question: "Which leadership levels do you cover?", answer: "We support senior management, functional heads and leadership roles. Speak to us about the specific mandate." },
    ],
    related: ["permanent-recruitment", "hr-consulting", "workforce-planning"],
  },
  {
    slug: "recruitment-process-outsourcing",
    title: "Recruitment Process Outsourcing",
    shortTitle: "RPO",
    summary:
      "An embedded recruitment function that scales with your hiring plans and runs on your standards.",
    intro:
      "When hiring becomes a sustained priority, a partner who works as an extension of your team brings structure and consistency. Our RPO model takes ownership of all or part of your recruitment process, aligned to your brand, systems and service levels.",
    icon: "workflow",
    image: "/images/workshop.jpg",
    enabled: true,
    problems: [
      "Hiring volumes that outgrow the internal recruitment team.",
      "Inconsistent processes across locations, teams or hiring managers.",
      "Limited visibility into where candidates drop out and why.",
      "Heavy dependence on multiple agencies with uneven quality.",
    ],
    process: [
      { title: "Process review", body: "We map your current hiring process, tools and stakeholders to understand what works and what does not." },
      { title: "Design the model", body: "Together we define scope, roles, service levels and reporting before anything changes." },
      { title: "Embed and deliver", body: "Our recruiters work within your process and systems, representing your employer brand." },
      { title: "Review and improve", body: "Regular reviews with your team keep the process improving as needs evolve." },
    ],
    benefits: [
      { title: "Consistency at scale", body: "One process, one standard, across every team that hires." },
      { title: "Clear reporting", body: "Agreed metrics show pipeline health and where to improve." },
      { title: "Flexible scope", body: "Outsource the full cycle or just the stages that create bottlenecks." },
    ],
    faqs: [
      { question: "Do we have to outsource all of our recruitment?", answer: "No. RPO can cover the full cycle, specific roles or individual stages such as sourcing and screening." },
      { question: "Will you use our applicant tracking system?", answer: "Wherever possible, yes. We agree tools and data handling as part of setting up the engagement." },
    ],
    related: ["talent-acquisition-support", "workforce-planning", "permanent-recruitment"],
  },
  {
    slug: "hr-consulting",
    title: "HR Consulting",
    summary:
      "Practical advice on people processes, policies and structures that support how your business works.",
    intro:
      "Good people practices make growth easier. We help leadership teams put sensible foundations in place, from hiring processes and role frameworks to onboarding and the everyday policies that shape employee experience.",
    icon: "compass",
    image: "/images/about-collab.jpg",
    enabled: true,
    problems: [
      "People processes that have not kept up with the size of the business.",
      "Unclear roles, responsibilities or reporting lines.",
      "Onboarding that varies from manager to manager.",
      "Policies that are outdated, inconsistent or missing.",
    ],
    process: [
      { title: "Listen and diagnose", body: "We speak with leaders and, where appropriate, employees to understand the real issues." },
      { title: "Prioritise", body: "We agree a focused set of improvements based on impact and effort." },
      { title: "Build practical tools", body: "We develop processes, templates and guidance your managers will actually use." },
      { title: "Support adoption", body: "We help you roll changes out and refine them based on feedback." },
    ],
    benefits: [
      { title: "Fit-for-purpose practices", body: "Recommendations sized to your organisation, not copied from a corporate playbook." },
      { title: "Managers who feel equipped", body: "Clear guidance helps managers handle people matters consistently." },
      { title: "A better employee experience", body: "Thoughtful processes signal that your organisation values its people." },
    ],
    faqs: [
      { question: "Do you provide legal advice?", answer: "No. Our consulting focuses on HR practice. Where employment-law advice is required, we recommend working with a qualified legal professional." },
      { question: "Can you work alongside our existing HR team?", answer: "Yes. Many engagements involve supporting an in-house HR lead with additional capacity or perspective." },
    ],
    related: ["workforce-planning", "talent-acquisition-support", "executive-search"],
  },
  {
    slug: "workforce-planning",
    title: "Workforce Planning & Talent Strategy",
    shortTitle: "Workforce Planning",
    summary:
      "Connect your business plans to the skills, roles and hiring timeline needed to deliver them.",
    intro:
      "Hiring reactively is expensive. Workforce planning helps you anticipate the roles and capabilities your business will need, so you can hire, develop and organise ahead of demand rather than behind it.",
    icon: "chart",
    image: "/images/planning.jpg",
    enabled: true,
    problems: [
      "Growth plans with no clear view of the people needed to deliver them.",
      "Critical skills concentrated in a few individuals.",
      "Hiring budgets that are set without a role-by-role rationale.",
      "Uncertainty about when to build, buy or borrow talent.",
    ],
    process: [
      { title: "Understand the plan", body: "We start from your business objectives and the assumptions behind them." },
      { title: "Map current capability", body: "We review existing roles, skills and structure to find gaps and risks." },
      { title: "Model scenarios", body: "We outline hiring and development options, with timings, for different growth scenarios." },
      { title: "Build the roadmap", body: "You receive a practical, prioritised talent plan you can act on." },
    ],
    benefits: [
      { title: "Hire ahead of need", body: "Start searches early enough to secure the right people." },
      { title: "Smarter budgets", body: "Tie headcount spend to clear business priorities." },
      { title: "Reduced key-person risk", body: "Identify where succession and development need attention." },
    ],
    faqs: [
      { question: "Is workforce planning only for large organisations?", answer: "Not at all. Growing businesses often benefit most, because each hire represents a larger share of the team." },
    ],
    related: ["hr-consulting", "recruitment-process-outsourcing", "permanent-recruitment"],
  },
  {
    slug: "talent-acquisition-support",
    title: "Talent Acquisition Support",
    shortTitle: "TA Support",
    summary:
      "Flexible recruiting capacity and expertise that strengthens your in-house hiring team.",
    intro:
      "Sometimes your internal team simply needs more hands or specialist support. We provide sourcing, screening and coordination support that plugs into your existing process for as long as it is useful.",
    icon: "search",
    image: "/images/laptop-work.jpg",
    enabled: true,
    problems: [
      "In-house recruiters stretched across too many open roles.",
      "Hard-to-fill positions that need dedicated sourcing effort.",
      "Interview scheduling and candidate updates falling behind.",
      "Job descriptions and adverts that are not attracting the right people.",
    ],
    process: [
      { title: "Agree the scope", body: "We identify which roles and stages need support and how we will work together." },
      { title: "Plug in", body: "We align with your tools, templates and approval steps." },
      { title: "Deliver", body: "We source, screen and coordinate, keeping your team informed at every step." },
      { title: "Hand back", body: "We document what we learned so your team keeps the benefit after the engagement." },
    ],
    benefits: [
      { title: "Capacity on demand", body: "Extra recruiting support without a permanent headcount increase." },
      { title: "Specialist sourcing", body: "Focused effort on the roles your team finds hardest to fill." },
      { title: "Better candidate communication", body: "Fewer candidates left waiting for updates." },
    ],
    faqs: [
      { question: "How long do engagements usually last?", answer: "Engagements are scoped to your needs, from a single hard-to-fill role to an ongoing support arrangement." },
    ],
    related: ["recruitment-process-outsourcing", "permanent-recruitment", "contract-staffing"],
  },
  {
    slug: "payroll-compliance",
    title: "Payroll & Compliance Support",
    shortTitle: "Payroll Support",
    summary:
      "Administrative support for contractor payroll and onboarding documentation, coordinated with your advisers.",
    intro:
      "Bringing flexible workers on board involves paperwork. We help coordinate onboarding documentation and contractor payroll administration for placements we manage, working alongside your finance team and professional advisers.",
    icon: "shield",
    image: "/images/ind-finance.jpg",
    // Confirm this service is actually offered before launch; set to false if not.
    enabled: true,
    problems: [
      "Onboarding documentation that slows contractor start dates.",
      "Administrative load on finance teams for short-term workers.",
      "Inconsistent records for flexible workers across teams.",
    ],
    process: [
      { title: "Confirm requirements", body: "We agree the scope of support with you and, where relevant, your finance and legal advisers." },
      { title: "Coordinate documentation", body: "We collect and organise the onboarding documents required for each placement." },
      { title: "Administer", body: "We support payroll administration for the placements within scope." },
      { title: "Report", body: "You receive clear records for your own reporting and audits." },
    ],
    benefits: [
      { title: "Fewer delays", body: "Organised documentation helps workers start on time." },
      { title: "Less administrative load", body: "Your team spends less time on contractor paperwork." },
      { title: "Clear records", body: "Consistent documentation for every placement we manage." },
    ],
    faqs: [
      { question: "Do you provide tax or legal advice?", answer: "No. We provide administrative support and coordinate with your appointed finance, tax and legal advisers where needed." },
    ],
    related: ["contract-staffing", "hr-consulting", "recruitment-process-outsourcing"],
  },
];

export const services = allServices.filter((s) => s.enabled);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}

export function getServicesBySlugs(slugs: string[]) {
  return slugs.map(getService).filter((s): s is Service => Boolean(s));
}
