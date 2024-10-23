import React, { useState } from 'react';

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-dashboard p-4 bg-blue-100 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Weather Dashboard</h2>
      <form onSubmit={fetchWeather} className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button 
          type="submit"
          className="mt-2 w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="bg-white p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">{weather.name}, {weather.sys.country}</h3>
          <p className="text-4xl mb-4">{Math.round(weather.main.temp)}°C</p>
          <p className="capitalize">{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
