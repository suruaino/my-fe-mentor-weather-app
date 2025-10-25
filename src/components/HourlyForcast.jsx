
import { useState, useEffect, useRef } from "react";
import styles from "./hourlyforcast.module.css";
import WeatherIcon from "./WeatherIcon.jsx";
import dropdownIcon from "/icons/icon-dropdown.svg";

const HourlyForcast = ({ hourlyData, hourlyUnits }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDayDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!hourlyData || !hourlyData.time) {
    return <p>Loading hourly forecast...</p>;
  }

  // Show 24 hours per day
  const start = selectedDay * 24;
  const end = start + 24;

  // Optional day names
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDaySelect = (index) => {
    setSelectedDay(index);
    setShowDayDropdown(false);
  };

  return (
    <div className="right bg-[var(--bg2)] w-full h-full md:h-[calc(100vh+16rem)] lg:h-screen xl:h-[calc(100vh-5.8rem)] md:w-[calc(100%/3)] p-4 xl:mb-3 flex flex-col gap-2 rounded-xl">
      {/* --- Header --- */}
      <div className="top h-[10%] flex justify-between items-center">
        <h2 className="min-w-[6.3rem] text-sm">Hourly Forecast</h2>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDayDropdown((prev) => !prev)}
            className="bg-[var(--bg3)] w-[7rem] py-[0.35rem] px-2 flex items-center justify-between rounded-lg"
          >
            <span className="text-sm">{days[selectedDay]}</span>
            <img src={dropdownIcon} alt="dropdown" className={`w-3 transition-transform ${showDayDropdown ? "rotate-180" : ""}`} />
          </button>
          {showDayDropdown && (
            <ul className="text-left p-[.5rem] absolute top-full right-0 mt-1 w-[10rem] bg-[var(--bg2)] border border-[var(--bg3)] rounded-lg shadow-lg shadow-black z-20">
              {days.map((day, index) => (
                <li
                  key={day}
                  onClick={() => handleDaySelect(index)}
                  className="p-2 cursor-pointer rounded-lg hover:bg-[var(--bg3)]"
                >
                  {day}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* --- Hourly forecast list --- */}
      <div
        className={`bottom h-[90%] flex flex-col justify-between gap-2 ${styles.bottom}`}
      >
        <ul className="h-full flex flex-col gap-2 overflow-y-auto">
          {hourlyData.time.slice(start, end).map((hour, i) => (
            <li
              key={hour}
              className="px-2 flex items-center justify-between text-sm"
            >
              <div  className="flex items-center gap-4">
              <WeatherIcon code={hourlyData.weathercode[start + i]} className="h-12 aspect-square"/>
              <span>
                {new Date(hour).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              </div>
              <span>{Math.round(hourlyData.temperature_2m[start + i])}{hourlyUnits?.temperature_2m}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HourlyForcast;
