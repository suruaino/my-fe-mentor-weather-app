
import { useState } from "react";
import styles from "./hourlyforcast.module.css";
import WeatherIcon from "./WeatherIcon.jsx";

const HourlyForcast = ({ hourlyData, hourlyUnits }) => {
  const [selectedDay, setSelectedDay] = useState(0);

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

  return (
    <div className="right bg-[var(--bg2)] w-full h-full md:h-[calc(100vh+16rem)] lg:h-screen md:w-[calc(100%/3)] p-4 flex flex-col gap-2 rounded-xl">
      {/* --- Header --- */}
      <div className="top h-[10%] flex justify-between items-center">
        <h2 className="min-w-[6.3rem] text-sm">Hourly Forecast</h2>

        <select
          className="bg-[var(--bg3)] max-w-[6rem] p-1 px-2 flex gap-3 rounded-lg"
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
        >
          {days.map((day, index) => (
            <option key={day} value={index}>
              {day}
            </option>
          ))}
        </select>
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
              <WeatherIcon code={hourlyData.weathercode[start + i]} className="h-12 aspect-square"/>
              <span>
                {new Date(hour).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span>{Math.round(hourlyData.temperature_2m[start + i])}{hourlyUnits?.temperature_2m}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HourlyForcast;
