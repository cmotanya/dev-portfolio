"use client";

import React from "react";
import { nav } from "../data/nav";
import Link from "next/link";
import Image from "next/image";
import { FileUser } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Fade } from "react-awesome-reveal";

const Header = () => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed top-0 left-1/2 z-50 w-full -translate-x-1/2 overflow-hidden p-4 shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out",
      )}
    >
      <div className="relative flex items-center justify-between">
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

        {/* Navigation */}
        <nav className="border-secondary/50 overflow-hidden rounded-full border p-1">
          <Fade direction="up" cascade duration={250} triggerOnce>
            <ul className="flex items-center justify-center gap-3">
              {nav.map((item, index) => {
                const active = pathname === item.link;
                return (
                  <li
                    key={item.name + index}
                    className={cn(
                      "hover:bg-secondary group cursor-pointer rounded-full transition-all duration-100 ease-in-out",
                      active
                        ? "hover:bg-secondary bg-primary text-xl hover:translate-y-0"
                        : "hover:-translate-y-1",
                    )}
                  >
                    <Link
                      href={item.link}
                      role="button"
                      className={cn(
                        "text-primary flex items-center gap-1 px-4 py-2.5 font-bold uppercase transition-colors duration-200",
                        active ? "text-background font-medium" : "",
                      )}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Fade>
        </nav>

        {/* Resume */}
        <Fade direction="right" duration={500} triggerOnce>
          <Link
            href="/resume"
            role="button"
            className="bg-primary text-background flex cursor-pointer justify-center gap-2 rounded-full px-4 py-3"
          >
            View Resume
            <FileUser />
          </Link>
        </Fade>
      </div>
    </header>
  );
};

export default Header;
