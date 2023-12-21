import { FC } from 'react';

interface SelectProps {
  locationServicesDisabled: boolean | null;
  setFormType: (type: string) => void;
  setHideHomeLocation: (value: boolean) => void;
  setIsAttemptingToGeolocate: (value: boolean) => void;
  setUserLocation: (value: string) => void;
}

const Select: FC<SelectProps> = ({
  locationServicesDisabled,
  setFormType,
  setHideHomeLocation,
  setIsAttemptingToGeolocate,
  setUserLocation,
}) => {
  const useGeolocate = () => {
    setIsAttemptingToGeolocate(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationStr = `${position.coords.latitude},${position.coords.longitude}`;
        setUserLocation(locationStr);
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
        <button onClick={useGeolocate} disabled={!!locationServicesDisabled}>
          Get location automatically
        </button>
        {locationServicesDisabled && (
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
        <button onClick={() => setHideHomeLocation(true)}>
          Don't find my location
        </button>
      </div>
    </>
  );
};

export default Select;
