import { useContext } from 'react';

import Context from '../../../../context';

interface SelectProps {
  setFormType: (type: string) => void;
}

const Select: React.FC<SelectProps> = ({ setFormType }) => {
  const { state } = useContext(Context);

  return (
    <>
      <p>How should we find your location?</p>
      <div style={{ backgroundColor: '#c4b7ff' }}>
        <button
          onClick={() => setFormType('geolocate')}
          disabled={state.locationServicesDisabled}
        >
          Get location automatically
        </button>
        {state.locationServicesDisabled && (
          <p>
            It looks like your settings will prevent us from finding your
            location automatically - if you want to use this option please
            change your browser and/or computer settings and refresh this page.
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
