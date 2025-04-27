"use client";

import { BadgeCheckIcon, FileUser } from "lucide-react";
import React from "react"; // useEffect imported but not used, consider removing
import Image from "next/image";
import { about } from "../data/about-section";
import { Fade, Slide } from "react-awesome-reveal";
import Slider from "react-slick";

// Import slick-carousel CSS in your app/layout.tsx file (recommended)
// If you must import here, uncomment these:
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const settings = {
    dots: true,
    fade: true, // Use fade effect
    infinite: true, // Loop infinitely
    speed: 500, // Animation speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    waitForAnimate: false, // Don't wait for animation to finish before next slide (common with fade)
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay interval
    pauseOnHover: true, // Pause autoplay on hover
    arrows: true, // Show navigation arrows

    // Custom pagination dots styling
    appendDots: (dots: React.ReactNode[]) => (
      <div
        // Position dots below the slider content container
        style={{ position: "absolute", bottom: "-40px", width: "100%" }} // Adjusted bottom spacing
        className="flex justify-center" // Center dots horizontally
      >
        <ul className="m-0 flex justify-center gap-2 p-0"> {dots} </ul>{" "}
        {/* Ensure no default margin/padding */}
      </div>
    ),
    customPaging: () => (
      <div
        // Style for individual dots
        className="hover:bg-primary h-2 w-8 rounded-full bg-gray-300 transition-all duration-300 ease-in-out" // Added transition details
      ></div>
    ),
  };

  // useEffect is imported but not used in this component body.
  // If you don't need it, remove the import: React, { useEffect } -> React
  // useEffect(() => { /* your code */ }, []);

  return (
    <section
      id="about"
      // Increased max-width slightly, adjusted padding
      className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28"
    >
      {/* Main grid container for layout */}
      <div className="mb-16 grid gap-12 md:grid-cols-2 lg:gap-16">
        {" "}
        {/* Increased gap on larger screens */}
        {/* Left Column - Title and Slider */}
        <div>
          {/* Slide animation for the title */}
          <Slide direction="left" duration={300} triggerOnce>
            <div className="relative mb-10 flex items-center gap-4">
              {" "}
              {/* Adjusted margin-bottom */}
              {/* Icon container styling */}
              <div className="bg-secondary/10 flex-shrink-0 rounded-full p-3">
                {" "}
                {/* Made icon container round */}
                <FileUser size={32} className="text-secondary" />{" "}
                {/* Slightly smaller icon size to fit round container */}
              </div>
              {/* Section title styling */}
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                <span className="text-primary">About </span>
                <span className="relative">
                  Me
                  {/* Underline styling */}
                  <span className="bg-primary absolute right-0 -bottom-1 h-1 w-full rounded-full" />{" "}
                  {/* Kept underline, rounded ends */}
                </span>
              </h1>
            </div>
          </Slide>

          {/* Carousel Container with subtle styling */}
          {/* Wrapped slider in a div that provides the overall visual container style */}
          <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-xl dark:from-gray-800 dark:to-gray-900">
            {" "}
            {/* Adjusted padding, stronger shadow */}
            {/* Inner container to enforce aspect ratio and overflow */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              {" "}
              {/* Ensured full width, aspect ratio on inner div */}
              {/* The Slider component */}
              <Slider {...settings}>
                {/* Individual slide item wrapper */}
                {about.map((item, index) => (
                  // No extra classes on the slide item div itself, let Slider handle its dimensions/position
                  // Added key prop to the outer div for mapping
                  <div key={index}>
                    {/* Image styling */}
                    <Image
                      src={item.src}
                      alt={item.name}
                      // Make image take full height/width of the slide container
                      fill
                      // Priority for the first image for LCP
                      priority={index === 0}
                      // Adjusted sizes based on max-w-6xl container and grid layout
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" // More accurate sizes based on layout columns
                      className="rounded-lg object-cover object-center" // Image cover and centering, round corners
                    />
                    {/* Image Name Overlay */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                      {" "}
                      {/* Consistent padding */}
                      <span className="text-lg font-medium text-white">
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        {/* Right Column - Core About Content */}
        {/* Fade animation for the text content */}
        <Fade direction="right" delay={300} duration={500} triggerOnce>
          {/* Text container with consistent spacing */}
          <div className="text-textColor/90 space-y-8 pt-8 leading-relaxed md:pt-0">
            {" "}
            {/* Increased space-y, added top padding for smaller screens to align slightly */}
            {/* Lead paragraph styling */}
            <p className="text-lg leading-relaxed font-medium">
              My philosophy centers on building technology that truly serves
              people. This means prioritizing security from the ground up,
              designing systems that are intuitive and accessible, and ensuring
              the underlying infrastructure is solid and dependable.
            </p>
            {/* Standard paragraphs */}
            <p>
              I believe good technology should empower and protect, seamlessly
              integrating into users&apos; lives without adding unnecessary
              complexity.
            </p>
            {/* What I Do / Approach boxes container */}
            <div className="my-10 grid gap-8 md:gap-6">
              {" "}
              {/* Adjusted margin-top/bottom, refined gap */}
              {/* What I Do box */}
              <div className="bg-secondary/5 hover:bg-secondary/10 rounded-xl p-6 shadow-sm transition-all duration-300 ease-in-out">
                {" "}
                {/* Refined hover/transition */}
                {/* Box title with icon */}
                <h3 className="text-secondary mb-5 flex items-center gap-3 text-xl font-bold">
                  {" "}
                  {/* Adjusted text color, gap, bottom margin */}
                  <span className="bg-secondary/10 flex-shrink-0 rounded-full p-2">
                    {" "}
                    {/* Icon container size/shape */}
                    <BadgeCheckIcon className="text-secondary h-5 w-5" />{" "}
                    {/* Icon size/color */}
                  </span>
                  What I Do
                </h3>
                {/* What I Do list */}
                <ul className="space-y-4">
                  {" "}
                  {/* Consistent list item spacing */}
                  <li className="flex items-start gap-4">
                    {" "}
                    {/* Adjusted gap */}
                    <span className="text-secondary bg-secondary/10 mt-1 flex-shrink-0 rounded-full p-1.5">
                      {" "}
                      {/* Icon container padding/margin/shape */}
                      <BadgeCheckIcon className="h-4 w-4" /> {/* Icon size */}
                    </span>
                    <span>
                      Develop responsive and performant web applications with a
                      focus on user experience.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    {" "}
                    {/* Adjusted gap */}
                    <span className="text-secondary bg-secondary/10 mt-1 flex-shrink-0 rounded-full p-1.5">
                      {" "}
                      {/* Icon container padding/margin/shape */}
                      <BadgeCheckIcon className="h-4 w-4" /> {/* Icon size */}
                    </span>
                    <span>
                      Design, install, and configure robust security and
                      surveillance systems.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    {" "}
                    {/* Adjusted gap */}
                    <span className="text-secondary bg-secondary/10 mt-1 flex-shrink-0 rounded-full p-1.5">
                      {" "}
                      {/* Icon container padding/margin/shape */}
                      <BadgeCheckIcon className="h-4 w-4" /> {/* Icon size */}
                    </span>
                    <span>
                      Establish and maintain reliable network infrastructure for
                      seamless connectivity.
                    </span>
                  </li>
                </ul>
              </div>
              {/* My Approach box */}
              <div className="bg-primary/5 border-primary/10 hover:bg-primary/10 rounded-xl border p-6 shadow-sm transition-all duration-300 ease-in-out">
                {" "}
                {/* Added hover, transition, consistent shadow */}
                {/* Box title */}
                <h3 className="text-primary mb-5 flex items-center gap-3 text-xl font-bold">
                  {" "}
                  {/* Adjusted gap, bottom margin */}
                  <span className="bg-primary/10 flex-shrink-0 rounded-full p-2">
                    {" "}
                    {/* Icon container size/shape */}
                    <BadgeCheckIcon className="text-primary h-5 w-5" />{" "}
                    {/* Icon size/color */}
                  </span>
                  My Approach to Development
                </h3>
                {/* My Approach list */}
                <ul className="space-y-4">
                  {" "}
                  {/* Consistent list item spacing */}
                  <li className="flex items-start gap-4">
                    {" "}
                    {/* Adjusted gap */}
                    <span className="text-primary bg-primary/10 mt-1 flex-shrink-0 rounded-full p-1.5">
                      {" "}
                      {/* Icon container padding/margin/shape */}
                      <BadgeCheckIcon className="h-4 w-4" /> {/* Icon size */}
                    </span>
                    <span>
                      Prioritizing clear communication and understanding project
                      requirements thoroughly.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    {" "}
                    {/* Adjusted gap */}
                    <span className="text-primary bg-primary/10 mt-1 flex-shrink-0 rounded-full p-1.5">
                      {" "}
                      {/* Icon container padding/margin/shape */}
                      <BadgeCheckIcon className="h-4 w-4" /> {/* Icon size */}
                    </span>
                    <span>
                      Integrating security best practices into every stage of
                      development and implementation.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    {" "}
                    {/* Adjusted gap */}
                    <span className="text-primary bg-primary/10 mt-1 flex-shrink-0 rounded-full p-1.5">
                      {" "}
                      {/* Icon container padding/margin/shape */}
                      <BadgeCheckIcon className="h-4 w-4" /> {/* Icon size */}
                    </span>
                    <span>
                      Delivering solutions that are reliable, scalable, and easy
                      for users to manage.
                    </span>
                  </li>
                </ul>
              </div>
            </div>{" "}
            {/* End of boxes container */}
            {/* More standard paragraphs */}
            <p>
              Beyond specific projects, I maintain a keen interest in the
              evolving technology landscape. I actively explore new frameworks,
              read industry publications, and engage in personal labs or
              projects.
            </p>
            <p>
              This commitment to continuous learning ensures I can leverage the
              best tools and techniques to address future challenges and provide
              innovative solutions.
            </p>
            {/* Final paragraph */}
            <p>
              I value collaboration and am dedicated to finding the most
              effective solution for each unique situation. Every project is an
              opportunity to make a meaningful impact by solving problems and
              enhancing security, efficiency, or user experience.
            </p>
          </div>{" "}
          {/* End of Right Column */}
        </Fade>
      </div>{" "}
      {/* End of Main Grid */}
      {/* Get in Touch Button */}
      {/* Fade animation for the button */}
      <Fade direction="up" delay={400} duration={600} triggerOnce>
        <div className="mt-16 text-center">
          {" "}
          {/* Adjusted margin-top */}
          <button className="bg-primary hover:bg-primary/90 // Increased padding for a larger button // Increased font size // Standard shadows // Smooth transitions // Subtle lift and scale on hover inline-flex transform items-center justify-center gap-2 rounded-full px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
            Get in Touch
            {/* SVG Icon */}
            <svg
              className="h-6 w-6" // Increased icon size
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </Fade>
    </section>
  );
};

export default About;
