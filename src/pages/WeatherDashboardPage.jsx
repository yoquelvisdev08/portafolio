import React from 'react';
import WeatherDashboard from '../projects/weather-dashboard/WeatherDashboard';

const WeatherDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Weather Dashboard</h1>
      <WeatherDashboard />
    </div>
  );
};

export default WeatherDashboardPage;
