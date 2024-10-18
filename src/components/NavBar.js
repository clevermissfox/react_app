import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import BatteryStatusIcon from "./BatteryStatusIcon";

export default function NavBar() {
  const { theme } = useContext(ThemeContext);
  // const [isApple, setIsApple] = useState(theme === 'apple');
  // Initialize both date and time with their current values
  const [date, setDate] = useState(() => getDate(theme));
  const [time, setTime] = useState(getTime);

  function getDate(theme) {
    const dates = new Date();
    const todaysDay = new Intl.DateTimeFormat(undefined, {
      weekday: "short",
    }).format(dates);
    const todaysDate = dates.getDate();
    const todaysMonth = dates.getMonth() + 1;
    const todaysMon = new Intl.DateTimeFormat(undefined, {
      month: "short",
    }).format(dates);
    const todaysYear = dates.getFullYear();

    if (theme === "apple") {
      return todaysDay + " " + todaysMon + " " + todaysDate;
    } else {
      return todaysMonth + "/" + todaysDate + "/" + todaysYear;
    }
  }

  useEffect(() => {
    // Update date when theme changes
    setDate(getDate(theme));

    // Optional: Set up an interval to update the date every minute
    const intervalId = setInterval(() => {
      setDate(getDate(theme));
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup function to clear the interval when the component unmounts or theme changes
    return () => clearInterval(intervalId);
  }, [theme]); // Dependency array includes theme

  function getTime() {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  }

  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      setTime(getTime());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <nav className="nav-bar">
      <div className="start-menu">
        <button
          className="start-btn"
          aria-label={
            theme === "apple" ? "Apple Start Menu" : "Windows Start Menu"
          }
        ></button>
      </div>
      {theme === "microsoft" && (
        <div className="taskbar">
          <button>
            <img
              src="/assets/icons/apple/application-icons/icon-apple_photos-logo.webp"
              alt=""
            />
          </button>
          <button>
            <img
              src="/assets/icons/apple/application-icons/icon-apple_photos-logo.webp"
              alt=""
            />
          </button>
          <button>
            <img
              src="/assets/icons/apple/application-icons/icon-apple_photos-logo.webp"
              alt=""
            />
          </button>
          <button>
            <img
              src="/assets/icons/apple/application-icons/icon-apple_photos-logo.webp"
              alt=""
            />
          </button>
        </div>
      )}
      <div className="nav-bar-tools row ai-cen gap-quarter">
        <div className="nav-bar-tool" aria-label="bluetooth">
          <img
            src="/assets/icons/generic/icon-generic_bluetooth.svg"
            alt="bluetooth icon"
          />
        </div>
        <div className="nav-bar-tool" aria-label="wifi">
          <img
            src="/assets/icons/generic/icon-generic_wifi.svg"
            alt="wifi icon"
          />
        </div>
        <BatteryStatusIcon />
        <ul
          className={`date xsmall gap-quarter ${
            theme === "apple" ? "row" : "col"
          }`}
          role="list"
        >
          {theme === "microsoft" && <li data-time>{time}</li>}
          <li data-date>{date}</li>
          {theme === "apple" && <li data-time>{time}</li>}
        </ul>
      </div>
    </nav>
  );
}
