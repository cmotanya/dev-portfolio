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
      <button
        onClick={handleClick}
        aria-label="Go Back to previous page"
        className={cn(
          "bg-primary group text-background sticky flex cursor-pointer items-center gap-2 rounded-full px-3 py-2",
          isLoading ? "scale-75 opacity-0" : "scale-100 opacity-100",
        )}
      >
        <ArrowLeft
          size={15}
          className="transition-transform group-hover:-translate-x-1"
        />
        Go Back
      </button>

      <div className="mt-5">
        <div
          className={cn(
            "mb-12 transform text-center transition-all duration-300 ease-out",
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
          <div className="from-secondary via-tertiary to-accent absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b md:left-1/2 md:-translate-x-px md:transform" />

          {/* timeline items */}
          <div>
            {resumeCV.map((item, index) => {
              const isEven = index % 2;
              const isVisible = visibleItems.has(index);

              return (
                <div
                  key={item.id}
                  className="relative mb-10 ml-4 flex items-center md:ml-0 md:justify-center"
                >
                  {/* timeline dot */}
                  <div className="absolute left-8 z-50 md:left-1/2 md:-translate-x-1/2 md:transform">
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
                      "border-secondary/20 relative w-5/12 transform overflow-hidden rounded-2xl border shadow-lg backdrop-blur-md transition-all duration-300 ease-out md:ml-0 md:p-6",
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
      <div className="mt-10 flex justify-center">
        <div className="text-primary-text/70 bg-secondary/20 flex items-center justify-center rounded-lg p-1.5 text-sm font-medium">
          Career Journey Complete
        </div>
      </div>
    </section>
  );
}
