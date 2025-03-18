import { MessageCircleMoreIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { about } from "../data/about-section";

const About = () => {
  return (
    <section className="mx-auto py-16">
      <div className="relative mb-12">
        <span className="text-textColor/20 absolute -top-14 right-0 -z-10 text-9xl font-extrabold">
          02
        </span>

        <div className="flex items-center gap-4">
          <MessageCircleMoreIcon size={60} className="text-primary/50" />
          <h1 className="text-textColor/90 text-6xl font-bold tracking-tight">
            About <span className="text-primary">Me</span>
          </h1>
        </div>
        <span className="bg-primary absolute right-1 -bottom-1 h-1 w-24" />
      </div>

      {/* image gallery with overlays */}
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {about.map((item, index) => (
          <div
            key={index}
            className="relative h-full w-full overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-105"
          >
            {/* Image with overlay */}
            <div className="group relative h-[10rem] w-full">
              <Image
                src={item.src}
                alt={item.name}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center"
              />

              {/* text overlay */}
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-1 text-white">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-textColor/80 space-y-6">
        <p className="text-textColor bg-secondary/10 border-gray-2 mx-auto rounded-md border border-gray-200 px-5 font-bold">
          With extensive experience in web development, CCTV systems, and
          network infrastructure, I&apos;ve dedicated my career to providing
          comprehensive technical solutions that meet both functional
          requirements and security needs.
        </p>

        <p>
          My approach combines technical expertise with practical
          problem-solving, allowing me to transform client requirements into
          effective implementations. I believe that exceptional technical work
          is reliable and secure—it protects and enables users while remaining
          user-friendly and accessible.
        </p>

        <blockquote className="border-primary bg-primary/10 rounded-sm border-l-4 p-4 italic">
          {" "}
          &quot;Technology is best when it brings people together.&quot;
        </blockquote>

        <p>
          When I&apos;m not developing websites or installing security systems,
          you&apos;ll find me exploring new technologies, staying up-to-date
          with the latest network security practices, or working on personal
          tech projects that help me continue to grow my skills.
        </p>

        <p>
          I value clear communication and collaboration above all else and
          thrive in environments where technical challenges are approached
          methodically. Every client partnership is an opportunity to provide
          solutions that truly meet their needs. If you&apos;re looking for
          someone who approaches each project with technical precision,
          reliability, and a commitment to excellence, I&apos;d love to connect
          and discuss how we might address your technical requirements.
        </p>
      </div>
    </section>
  );
};

export default About;
