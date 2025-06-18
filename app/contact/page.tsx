"use client";

import { getLocalStorageData, updateLocalStorage } from "@/lib/local-storage";
import {
  sendEmailSchema,
  SUBMISSION_LIMIT,
  SubmissionStatus,
  TSendEmailSchema,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { SubmitHandler, useForm } from "react-hook-form";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSendEmailSchema>({
    resolver: zodResolver(sendEmailSchema),
  });

  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [countSubmissions, setCountSubmissions] = useState(SUBMISSION_LIMIT);

  // load submission count from localStorage
  useEffect(() => {
    const { count, date } = getLocalStorageData();
    const today = new Date().toISOString().split("T")[0];

    // console.log("count", count, "date", date, "today", today);

    if (date && date.toDateString() === today) {
      // Same day - use existing count
      const submissionsLeft = SUBMISSION_LIMIT - count;
      setCountSubmissions(Math.max(submissionsLeft, 0));

      if (count >= SUBMISSION_LIMIT) {
        setSubmissionStatus("limit_exceeded");
      }
    } else {
      // New day - reset count
      setCountSubmissions(SUBMISSION_LIMIT);
      setSubmissionStatus("idle");

      // Reset localStorage for new day
      updateLocalStorage(0);
    }
  }, []);

  const onSubmit: SubmitHandler<TSendEmailSchema> = async (data) => {
    try {
      setSubmissionStatus("submitting");
      setMessage("Sending your message...");

      const formData = new FormData();
      formData.append(
        "access_key",
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
      );

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Update submission count
        const { count: currentCount } = getLocalStorageData();
        const newCount = currentCount + 1;
        const newSubmissionsLeft = SUBMISSION_LIMIT - newCount;

        // update localStorage
        updateLocalStorage(newCount);

        // update state
        setCountSubmissions(Math.max(newSubmissionsLeft, 0));
        setSubmissionStatus("success");
        setMessage("Message sent successfully!");

        // check if limit reached after this submission
        if (newCount >= SUBMISSION_LIMIT) {
          setTimeout(() => {
            setSubmissionStatus("limit_exceeded");
            setMessage(
              "You have reached the maximum number of submissions for today. Please try again tomorrow.",
            );
          }, 2000);
        } else {
          setTimeout(() => {
            setSubmissionStatus("idle");
          }, 2000);
        }

        // Reset form
        setTimeout(() => {
          reset();
        }, 2000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmissionStatus("error");
      setMessage("Failed to send message. Please try again later.");

      // Reset to idle state after error
      setTimeout(() => {
        setSubmissionStatus("idle");
        setMessage(`You have ${countSubmissions} submissions left.`);
      }, 3000);
    }
  };

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

            <p className="text-secondary-text mt-4">
              Drop me a message and I&apos;ll get back to you!
            </p>
          </Fade>
        </div>

        <Fade direction="up" duration={400} triggerOnce>
          {/* submission status success  */}
          {submissionStatus === "success" && (
            <div className="bg-success/20 mb-4 flex items-center justify-center gap-2 rounded-lg p-4 shadow-lg">
              <CheckCircle className="text-success" />
              <span className="text-success font-semibold">{message}</span>
            </div>
          )}

          {/* submission status error */}
          {submissionStatus === "error" && (
            <div className="bg-error/10 mb-4 flex items-center justify-center gap-2 rounded-lg p-4 shadow-lg">
              <AlertCircle className="text-error" />
              <span className="text-error font-semibold">{message}</span>
            </div>
          )}

          {/* submission status submitting */}
          {submissionStatus === "submitting" && (
            <div className="bg-secondary/50 mb-4 flex items-center justify-center gap-2 rounded-lg p-4 shadow-lg">
              <Loader2 className="text-primary animate-spin" />
              <span className="text-primary font-semibold">{message}</span>
            </div>
          )}

          {/* submission limit exceeded */}
          {submissionStatus === "limit_exceeded" && (
            <div className="bg-error/10 mb-4 flex items-center justify-center gap-2 rounded-lg p-4 shadow-lg">
              <AlertCircle className="text-error" />
              <span className="text-error font-semibold">{message}</span>
            </div>
          )}
        </Fade>

        <Fade triggerOnce duration={300} delay={500}>
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4 md:gap-6"
          >
            {/* name input */}
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
                  disabled={countSubmissions <= 0}
                  className={cn(
                    "border-secondary/70 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                    errors.name && "border-error/50 bg-error/5",
                    !errors.name && "focus:border-secondary/50",
                    (isSubmitting || countSubmissions <= 0) &&
                      "pointer-events-none opacity-50",
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

            {/* email input */}
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
                  disabled={countSubmissions <= 0}
                  className={cn(
                    "border-secondary/70 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                    errors.email && "border-error/50 bg-error/5",
                    !errors.email && "focus:border-secondary/50",
                    (isSubmitting || countSubmissions <= 0) &&
                      "pointer-events-none opacity-50",
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

            {/* mobile input (optional) */}
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
                  disabled={countSubmissions <= 0}
                  className={cn(
                    "border-secondary/70 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                    errors.mobile && "border-error/50 bg-error/5",
                    !errors.mobile && "focus:border-secondary/50",
                    (isSubmitting || countSubmissions <= 0) &&
                      "pointer-events-none opacity-50",
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

            {/* message textarea */}
            <div className="space-y-1">
              <label
                htmlFor="textarea"
                className="text-secondary-text flex items-center gap-2 font-bold uppercase"
              >
                <MessageSquare size={18} className="text-secondary shadow-lg" />
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
                  disabled={countSubmissions <= 0}
                  className={cn(
                    "border-secondary/70 w-full resize-none rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                    errors.textarea && "border-error/50 bg-error/5",
                    !errors.textarea && "focus:border-secondary/50",
                    (isSubmitting || countSubmissions <= 0) &&
                      "pointer-events-none opacity-50",
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
              disabled={isSubmitting || countSubmissions <= 0}
              className={cn(
                "cursor-pointer rounded-full p-4 uppercase transition-all duration-200 ease-in-out md:ml-auto md:p-3.5",

                {
                  // Default state
                  "bg-primary text-background hover:-translate-y-1 hover:shadow-md":
                    !isSubmitting &&
                    countSubmissions > 0 &&
                    Object.keys(errors).length === 0,

                  // Error state or no submissions left
                  "bg-primary/40 text-secondary-text cursor-not-allowed hover:translate-none":
                    Object.keys(errors).length > 0 || countSubmissions <= 0,

                  // Submitting state
                  "bg-primary/40 text-secondary-text cursor-wait": isSubmitting,
                },
              )}
            >
              <span className="flex items-center justify-center">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="uppercase">Submitting Message</span>
                    <span className="">
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
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
                  </span>
                ) : countSubmissions <= 0 ? (
                  <span>Limit Reached</span>
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
          </form>
        </Fade>
      </div>
    </section>
  );
};
export default ContactPage;
