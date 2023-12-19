interface SelectProps {
  locationServicesDisabled: boolean;
  setFormType: (type: string) => void;
  useGeolocate: () => void;
}

const Select: React.FC<SelectProps> = ({ locationServicesDisabled, setFormType, useGeolocate }) => (
  <>
    <p>How should we find your location?</p>
    <div style={{ backgroundColor: '#c4b7ff' }}>
      <button
        onClick={useGeolocate}
        disabled={locationServicesDisabled}
      >
        Get location automatically
      </button>
      {locationServicesDisabled && (
          <p>
            It looks like your settings will prevent us from finding your
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

export default Select;
