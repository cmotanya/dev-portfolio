// "use client";

// import { getLocalStorageData } from "@/lib/local-storage";
// import {
//   sendEmailSchema,
//   SUBMISSION_LIMIT,
//   SUBMISSION_STORAGE_KEY,
//   SubmissionStatus,
//   TSendEmailSchema,
// } from "@/lib/types";
// import { cn } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   AlertCircle,
//   CheckCircle,
//   Loader2,
//   Mail,
//   MessageCircleCode,
//   MessageSquare,
//   Phone,
//   Send,
//   User,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Fade } from "react-awesome-reveal";
// import { SubmitHandler, useForm } from "react-hook-form";

// const ContactPage = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<TSendEmailSchema>({
//     resolver: zodResolver(sendEmailSchema),
//   });

//   const [message, setMessage] = useState("");
//   const [submissionStatus, setSubmissionStatus] =
//     useState<SubmissionStatus>("idle");
//   const [countSubmissions, setCountSubmissions] = useState(SUBMISSION_LIMIT);

//   // Helper function to update localStorage
//   const updateLocalStorage = (count: number) => {
//     const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
//     localStorage.setItem(
//       SUBMISSION_STORAGE_KEY,
//       JSON.stringify({ count, date: today }),
//     );
//   };

//   // load submission count from localStorage
//   useEffect(() => {
//     const { count, date } = getLocalStorageData();
//     const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

//     if (date === today) {
//       // Same day - use existing count
//       const submissionsLeft = SUBMISSION_LIMIT - count;
//       setCountSubmissions(Math.max(submissionsLeft, 0));

//       if (count >= SUBMISSION_LIMIT) {
//         setSubmissionStatus("limit_exceeded");
//         setMessage(
//           "You have reached the maximum number of submissions for today. Please try again tomorrow.",
//         );
//       } else {
//         setMessage(`You have ${submissionsLeft} submissions left.`);
//       }
//     } else {
//       // New day - reset count
//       setCountSubmissions(SUBMISSION_LIMIT);
//       setSubmissionStatus("idle");
//       setMessage(`You have ${SUBMISSION_LIMIT} submissions left.`);

//       // Reset localStorage for new day
//       updateLocalStorage(0);
//     }
//   }, []);

//   const onSubmit: SubmitHandler<TSendEmailSchema> = async (data) => {
//     // Check if submissions are exhausted
//     if (countSubmissions <= 0) {
//       setSubmissionStatus("limit_exceeded");
//       setMessage(
//         "You have reached the maximum number of submissions for today. Please try again tomorrow.",
//       );
//       return;
//     }

//     try {
//       setSubmissionStatus("submitting");
//       setMessage("Sending your message...");

//       const formData = new FormData();
//       formData.append(
//         "access_key",
//         process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
//       );

//       Object.entries(data).forEach(([key, value]) => {
//         formData.append(key, value);
//       });

//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (result.success) {
//         // Update submission count
//         const { count: currentCount } = getLocalStorageData();
//         const newCount = currentCount + 1;
//         const newSubmissionsLeft = SUBMISSION_LIMIT - newCount;

//         // Update localStorage
//         updateLocalStorage(newCount);

//         // Update state
//         setCountSubmissions(Math.max(newSubmissionsLeft, 0));
//         setSubmissionStatus("success");
//         setMessage("Message sent successfully!");

//         // Check if limit reached after this submission
//         if (newCount >= SUBMISSION_LIMIT) {
//           setTimeout(() => {
//             setSubmissionStatus("limit_exceeded");
//             setMessage(
//               "You have reached the maximum number of submissions for today. Please try again tomorrow.",
//             );
//           }, 2000);
//         } else {
//           setTimeout(() => {
//             setSubmissionStatus("idle");
//             setMessage(`You have ${newSubmissionsLeft} submissions left.`);
//           }, 2000);
//         }

//         // Reset form
//         setTimeout(() => {
//           reset();
//         }, 2000);
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setSubmissionStatus("error");
//       setMessage("Failed to send message. Please try again later.");

//       // Reset to idle state after error
//       setTimeout(() => {
//         setSubmissionStatus("idle");
//         setMessage(`You have ${countSubmissions} submissions left.`);
//       }, 3000);
//     }
//   };

//   return (
//     <section id="contact" className="mx-auto max-w-4xl px-4">
//       <div className="md:max-w-xl">
//         <div className="relative mb-10">
//           <Fade direction="left" cascade triggerOnce duration={300}>
//             <div className="flex items-center gap-2 whitespace-nowrap">
//               <MessageCircleCode size={45} className="text-primary shrink-0" />
//               <h1 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-6xl font-bold tracking-wider text-transparent">
//                 Contact Me
//               </h1>
//             </div>

