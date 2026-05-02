import React, { useState, useEffect, useRef } from "react";
import ThemeContext from "./ThemeContext";

const THEMES = {
  APPLE: "apple",
  MICROSOFT: "microsoft",
};

const STORAGE_KEY = "preferred-theme";

export default function ThemeProvider({ children }) {
  const timeoutRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      return savedTheme === THEMES.MICROSOFT ? THEMES.MICROSOFT : THEMES.APPLE;
    } catch {
      return THEMES.APPLE;
    }
  });

  const isAppleTheme = theme === THEMES.APPLE;

  const toggleTheme = () => {
    const nextTheme = theme === THEMES.APPLE ? THEMES.MICROSOFT : THEMES.APPLE;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setTheme(nextTheme);
      timeoutRef.current = null;
    }, 100);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      console.error("Failed to save theme preference to localStorage.");
    }
  }, [theme]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isAppleTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
