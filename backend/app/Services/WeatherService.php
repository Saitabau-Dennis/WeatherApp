<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WeatherService
{
    protected $apiKey;
    protected $weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/';
    protected $geoBaseUrl = 'https://api.openweathermap.org/geo/1.0/';

    public function __construct()
    {
        $this->apiKey = env('OPENWEATHER_API_KEY');
    }

    /**
     * Get location coordinates using Geocoding API
     * 
     * @param string $cityName City name to search
     * @return array|null Coordinates data or null if not found
     */
    public function getLocationCoordinates($cityName)
    {
        $cacheKey = "geo_location_{$cityName}";
        
        return Cache::remember($cacheKey, 86400, function () use ($cityName) {
            $response = Http::get("{$this->geoBaseUrl}direct", [
                'q' => $cityName,
                'limit' => 1,
                'appid' => $this->apiKey
            ]);
            
            $data = $response->json();
            if (empty($data)) {
                return null;
            }
            
            return $data[0];
        });
    }

    /**
     * Get current weather data for a location by coordinates
     * 
     * @param float $lat Latitude
     * @param float $lon Longitude
     * @param string $units Units of measurement (standard, metric, imperial)
     * @return array Weather data
     */
    public function getCurrentWeatherByCoords($lat, $lon, $units = 'metric')
    {
        $cacheKey = "weather_current_{$lat}_{$lon}_{$units}";
        
        return Cache::remember($cacheKey, 1800, function () use ($lat, $lon, $units) {
            $response = Http::get("{$this->weatherBaseUrl}weather", [
                'lat' => $lat,
                'lon' => $lon,
                'units' => $units,
                'appid' => $this->apiKey
            ]);
            
            return $response->json();
        });
    }

    /**
     * Get current weather data for a city name
     * 
     * @param string $cityName City name
     * @param string $units Units of measurement (standard, metric, imperial)
     * @return array|null Weather data or null if city not found
     */
    public function getCurrentWeather($cityName, $units = 'metric')
    {
        $location = $this->getLocationCoordinates($cityName);
        if (!$location) {
            return null;
        }
        
        return $this->getCurrentWeatherByCoords($location['lat'], $location['lon'], $units);
    }

    /**
     * Get 3-day forecast for a location by coordinates
     * 
     * @param float $lat Latitude
     * @param float $lon Longitude
     * @param string $units Units of measurement (standard, metric, imperial)
     * @return array Forecast data
     */
    public function getForecastByCoords($lat, $lon, $units = 'metric')
    {
        $cacheKey = "weather_forecast_{$lat}_{$lon}_{$units}";
        
        return Cache::remember($cacheKey, 1800, function () use ($lat, $lon, $units) {
            $response = Http::get("{$this->weatherBaseUrl}forecast", [
                'lat' => $lat,
                'lon' => $lon,
                'units' => $units,
                'appid' => $this->apiKey
            ]);
            
            return $response->json();
        });
    }

    /**
     * Get 3-day forecast for a city name
     * 
     * @param string $cityName City name
     * @param string $units Units of measurement (standard, metric, imperial)
     * @return array|null Forecast data or null if city not found
     */
    public function getForecast($cityName, $units = 'metric')
    {
        $location = $this->getLocationCoordinates($cityName);
        if (!$location) {
            return null;
        }
        
        return $this->getForecastByCoords($location['lat'], $location['lon'], $units);
    }
}