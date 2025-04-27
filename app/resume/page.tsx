"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        className="bg-primary text-background fixed z-50 -mt-6 flex items-center gap-2 rounded-full px-2.5 py-1.5 outline-offset-2 transition-all ease-in-out active:outline-2"
      >
        <ArrowLeft size={14} /> <span className="text-sm">Go Back</span>
      </button>

      {/* Work Experience */}
      <div
        className={cn(
          "transform-all mt-8 duration-300 ease-in-out",
          isLoading ? "scale-[98%] blur-sm" : "blur-0 scale-100",
        )}
      >
        <h2 className="border-primary/20 text-textColor/70 mb-3 border-b pb-1 text-3xl font-bold">
          WORK EXPERIENCE
        </h2>

        {/* Freelance Experience */}
        <div className="bg-secondary/5 border-secondary/10 mb-6 rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex flex-col justify-between gap-1">
            <h3 className="text-secondary text-xl font-semibold whitespace-nowrap uppercase underline">
              Freelance: CCTV & Network
            </h3>

            <div className="text-sm">
              <span className="text-secondary flex items-center gap-2 font-medium">
                {" "}
                <CalendarDays /> 2020 - Present
              </span>
              <span className="text-secondary ml-0.5 font-medium">
                👨‍💼<span className="ml-3">Self-Employed</span>
              </span>
              <span className="text-secondary -ml-0.5 flex items-center gap-2 font-medium">
                <MapPin /> Mombasa, Kenya
              </span>
            </div>
          </div>

          <ul className="text-textColor/80 mt-3 space-y-4">
            <li>
              Completed 40+ CCTV installations for residential and commercial
              clients, including camera setup, wiring, and software
              configuration
            </li>
            <li>
              Installed and configured biometric time attendance systems and
              access control solutions
            </li>
            <li>
              Set up and troubleshot networks for schools and small businesses,
              ensuring optimal performance for both wired and wireless systems
            </li>
            <li>
              Performed hardware repairs and software installations for
              individual customers
            </li>
            <li>
              Built lasting client relationships through professional
              communication and attention to detail
            </li>
          </ul>
        </div>

        {/* Sales Associate */}
        <div className="bg-secondary/5 border-secondary/10 mb-6 rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex flex-col justify-between gap-1">
            <h3 className="text-secondary text-xl font-semibold uppercase underline">
              Sales Associate
            </h3>

            <div className="text-sm">
              <span className="text-secondary flex items-center gap-2 font-medium">
                {" "}
                <CalendarDays />
                01/2019 - 04/2020
              </span>

              <span className="text-secondary ml-0.5 font-medium">
                👨‍💼<span className="ml-2"> Ken Computers Ltd.</span>
              </span>

              <span className="text-secondary -ml-0.5 flex items-center gap-2 font-medium">
                <MapPin /> Mombasa, Kenya
              </span>
            </div>
          </div>

          <ul className="mt-3 space-y-4">
            <li>
              Assisted customers in Consistently exceeded sales targets through
              effective customer engagement strategies
            </li>
            <li>
              Conducted product demonstrations and provided technical advice on
              computer hardware, software, and CCTV systems
            </li>
            <li>
              Improved inventory management, reducing stock discrepancies by 10%
            </li>
            <li>
              Received recognition for exceptional customer service and
              satisfaction
            </li>
            <li>
              Collaborated with team members to achieve collective sales goals
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
