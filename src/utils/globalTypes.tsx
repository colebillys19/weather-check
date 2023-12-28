export interface OpenWeatherLocationDataCurrent {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: OpenWeatherWeatherData[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface OpenWeatherLocationDataDailyFeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

export interface OpenWeatherLocationDataDailyTemp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

export interface OpenWeatherLocationDataDailyItem {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: OpenWeatherLocationDataDailyFeelsLike;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  rain: number;
  summary: string;
  sunrise: number;
  sunset: number;
  temp: OpenWeatherLocationDataDailyTemp;
  uvi: number;
  weather: [];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface OpenWeatherLocationDataHourlyItem {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: OpenWeatherWeatherData[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface OpenWeatherLocationDataMinutelyItem {
  dt: number;
  precipitation: number;
}

export interface OpenWeatherLocationData {
  current: OpenWeatherLocationDataCurrent;
  daily: OpenWeatherLocationDataDailyItem[];
  hourly: OpenWeatherLocationDataHourlyItem[];
  minutely: OpenWeatherLocationDataMinutelyItem[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

export interface OpenWeatherWeatherData {
  description: string;
  icon: string;
  id: number;
  main: string;
}
