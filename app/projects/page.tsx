import { ExternalLink, FolderCode, Github } from "lucide-react";
import Image from "next/image";
import { projects } from "../data/projects";
import { Project } from "@/lib/types";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

const Projects = () => {
  return (
    <section
      id="projects"
      className="mx-auto max-w-4xl py-16 md:px-12 md:py-24"
    >
      <div className="relative mb-12">
        <Fade direction="down" triggerOnce duration={300}>
          <div className="flex items-center gap-4 whitespace-nowrap">
            <FolderCode size={45} className="text-secondary shrink-0" />
            <h1 className="text-6xl leading-tight font-bold tracking-tight md:text-7xl">
              <span className="relative">
                My
                <span className="bg-secondary absolute right-0 bottom-0 h-1 w-full" />
              </span>{" "}
              <span className="text-secondary"> Project</span>
            </h1>
          </div>
        </Fade>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Fade damping={0.5} cascade triggerOnce duration={400}>
          {projects.map((project: Project) => (
            <div
              key={project.id}
              className="border-primary flex flex-col overflow-hidden rounded-lg border shadow-md transition-transform duration-300 md:max-w-xl"
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
              <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-3 text-xl font-semibold">{project.name}</h3>
                <p className="text-xs-sm flex-grow">{project.description}</p>

                {/* technologies used */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-primary/70 text-text/50 rounded-full px-2.5 py-0.5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="mt-4 flex gap-4">
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ring-secondary bg-primary flex items-center gap-1 rounded-full p-1.5 text-xs ring transition-all duration-200 ease-in-out hover:-translate-y-0.5"
                      aria-label={`View live demo of ${project.name}`}
                    >
                      <ExternalLink size={15} />
                      <span>Live Demo</span>
                    </Link>
                  )}
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ring-secondary bg-primary flex items-center gap-1 rounded-full p-1.5 text-xs ring transition-all duration-200 ease-in-out hover:-translate-y-0.5"
                      aria-label={`View source code for ${project.name}`}
                    >
                      <Github size={15} />
                      <span>Github</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Fade>
      </div>
    </section>
  );
};

export default Projects;
