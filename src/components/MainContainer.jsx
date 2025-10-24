import { useState, useEffect } from "react";
import { useUnit } from "../context/UnitContext";
import Hero from "./Hero.jsx";
import HourlyForcast from "./HourlyForcast";
import styles from "./maincontainer.module.css";
import WeatherIcon from "./WeatherIcon.jsx";

const MainContainer = () => {
  const { unitSystem } = useUnit();
  const [searchParam, setSearchParam] = useState("");
  const [cityName, setCityName] = useState("Lagos");
  const [country, setCountry] = useState("Nigeria");
  const [currentData, setCurrentData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const [dailyUnits, setDailyUnits] = useState({});
  const [hourlyUnits, setHourlyUnits] = useState({});
  const [hourlyData, setHourlyData] = useState({});
  const [myDate, setMyDate] = useState(null);
  const [currentUnits, setCurrentUnits] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (currentData?.time) {
      setMyDate(new Date(currentData.time));
    }
  }, [currentData]);

  // Fetch weather for Lagos on initial mount
  useEffect(() => {
    const fetchDefaultWeatherData = async () => {
      // Hardcoded coordinates for Lagos, Nigeria
      const latitude = 6.5244;
      const longitude = 3.3792;
      const name = "Lagos";
      const country = "Nigeria";
      setLastLocation({ latitude, longitude, name, country });
      await fetchWeatherData(latitude, longitude, name, country);
    };
    fetchDefaultWeatherData();
  }, []);

  // Re-fetch weather data when the unit system changes
  useEffect(() => {
    if (lastLocation) {
      fetchWeatherData(
        lastLocation.latitude,
        lastLocation.longitude,
        lastLocation.name,
        lastLocation.country
      );
    }
  }, [unitSystem]);

  // Fetch location options as user types
  useEffect(() => {
    if (searchParam.trim().length > 2) {
      const debounceTimeout = setTimeout(() => {
        fetchLocationOptions();
      }, 500); // 500ms debounce

      return () => clearTimeout(debounceTimeout);
    } else {
      setLocationOptions([]);
      setShowOptions(false);
    }
  }, [searchParam]);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchParam(value);
    setShowOptions(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (locationOptions.length > 0) {
      // Automatically select the first option on manual search
      handleOptionClick(locationOptions[0]);
    }
  };

  const fetchLocationOptions = async () => {
    setLoading(true);
    try {
      const api = `https://geocoding-api.open-meteo.com/v1/search?name=${searchParam}`;
      const response = await fetch(api);
      const data = await response.json();
      setLocationOptions(data.results || []);
    } catch (err) {
      console.error("Error fetching location:", err);
      setLocationOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    const { latitude, longitude, name, country } = option;
    setLastLocation({ latitude, longitude, name, country });
    fetchWeatherData(latitude, longitude, name, country);
    setShowOptions(false);
    setSearchParam(""); // Clear search input after selection
  };

  const fetchWeatherData = async (latitude, longitude, name, country) => {
    setLoading(true);
    try {
      setCityName(name);
      setCountry(country);

      const tempUnit = unitSystem === "metric" ? "celsius" : "fahrenheit";
      const windUnit = unitSystem === "metric" ? "kmh" : "mph";
      const precipUnit = unitSystem === "metric" ? "mm" : "inch";

      const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}&precipitation_unit=${precipUnit}`;

      const weatherRes = await fetch(weatherApiUrl.replace(/\s+/g, ""));
      const weatherData = await weatherRes.json();
      setCurrentData(weatherData.current);
      setCurrentUnits(weatherData.current_units);
      setHourlyData(weatherData.hourly);
      setHourlyUnits(weatherData.hourly_units);
      setDailyData(weatherData.daily);
      setDailyUnits(weatherData.daily_units);

      console.log(weatherData);
    } catch (err) {
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="DM Sans w-full pb-6 flex flex-col items-center">
      <Hero
        searchParam={searchParam}
        handleSearchInput={handleSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        isLoading={loading}
        locationOptions={locationOptions}
        handleOptionClick={handleOptionClick}
        showOptions={showOptions}
      />
      <div className="w-full max-w-[90%] h-full mt-4 flex flex-col md:flex-row gap-4">
        <div className="left w-full flex flex-col gap-4">
          <div
            className={`screen rounded-xl min-h-[12rem] w-full px-4 md:px-8 flex flex-col md:flex-row justify-center md:justify-between items-center  ${styles.screen}`}
          >
            <div className="city-details text-center md:text-left">
              <div className="city text-2xl font-bold">{`${cityName}, ${country}`}</div>
              {myDate && (
                <div className="date">
                  {`${myDate.toLocaleString("en-US", { weekday: "long" })},
                  ${myDate.toLocaleString("en-US", { month: "short" })}
                  ${myDate.getDate()},
                  ${myDate.getFullYear()}`}
                </div>
              )}
            </div>

            {currentData.time ? (
              <div className="flex items-center gap-4">
                <div className="h-[5rem] w-[5rem] flex items-center justify-center">
                  {hourlyData?.weathercode && (
                    <WeatherIcon code={hourlyData.weathercode[0]} />
                  )}
                </div>
                <div className="curr-temp text-5xl font-bold">
                  {currentData.temperature_2m}
                  {currentUnits.temperature_2m}
                </div>
              </div>
            ) : (
              <div className="text-5xl font-bold">...</div>
            )}
          </div>
          <div className={`w-full ${styles.feels}`}>
            {currentData.time && (
              <>
                <span className="p-4 flex flex-col justify-between items-start">
                  <h4>{"Feels Like"}</h4>{" "}
                  <p>{`${currentData.apparent_temperature} ${currentUnits.apparent_temperature}`}</p>
                </span>
                <span className="p-4 flex flex-col justify-between items-start">
                  <h4>{"Humidity"}</h4>{" "}
                  <p>{`${currentData.relative_humidity_2m} ${currentUnits.relative_humidity_2m}`}</p>
                </span>
                <span className="p-4 flex flex-col justify-between items-start">
                  <h4>{"Wind"}</h4>{" "}
                  <p>{`${currentData.wind_speed_10m} ${currentUnits.wind_speed_10m}`}</p>
                </span>
                <span className="p-4 flex flex-col justify-between items-start">
                  <h4>{"Precipitation"}</h4>{" "}
                  <p>{`${currentData.precipitation} ${currentUnits.precipitation}`}</p>
                </span>
              </>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <h3>Daily forcast</h3>

            {dailyData && dailyData.time ? (
              <ul className={`daily-forcast ${styles.dailyForcast}`}>
                {dailyData.time.map((date, i) => (
                  <li
                    key={date}
                    className="text-sm p-2 h-full flex flex-col justify-between items-center"
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}{" "}
                    <div>
                    <WeatherIcon
                      code={dailyData.weathercode[i]}
                      className="h-full w-16"
                    />
                    </div>
                    <div className="w-full flex justify-between">
                      <span className="text-xs">
                        {Math.round(dailyData.temperature_2m_max[i])}
                        {dailyUnits.temperature_2m_max}
                      </span>
                      <span className="text-xs">
                        {Math.round(dailyData.temperature_2m_min[i])}
                        {dailyUnits.temperature_2m_min}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading daily forecast...</p>
            )}
          </div>
        </div>
        <HourlyForcast hourlyData={hourlyData} hourlyUnits={hourlyUnits} />
      </div>
    </main>
  );
};

export default MainContainer;
