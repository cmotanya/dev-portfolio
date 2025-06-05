"use client";

import TechStack from "@/components/tech-stack";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Fade, Slide } from "react-awesome-reveal";

export default function Home() {
  return (
    <section className="relative mx-auto min-h-screen w-full overflow-hidden md:max-w-4xl">
      <div className="relative z-10 container mx-auto px-4">
        <Slide direction="down" triggerOnce duration={400}>
          <div className="relative flex flex-col items-center justify-center space-y-8">
            {/* Enhanced Welcome Badge */}
            <div className="group relative">
              <span className="from-accent via-primary to-secondary absolute -inset-2 rounded-xl bg-gradient-to-r opacity-40 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
              <span className="bg-background/80 relative block rounded-xl border border-white/10 px-6 py-3 font-medium shadow-2xl backdrop-blur-md">
                <span className="from-accent to-primary bg-gradient-to-r bg-clip-text font-semibold text-transparent">
                  Welcome to my portfolio
                </span>
              </span>
            </div>

            {/* Enhanced Hero Content */}
            <div className="relative z-10 space-y-14 text-center">
              <div>
                <h3 className="animate-fade-in block text-xl font-medium tracking-tight opacity-80 md:text-3xl">
                  hey there! I&apos;m
                </h3>
                <span className="relative inline-block">
                  <h1 className="block text-3xl font-bold md:text-4xl lg:text-7xl">
                    <span className="relative inline-block">
                      {Array.from("Cornelius").map((letter, index) => (
                        <span
                          key={index}
                          className="animate-letter-drop inline-block translate-y-8 transform opacity-0"
                          style={{
                            animationDelay: `${200 + index * 100}ms`,
                            animationFillMode: "forwards",
                            color: `hsl(${220 + index * 15}, 70%, ${60 + index * 4}%)`,
                          }}
                        >
                          {letter}
                        </span>
                      ))}
                    </span>
                  </h1>
                </span>
              </div>

              <div
                className="animate-fade-in-up opacity-0"
                style={{
                  animationDelay: "1000ms",
                  animationFillMode: "forwards",
                }}
              >
                <p className="text-foreground/80 mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
                  A tech-savvy innovator with expertise in{" "}
                  <span className="group relative inline-block cursor-pointer font-semibold">
                    <span className="text-accent group-hover:text-accent-alt relative z-10 transition-colors duration-300">
                      Web Development, CCTV Security & Networking
                    </span>
                    <span className="bg-accent/20 group-hover:bg-accent/30 absolute inset-x-0 bottom-0 h-3 -skew-x-12 transform transition-all duration-500 group-hover:h-5" />
                  </span>
                </p>
              </div>

              {/* Enhanced CTA Buttons */}
              <div
                className="animate-fade-in-up mt-16 flex flex-wrap items-center justify-center gap-8 opacity-0"
                style={{
                  animationDelay: "1500ms",
                  animationFillMode: "forwards",
                }}
              >
                <Link
                  href="/contact"
                  className="group from-primary to-accent relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r px-5 py-3 font-medium text-white uppercase shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10">Let&apos;s Talk</span>
                  <ArrowRightIcon
                    size={20}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-2"
                  />
                  <div className="from-primary to-accent absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>

                <Link
                  href="/about"
                  className="group border-accent/50 hover:border-accent hover:shadow-accent/20 bg-background/20 relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 px-5 py-3 uppercase backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="relative z-10 font-semibold">
                    Learn More
                  </span>
                  <div className="from-accent/10 to-primary/10 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              </div>
            </div>
          </div>
        </Slide>
      </div>

      {/* Enhanced Services Section */}
      <div className="container px-4 pt-20">
        <Fade direction="up" duration={500} triggerOnce delay={500}>
          <h2 className="mb-14 text-center">
            <span className="text-foreground/60 mb-4 block text-sm font-medium tracking-wider uppercase">
              Services
            </span>
            <p className="text-4xl font-bold md:text-5xl">
              What I{" "}
              <span className="text-accent relative">
                Do
                <span className="from-accent to-primary absolute -bottom-2 left-0 h-1 w-full -skew-x-12 transform bg-gradient-to-r"></span>
              </span>
            </p>
          </h2>
        </Fade>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Web Development Service */}
          <Fade direction="up" duration={600} triggerOnce delay={200}>
            <div className="group bg-background/40 hover:shadow-accent/20 relative overflow-hidden rounded-2xl border border-white/10 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="from-accent/10 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="from-accent to-primary mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  Web Development
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Crafting modern, responsive websites and web applications that
                  engage users and drive results.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="bg-accent/20 text-accent rounded-full px-3 py-1 text-xs">
                    React
                  </span>
                  <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-xs">
                    Next.js
                  </span>
                  <span className="bg-secondary/20 text-secondary rounded-full px-3 py-1 text-xs">
                    TypeScript
                  </span>
                </div>
              </div>
            </div>
          </Fade>

          {/* CCTV Security Service */}
          <Fade direction="up" duration={600} triggerOnce delay={400}>
            <div className="group bg-background/40 hover:shadow-accent/20 relative overflow-hidden rounded-2xl border border-white/10 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="from-accent/10 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="from-accent to-primary mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  CCTV Security Systems
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Professional security systems with IP cameras, cloud storage,
                  and 24/7 remote monitoring.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="bg-accent/20 text-accent rounded-full px-3 py-1 text-xs">
                    IP Cameras
                  </span>
                  <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-xs">
                    Cloud Storage
                  </span>
                  <span className="bg-secondary/20 text-secondary rounded-full px-3 py-1 text-xs">
                    Remote Access
                  </span>
                </div>
              </div>
            </div>
          </Fade>

          {/* Networking Service */}
          <Fade direction="up" duration={300} triggerOnce delay={600}>
            <div className="group bg-background/40 hover:shadow-accent/20 relative overflow-hidden rounded-2xl border border-white/10 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="from-accent/10 to-primary/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="from-accent to-primary mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                </div>
                <h3 className="text-foreground mb-4 text-xl font-bold">
                  Network Infrastructure
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Robust network infrastructure with optimal Wi-Fi, security,
                  and seamless connectivity solutions.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="bg-accent/20 text-accent rounded-full px-3 py-1 text-xs">
                    WiFi Setup
                  </span>
                  <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-xs">
                    LAN/WAN
                  </span>
                  <span className="bg-secondary/20 text-secondary rounded-full px-3 py-1 text-xs">
                    Firewalls
                  </span>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid h-full grid-cols-8 gap-4">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-accent h-2 w-2 animate-pulse rounded-full"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>

          <Fade direction="up" duration={500} triggerOnce delay={300}>
            <div className="relative z-10 mb-16 text-center">
              <span className="text-foreground/60 mb-4 block text-sm font-medium tracking-wider uppercase">
                Tools & Technologies
              </span>
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                <span className="from-accent via-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                  Powered by Innovation
                </span>
              </h2>
              <p className="text-foreground/70 mx-auto max-w-2xl text-lg">
                Leveraging cutting-edge technologies to build exceptional
                digital experiences
              </p>
            </div>

            {/* Tech Stack Grid */}
            <div className="flex items-center justify-center">
              <TechStack />
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <Link
                href="/projects"
                className="text-accent border-accent/40 hover:border-secondary/40 hover:text-secondary group inline-flex items-center gap-2 rounded-full border p-2 font-semibold transition-colors duration-300"
              >
                See These in Action
                <ArrowRightIcon
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}
