import { BadgeCheckIcon, Brain, FileUser, Quote } from "lucide-react";
import React from "react";
import Image from "next/image";
import { about } from "../data/about-section";
import { cn } from "@/lib/utils";
import { poppins } from "../data/font";
import { Fade, Slide } from "react-awesome-reveal";

const About = () => {
  return (
    <section id="about" className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      {" "}
      <Slide direction="left" duration={300} triggerOnce>
        <div className="relative mb-12 flex items-center gap-4">
          {" "}
          <FileUser size={45} className="text-secondary shrink-0 rotate-12" />
          <h1 className="text-6xl font-bold tracking-tight whitespace-nowrap">
            About{" "}
            <span className="text-primary relative">
              Me
              <span className="bg-primary absolute right-0 bottom-0 h-1 w-full" />
            </span>
          </h1>
        </div>
      </Slide>
      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {" "}
        {about.map((item, index) => (
          <div
            key={index}
            className="group relative aspect-square w-full overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
          >
            <Image
              src={item.src}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              {" "}
              <span className="text-sm font-medium text-white">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* --- Core About Content --- */}
      <Fade direction="right" delay={300} duration={500}>
        <div className="text-textColor/90 space-y-8 leading-relaxed">
          {" "}
          <p
            className={cn(
              "text-textColor bg-secondary/5 border-l-primary relative border-l-4 p-4 leading-relaxed font-medium",
              poppins.className,
            )}
          >
            {" "}
            Bringing together expertise in{" "}
            <strong className="text-primary">web development</strong>, robust{" "}
            <strong className="text-primary">CCTV systems</strong>, and reliable{" "}
            <strong className="text-primary">network infrastructure</strong>, I
            specialize in creating technical solutions that are not only
            effective but also secure, user-friendly, and built for real-world
            application. My professional journey is rooted in applying technical
            knowledge with a pragmatic, problem-solving approach.
            <span className="text-secondary/50 absolute right-0 bottom-2">
              <Quote size={60} />
            </span>
          </p>
          <p>
            My philosophy centers on building technology that truly serves
            people. This means prioritizing security from the ground up,
            designing systems that are intuitive and accessible, and ensuring
            the underlying infrastructure is solid and dependable. I believe
            good technology should empower and protect, seamlessly integrating
            into users&apos; lives without adding unnecessary complexity.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {" "}
            <div className="bg-secondary/5 rounded-lg p-6">
              {" "}
              <h3 className="text-primary mb-4 text-xl font-bold">
                What I Do
              </h3>{" "}
              <ul className="space-y-3">
                {" "}
                <li className="flex items-start gap-3">
                  {" "}
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <BadgeCheckIcon />
                  </span>{" "}
                  <span>
                    Develop responsive and performant web applications with a
                    focus on user experience.
                  </span>{" "}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <BadgeCheckIcon />
                  </span>{" "}
                  <span>
                    Design, install, and configure robust security and
                    surveillance systems.
                  </span>{" "}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <BadgeCheckIcon />
                  </span>{" "}
                  <span>
                    Establish and maintain reliable network infrastructure for
                    seamless connectivity.
                  </span>{" "}
                </li>
              </ul>
            </div>
            <div className="bg-secondary/5 rounded-lg p-6">
              {" "}
              <h3 className="text-primary mb-4 text-xl font-bold">
                My Approach
              </h3>{" "}
              <ul className="space-y-3">
                {" "}
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <Brain />
                  </span>{" "}
                  <span>
                    Prioritizing clear communication and understanding project
                    requirements thoroughly.
                  </span>{" "}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <Brain />
                  </span>{" "}
                  <span>
                    Integrating security best practices into every stage of
                    development and implementation.
                  </span>{" "}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <Brain />
                  </span>{" "}
                  <span>
                    Delivering solutions that are reliable, scalable, and easy
                    for users to manage.
                  </span>{" "}
                </li>
              </ul>
            </div>
          </div>
          <p>
            Beyond specific projects, I maintain a keen interest in the evolving
            technology landscape. I actively explore new frameworks, read
            industry publications, and engage in personal labs or projects.
          </p>
          <p>
            This commitment to continuous learning ensures I can leverage the
            best tools and techniques to address future challenges and provide
            innovative solutions.
          </p>
          <p>
            I value collaboration and am dedicated to finding the most effective
            solution for each unique situation. Every project is an opportunity
            to make a meaningful impact by solving problems and enhancing
            security, efficiency, or user experience.
          </p>
        </div>
      </Fade>
      <div className="mt-12 text-center">
        {" "}
        <button className="bg-primary hover:bg-primary/90 inline-block rounded-full px-8 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:shadow-xl">
          {" "}
          Get in Touch
        </button>
      </div>
    </section>
  );
};

export default About;
