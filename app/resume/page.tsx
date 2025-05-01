"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { resumeCV } from "../data/resume";

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedResumePage");

    if (hasLoaded) {
      setIsLoading(false);
    } else {
      const setBlur = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasLoadedResumePage", "true");
      }, 200);
      return () => clearTimeout(setBlur);
    }
  }, []);

  return (
    <section className="mx-auto">
      <button
        onClick={handleClick}
        className="bg-primary text-background fixed z-50 flex items-center gap-2 rounded-full px-2.5 py-1.5 outline-offset-2 transition-all ease-in-out active:outline-2"
      >
        <ArrowLeft size={14} /> <span className="text-sm">Go Back</span>
      </button>

      {/* Work Experience */}
      <div
        className={cn(
          "transform-all mt-12 duration-300 ease-in-out",
          isLoading ? "scale-[98%] blur-sm" : "blur-0 scale-100",
        )}
      >
        <h2 className="border-primary/20 mb-3 border-b pb-1 text-3xl font-bold">
          WORK EXPERIENCE
        </h2>

        {/* Freelance Experience */}
        {resumeCV.map((item) => (
          <div
            key={item.id}
            className="border-textColor/5 mb-6 rounded-md border p-4 shadow-md"
          >
            <div className="flex flex-col justify-between gap-1">
              <h3 className="text-primary text-xl font-bold whitespace-nowrap uppercase underline">
                {item.title}
              </h3>

              <div className="text-sm">
                <span className="text-secondary flex items-center gap-2 font-medium">
                  {item.icon.iconDate} {item.date}
                </span>

                <div className="text-secondary -ml-2 font-medium">
                  <span className="ml-3"> 👨‍💼 </span>
                  <span className="ml-2">{item.company}</span>
                </div>

                <span className="text-secondary flex items-center gap-2 font-medium">
                  {item.icon.iconLocation} {item.location}
                </span>
              </div>
            </div>

            <ul className="mt-3 space-y-4">
              {item.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
