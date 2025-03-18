import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
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
        className="border-primary fixed right-4 bottom-6 z-20 rounded-full border p-2 backdrop-blur-lg"
      >
        {isMenuOpen ? (
          <PanelRightOpen className="text-red-500" />
        ) : (
          <PanelLeftOpen className="text-primary" />
        )}
      </button>
    </>
  );
};

export default MenuToggleButton;
