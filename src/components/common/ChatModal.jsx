import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import WeatherForecast from './WeatherForecast'; // Import the WeatherForecast component
import { weatherApi } from '../../services/api';
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
      const response = await weatherApi.get('/forecast');
      setWeatherData(response.data.list);
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

  return (
    <div
      className={`chat-modal bg-tint-5 ${isOpen ? 'slide-in' : 'slide-out'}`}
    >
      <div className="h-10rem">
        <div className="bg-secondary text-tint-5 py-2 px-4 flex justify-content-between align-items-center border-round-top-xl">
          <span>
            <h4 className="m-0">Hi I'm flora 👋,</h4>
            <p className="m-0">How can I Help you?</p>
          </span>
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
      <div className="h-19rem px-4 pb-3 flex flex-column justify-content-end">
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
            placeholder="Ask anything about your plants..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="h-2rem w-2rem bg-primary hover:bg-primary-reverse border-circle border-none ml-2  text-xs md:text-base w-full flex align-items-center justify-content-center cursor-pointer"
          >
            <IoIosSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
