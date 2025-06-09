"use client";

import {
  sendEmailSchema,
  SUBMISSION_LIMIT,
  SUBMISSION_STORAGE_KEY,
  SubmissionStatus,
  TSendEmailSchema,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  MessageCircleCode,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fade, Slide } from "react-awesome-reveal";
import {
  getLocalStorageData,
  updateLocalStorageData,
} from "@/lib/local-storage";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TSendEmailSchema>({
    resolver: zodResolver(sendEmailSchema),
  });

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [message, setMessage] = useState("");
  const [countSubmissions, setCountSubmissions] = useState(SUBMISSION_LIMIT);
  const [isDelayAfterSuccess, setIsDelayAfterSuccess] = useState(false);

  // Load submission count from localStorage - only on initial mount
  useEffect(() => {
    const { count, date } = getLocalStorageData();
    const lastSubmissionDate = date ? new Date(date).toDateString() : null;
    const today = new Date().toDateString();

    if (lastSubmissionDate === today) {
      // If the last submission was today, set the count
      const submissionsLeft = SUBMISSION_LIMIT - count;
      setCountSubmissions(Math.max(submissionsLeft, 0));

      if (count >= SUBMISSION_LIMIT) {
        setSubmissionStatus("limit_exceeded");
        setMessage(
          `You have reached the daily limit of ${SUBMISSION_LIMIT} messages`,
        );
      }
    } else {
      // If it's a new day, reset the count
      setCountSubmissions(SUBMISSION_LIMIT);
      setSubmissionStatus("idle");
      setMessage(`You have ${SUBMISSION_LIMIT} submissions available today`);

      if (date) {
        // Update localStorage with the new date
        localStorage.removeItem(SUBMISSION_STORAGE_KEY);
      }
    }

    clearErrors(); // Clear errors to reset the form state
  }, [clearErrors]);

  // Effect to clear success message after delay
  useEffect(() => {
    if (isSubmitSuccessful && submissionStatus === "success") {
      setIsDelayAfterSuccess(true); // Start the delay state
      const timer = setTimeout(() => {
        setSubmissionStatus("idle");
        setMessage("");
        reset();
      }, 1000);

      return () => {
        clearTimeout(timer);
        setIsDelayAfterSuccess(false); // End the delay state
      };
    }
  }, [isSubmitSuccessful, submissionStatus, reset]);

  const onSubmit: SubmitHandler<TSendEmailSchema> = async (data) => {
    try {
      // Set submitting state first
      setSubmissionStatus("submitting");
      setMessage("Sending your message...");

      const formData = new FormData();
      formData.append(
        "access_key",
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
      );

      // Add all form data
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Update counts first
        const newCount = countSubmissions - 1;
        setCountSubmissions(newCount);
        updateLocalStorageData(SUBMISSION_LIMIT - newCount, new Date());

        // Show success state
        setSubmissionStatus("success");
        setMessage("Message sent successfully!");

        // Reset form after delay
        setTimeout(() => {
          reset();
          setSubmissionStatus("idle");
          setMessage("");
        }, 2000);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
      setMessage("Failed to send message. Please try again.");
    }
  };

  // Determine if the form should be displayed or only the limit exceeded message
  const showForm = submissionStatus !== "limit_exceeded";

  return (
    <section id="contact" className="mx-auto max-w-4xl px-4">
      <div className="md:max-w-xl">
        <div className="relative mb-10">
          <Fade direction="left" cascade triggerOnce duration={300}>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <MessageCircleCode size={45} className="text-primary shrink-0" />
              <h1 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-6xl font-bold tracking-wider text-transparent">
                Contact Me
              </h1>
            </div>

            <p className="mt-4">
              Drop me a message and I&apos;ll get back to you!
            </p>
          </Fade>
        </div>
        {/* Submission Status Message */}
        {(submissionStatus === "success" || submissionStatus === "error") && (
          <Fade direction="up" duration={300} triggerOnce>
            <div
              className={cn(
                "mb-6 rounded-md border p-3 font-medium",
                submissionStatus === "success"
                  ? "border-green-200 bg-green-100 text-green-700"
                  : "border-error/20 text-error bg-red-100",
              )}
            >
              <div className="flex gap-2">
                {submissionStatus === "success" ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <AlertCircle className="text-error" />
                )}

                <h2
                  className={cn(
                    "text-sm font-semibold uppercase",
                    submissionStatus === "success"
                      ? "text-green-700"
                      : "text-error",
                  )}
                >
                  {message}
                </h2>
              </div>
            </div>
          </Fade>
        )}

        {/* Submitting Status Message */}
        {submissionStatus === "submitting" && (
          <Slide direction="left" duration={300} triggerOnce>
            <div className="text-primary bg-secondary/15 border-secondary/20 mb-6 flex items-center gap-2 rounded-md border p-3 font-medium">
              <Loader2 className="text-secondary animate-spin" />
              <h2 className="text-sm font-semibold">Sending your message...</h2>
            </div>
          </Slide>
        )}

        {/* Daily limit exceeded message shown only if limit is reached */}
        {submissionStatus === "limit_exceeded" && (
          <Fade direction="up" duration={300} triggerOnce>
            <div className="border-error/20 text-error bg-error/10 space-y-3 rounded-lg border p-2 font-bold shadow-md">
              <div className="text-error flex gap-2 rounded-sm font-medium">
                <AlertCircle className="size-6" />
                <h2 className="font-bold">Message not sent</h2>
              </div>
              <p className="text-sm font-semibold">{message}</p>
            </div>
          </Fade>
        )}

        {/* FORM (Conditionally rendered) */}
        {showForm && (
          <Fade triggerOnce duration={300} delay={500}>
            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-4 md:gap-6"
            >
              {/* Name Input Field */}
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-secondary-text flex items-center gap-2 font-bold uppercase"
                >
                  <User size={18} className="text-secondary" />
                  Name
                </label>
                <div className="relative">
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="Your name"
                    name="name"
                    autoComplete="name"
                    className={cn(
                      "border-primary/25 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                      errors.name && "border-error/50 bg-error/5",
                      !errors.name && "focus:border-primary/20",
                      isSubmitting && "pointer-events-none",
                    )}
                  />
                </div>
                {errors.name && (
                  <span
                    role="alert"
                    className="text-error text-xs-sm flex items-center gap-1 font-medium"
                  >
                    <AlertCircle size={14} />
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email Input Field */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-secondary-text flex items-center gap-2 font-bold uppercase"
                >
                  <Mail size={18} className="text-secondary" />
                  Email
                </label>
                <div className="relative">
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby="email-error"
                    name="email"
                    placeholder="your.email@example.com"
                    autoComplete="email"
                    className={cn(
                      "border-primary/25 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                      errors.email && "border-error/50 bg-error/5",
                      !errors.email && "focus:border-primary/20",
                      isSubmitting && "pointer-events-none",
                    )}
                  />
                </div>
                {errors.email && (
                  <Fade direction="up" duration={400} triggerOnce>
                    <span
                      role="alert"
                      id="email-error"
                      className="text-error text-xs-sm flex items-center gap-1 font-medium"
                    >
                      <AlertCircle size={14} />
                      {errors.email.message}
                    </span>
                  </Fade>
                )}
              </div>

              {/* Mobile Input (optional) */}
              <div className="space-y-1">
                <label
                  htmlFor="mobile"
                  className="text-secondary-text flex items-center gap-2 font-bold uppercase"
                >
                  <Phone size={18} className="text-secondary" />
                  Phone (optional)
                </label>
                <div className="relative">
                  <input
                    {...register("mobile")}
                    id="mobile"
                    type="tel"
                    name="mobile"
                    aria-invalid={errors.mobile ? "true" : "false"}
                    aria-describedby="mobile-error"
                    autoComplete="tel"
                    title="Format: 700-000-000"
                    placeholder="+254 700 000 000"
                    className={cn(
                      "border-primary/25 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                      errors.mobile && "border-error/50 bg-error/5",
                      !errors.mobile && "focus:border-primary/20",
                      isSubmitting && "pointer-events-none",
                    )}
                  />
                </div>
                {errors.mobile && (
                  <Fade direction="up" duration={400} triggerOnce>
                    <span
                      role="alert"
                      id="mobile-error"
                      className="text-error text-xs-sm flex items-center gap-1 font-medium"
                    >
                      <AlertCircle size={14} />
                      {errors.mobile.message}
                    </span>
                  </Fade>
                )}
              </div>

              {/* Message textarea field */}
              <div className="space-y-1">
                <label
                  htmlFor="textarea"
                  className="text-secondary-text flex items-center gap-2 font-bold uppercase"
                >
                  <MessageSquare
                    size={18}
                    className="text-secondary shadow-lg"
                  />
                  Message
                </label>
                <div className="relative">
                  <textarea
                    {...register("textarea")}
                    id="textarea"
                    cols={15}
                    rows={5}
                    name="textarea"
                    aria-invalid={errors.textarea ? "true" : "false"}
                    aria-describedby="textarea-error"
                    placeholder="What would you like to discuss?"
                    className={cn(
                      "border-primary/25 w-full resize-none rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                      errors.textarea && "border-error/50 bg-error/5",
                      !errors.textarea && "focus:border-primary/20",
                      isSubmitting && "pointer-events-none",
                    )}
                  />
                </div>
                {errors.textarea && (
                  <Fade direction="up" duration={400} triggerOnce>
                    <span
                      role="alert"
                      id="textarea-error"
                      className="text-error text-xs-sm -mt-1 flex items-center gap-1 text-sm font-medium"
                    >
                      <AlertCircle size={14} />
                      {errors.textarea.message}
                    </span>
                  </Fade>
                )}
              </div>

              {/* button */}
              <button
                type="submit"
                disabled={isSubmitting || isDelayAfterSuccess}
                className={cn(
                  "rounded-full p-4 uppercase transition-all duration-200 ease-in-out md:ml-auto md:p-3.5",

                  {
                    // Default state
                    "bg-primary text-background hover:-translate-y-1 hover:shadow-md":
                      !isSubmitting && !isDelayAfterSuccess,

                    // Success delay state
                    "bg-primary/40 text-secondary-text cursor-not-allowed hover:translate-none":
                      isDelayAfterSuccess || Object.keys(errors).length > 0,

                    // Submitting state
                    "bg-primary/70 text-secondary-text cursor-wait":
                      isSubmitting,
                  },
                )}
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">Submitting Message</span>
                      <span className="">
                        <svg
                          className="h-5 w-5 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit message
                      <Send
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  )}
                </span>
              </button>

              {/* Remaining Submission Count */}
              <p
                className={cn(
                  "text-secondary-text mt-2 text-center",
                  countSubmissions < 2 ? "text-error" : "",
                )}
              >
                {countSubmissions <= 0
                  ? "Daily submission limit reached"
                  : `${countSubmissions} of ${SUBMISSION_LIMIT} submissions available today`}
              </p>
            </form>
          </Fade>
        )}
      </div>
    </section>
  );
}

export default Contact;
