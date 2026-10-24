"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  experienceRanges,
  jobTypeOptions,
  registrationSchema,
  resumeFileError,
  workModeOptions,
  type RegistrationInput,
} from "@/lib/validation";
import { zodResolver } from "@/lib/zod-resolver";
import { siteConfig } from "@/config/site";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CheckboxField, ChipGroup, FileField, Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { FormError, FormSuccess } from "./FormFeedback";
import { useFormSubmit } from "./useFormSubmit";

const accept = siteConfig.uploads.acceptedResumeExtensions.join(",");
const maxMb = Math.round(siteConfig.uploads.maxResumeBytes / 1024 / 1024);

export function CandidateRegistrationForm({ industries }: { industries: string[] }) {
  const { state, submit } = useFormSubmit("/api/forms/register");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      currentRole: "",
      experience: undefined,
      industries: [],
      jobTypes: [],
      workMode: undefined,
      linkedin: "",
      summary: "",
      privacy: false as unknown as true,
      website: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (state.status === "error" && state.fieldErrors) {
      for (const [k, v] of Object.entries(state.fieldErrors)) {
        if (k === "resume") setFileError(v);
        else setError(k as keyof RegistrationInput, { message: v });
      }
    }
  }, [state, setError]);

  if (state.status === "success") {
    return (
      <FormSuccess
        title="You're registered with QLOAX."
        reference={state.reference}
        action={
          <ButtonLink href="/careers" size="sm">
            Browse current roles
          </ButtonLink>
        }
      >
        Thank you. A consultant will review your profile and get in touch when a suitable opportunity comes up.
        You can ask us to update or delete your details at any time.
      </FormSuccess>
    );
  }

  return (
    <form
      noValidate
      aria-label="Candidate registration form"
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

      <fieldset className="grid gap-6">
        <legend className="mb-6 text-xl font-semibold tracking-tight">About you</legend>
        <div className="grid gap-6 md:grid-cols-2">
          <TextField label="Full name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
          <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
          <TextField label="Phone" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
          <TextField label="Current location" required placeholder="City, country" error={errors.location?.message} {...register("location")} />
          <TextField label="Current or most recent role" error={errors.currentRole?.message} {...register("currentRole")} />
          <SelectField label="Total experience" required options={experienceRanges} error={errors.experience?.message} {...register("experience")} />
        </div>
      </fieldset>

      <fieldset className="grid gap-8">
        <legend className="mb-6 text-xl font-semibold tracking-tight">What you&apos;re looking for</legend>
        <Controller
          control={control}
          name="industries"
          render={({ field }) => (
            <ChipGroup legend="Industries of interest" required options={industries} value={field.value} onChange={field.onChange} error={errors.industries?.message} />
          )}
        />
        <Controller
          control={control}
          name="jobTypes"
          render={({ field }) => (
            <ChipGroup
              legend="Job types"
              required
              options={jobTypeOptions}
              value={field.value}
              onChange={(v) => field.onChange(v as RegistrationInput["jobTypes"])}
              error={errors.jobTypes?.message}
            />
          )}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <SelectField label="Work preference" required options={[...workModeOptions, "Open to any"]} error={errors.workMode?.message} {...register("workMode")} />
          <TextField label="LinkedIn URL" type="url" placeholder="https://" error={errors.linkedin?.message} {...register("linkedin")} />
        </div>
        <TextAreaField
          label="Short professional summary"
          rows={5}
          placeholder="Your key skills, the kind of role you want next, and anything else we should know."
          error={errors.summary?.message}
          {...register("summary")}
        />
        <FileField
          label="Resume"
          required
          file={file}
          onFile={(f) => {
            setFile(f);
            setFileError(f ? (resumeFileError(f) ?? undefined) : undefined);
          }}
          error={fileError}
          accept={accept}
          hint={`PDF, DOC or DOCX, up to ${maxMb} MB.`}
        />
      </fieldset>

      <div className="grid gap-5 rounded-[var(--radius-md)] border border-line bg-ivory p-5 md:p-6">
        <p className="text-sm leading-relaxed text-muted">
          <strong className="text-ink">How we use your information.</strong> We keep your profile and resume so our
          consultants can match you with suitable roles. We only share your details with an employer after
          discussing the opportunity with you. You can ask us to update or delete your information at any time.
          See our{" "}
          <Link href="/privacy-policy" className="font-semibold text-accent underline underline-offset-4">
            privacy policy
          </Link>{" "}
          for details.
        </p>
        <CheckboxField
          error={errors.privacy?.message}
          label="I agree to QLOAX storing my details and contacting me about suitable opportunities."
          {...register("privacy")}
        />
      </div>

      {state.status === "error" && <FormError message={state.message} />}
      <div>
        <Button type="submit" size="lg" arrow loading={state.status === "submitting"} loadingLabel="Registering…">
          Register my profile
        </Button>
      </div>
    </form>
  );
}
