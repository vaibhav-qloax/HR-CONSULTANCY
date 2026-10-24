import { z } from "zod";
import { siteConfig } from "@/config/site";

/* Shared between client forms and server route handlers. */

export const enquiryTypes = [
  "Hiring support",
  "Job seeker enquiry",
  "HR consulting",
  "Partnership",
  "Other",
] as const;

export const hiringRequirements = [
  "Permanent recruitment",
  "Contract or temporary staffing",
  "Executive search",
  "Recruitment process outsourcing",
  "HR consulting",
  "Workforce planning",
  "Talent acquisition support",
  "Not sure yet",
] as const;

export const experienceRanges = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–8 years",
  "8–12 years",
  "12+ years",
] as const;

export const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"] as const;
export const workModeOptions = ["On-site", "Hybrid", "Remote"] as const;

const name = z
  .string()
  .trim()
  .min(2, { error: "Please enter your full name." })
  .max(100, { error: "Name must be 100 characters or fewer." });

const email = z
  .string()
  .trim()
  .min(1, { error: "Please enter your email address." })
  .max(160)
  .pipe(z.email({ error: "Please enter a valid email address." }));

const phone = z
  .string()
  .trim()
  .min(7, { error: "Please enter a valid phone number." })
  .max(20, { error: "Please enter a valid phone number." })
  .regex(/^[+()\d\s-]+$/, { error: "Use digits, spaces, +, - or brackets only." });

const optionalPhone = z
  .string()
  .trim()
  .max(20)
  .refine((v) => v === "" || /^[+()\d\s-]{7,20}$/.test(v), {
    error: "Please enter a valid phone number.",
  });

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .refine((v) => v === "" || /^https?:\/\/\S+\.\S+/.test(v), {
    error: "Please enter a full URL starting with https://",
  });

const privacy = z.literal(true, {
  error: "Please confirm you have read the privacy notice.",
});

/** Hidden honeypot field; humans leave it blank. */
const honeypot = z.string().max(0).optional();

export const contactSchema = z.object({
  name,
  email,
  phone: optionalPhone,
  enquiryType: z.enum(enquiryTypes, { error: "Please choose an enquiry type." }),
  message: z
    .string()
    .trim()
    .min(10, { error: "Please add a little more detail (at least 10 characters)." })
    .max(3000, { error: "Please keep your message under 3,000 characters." }),
  privacy,
  website: honeypot,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const employerSchema = z.object({
  name,
  company: z.string().trim().min(2, { error: "Please enter your company name." }).max(120),
  email,
  phone,
  industry: z.string().trim().min(1, { error: "Please choose an industry." }).max(80),
  requirement: z.enum(hiringRequirements, { error: "Please choose a hiring requirement." }),
  vacancies: z
    .string()
    .trim()
    .max(6)
    .refine((v) => v === "" || (/^\d+$/.test(v) && Number(v) > 0 && Number(v) <= 10000), {
      error: "Enter a number, or leave blank if unsure.",
    }),
  message: z
    .string()
    .trim()
    .min(10, { error: "Tell us a little about the roles (at least 10 characters)." })
    .max(3000, { error: "Please keep your message under 3,000 characters." }),
  privacy,
  website: honeypot,
});
export type EmployerInput = z.infer<typeof employerSchema>;

export const applicationSchema = z.object({
  jobSlug: z.string().trim().min(1).max(120),
  name,
  email,
  phone,
  location: z.string().trim().min(2, { error: "Please enter your current location." }).max(100),
  experience: z.enum(experienceRanges, { error: "Please choose your total experience." }),
  noticePeriod: z.string().trim().max(60),
  linkedin: optionalUrl,
  coverLetter: z.string().trim().max(4000, { error: "Please keep your cover letter under 4,000 characters." }),
  futureConsent: z.boolean(),
  privacy,
  website: honeypot,
});
export type ApplicationInput = z.infer<typeof applicationSchema>;

export const registrationSchema = z.object({
  name,
  email,
  phone,
  location: z.string().trim().min(2, { error: "Please enter your current location." }).max(100),
  currentRole: z.string().trim().max(120),
  experience: z.enum(experienceRanges, { error: "Please choose your total experience." }),
  industries: z.array(z.string().max(80)).min(1, { error: "Choose at least one industry." }).max(10),
  jobTypes: z.array(z.enum(jobTypeOptions)).min(1, { error: "Choose at least one job type." }),
  workMode: z.enum([...workModeOptions, "Open to any"], { error: "Choose a work preference." }),
  linkedin: optionalUrl,
  summary: z.string().trim().max(2000, { error: "Please keep this under 2,000 characters." }),
  privacy,
  website: honeypot,
});
export type RegistrationInput = z.infer<typeof registrationSchema>;

/* ---------------- Resume file checks (client + server) ---------------- */

export function resumeFileError(file: { name: string; size: number } | null | undefined, required = true) {
  if (!file || file.size === 0) return required ? "Please attach your resume." : null;
  const lower = file.name.toLowerCase();
  const okExt = siteConfig.uploads.acceptedResumeExtensions.some((ext) => lower.endsWith(ext));
  if (!okExt) return "Upload a PDF, DOC or DOCX file.";
  if (file.size > siteConfig.uploads.maxResumeBytes) {
    return `Files must be ${Math.round(siteConfig.uploads.maxResumeBytes / 1024 / 1024)} MB or smaller.`;
  }
  return null;
}