//             <p className="text-secondary-text mt-4">
//               Drop me a message and I&apos;ll get back to you!
//             </p>
//           </Fade>

//           <div className="absolute top-15 right-0 mb-5 font-semibold">
//             {countSubmissions <= 0 ? (
//               <p className="bg-error/15 text-error rounded-lg p-4 shadow-lg">
//                 You have reached the maximum number of submissions for today.
//                 Please try again tomorrow
//               </p>
//             ) : (
//               <p className="bg-secondary/20 text-secondary-text rounded-lg p-4">
//                 {`You have ${countSubmissions} submissions left.`}
//               </p>
//             )}
//           </div>
//         </div>

//         <Fade direction="up" duration={400} triggerOnce>
//           {/* submission status success  */}
//           {submissionStatus === "success" && (
//             <div className="bg-success/20 mb-4 flex items-center justify-center gap-2 rounded-lg p-4 shadow-lg">
//               <CheckCircle className="text-success" />
//               <span className="text-success font-semibold">{message}</span>
//             </div>
//           )}

//           {/* submission status error */}
//           {submissionStatus === "error" && (
//             <div className="bg-error/10 mb-4 flex items-center justify-center gap-2 rounded-lg p-4 shadow-lg">
//               <AlertCircle className="text-error" />
//               <span className="text-error font-semibold">{message}</span>
//             </div>
//           )}

//           {/* submission status submitting */}
//           {submissionStatus === "submitting" && (
//             <div className="bg-secondary/50 mb-4 flex items-center justify-center gap-2 rounded-lg p-4 shadow-lg">
//               <Loader2 className="text-primary animate-spin" />
//               <span className="text-primary font-semibold">{message}</span>
//             </div>
//           )}

//           {/* submission limit exceeded */}
//           {submissionStatus === "limit_exceeded" && (
//             <div className="bg-error/10 mb-4 flex items-center justify-center gap-2 rounded-lg p-4 shadow-lg">
//               <AlertCircle className="text-error" />
//               <span className="text-error font-semibold">{message}</span>
//             </div>
//           )}
//         </Fade>

//         <Fade triggerOnce duration={300} delay={500}>
//           <form
//             method="post"
//             onSubmit={handleSubmit(onSubmit)}
//             noValidate
//             className="flex flex-col gap-4 md:gap-6"
//           >
//             {/* name input */}
//             <div className="space-y-1">
//               <label
//                 htmlFor="name"
//                 className="text-secondary-text flex items-center gap-2 font-bold uppercase"
//               >
//                 <User size={18} className="text-secondary" />
//                 Name
//               </label>
//               <div className="relative">
//                 <input
//                   {...register("name")}
//                   id="name"
//                   type="text"
//                   placeholder="Your name"
//                   name="name"
//                   autoComplete="name"
//                   disabled={countSubmissions <= 0}
//                   className={cn(
//                     "border-secondary/70 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
//                     errors.name && "border-error/50 bg-error/5",
//                     !errors.name && "focus:border-secondary/50",
//                     (isSubmitting || countSubmissions <= 0) &&
//                       "pointer-events-none opacity-50",
//                   )}
//                 />
//               </div>
//               {errors.name && (
//                 <span
//                   role="alert"
//                   className="text-error text-xs-sm flex items-center gap-1 font-medium"
//                 >
//                   <AlertCircle size={14} />
//                   {errors.name.message}
//                 </span>
//               )}
//             </div>

//             {/* email input */}
//             <div className="space-y-1">
//               <label
//                 htmlFor="email"
//                 className="text-secondary-text flex items-center gap-2 font-bold uppercase"
//               >
//                 <Mail size={18} className="text-secondary" />
//                 Email
//               </label>
//               <div className="relative">
//                 <input
//                   {...register("email")}
//                   id="email"
//                   type="email"
//                   aria-invalid={errors.email ? "true" : "false"}
//                   aria-describedby="email-error"
//                   name="email"
//                   placeholder="your.email@example.com"
//                   autoComplete="email"
//                   disabled={countSubmissions <= 0}
//                   className={cn(
//                     "border-secondary/70 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
//                     errors.email && "border-error/50 bg-error/5",
//                     !errors.email && "focus:border-secondary/50",
//                     (isSubmitting || countSubmissions <= 0) &&
//                       "pointer-events-none opacity-50",
//                   )}
//                 />
//               </div>
//               {errors.email && (
//                 <Fade direction="up" duration={400} triggerOnce>
//                   <span
//                     role="alert"
//                     id="email-error"
//                     className="text-error text-xs-sm flex items-center gap-1 font-medium"
//                   >
//                     <AlertCircle size={14} />
//                     {errors.email.message}
//                   </span>
//                 </Fade>
//               )}
//             </div>

