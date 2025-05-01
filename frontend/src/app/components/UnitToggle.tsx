import React from 'react';

interface UnitToggleProps {
  units: string;
  onToggle: (unit: string) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ units, onToggle }) => {
  return (
    <div className="flex">
      {/* C. Switch between Degrees celsius and Fahrenheit */}
      <button 
        onClick={() => onToggle('metric')}
        className={`px-3 py-2 border-l border-t border-b border-gray-600 rounded-l-md ${
          units === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
        } hover:bg-opacity-80 transition-colors`}
        aria-label="Switch to Celsius"
      >
        °C
      </button>
      <button 
        onClick={() => onToggle('imperial')}
        className={`px-3 py-2 border-t border-r border-b border-gray-600 rounded-r-md ${
          units === 'imperial' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
        } hover:bg-opacity-80 transition-colors`}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;