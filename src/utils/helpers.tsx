import { OpenWeatherLocationData } from './globalTypes';

interface GetLocationDataProps {
  googleMaps: typeof google.maps;
  lat: number;
  lon: number;
  unitType: string;
}

interface GetLocationDataResult {
  data: OpenWeatherLocationData | null; // Allow null as a possible value
  error: Error | string;
  name: string;
}

//
export const getLocationData = async ({
  googleMaps,
  lat,
  lon,
  unitType,
}: GetLocationDataProps): Promise<GetLocationDataResult> => {
  const toReturn: GetLocationDataResult = {
    data: null, // Initialize data as null
    error: '',
    name: '',
  };
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${unitType}&appid=${process.env.REACT_APP_OWM_KEY}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const locationData = await response.json();
  toReturn.data = locationData;
  const geocoder = new googleMaps.Geocoder();
  await geocoder.geocode(
    { address: `${lat}, ${lon}` },
    (results: google.maps.GeocoderResult[], status: string) => {
      if (status === 'OK') {
        toReturn.name = results[0].formatted_address;
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    }
  );
  return toReturn;
};

//
export const isValidCoordinates = (lat: number, lon: number) => {
  if (lat > 90 || lat < -90 || lon > 180 || lon < -180) {
    return false;
  }
  return true;
};

//
export const checkCoordinatesStr = (coordsStr: string) => {
  if (!coordsStr.includes(',')) {
    return false;
  }
  const [latStr, lonStr] = coordsStr.split(',');
  const latNum = Number(latStr);
  const lonNum = Number(lonStr);
  if (isNaN(latNum) || isNaN(lonNum)) {
    return false;
  }
  if (latNum > 90 || latNum < -90 || lonNum > 180 || lonNum < -180) {
    return false;
  }
  return true;
};
