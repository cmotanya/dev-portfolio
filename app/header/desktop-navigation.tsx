import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { navigationLinks } from "../data/nav";
import { usePathname } from "next/navigation";
import { Fade } from "react-awesome-reveal";

const DesktopNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="border-secondary/50 hidden overflow-hidden rounded-full border p-1 md:block">
      <Fade direction="up" cascade duration={250} triggerOnce>
        <ul className="flex items-center justify-center gap-3">
          {navigationLinks.map((item, index) => {
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
  );
};

export default DesktopNavigation;
