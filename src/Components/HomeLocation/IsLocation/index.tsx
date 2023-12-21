import { FC, useEffect, useState } from 'react';

import { getLocationData } from '../../../utils/helpers';
import Loading from './Loading';

interface IsLocationProps {
  userLocation: string;
}

const IsLocation: FC<IsLocationProps> = ({ userLocation }) => {
  const [isFetchingLocationData, setIsFetchingLocationData] = useState(true);

  useEffect(() => {
    const fetchLocationData = async () => {
      const [lat, lon] = userLocation.split(',');
      const yo = await getLocationData(Number(lat), Number(lon));
      console.log(yo);
      setIsFetchingLocationData(false);
    };
    fetchLocationData();
  }, []);

  if (isFetchingLocationData) {
    return <Loading />;
  }

  return <p>Location: {userLocation}</p>;
};

export default IsLocation;
