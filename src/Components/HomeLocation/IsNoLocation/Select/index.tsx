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
        <button onClick={() => handleButtonClick('geolocate')} disabled={state.locationServicesDisabled}>
          Get location via browser
        </button>
        {state.locationServicesDisabled && <span>(Looks like your browser location services are disabled)</span>}
      </div>
      <ul className="location-select-ul">
        {/* TODO: delete class */}
        <li>
          <button onClick={() => handleButtonClick('zip')}>
            Enter zip code
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('city')}>Enter city</button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('address')}>
            Enter address
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('coords')}>
            Enter coordinates
          </button>
        </li>
      </ul>
      <div>
        <button onClick={() => handleButtonClick('skip')}>
          Don't find my location
        </button>
      </div>
    </>
  );
};

export default Select;
