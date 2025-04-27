"use client";

import { FileUser } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { about } from "../data/about";
import { Fade, Slide } from "react-awesome-reveal";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Security from "@/components/security";
import WebDev from "@/components/web-dev";

const About = () => {
  const [activeTab, setActiveTab] = useState<"security" | "web">("security");

  const router = useRouter();

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
      <div className="hover:bg-secondary bg-secondary [.slick-active_&]:bg-primary size-3 rounded-full p-2 transition-all duration-300 ease-in-out"></div>
    ),
  };

  return (
    <section id="about" className="mx-auto max-w-4xl py-16 md:px-12 md:py-24">
      {" "}
      <Slide direction="down" duration={300} triggerOnce>
        <div className="relative mb-12 flex items-center gap-4">
          {" "}
          <FileUser size={45} className="text-secondary shrink-0 rotate-12" />
          <h1 className="text-6xl font-bold tracking-tight whitespace-nowrap">
            <span className="text-primary">About </span>
            <span className="relative">
              Me
              <span className="bg-primary absolute right-0 bottom-0 h-1 w-full" />
            </span>
          </h1>
        </div>
      </Slide>
      <Fade delay={300} triggerOnce duration={400}>
        <div className="relative mb-8 aspect-auto h-[300px] overflow-hidden rounded-lg">
          {" "}
          <Slider {...settings}>
            {about.map((item, index) => (
              <div key={index} className="h-[250px]">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                  className="rounded-lg object-cover object-center"
                />

                <div className="absolute inset-0 flex items-end p-4">
                  {" "}
                  <span className="rounded-full bg-stone-700 px-3 py-1 text-sm font-medium text-white shadow-md">
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
            <div className="bg-primary/20 inline-flex items-center justify-center gap-4 rounded-full p-1.5 font-medium">
              <button
                onClick={() => setActiveTab("security")}
                className={cn(
                  "hover:bg-primary/20 hover:text-primary rounded-full px-4 py-2 transition-colors",
                  activeTab === "security" ? "bg-primary text-white" : "",
                )}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab("web")}
                className={cn(
                  "hover:bg-primary/20 hover:text-primary rounded-full px-4 py-2 transition-colors",
                  activeTab === "web" ? "bg-primary text-white" : "",
                )}
              >
                Web Dev
              </button>
            </div>
          </div>{" "}
        </Slide>
        <div className="bg-secondary/15 my-4 mb-8 overflow-hidden rounded-md p-2">
          {activeTab === "security" ? <Security /> : <WebDev />}
        </div>
        <Slide direction="up" duration={500} triggerOnce>
          <div>
            <p className="text-justify">
              Looking for something specific? I create custom solutions for
              unique needs
            </p>
            <button
              onClick={() => router.push("/contact")}
              className="bg-primary hover:bg-primary/90 inline-block rounded-full px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl active:scale-105"
            >
              {" "}
              Schedule a Consultation
            </button>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default About;
