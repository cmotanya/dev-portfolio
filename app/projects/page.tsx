"use client";

import { ArrowUpRight, ExternalLink, FolderCode, Github } from "lucide-react";
import Image from "next/image";
import { projects } from "../data/projects";
import { Project } from "@/lib/types";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/navigation";

const Projects = () => {
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <section id="projects" className="max-w-5xl px-4 md:mx-auto">
      <div className="relative mb-12">
        <Fade direction="down" triggerOnce duration={300}>
          <div className="flex items-center justify-center gap-4 md:justify-start">
            <FolderCode
              size={45}
              className="text-secondary shrink-0 -rotate-6"
            />
            <h1 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-6xl leading-tight font-bold tracking-tight text-transparent md:text-7xl">
              My Project
            </h1>
          </div>
        </Fade>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Fade damping={0.5} cascade triggerOnce duration={400}>
          {projects.map((project: Project) => (
            <div
              key={project.id}
              className="border-secondary/50 from-secondary/10 to-secondary/20 flex flex-col overflow-hidden rounded-lg border bg-gradient-to-b shadow-xl transition-transform duration-300 md:max-w-xl"
            >
              {/* Project Image */}
              <div className="relative aspect-video w-full">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Project Details */}
              <div className="flex flex-grow flex-col p-2">
                <h3 className="mb-3 text-xl font-semibold">{project.name}</h3>
                <div className="mb-2 flex flex-grow flex-col space-y-2">
                  <span className="text-xs-sm text-secondary-text flex-grow font-medium">
                    {project.description}
                  </span>
                </div>

                {/* technologies used */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <Fade cascade direction="up" triggerOnce duration={250}>
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-primary bg-secondary/50 rounded-full px-1.5 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </Fade>
                </div>

                {/* Project Links */}
                <div className="mt-4 flex gap-4">
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-secondary/30 border-secondary text-secondary-text text-xs-sm flex items-center gap-1 rounded-full border p-1.5 transition-all duration-200 ease-in-out hover:-translate-y-0.5"
                      aria-label={`View live demo of ${project.name}`}
                    >
                      <ExternalLink size={15} />
                      <span className="font-semibold">Live Demo</span>
                    </Link>
                  )}
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-secondary/30 border-secondary text-secondary-text text-xs-sm flex items-center gap-1 rounded-full border p-1.5 transition-all duration-200 ease-in-out hover:-translate-y-0.5"
                      aria-label={`View source code for ${project.name}`}
                    >
                      <Github size={15} />
                      <span className="font-semibold">Github</span>
                      <ArrowUpRight size={15} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Fade>
      </div>

      {/* button to quotation page */}
      <div className="mt-12 flex items-center justify-center">
        <Fade direction="up" triggerOnce duration={300}>
          <button
            onClick={() => handleClick("/quotation")}
            className="bg-primary border-secondary text-background group flex cursor-pointer items-center gap-2 rounded-full p-4"
            aria-label="Request a quotation page"
          >
            <span className="text-xl uppercase">Request a quotation</span>
            <ArrowUpRight
              size={15}
              className="transition-all duration-200 ease-in-out group-hover:translate-x-1.5 group-active:translate-x-1.5"
            />
          </button>
        </Fade>
      </div>
    </section>
  );
};

export default Projects;
