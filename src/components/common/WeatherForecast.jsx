import React from 'react';

// WeatherForecast component to display weather for upcoming days
const WeatherForecast = ({ forecast }) => {
  // Filter to show weather for the upcoming days (you can limit to 5 days)
  const upcomingWeather = forecast.slice(0, 5);

  return (
    <div className="flex space-x-4">
      {upcomingWeather.map((day, index) => (
        <div key={index} className="bg-blue-100 p-2 rounded-lg text-center">
          <p>{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</p>
          <img
            src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
            alt={day.weather[0].description}
            className="mx-auto"
          />
          <p>{Math.round(day.main.temp)}°C</p>
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
