import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function

  return (
    <div className="theme-toggle">
      <label>
        <input
          type="checkbox"
          className="visually-hidden"
          checked={theme === "apple"} // Check if the current theme is 'apple'
          onChange={toggleTheme} // Toggle the theme on change
          aria-label={`Current Theme: ${
            theme === "apple" ? "Apple oS" : "Microsoft oS"
          }`}
        />
        <div
          className="theme-img-wrapper theme-img-wrapper-apple"
          aria-pressed={theme === "apple" ? true : undefined} // use simple ternery; if its undefined the attr wont be rendered to the DOM
        ></div>
        <div
          className="theme-img-wrapper theme-img-wrapper-microsoft"
          {...(theme === "microsoft" ? { "aria-pressed": "true" } : {})} // Conditionally spread the attribute
        ></div>
      </label>
    </div>
  );
};

export default ThemeToggle;
