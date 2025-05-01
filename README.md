# Weather App

A modern weather application built with NextJS (frontend) and Laravel (backend) in a decoupled architecture.

## Features
- Search for weather by city name using OpenWeatherMap's Geocoding API
- View current weather conditions including temperature, wind status, and humidity
- 3-day weather forecast
- Toggle between Celsius and Fahrenheit units
- Responsive design that works on mobile and desktop

## Tech Stack
- **Frontend**: NextJS, TypeScript, RippleUI (Tailwind CSS)
- **Backend**: Laravel 10, PHP 8.1
- **API**: OpenWeatherMap API

## Screenshots
[Include screenshots here]

## Setup Instructions

### Backend Setup
1. Clone this repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `composer install`
4. Copy the environment file: `cp .env.example .env`
5. Generate application key: `php artisan key:generate`
6. Add your OpenWeatherMap API key to the `.env` file: `OPENWEATHER_API_KEY=your_api_key_here`
7. Start the Laravel server: `php artisan serve`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Copy the environment file: `cp .env.example .env.local`
4. Update the API URL in `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
5. Start the NextJS development server: `npm run dev`
6. Open your browser and navigate to `http://localhost:3000`

## Code Structure
- **Frontend**:
  - `components/`: Reusable React components
  - `pages/`: NextJS pages
  - `types/`: TypeScript interfaces
  - `utils/`: Utility functions including API calls
  
- **Backend**:
  - `app/Http/Controllers/`: API controllers
  - `app/Services/`: Weather service for OpenWeatherMap API integration
  - `routes/api.php`: API route definitions
