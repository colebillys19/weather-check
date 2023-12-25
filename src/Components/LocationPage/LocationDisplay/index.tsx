import { FC, useEffect } from 'react';

import { LOCATION_DATA_CURRENT_LOOKUP } from '../../../utils/constants';
import { LocationData } from '../../../utils/globalTypes';

// getCityName

interface LocationDisplayProps {
  locationData: LocationData;
  locationName: string;
}

const LocationDisplay: FC<LocationDisplayProps> = ({ locationData, locationName }) => {
  const {
    current: locationDataCurrent,
    daily: locationDataDaily,
    hourly: locationDataHourly,
    // minutely,
    lat,
    lon,
    timezone,
    // timezone_offset,
  } = locationData;

  return (
    <>
      <p><b>Name:</b>&nbsp;{locationName || 'Issue with name...'}</p>
      <p><b>Lat:</b>&nbsp;{lat}</p>
      <p><b>Lon:</b>&nbsp;{lon}</p>
      <p><b>Timezone:</b>&nbsp;{timezone}</p>
      <p>
        <b>Current:</b>
      </p>
      <ul>
        {LOCATION_DATA_CURRENT_LOOKUP.map(({ dataName, label }) => (
          <li key={dataName}>{`${label}: ${
            locationDataCurrent[dataName as keyof typeof locationDataCurrent]
          }`}</li>
        ))}
      </ul>
      <p>
        <b>Daily:</b>
      </p>
      <ul>
        {locationDataDaily.map(({ dt, temp: { min, max } }) => (
          <li key={dt}>{`${dt}: ${min} - ${max}`}</li>
        ))}
      </ul>
      <p>
        <b>Hourly:</b>
      </p>
      <ul>
        {locationDataHourly.map(({ dt, temp }) => (
          <li key={dt}>{`${dt}: ${temp}`}</li>
        ))}
      </ul>
    </>
  );
};

export default LocationDisplay;
