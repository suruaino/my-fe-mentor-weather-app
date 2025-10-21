import React from 'react';
import WeatherIcons from '../assets/weather_icons/WeatherIcons';

const WeatherIcon = ({ code, className = "" }) => {
  const iconSrc = WeatherIcons[code] || ""; // Fallback to an empty string if no icon is found
  return <img src={iconSrc} alt="weather icon" className={className} />;
};

export default WeatherIcon;
