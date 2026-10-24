"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { applicationSchema, experienceRanges, resumeFileError, type ApplicationInput } from "@/lib/validation";
import { zodResolver } from "@/lib/zod-resolver";
import { siteConfig } from "@/config/site";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CheckboxField, FileField, Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { FormError, FormSuccess } from "./FormFeedback";
import { useFormSubmit } from "./useFormSubmit";

const accept = siteConfig.uploads.acceptedResumeExtensions.join(",");
const maxMb = Math.round(siteConfig.uploads.maxResumeBytes / 1024 / 1024);

export function JobApplicationForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const { state, submit } = useFormSubmit("/api/forms/application");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      jobSlug,
      name: "",
      email: "",
      phone: "",
      location: "",
      experience: undefined,
      noticePeriod: "",
      linkedin: "",
      coverLetter: "",
      futureConsent: false,
      privacy: false as unknown as true,
      website: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (state.status === "error" && state.fieldErrors) {
      for (const [k, v] of Object.entries(state.fieldErrors)) {
        if (k === "resume") setFileError(v);
        else setError(k as keyof ApplicationInput, { message: v });
      }
    }
  }, [state, setError]);

  function chooseFile(f: File | null) {
    setFile(f);
    setFileError(f ? (resumeFileError(f) ?? undefined) : undefined);
  }

  if (state.status === "success") {
    return (
      <FormSuccess
        title="Application received."
        reference={state.reference}
        action={
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/careers" size="sm">
              Browse more roles
            </ButtonLink>
            <ButtonLink href="/insights" size="sm" variant="outline">
              Career advice
            </ButtonLink>
          </div>
        }
      >
        Thank you for applying for <strong className="text-ink">{jobTitle}</strong>. A consultant will review your
        application. If your experience matches the role, we will be in touch to discuss next steps.
      </FormSuccess>
    );
  }

  return (
    <form
      noValidate
      aria-label={`Application for ${jobTitle}`}
      onSubmit={handleSubmit(
        (v) => {
          const err = resumeFileError(file);
          if (err) {
            setFileError(err);
            return;
          }
          return submit(v, file);
        },
        () => setFileError(resumeFileError(file) ?? undefined),
      )}
      className="relative grid gap-10"
    >
      <Honeypot {...register("website")} />
      <input type="hidden" {...register("jobSlug")} />

      <fieldset className="grid gap-6">
        <legend className="mb-6 text-xl font-semibold tracking-tight">Your details</legend>
        <div className="grid gap-6 md:grid-cols-2">
          <TextField label="Full name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
          <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
          <TextField label="Phone" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
          <TextField
            label="Current location"
            required
            autoComplete="address-level2"
            placeholder="City, country"
            error={errors.location?.message}
            {...register("location")}
          />
          <SelectField label="Total experience" required options={experienceRanges} error={errors.experience?.message} {...register("experience")} />
          <TextField label="Notice period" placeholder="e.g. 30 days" error={errors.noticePeriod?.message} {...register("noticePeriod")} />
          <TextField
            label="LinkedIn or portfolio URL"
            type="url"
            placeholder="https://"
            className="md:col-span-2"
            error={errors.linkedin?.message}
            {...register("linkedin")}
          />
        </div>
      </fieldset>

      <fieldset className="grid gap-6">
        <legend className="mb-6 text-xl font-semibold tracking-tight">Resume &amp; cover letter</legend>
        <FileField
          label="Resume"
          required
          file={file}
          onFile={chooseFile}
          error={fileError}
          accept={accept}
          hint={`PDF, DOC or DOCX, up to ${maxMb} MB.`}
        />
        <TextAreaField
          label="Cover letter"
          rows={7}
          placeholder="Tell us why this role interests you and what you would bring to it."
          error={errors.coverLetter?.message}
          {...register("coverLetter")}
        />
      </fieldset>

      <div className="grid gap-5 rounded-[var(--radius-md)] border border-line bg-ivory p-5 md:p-6">
        <p className="text-sm leading-relaxed text-muted">
          We use your information to assess your application for this role and, with your consent, to contact you
          about other suitable roles. We will not share your details with an employer without telling you first.
          Read our{" "}
          <Link href="/privacy-policy" className="font-semibold text-accent underline underline-offset-4">
            privacy policy
          </Link>{" "}
          for how we store and protect your data.
        </p>
        <CheckboxField label="Keep my details on file and contact me about other suitable roles." {...register("futureConsent")} />
        <CheckboxField
          error={errors.privacy?.message}
          label="I have read the privacy notice and agree to QLOAX processing my application."
          {...register("privacy")}
        />
      </div>

      {state.status === "error" && <FormError message={state.message} />}
      <div>
        <Button type="submit" size="lg" arrow loading={state.status === "submitting"} loadingLabel="Uploading application…">
          Submit application
        </Button>
      </div>
    </form>
  );
}
