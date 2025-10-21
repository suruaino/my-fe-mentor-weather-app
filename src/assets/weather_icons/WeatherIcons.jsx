import sunnyIcon from "../../assets/icon-sunny.webp";
import drizzleIcon from "../../assets/icon-drizzle.webp";
import fogIcon from "../../assets/icon-fog.webp";
import overcastIcon from "../../assets/icon-overcast.webp";
import partlyCloudyIcon from "../../assets/icon-partly-cloudy.webp";
import rainIcon from "../../assets/icon-rain.webp";
import snowIcon from "../../assets/icon-snow.webp";
import stormIcon from "../../assets/icon-storm.webp"; 

const WeatherIcons = {
  0: sunnyIcon,
  1: sunnyIcon,
  2: partlyCloudyIcon,
  3: overcastIcon,
  45: fogIcon,
  48: fogIcon,
  51: drizzleIcon,
  53: drizzleIcon,
  55: drizzleIcon,
  61: rainIcon,
  63: rainIcon,
  65: rainIcon,
  71: snowIcon,
  73: snowIcon,
  75: snowIcon,
  80: rainIcon,
  81: rainIcon,
  82: rainIcon,
  95: stormIcon,
  96: stormIcon,
  99: stormIcon
};
// const WeatherIcons = {
//   0: "☀️",
//   1: "🌤️",
//   2: "⛅",
//   3: "☁️",
//   45: "🌫️",
//   48: "🌫️",
//   51: "🌦️",
//   53: "🌦️",
//   55: "🌧️",
//   61: "🌧️",
//   63: "🌧️",
//   65: "🌧️",
//   71: "🌨️",
//   73: "🌨️",
//   75: "❄️",
//   80: "🌦️",
//   81: "🌧️",
//   82: "⛈️",
//   95: "⛈️",
//   96: "🌩️",
//   99: "🌩️"
// };

export default WeatherIcons;
// function WeatherIcon({ code }) {
//   const icon = weatherIcons[code] || "❔";
//   return <span style={{ fontSize: "2rem" }}>{icon}</span>;
// }

// Example usage:
{/* <WeatherIcon code={weatherData.weathercode} />; */}
