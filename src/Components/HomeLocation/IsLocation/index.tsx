import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { LOCATION_DATA_CURRENT_LOOKUP } from '../../../utils/constants';
import { getLocationData } from '../../../utils/helpers';
import { LocationDataCurrent, WeatherData } from '../../../utils/globalTypes';
import Loading from './Loading';

interface IsLocationProps {
  unitType: string;
  userLocation: string;
}

const IsLocation: FC<IsLocationProps> = ({ unitType, userLocation }) => {
  const [isFetchingLocationData, setIsFetchingLocationData] = useState(true);
  const [locationData, setLocationData] = useState<LocationDataCurrent | null>(
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

  if (isFetchingLocationData || locationData === null) {
    return <Loading />;
  }

  return (
    <>
      <p>
        <b>Location:</b> {userLocation}
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
        {locationData.weather.map(({ description, id, main }: WeatherData) => (
          <li key={id}>{`${id}: ${description} | Main: ${main}`}</li>
        ))}
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
