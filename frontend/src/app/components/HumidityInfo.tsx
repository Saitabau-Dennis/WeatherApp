import React from 'react';

interface HumidityInfoProps {
  humidity: number;
}

const HumidityInfo: React.FC<HumidityInfoProps> = ({ humidity }) => {
  return (
    <div className="flex flex-col items-center text-white">
      <h3 className="text-gray-400 mb-2">Humidity</h3>
      <div className="text-4xl font-bold mb-4 text-blue-300">
        {humidity}%
      </div>
      
      {/* Progress bar for humidity */}
      <div className="w-full mt-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full" 
            style={{ width: `${humidity}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default HumidityInfo;