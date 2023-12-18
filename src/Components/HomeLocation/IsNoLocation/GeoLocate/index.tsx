import { useContext, useEffect } from 'react';

import Context from '../../../../context';

interface GeolocateProps {
  setStep: (type: number) => void;
}

const GeoLocate: React.FC<GeolocateProps> = ({ setStep }) => {
  const { state, setState } = useContext(Context);

  useEffect(() => {
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
    }, (err) => {
      setState({ ...state, locationServicesDisabled: true });
      setStep(1);
    });
  }, []);

  return <div>Getting location...</div>;
};

export default GeoLocate;
