import { FC, useState } from 'react';

import Coords from './Coords';
import ManualEntry from './ManualEntry';
import Select from './Select';

interface IsNoLocationProps {
  setHideHomeLocation: (value: boolean) => void;
  setIsAttemptingToGeolocate: (value: boolean) => void;
  setIsCheckingIfAddressExists: (value: boolean) => void;
}

const IsNoLocation: FC<IsNoLocationProps> = ({
  setHideHomeLocation,
  setIsAttemptingToGeolocate,
  setIsCheckingIfAddressExists,
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
        setFormType={setFormType}
        setIsAttemptingToGeolocate={setIsAttemptingToGeolocate}
      />
    );
  }

  if (step === 2) {
    if (method === 'manual') {
      return (
        <ManualEntry
          setFormType={setFormType}
          setIsCheckingIfAddressExists={setIsCheckingIfAddressExists}
          setStep={setStep}
        />
      );
    }

    if (method === 'coords') {
      return (
        <Coords
          setFormType={setFormType}
          setIsCheckingIfAddressExists={setIsCheckingIfAddressExists}
        />
      );
    }
  }

  return <div />;
};

export default IsNoLocation;
