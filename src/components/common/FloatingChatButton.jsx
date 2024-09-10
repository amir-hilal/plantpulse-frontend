import React, { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa'; // Icon for the button
import axios from 'axios'; // Make sure you have axios installed

const FloatingChatButton = ({ onClick }) => {
  const [currentTemp, setCurrentTemp] = useState(null); // State for storing the current temperature

  // Fetch current weather when the component mounts
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=33.85&lon=35.72&appid=34101af2ad3cf08fc9745f39c16739ea&units=metric`
        );
        setCurrentTemp(response.data.main.temp); // Update the state with the temperature
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather(); // Call the fetchWeather function on component mount
  }, []);

  return (
    <div className="fixed bottom-0 right-0 z-50 cursor-pointer mr-4 mb-4 scale-1">
      <button
        className="  bg-secondary border-round-3xl border-none text-white p-3 rounded-full shadow-lg transition duration-300 flex align-items-center"
        onClick={onClick}
      >
        <div className="pr-3">
          <p className="m-0">Ask Flora</p>
          {/* Display current temperature if available */}
          {currentTemp !== null && (
            <p className="text-xs m-0">{currentTemp.toFixed(1)}°C</p>
          )}
        </div>
        <FaCommentDots size={18} />
      </button>
    </div>
  );
};

export default FloatingChatButton;
