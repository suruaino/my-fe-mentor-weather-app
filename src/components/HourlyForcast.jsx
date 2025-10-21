// // import dropdown from "/icons/icon-dropdown.svg";
// import WeatherIcons from "../assets/weather_icons/WeatherIcons";
// import styles from "./hourlyforcast.module.css";

// const HourlyForcast = ({ hourlyData }) => {
//   function WeatherIcon({ code }) {
//     const icon = WeatherIcons[code] || "❔";
//     return <span style={{ fontSize: "2rem" }}>{icon}</span>;
//   }

//   return (
//     <div className="right bg-[var(--bg2)] w-ull md:w-[calc(100%/3)] p-4 flex flex-col gap-2 border rounded-xl">
//       <div className="top h-[10%] flex justify-between items-center">
//         <h2>Hourly Forcast</h2>
//         <select className="bg-[var(--bg4)] p-1 px-2 flex gap-3 rounded-lg">
//           <option value="Sunday">Sunday</option>
//           <option value="Monday">Monday</option>
//           <option value="Tuesday">Tuesday</option>
//           <option value="Wednesday">Wednesday</option>
//           <option value="Thursday">Thursday</option>
//           <option value="Friday">Friday</option>
//           <option value="Saturday">Saturday</option>
//         </select>
//       </div>
//       <div
//         className={`bottom h-[90%] flex flex-col justify-between gap-2 ${styles.bottom}`}
//       >
//         {hourlyData && hourlyData.time ? (
//           <ul className="flex flex-col gap-2 overflow-y-scroll">
//             {hourlyData.time.slice(0, 24).map((hour, i) => (
//               <li key={hour} className="px-2 flex items-center justify-between">
//                 <WeatherIcon code={hourlyData.weathercode[i]} />
//                 <span>
//                   {new Date(hour).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//                 <span>{Math.round(hourlyData.temperature_2m[i])}°C</span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Loading hourly forecast...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HourlyForcast;


import { useState } from "react";
import WeatherIcons from "../assets/weather_icons/WeatherIcons";
import styles from "./hourlyforcast.module.css";

const HourlyForcast = ({ hourlyData }) => {
  const [selectedDay, setSelectedDay] = useState(0); // 0 = first day (e.g. Sunday)

  function WeatherIcon({ code }) {
    const icon = WeatherIcons[code] || "❔";
    return <span style={{ fontSize: "2rem", height: "100%"}}>{icon}</span>;
  }

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
    <div className="right bg-[var(--bg2)] w-full md:w-[calc(100%/3)] p-4 flex flex-col gap-2 border rounded-xl">
      {/* --- Header --- */}
      <div className="top h-[10%] flex justify-between items-center">
        <h2>Hourly Forecast</h2>

        <select
          className="bg-[var(--bg4)] p-1 px-2 flex gap-3 rounded-lg"
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
              className="px-2 py-2 flex items-center justify-between text-sm"
            >
              <WeatherIcon code={hourlyData.weathercode[start + i]} />
              <span>
                {new Date(hour).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span>{Math.round(hourlyData.temperature_2m[start + i])}°C</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HourlyForcast;
