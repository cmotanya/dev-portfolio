"use client";

import React, { useEffect, useState } from "react";
import { nav } from "../data/nav";
import Link from "next/link";
import Image from "next/image";
import { FileUser } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
        "fixed top-0 left-1/2 z-50 w-full -translate-x-1/2 overflow-hidden shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-secondary/25 top-4 w-full rounded-full p-2.5 md:w-[90%]"
          : "top-0 w-full p-4",
      )}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/avatar.png"
            alt="Cornelius Motanya"
            width={60}
            height={60}
            className="rounded-full object-cover object-center"
          />
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center justify-center gap-3">
            {nav.map((item, index) => {
              const active = pathname === item.link;
              return (
                <li
                  key={item.name + index}
                  className={cn(
                    "cursor-pointer rounded-full transition-all duration-100 ease-in-out",
                    active ? "bg-secondary scale-105" : "",
                  )}
                >
                  <Link
                    href={item.link}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2.5 uppercase transition-all",
                      active ? "text-background" : "",
                    )}
                  >
                    {item.name} {item.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Resume */}
        <button className="border-secondary bg-secondary/60 flex justify-center gap-2 rounded-full border p-2.5">
          <Link href="/resume">View Resume</Link>
          <FileUser />
        </button>
      </div>
    </header>
  );
};

export default Header;
