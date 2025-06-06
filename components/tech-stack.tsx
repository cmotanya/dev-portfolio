"use client";

import React, { useState } from "react";
import Image from "next/image";
import { tech_stack } from "@/app/data/tech-stack";
import { useRouter } from "next/navigation";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

const TechStack = () => {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className="grid w-full max-w-xl grid-cols-3 items-center justify-center gap-6 md:grid-cols-4">
      <Fade direction="up" cascade triggerOnce duration={200} delay={100}>
        {tech_stack.map((item, index) => (
          <Link
            key={item.name}
            href={item.link}
            onClick={() => handleClick(item.link)}
            className="group shadow-accent/20 border-accent-alt/50 relative flex flex-col items-center justify-center gap-3 rounded-xl border p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            target="_blank"
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            {/* Glow Effect */}
            <div className="bg-accent-alt/20 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* External Link Icon */}
            <div className="absolute top-2 right-2 opacity-0 transition-all duration-200 group-hover:opacity-60">
              <ExternalLinkIcon size={12} className="text-tertiary" />
            </div>

            {/* Tech Icon */}
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="mx-auto filter transition-all duration-500 group-hover:brightness-110 group-hover:saturate-125"
                />
                {/* Subtle glow behind icon */}
                <div className="from-accent/20 to-primary/20 absolute inset-0 -z-10 rounded-full bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
              </div>
            </div>

            {/* Tech Name */}
            <span className="text-foreground/80 group-hover:text-foreground relative z-10 text-center text-sm font-semibold transition-all duration-300 group-hover:scale-105">
              {item.name}
            </span>

            {/* Animated underline */}
            <div className="from-secondary to-tertiary absolute bottom-3 left-1/2 h-0.5 w-0 -translate-x-1/2 transform bg-gradient-to-r transition-all duration-500 group-hover:w-12" />

            {/* Tooltip on hover */}
            {hoveredItem === item.name && (
              <div className="animate-fade-in border-accent-alt text-primary-text/90 absolute -top-10 left-1/2 z-20 w-full -translate-x-1/2 transform rounded-lg border px-3 py-1 text-xs font-medium shadow-lg backdrop-blur-md">
                Click to learn more
                <div className="border-t-background/90 absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-transparent" />
              </div>
            )}
          </Link>
        ))}
      </Fade>
      {/* </div> */}
    </div>
  );
};

export default TechStack;
