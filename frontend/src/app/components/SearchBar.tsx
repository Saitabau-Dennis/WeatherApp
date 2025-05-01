import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      {/* A. Search box that takes the city name */}
      <div className="relative flex-1">
        <input
          type="text"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search city..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Search for a city"
        />
      </div>
      
      {/* B. Activate city search button */}
      <button 
        type="submit"
        className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        aria-label="Search"
      >
        Go
      </button>
    </form>
  );
};

export default SearchBar;