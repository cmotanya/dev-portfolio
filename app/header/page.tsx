"use client";

import React, { useEffect, useState } from "react";
import { nav } from "../data/nav";
import Link from "next/link";
import Image from "next/image";
import { FileUser } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Fade } from "react-awesome-reveal";

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY > 10;
      setIsScrolled(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <nav>
          <ul className="flex items-center justify-center gap-3">
            {nav.map((item, index) => {
              const active = pathname === item.link;
              return (
                <Fade
                  direction="up"
                  cascade
                  delay={index * 100}
                  duration={500}
                  triggerOnce
                  key={item.name + index}
                >
                  <li
                    className={cn(
                      "hover:bg-accent-alt group cursor-pointer rounded-full transition-all duration-200 ease-in-out hover:-translate-y-1",
                      active
                        ? "bg-secondary hover:bg-secondary scale-105 hover:translate-y-0"
                        : "",
                    )}
                  >
                    <Link
                      href={item.link}
                      role="button"
                      className={cn(
                        "text-primary flex items-center gap-1 px-4 py-2.5 font-semibold tracking-wider uppercase transition-all",
                        active ? "text-background" : "",
                      )}
                    >
                      <span>{item.name}</span>
                      <span
                        className={cn(
                          "transition-transform duration-200 ease-in-out group-hover:rotate-5",
                          active ? "group-hover:rotate-0" : "",
                        )}
                      >
                        {item.icon}
                      </span>
                    </Link>
                  </li>
                </Fade>
              );
            })}
          </ul>
        </nav>

        {/* Resume */}
        <Fade direction="right" duration={500} triggerOnce>
          <button
            className={cn(
              "bg-primary border-secondary flex justify-center gap-2 rounded-full border px-3 py-2.5 text-base font-medium tracking-wider",
              isScrolled ? "text-accent-alt" : "text-accent-alt",
            )}
          >
            <Link href="/resume" role="button">
              View Resume
            </Link>
            <FileUser />
          </button>
        </Fade>
      </div>
    </header>
  );
};

export default Header;
