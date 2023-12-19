import { useContext, useEffect, useState } from 'react';

import Context from '../../context';
import HomeSection from '../HomeSection';

import IsNoLocation from './IsNoLocation';
import IsLocation from './IsLocation';
import Loading from './Loading';

interface HomeLocationProps {
  locationServicesDisabled: boolean;
  setHideHomeLocation: (value: boolean) => void;
  setLocationServicesDisabled: (value: boolean) => void;
}

const HomeLocation: React.FC<HomeLocationProps> = ({
  locationServicesDisabled,
  setHideHomeLocation,
  setLocationServicesDisabled,
}) => {
  const [isHomeLocationLoading, setIsHomeLocationLoading] = useState(true);
  const [isContextLocation, setIsContextLocation] = useState(false);

  const { state, setState } = useContext(Context);

  useEffect(() => {
    setIsContextLocation(state.location.lat !== 0 || state.location.lon !== 0);
  }, [state.location.lat, state.location.lon]);

  useEffect(() => {
    if (state.location.lat === 0 || state.location.lon === 0) {
      const storageLocation = localStorage.getItem('location');
      if (!!storageLocation) {
        const [lat, lon] = storageLocation.split(',');
        setState({
          ...state,
          location: { lat: Number(lat), lon: Number(lon) },
        });
      }
    }
    setIsHomeLocationLoading(false);
  }, []);

  return (
    <HomeSection>
      {isHomeLocationLoading && <Loading />}
      <div style={{ outline: '1px solid purple', padding: '12px' }}>
        {!isContextLocation && (
          <IsNoLocation
            locationServicesDisabled={locationServicesDisabled}
            setHideHomeLocation={setHideHomeLocation}
            setIsHomeLocationLoading={setIsHomeLocationLoading}
            setLocationServicesDisabled={setLocationServicesDisabled}
          />
        )}
        {isContextLocation && <IsLocation />}
      </div>
    </HomeSection>
  );
};

export default HomeLocation;
