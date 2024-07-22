import React, { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

const THEMES = {
  APPLE: "apple",
  MICROSOFT: "microsoft",
};

export default function ThemeProvider({ children }) {
  const [isAppleTheme, setIsAppleTheme] = useState(true); // Default to Apple theme

  const toggleTheme = () => {
    setIsAppleTheme((prev) => !prev); // Toggle the theme
  };

  // Derive the theme based on isAppleTheme
  const theme = isAppleTheme ? THEMES.APPLE : THEMES.MICROSOFT;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // Set data-theme attribute
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, isAppleTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
