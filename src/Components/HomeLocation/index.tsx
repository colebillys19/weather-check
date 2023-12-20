import { FC, useContext, useEffect, useState } from 'react';

import Context from '../../context';
import HomeSection from '../HomeSection';

import IsNoLocation from './IsNoLocation';
import IsLocation from './IsLocation';
import Loading from './Loading';

interface HomeLocationProps {
  setHideHomeLocation: (value: boolean) => void;
}

const HomeLocation: FC<HomeLocationProps> = ({ setHideHomeLocation }) => {
  const [isCheckingLocalStorage, setIsCheckingLocalStorage] = useState(false);
  const [isAttemptingToGeolocate, setIsAttemptingToGeolocate] = useState(false);
  const [isCheckingIfAddressExists, setIsCheckingIfAddressExists] =
    useState(false);
  const [isContextLocation, setIsContextLocation] = useState(false);

  const { state, setState } = useContext(Context);

  // update local state based on context state
  useEffect(() => {
    setIsContextLocation(state.userLocation.length > 0);
  }, [state.userLocation]);

  useEffect(() => {
    if (state.userLocation === '') {
      const storageLocation = localStorage.getItem('location');
      if (!!storageLocation) {
        setState({ ...state, userLocation: storageLocation });
      }
    }
    setIsCheckingLocalStorage(false);
  }, []);

  const isHomeLocationLoading =
    state.locationServicesDisabled === null ||
    isCheckingLocalStorage ||
    isAttemptingToGeolocate ||
    isCheckingIfAddressExists;

  return (
    <HomeSection>
      {isHomeLocationLoading && <Loading />}
      <div style={{ outline: '1px solid purple', padding: '12px' }}>
        {!isContextLocation && (
          <IsNoLocation
            setHideHomeLocation={setHideHomeLocation}
            setIsAttemptingToGeolocate={setIsAttemptingToGeolocate}
            setIsCheckingIfAddressExists={setIsCheckingIfAddressExists}
          />
        )}
        {isContextLocation && <IsLocation />}
      </div>
    </HomeSection>
  );
};

export default HomeLocation;
