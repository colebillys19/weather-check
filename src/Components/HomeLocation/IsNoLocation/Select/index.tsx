import { FC, useContext } from 'react';

import Context from '../../../../context';

interface SelectProps {
  setFormType: (type: string) => void;
  setIsAttemptingToGeolocate: (value: boolean) => void;
}

const Select: FC<SelectProps> = ({
  setFormType,
  setIsAttemptingToGeolocate,
}) => {
  const { state, setState } = useContext(Context);

  const useGeolocate = () => {
    setIsAttemptingToGeolocate(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationStr = `${position.coords.latitude},${position.coords.longitude}`;
        setState({ ...state, userLocation: locationStr });
        localStorage.setItem('location', locationStr);
        setIsAttemptingToGeolocate(false);
      },
      () => {
        setIsAttemptingToGeolocate(false);
      },
    );
  };

  return (
    <>
      <p>How should we find your location?</p>
      <div style={{ backgroundColor: '#c4b7ff' }}>
        <button
          onClick={useGeolocate}
          disabled={!!state.locationServicesDisabled}
        >
          Get location automatically
        </button>
        {state.locationServicesDisabled && (
          <p>
            It looks like your settings are preventing us from finding your
            location automatically.
          </p>
        )}
      </div>
      <div>
        <button onClick={() => setFormType('manual')}>Enter location</button>
      </div>
      <div>
        <button onClick={() => setFormType('skip')}>
          Don't find my location
        </button>
      </div>
    </>
  );
};

export default Select;
