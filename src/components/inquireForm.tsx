"use client";

import { useRef, useState } from "react";
import BlurImage from "./blurImage";
import PillButton from "./pillButton";

type FormStatus = "idle" | "loading" | "success" | "error";

type InquirePayload = {
  name: string;
  email: string;
  phone?: string;
  occasion: string;
  date: string;
  budget: string;
  referralSource?: string;
  notes?: string;
  website?: string;
};

type InquireFormProps = {
  forceSuccess?: boolean;
};

type LabeledInputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

const labelClasses =
  "flex flex-col w-full gap-2 text-[18px] uppercase text-(--dark-clover)";
const inputFieldClasses =
  "w-full h-12 border-b-2 border-(--olive) text-[14px] text-(--dark-green)";

export function LabeledInput({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: LabeledInputProps) {
  return (
    <label className={labelClasses}>
      {`${label}${required ? " *" : ""}`}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={inputFieldClasses}
        placeholder={placeholder}
      />
    </label>
  );
}

export function LabeledTextArea({
  label,
  name,
  required = false,
  placeholder,
  autoComplete,
}: LabeledInputProps) {
  return (
    <label className={labelClasses}>
      {`${label}${required ? " *" : ""}`}
      <textarea
        name={name}
        required={required}
        autoComplete={autoComplete}
        className={inputFieldClasses}
        placeholder={placeholder}
        rows={1}
      />
    </label>
  );
}

export function InquireFormSection({ forceSuccess }: InquireFormProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-90 w-full h-full opacity-33 overflow-hidden">
        <BlurImage
          src="/home-lander-section-bg.png"
          alt="decorative background image of a flower wedding tablescape"
          fill
          sizes=""
          className="absolute left-0 right-0 -z-100  object-cover"
        />
      </div>

      <div className="px-6 md:px-12 py-12 lg:py-24">
        <div className="rounded-lg p-1.5 bg-background">
          <div className="border-2 border-(--clover) rounded-sm ">
            <InquireForm forceSuccess={forceSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InquireForm({
  forceSuccess = false,
}: InquireFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const showSuccess = forceSuccess || status === "success";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: InquirePayload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      occasion: String(formData.get("occasion") || "").trim(),
      date: String(formData.get("date") || "").trim(),
      budget: String(formData.get("budget") || "").trim(),
      referralSource: String(formData.get("referralSource") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const message =
          errorBody?.error || "Something went wrong. Please try again.";
        setErrorMessage(message);
        setStatus("error");
        return;
      }

      setStatus("success");
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
      setErrorMessage("We could not send your request. Please try again.");
      setStatus("error");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative p-6 md:p-12"
    >
      <div
        className={`flex flex-col gap-8${
          showSuccess ? " invisible pointer-events-none" : ""
        }`}
        aria-hidden={showSuccess}
      >
        <h2 className="pb-4 text-[48px] text-center sm:text-left leading-16 text-(--dark-olive) font-title">
          Get in touch!
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <LabeledInput
            label="Name"
            name="name"
            required
            placeholder="Your name"
          />

          <LabeledInput
            label="What's The Occasion"
            name="occasion"
            required
            placeholder="Wedding, baby shower, workshop, launch party..."
          />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <LabeledInput
            label="Email"
            name="email"
            type="email"
            required
            placeholder="name@email.com"
          />

          <LabeledInput
            label="Phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
          />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <LabeledInput
            label="Date"
            name="date"
            required
            placeholder="June 1st, 2027"
          />
          <LabeledInput
            label="Budget"
            name="budget"
            required
            placeholder="Don't know? an estimate is totally fine!"
          />
        </div>

        <LabeledInput
          label="How Did You Hear About Us?"
          name="referralSource"
          placeholder="Friend, planner, Instagram..."
        />

        <LabeledTextArea
          label="Additional Notes"
          name="notes"
          placeholder="Tell us more about your event..."
        />

        <label className="hidden" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <PillButton
          type="submit"
          size="form"
          disabled={status === "loading"}
          label={status === "loading" ? "Sending..." : "Send inquiry"}
        />

        {status === "error" && (
          <div role="status" aria-live="polite" className="text-[13px]">
            <p className="text-(--dark-rose)">{errorMessage}</p>
          </div>
        )}
      </div>

      {showSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 p-6 flex flex-col items-center justify-center gap-6 text-center"
        >
          <BlurImage
            src="/posie.png"
            alt="a drawing of a flower"
            width={80}
            height={80}
            className="object-contain"
          />
          <h2 className="text-[48px] leading-16 text-(--dark-olive) font-title">
            Thank you!
          </h2>
          <span className="sm:max-w-lg text-[16px] text-(--dark-green)">
            Your information has been submitted. A member of our team will get
            back to you as soon as possible!
          </span>
        </div>
      )}
    </form>
  );
}
