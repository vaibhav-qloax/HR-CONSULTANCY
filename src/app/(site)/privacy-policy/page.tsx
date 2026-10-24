import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How QLOAX collects, uses and protects personal information.",
  alternates: { canonical: "/privacy-policy" },
};

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "This policy explains how QLOAX ([registered legal entity name], [registered address]) collects and uses personal information when you use this website, apply for a job, register as a candidate or contact us as an employer.",
      "For privacy questions, contact us at [privacy contact email].",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      [
        "Candidates: name, contact details, location, experience, career preferences, your resume and anything you choose to include in a cover letter or profile summary.",
        "Employers: contact name, company, work email, phone number and details of your hiring requirements.",
        "Website enquiries: the information you enter in our contact form.",
        "Technical data: basic server logs needed to operate and secure the website. [Describe any analytics or cookies used, or state that none are used.]",
      ],
    ],
  },
  {
    heading: "How we use your information",
    body: [
      [
        "To assess applications and match candidates with suitable roles.",
        "To respond to enquiries and provide recruitment and HR services to employers.",
        "To contact candidates about other roles, only where they have agreed to this.",
        "To operate, secure and improve the website.",
        "To meet legal and regulatory obligations.",
      ],
      "[Confirm the lawful basis for each purpose under the data-protection laws that apply to QLOAX.]",
    ],
  },
  {
    heading: "Sharing your information",
    body: [
      "We only share a candidate's details with a prospective employer after discussing the opportunity with that candidate. We may use trusted service providers, for example for hosting or email, who process data on our instructions. We do not sell personal information.",
      "[List categories of service providers and any international transfers.]",
    ],
  },
  {
    heading: "How we protect and store data",
    body: [
      "Resumes and submissions are stored on secured servers and are accessible only to authorised QLOAX staff. Uploaded files are never publicly accessible.",
      "We keep candidate information for [retention period] unless you ask us to delete it sooner, and employer enquiries for [retention period].",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, to withdraw consent and to complain to a data-protection authority. To make a request, contact [privacy contact email].",
    ],
  },
  {
    heading: "Changes to this policy",
    body: ["We may update this policy from time to time. The latest version will always be available on this page."],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      crumb="Privacy Policy"
      intro="How we collect, use and protect information from candidates, employers and website visitors."
      updated="[Date]"
      sections={sections}
    />
  );
}
