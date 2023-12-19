import { FC, useContext, useState } from 'react';

import Context from '../../../context';

import Coords from './Coords';
import ManualEntry from './ManualEntry';
import Select from './Select';

interface IsNoLocationProps {
  locationServicesDisabled: boolean;
  setHideHomeLocation: (value: boolean) => void;
  setIsHomeLocationLoading: (value: boolean) => void;
  setLocationServicesDisabled: (value: boolean) => void;
}

const IsNoLocation: FC<IsNoLocationProps> = ({
  locationServicesDisabled,
  setHideHomeLocation,
  setIsHomeLocationLoading,
  setLocationServicesDisabled,
}) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('');

  const { state, setState } = useContext(Context);

  const setFormType = (buttonId: string) => {
    if (buttonId === 'skip') {
      setHideHomeLocation(true);
    } else {
      setMethod(buttonId);
      setStep(2);
    }
  };

  const useGeolocate = () => {
    setIsHomeLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
        setIsHomeLocationLoading(false);
      },
      () => {
        setLocationServicesDisabled(true);
        setIsHomeLocationLoading(false);
      },
    );
  };

  if (step === 1) {
    return (
      <Select
        locationServicesDisabled={locationServicesDisabled}
        setFormType={setFormType}
        useGeolocate={useGeolocate}
      />
    );
  }

  if (step === 2) {
    if (method === 'manual') {
      return (
        <ManualEntry
          setFormType={setFormType}
          setIsHomeLocationLoading={setIsHomeLocationLoading}
          setStep={setStep}
        />
      );
    }

    if (method === 'coords') {
      return (
        <Coords
          setFormType={setFormType}
          setIsHomeLocationLoading={setIsHomeLocationLoading}
        />
      );
    }
  }

  return <div />;
};

export default IsNoLocation;
