"use client";

import {
  sendEmailSchema,
  SUBMISSION_LIMIT,
  SUBMISSION_STORAGE_KEY,
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

type SubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "limit_exceeded";

//Helper function to get data from localStorage

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

  useEffect(() => {
    if (Object.keys.length > 0) {
      setMessage("Please fix the errors before submitting.");
    }
  }, [errors]);

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
                <span className="text-primary">Contact </span>
                <span className="relative">
                  Me
                  <span className="bg-primary absolute right-0 bottom-0 h-1 w-full" />
                </span>
              </h1>
            </div>

            <p className="text-textColor/70 mt-4">
              Drop me a message and I&apos;ll get back to you!
            </p>
          </Fade>
        </div>
        {/* Submission Status Message */}
        {(submissionStatus === "success" || submissionStatus === "error") && (
          <Slide direction="left" duration={300} triggerOnce>
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
          </Slide>
        )}

        {/* Submitting Status Message */}
        {submissionStatus === "submitting" && (
          <Slide direction="left" duration={300} triggerOnce>
            <div className="text-primary bg-secondary/15 border-secondary/20 mb-6 flex items-center gap-2 rounded-md border p-3 font-medium">
              <Loader2 className="text-primary animate-spin" />
              <h2 className="text-sm font-semibold">Sending your message...</h2>
            </div>
          </Slide>
        )}

        {/* Daily limit exceeded message shown only if limit is reached */}
        {submissionStatus === "limit_exceeded" && (
          <Slide direction="right" duration={300} triggerOnce>
            <div className="space-y-3 rounded-lg border border-red-300 bg-red-100 p-2 font-bold text-red-500 shadow-md">
              <div className="flex gap-2 rounded-sm font-medium text-red-600">
                <AlertCircle className="size-6" />
                <h2 className="font-bold">Message not sent</h2>
              </div>
              <p className="text-sm font-semibold">{message}</p>
            </div>
          </Slide>
        )}

        {/* FORM (Conditionally rendered) */}
        {showForm && (
          <Fade triggerOnce duration={300} delay={500}>
            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bg-secondary/15 flex flex-col gap-4 rounded-lg p-4 shadow-lg md:gap-6"
            >
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 font-medium"
                >
                  <User size={18} className="text-primary" />
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
                      "text-textColor/60 autofill:text-textColor/70 w-full rounded-lg border px-4 py-3 font-medium transition-all focus:outline-none",
                      errors.name
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring focus:ring-red-200"
                        : "focus:border-primary focus:ring-primary border-gray-300 focus:ring-1",
                      submissionStatus === "submitting"
                        ? "pointer-events-none"
                        : "",
                    )}
                  />
                </div>
                {errors.name && (
                  <Slide direction="left" duration={400} triggerOnce>
                    <span
                      id="name-error"
                      role="alert"
                      className="-mt-1 flex items-center gap-1 text-sm font-medium text-red-500"
                    >
                      <AlertCircle size={14} />
                      {errors.name.message}
                    </span>
                  </Slide>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 font-medium"
                >
                  <Mail size={18} className="text-primary" />
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
                      "text-textColor/60 autofill:text-textColor/70 w-full rounded-lg border px-4 py-3 font-medium transition-all focus:outline-none",
                      errors.name
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring focus:ring-red-200"
                        : "focus:border-primary focus:ring-primary border-gray-300 focus:ring-1",
                      submissionStatus === "submitting"
                        ? "pointer-events-none"
                        : "",
                    )}
                  />
                </div>
                {errors.email && (
                  <Slide direction="left" duration={400} triggerOnce>
                    <span
                      role="alert"
                      id="email-error"
                      className="-mt-1 flex items-center gap-1 text-sm font-medium text-red-500"
                    >
                      <AlertCircle size={14} />
                      {errors.email.message}
                    </span>
                  </Slide>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mobile"
                  className="flex items-center gap-2 font-medium"
                >
                  <Phone size={18} className="text-primary" />
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
                      "text-textColor/60 autofill:text-textColor/70 w-full rounded-lg border px-4 py-3 font-medium transition-all focus:outline-none",
                      errors.name
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring focus:ring-red-200"
                        : "focus:border-primary focus:ring-primary border-gray-300 focus:ring-1",
                      submissionStatus === "submitting"
                        ? "pointer-events-none"
                        : "",
                    )}
                  />
                </div>
                {errors.mobile && (
                  <Slide direction="left" duration={400} triggerOnce>
                    <span
                      role="alert"
                      id="mobile-error"
                      className="-mt-1 flex items-center gap-1 text-sm font-medium text-red-500"
                    >
                      <AlertCircle size={14} />
                      {errors.mobile.message}
                    </span>
                  </Slide>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="textarea"
                  className="flex items-center gap-2 font-medium"
                >
                  <MessageSquare size={18} className="text-primary" />
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
                      "text-textColor/60 autofill:text-textColor/70 w-full resize-none rounded-lg border px-4 py-3 font-medium transition-all focus:outline-none",
                      errors.name
                        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring focus:ring-red-200"
                        : "focus:border-primary focus:ring-primary border-gray-300 focus:ring-1",
                      submissionStatus === "submitting"
                        ? "pointer-events-none"
                        : "",
                    )}
                  />
                </div>
                {errors.textarea && (
                  <Slide direction="left" duration={400} triggerOnce>
                    <span
                      role="alert"
                      id="textarea-error"
                      className="-mt-3 flex items-center gap-1 text-sm font-medium text-red-500"
                    >
                      <AlertCircle size={14} />
                      {errors.textarea.message}
                    </span>
                  </Slide>
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
                  "disabled:bg-primary/50 mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full p-3.5 font-semibold text-white transition-all md:ml-auto md:w-fit",
                  isSubmitting
                    ? "bg-primary/50"
                    : Object.keys(errors).length > 0 || isDelayAfterSuccess
                      ? "bg-primary/50 pointer-events-none select-none"
                      : "bg-primary",
                )}
              >
                {submissionStatus === "submitting" ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send message
                    <Send size={17} />
                  </>
                )}
              </button>

              {/* Remaining Submission Count */}
              <p
                className={cn(
                  "text-bold text-primary mt-2 text-center text-xs font-semibold",
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
