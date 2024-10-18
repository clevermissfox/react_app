import { useState, useEffect } from "react";

const getBatteryIconClass = (isCharging, level) => {
  if (isCharging) return "fa-battery-bolt";

  const levels = [
    { threshold: 0.1, icon: "fa-battery-slash" },
    { threshold: 0.25, icon: "fa-battery-quarter" },
    { threshold: 0.5, icon: "fa-battery-half" },
    { threshold: 0.75, icon: "fa-battery-three-quarters" },
    { threshold: 1, icon: "fa-battery-full" },
  ];

  return levels.find((l) => level <= l.threshold)?.icon || "fa-battery-full";
};

const BatteryStatusIcon = () => {
  const [batteryHTML, setBatteryHTML] = useState(
    '<i class="fa-solid fa-battery-full fa-sm"></i>'
  );
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    let battery;

    const updateBatteryIcon = () => {
      const iconClass = getBatteryIconClass(battery.charging, battery.level);
      const levelPercentage = Math.round(battery.level * 100);

      setBatteryLevel(levelPercentage);
      setBatteryHTML(`<i class="fa-solid ${iconClass} fa-sm"></i>`);
    };

    const getBattery = async () => {
      try {
        battery = await navigator.getBattery();
        updateBatteryIcon();

        battery.addEventListener("chargingchange", updateBatteryIcon);
        battery.addEventListener("levelchange", updateBatteryIcon);
      } catch (error) {
        console.error("Error accessing battery information:", error);
        setBatteryHTML('<i class="fa-solid fa-battery-exclamation fa-sm"></i>'); // Fallback icon
      }
    };

    getBattery();

    return () => {
      if (battery) {
        battery.removeEventListener("chargingchange", updateBatteryIcon);
        battery.removeEventListener("levelchange", updateBatteryIcon);
      }
    };
  }, []);

  return (
    <div
      title={
        batteryLevel !== null
          ? `${batteryLevel}%`
          : "Battery status unavailable"
      }
      dangerouslySetInnerHTML={{ __html: batteryHTML }}
    />
  );
};

export default BatteryStatusIcon;
