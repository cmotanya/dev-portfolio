"use client";

import { User, Code, Lightbulb, Coffee, MapPin } from "lucide-react";
import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { skills, values } from "../data/about";

const About = () => {
  return (
    <section id="about" className="max-w-5xl px-4 md:mx-auto">
      {/* --- Section Title --- */}
      <Slide direction="down" duration={300} triggerOnce>
        <div className="flex items-center justify-center gap-4 md:justify-start">
          <User size={45} className="text-secondary shrink-0 -rotate-6" />
          <h1 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-6xl leading-tight font-bold tracking-tight text-transparent md:text-7xl">
            About Me
          </h1>
        </div>
      </Slide>

      {/* --- Personal Introduction & Location --- */}
      <Fade direction="up" delay={200} duration={300} triggerOnce>
        <div className="text-textColor/90 mb-16 space-y-6 leading-relaxed md:text-left">
          <div className="text-secondary-text mb-12 flex items-center justify-center gap-2 text-lg md:justify-start">
            <MapPin className="h-5 w-5 animate-pulse" />
            <span className="font-medium">Based in Mombasa, Kenya</span>
          </div>
          <p className="text-xl md:text-2xl">
            I&apos;m a passionate <strong>full-stack developer</strong> and{" "}
            <strong>systems specialist</strong> who believes in the power of
            technology to solve real-world problems. With expertise spanning{" "}
            <strong>web development</strong>,{" "}
            <strong>CCTV security systems</strong>,{" "}
            <strong>data analysis</strong>, and{" "}
            <strong>network infrastructure</strong>, I craft comprehensive
            digital solutions that are both secure and functional.
          </p>
          <p className="text-secondary-text text-lg">
            My journey in technology is driven by a commitment to creating
            intuitive, accessible, and robust systems that truly serve people.
            From designing surveillance solutions to revealing actionable
            insights from complex datasets, I approach every project with
            meticulous attention to detail and a commitment to excellence.
          </p>
        </div>
      </Fade>

      {/* --- Core Values --- */}
      <Fade direction="up" delay={400} duration={300} triggerOnce>
        <div className="mb-16">
          <div className="mb-4 flex items-center justify-center gap-2 md:mb-8 md:justify-start">
            <Coffee className="text-secondary mr-3 inline-block size-8 -translate-y-1 transform" />
            <h2 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent uppercase">
              What Drives Me
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group hover:shadow-secondary/20 bg-secondary/5 border-secondary/30 relative overflow-hidden rounded-xl border p-8 text-center shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl md:text-left"
              >
                <div className="text-tertiary mb-4 flex justify-center text-5xl md:justify-start">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                <p className="text-secondary-text text-xs-sm text-base leading-relaxed font-medium">
                  {value.description}
                </p>
                {/* Subtle background glow on hover */}
                <span className="animate-pulse-slow from-secondary/0 via-secondary/20 to-secondary/0 absolute -inset-full rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </Fade>

      {/* --- Skills Overview --- */}
      <Fade direction="up" delay={600} duration={300} triggerOnce>
        <div className="mb-16">
          <div className="mb-4 flex items-center justify-center gap-2 md:mb-8 md:justify-start">
            <Code className="text-secondary mr-3 inline-block size-8 -translate-y-1 transform" />
            <h2 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent uppercase">
              Technical Expertise
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="border-secondary/30 from-accent/10 to-secondary/10 text-secondary-text hover:border-secondary/60 cursor-pointer rounded-full border bg-gradient-to-r px-6 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gradient-to-l hover:shadow-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Fade>

      {/* --- Personal Touch & Call to Action --- */}
      <Fade direction="up" delay={800} duration={300} triggerOnce>
        <div className="space-y-2 leading-relaxed md:space-y-6 md:text-left">
          <div className="mb-4 flex items-center justify-center gap-2 md:mb-8 md:justify-start">
            <Lightbulb className="text-secondary mr-3 inline-block size-8 -translate-y-1 transform" />
            <h2 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent uppercase">
              Beyond Code
            </h2>
          </div>
          <p className="text-secondary-text text-lg">
            When I&apos;m not immersed in code, you&apos;ll often find me
            exploring new coffee shops, delving into emerging tech trends, or
            contributing to open-source projects. I believe a well-rounded
            perspective, drawn from diverse experiences, is key to innovative
            problem-solving.
          </p>
          <p className="text-textColor text-xl font-medium">
            I&apos;m always eager to discuss new opportunities, collaborate on
            impactful projects, or simply share insights about the latest in
            tech. Don&apos;t hesitate to <strong>reach out</strong>!
          </p>
        </div>
      </Fade>
    </section>
  );
};

export default About;
