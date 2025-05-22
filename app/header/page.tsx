"use client";

import React, { useState } from "react";
import { nav } from "../data/nav";
import Link from "next/link";
import Image from "next/image";
import { socials } from "../data/socials";
import { ChevronRight, Sun } from "lucide-react";
import MenuToggleButton from "../../components/menu-toggle-button";
import { cn } from "@/lib/utils";
import { caveat } from "../data/font";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleResumeClick = () => {
    setIsMenuOpen(false);
    router.push("/resume");
  };

  return (
    <>
      {/* Background overlay */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          aria-hidden="true"
          className="bg-background/30 fixed inset-0 z-10 h-screen backdrop-blur-[1.5px]"
        />
      )}

      <header
        className={cn(
          "fixed z-[999] flex h-screen w-[80%] flex-col overflow-hidden shadow-md backdrop-blur-md transition-transform duration-300 ease-in-out md:w-[20%]",
          isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Profile section */}
        <div className="mx-3 my-6 flex items-center gap-3 border-b pb-4">
          <Image
            src="/avatar.jpg"
            alt="Cornelius Motanya"
            width={64}
            height={64}
            className="border-secondary size-16 rounded-full border-2 object-cover object-center"
          />

          <div className="flex flex-col">
            <h1
              className={cn(
                "mt-4 text-2xl font-semibold uppercase",
                caveat.className,
              )}
            >
              Cornelius
            </h1>
            <p className="text-accent -mt-1 text-sm">Web Developer</p>
          </div>
        </div>

        <div className="p-4">
          {/* Navigation menu */}
          <nav className="mb-6">
            <ul className="space-y-2">
              {nav.map((item) => {
                const isActive = pathname === item.link;

                return (
                  <li key={item.link}>
                    <Link
                      href={item.link}
                      onClick={handleCloseMenu}
                      className={cn(
                        "hover:bg-primary flex items-center gap-3 rounded-md px-3 py-2 transition-colors duration-150 ease-in-out",
                        isActive && "bg-primary/50",
                      )}
                    >
                      <span className="text-accent">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social links */}
          <div className="mb-6 pb-8">
            <h2 className="mb-3">Connect with Me</h2>
            <div className="inline-block space-y-3">
              {socials.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={handleCloseMenu}
                  className="bg-primary flex items-center gap-2 rounded-full px-3 py-1 text-sm transition-all duration-150 ease-in-out hover:-translate-y-0.5"
                >
                  <span>{item.icon}</span>
                  <span className="text-xs-sm">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Resume button */}
            <button
              onClick={handleResumeClick}
              className="hover:bg-primary/50 bg-primary flex items-center justify-center gap-1 self-start rounded-full border px-3 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors"
            >
              Read Resume <ChevronRight className="size-2" />
            </button>

            <span>
              <Sun />
            </span>
          </div>
        </div>
      </header>

      <MenuToggleButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default Header;
