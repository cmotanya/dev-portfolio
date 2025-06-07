"use client";

import { User, Code, Target, Lightbulb, Coffee, MapPin } from "lucide-react";
import React from "react";
import { Fade, Slide } from "react-awesome-reveal"; // For scroll-based animations

const About = () => {
  const skills = [
    "React & Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "CCTV Systems",
    "Data Analysis",
    "Network Administration",
    "Cloud Architecture",
    "DevOps",
    "UI/UX Design",
    "Database Design",
    "Security Systems",
  ];

  const values = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "User-Centered Design",
      description:
        "Every solution starts with understanding real user needs and pain points, ensuring intuitive and effective products.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Clean Code & Scalability",
      description:
        "Writing maintainable, well-documented code that is scalable and easily understood by other developers.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Continuous Learning",
      description:
        "Staying curious and actively adapting to new technologies, methodologies, and industry best practices.",
    },
  ];

  return (
    <section
      id="about"
      className="mx-auto max-w-5xl px-4 py-16 text-lg md:py-24"
    >
      {/* --- Section Title --- */}
      <Slide direction="down" duration={400} triggerOnce>
        <div className="relative mb-12 flex items-center justify-center gap-4 md:justify-start">
          <User
            size={55}
            className="text-secondary shrink-0 rotate-6 transform transition-transform duration-300 ease-in-out hover:rotate-0"
          />
          <h1 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent md:text-7xl">
            About Me
          </h1>
        </div>
      </Slide>

      {/* --- Personal Introduction & Location --- */}
      <Fade direction="up" delay={200} duration={500} triggerOnce>
        <div className="text-textColor/90 mb-16 space-y-6 text-center leading-relaxed md:text-left">
          <div className="text-secondary-text mb-4 flex items-center justify-center gap-2 text-lg md:justify-start">
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
          <p className="text-textColor/70 text-lg">
            My journey in technology is driven by a commitment to creating
            intuitive, accessible, and robust systems that truly serve people.
            From designing surveillance solutions to revealing actionable
            insights from complex datasets, I approach every project with
            meticulous attention to detail and a commitment to excellence.
          </p>
        </div>
      </Fade>

      {/* --- Core Values --- */}
      <Fade direction="up" delay={400} duration={500} triggerOnce>
        <div className="mb-16">
          <h2 className="text-secondary-text mb-10 text-center text-3xl font-bold uppercase md:text-left">
            <Coffee className="text-secondary mr-3 inline-block h-8 w-8 -translate-y-1 transform" />
            What Drives Me
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={index}
                className="group from-tertiary/15 to-tertiary/20 hover:shadow-tertiary/20 relative overflow-hidden rounded-xl bg-gradient-to-br p-8 text-center shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl md:text-left"
              >
                <div className="text-tertiary mb-4 flex justify-center text-5xl md:justify-start">
                  {value.icon}
                </div>
                <h3 className="text-secondary-text mb-3 text-xl font-semibold">
                  {value.title}
                </h3>
                <p className="text-textColor/80 text-base leading-relaxed">
                  {value.description}
                </p>
                {/* Subtle background glow on hover */}
                <span className="animate-pulse-slow from-tertiary/0 via-tertiary/20 to-tertiary/0 absolute -inset-full rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </Fade>

      {/* --- Skills Overview --- */}
      <Fade direction="up" delay={600} duration={500} triggerOnce>
        <div className="mb-16">
          <h2 className="text-secondary-text mb-10 text-center text-3xl font-bold uppercase md:text-left">
            <Code className="text-secondary mr-3 inline-block h-8 w-8 -translate-y-1 transform" />
            Technical Expertise
          </h2>
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
      <Fade direction="up" delay={800} duration={500} triggerOnce>
        <div className="text-textColor/90 space-y-6 text-center leading-relaxed md:text-left">
          <h2 className="text-secondary-text mb-6 text-3xl font-bold uppercase">
            <Lightbulb className="text-secondary mr-3 inline-block h-8 w-8 -translate-y-1 transform" />
            Beyond Code
          </h2>
          <p className="text-textColor/70 text-lg">
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
