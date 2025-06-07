"use client";

import { FileUser } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { about } from "../data/about";
import { Fade, Slide } from "react-awesome-reveal";
import Slider from "react-slick";
import { cn } from "@/lib/utils";
import Security from "@/components/security";
import WebDev from "@/components/web-dev";
import Link from "next/link";

const About = () => {
  const [activeTab, setActiveTab] = useState<"security" | "web">("security");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 1,
    fade: true,
    arrows: true,
    waitForAnimate: false,

    appendDots: (dots: React.ReactNode[]) => (
      <div
        style={{ position: "absolute", bottom: "-40px", width: "100%" }}
        className=""
      >
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),

    // Style for individual dots
    customPaging: () => (
      <div className="hover:bg-secondary [.slick-active_&]:before:bg-accent [.slick-active_&]:after:bg-secondary after:bg-accent before:bg-background/90 relative rounded-full p-2 transition-all duration-300 ease-in-out before:absolute before:top-1/2 before:left-1/2 before:z-40 before:size-[14px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:p-1 before:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-z-10 after:size-5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:content-[''] [.slick-active_&]:scale-110 [.slick-active_&]:after:scale-110"></div>
    ),
  };

  return (
    <section id="about" className="mx-auto max-w-4xl">
      {" "}
      <Slide direction="down" duration={300} triggerOnce>
        <div className="relative mb-12 flex items-center gap-4">
          {" "}
          <FileUser size={45} className="text-secondary shrink-0 rotate-12" />
          <h1 className="text-6xl font-bold tracking-tight whitespace-nowrap">
            <span className="text-secondary">About </span>
            <span className="relative">
              Me
              <span className="bg-secondary absolute right-0 bottom-0 h-1 w-full" />
            </span>
          </h1>
        </div>
      </Slide>
      <Fade delay={300} triggerOnce duration={400}>
        <div className="mb-8 aspect-auto h-[500px] overflow-hidden rounded-lg">
          {" "}
          <Slider {...settings}>
            {about.map((item, index) => (
              <div key={index} className="relative h-[450px]">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                  className="rounded-lg object-cover object-center"
                />

                <div className="absolute inset-0 flex items-end p-4">
                  {" "}
                  <span className="bg-primary rounded-full p-1.5 text-xs shadow-md">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Fade>
      {/* --- Core About Content --- */}
      <Fade direction="left" delay={500} duration={400} triggerOnce>
        <div className="text-textColor/90 space-y-8 leading-relaxed">
          {" "}
          <p>
            My philosophy centers on building technology that truly serves
            people. This means prioritizing security from the ground up,
            designing systems that are intuitive and accessible, and ensuring
            the underlying infrastructure is solid and dependable.
          </p>
          <p>
            Beyond specific projects, I maintain a keen interest in the evolving
            technology landscape. I actively explore new frameworks, read
            industry publications, and engage in personal labs or projects.
          </p>
        </div>
      </Fade>
      <div className="mt-8 text-center">
        {" "}
        <Slide direction="right" duration={400} triggerOnce>
          <div className="w-full">
            {" "}
            <div className="ring-secondary inline-flex items-center justify-center gap-4 rounded-lg p-0.5 ring-2">
              <button
                onClick={() => setActiveTab("security")}
                className={cn(
                  "hover:bg-secondary/50 cursor-pointer rounded-full px-4 py-2 transition-colors",
                  activeTab === "security" ? "bg-secondary" : "",
                )}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab("web")}
                className={cn(
                  "hover:bg-secondary/50 cursor-pointer rounded-full px-4 py-2 transition-colors",
                  activeTab === "web" ? "bg-secondary" : "",
                )}
              >
                Web Dev
              </button>
            </div>
          </div>{" "}
        </Slide>
        <div className="bg-accent my-4 mb-8 overflow-hidden rounded-md p-2">
          {activeTab === "security" ? <Security /> : <WebDev />}
        </div>
        <Slide direction="up" duration={500} triggerOnce>
          <div className="mt-18">
            <p className="text-justify">
              Looking for something specific? I create custom solutions for
              unique needs
            </p>
            <Link
              type="button"
              href={"/contact"}
              className="bg-button text-button-text inline-block rounded-full px-8 py-3 font-semibold transition-all duration-200 ease-in-out hover:-translate-y-1 md:font-normal"
            >
              {" "}
              Schedule a Consultation
            </Link>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default About;
