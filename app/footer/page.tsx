import React from "react";

const Footer = () => {
  return (
    <footer className="border-textColor/20 absolute bottom-2 left-1/2 w-full -translate-x-1/2 border-t pt-3 text-xs font-medium whitespace-nowrap text-gray-500">
      <div className="flex items-center justify-center">
        <span className="font-extrabold">{new Date().getFullYear()} </span> -
        Built with ❤️ using NextJS
      </div>
    </footer>
  );
};

export default Footer;
