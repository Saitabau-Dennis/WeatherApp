<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the Weather API',
        'endpoints' => [
            'GET /api/weather/current',
            'GET /api/weather/forecast'
        ]
    ]);
});
