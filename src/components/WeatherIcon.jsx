import React from 'react';
import WeatherIcons from '../assets/weather_icons/WeatherIcons';

const WeatherIcon = ({ code, className = "" }) => {
  const icon = WeatherIcons[code] || "❔";
  return <span className={className} style={{ fontSize: "2rem" }}>{icon}</span>;
};

export default WeatherIcon;
