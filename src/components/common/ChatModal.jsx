import axios from 'axios';
import Markdown from 'markdown-to-jsx';
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

  const handleSendMessage = async () => {
    if (chatInput.trim()) {
      const userMessage = chatInput;
      setMessages([...messages, { text: chatInput, sender: 'user' }]);
      setChatInput('');

      // Show a typing indicator while waiting for the response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Flora is typing...', sender: 'assistant' },
      ]);

      // Get weather data (if available) and append to the message
      let weatherInfo = '';
      if (weatherData.length > 0) {
        const currentWeather = weatherData[0];
        weatherInfo = `The current weather is ${currentWeather.weather[0].description}, with a temperature of ${currentWeather.main.temp}°C. `;
      }

      // Create the base system prompt for both plant care and website navigation
      const systemPrompt = {
        role: 'system',
        content:
          'You are a helpful assistant for plant care and website navigation. Answer plant-related questions and guide users through the website, and answer plant-related questions in Markdown format, using titles, bullet points, and numbered lists where appropriate.',
      };

      // User prompt for the message they just sent
      const userPrompt = {
        role: 'user',
        content: `${userMessage}. ${weatherInfo}`,
      };

      // Website information to dynamically inject for navigation questions
      const websiteInfo = {
        gardenSection: {
          keywords: ['health status', 'garden', 'plants overview', 'manage', 'see', 'plants', 'gardens'],
          info: "In the 'My Garden' section, you can view all your plants and their health status.",
        },
        wateringSchedule: {
          keywords: ['watering schedule', 'watering tasks', 'calendar','watering', 'schedule','tasks','water'],
          info: "In the 'Watering Calendar' section, you can find upcoming watering tasks for each plant.",
        },
        plantEncyclopedia: {
          keywords: ['plant encyclopedia', 'plant information', 'species info', 'tutorials'],
          info: "In the 'Plant Encyclopedia' section, you will find detailed information about different plant species.",
        },
      };

      // Function to match user message with website sections
      const findNavigationInfo = (message) => {
        for (const section in websiteInfo) {
          const { keywords, info } = websiteInfo[section];
          if (
            keywords.some((keyword) => message.toLowerCase().includes(keyword))
          ) {
            return info;
          }
        }
        return '';
      };

      // Check if the user is asking about navigation or plant care
      let navigationInfo = findNavigationInfo(userMessage);

      // Prepare the final GPT prompt
      const assistantPrompt = navigationInfo
        ? `You are helping a user navigate the website. The user wants to know: "${userMessage}". Here is some information about the website that can help you respond: ${navigationInfo}.`
        : `You are helping a user with plant care. The user asked: "${userMessage}". Provide useful advice.`;

      const messagesToSend = [
        systemPrompt,
        userPrompt,
        { role: 'assistant', content: assistantPrompt },
      ];
      try {
        // Send the message to GPT
        const response = await axios.post(
          'https://openai-service.vercel.app/api/openai/chat',
          { messages: messagesToSend }
        );

        // Extract the response from GPT
        let assistantMessage = response.data.choices[0].message.content;
        const finishReason = response.data.choices[0].finish_reason;

        // If the response is incomplete due to token limit, request the continuation
        if (finishReason === 'length') {
          const continuationResponse = await axios.post(
            'https://openai-service.vercel.app/api/openai/chat',
            {
              messages: [
                ...messagesToSend,
                { role: 'assistant', content: assistantMessage },
              ],
            }
          );
          assistantMessage +=
            continuationResponse.data.choices[0].message.content;
        }

        // Remove "Flora is typing" and show the response
        setMessages((prevMessages) => prevMessages.slice(0, -1));
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: assistantMessage, sender: 'assistant' },
        ]);
      } catch (error) {
        toast.error(
          'Failed to communicate with the chatbot. Please try again.'
        );
        console.error('Error sending message to chatbot:', error);

        // Remove the typing indicator in case of error
        setMessages((prevMessages) => prevMessages.slice(0, -1));
      }
    }
  };


  return (
    <div
      className={`chat-modal surface-50 ${isOpen ? 'slide-in' : 'slide-out'}`}
    >
      <div className="h-10rem">
        <div className="bg-secondary-light text-tint-5 py-2 px-4 flex justify-content-between align-items-center sm:border-round-top-xl">
          <span>
            <h4 className="m-0">Hi I'm Flora 👋,</h4>
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

      <div className="h-22rem px-4 pb-3 flex flex-column justify-content-end">
        <div className="flex flex-column overflow-y-scroll scroll-bar-style mb-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{ width: 'fit-content' }}
              className={`p-2 mb-2 w-auto  border-round-xl ${
                msg.sender === 'user'
                  ? 'align-self-end bg-tint-5 text-right'
                  : 'align-self-start surface-200'
              } rounded-lg`}
            >
              {msg.sender === 'assistant' ? (
                <Markdown>{msg.text}</Markdown> // Render as markdown
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex h-2rem">
          <input
            type="text"
            className=" h-2rem surface-100 p-3 border-400 border-round-lg text-xs md:text-base text-color p-2 border-1 border-solid appearance-none outline-none focus:border-primary w-full "
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
