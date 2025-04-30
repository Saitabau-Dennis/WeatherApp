<?php

use App\Http\Controllers\WeatherController;
use Illuminate\Support\Facades\Route;

Route::prefix('weather')->group(function () {
    Route::get('/current', [WeatherController::class, 'current']);
    Route::get('/forecast', [WeatherController::class, 'forecast']);
});