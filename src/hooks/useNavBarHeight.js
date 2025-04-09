import { useState, useEffect, useContext } from "react";
import { useDialog } from "../context/DialogContext";
import ThemeContext from "../context/ThemeContext";

export function useNavBarHeight() {
  const [navBarHeight, setNavBarHeight] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { openDialog } = useDialog();

  useEffect(() => {
    const updateNavBarHeight = () => {
      console.log("update nav bar height hook");
      const navBar = document.querySelector(".nav-bar");
      const taskBar = document.querySelector("footer:has(.taskbar)");
      const utilityBar = document.querySelector("dialog[open] .utility-bar");
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

      if (utilityBar) {
        const height = utilityBar.offsetHeight;
        document.documentElement.style.setProperty(
          "--utility-bar-height",
          `${height}px`
        );
      }
    };

    updateNavBarHeight();
    window.addEventListener("resize", updateNavBarHeight);

    return () => window.removeEventListener("resize", updateNavBarHeight);
  }, [theme, openDialog]); // Re-run when theme changes

  return navBarHeight;
}
