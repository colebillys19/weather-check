import { useContext, useState } from 'react';

import Context from '../../../context';

import Loading from '../Loading';
import ManualEntry from './ManualEntry';
import Coords from './Coords';
import GeoLocate from './GeoLocate';
import Select from './Select';

const IsNoLocation = () => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('');

  const { state, setState } = useContext(Context);

  const setFormType = (buttonId: string) => {
    if (buttonId === 'skip') {
      setState({ ...state, hideHomeLocation: true });
    } else {
      setMethod(buttonId);
      setStep(2);
    }
  };

  if (step === 1) {
    return <Select setFormType={setFormType} />;
  }

  if (step === 2) {
    if (method === 'geolocate') {
      return <GeoLocate setStep={setStep} />;
    }

    if (method === 'manual') {
      return <ManualEntry setFormType={setFormType} setStep={setStep} />;
    }

    if (method === 'coords') {
      return <Coords setFormType={setFormType} />;
    }
  }

  return <Loading />;
};

export default IsNoLocation;
