export interface LocationDataCurrent {
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
  weather: [];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface LocationDataDailyFeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

export interface LocationDataDailyTemp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

export interface LocationDataDailyItem {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: LocationDataDailyFeelsLike;
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
  temp: LocationDataDailyTemp;
  uvi: number;
  weather: [];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface LocationDataHourlyItem {
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
  weather: [];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface LocationDataMinutelyItem {
  dt: number;
  precipitation: number;
}

export interface LocationData {
  current: LocationDataCurrent;
  daily: [];
  hourly: [];
  minutely: [];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

//

export interface WeatherData {
  description: string;
  icon: string;
  id: number;
  main: string;
}
