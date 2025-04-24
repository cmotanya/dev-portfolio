"use client";

import { sendEmailSchema, TSendEmailSchema } from "@/lib/types"; // Assuming these exist
import { cn } from "@/lib/utils"; // Assuming this exists (e.g., clsx)
import { zodResolver } from "@hookform/resolvers/zod"; // Import Zod resolver
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { z } from "zod"; // Not needed explicitly here if using resolver
import { poppins } from "../data/font"; // Assuming this exists

// Constants for better maintainability
const SUBMISSION_LIMIT = 3;
const SUBMISSION_STORAGE_KEY = "contactSubmission";

// Helper function to get data from local storage
const getLocalStorageSubmissionData = () => {
  const submissionData = localStorage.getItem(SUBMISSION_STORAGE_KEY);
  if (!submissionData) {
    return { count: 0, date: null };
  }
  try {
    const { count, date } = JSON.parse(submissionData);
    // Validate retrieved data structure and types
    if (typeof count === "number" && typeof date === "string") {
      return { count, date: new Date(date) };
    }
    // Data is corrupt, remove it
    console.error("Corrupt submission data in localStorage.");
    localStorage.removeItem(SUBMISSION_STORAGE_KEY);
    return { count: 0, date: null };
  } catch (error) {
    // Handle parsing errors
    console.error("Error parsing submission data from localStorage:", error);
    localStorage.removeItem(SUBMISSION_STORAGE_KEY); // Remove corrupt data
    return { count: 0, date: null };
  }
};

// Helper function to update data in local storage
const updateLocalStorageSubmissionCount = (newCount: number) => {
  const today = new Date();
  localStorage.setItem(
    SUBMISSION_STORAGE_KEY,
    JSON.stringify({
      count: newCount,
      date: today.toString(), // Store as string for JSON
    }),
  );
};

type SubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "limit_exceeded";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TSendEmailSchema>({
    // Use the Zod resolver for validation
    resolver: zodResolver(sendEmailSchema),
  });

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [remainingSubmissions, setRemainingSubmissions] =
    useState(SUBMISSION_LIMIT);

  // Effect to load initial submission count from localStorage on mount
  useEffect(() => {
    const { count, date } = getLocalStorageSubmissionData();
    const today = new Date();
    const lastSubmissionDate = date ? new Date(date).toDateString() : null;
    const todayDateString = today.toDateString();

    if (lastSubmissionDate === todayDateString) {
      // Same day, check remaining count
      const submissionsLeft = SUBMISSION_LIMIT - count;
      setRemainingSubmissions(Math.max(0, submissionsLeft)); // Ensure it's not negative
      if (count >= SUBMISSION_LIMIT) {
        setSubmissionStatus("limit_exceeded");
        setSubmissionMessage(
          `You have reached the daily limit of ${SUBMISSION_LIMIT} messages.`,
        );
      } else {
        setSubmissionStatus("idle"); // Set back to idle if within limit
      }
    } else {
      // New day or no previous data, reset count
      setRemainingSubmissions(SUBMISSION_LIMIT);
      setSubmissionStatus("idle"); // Ensure status is idle on a new day
      setSubmissionMessage(""); // Clear previous messages
      // Optional: Clear storage if it's a new day and data exists, though the update function handles this implicitly
      if (date) {
        localStorage.removeItem(SUBMISSION_STORAGE_KEY);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to clear success message after a delay
  useEffect(() => {
    if (isSubmitSuccessful && submissionStatus === "success") {
      const timer = setTimeout(() => {
        setSubmissionStatus("idle");
        setSubmissionMessage("");
        reset(); // Reset form fields only after success message is gone
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isSubmitSuccessful, submissionStatus, reset]); // Depend on successful submission and status

  const onSubmit: SubmitHandler<TSendEmailSchema> = async (data) => {
    setSubmissionStatus("submitting");
    setSubmissionMessage(""); // Clear previous messages

    // Check submission limit before sending
    const { count: currentCount, date: lastSubmissionDate } =
      getLocalStorageSubmissionData();
    const today = new Date();
    const todayDateString = today.toDateString();

    if (
      lastSubmissionDate &&
      lastSubmissionDate.toDateString() === todayDateString &&
      currentCount >= SUBMISSION_LIMIT
    ) {
      setSubmissionStatus("limit_exceeded");
      setSubmissionMessage(
        `You have reached the daily limit of ${SUBMISSION_LIMIT} messages.`,
      );
      setRemainingSubmissions(0);
      return; // Stop submission
    }

    // Update local storage count *before* sending (client-side throttling)
    const newCount =
      lastSubmissionDate &&
      lastSubmissionDate.toDateString() === todayDateString
        ? currentCount + 1
        : 1;
    updateLocalStorageSubmissionCount(newCount);
    setRemainingSubmissions(SUBMISSION_LIMIT - newCount);
    // Update status if this submission hits the limit
    if (newCount >= SUBMISSION_LIMIT) {
      setSubmissionStatus("limit_exceeded"); // Temporarily set, will be overwritten by fetch result or confirmed
    }

    const formData = new FormData();
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
    );

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    try {
      // Optional: Add a small artificial delay to show loading state
      // await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        setSubmissionStatus("success");
        setSubmissionMessage(res.message || "Message sent successfully!");
        // reset is handled by the useEffect on isSubmitSuccessful
      } else {
        console.error("Submission Error:", res);
        // Revert local storage count if API submission failed?
        // This adds complexity. For a simple client-side limit, we can leave it as is,
        // or implement a more complex state rollback/retry.
        // Let's keep it simple: client limit applies even if API fails after the check.
        setSubmissionStatus("error");
        setSubmissionMessage(res.message || "Oops, something went wrong!");
      }
    } catch (err) {
      console.error("Network or Fetch Error:", err);
      setSubmissionStatus("error");
      setSubmissionMessage(
        "Network error: Please check your internet connection.",
      );
      // Revert local storage count on network error? Same complexity issue.
      // Stick to simple client-side limit for now.
    }
  };

  // Determine if the form should be displayed or only the limit exceeded message
  const showForm = submissionStatus !== "limit_exceeded";

  return (
    <section className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="relative mb-16">
        <span className="text-textColor/20 absolute -top-14 right-0 -z-10 text-9xl font-extrabold">
          05
        </span>
        <h1 className="text-6xl font-bold tracking-tight">
          Contact{" "}
          <span className="text-primary relative">
            Me
            <span className="bg-primary absolute right-0 bottom-0 h-1 w-full" />
          </span>
        </h1>
        <p className="text-textColor/70 mt-4">
          Drop me a message and I&apos;ll get back to you!
        </p>
      </div>

      {/* Submission Status Messages */}
      {(submissionStatus === "success" || submissionStatus === "error") && (
        <div
          className={cn(
            "mb-6 rounded-md border p-3 font-medium",
            submissionStatus === "success"
              ? "border-green-200 bg-green-50"
              : "border-red-300 bg-red-100",
          )}
        >
          <div className="flex gap-2">
            {submissionStatus === "success" ? (
              <CheckCircle className="size-5 text-green-600" />
            ) : (
              <AlertCircle className="size-5 text-red-600" />
            )}
            <h2
              className={cn(
                "text-sm font-semibold uppercase",
                submissionStatus === "success"
                  ? "text-green-700"
                  : "text-red-700",
              )}
            >
              {submissionMessage}
            </h2>
          </div>
        </div>
      )}

      {/* Daily Limit Exceeded Message (Shown persistently if limit is hit) */}
      {submissionStatus === "limit_exceeded" && (
        <div className="space-y-3 rounded-lg border border-red-300 bg-red-100 p-3 font-bold text-red-500 shadow-md">
          <div className="flex gap-2 rounded-sm font-medium text-red-600">
            <AlertCircle className="size-6" />
            <h2 className="font-bold">Message not sent</h2>
          </div>
          <p className="text-sm font-semibold">{submissionMessage}</p>
          <p className="text-xs font-semibold text-red-400">
            Try again tomorrow.
          </p>
        </div>
      )}

      {/* Form (conditionally rendered) */}
      {showForm && (
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
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
                  "w-full rounded-lg border px-4 py-3 transition-all outline-none",
                  errors.name
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring focus:ring-red-200"
                    : "focus:border-primary focus:ring-primary/20 border-gray-200 focus:ring",
                )}
              />
            </div>
            {errors.name && (
              <span
                role="alert"
                className="-mt-1 flex items-center gap-1 text-sm font-medium text-red-500"
              >
                <AlertCircle size={14} />
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email")}
                id="email"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                autoComplete="email"
                className={cn(
                  "w-full rounded-lg border px-4 py-3 transition-all outline-none",
                  errors.email
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring focus:ring-red-200"
                    : "focus:border-primary focus:ring-primary/20 border-gray-200 focus:ring",
                )}
              />
            </div>
            {errors.email && (
              <span
                role="alert"
                className="-mt-1 flex items-center gap-1 text-sm font-medium text-red-500"
              >
                <AlertCircle size={14} />
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label
              htmlFor="mobile"
              className="text-sm font-medium text-gray-700"
            >
              Phone (optional)
            </label>
            <div className="relative">
              <input
                {...register("mobile")}
                id="mobile"
                type="tel"
                name="mobile"
                placeholder="+254 700 000 000"
                className={cn(
                  "w-full rounded-lg border px-4 py-3 transition-all outline-none",
                  errors.mobile
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring focus:ring-red-200"
                    : "focus:border-primary focus:ring-primary/20 border-gray-200 focus:ring",
                )}
              />
            </div>
            {errors.mobile && (
              <span
                role="alert"
                className="-mt-1 flex items-center gap-1 text-sm font-medium text-red-500"
              >
                <AlertCircle size={14} />
                {errors.mobile.message}
              </span>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label
              htmlFor="textarea"
              className="text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <div className="relative">
              <textarea
                {...register("textarea")}
                id="textarea"
                cols={15}
                rows={5}
                name="textarea"
                placeholder="What would you like to discuss?"
                className={cn(
                  "w-full resize-none rounded-lg border px-4 py-3 transition-all outline-none",
                  errors.textarea
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring focus:ring-red-200"
                    : "focus:border-primary focus:ring-primary/20 border-gray-200 focus:ring",
                )}
              />
            </div>
            {errors.textarea && (
              <span
                role="alert"
                className="-mt-1 flex items-center gap-1 text-sm font-medium text-red-500"
              >
                <AlertCircle size={14} />
                {errors.textarea.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={cn(
              "disabled:bg-primary/50 mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg py-3 text-white transition-all",
              isSubmitting
                ? "bg-primary/50"
                : Object.keys(errors).length > 0
                  ? "bg-primary/50 select-none"
                  : "bg-primary",
            )}
          >
            {submissionStatus === "submitting" ? (
              <>
                <Loader2 className="pointer-events-none size-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send message
                <Send size={17} />
              </>
            )}
          </button>

          {/* Remaining Submissions Count */}
          <p
            className={cn(
              "text-bold text-textColor/50 mt-2 text-center text-xs font-semibold",
              poppins.className,
            )}
          >
            {remainingSubmissions <= 0
              ? "Daily submission limit reached."
              : `${remainingSubmissions} of ${SUBMISSION_LIMIT} submissions available today`}
          </p>
        </form>
      )}
    </section>
  );
}

export default Contact;
