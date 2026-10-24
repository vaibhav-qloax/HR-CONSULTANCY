import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/ui/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing use of the QLOAX website.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: [
      "These terms govern your use of this website, operated by QLOAX ([registered legal entity name]). By using the website you agree to them. Recruitment and HR services for employers are provided under separate written terms of business.",
    ],
  },
  {
    heading: "Use of the website",
    body: [
      [
        "Use the website lawfully and do not attempt to disrupt or gain unauthorised access to it.",
        "Provide accurate information in any form you submit.",
        "Do not upload files that contain malicious code or content you have no right to share.",
      ],
    ],
  },
  {
    heading: "Job listings",
    body: [
      "We take care to keep job listings accurate, but roles may be filled, changed or withdrawn at any time. A listing is not an offer of employment. Submitting an application does not guarantee an interview or placement.",
    ],
  },
  {
    heading: "Candidates",
    body: [
      "QLOAX does not charge candidates fees for job-search or placement support. [Confirm this reflects your business model.] We will not share your details with an employer without discussing the opportunity with you first.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "Website content, design and branding belong to QLOAX or its licensors. Articles may be shared with a link back to the original page.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "Website content is provided for general information and does not constitute legal, financial or professional advice. [Insert limitation-of-liability wording appropriate to your jurisdiction.]",
    ],
  },
  {
    heading: "Governing law",
    body: ["These terms are governed by the laws of [jurisdiction]."],
  },
  {
    heading: "Contact",
    body: ["Questions about these terms can be sent to [contact email]."],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      crumb="Terms & Conditions"
      intro="The rules for using this website. Services for employers are covered by separate terms of business."
      updated="[Date]"
      sections={sections}
    />
  );
}
