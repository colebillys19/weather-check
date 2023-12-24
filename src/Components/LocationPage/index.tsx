import { FC, useEffect, useState } from 'react';

import { getLocationData } from '../../utils/helpers';
import { LocationData } from '../../utils/globalTypes';
import MainContainer from '../MainContainer';
import LocationDisplay from './LocationDisplay';
import Loading from './Loading';

interface LocationPageProps {
  unitType: string;
}

const LocationPage: FC<LocationPageProps> = ({ unitType }) => {
  const [isFetchingLocationData, setIsFetchingLocationData] = useState(true);
  const [locationData, setLocationData] = useState<LocationData | null>(
    null,
  );

  const urlParams = new URLSearchParams(window.location.search);
  const targetLocation = urlParams.get('location');

  useEffect(() => {
    if (!targetLocation) {
      return;
    }
    if (!isFetchingLocationData) {
      setIsFetchingLocationData(true);
    }
    const fetchLocationData = async () => {
      const [lat, lon] = targetLocation.split(',');
      const res = await getLocationData(Number(lat), Number(lon), unitType);
      setLocationData(res);
      setIsFetchingLocationData(false);
    };
    fetchLocationData();
  }, [unitType]);

  if (isFetchingLocationData) {
    return (
      <MainContainer>
        <Loading />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <h1>Location Page</h1>
      {isFetchingLocationData && <Loading />}
      {!isFetchingLocationData && locationData !== null && (
        <LocationDisplay locationData={locationData} />
      )}
    </MainContainer>
  );
};

export default LocationPage;
