"use client";

import React from "react";
import Image from "next/image";
import { tech_stack } from "@/app/data/tech-stack";
import { useRouter } from "next/navigation";
import { Fade } from "react-awesome-reveal";

const TechStack = () => {
  const router = useRouter();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <>
      <Fade direction="up" cascade triggerOnce duration={200}>
        {tech_stack.map((item) => (
          <div onClick={() => handleClick(item.link)} key={item.name}>
            <Image
              src={item.image}
              alt={item.name}
              width={50}
              height={50}
              className="mx-auto"
            />{" "}
            {item.name}
          </div>
        ))}
      </Fade>
    </>
  );
};

export default TechStack;
