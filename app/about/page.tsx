"use client";

import { BadgeCheckIcon, FileUser } from "lucide-react";
import React from "react";
import Image from "next/image";
import { about } from "../data/about";
import { Fade, Slide } from "react-awesome-reveal";
import Slider from "react-slick";
import { useRouter } from "next/navigation";

const About = () => {
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

  const router = useRouter();

  return (
    <section id="about" className="mx-auto max-w-4xl py-16 md:px-12 md:py-24">
      {" "}
      <Slide direction="down" duration={200} triggerOnce>
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
      <Fade delay={300} triggerOnce duration={500}>
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
      <Fade direction="left" delay={300} duration={500} triggerOnce>
        <div className="text-textColor/90 space-y-8 leading-relaxed">
          {" "}
          <p>
            My philosophy centers on building technology that truly serves
            people. This means prioritizing security from the ground up,
            designing systems that are intuitive and accessible, and ensuring
            the underlying infrastructure is solid and dependable. I believe
            good technology should empower and protect, seamlessly integrating
            into users&apos; lives without adding unnecessary complexity.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {" "}
            <div className="bg-secondary/5 rounded-lg p-6">
              {" "}
              <h3 className="text-primary mb-4 text-xl font-bold">
                What I Do
              </h3>{" "}
              <ul className="space-y-3">
                {" "}
                <li className="flex items-start gap-3">
                  {" "}
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <BadgeCheckIcon />
                  </span>{" "}
                  <span>
                    Develop responsive and performant web applications with a
                    focus on user experience.
                  </span>{" "}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <BadgeCheckIcon />
                  </span>{" "}
                  <span>
                    Design, install, and configure robust security and
                    surveillance systems.
                  </span>{" "}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <BadgeCheckIcon />
                  </span>{" "}
                  <span>
                    Establish and maintain reliable network infrastructure for
                    seamless connectivity.
                  </span>{" "}
                </li>
              </ul>
            </div>
            <div className="bg-secondary/5 rounded-lg p-6">
              {" "}
              <h3 className="text-primary mb-4 text-xl font-bold">
                My Approach to Development
              </h3>{" "}
              <ul className="space-y-3">
                {" "}
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <BadgeCheckIcon />
                  </span>{" "}
                  <span>
                    Prioritizing clear communication and understanding project
                    requirements thoroughly.
                  </span>{" "}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <BadgeCheckIcon />
                  </span>{" "}
                  <span>
                    Integrating security best practices into every stage of
                    development and implementation.
                  </span>{" "}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary flex-shrink-0 rounded-full">
                    {" "}
                    <BadgeCheckIcon />
                  </span>{" "}
                  <span>
                    Delivering solutions that are reliable, scalable, and easy
                    for users to manage.
                  </span>{" "}
                </li>
              </ul>
            </div>
          </div>
          <p>
            Beyond specific projects, I maintain a keen interest in the evolving
            technology landscape. I actively explore new frameworks, read
            industry publications, and engage in personal labs or projects.
          </p>
          <p>
            This commitment to continuous learning ensures I can leverage the
            best tools and techniques to address future challenges and provide
            innovative solutions.
          </p>
          <p>
            I value collaboration and am dedicated to finding the most effective
            solution for each unique situation. Every project is an opportunity
            to make a meaningful impact by solving problems and enhancing
            security, efficiency, or user experience.
          </p>
        </div>
      </Fade>
      <Slide direction="up" duration={300} triggerOnce>
        <div className="mt-12 text-center">
          {" "}
          <button
            onClick={() => router.push("/contact")}
            className="bg-primary hover:bg-primary/90 inline-block rounded-full px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl active:scale-105"
          >
            {" "}
            Get in Touch
          </button>
        </div>
      </Slide>
    </section>
  );
};

export default About;
