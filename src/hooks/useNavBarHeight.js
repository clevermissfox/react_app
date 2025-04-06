import { useState, useEffect, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export function useNavBarHeight() {
  const [navBarHeight, setNavBarHeight] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const updateNavBarHeight = () => {
      const navBar = document.querySelector(".nav-bar");
      const taskBar = document.querySelector("footer:has(.taskbar)");
      if (navBar) {
        const height = navBar.offsetHeight;
        setNavBarHeight(height);
        document.documentElement.style.setProperty(
          "--nav-bar-height",
          `${height}px`
        );
      }
      if (taskBar) {
        const top = taskBar.offsetTop;
        document.documentElement.style.setProperty(
          "--apple-task-bar-offset",
          `${top}px`
        );
      }
    };

    updateNavBarHeight();
    window.addEventListener("resize", updateNavBarHeight);

    return () => window.removeEventListener("resize", updateNavBarHeight);
  }, [theme]); // Re-run when theme changes

  return navBarHeight;
}
