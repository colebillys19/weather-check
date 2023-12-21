import { FC, useEffect, useState } from 'react';

import { getLocationData } from '../../../utils/helpers';
import Loading from './Loading';

interface IsLocationProps {
  unitType: string;
  userLocation: string;
}

const IsLocation: FC<IsLocationProps> = ({ unitType, userLocation }) => {
  const [isFetchingLocationData, setIsFetchingLocationData] = useState(true);

  useEffect(() => {
    if (!isFetchingLocationData) {
      setIsFetchingLocationData(true);
    }
    const fetchLocationData = async () => {
      const [lat, lon] = userLocation.split(',');
      const res = await getLocationData(Number(lat), Number(lon), unitType);
      console.log(res);
      setIsFetchingLocationData(false);
    };
    fetchLocationData();
  }, [unitType]);

  if (isFetchingLocationData) {
    return <Loading />;
  }

  return <p>Location: {userLocation}</p>;
};

export default IsLocation;
