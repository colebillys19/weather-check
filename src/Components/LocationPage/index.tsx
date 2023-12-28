import { FC, useEffect, useState } from 'react';

import {
  OpenWeatherLocationData,
  OpenWeatherLocationDataDailyItem,
  OpenWeatherWeatherData,
} from '../../utils/globalTypes';
import { checkCoordinatesStr, getLocationData } from '../../utils/helpers';
import MainContainer from '../MainContainer';
import LocationDisplay from './LocationDisplay';
import Loading from './Loading';

const aaa: OpenWeatherLocationData = {
  current: {
    clouds: 0,
    dew_point: 0,
    dt: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    sunrise: 0,
    sunset: 0,
    temp: 0,
    uvi: 0,
    visibility: 0,
    weather: [] as OpenWeatherWeatherData[],
    wind_deg: 0,
    wind_gust: 0,
    wind_speed: 0,
  },
  daily: [] as OpenWeatherLocationDataDailyItem[],
  hourly: [],
  minutely: [],
  lat: 0,
  lon: 0,
  timezone: '',
  timezone_offset: 0,
};

interface LocationPageProps {
  googleMaps: typeof google.maps | null;
  unitType: string;
}

const LocationPage: FC<LocationPageProps> = ({ googleMaps, unitType }) => {
  const [isFetchingLocationData, setIsFetchingLocationData] = useState(true);
  const [isInvalidQueryArg, setIsInvalidQueryArg] = useState(false);
  const [locationData, setLocationData] = useState(aaa);
  const [locationName, setLocationName] = useState('');

  const urlParams = new URLSearchParams(window.location.search);
  const targetLocation = urlParams.get('location');

  useEffect(() => {
    // check if the location query arg exists
    if (!targetLocation) {
      setIsInvalidQueryArg(true);
      return;
    }
    // check if the location query arg is valid
    const isValidCoordinatesStr = checkCoordinatesStr(targetLocation);
    if (!isValidCoordinatesStr) {
      setIsInvalidQueryArg(true);
      return;
    }
    if (!isFetchingLocationData) {
      setIsFetchingLocationData(true);
    }
    if (googleMaps !== null) {
      const fetchLocationData = async () => {
        const [lat, lon] = targetLocation.split(',');
        const { data, error, name } = await getLocationData({
          googleMaps,
          lat: Number(lat),
          lon: Number(lon),
          unitType,
        });
        if (!!error) {
          console.error('Something went wrong - LocationPage.');
          setIsFetchingLocationData(false);
        } else if (data !== null) {
          setLocationData(data);
          setLocationName(name);
          setIsFetchingLocationData(false);
        }
      };
      fetchLocationData();
    }
  }, [unitType]);

  if (isInvalidQueryArg) {
    return (
      <MainContainer>
        <h1>Location Page</h1>
        <p>There's a problem...</p>
      </MainContainer>
    );
  }

  if (isFetchingLocationData || locationData === null || googleMaps === null) {
    return (
      <MainContainer>
        <h1>Location Page</h1>
        <Loading />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <h1>Location Page</h1>
      <LocationDisplay
        locationData={locationData}
        locationName={locationName}
      />
    </MainContainer>
  );
};

export default LocationPage;
