import { useContext, useState } from 'react';

import Context from '../../../context';

import Loading from '../Loading';
import Address from './Address';
import City from './City';
import Coords from './Coords';
import GeoLocate from './GeoLocate';
import Select from './Select';
import Zip from './Zip';

const IsNoLocation = () => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('');

  const { state, setState } = useContext(Context);

  const handleButtonClick = (buttonId: string) => {
    if (buttonId === 'skip') {
      setState({ ...state, hideHomeLocation: true });
    } else {
      setMethod(buttonId);
      setStep(2);
    }
  };

  if (step === 1) {
    return <Select handleButtonClick={handleButtonClick} />;
  }

  if (step === 2) {
    if (method === 'geolocate') {
      return <GeoLocate setStep={setStep} />;
    }

    if (method === 'zip') {
      return <Zip />;
    }

    if (method === 'city') {
      return <City />;
    }

    if (method === 'address') {
      return <Address />;
    }

    if (method === 'coords') {
      return <Coords />;
    }
  }

  return <Loading />;
};

export default IsNoLocation;
