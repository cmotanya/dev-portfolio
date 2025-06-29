"use client";

import {
  sendEmailSchema,
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
import { useState } from "react";
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

  // load submission count from localStorage

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
        // update state
        setSubmissionStatus("success");
        setMessage("Message sent successfully!");

        setTimeout(() => {
          // reset form
          reset();
          setSubmissionStatus("idle");
        }, 2000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmissionStatus("error");
      setMessage("Failed to send message. Please try again later.");

      // reset to idle state after error
      setTimeout(() => {
        setSubmissionStatus("idle");
      }, 2000);
    }
  };

  return (
    <section id="contact" className="max-w-5xl px-4 md:mx-auto">
      <div className="md:max-w-xl">
        <div className="relative mb-10">
          <Fade direction="left" cascade triggerOnce duration={300}>
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <MessageCircleCode
                size={45}
                className="text-secondary shrink-0"
              />
              <h1 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-6xl leading-tight font-bold tracking-tight text-transparent md:text-7xl">
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
                  disabled={isSubmitting}
                  className={cn(
                    "border-secondary/70 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                    errors.name && "border-error/50 bg-error/5",
                    !errors.name && "focus:border-secondary/50",
                    isSubmitting && "pointer-events-none opacity-50",
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
                  disabled={isSubmitting}
                  className={cn(
                    "border-secondary/70 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                    errors.email && "border-error/50 bg-error/5",
                    !errors.email && "focus:border-secondary/50",
                    isSubmitting && "pointer-events-none opacity-50",
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
                  disabled={isSubmitting}
                  className={cn(
                    "border-secondary/70 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                    errors.mobile && "border-error/50 bg-error/5",
                    !errors.mobile && "focus:border-secondary/50",
                    isSubmitting && "pointer-events-none opacity-50",
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
                  disabled={isSubmitting}
                  className={cn(
                    "border-secondary/70 w-full resize-none rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
                    errors.textarea && "border-error/50 bg-error/5",
                    !errors.textarea && "focus:border-secondary/50",
                    isSubmitting && "pointer-events-none opacity-50",
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
              disabled={isSubmitting}
              className={cn(
                "cursor-pointer rounded-full p-5 uppercase transition-all duration-200 ease-in-out md:ml-auto md:p-4",

                {
                  // Default state
                  "bg-primary text-background hover:shadow-md":
                    !isSubmitting && Object.keys(errors).length === 0,

                  // Error state or no submissions left
                  "bg-primary/40 text-secondary-text cursor-not-allowed":
                    Object.keys(errors).length > 0,

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
                ) : (
                  <span className="group flex items-center gap-2">
                    Submit message
                    <Send
                      size={17}
                      className={cn(
                        "transition-all duration-300 ease-out group-hover:translate-x-1.5 group-active:translate-x-1.5",
                        Object.keys(errors).length > 0 &&
                          "group-hover:translate-x-0 group-active:translate-x-0",
                      )}
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
