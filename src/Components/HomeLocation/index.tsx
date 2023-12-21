import { FC, useEffect } from 'react';

import HomeSection from '../HomeSection';

import IsNoLocation from './IsNoLocation';
import IsLocation from './IsLocation';
import Loading from './Loading';

interface HomeLocationProps {
  locationServicesDisabled: boolean | null;
  setHideHomeLocation: (value: boolean) => void;
  setUserLocation: (value: string) => void;
  unitType: string;
  userLocation: string;
}

const HomeLocation: FC<HomeLocationProps> = ({
  locationServicesDisabled,
  setHideHomeLocation,
  setUserLocation,
  unitType,
  userLocation,
}) => {
  useEffect(() => {
    if (userLocation === '') {
      const storageLocation = localStorage.getItem('location');
      if (!!storageLocation) {
        setUserLocation(storageLocation);
      }
    }
  }, []);

  if (locationServicesDisabled === null) {
    return <Loading />;
  }

  return (
    <HomeSection>
      {!!userLocation ? (
        <IsLocation unitType={unitType} userLocation={userLocation} />
      ) : (
        <IsNoLocation
          locationServicesDisabled={locationServicesDisabled}
          setHideHomeLocation={setHideHomeLocation}
          setUserLocation={setUserLocation}
        />
      )}
    </HomeSection>
  );
};

export default HomeLocation;
