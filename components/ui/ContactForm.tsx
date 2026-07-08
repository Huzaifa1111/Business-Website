"use client";

import { useState, useId } from "react";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "loading" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldError {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateForm(values: FormValues): FieldError {
  const errors: FieldError = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Your message should be at least 20 characters.";
  }
  return errors;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-neutral-700"
      >
        {label}
        {required && (
          <span className="text-primary-500 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M6 1a5 5 0 100 10A5 5 0 006 1zm-.5 2.5h1v3h-1V3.5zm0 4h1v1h-1v-1z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-150";
const inputErrorClass =
  "border-red-300 focus:ring-red-300 focus:border-red-300";

export function ContactForm() {
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const subjectId = `${uid}-subject`;
  const messageId = `${uid}-message`;

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const set = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    // Clear error on change
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateForm(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Focus first errored field
      const firstKey = Object.keys(errs)[0] as keyof FieldError;
      const map: Record<keyof FieldError, string> = {
        name: nameId,
        email: emailId,
        subject: subjectId,
        message: messageId,
      };
      document.getElementById(map[firstKey])?.focus();
      return;
    }
    setFormState("loading");
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setFormState("success");
    } catch (error) {
      console.error(error);
      setFormState("error");
    }
  };

  const handleReset = () => {
    setValues({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setFormState("idle");
  };

  /* ── Success state ── */
  if (formState === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center text-center py-16 px-6 gap-5"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))",
          }}
          aria-hidden="true"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            className="text-primary-600"
          >
            <circle cx="18" cy="18" r="18" fill="currentColor" fillOpacity="0.1" />
            <path
              d="M11 18l5 5 9-9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3
            className="text-2xl font-bold text-neutral-900 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Message received!
          </h3>
          <p className="text-neutral-500 text-sm max-w-xs">
            Thank you, {values.name.split(" ")[0]}. One of our consultants will reach out within 24 hours.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="text-sm font-semibold text-primary-600 hover:text-primary-700 underline underline-offset-4 transition-colors cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-5"
    >
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id={nameId} label="Full name" error={errors.name} required>
          <input
            id={nameId}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Jonathan Hargrove"
            value={values.name}
            onChange={set("name")}
            className={`${inputClass} ${errors.name ? inputErrorClass : ""}`}
            aria-required="true"
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
          />
        </Field>
        <Field id={emailId} label="Email address" error={errors.email} required>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={set("email")}
            className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
            aria-required="true"
          />
        </Field>
      </div>

      {/* Subject */}
      <Field id={subjectId} label="Subject" error={errors.subject} required>
        <select
          id={subjectId}
          name="subject"
          value={values.subject}
          onChange={set("subject")}
          className={`${inputClass} ${errors.subject ? inputErrorClass : ""} cursor-pointer`}
          aria-required="true"
        >
          <option value="">Select a topic…</option>
          <option value="Strategic Advisory">Strategic Advisory</option>
          <option value="Operational Excellence">Operational Excellence</option>
          <option value="Digital Transformation">Digital Transformation</option>
          <option value="Financial Advisory">Financial Advisory</option>
          <option value="Talent & Organisation">Talent &amp; Organisation</option>
          <option value="Market Expansion">Market Expansion</option>
          <option value="General Enquiry">General Enquiry</option>
        </select>
      </Field>

      {/* Message */}
      <Field id={messageId} label="Message" error={errors.message} required>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          placeholder="Tell us about your business challenge, goals, or any questions you have…"
          value={values.message}
          onChange={set("message")}
          className={`${inputClass} resize-none ${errors.message ? inputErrorClass : ""}`}
          aria-required="true"
        />
        <p className="text-xs text-neutral-400 text-right">
          {values.message.length} characters
        </p>
      </Field>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full justify-center mt-1"
        disabled={formState === "loading"}
        aria-busy={formState === "loading"}
      >
        {formState === "loading" ? (
          <>
            <svg
              className="animate-spin"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="9"
                cy="9"
                r="7"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="2"
              />
              <path
                d="M9 2a7 7 0 017 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send Message
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 14L14 2M14 2H6M14 2v8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </Button>

      <p className="text-xs text-center text-neutral-400">
        We respond within 24 hours · Your data is never shared
      </p>
    </form>
  );
}
