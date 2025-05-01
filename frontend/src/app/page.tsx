'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import UnitToggle from './components/UnitToggle';
import WindStatus from './components/WindStatus';
import HumidityInfo from './components/HumidityInfo';
import { fetchCurrentWeather, fetchForecast } from './utils/api';
import { WeatherData, ForecastData } from './types/weather';

export default function Home() {
  const [city, setCity] = useState<string>('Nairobi'); // Default city as shown in wireframe
  const [units, setUnits] = useState<string>('metric');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(cityName, units),
        fetchForecast(cityName, units)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('City not found or error fetching weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName: string) => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };

  const toggleUnits = (unit: string) => {
    setUnits(unit);
    if (city) {
      fetchWeatherData(city);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  // Format date in a way that's consistent between server and client
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    // Format as "20th May 2027" as shown in wireframe
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    
    // Add ordinal suffix
    const ordinal = (d: number) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${day}${ordinal(day)} ${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <main className="container mx-auto py-6 max-w-4xl">
        {/* Weather Card Container */}
        <div className="border border-gray-700 rounded-lg shadow-xl overflow-hidden bg-gray-800">
          {/* Search and Toggle Row */}
          <div className="p-4 flex items-center gap-2 bg-gray-800 border-b border-gray-700">
            <SearchBar onSearch={handleSearch} />
            <UnitToggle units={units} onToggle={toggleUnits} />
          </div>
          
          {/* Error display */}
          {error && (
            <div className="p-4 bg-red-900 text-red-200 mb-2">
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent"></div>
            </div>
          ) : currentWeather && forecast ? (
            <>
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4">
                {/* Current Weather - Left Side */}
                <div className="col-span-1 p-6 border-r border-gray-700 bg-gray-800">
                  <CurrentWeather data={currentWeather} units={units} />
                </div>
                
                {/* Forecast - Right Side (3 columns) */}
                <div className="col-span-3 bg-gray-800">
                  {/* Forecast Cards */}
                  <div className="border-b border-gray-700">
                    <Forecast data={forecast} units={units} />
                  </div>
                  
                  {/* Additional Weather Info (Wind & Humidity) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="p-4 border-r border-gray-700">
                      <WindStatus data={currentWeather} units={units} />
                    </div>
                    <div className="p-4">
                      <HumidityInfo humidity={currentWeather.main.humidity} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer with Location and Date */}
              <div className="p-4 bg-gray-900 text-center border-t border-gray-700">
                <p className="font-semibold text-gray-300">
                  {formatDate(currentWeather.dt)}<br />
                  {currentWeather.name}
                </p>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}