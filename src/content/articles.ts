import type { Article, ArticleBlock, ArticleCategory } from "@/types";
import { readingMinutes } from "@/lib/utils";

export const articleCategories: ArticleCategory[] = [
  "Career Advice",
  "Hiring Advice",
  "Workplace Culture",
  "Talent Strategy",
];

export const articles: Article[] = [
  {
    slug: "writing-a-resume-that-gets-read",
    title: "Writing a resume that actually gets read",
    excerpt:
      "Recruiters skim before they read. Here is how to structure your resume so the most relevant evidence is impossible to miss.",
    category: "Career Advice",
    cover: "/images/art-resume.jpg",
    coverAlt: "A clipboard holding a resume beside a laptop on a marble desk",
    publishedAt: "2026-10-20",
    author: "QLOAX Editorial",
    body: [
      { type: "p", text: "Most resumes are not rejected because the candidate is unsuitable. They are set aside because the relevant evidence was hard to find. A recruiter reviewing dozens of applications will skim the top third of your first page and decide whether to read further. Your job is to make that first skim count." },
      { type: "h2", text: "Lead with a focused summary" },
      { type: "p", text: "Open with three or four lines that say who you are professionally, what you are good at and what you are looking for next. Avoid generic phrases such as \"hard-working team player\". Instead, name your specialism, your level of experience and the kind of problems you solve." },
      { type: "h2", text: "Describe outcomes, not duties" },
      { type: "p", text: "Job descriptions list duties. Strong resumes show what changed because you were there. For each role, pick the achievements most relevant to the job you are applying for and describe them concretely." },
      { type: "ul", items: [
        "Start each bullet with a strong verb: led, built, reduced, launched, negotiated.",
        "Add scale where you can: team size, budget, number of customers, volume handled.",
        "Include results you can genuinely stand behind in an interview.",
      ] },
      { type: "h2", text: "Tailor without rewriting" },
      { type: "p", text: "Keep a full master resume, then create a tailored version for each application. Reorder bullets so the most relevant ones come first, adjust your summary and mirror the language of the job description where it honestly describes your experience." },
      { type: "quote", text: "If the most relevant line on your resume is on page two, assume it will not be seen." },
      { type: "h2", text: "Keep the format simple" },
      { type: "p", text: "Many employers use applicant tracking systems that read your resume before a person does. A clean single-column layout, standard headings and a PDF or DOCX file give you the best chance of being parsed correctly. Two pages is plenty for most roles." },
      { type: "h2", text: "Check the basics" },
      { type: "ul", items: [
        "Your phone number and email are correct and professional.",
        "Dates are consistent and gaps are briefly explained if they matter.",
        "Spelling and grammar have been checked by someone other than you.",
      ] },
      { type: "p", text: "A resume is not your life story. It is the evidence that earns you a conversation. Make that evidence easy to find, and the conversation becomes far more likely." },
    ],
  },
  {
    slug: "preparing-for-structured-interviews",
    title: "How to prepare for a structured interview",
    excerpt:
      "More employers now use structured interviews. Understanding how they work helps you give clear, relevant answers under pressure.",
    category: "Career Advice",
    cover: "/images/art-hiring.jpg",
    coverAlt: "Two professionals talking across a table during an interview",
    publishedAt: "2026-10-12",
    author: "QLOAX Editorial",
    body: [
      { type: "p", text: "In a structured interview, every candidate is asked the same core questions and assessed against the same criteria. It is designed to make hiring fairer, and it rewards preparation. Here is how to approach one." },
      { type: "h2", text: "Work out what is being assessed" },
      { type: "p", text: "Re-read the job description and list the four to six capabilities that matter most. These are usually the criteria your answers will be scored against: perhaps stakeholder management, problem-solving, technical depth and leadership." },
      { type: "h2", text: "Prepare evidence, not scripts" },
      { type: "p", text: "For each capability, prepare two real examples. Use a simple structure so your answers stay focused:" },
      { type: "ul", items: [
        "Situation: the context, briefly.",
        "Task: what you were responsible for.",
        "Action: what you personally did, and why.",
        "Result: what happened, and what you learned.",
      ] },
      { type: "p", text: "Spend most of your time on the action. Interviewers want to understand your judgement, not just the outcome." },
      { type: "h2", text: "Expect follow-up questions" },
      { type: "p", text: "Structured does not mean robotic. Interviewers will probe: what would you do differently, how did others react, what trade-offs did you consider. Honest, reflective answers score better than polished stories that fall apart under questioning." },
      { type: "quote", text: "The best answers are specific. Names of tools, sizes of teams and real constraints make an example credible." },
      { type: "h2", text: "Prepare your own questions" },
      { type: "p", text: "Ask about how success will be measured in the first six months, the biggest challenge facing the team and how decisions are made. Good questions show you are thinking about doing the job well, not just getting it." },
    ],
  },
  {
    slug: "writing-job-descriptions-that-attract-the-right-people",
    title: "Writing job descriptions that attract the right people",
    excerpt:
      "A job description is a piece of marketing and a filter at the same time. Small changes can significantly improve who applies.",
    category: "Hiring Advice",
    cover: "/images/about-discussion.jpg",
    coverAlt: "A presenter speaking to colleagues in a bright open-plan office",
    publishedAt: "2026-10-05",
    author: "QLOAX Editorial",
    body: [
      { type: "p", text: "Many job descriptions are written once, copied forever and rarely questioned. Yet the description is often the first impression a candidate has of your organisation. It should help the right people say yes and help everyone else self-select out." },
      { type: "h2", text: "Start with the purpose of the role" },
      { type: "p", text: "Before listing tasks, explain why the role exists and what it will achieve in its first year. Candidates who are motivated by that mission will lean in, and you will learn early whether internal stakeholders agree on the purpose." },
      { type: "h2", text: "Separate essentials from preferences" },
      { type: "p", text: "Long lists of requirements discourage capable people, especially those who only apply when they meet every point. Be disciplined: list the genuine essentials, then a short set of nice-to-haves." },
      { type: "ul", items: [
        "Ask whether each requirement would truly rule someone out.",
        "Replace years-of-experience rules with the capability you actually need.",
        "Remove degree requirements where they are not necessary for the work.",
      ] },
      { type: "h2", text: "Be honest about the realities" },
      { type: "p", text: "Mention travel, shift patterns, reporting lines and the working model clearly. Including a salary range, where your organisation is able to, saves time for everyone and builds trust." },
      { type: "quote", text: "A good job description should make the right candidate think: this was written for me." },
      { type: "h2", text: "Check the language" },
      { type: "p", text: "Read the description aloud. Remove jargon, internal acronyms and unnecessarily gendered or exclusionary phrasing. Plain, warm language widens your pool without lowering the bar." },
    ],
  },
  {
    slug: "what-actually-helps-retain-good-people",
    title: "What actually helps retain good people",
    excerpt:
      "Retention is rarely solved by a single perk. It is the sum of everyday experiences that make people want to stay.",
    category: "Talent Strategy",
    cover: "/images/art-retention.jpg",
    coverAlt: "Colleagues collaborating closely around a laptop",
    publishedAt: "2026-09-28",
    author: "QLOAX Editorial",
    body: [
      { type: "p", text: "When a valued employee resigns, organisations often reach for a counter-offer. Sometimes it works. More often, the reasons for leaving were building for months and money only delays the decision. Sustainable retention comes from getting the fundamentals right." },
      { type: "h2", text: "Managers matter most" },
      { type: "p", text: "People's day-to-day experience is shaped largely by their manager. Investing in managers' ability to give feedback, set clear priorities and have honest career conversations pays back across the whole team." },
      { type: "h2", text: "Make growth visible" },
      { type: "p", text: "Employees stay when they can see a future. That does not always mean promotion. It can mean new responsibilities, projects, skills or mentoring. What matters is that growth is discussed openly and regularly." },
      { type: "ul", items: [
        "Hold career conversations separately from performance reviews.",
        "Publish internal roles before advertising externally where possible.",
        "Recognise skill development, not just output.",
      ] },
      { type: "h2", text: "Listen before people leave" },
      { type: "p", text: "Exit interviews arrive too late. Stay conversations, simple and regular check-ins about what keeps someone engaged and what might tempt them away, surface issues while there is still time to act." },
      { type: "quote", text: "People rarely leave over one thing. They leave over many small things nobody noticed." },
      { type: "h2", text: "Hire for fit from the start" },
      { type: "p", text: "Retention starts at recruitment. Honest job descriptions, realistic previews of the role and a thoughtful onboarding experience reduce early attrition and set expectations both sides can meet." },
    ],
  },
  {
    slug: "building-a-culture-people-want-to-join",
    title: "Building a culture people want to join",
    excerpt:
      "Culture is not a values poster. It is how decisions are made, how people are treated and what gets rewarded.",
    category: "Workplace Culture",
    cover: "/images/art-culture.jpg",
    coverAlt: "A group of friends sitting together outdoors with arms around each other",
    publishedAt: "2026-09-18",
    author: "QLOAX Editorial",
    body: [
      { type: "p", text: "Candidates increasingly ask about culture during interviews, and they can tell the difference between a rehearsed answer and a real one. A strong culture is not about perks. It is about consistent behaviour that people can rely on." },
      { type: "h2", text: "Define behaviours, not slogans" },
      { type: "p", text: "Values only matter when they translate into everyday actions. For each value, describe what it looks like in practice and what it does not look like. This gives managers something concrete to recognise and coach." },
      { type: "h2", text: "Watch what you reward" },
      { type: "p", text: "Promotions, praise and pay send the clearest cultural signal of all. If you say collaboration matters but reward only individual results, people will notice the gap." },
      { type: "ul", items: [
        "Include behaviours as well as results in performance conversations.",
        "Celebrate the quiet work that holds teams together.",
        "Address poor behaviour from high performers consistently.",
      ] },
      { type: "h2", text: "Make onboarding a cultural moment" },
      { type: "p", text: "New joiners form lasting impressions in their first weeks. Thoughtful onboarding, with clear expectations, real introductions and early wins, tells them what kind of place they have joined." },
      { type: "quote", text: "Culture is what people do when no one is reminding them of the values." },
    ],
  },
  {
    slug: "planning-your-next-career-move",
    title: "Planning your next career move with intent",
    excerpt:
      "The best career moves are deliberate. A simple framework can help you decide when to move, and what to move towards.",
    category: "Career Advice",
    cover: "/images/art-career.jpg",
    coverAlt: "A person writing notes in a notebook beside a coffee cup",
    publishedAt: "2026-09-08",
    author: "QLOAX Editorial",
    body: [
      { type: "p", text: "Career moves often happen reactively: a frustrating week, an unexpected call from a recruiter, a friend's new role. Reactive moves can work out, but deliberate ones tend to work out better." },
      { type: "h2", text: "Start with what you want more of" },
      { type: "p", text: "List the parts of your work that energise you and the parts that drain you. Then consider what you want more of in your next role: responsibility, learning, flexibility, impact or stability. Be honest about priorities, because every role involves trade-offs." },
      { type: "h2", text: "Test before you leap" },
      { type: "p", text: "Speak to people already doing the work you are considering. Ask what a typical week looks like and what surprised them. These conversations are often more valuable than any job description." },
      { type: "ul", items: [
        "Identify two or three target roles or sectors.",
        "Find the skill gaps between where you are and where you want to be.",
        "Look for projects in your current role that could close those gaps.",
      ] },
      { type: "h2", text: "Work with a recruiter well" },
      { type: "p", text: "Be clear about what you want, what you will not compromise on and your realistic timeline. A good recruiter will be honest about the market and will only put you forward with your agreement." },
      { type: "quote", text: "A career move should be towards something, not just away from something." },
    ],
  },
];

function blockWords(block: ArticleBlock) {
  if (block.type === "ul") return block.items.join(" ").split(/\s+/).length;
  return block.text.split(/\s+/).length;
}

export function getReadingTime(article: Article) {
  return readingMinutes(article.body.reduce((n, b) => n + blockWords(b), 0));
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug) ?? null;
}

export const sortedArticles = [...articles].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);
