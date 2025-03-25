"use client";

import { sendEmailSchema, TSendEmailSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
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

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setIsMessage] = useState("");
  const [dailySubmissionExceeded, setIsDailySubmissionExceeded] =
    useState(false);

  // function to check submission limits
  const checkSubmissionLimit = () => {
    // get current submissions from localStorage
    const submissionData = localStorage.getItem("contactSubmission");

    if (submissionData) {
      const { count, date } = JSON.parse(submissionData);
      const lastSubmissionData = new Date(date).toDateString();
      const today = new Date().toDateString();

      // if it is a new day, reset the counter
      if (lastSubmissionData !== today) {
        localStorage.setItem(
          "contactSubmission",
          JSON.stringify({ count: 1, date: new Date().toString() }),
        );
        return true;
      }

      // if under limit, increment counter and allow
      if (count < 2) {
        localStorage.setItem(
          "contactSubmission",
          JSON.stringify({
            count: count + 1,
            date: new Date().toString(),
          }),
        );
        return true;
      }

      // if over limit, return false
      setIsDailySubmissionExceeded(true);
      return false;
    }

    // if no data in localStorage, set count to 1 and date to today's date
    localStorage.setItem(
      "contactSubmission",
      JSON.stringify({
        count: 1,
        date: new Date().toString(),
      }),
    );
    return true;
  };

  const onSubmit: SubmitHandler<TSendEmailSchema> = async (data) => {
    if (!checkSubmissionLimit()) {
      setIsSuccess(false);
      setIsMessage(
        "You've reached the daily limit of 2 submissions. Please try again tomorrow.",
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
        setIsMessage(res.message);
        reset();
      } else {
        setIsSuccess(false);
        setIsMessage("Oops, something went wrong!");
      }
    } catch (err) {
      setIsSuccess(false);
      setIsMessage("Network error: Please check your internet connection.");
      console.error(err);
    }
  };

  return (
    <section className="mx-auto w-full max-w-lg px-6">
      <div className="relative mb-16">
        <span className="text-textColor/10 absolute -top-16 -right-4 -z-10 text-9xl font-extrabold">
          05
        </span>
        <h1 className="text-6xl font-bold tracking-tight">
          Contact{" "}
          <span className="text-primary relative">
            Me
            <span className="bg-primary absolute -right-4 bottom-0 h-1 w-24" />
          </span>
        </h1>
        <p className="text-textColor/70 mt-4">
          Drop me a message and I'll get back to you as soon as possible.
        </p>
      </div>

      {/* success message display */}
      {isSubmitSuccessful && isSuccess && (
        <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6 text-sm font-medium text-green-800 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <CheckCircle className="text-green-500" size={24} />
            <p className="text-lg font-semibold">Thank you for your message!</p>
          </div>
          <p className="text-green-700">{message}</p>

          <button
            onClick={() => {
              setIsSuccess(false);
              reset();
            }}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-white transition-all hover:bg-green-700"
          >
            Send another message
          </button>
        </div>
      )}

      {/* error message display on refresh */}
      {!isSuccess && !isSubmitting && message && (
        <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-6 text-sm shadow-sm">
          <div className="mb-2 flex items-center gap-3">
            <AlertCircle className="text-red-500" size={24} />
            <p className="text-lg font-semibold text-red-700">
              Message not sent
            </p>
          </div>
          <p className="text-red-600">{message}</p>
        </div>
      )}

      {/* form */}
      {(!isSubmitSuccessful || !isSuccess || dailySubmissionExceeded) && (
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-5 rounded-xl border border-gray-100 bg-white/50 p-8 shadow-sm backdrop-blur-sm"
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
                className="flex items-center gap-1 text-sm font-medium text-red-500"
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
                className="flex items-center gap-1 text-sm font-medium text-red-500"
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
                placeholder="+1 (123) 456-7890"
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
                className="flex items-center gap-1 text-sm font-medium text-red-500"
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
                className="flex items-center gap-1 text-sm font-medium text-red-500"
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
              "mt-4 flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all",
              isSubmitting ||
                dailySubmissionExceeded ||
                Object.keys(errors).length > 0
                ? "bg-primary/60 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={18} />
              </>
            )}
          </button>

          <p className="mt-2 text-center text-xs text-gray-500">
            Limited to 2 submissions per day
          </p>
        </form>
      )}
    </section>
  );
}

export default Contact;