//             {/* mobile input (optional) */}
//             <div className="space-y-1">
//               <label
//                 htmlFor="mobile"
//                 className="text-secondary-text flex items-center gap-2 font-bold uppercase"
//               >
//                 <Phone size={18} className="text-secondary" />
//                 Phone (optional)
//               </label>
//               <div className="relative">
//                 <input
//                   {...register("mobile")}
//                   id="mobile"
//                   type="tel"
//                   name="mobile"
//                   aria-invalid={errors.mobile ? "true" : "false"}
//                   aria-describedby="mobile-error"
//                   autoComplete="tel"
//                   title="Format: 700-000-000"
//                   placeholder="+254 700 000 000"
//                   disabled={countSubmissions <= 0}
//                   className={cn(
//                     "border-secondary/70 w-full rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
//                     errors.mobile && "border-error/50 bg-error/5",
//                     !errors.mobile && "focus:border-secondary/50",
//                     (isSubmitting || countSubmissions <= 0) &&
//                       "pointer-events-none opacity-50",
//                   )}
//                 />
//               </div>
//               {errors.mobile && (
//                 <Fade direction="up" duration={400} triggerOnce>
//                   <span
//                     role="alert"
//                     id="mobile-error"
//                     className="text-error text-xs-sm flex items-center gap-1 font-medium"
//                   >
//                     <AlertCircle size={14} />
//                     {errors.mobile.message}
//                   </span>
//                 </Fade>
//               )}
//             </div>

//             {/* message textarea */}
//             <div className="space-y-1">
//               <label
//                 htmlFor="textarea"
//                 className="text-secondary-text flex items-center gap-2 font-bold uppercase"
//               >
//                 <MessageSquare size={18} className="text-secondary shadow-lg" />
//                 Message
//               </label>
//               <div className="relative">
//                 <textarea
//                   {...register("textarea")}
//                   id="textarea"
//                   cols={15}
//                   rows={5}
//                   name="textarea"
//                   aria-invalid={errors.textarea ? "true" : "false"}
//                   aria-describedby="textarea-error"
//                   placeholder="What would you like to discuss?"
//                   disabled={countSubmissions <= 0}
//                   className={cn(
//                     "border-secondary/70 w-full resize-none rounded-lg border p-2.5 shadow-md transition-all duration-300 ease-in-out outline-none",
//                     errors.textarea && "border-error/50 bg-error/5",
//                     !errors.textarea && "focus:border-secondary/50",
//                     (isSubmitting || countSubmissions <= 0) &&
//                       "pointer-events-none opacity-50",
//                   )}
//                 />
//               </div>
//               {errors.textarea && (
//                 <Fade direction="up" duration={400} triggerOnce>
//                   <span
//                     role="alert"
//                     id="textarea-error"
//                     className="text-error text-xs-sm -mt-1 flex items-center gap-1 text-sm font-medium"
//                   >
//                     <AlertCircle size={14} />
//                     {errors.textarea.message}
//                   </span>
//                 </Fade>
//               )}
//             </div>

//             {/* button */}
//             <button
//               type="submit"
//               disabled={isSubmitting || countSubmissions <= 0}
//               className={cn(
//                 "cursor-pointer rounded-full p-4 uppercase transition-all duration-200 ease-in-out md:ml-auto md:p-3.5",

//                 {
//                   // Default state
//                   "bg-primary text-background hover:-translate-y-1 hover:shadow-md":
//                     !isSubmitting &&
//                     countSubmissions > 0 &&
//                     Object.keys(errors).length === 0,

//                   // Error state or no submissions left
//                   "bg-primary/40 text-secondary-text cursor-not-allowed hover:translate-none":
//                     Object.keys(errors).length > 0 || countSubmissions <= 0,

//                   // Submitting state
//                   "bg-primary/40 text-secondary-text cursor-wait": isSubmitting,
//                 },
//               )}
//             >
//               <span className="flex items-center justify-center">
//                 {isSubmitting ? (
//                   <span className="flex items-center gap-2">
//                     <span className="uppercase">Submitting Message</span>
//                     <span className="">
//                       <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                           fill="none"
//                         />
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         />
//                       </svg>
//                     </span>
//                   </span>
//                 ) : countSubmissions <= 0 ? (
//                   <span>Limit Reached</span>
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     Submit message
//                     <Send
//                       size={17}
//                       className="transition-transform group-hover:translate-x-1"
//                     />
//                   </span>
//                 )}
//               </span>
//             </button>
//           </form>
//         </Fade>
//       </div>
//     </section>
//   );
// };
// export default ContactPage;

