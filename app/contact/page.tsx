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
  Settings,
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
  const [isUrgentChecked, setIsUrgentChecked] = useState(false);

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
    // Check submission limit FIRST
    const { count: currentCount, date: lastSubmissionDate } =
      getLocalStorageData();
    const today = new Date().toDateString();

    if (
      lastSubmissionDate &&
      lastSubmissionDate.toDateString() === today &&
      currentCount >= SUBMISSION_LIMIT
    ) {
      setSubmissionStatus("limit_exceeded");
      setMessage(
        `You have reached the daily limit of ${SUBMISSION_LIMIT} messages.`,
      );

      setCountSubmissions(0);
      clearErrors(); // Clear errors to reset the form state
      return;
    }

    // Set the submission status to submitting, if limit is not exceeded
    setSubmissionStatus("submitting");
    setMessage("Sending your message...");

    const formData = new FormData();
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
    );

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    // try...await function that checks for response and errors from the server
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        setSubmissionStatus("success");
        setMessage(res.message || "Message sent successfully!");

        // Only on SUCCESS, increment the logic
        const {
          count: currentCountAfterSend,
          date: lastSubmissionDateAfterSend,
        } = getLocalStorageData();
        const today = new Date().toDateString();

        const countBeforeIncrement =
          lastSubmissionDateAfterSend &&
          lastSubmissionDateAfterSend.toDateString() === today
            ? currentCountAfterSend
            : 0;

        const newCount = countBeforeIncrement + 1;
        updateLocalStorageData(newCount, new Date());
        setCountSubmissions(SUBMISSION_LIMIT - newCount);
      } else {
        console.error("Submission Error", res);
        setSubmissionStatus("error");
        setMessage(res.message || "Oops, something went wrong!");
        setCountSubmissions(SUBMISSION_LIMIT);
      }
    } catch (err) {
      console.error("Network or Fetch Error", err);
      setSubmissionStatus("error");
      setMessage(
        "Network error: Please check your internet connection and try again.",
      );
    }
  };

  // Determine if the form should be displayed or only the limit exceeded message
  const showForm = submissionStatus !== "limit_exceeded";

  return (
    <section id="contact" className="mx-auto max-w-4xl">
      <div className="md:max-w-xl">
        <div className="relative mb-10">
          <Fade direction="left" cascade triggerOnce duration={300}>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <MessageCircleCode
                size={45}
                className="text-secondary shrink-0"
              />
              <h1 className="text-[3.65rem] font-bold tracking-tight whitespace-nowrap">
                <span className="text-secondary">Contact </span>
                <span className="relative">
                  Me
                  <span className="bg-secondary absolute right-0 bottom-0 h-1 w-full" />
                </span>
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
                  : "border-red-200 bg-red-100 text-red-700",
              )}
            >
              <div className="flex gap-2">
                {submissionStatus === "success" ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <AlertCircle className="text-red-600" />
                )}

                <h2
                  className={cn(
                    "text-sm font-semibold uppercase",
                    submissionStatus === "success"
                      ? "text-green-700"
                      : "text-red-700",
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
            <div className="space-y-3 rounded-lg border border-red-300 bg-red-100 p-2 font-bold text-red-500 shadow-md">
              <div className="flex gap-2 rounded-sm font-medium text-red-600">
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
              className="flex flex-col gap-4 p-4 md:gap-6"
            >
              {/* Name Input Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center gap-2">
                  <User size={18} className="text-secondary" />
                  Your Name
                </label>
                <div className="relative">
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="Your name"
                    name="name"
                    autoComplete="name"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby="name-error"
                    autoFocus={true}
                    className={cn(
                      "ring-secondary w-full rounded-lg px-3 py-3 ring transition-all",
                      errors.name ? "ring-error" : "focus:ring-secondary",
                      submissionStatus === "submitting"
                        ? "pointer-events-none"
                        : "",
                    )}
                  />
                </div>
                {errors.name && (
                  <Fade direction="up" duration={400} triggerOnce>
                    <span
                      id="name-error"
                      role="alert"
                      className="text-error -mt-1 flex items-center gap-1 text-xs font-medium md:text-xs"
                    >
                      <AlertCircle size={14} />
                      {errors.name.message}
                    </span>
                  </Fade>
                )}
              </div>

              {/* Email Input Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2">
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
                      "ring-secondary w-full rounded-lg px-3 py-3 ring transition-all",
                      errors.email ? "ring-error" : "focus:ring-secondary",
                      submissionStatus === "submitting"
                        ? "pointer-events-none"
                        : "",
                    )}
                  />
                </div>
                {errors.email && (
                  <Fade direction="up" duration={400} triggerOnce>
                    <span
                      role="alert"
                      id="email-error"
                      className="text-error -mt-1 flex items-center gap-1 text-sm font-medium md:text-xs"
                    >
                      <AlertCircle size={14} />
                      {errors.email.message}
                    </span>
                  </Fade>
                )}
              </div>

              {/* Mobile Input (optional) */}
              <div className="space-y-2">
                <label htmlFor="mobile" className="flex items-center gap-2">
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
                      "ring-secondary w-full rounded-lg px-3 py-3 ring transition-all",
                      errors.mobile ? "ring-error" : "focus:ring-secondary",
                      submissionStatus === "submitting"
                        ? "pointer-events-none"
                        : "",
                    )}
                  />
                </div>
                {errors.mobile && (
                  <Fade direction="up" duration={400} triggerOnce>
                    <span
                      role="alert"
                      id="mobile-error"
                      className="text-error -mt-1 flex items-center gap-1 text-xs font-medium"
                    >
                      <AlertCircle size={14} />
                      {errors.mobile.message}
                    </span>
                  </Fade>
                )}
              </div>

              {/* Service Type  */}
              <div className="relative space-y-2">
                <label
                  htmlFor="serviceType"
                  className="flex items-center gap-2"
                >
                  <Settings size={18} className="text-secondary" />
                  Service Needed
                </label>
                <select
                  {...register("serviceType")}
                  name="serviceType"
                  id="serviceType"
                  aria-invalid={errors.serviceType ? "true" : "false"}
                  aria-describedby="service-type-error"
                  className={cn(
                    "bg-primary custom-select text-xs-sm w-full rounded-lg px-5 py-3 ring transition-all",
                    errors.serviceType ? "ring-error" : "ring-secondary",
                    submissionStatus === "submitting"
                      ? "pointer-events-none"
                      : "",
                  )}
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  <option value="security">🔒 Security Consulting</option>
                  <option value="networking">🌐 Networking Solutions</option>
                  <option value="support">🛠️ Ongoing Support</option>
                  <option value="other">Other (please specify)</option>
                </select>

                {/* custom down arrow */}
                <span className="pointer-event-none absolute top-1/2 right-2">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* Urgent checkbox */}
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  name="isUrgent"
                  id="isUrgent"
                  checked={isUrgentChecked}
                  onChange={(e) => setIsUrgentChecked(e.target.checked)}
                  className="border-secondary bg-primary peer checked:bg-secondary custom-select relative size-5 cursor-pointer rounded-md border-2 transition-all duration-200"
                />
                {/* custom checkmark */}
                <span className="pointer-events-none absolute ml-0.5">
                  {isUrgentChecked && (
                    <svg
                      className="text-text h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <label htmlFor="isUrgent">
                  <Fade
                    key={isUrgentChecked ? "urgent" : "not-urgent"}
                    direction="up"
                    triggerOnce={false}
                    duration={400}
                  >
                    {isUrgentChecked ? (
                      <div className="text-warning ml-3 flex items-center gap-1 text-xs">
                        <AlertCircle size={18} className="text-error" />
                        This request will be marked as urgent!
                      </div>
                    ) : (
                      <div className="ml-3 flex items-center gap-1 text-xs">
                        <CheckCircle size={18} className="text-secondary" />
                        Mark as urgent
                      </div>
                    )}
                  </Fade>
                </label>
              </div>

              {/* Message textarea field */}
              <div className="space-y-2">
                <label htmlFor="textarea" className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-secondary" />
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
                      "ring-secondary w-full resize-none rounded-lg px-5 py-3 ring transition-all focus:outline-none",
                      errors.textarea ? "ring-error" : "focus:ring-secondary",
                      submissionStatus === "submitting"
                        ? "pointer-events-none"
                        : "",
                    )}
                  />
                </div>
                {errors.textarea && (
                  <Fade direction="up" duration={400} triggerOnce>
                    <span
                      role="alert"
                      id="textarea-error"
                      className="text-error -mt-2 flex items-center gap-1 text-sm font-medium md:text-xs"
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
                disabled={
                  isSubmitting ||
                  Object.keys(errors).length > 0 ||
                  isDelayAfterSuccess
                }
                className={cn(
                  "disabled:bg-primary/50 disabled:text-text/40 mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full p-3.5 transition-all duration-200 ease-in-out hover:-translate-y-1 disabled:translate-0 md:ml-auto",
                  isSubmitting
                    ? "bg-primary/50"
                    : Object.keys(errors).length > 0 || isDelayAfterSuccess
                      ? "bg-primary/50 cursor-not-allowed select-none"
                      : "bg-button text-button-text",
                )}
              >
                {submissionStatus === "submitting" ? (
                  <>Sending...</>
                ) : (
                  <>
                    Submit message
                    <Send size={17} />
                  </>
                )}
              </button>

              {/* Remaining Submission Count */}
              <p
                className={cn(
                  "mt-2 text-center text-xs",
                  countSubmissions < 2 ? "text-warning" : "",
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
