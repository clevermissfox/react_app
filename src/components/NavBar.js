import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import BatteryStatusIcon from "./BatteryStatusIcon";

export default function NavBar() {
  const { theme } = useContext(ThemeContext);
  // const [isApple, setIsApple] = useState(theme === 'apple');
  const [date, setDate] = useState(getDate(theme));

  function getDate(theme) {
    const dates = new Date();
    const todaysDay= new Intl.DateTimeFormat(undefined, {weekday: 'short'}).format(dates);
    const todaysDate = dates.getDate();
    const todaysMonth = dates.getMonth() + 1;
    const todaysMon =  new Intl.DateTimeFormat(undefined, {month: 'short'}).format(dates);
    const todaysYear = dates.getFullYear();

    if (theme === 'apple') {
        // setDate(todaysDay + ' ' + todaysMon + ' ' + todaysDate)
        console.log('apple theme date')
        return todaysDay + ' ' + todaysMon + ' ' + todaysDate;
    } else {
        // setDate(todaysMonth + '/' + todaysDate + '/' + todaysYear)
        console.log('mic theme date')
        return todaysMonth + '/' + todaysDate + '/' + todaysYear;
    } 
}

function getTime() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    return time;
}


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
      <div className="nav-bar-tools row ai-cen gap-quarter">
        <div className="nav-bar-tool" aria-label="bluetooth">
          <img src="/assets/icons/generic/icon-generic_bluetooth.svg" alt="bluetooth icon" />
        </div>
        <div className="nav-bar-tool" aria-label="wifi">
          <img
            src="/assets/icons/generic/icon-generic_wifi.svg"
            alt="wifi icon"
          />
        </div>
        <BatteryStatusIcon />
        <ul className={`date xsmall gap-quarter ${theme === 'apple' ? 'row' : 'col'}`} role="list">
              {theme === 'microsoft' && <li data-time>{getTime()}</li>}
              <li data-date>{date}</li>
              {theme === 'apple' && <li data-time>{getTime()}</li>}
          </ul>
      </div>
    </nav>
  );
}
