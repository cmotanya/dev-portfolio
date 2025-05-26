"use client";

import React from "react";
import Image from "next/image";
import { tech_stack } from "@/app/data/tech-stack";
import { useRouter } from "next/navigation";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";

const TechStack = () => {
  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <Fade direction="up" cascade triggerOnce duration={200}>
        {tech_stack.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            onClick={() => handleClick(item.link)}
            className="flex flex-col items-center justify-center gap-1 rounded-lg bg-secondary p-2 shadow-md transition-transform duration-200 hover:-translate-y-1"
            target="_blank"
          >
            {" "}
            <Image
              src={item.image}
              alt={item.name}
              width={50}
              height={50}
              className="mx-auto"
            />{" "}
            <span className="text-xs-sm text-center font-medium">
              {item.name}
            </span>
          </Link>
        ))}
      </Fade>
    </div>
  );
};

export default TechStack;
