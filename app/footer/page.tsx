import { Dot } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary absolute bottom-12 left-1/2 w-full -translate-x-1/2 pt-3 text-sm font-medium whitespace-nowrap">
      <p className="flex items-center justify-center">
        <span>{new Date().getFullYear()}</span>
        <Dot />
        Built with ❤️ using NextJS and Tailwind
      </p>
    </footer>
  );
};

export default Footer;
