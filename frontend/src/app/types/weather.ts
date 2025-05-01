// types/weather.ts
export interface WeatherData {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      country: string;
    };
    dt: number;
  }
  
  export interface ForecastItem {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }
  
  export interface ForecastData {
    list: ForecastItem[];
    city: {
      name: string;
      country: string;
    };
  }