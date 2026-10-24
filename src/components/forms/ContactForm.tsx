"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { contactSchema, enquiryTypes, type ContactInput } from "@/lib/validation";
import { zodResolver } from "@/lib/zod-resolver";
import { Button } from "@/components/ui/Button";
import { CheckboxField, Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { FormError, FormSuccess } from "./FormFeedback";
import { useFormSubmit } from "./useFormSubmit";

export function ContactForm() {
  const { state, submit, reset: resetState } = useFormSubmit("/api/forms/contact");
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", enquiryType: undefined, message: "", privacy: false as unknown as true, website: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (state.status === "error" && state.fieldErrors) {
      for (const [k, v] of Object.entries(state.fieldErrors)) setError(k as keyof ContactInput, { message: v });
    }
  }, [state, setError]);

  if (state.status === "success") {
    return (
      <FormSuccess
        title="Thank you — your message has been received."
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
            Send another message
          </Button>
        }
      >
        A member of our team will review your enquiry and reply by email.
      </FormSuccess>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v))} className="relative grid gap-6" aria-label="Contact form">
      <Honeypot {...register("website")} />
      <div className="grid gap-6 md:grid-cols-2">
        <TextField label="Full name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
        <TextField label="Email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
        <TextField label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
        <SelectField label="Enquiry type" required options={enquiryTypes} error={errors.enquiryType?.message} {...register("enquiryType")} />
      </div>
      <TextAreaField label="Message" required rows={6} placeholder="How can we help?" error={errors.message?.message} {...register("message")} />
      <CheckboxField
        error={errors.privacy?.message}
        label={
          <>
            I have read the{" "}
            <Link href="/privacy-policy" className="font-semibold text-accent underline underline-offset-4">
              privacy policy
            </Link>{" "}
            and agree to QLOAX using these details to respond to my enquiry.
          </>
        }
        {...register("privacy")}
      />
      {state.status === "error" && <FormError message={state.message} />}
      <div>
        <Button type="submit" size="lg" arrow loading={state.status === "submitting"} loadingLabel="Sending…">
          Send message
        </Button>
      </div>
    </form>
  );
}
