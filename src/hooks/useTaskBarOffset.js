import { useState, useEffect, useContext } from "react";
import { useDialog } from "../context/DialogContext";
import ThemeContext from "../context/ThemeContext";

export function useTaskBarOffset() {
  const [taskBarOffset, setTaskBarOffset] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { openDialog } = useDialog();

  useEffect(() => {
    const updateTaskBarOffset = () => {
      if (theme === "apple") {
        const taskBar = document.querySelector("footer:has(.taskbar)");
        if (taskBar) {
          const top = taskBar.offsetTop;
          setTaskBarOffset(top);

          document.documentElement.style.setProperty(
            "--apple-task-bar-offset",
            `${top}px`
          );
        }
      }
    };

    updateTaskBarOffset();
    window.addEventListener("resize", updateTaskBarOffset);

    return () => window.removeEventListener("resize", updateTaskBarOffset);
  }, [theme, openDialog]);
  return taskBarOffset;
}
