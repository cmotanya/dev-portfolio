"use client";

import React, { useState } from "react";
import { nav } from "../data/nav";
import Link from "next/link";
import Image from "next/image";
import { socials } from "../data/socials";
import { ChevronRight } from "lucide-react";
import MenuToggleButton from "../menu-toggle-button";
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
          className="fixed inset-0 z-10 bg-gray-300/50 backdrop-blur-[1px]"
        />
      )}

      <header
        className={cn(
          "fixed z-30 flex h-dvh w-[60%] flex-col shadow-md backdrop-blur-md transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Profile section */}
        <div className="mx-3 my-6 flex items-center gap-3 border-b pb-4">
          <Image
            src="/avatar.jpg"
            alt="Cornelius Motanya"
            width={64}
            height={64}
            className="size-16 rounded-full border-2 border-blue-500 object-cover object-center"
          />

          <div className="flex flex-col">
            <h1
              className={cn(
                "mt-4 text-2xl font-bold text-gray-800 uppercase",
                caveat.className,
              )}
            >
              Cornelius
            </h1>
            <p className="-mt-1 text-sm text-gray-500">Web Developer</p>
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
                        "flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-gray-100",
                        isActive && "bg-primary/20",
                      )}
                    >
                      <span className="text-primary">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social links */}
          <div className="mb-6 border-b pb-8">
            <h2 className="text-textColor/70 mb-3 font-bold">
              Connect with Me
            </h2>
            <div className="inline-block space-y-3">
              {socials.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={handleCloseMenu}
                  className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200"
                >
                  <span>{item.icon}</span>
                  <span className="text-gray-700">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Resume button */}
          <button
            onClick={handleResumeClick}
            className="hover:bg-primary/50 bg-primary absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-center gap-1 self-start rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors"
          >
            Read Resume <ChevronRight className="size-2" />
          </button>
        </div>
      </header>

      <MenuToggleButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default Header;
