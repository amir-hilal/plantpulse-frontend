import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Close icon
import axios from 'axios';

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
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric`
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
    <div className="fixed bottom-0 right-0 w-full sm:w-80 h-full sm:h-auto bg-white shadow-lg border-t sm:border-t-0 sm:rounded-t-lg z-50">
      <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Hi there! How can we help?</h2>
        <button onClick={onClose} className="text-white">
          <FaTimes size={24} />
        </button>
      </div>

      <div className="p-4 flex flex-col h-full sm:h-80 overflow-auto">
        {/* Weather Section */}
        {weather && (
          <div className="mb-4 p-3 bg-gray-100 rounded-lg">
            <h3 className="font-bold text-lg">Current Weather</h3>
            <p>{weather.name}, {weather.sys.country}</p>
            <p>Temp: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto mb-4">
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