"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { resumeCV } from "../data/resume";

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  useEffect(() => {
    // Add class to body to hide header
    document.body.classList.add("hide-header");

    const timer = setTimeout(() => {
      setIsLoading(false);
      resumeCV.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => new Set([...prev, index]));
        }, index * 200);
      });
    }, 300);

    // Cleanup: Remove class when component unmounts
    return () => {
      clearTimeout(timer);
      document.body.classList.remove("hide-header");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <button
            onClick={handleClick}
            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
            aria-label="Go back to previous page"
          >
            <ArrowLeft
              size={18}
              className="text-slate-600 transition-colors duration-200 group-hover:text-slate-800"
            />
            <span className="font-medium text-slate-700 transition-colors duration-200 group-hover:text-slate-900">
              Go Back
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Title Section */}
        <div
          className={cn(
            "mb-16 transform text-center transition-all duration-700 ease-out",
            isLoading
              ? "translate-y-8 scale-95 opacity-0"
              : "translate-y-0 scale-100 opacity-100",
          )}
        >
          <div className="relative inline-block">
            <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              Career Timeline
            </h1>
            <div className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            My professional journey through the years
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-300 to-pink-200 md:left-1/2 md:-translate-x-px md:transform" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {resumeCV.map((item, index) => {
              const isEven = index % 2 === 0;
              const isVisible = visibleItems.has(index);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "relative flex items-center",
                    "md:justify-center",
                  )}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 z-10 md:left-1/2 md:-translate-x-1/2 md:transform">
                    <div
                      className={cn(
                        "h-4 w-4 rounded-full border-4 border-white shadow-lg transition-all duration-500",
                        isVisible
                          ? "scale-100 bg-gradient-to-r from-indigo-500 to-purple-500"
                          : "scale-75 bg-slate-300",
                      )}
                    />
                    {/* Pulse Animation */}
                    {isVisible && (
                      <div className="absolute inset-0 h-4 w-4 animate-ping rounded-full bg-indigo-400 opacity-20" />
                    )}
                  </div>

                  {/* Timeline Content Card */}
                  <div
                    className={cn(
                      "ml-20 transform transition-all duration-700 ease-out md:ml-0 md:w-5/12",
                      isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8",
                      isVisible
                        ? "translate-x-0 scale-100 opacity-100"
                        : isEven
                          ? "translate-x-4 scale-95 opacity-0 md:-translate-x-8"
                          : "translate-x-4 scale-95 opacity-0 md:translate-x-8",
                    )}
                    style={{
                      transitionDelay: `${index * 200}ms`,
                    }}
                  >
                    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
                      {/* Gradient Top Border */}
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                      {/* Arrow Pointer for Desktop */}
                      <div
                        className={cn(
                          "absolute top-6 hidden h-0 w-0 transition-all duration-300 md:block",
                          isEven
                            ? "right-0 translate-x-full border-y-8 border-l-8 border-y-transparent border-l-white/80"
                            : "left-0 -translate-x-full border-y-8 border-r-8 border-y-transparent border-r-white/80",
                        )}
                      />

                      <div className="p-6">
                        {/* Date Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1.5 text-sm font-semibold text-indigo-700">
                          <Calendar size={14} />
                          {item.date}
                        </div>

                        {/* Job Title */}
                        <h2 className="mb-3 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-900 md:text-2xl">
                          {item.title}
                        </h2>

                        {/* Company & Location */}
                        <div className="mb-4 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Building2 size={16} className="text-indigo-500" />
                            <span className="font-semibold text-slate-700">
                              {item.company}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-emerald-500" />
                            <span className="text-slate-600">
                              {item.location}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">
                            <Briefcase size={16} className="text-purple-500" />
                            <span>Key Responsibilities</span>
                          </div>
                          <ul className="space-y-2">
                            {item.description.map((desc, descIndex) => (
                              <li
                                key={descIndex}
                                className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                              >
                                <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline End Marker */}
          <div className="relative mt-12 flex justify-center">
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 md:transform">
              <div className="h-6 w-6 rounded-full border-4 border-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg" />
              <div className="absolute inset-0 h-6 w-6 animate-pulse rounded-full bg-indigo-400 opacity-30" />
            </div>
            <div className="ml-20 rounded-full border border-slate-200/60 bg-white/80 px-6 py-3 shadow-sm backdrop-blur-sm md:ml-0">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-sm font-medium text-slate-600">
                  Present Day
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4 text-slate-400">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-slate-300" />
            <span className="text-sm font-medium">Career Journey Complete</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300" />
          </div>
        </div>
      </main>
    </div>
  );
}
