import { MessageCircleMoreIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { about } from "../data/about-section";

const About = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="relative mb-10">
        <span className="text-textColor/10 absolute -top-14 left-0 -z-10 text-8xl font-extrabold">
          02
        </span>

        <div className="flex items-center gap-3">
          <MessageCircleMoreIcon size={48} className="text-primary" />
          <h1 className="text-textColor text-5xl font-bold tracking-tight">
            About <span className="text-primary">Me</span>
          </h1>
        </div>
        <span className="bg-primary absolute -bottom-2 left-0 h-1 w-24" />
      </div>

      {/* Image gallery with overlays */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {about.map((item, index) => (
          <div
            key={index}
            className="group relative h-36 w-full overflow-hidden rounded-lg shadow-md hover:shadow-lg"
          >
            <Image
              src={item.src}
              alt={item.name}
              width={400}
              height={400}
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
              <span className="p-2 text-sm font-medium text-white">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-textColor/80 space-y-6">
        <p className="text-textColor bg-secondary/5 border-l-primary rounded-md border-l-2 p-4 leading-relaxed font-medium">
          With experience in web development, CCTV systems, and network
          infrastructure, I&apos;ve built my career around creating technical
          solutions that work for real people.
        </p>

        <p className="leading-relaxed">
          My approach blends technical know-how with practical problem-solving.
          I believe good tech should protect and enable users while remaining
          approachable and easy to use.
        </p>

        <blockquote className="border-primary bg-primary/5 rounded-lg border-l-4 p-5 text-lg italic">
          &quot;Technology is best when it brings people together.&quot; - Matt
          Mullenweg
        </blockquote>

        <p className="leading-relaxed">
          When I&apos;m not working on websites or security systems, you&apos;ll
          find me exploring new technologies, reading tech blogs, or tinkering
          with personal projects that help me grow my skills. I&apos;m
          particularly interested in how technology can make everyday life more
          secure and convenient.
        </p>

        <div className="my-8 grid gap-4 md:grid-cols-2">
          <div className="bg-secondary/5 rounded-lg p-5">
            <h3 className="text-primary mb-3 text-lg font-bold">What I Do</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="bg-primary h-2 w-2 rounded-full"></span>
                <span>Create responsive, user-focused websites</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-primary h-2 w-2 rounded-full"></span>
                <span>Install and configure security systems</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-primary h-2 w-2 rounded-full"></span>
                <span>Build reliable network infrastructure</span>
              </li>
            </ul>
          </div>
          <div className="bg-secondary/5 rounded-lg p-5">
            <h3 className="text-primary mb-3 text-lg font-bold">My Approach</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="bg-primary h-2 w-2 rounded-full"></span>
                <span>Listen first, then build</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-primary h-2 w-2 rounded-full"></span>
                <span>Focus on security from the start</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-primary h-2 w-2 rounded-full"></span>
                <span>Create solutions that are easy to use</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="leading-relaxed">
          I value clear communication and finding the right solution for each
          unique situation. Every project is an opportunity to solve a problem
          and make someone&apos;s life a little easier or more secure.
        </p>

        <p className="leading-relaxed">
          If you&apos;re looking for someone who approaches tech challenges with
          both technical precision and a human touch, I&apos;d love to chat
          about how I can help with your project.
        </p>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-primary hover:bg-primary/90 rounded-full px-6 py-2 font-medium text-white transition-colors">
          Get in Touch
        </button>
      </div>
    </section>
  );
};

export default About;
