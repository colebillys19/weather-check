import { FC, useEffect, useState } from 'react';

import { getLocationData } from '../../../utils/helpers';
import Loading from './Loading';
import { LOCATION_DATA_LOOKUP } from './constants';

interface IsLocationProps {
  unitType: string;
  userLocation: string;
}

interface WeatherData {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface CurrentLocationData {
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

const IsLocation: FC<IsLocationProps> = ({ unitType, userLocation }) => {
  const [isFetchingLocationData, setIsFetchingLocationData] = useState(true);
  const [locationData, setLocationData] = useState<CurrentLocationData | null>(
    null,
  );

  useEffect(() => {
    if (!isFetchingLocationData) {
      setIsFetchingLocationData(true);
    }
    const fetchLocationData = async () => {
      const [lat, lon] = userLocation.split(',');
      const res = await getLocationData(Number(lat), Number(lon), unitType);
      setLocationData(res.current);
      setIsFetchingLocationData(false);
    };
    fetchLocationData();
  }, [unitType]);

  if (isFetchingLocationData) {
    return <Loading />;
  }

  if (locationData === null) {
    return <p>Location: {userLocation}</p>;
  }

  return (
    <>
      <p><b>Location:</b> {userLocation}</p>
      <ul>
        {LOCATION_DATA_LOOKUP.map(({ dataName, label }) => (
          <li key={dataName}>{`${label}: ${locationData[dataName as keyof typeof locationData]}`}</li>
        ))}
      </ul>
      <p><b>Weather:</b></p>
      <ul>
        {locationData.weather.map(({ description, id, main }: WeatherData) => (
          <li key={id}>
            {`${id}: ${description} | Main: ${main}`}
          </li>
        ))}
      </ul>
    </>
  );
};

export default IsLocation;
