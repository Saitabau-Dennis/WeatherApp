<?php

namespace App\Http\Controllers;

use App\Services\WeatherService;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    protected $weatherService;

    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    /**
     * Get current weather for a city
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function current(Request $request)
    {
        $request->validate([
            'city' => 'required|string',
            'units' => 'sometimes|string|in:standard,metric,imperial',
        ]);

        $city = $request->input('city');
        $units = $request->input('units', 'metric');

        $data = $this->weatherService->getCurrentWeather($city, $units);
        
        if (!$data) {
            return response()->json(['error' => 'City not found'], 404);
        }

        return response()->json($data);
    }

    /**
     * Get forecast for a city
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function forecast(Request $request)
    {
        $request->validate([
            'city' => 'required|string',
            'units' => 'sometimes|string|in:standard,metric,imperial',
        ]);

        $city = $request->input('city');
        $units = $request->input('units', 'metric');

        $data = $this->weatherService->getForecast($city, $units);
        
        if (!$data) {
            return response()->json(['error' => 'City not found'], 404);
        }

        return response()->json($data);
    }
}