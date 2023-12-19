import { useContext } from 'react';

import Context from '../../../../context';

interface SelectProps {
  handleButtonClick: (type: string) => void;
}

const Select: React.FC<SelectProps> = ({ handleButtonClick }) => {
  const { state } = useContext(Context);

  return (
    <>
      <p>How should we find your location?</p>
      <div>
        <button
          onClick={() => handleButtonClick('geolocate')}
          disabled={state.locationServicesDisabled}
        >
          Get location via browser
        </button>
        {state.locationServicesDisabled && (
          <p>
            Either browser or computer settings are preventing this page from accessing your location.
          </p>
        )}
      </div>
      <div>
        <button onClick={() => handleButtonClick('address')}>
          Manually enter either an address, city, or zip code
        </button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('coords')}>
          Enter coordinates
        </button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('skip')}>
          Don't find my location
        </button>
      </div>
    </>
  );
};

export default Select;
