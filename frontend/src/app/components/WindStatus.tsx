import React from 'react';
import { WeatherData } from '../types/weather';

interface WindStatusProps {
  data: WeatherData;
  units: string;
}

const WindStatus: React.FC<WindStatusProps> = ({ data, units }) => {
  // Convert wind speed to km/h if in metric
  const windSpeed = units === 'metric' ? data.wind.speed : data.wind.speed * 1.60934;
  const direction = data.wind.deg;

  // Function to determine wind direction
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h3 className="text-gray-400 mb-2">Wind Status</h3>
      <div className="text-4xl font-bold mb-2 text-blue-300">
        {Math.round(windSpeed)} km/h
      </div>
      <div className="flex items-center justify-center mt-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-blue-400 text-blue-300">
          {getWindDirection(direction)}
        </div>
      </div>
    </div>
  );
};

export default WindStatus;