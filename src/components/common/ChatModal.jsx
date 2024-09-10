import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { toast } from 'react-toastify';
import api from '../../services/api';
import WeatherForecast from './WeatherForecast';

const ChatModal = ({ isOpen, onClose }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchWeather();
    }
  }, [isOpen]);

  const fetchWeather = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await api.get('/forecast', {
                params: { lat: latitude, lon: longitude },
              });

              setWeatherData(response.data.list);
            } catch (error) {
              toast.error(
                'Failed to fetch weather data. Please try again later.'
              );
              console.error('Error fetching weather data from API:', error);
            }
          },
          (geoError) => {
            toast.error(
              'Unable to retrieve your location. Please enable location access.'
            );
            console.error('Geolocation error:', geoError);
          }
        );
      } else {
        toast.error('Geolocation is not supported by this browser.');
        console.error('Geolocation is not supported by this browser.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
      console.error('Unexpected error:', error);
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

        {weatherData.length > 0 && (
          <div className="py-2 px-3">
            <WeatherForecast weatherData={weatherData.slice(0, 10)} />
          </div>
        )}
      </div>

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
