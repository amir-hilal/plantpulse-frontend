import axios from 'axios'; // For fetching weather data
import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaCommentDots } from 'react-icons/fa'; // Comment and Down Arrow Icons

const FloatingChatButton = ({ onClick, isChatOpen }) => {
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
        className="h-3rem  bg-secondary border-round-3xl border-none text-white p-3 rounded-full shadow-lg transition duration-300 flex align-items-center"
        onClick={onClick}
      >
          {/* Conditional rendering based on whether chat is open */}
          {isChatOpen ? (
            <p className="m-0">
              <FaChevronDown size={18} />
            </p>
          ) : (
            <div className='flex align-items-center'>
              <div>
                <p className="m-0">Ask Flora</p>
                {/* Display current temperature if available */}
                {currentTemp !== null && (
                  <p className="text-xs m-0">{currentTemp.toFixed(1)}°C</p>
                )}
              </div>
              <FaCommentDots className='ml-2' size={18} />
              </div>
          )}
      </button>
    </div>
  );
};

export default FloatingChatButton;
