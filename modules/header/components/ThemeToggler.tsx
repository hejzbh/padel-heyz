"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { LuSun } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";

const ThemeToggler = ({ className = "" }: { className?: string }) => {
  const { toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={"Change theme"}
      className={`p-1 cursor-pointer transition active:opacity-50 text-text-secondary text-2xl md:text-3xl hover:md:opacity-60 ${className}`}
    >
      {theme === "light" ? <FaMoon /> : <LuSun />}
    </button>
  );
};

export default ThemeToggler;
