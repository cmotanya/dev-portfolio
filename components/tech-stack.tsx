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
    <>
      <Fade direction="up" cascade triggerOnce duration={200}>
        {tech_stack.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            onClick={() => handleClick(item.link)}
            className="bg-primary/70 flex flex-col items-center justify-center gap-1 rounded-lg p-2 shadow-sm transition-transform duration-200 hover:scale-105"
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
            <span className="text-center text-gray-500">{item.name}</span>
          </Link>
        ))}
      </Fade>
    </>
  );
};

export default TechStack;
