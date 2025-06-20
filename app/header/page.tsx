"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FileUser } from "lucide-react";
import { cn } from "@/lib/utils";
import { Fade } from "react-awesome-reveal";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";

const Header = () => {
  return (
    <header
      className={cn(
        "fixed top-0 left-1/2 z-50 w-full -translate-x-1/2 p-4 shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out",
      )}
    >
      <div className="relative items-center justify-between md:flex">
        <Fade direction="left" duration={500} triggerOnce>
          {/* Logo */}
          <Link href="/" role="button">
            <Image
              src="/avatar.png"
              alt="Cornelius Motanya"
              width={60}
              height={60}
              className="rounded-full object-cover object-center"
            />
          </Link>
        </Fade>

        {/* desktop navigation */}
        <DesktopNavigation />

        {/* Resume */}
        <Fade direction="right" duration={300} triggerOnce>
          <Link
            href="/resume"
            role="button"
            className="bg-primary group text-background hidden cursor-pointer items-center gap-2 rounded-full px-4 py-3 md:flex"
          >
            View Resume
            <FileUser className="transform transition-all duration-200 ease-out group-hover:-translate-y-1 group-active:-translate-y-1.5" />
          </Link>
        </Fade>

        {/* mobile navigation */}
        <div className="md:hidden">
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
