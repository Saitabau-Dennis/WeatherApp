import React from 'react';
import { ForecastData } from '../types/weather';

interface ForecastProps {
  data: ForecastData;
  units: string;
}

const Forecast: React.FC<ForecastProps> = ({ data, units }) => {
  const tempUnit = units === 'imperial' ? '°F' : '°C';
  
  // Group forecast by day and get next 3 days (excluding today)
  const today = new Date().toDateString();
  const groupedForecast = data.list.reduce((acc: any, item) => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toDateString();
    
    // Skip today
    if (dateStr === today) {
      return acc;
    }
    
    const dayStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (!acc[dateStr]) {
      acc[dateStr] = {
        day: dayStr,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        temp: item.main.temp,
      };
    }
    
    return acc;
  }, {});
  
  // Convert to array and take first 3 days
  const forecastDays = Object.values(groupedForecast).slice(0, 3);

  return (
    <div className="grid grid-cols-3 gap-0">
      {/* H. Weather for the next three days */}
      {forecastDays.map((day: any, index: number) => (
        <div key={index} className="p-4 flex flex-col items-center justify-center border-r border-gray-700 last:border-r-0 hover:bg-gray-700 transition-colors">
          {/* Date */}
          <div className="text-sm text-gray-400 mb-2">{day.day}</div>
          
          {/* Weather Icon */}
          <div className="mb-2">
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
              alt={day.description} 
              className="w-16 h-16"
            />
          </div>
          
          {/* Temperature */}
          <div className="font-semibold text-blue-300">
            {Math.round(day.temp)}{tempUnit}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;