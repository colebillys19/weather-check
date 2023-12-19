import { FC, useState } from 'react';

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

  const setFormType = (buttonId: string) => {
    if (buttonId === 'skip') {
      setHideHomeLocation(true);
    } else {
      setMethod(buttonId);
      setStep(2);
    }
  };

  if (step === 1) {
    return (
      <Select
        locationServicesDisabled={locationServicesDisabled}
        setFormType={setFormType}
        setIsHomeLocationLoading={setIsHomeLocationLoading}
        setLocationServicesDisabled={setLocationServicesDisabled}
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
