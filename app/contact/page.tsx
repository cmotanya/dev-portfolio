"use client";

import { sendEmailSchema, TSendEmailSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TSendEmailSchema>({
    resolver: async (data) => {
      try {
        // manual validation
        const validatedData = sendEmailSchema.parse(data);

        return {
          values: validatedData,
          errors: {},
        };
      } catch (error) {
        // handle validation errors
        if (error instanceof z.ZodError) {
          const formattedErrors: Record<
            string,
            { type: string; message: string }
          > = {};

          error.errors.forEach((err) => {
            if (err.path) {
              formattedErrors[err.path[0]] = {
                type: "manual",
                message: err.message,
              };
            }
          });

          return {
            values: {},
            errors: formattedErrors,
          };
        }
      }

      return {
        values: {},
        errors: {
          root: {
            type: "manual",
            message: "Validation failed",
          },
        },
      };
    },
  });

  const submissionCount = 3;

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [dailySubmissionExceeded, setDailySubmissionExceeded] = useState(false);
  const [countSubmissions, setCountSubmissions] = useState(submissionCount);

  // load submission count from localStorage - only on initial mount
  useEffect(() => {
    const checkSubmissionStatus = () => {
      const submissionData = localStorage.getItem("contactSubmission");

      if (submissionData) {
        try {
          const { count, date } = JSON.parse(submissionData);
          const lastSubmissionDate = new Date(date).toDateString();
          const today = new Date().toDateString();

          if (lastSubmissionDate !== today) {
            // Reset for a new day - user gets full count
            localStorage.removeItem("contactSubmission");
            setCountSubmissions(submissionCount);
            setDailySubmissionExceeded(false);
          } else {
            // Use stored count from previous submissions
            const submissionsLeft = submissionCount - count;
            setCountSubmissions(submissionsLeft);
            setDailySubmissionExceeded(submissionsLeft < 0);
          }
        } catch (error) {
          // If data is corrupt, reset it
          console.error("Error parsing submission data:", error);
          localStorage.removeItem("contactSubmission");
          setCountSubmissions(submissionCount);
          setDailySubmissionExceeded(false);
        }
      } else {
        // No previous submissions today
        setCountSubmissions(submissionCount);
        setDailySubmissionExceeded(false);
      }
    };

    checkSubmissionStatus();
  }, []); // Empty dependency array to run only once on mount

  // function to check submission limits and update counts only on form submission
  const checkAndUpdateSubmissionCount = () => {
    const submissionData = localStorage.getItem("contactSubmission");
    const today = new Date().toDateString();

    if (submissionData) {
      try {
        const { count, date } = JSON.parse(submissionData);
        const lastSubmissionDate = new Date(date).toDateString();

        // If it's a new day
        if (lastSubmissionDate !== today) {
          localStorage.setItem(
            "contactSubmission",
            JSON.stringify({ count: 1, date: new Date().toString() }),
          );
          setCountSubmissions(submissionCount - 1);
          return true;
        }

        // If within daily limit
        if (count < submissionCount) {
          const newCount = count + 1;
          localStorage.setItem(
            "contactSubmission",
            JSON.stringify({
              count: newCount,
              date: new Date().toString(),
            }),
          );
          setCountSubmissions(submissionCount - newCount);
          setDailySubmissionExceeded(newCount >= submissionCount);
          return true;
        }

        // Limit reached
        setDailySubmissionExceeded(true);
        setCountSubmissions(0);
        return false;
      } catch (error) {
        // Handle corrupt data
        console.error("Error processing submission count:", error);
        localStorage.setItem(
          "contactSubmission",
          JSON.stringify({ count: 1, date: new Date().toString() }),
        );
        setCountSubmissions(submissionCount - 1);
        return true;
      }
    }

    // First submission of the day
    localStorage.setItem(
      "contactSubmission",
      JSON.stringify({
        count: 1,
        date: new Date().toString(),
      }),
    );
    setCountSubmissions(submissionCount - 1);
    return true;
  };

  const onSubmit: SubmitHandler<TSendEmailSchema> = async (data) => {
    // Check submission limit before processing
    if (!checkAndUpdateSubmissionCount()) {
      setIsSuccess(false);
      setMessage(
        `You've reached the daily limit of ${submissionCount} submissions. Please try again tomorrow.`,
      );
      return;
    }

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
        setIsSuccess(true);
        setMessage(res.message);
        reset();
      } else {
        setIsSuccess(false);
        setMessage("Oops, something went wrong!");
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage("Network error: Please check your internet connection.");
      console.error(err);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md">
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

      {/* success message display */}
      {isSubmitSuccessful && isSuccess && (
        <div className="text-textColor/80 mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm font-medium">
          <div className="mb-3 flex gap-3">
            <CheckCircle className="text-green-600" />
            <p className="font-semibold text-green-700 uppercase">
              Thank you for your message!
            </p>
          </div>
          <p>{message}</p>

          <button
            onClick={() => {
              setIsSuccess(false);
              reset();
            }}
            className="bg-primary mx-auto mt-8 block cursor-pointer rounded-full px-4 py-3 text-white"
          >
            Send another message
          </button>
        </div>
      )}

      {/* error message display on refresh */}
      {!isSuccess && dailySubmissionExceeded && message && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-100 p-4 text-sm font-bold text-red-500 shadow-md">
          <div className="mb-2 flex gap-3">
            <AlertCircle />
            <p className="text-lg">Message not sent.</p>
          </div>
          <p>{message}</p>
        </div>
      )}

      {/* form */}
      {(!isSubmitSuccessful || !isSuccess || dailySubmissionExceeded) && (
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4"
        >
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

          {/* button */}
          <button
            type="submit"
            disabled={isSubmitting || dailySubmissionExceeded}
            className={cn(
              "disabled:bg-primary/50 mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg py-3 text-white transition-all",
              isSubmitting
                ? "bg-primary/50"
                : Object.keys(errors).length > 0
                  ? "bg-primary/50 select-none"
                  : "bg-primary",
              dailySubmissionExceeded && "bg-primary/50 pointer-events-none",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="pointer-events-none animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send message
                <Send size={17} />
              </>
            )}
          </button>

          <p className="text-textColor/50 text-bold mt-2 text-center text-xs">
            {dailySubmissionExceeded
              ? `Daily limit reached. Try again tomorrow.`
              : `${countSubmissions} of ${submissionCount} submissions available today`}
          </p>
        </form>
      )}
    </section>
  );
}

export default Contact;
