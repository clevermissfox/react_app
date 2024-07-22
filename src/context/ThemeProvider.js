import React, { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

const THEMES = {
  APPLE: "apple",
  MICROSOFT: "microsoft",
};


export default function ThemeProvider({ children }) {
  const [isAppleTheme, setIsAppleTheme] = useState(true); // Default to Apple theme
  const [theme, setTheme] = useState(THEMES.APPLE); // Initialize with Apple theme

  const toggleTheme = () => {
    setIsAppleTheme((prev) => !prev); // Toggle the theme state
  };

  useEffect(() => {
    // Add a slight delay before applying the new theme to allow for smooth transitions
    const newTheme = isAppleTheme ? THEMES.APPLE : THEMES.MICROSOFT;
    const timeoutId = setTimeout(() => {
      setTheme(newTheme);
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or theme change
  }, [isAppleTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // Set data-theme attribute
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, isAppleTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}