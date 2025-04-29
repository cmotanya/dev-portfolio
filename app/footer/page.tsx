import { Dot } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary w-full py-[1.3rem_0.4rem] text-sm font-medium whitespace-nowrap">
      <p className="flex items-center justify-center">
        <span>{new Date().getFullYear()}</span>
        <Dot />
        <span>Built with ❤️ using NextJS and Tailwind</span>
      </p>
    </footer>
  );
};

export default Footer;
