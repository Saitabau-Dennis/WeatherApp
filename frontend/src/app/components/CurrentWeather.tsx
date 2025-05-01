import React from 'react';
import { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  data: WeatherData;
  units: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, units }) => {
  const tempUnit = units === 'imperial' ? '°F' : '°C';
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      {/* D. Icon showing current day's weather icons */}
      <div className="mb-4">
        <img 
          src={iconUrl} 
          alt={data.weather[0].description} 
          className="w-32 h-32 drop-shadow-lg"
        />
      </div>
      
      {/* E. Current temperature */}
      <div className="text-4xl font-bold mb-2 text-blue-300">
        {Math.round(data.main.temp)}{tempUnit}
      </div>
      
      {/* F. Current weather description */}
      <div className="text-xl capitalize text-gray-300">
        {data.weather[0].description}
      </div>
    </div>
  );
};

export default CurrentWeather;