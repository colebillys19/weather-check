import { FC, useState } from 'react';

import Coords from './Coords';
import Loading from './Loading';
import ManualEntry from './ManualEntry';
import Select from './Select';

interface IsNoLocationProps {
  googleMaps: typeof google.maps | null;
  locationServicesDisabled: boolean | null;
  setHideHomeLocation: (value: boolean) => void;
  setUserLocation: (value: string) => void;
}

const IsNoLocation: FC<IsNoLocationProps> = ({
  googleMaps,
  locationServicesDisabled,
  setHideHomeLocation,
  setUserLocation,
}) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('');
  const [isAttemptingToGeolocate, setIsAttemptingToGeolocate] = useState(false);
  const [isVerifyingAddress, setIsVerifyingAddress] =
    useState(false);

  const setFormType = (buttonId: string) => {
    setMethod(buttonId);
    setStep(2);
  };

  const isLoading =
    locationServicesDisabled === null ||
    isAttemptingToGeolocate ||
    isVerifyingAddress;

  if (isLoading) {
    return <Loading />;
  }

  if (step === 1) {
    return (
      <Select
        locationServicesDisabled={locationServicesDisabled}
        setFormType={setFormType}
        setHideHomeLocation={setHideHomeLocation}
        setIsAttemptingToGeolocate={setIsAttemptingToGeolocate}
        setUserLocation={setUserLocation}
      />
    );
  }

  if (step === 2) {
    if (method === 'manual') {
      return (
        <ManualEntry
          googleMaps={googleMaps}
          setFormType={setFormType}
          setIsVerifyingAddress={setIsVerifyingAddress}
          setStep={setStep}
          setUserLocation={setUserLocation}
        />
      );
    }

    if (method === 'coords') {
      return (
        <Coords
          setFormType={setFormType}
          setIsVerifyingAddress={setIsVerifyingAddress}
          setUserLocation={setUserLocation}
        />
      );
    }
  }

  return <div />;
};

export default IsNoLocation;
