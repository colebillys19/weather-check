interface SelectProps {
  handleButtonClick: (type: string) => void;
}

const Select: React.FC<SelectProps> = ({ handleButtonClick }) => (
  <>
    <p>How should we get your location?</p>
    <ul>
      <li>
        <button onClick={() => handleButtonClick('geolocate')}>
          Get location from browser
        </button>
      </li>
      <li>
        <button onClick={() => handleButtonClick('zip')}>Enter zip code</button>
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
      <li>
        <button onClick={() => handleButtonClick('skip')}>Skip for now</button>
      </li>
    </ul>
  </>
);

export default Select;
