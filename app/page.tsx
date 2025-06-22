"use client";

import TechStack from "@/components/tech-stack";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Fade, Slide } from "react-awesome-reveal";
import { WhatIDo } from "./data/what-I-do";
import Slider from "react-slick";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const sliderRef = useRef<Slider | null>(null);
  const [current, setCurrent] = useState(0);

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    waitForAnimate: false,

    dotsClass: "slick-dots custom-dots",

    beforeChange: (_: number, next: number) => setCurrent(next),
  };

  return (
    <section className="relative min-h-screen max-w-5xl overflow-hidden px-4 md:mx-auto">
      <div className="relative z-10 container -mt-24 flex min-h-dvh items-center justify-center md:mx-auto md:pt-6">
        <Slide direction="down" triggerOnce duration={400}>
          <div className="relative flex flex-col items-center justify-center gap-26 md:gap-7">
            {/* Enhanced Welcome Badge */}
            <div className="group relative">
              <span className="from-accent via-tertiary to-primary absolute -inset-2 animate-[gradient-x_8s_ease-in-out_infinite] rounded-xl bg-gradient-to-r bg-[length:200%_100%] opacity-40 blur-sm transition-opacity duration-500 group-hover:opacity-60" />
              <span className="bg-background relative block rounded-xl px-6 py-3 font-medium shadow-2xl backdrop-blur-md">
                <span className="from-secondary via-tertiary to-primary animate-[gradient-x_8s_ease-in-out_infinite] bg-gradient-to-r bg-[length:200%_100%] bg-clip-text font-semibold text-transparent before:absolute before:inset-0 before:animate-[slide-in_3s_ease-out] before:bg-inherit">
                  Welcome to my portfolio
                </span>
              </span>
            </div>

            {/* Enhanced Hero Content */}
            <div className="relative z-10 space-y-8 text-center">
              <div>
                <h3 className="animate-fade-in block text-xl font-medium tracking-tight opacity-80 md:text-3xl">
                  hey there! I&apos;m
                </h3>
                <span className="relative inline-block">
                  <h1 className="block text-8xl font-bold md:text-9xl">
                    <span className="relative inline-block">
                      {Array.from("Cornelius").map((letter, index) => (
                        <span
                          key={index}
                          className="animate-letter-drop inline-block translate-y-8 transform opacity-0"
                          style={{
                            animationDelay: `${100 + index * 60}ms`,
                            animationFillMode: "forwards",
                            color: `hsl(${200 + index * 15}, 50%, ${45 + index * 4}%)`,
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
                  animationDelay: "600ms",
                  animationFillMode: "forwards",
                }}
              >
                <p className="text-foreground/80 mx-auto text-xl leading-relaxed md:max-w-2xl md:text-2xl">
                  A tech-savvy innovator with expertise in{" "}
                  <span className="group relative inline-block cursor-pointer font-semibold">
                    <span className="text-tertiary relative z-10 transition-colors duration-300">
                      Web Development, CCTV Security & Networking
                    </span>
                    <span className="bg-tertiary/20 group-hover:bg-tertiary/25 absolute inset-x-0 bottom-0 h-3 -skew-x-12 transform transition-all duration-500 group-hover:h-5" />
                  </span>
                </p>
              </div>

              {/* Enhanced CTA Buttons */}
              <div
                className="animate-fade-in-up mt-28 flex flex-col items-center justify-center gap-4 opacity-0 md:mt-16 md:flex-row md:gap-8 md:px-0"
                style={{
                  animationDelay: "800ms",
                  animationFillMode: "forwards",
                }}
              >
                <Link
                  href="/contact"
                  className="group bg-primary text-background relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full p-5 text-xl uppercase transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10 text-2xl font-bold tracking-wide">
                    Let&apos;s Talk
                  </span>
                  <ArrowRightIcon
                    size={15}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-2"
                  />
                </Link>

                <Link
                  href="/about"
                  className="group border-secondary/40 relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border p-5 text-xl uppercase backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="text-primary relative z-10 text-2xl font-bold tracking-widest">
                    Learn More
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Slide>
      </div>

      {/* Enhanced Services Section */}
      <div className="container">
        <Fade direction="up" duration={500} triggerOnce delay={500}>
          <div className="mb-10 text-center md:mb-6">
            <span className="text-secondary-text mb-4 block text-sm font-medium tracking-wider uppercase">
              Services
            </span>
            <h2 className="text-4xl font-bold md:text-5xl">
              <span className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                What I Offer to My Clients
              </span>
            </h2>
          </div>
        </Fade>

        {/* Web Development Service */}
        <Fade direction="up" duration={600} triggerOnce delay={200}>
          <div className="relative z-10 container mx-auto pb-12">
            <Slider
              {...settings}
              className="bg-secondary/5 border-secondary/20 sh mx-auto w-full rounded-lg border p-6 shadow-xl md:max-w-xl"
            >
              {WhatIDo.map((service, index) => (
                <div key={index} className="grid justify-between space-y-4">
                  <h3 className="text-primary text-2xl font-semibold uppercase">
                    {service.title}
                  </h3>
                  <p className="text-primary-text/70">{service.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tagIndex) => (
                      <li
                        key={tagIndex}
                        className="bg-secondary/20 text-primary rounded-full px-1.5 py-1 text-sm font-medium transition-colors duration-300"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Slider>

            {/* custom dots */}
            <div className="absolute -bottom-0 flex w-full justify-center gap-3">
              {WhatIDo.map((_, index) => (
                <button
                  key={index}
                  onClick={() => sliderRef.current?.slickGoTo(index)}
                  className={cn(
                    "size-3 rounded-full transition-all duration-300 ease-in-out",
                    current === index
                      ? "from-accent to-tertiary border-secondary scale-125 bg-gradient-to-r shadow-[0_0_3px_2.5px_var(--color-secondary)]"
                      : "bg-secondary/30",
                  )}
                ></button>
              ))}
            </div>
          </div>
        </Fade>
      </div>

      <div className="container mx-auto py-10">
        <Fade direction="up" duration={500} triggerOnce delay={300}>
          <div className="relative z-10 mb-4 text-center md:mb-16">
            <span className="text-secondary-text mb-4 block text-sm font-medium tracking-wider uppercase">
              Tools & Technologies
            </span>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              <span className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                Powered by Innovation
              </span>
            </h2>
            <p className="text-foreground/70 mx-auto max-w-2xl text-lg">
              Leveraging cutting-edge technologies to build exceptional digital
              experiences
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="flex items-center justify-center">
            <TechStack />
          </div>

          {/* Call to Action */}
          <div className="mt-16 items-center justify-center md:flex">
            <Link
              href="/projects"
              className="bg-primary text-background group flex items-center justify-center gap-2 rounded-full p-5 text-lg uppercase transition-all duration-300 md:inline-flex md:p-4"
            >
              See These in Action
              <ArrowRightIcon
                size={14}
                className="transition-transform duration-400 group-hover:translate-x-1.5 group-active:translate-x-2"
              />
            </Link>
          </div>
        </Fade>
      </div>
    </section>
  );
}
