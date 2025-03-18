"use client";

import { sendEmailSchema, TSendEmailSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
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
    <section className="mx-auto w-full max-w-md">
      <div className="relative mb-12">
        <span className="text-textColor/20 absolute -top-14 right-0 -z-10 text-9xl font-extrabold">
          04
        </span>
        <h1 className="text-6xl font-bold">
          Contact <span className="text-primary">Me</span>
        </h1>
        <span className="bg-primary absolute right-3 bottom-0 h-1 w-24" />
      </div>

      {/* success message display */}
      {isSubmitSuccessful && isSuccess && (
        <div className="bg-primary/10 text-textColor/70 mb-4 rounded-md p-3 text-sm font-medium">
          <p>Thank you for your message!</p>
          <p>{message}</p>

          <button
            onClick={() => {
              setIsSuccess(true);
              reset();
            }}
            className="bg-primary mx-auto mt-8 block rounded-full px-4 py-3 text-white"
          >
            Send another message
          </button>
        </div>
      )}

      {/* error message display on refresh */}
      {!isSuccess && !isSubmitting && message && (
        <div className="mb-5 rounded-md bg-red-500/20 p-2 text-sm font-bold text-red-500">
          <p className="">Message not sent.</p>
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
          <input
            {...register("name")}
            type="text"
            placeholder="Enter name..."
            name="name"
            autoComplete="name"
            className="ring-primary/40 focus-within:ring-primary/70 w-full rounded-full py-3 ps-4 ring outline-none"
          />
          {errors.name && (
            <span
              role="alert"
              className="-mt-3 text-sm font-medium text-red-500"
            >
              {errors.name.message}
            </span>
          )}

          <input
            {...register("email")}
            type="email"
            name="email"
            placeholder="Enter email..."
            autoComplete="email"
            className="ring-primary/40 focus-within:ring-primary rounded-full py-3 ps-4 ring outline-none"
          />
          {errors.email && (
            <span
              role="alert"
              className="-mt-3 text-sm font-medium text-red-500"
            >
              {errors.email.message}
            </span>
          )}

          <input
            {...register("mobile")}
            type="tel"
            name="mobile"
            placeholder="Enter mobile number..."
            className="ring-primary/40 focus-within:ring-primary/70 rounded-full py-3 ps-4 ring outline-none"
          />
          {errors.mobile && (
            <span
              role="alert"
              className="-mt-3 text-sm font-medium text-red-500"
            >
              {errors.mobile.message}
            </span>
          )}

          <textarea
            {...register("textarea")}
            cols={15}
            rows={4}
            name="textarea"
            placeholder="Enter message..."
            className="ring-primary/40 focus-within:ring-primary/70 resize-none rounded-sm py-3 ps-4 ring outline-none"
          />
          {errors.textarea && (
            <span
              role="alert"
              className="-mt-3 text-sm font-medium text-red-500"
            >
              {errors.textarea.message}
            </span>
          )}

          {/* button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "disabled:bg-primary/50 flex items-center justify-center gap-2 rounded-full py-3 text-white transition-all",
              isSubmitting
                ? "bg-primary/50"
                : Object.keys(errors).length > 0
                  ? "bg-primary/50 select-none"
                  : "bg-primary",
              dailySubmissionExceeded && "bg-primary/50 cursor-not-allowed",
            )}
          >
            {isSubmitting ? "Sending..." : "Send"}
            <Send
              className={cn("", isSubmitting ? "hidden" : "block")}
              size={17}
            />
          </button>
        </form>
      )}
    </section>
  );
}

export default Contact;
