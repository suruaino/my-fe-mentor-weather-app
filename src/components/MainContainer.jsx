import { useState, useEffect } from "react";
import Hero from "./Hero";
import HourlyForcast from "./HourlyForcast";
import WeatherIcons from "../assets/weather_icons/WeatherIcons";
import styles from "./maincontainer.module.css";

const MainContainer = () => {
  const [searchParam, setSearchParam] = useState("");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [dailyData, setDailyData] = useState("");
  const [dailyUnits, setDailyUnits] = useState("");
  const [hourlyData, setHourlyData] = useState("");
  const [myDate, setMyDate] = useState("");
  //   const [currentWeatherUnits, setCurrentWeatherUnits] = useState("");
  const [currentUnits, setCurrentUnits] = useState("");
  const [loading, setLoading] = useState(false);

  function WeatherIcon({ code }) {
    const icon = WeatherIcons[code] || "❔";
    return <span style={{ fontSize: "2rem" }}>{icon}</span>;
  }


  useEffect(() => {
    if (currentData?.time) {
      setMyDate(new Date(currentData.time));
    }
  }, [currentData]);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchParam(value);
  };

  const searchLocation = async () => {
    // useEffect(() => {
    if (!searchParam.trim()) {
      console.warn("Please enter a location");
      return;
    }
    setLoading(true);

    try {
      const api = `https://geocoding-api.open-meteo.com/v1/search?name=${searchParam}`;
      const response = await fetch(api);
      const data = await response.json();
      const { name, country, latitude, longitude, timezone } = data.results[0];
      setCityName(name);
      setCountry(country);

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?
latitude=${latitude}&
longitude=${longitude}&
current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,wind_speed_10m&
hourly=temperature_2m,apparent_temperature,precipitation,weathercode&
daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&
timezone=auto
`
      );
      const weatherData = await weatherRes.json();
      setCurrentData(weatherData.current);
      setCurrentUnits(weatherData.current_units);
      setHourlyData(weatherData.hourly);
      setDailyData(weatherData.daily);
      setDailyUnits(weatherData.daily_units);

      console.log(data);
      console.log(weatherData);
    } catch (err) {
      console.error("Error fetching location:", err);
    } finally {
      setLoading(false);
    }
    // }, [searchParam]);
  };

  return (
    <main className="w-full border border-green-600 py-6 flex flex-col items-center">
      <Hero
        searchLocation={searchLocation}
        handleSearchInput={handleSearchInput}
        isLoading={loading}
      />
      <div className="border border-red-600 w-full max-w-[90%] h-screen mt-4 flex flex-col md:flex-row gap-4">
        <div className="left w-full flex flex-col gap-4">
          <div
            className={`screen  border rounded-xl h-[19rem] w-full px-4 md:px-8 flex justify-between items-center  ${styles.screen}`}
          >
            <div className="city-details">
              <div className="city font-bold">{`${cityName}, ${country}`}</div>
              {myDate && (
                <div className="date">
                  {`${myDate.toLocaleString("en-US", { weekday: "long" })},
                  ${myDate.toLocaleString("en-US", { month: "short" })}
                  ${myDate.getDate()},
                  ${myDate.getFullYear()}`}
                </div>
              )}
            </div>
            <div className="curr-temp text-5xl font-bold">
              {/* {currentData.temperature} */}
              {/* {currentWeatherUnits.temperature} */}
              {currentData.temperature_2m}
              {currentUnits.temperature_2m}
            </div>
          </div>
          <div className={`w-full ${styles.feels}`}>
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
              <h4>{"Pecipitation"}</h4>{" "}
              <p>{`${currentData.precipitation} ${currentUnits.precipitation}`}</p>
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <h3>Daily forcast</h3>
            {/* <div className={`daily-forcast ${styles.dailyForcast}`}> */}

            {dailyData && dailyData.time ? (
              <ul className={`daily-forcast  ${styles.dailyForcast}`}>
                {dailyData.time.map((date, i) => (
                  <li
                    key={date}
                    className="text-sm p-2 h-full flex flex-col justify-between items-center border"
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}{" "}
                    {/* {WeatherIcons?.[i] } */}
                    {/* <WeatherIcon code={code} /> */}
                    <WeatherIcon code={dailyData.weathercode[i]} />
                    {/* {dailyData.weathercode.map((code, i) => (
                      <div key={i}>
                        <WeatherIcon code={code} />
                      </div>
                    ))} */}
                    <div className="w-full flex justify-between">
                      <span className="text-xs">
                        {dailyData.temperature_2m_max[i]}°C
                      </span>
                      <span className="text-xs">
                        {dailyData.temperature_2m_min[i]}°C
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading daily forecast...</p>
            )}

            {/* </div> */}
          </div>
        </div>
        <HourlyForcast hourlyData= {hourlyData}/>
      </div>
    </main>
  );
};

export default MainContainer;
