import { useState, useEffect, useContext } from "react";
import { useDialog } from "../context/DialogContext";
import ThemeContext from "../context/ThemeContext";

export function useNavBarHeight() {
  const [navBarHeight, setNavBarHeight] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { openDialog } = useDialog();

  useEffect(() => {
    const updateNavBarHeight = () => {
      const navBar = document.querySelector(".nav-bar");
      const utilityBar = document.querySelector("dialog[open] .utility-bar");
      if (navBar) {
        const height = navBar.offsetHeight;
        setNavBarHeight(height);
        document.documentElement.style.setProperty(
          "--nav-bar-height",
          `${height}px`
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
  }, [theme]); // Re-run when theme changes

  return navBarHeight;
}
