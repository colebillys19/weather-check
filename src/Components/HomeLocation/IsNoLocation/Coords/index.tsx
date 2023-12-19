import { useContext, useState, ChangeEvent, FormEvent } from 'react';

import Context from '../../../../context';

const isValidLat = (num: number) => num >= -90 && num <= 90;
const isValidLon = (num: number) => num >= -180 && num <= 180;

interface CoordsProps {
  setFormType: (type: string) => void;
}

const Coords: React.FC<CoordsProps> = ({ setFormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const [latValue, setLatValue] = useState('');
  const [lonValue, setLonValue] = useState('');

  const { state, setState } = useContext(Context);

  const handleLatChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLatValue(e.target.value);
    if (inputError) {
      setInputError('');
    }
  };

  const handleLonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLonValue(e.target.value);
    if (inputError) {
      setInputError('');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValidLat(Number(latValue)) || !isValidLon(Number(lonValue))) {
      setInputError('Invalid coordinates');
      setIsLoading(false);
      return;
    }

    try {
      const geocoder = new google.maps.Geocoder();

      new Promise((resolve, reject) => {
        geocoder.geocode(
          { address: `${latValue}, ${lonValue}` },
          (
            results: google.maps.GeocoderResult[],
            status: google.maps.GeocoderStatus,
          ) => {
            if (status === google.maps.GeocoderStatus.OK) {
              const location = results[0].geometry.location;
              const lat = location.lat();
              const lon = location.lng();
              setState({ ...state, location: { lat, lon } });
              localStorage.setItem('location',`${lat},${lon}`);
              resolve(true);
            } else {
              setInputError('Invalid coordinates');
              console.error('Promise rejected:', status);
              reject(false);
            }
            setIsLoading(false);
          },
        );
      });
    } catch (error) {
      setInputError('Invalid coordinates');
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lat">Latitude: </label>
          <input onChange={handleLatChange} type="number" id="lat" value={latValue} required />
        </div>
        <div>
          <label htmlFor="lon">Longitude: </label>
          <input onChange={handleLonChange} type="number" id="lon" value={lonValue} required />
        </div>
        <div>
          <input
            type="submit"
            value="Set Location"
            disabled={!latValue || !lonValue}
          />
        </div>
      </form>
      {!!inputError && <div style={{ color: 'red' }}>{inputError}</div>}
      {isLoading && <div>Loading...</div>}
      <a onClick={() => setFormType('manual')} href="#">
        Back
      </a>
    </>
  );
};

export default Coords;
