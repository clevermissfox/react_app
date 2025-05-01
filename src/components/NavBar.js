import { useContext, useEffect, useRef, useState } from "react";
import { useDialog } from "../context/DialogContext";
import ThemeContext from "../context/ThemeContext";
import BatteryStatusIcon from "./BatteryStatusIcon";

export default function NavBar({ appIcons, fetchPortfolioData }) {
  const { theme } = useContext(ThemeContext);
  const { dialogs, openDialog, toggleMinimizeDialog } = useDialog();
  const portfolioItemDialog = dialogs["portfolio-item"];
  const startContextMenuPopoverRef = useRef();
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

  function closePopover() {
    startContextMenuPopoverRef.current?.hidePopover();
  }

  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      setTime(getTime());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  // Filter minimized dialogs and map to their appIcons
  const minimizedDialogs = Object.entries(dialogs)
    .filter(([id, dialog]) => dialog.isMinimized)
    .map(([id]) => {
      // Find matching app icon by dialogId
      return appIcons.find((icon) => icon.dialogId === id);
    })
    .filter(Boolean); // Remove undefined if no icon found

  function handleDialogToggle(dialogId) {
    const dialog = dialogs[dialogId];
    if (dialogId === "portfolio") {
      // Fetch portfolio data before opening/restoring portfolio dialog
      fetchPortfolioData();
    }

    if (!dialog?.isOpen) {
      openDialog(dialogId);
    } else if (dialog.isMinimized) {
      toggleMinimizeDialog(dialogId); // Restore
    } else {
      toggleMinimizeDialog(dialogId); // Minimize or toggle
    }

    closePopover();
  }

  return (
    <nav className="nav-bar">
      <div className="start-menu">
        <button
          type="button"
          className="start-btn"
          aria-label={
            theme === "apple" ? "Apple Start Menu" : "Windows Start Menu"
          }
          popovertarget="start-menu-context"
        ></button>
        <div
          id="start-menu-context"
          popover="auto"
          ref={startContextMenuPopoverRef}
        >
          <ul className="start-menu-context-list">
            <li className="start-menu-context-item">
              <button onClick={() => handleDialogToggle("portfolio")}>
                View Portfolio
              </button>
            </li>
            <li className="start-menu-context-item">
              <button onClick={() => handleDialogToggle("quote")}>
                Request a Quote
              </button>
            </li>
            <li className="start-menu-context-item">
              <button onClick={() => handleDialogToggle("calendar")}>
                Book Free Consult
              </button>
            </li>
            <li className="start-menu-context-item">
              <a
                href="mailto:connect@edicodesigns.com"
                target="_blank"
                onClick={() => {
                  closePopover();
                }}
              >
                Email Me
              </a>
            </li>
            <li className="start-menu-context-item">
              <button onClick={() => handleDialogToggle("contact")}>
                Contact Form
              </button>
            </li>
          </ul>
        </div>
      </div>
      {theme === "microsoft" && (
        <div className="taskbar">
          {minimizedDialogs.length > 0 &&
            minimizedDialogs.map((icon) => (
              <button
                key={icon.dialogId}
                type="button"
                className={icon.classes}
                style={{ width: "1.5em", height: "1.5em" }}
                title={icon.name}
                aria-label={icon.name}
                onClick={() => toggleMinimizeDialog(icon.dialogId)} // Restore dialog
              >
                <img
                  className={icon.imgClasses}
                  src={icon.imgSrc}
                  alt={`${icon.name} icon`}
                />
              </button>
            ))}
          {portfolioItemDialog?.isMinimized && (
            <button
              type="button"
              className="portfolio-item-taskbar-btn"
              style={{ width: "1.5em", height: "1.5em" }}
              title="Portfolio Item"
              aria-label="Restore Portfolio Item"
              onClick={() => toggleMinimizeDialog("portfolio-item")}
            >
              {/* Use a generic portfolio icon or thumbnail */}
              <img
                src="/assets/icons/microsoft/icon-windows_folder-open.svg" // or any icon you prefer
                alt="Portfolio Item"
              />
            </button>
          )}
          {/* <button type="button">
            <img
              src="/assets/icons/microsoft/icon-windows_chrome-logo.svg"
              alt=""
            />
          </button>
          <button type="button">
            <img
              src="/assets/icons/microsoft/icon-windows_chrome-logo.svg"
              alt=""
            />
          </button>
          <button type="button">
            <img
              src="/assets/icons/microsoft/icon-windows_chrome-logo.svg"
              alt=""
            />
          </button>
          <button type="button">
            <img
              src="/assets/icons/microsoft/icon-windows_chrome-logo.svg"
              alt=""
            />
          </button> */}
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
        >
          {theme === "microsoft" && <li data-time>{time}</li>}
          <li data-date>{date}</li>
          {theme === "apple" && <li data-time>{time}</li>}
        </ul>
      </div>
    </nav>
  );
}
