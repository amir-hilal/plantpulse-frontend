import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaCommentDots } from 'react-icons/fa'; // Comment and Down Arrow Icons
import { toast } from 'react-toastify';
import api from '../../services/api'; // Import the API instance

const FloatingChatButton = ({ onClick, isChatOpen }) => {
  const [currentTemp, setCurrentTemp] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await api.get('/weather', {
                params: { lat: latitude, lon: longitude },
              });

              setCurrentTemp(response.data.main.temp);
            } catch (error) {
              // Handle API-specific errors here
              toast.error('Failed to fetch weather data.');
              console.error('Axios error:', error);
            }
          });
        } else {
          toast.error('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching location data.');
        console.error('Geolocation error:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div
      className={`fixed bottom-0 right-0 z-1001 cursor-pointer mr-4 mb-4 scale-1 ${
        isChatOpen ? 'arrow-close-chatbot-modal' : ''
      } `}
    >
      <button
        className="h-3rem  bg-secondary border-round-3xl border-none text-white p-3 rounded-full shadow-lg transition duration-300 flex align-items-center cursor-pointer"
        onClick={onClick}
      >
        {/* Conditional rendering based on whether chat is open */}
        {isChatOpen ? (
          <p className="m-0">
            <FaChevronDown size={18} />
          </p>
        ) : (
          <div className="flex align-items-center">
            <div>
              <p className="m-0">Ask Flora</p>
              {/* Display current temperature if available */}
              {currentTemp !== null && (
                <p className="text-xs m-0">{Math.floor(currentTemp)}°C</p>
              )}
            </div>
            <FaCommentDots className="ml-2" size={18} />
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingChatButton;
