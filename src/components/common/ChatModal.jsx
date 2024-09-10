// ChatModal.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import WeatherForecast from './WeatherForecast'; // Import the WeatherForecast component

const ChatModal = ({ isOpen, onClose }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  // Fetch weather when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchWeather();
    }
  }, [isOpen]);

  // Fetch weather data using OpenWeatherMap API
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=33.85&lon=35.72&appid=6b04a4627fcc5296824c1dbe2f3d15c7&units=metric`
      );
      const forecasts = response.data.list;
      setWeatherData(forecasts);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setMessages([...messages, { text: chatInput, sender: 'user' }]);
      setChatInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 w-full sm:w-30rem h-30rem mb-8 mr-4 bg-tint-4 border-round-xl shadow-lg flex flex-column justify-content-between">
      <div className="h-10rem">
        <div className="bg-secondary text-tint-5 py-2 px-4 flex justify-content-between align-items-center border-round-top-xl">
          <h4 className="m-0">Hi there! How can I help?</h4>
          <button
            onClick={onClose}
            className="cursor-pointer bg-transparent border-none flex align-items-center"
          >
            <FaTimes className="text-xl text-tint-5" />
          </button>
        </div>

        {/* Weather Forecast Section */}
        {weatherData.length > 0 && (
          <div className="py-2 px-3">
            <WeatherForecast weatherData={weatherData.slice(0, 10)} />
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="h-19rem px-4 pb-3 flex flex-column">
        <div className="flex-grow overflow-y-scroll mb-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 mb-2 ${
                msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'
              } rounded-lg`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex h-2rem">
          <input
            type="text"
            className=" h-2rem bg-tint-5 p-3 border-400 border-round-lg text-xs md:text-base text-color p-2 border-1 border-solid appearance-none outline-none focus:border-primary w-full "
            placeholder="Type your message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="h-2rem w-2rem bg-primary hover:bg-primary-reverse border-circle border-none ml-2  text-xs md:text-base w-full flex align-items-center justify-content-center cursor-pointer"
          >
            <IoIosSend className='text-lg'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
