import { useContext, useEffect, useState } from 'react';

import Context from '../../../../context';

const GeoLocate = () => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const { state, setState } = useContext(Context);

  useEffect(() => {
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setState({
        ...state,
        location: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      });
      localStorage.setItem(
        'location',
        `${position.coords.latitude},${position.coords.longitude}`,
      );
      setIsGettingLocation(false);
    });
  }, []);

  return <div>div</div>;
};

export default GeoLocate;
