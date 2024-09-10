import React from 'react';

const WeatherForecast = ({ weatherData }) => {
  return (
    <div className="flex overflow-x-auto weather-card">
      {weatherData.map((forecast, index) => (
        <div
          key={index}
          className="flex-shrink-0 text-xs w-9rem p-2 m-1 bg-white border-round shadow-2 text-center"
        >
          {/* Display the Date */}
          <p className="m-0 font-bold">
            {new Date(forecast.dt_txt).toLocaleDateString('en-US', {
              weekday: 'long', // E.g., Tuesday
              day: 'numeric', // E.g., 10
              month: 'numeric', // E.g., 9
            })}
          </p>
          {/* Display Time in 12-hour format */}
          <p className="m-0">
            {new Date(forecast.dt_txt)
              .toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true, // 12-hour format with am/pm
              })
              .toLowerCase()}
          </p>
          {/* Weather Icon */}
          <img
            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
            alt={forecast.weather[0].description}
            className="w-2rem h-2rem mx-auto"
          />
          {/* Weather Description */}
          <p className="m-0">{forecast.weather[0].main}</p>
          {/* Temperature */}
          <p className="m-0">{Math.floor(forecast.main.temp)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
