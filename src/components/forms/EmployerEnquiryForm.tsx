"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { employerSchema, hiringRequirements, type EmployerInput } from "@/lib/validation";
import { zodResolver } from "@/lib/zod-resolver";
import { Button } from "@/components/ui/Button";
import { CheckboxField, Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { FormError, FormSuccess } from "./FormFeedback";
import { useFormSubmit } from "./useFormSubmit";

export function EmployerEnquiryForm({
  industries,
  defaultIndustry = "",
  defaultRequirement,
}: {
  industries: string[];
  defaultIndustry?: string;
  defaultRequirement?: (typeof hiringRequirements)[number];
}) {
  const { state, submit, reset: resetState } = useFormSubmit("/api/forms/employer");
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EmployerInput>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      industry: defaultIndustry,
      requirement: defaultRequirement,
      vacancies: "",
      message: "",
      privacy: false as unknown as true,
      website: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (state.status === "error" && state.fieldErrors) {
      for (const [k, v] of Object.entries(state.fieldErrors)) setError(k as keyof EmployerInput, { message: v });
    }
  }, [state, setError]);

  if (state.status === "success") {
    return (
      <FormSuccess
        title="Thank you — we've received your hiring enquiry."
        reference={state.reference}
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              reset();
              resetState();
            }}
          >
            Submit another enquiry
          </Button>
        }
      >
        A consultant will review your requirements and contact you to arrange an initial conversation.
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v))} className="relative grid gap-6" aria-label="Hiring enquiry form">
      <Honeypot {...register("website")} />
      <div className="grid gap-6 md:grid-cols-2">
        <TextField label="Your name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
        <TextField label="Company name" required autoComplete="organization" error={errors.company?.message} {...register("company")} />
        <TextField label="Work email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
        <TextField label="Phone number" type="tel" required autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
        <SelectField label="Industry" required options={[...industries, "Other"]} error={errors.industry?.message} {...register("industry")} />
        <SelectField label="Hiring requirement" required options={hiringRequirements} error={errors.requirement?.message} {...register("requirement")} />
        <TextField
          label="Number of vacancies"
          inputMode="numeric"
          hint="Leave blank if you're not sure yet."
          error={errors.vacancies?.message}
          {...register("vacancies")}
        />
      </div>
      <TextAreaField
        label="Tell us about the roles"
        required
        rows={6}
        placeholder="Role titles, locations, timelines and anything else that would help us understand your needs."
        error={errors.message?.message}
        {...register("message")}
      />
      <CheckboxField
        error={errors.privacy?.message}
        label={
          <>
            I have read the{" "}
            <Link href="/privacy-policy" className="font-semibold text-accent underline underline-offset-4">
              privacy policy
            </Link>{" "}
            and agree to QLOAX contacting me about this enquiry.
          </>
        }
        {...register("privacy")}
      />
      {state.status === "error" && <FormError message={state.message} />}
      <div>
        <Button type="submit" size="lg" arrow loading={state.status === "submitting"} loadingLabel="Sending enquiry…">
          Submit hiring enquiry
        </Button>
      </div>
    </form>
  );
}
