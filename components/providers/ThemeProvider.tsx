"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<any>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={
        { theme, toggleTheme } as {
          theme: "dark" | "light";
          toggleTheme: () => void;
        }
      }
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () =>
  useContext(ThemeContext) as {
    theme: "dark" | "light";
    toggleTheme: () => void;
  };

export { ThemeProvider, useTheme };
