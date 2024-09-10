import axios from 'axios';
import { toast } from 'react-toastify';

const openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

const apiEndpoint = 'http://127.0.0.1:8000/api';
const weatherApiBaseUrl = 'https://api.openweathermap.org/data/2.5';

const api = axios.create({
  baseURL: apiEndpoint,
});
const weatherApi = axios.create({
  baseURL: weatherApiBaseUrl,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error('Failed to send request!'); // Toast error on request failure
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        toast.error('Unauthorized! Please login again.'); // Toast for 401 error
      } else if (error.response.status >= 500) {
        toast.error('Server error! Please try again later.'); // Toast for server errors (500+)
      } else {
        toast.error(`Error: ${error.response.statusText}`); // Generic error toast
      }
    } else {
      toast.error('Network error! Please check your connection.');
    }
    return Promise.reject(error);
  }
);

// Use your API endpoint here

// Get the OpenWeather API key from environment variables

// Function to fetch latitude and longitude from the browser
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

// Request interceptor for weatherApi
weatherApi.interceptors.request.use(
  async (config) => {
    try {
      // Fetch latitude and longitude
      const location = await getUserLocation();

      // Add latitude, longitude, and API key to the request params
      config.params = {
        lat: location.lat,
        lon: location.lon,
        appid: openWeatherApiKey,
        units: 'metric', // Set units to metric
        ...config.params, // Keep any existing params
      };
    } catch (error) {
      toast.error('Failed to get location! Please allow location access.');
      return Promise.reject(error);
    }
    return config;
  },
  (error) => {
    toast.error('Failed to send request!');
    return Promise.reject(error);
  }
);

// Response interceptor for weatherApi
weatherApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status >= 500) {
        toast.error('Weather service error! Please try again later.');
      } else {
        toast.error(`Error: ${error.response.statusText}`);
      }
    } else {
      toast.error('Network error! Please check your connection.');
    }
    return Promise.reject(error);
  }
);

export { api, weatherApi };
