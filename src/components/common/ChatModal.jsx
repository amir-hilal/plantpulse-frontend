import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Close icon

const ChatModal = ({ isOpen, onClose }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [weather, setWeather] = useState(null);

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
        `https://api.openweathermap.org/data/2.5/forecast?lat=33.85&lon=35.72&appid=34101af2ad3cf08fc9745f39c16739ea&units=metric`
      );
      setWeather(response.data);
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
    <div className="fixed bottom-0 right-0  h-30rem w-30rem mb-8 mr-4 bg-tint-4 border-round-xl">
      <div className="bg-tint-1 text-white p-4 flex justify-between align-items-center border-round-xl">
        <h2 className="m-0">Hi there! How can we help?</h2>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer bg-transparent border-none"
        >
          <FaTimes className="text-2xl text-secondary" />
        </button>
      </div>

      <div className="p-4 flex  sm:h-80 overflow-auto">
        {/* Weather Section */}
        {weather && (
          <div className="mb-4 p-3 bg-gray-100 rounded-lg">
            <h3 className="font-bold text-lg">Current Weather</h3>
            <p>
              {weather.name}, {weather.sys.country}
            </p>
            <p>Temp: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex overflow-y-auto mb-4">
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
        <div className="flex">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-l-lg"
            placeholder="Type your message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
