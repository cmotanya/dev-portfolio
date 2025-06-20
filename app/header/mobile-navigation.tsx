"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { navigationLinks } from "../data/nav";
import { Fade } from "react-awesome-reveal";
import { cn } from "@/lib/utils";
import { FileUser, Mail, Map, PhoneIcon } from "lucide-react";
import HamburgerMenu from "./mobile-hamburger";

const MobileNavigation = () => {
  const [activeLink, setActiveLink] = useState(navigationLinks[0].link);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClick = (href: string) => {
    setActiveLink(href);
    setIsOpen(false);
    router.push(href);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      aria-label="mobile navigation"
      className="relative md:hidden"
    >
      {/* Hamburger button */}
      <div className="fixed top-10 right-3 -translate-y-1/2">
        <Fade direction="right" duration={300}>
          <HamburgerMenu onclick={toggleMenu} isOpen={isOpen} />
        </Fade>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="inset-0 min-h-dvh pt-[20%] backdrop-blur-lg">
          <Fade direction="up" cascade duration={300} damping={0.15}>
            <ul className="w-full space-y-4 px-6">
              {navigationLinks.map((item) => (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    onClick={() => handleClick(item.link)}
                    className={cn(
                      "block rounded-full p-4 font-medium transition-colors",
                      activeLink === item.link
                        ? "bg-primary text-white"
                        : "bg-secondary/20 hover:bg-secondary",
                    )}
                  >
                    <span className="flex items-center gap-4 text-2xl uppercase">
                      {item.icon}
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Fade>

          {/* Contact Section */}
          <div className="absolute bottom-18 w-full overflow-hidden rounded-t-lg bg-gray-100 p-6">
            <Fade
              direction="down"
              duration={300}
              delay={400}
              damping={0.15}
              triggerOnce
            >
              <h2 className="from-accent via-tertiary to-secondary mb-4 bg-gradient-to-r bg-clip-text text-4xl leading-tight font-bold tracking-tight text-transparent uppercase">
                Contact Me
              </h2>
              <ul className="text-primary-text/70 space-y-3 text-base font-bold">
                <li className="flex items-center">
                  <Mail className="text-tertiary mr-3" />
                  <a
                    href="mailto:motanyac@gmail.com"
                    className="lowercase hover:underline"
                  >
                    motanyac@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <PhoneIcon className="text-tertiary mr-3" />
                  <a href="tel:+254712909475" className="hover:underline">
                    (+254) 712-909-475
                  </a>
                </li>
                <li className="flex items-center capitalize">
                  <Map className="text-tertiary mr-3" />
                  <span>Mombasa, Kenya</span>
                </li>
              </ul>
            </Fade>

            {/* view resume */}
            <Fade direction="up" duration={300} delay={600} triggerOnce>
              <Link
                href="/resume"
                role="button"
                className="bg-primary text-background mt-10 flex items-center cursor-pointer justify-center gap-2 rounded-full p-4 text-2xl uppercase"
              >
                View Resume
                <FileUser />
              </Link>
            </Fade>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavigation;
