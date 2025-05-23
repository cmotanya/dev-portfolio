import Image from "next/image";
import TechStack from "@/components/tech-stack";
import { Fade, Slide } from "react-awesome-reveal";
import { Code, Shield, Wifi } from "lucide-react";

export default function Home() {
  return (
    <section id="home" className="mx-auto mt-4 max-w-4xl md:px-12 md:py-24">
      <Slide direction="down" triggerOnce duration={200}>
        <div className="mb-6">
          <h1 className="from-primary to-accent relative flex flex-col items-center justify-center gap-2 bg-gradient-to-r bg-clip-text text-center text-transparent drop-shadow-lg">
            <span className="text-xl font-bold text-transparent md:text-xl">
              hey there! I&apos;m
            </span>
            <span className="text-5xl font-extrabold text-transparent md:text-6xl">
              Cornelius
            </span>
          </h1>
          {/* <span className="absolute animate-bounce right-24 top-7 text-2xl duration-1000">
            👋
          </span> */}
        </div>
      </Slide>

      {/* Subtitle / Services - Fades in with a cascade effect */}
      <div className="md:text-md mt-8 flex items-center justify-between text-center">
        <Fade
          direction="down"
          cascade
          duration={300}
          damping={0.3}
          delay={300}
          triggerOnce
        >
          <p>
            <Code size={24} className="text-secondary mb-1 inline-block" />{" "}
            <span className="whitespace-nowrap">Web Development</span>
          </p>
          <p className="mt-2">
            <Shield size={24} className="text-secondary mb-1 inline-block" />{" "}
            <span className="whitespace-nowrap">CCTV & Security</span>
          </p>
          <p className="mt-2">
            <Wifi size={24} className="text-secondary mb-1 inline-block" />{" "}
            <span className="whitespace-nowrap">Network Solutions</span>
          </p>
        </Fade>
      </div>

      <div className="space-y-4">
        <Image
          src={"/home/2.png"}
          alt=""
          width={200}
          height={200}
          priority
          className="mx-auto h-auto w-auto"
        />

        <p>
          A tech-savvy innovator with expertise in
          <span className="font-medium">
            {" "}
            Web Development, CCTV Security & Networking.
          </span>
        </p>

        <p className="mt-4">
          I build sleek websites, secure smart spaces, and optimize —all with
          precision and passion!
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Tech Stack</h3>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <TechStack />
        </div>
      </div>
    </section>
  );
}
