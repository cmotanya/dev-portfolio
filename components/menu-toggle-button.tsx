import { cn } from "@/lib/utils";
import { LayoutGrid, X } from "lucide-react";
import React from "react";

type ButtonProps = {
  toggleMenu: () => void;
  isMenuOpen: boolean;
};

const MenuToggleButton: React.FC<ButtonProps> = ({
  toggleMenu,
  isMenuOpen,
}) => {
  return (
    <>
      <button
        onClick={toggleMenu}
        className={cn(
          "border-primary bg-secondary fixed right-4 bottom-[4rem] z-[9999] rounded-full border-2 p-2 md:hidden",
          isMenuOpen ? "border-red-500" : "border-primary",
        )}
      >
        {isMenuOpen ? (
          <X className="text-red-500" />
        ) : (
          <LayoutGrid className="text-primary" />
        )}
      </button>
    </>
  );
};

export default MenuToggleButton;
