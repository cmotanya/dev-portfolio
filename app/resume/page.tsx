"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  Briefcase,
  Loader,
  Download,
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
    document.body.classList.add("hide-header");

    const timer = setTimeout(() => {
      setIsLoading(false);
      // animate items in sequence
      resumeCV.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => new Set([...prev, index]));
        }, index * 200);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("hide-header");
    };
  }, []);

  return (
    <section className="mx-auto -mt-22 max-w-4xl">
      <div className="flex items-center justify-between">
        <button
          onClick={handleClick}
          aria-label="Go Back to previous page"
          className={cn(
            "bg-primary group text-background sticky z-50 ml-4 flex cursor-pointer items-center gap-2 rounded-full p-3 uppercase md:ml-0",
            isLoading ? "scale-75 opacity-0" : "scale-100 opacity-100",
          )}
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-300 ease-out group-hover:-translate-x-1.5 active:-translate-x-1.5"
          />
          Go Back
        </button>

        {/* download button */}
        <button
          onClick={() => window.open("/resume.pdf", "_blank")}
          aria-label="Download Resume"
          className={cn(
            "bg-primary group text-background sticky z-50 ml-4 flex cursor-pointer items-center gap-2 rounded-full p-3 uppercase md:ml-0",
            isLoading ? "scale-75 opacity-0" : "scale-100 opacity-100",
          )}
        >
          Download PDF
          <Download
            size={15}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-1.5 active:-translate-y-1.5"
          />
        </button>
      </div>

      {/* loading screen */}
      <div
        className={cn(
          "bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md duration-500 ease-in-out",
          isLoading
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="animate-fade-in flex flex-col items-center gap-4">
          <Loader className="text-primary size-12 animate-spin" />
          <h1 className="text-primary text-3xl font-bold">
            Loading my resume...
          </h1>
          <p className="text-primary-text/50 text-sm">Please wait a moment</p>
        </div>
      </div>

      <div className="mt-5">
        <div
          className={cn(
            "mb-4 transform text-center transition-all duration-300 ease-out md:mb-12",
            isLoading
              ? "translate-y-12 opacity-0"
              : "translate-y-0 opacity-100",
          )}
        >
          <h1 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-6xl leading-tight font-bold tracking-tight text-transparent md:text-7xl">
            Career Timeline
          </h1>
          <p className="text-secondary-text mt-2">
            My professional journey through the years
          </p>
        </div>

        {/* timeline container */}
        <div className="relative">
          <div className="from-secondary via-tertiary to-accent absolute top-0 bottom-0 left-2 hidden w-0.5 bg-gradient-to-b md:left-1/2 md:block md:-translate-x-px md:transform" />

          {/* timeline items */}
          <div className="p-4">
            {resumeCV.map((item, index) => {
              const isEven = index % 2;
              const isVisible = visibleItems.has(index);

              return (
                <div
                  key={item.id}
                  className="relative mb-10 flex items-center md:justify-center"
                >
                  {/* timeline dot */}
                  <div className="absolute z-30 hidden md:left-1/2 md:block md:-translate-x-1/2 md:transform">
                    <div
                      className={cn(
                        "border-background bg-secondary size-4 transform rounded-full border-4 transition-all duration-300 ease-in-out",
                        isVisible ? "scale-100" : "scale-150",
                      )}
                    />
                  </div>

                  {/* timeline content */}
                  <article
                    className={cn(
                      "border-secondary/20 relative transform overflow-hidden rounded-2xl border p-4 shadow-lg backdrop-blur-md transition-all duration-300 ease-out md:ml-0 md:w-5/12 md:p-6",
                      isEven ? "md:mr-auto" : "md:ml-auto",
                      isVisible
                        ? "translate-x-0 scale-100 opacity-100"
                        : isEven
                          ? "translate-x-4 scale-80 opacity-0 md:-translate-x-14"
                          : "translate-x-4 scale-80 opacity-0 md:translate-x-14",
                    )}
                  >
                    {/* gradient top border */}
                    <div className="from-accent via-tertiary to-secondary absolute inset-x-0 top-0 h-1 bg-gradient-to-r" />

                    <div className="space-y-2">
                      {/* date badge */}
                      <div className="bg-secondary/20 inline-block rounded-lg p-1">
                        {item.date && (
                          <div className="text-primary inline-flex items-center gap-2 text-sm font-bold">
                            <Calendar size={14} />
                            <span className="-mb-1">{item.date}</span>
                          </div>
                        )}
                      </div>

                      {/* job title */}
                      <h2 className="text-accent text-xl font-bold md:text-2xl">
                        {item.title}
                      </h2>

                      {/* company and location*/}
                      <div className="font text-primary-text/50 flex items-center justify-between text-sm font-semibold uppercase">
                        <div className="bg-secondary/20 flex items-center gap-2 rounded-lg p-1">
                          <Building2 size={16} className="text-tertiary" />
                          <span className="-mb-1">{item.company}</span>
                        </div>
                        <div className="bg-secondary/20 flex items-center gap-2 rounded-lg p-1">
                          <MapPin size={16} className="text-tertiary" />
                          <span className="-mb-1">{item.location}</span>
                        </div>
                      </div>

                      <div className="text-secondary-text flex items-center gap-2">
                        <Briefcase size={16} className="text-tertiary" />
                        <span className="font-semibold">
                          Key Responsibilities
                        </span>
                      </div>
                      <ul>
                        {item.description.map((desc) => (
                          <li
                            key={desc}
                            className="text-primary-text/80 flex items-start gap-1 text-sm leading-relaxed"
                          >
                            ✅<span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* bottom decoration */}
      <div className="flex justify-center md:mt-10">
        <div className="text-primary-text/70 bg-secondary/20 flex items-center justify-center rounded-lg p-1.5 text-sm font-medium">
          Career Journey Complete
        </div>
      </div>
    </section>
  );
}
