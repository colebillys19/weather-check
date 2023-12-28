import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { LOCATION_DATA_CURRENT_LOOKUP } from '../../../utils/constants';
import { getLocationData } from '../../../utils/helpers';
import {
  OpenWeatherLocationDataCurrent,
  OpenWeatherWeatherData,
} from '../../../utils/globalTypes';
import Loading from './Loading';

interface IsLocationProps {
  googleMaps: typeof google.maps | null;
  unitType: string;
  userLocation: string;
}

interface IsLocationProps {
  googleMaps: typeof google.maps | null;
  unitType: string;
  userLocation: string;
}

const IsLocation: FC<IsLocationProps> = ({
  googleMaps,
  unitType,
  userLocation,
}) => {
  const [isFetchingLocationData, setIsFetchingLocationData] = useState(true);
  const [locationData, setLocationData] = useState<OpenWeatherLocationDataCurrent | null>(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    if (!isFetchingLocationData) {
      setIsFetchingLocationData(true);
    }
    const fetchLocationData = async () => {
      if (googleMaps !== null) {
        const [lat, lon] = userLocation.split(',');
        const { data, error, name } = await getLocationData({
          googleMaps,
          lat: Number(lat),
          lon: Number(lon),
          unitType,
        });
        if (!!error) {
          console.error(error);
          console.error('Something went wrong - IsLocation A.');
          setIsFetchingLocationData(false);
        } else if (data !== null) {
          setLocationData(data.current);
          setLocationName(name);
          setIsFetchingLocationData(false);
        }
      } else {
        console.error('Something went wrong - IsLocation B.');
        setIsFetchingLocationData(false);
      }
    };
    fetchLocationData();
  }, [unitType]);

  if (isFetchingLocationData || locationData === null) {
    return <Loading />;
  }

  return (
    <>
      <p>
        <b>Location:</b> {userLocation}
      </p>
      <p>
        <b>Location Name:</b> {locationName}
      </p>
      <ul>
        {LOCATION_DATA_CURRENT_LOOKUP.map(({ dataName, label }) => (
          <li key={dataName}>{`${label}: ${
            locationData[dataName as keyof typeof locationData]
          }`}</li>
        ))}
      </ul>
      <p>
        <b>Weather:</b>
      </p>
      <ul>
        {locationData.weather.map(
          ({ description, id, main }: OpenWeatherWeatherData) => (
            <li key={id}>{`${id}: ${description} | Main: ${main}`}</li>
          ),
        )}
      </ul>
      <p>
        <NavLink to={`/location?location=${userLocation}`}>
          location details
        </NavLink>
      </p>
    </>
  );
};

export default IsLocation;
