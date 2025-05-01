// utils/api.ts
import { WeatherData, ForecastData } from '../types/weather';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const fetchCurrentWeather = async (city: string, units: string = 'metric'): Promise<WeatherData> => {
  const response = await fetch(`${API_URL}/weather/current?city=${encodeURIComponent(city)}&units=${units}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return await response.json();
};

export const fetchForecast = async (city: string, units: string = 'metric'): Promise<ForecastData> => {
  const response = await fetch(`${API_URL}/weather/forecast?city=${encodeURIComponent(city)}&units=${units}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  return await response.json();
};