import { Heart } from "lucide-react";
import React from "react";

/**
 * Footer component for the website.
 *
 * This component renders a simple footer with the copyright symbol
 * and the current year, as well as a message indicating that the site
 * was built with NextJS and Tailwind.
 *
 */
const Footer = () => {
  return (
    <footer className="bg-secondary mx-auto w-full max-w-4xl">
      <div className="flex flex-col items-center justify-between gap-2 p-3 text-sm">
        <div className="flex items-center space-x-2">
          <span className="font-medium">© {new Date().getFullYear()}</span>
          <span>All rights reserved</span>
        </div>

        <div className="flex items-center">
          <span className="mr-2">Built with</span>
          <Heart className="animate-pulse fill-red-500 text-red-300" />
          <span className="ml-2">using NextJS and Tailwind</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
