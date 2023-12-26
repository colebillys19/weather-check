import { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react';

import { isValidCoordinates } from '../../../../utils/helpers';

interface CoordsProps {
  setFormType: (type: string) => void;
  setIsVerifyingAddress: (value: boolean) => void;
  setUserLocation: (value: string) => void;
}

const Coords: FC<CoordsProps> = ({
  setFormType,
  setIsVerifyingAddress,
  setUserLocation,
}) => {
  const [inputError, setInputError] = useState('');
  const [latValue, setLatValue] = useState('');
  const [lonValue, setLonValue] = useState('');

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

    if (!isValidCoordinates(Number(latValue), Number(lonValue))) {
      setInputError('Invalid coordinates');
      return;
    }

    try {
      setIsVerifyingAddress(true);

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
              const locationStr = `${location.lat()},${location.lng()}`;
              setUserLocation(locationStr);
              localStorage.setItem('location', locationStr);
              resolve(true);
            } else {
              setInputError('Invalid coordinates');
              console.error('Promise rejected:', status);
              reject(false);
            }
            setIsVerifyingAddress(false);
          },
        );
      });
    } catch (error) {
      setInputError('Invalid coordinates');
      console.error('Error:', error);
      setIsVerifyingAddress(false);
    }
  };

  const handleManualClick = (e: MouseEvent) => {
    e.preventDefault();
    setFormType('manual');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lat">Latitude: </label>
          <input
            onChange={handleLatChange}
            type="number"
            id="lat"
            value={latValue}
            required
          />
        </div>
        <div>
          <label htmlFor="lon">Longitude: </label>
          <input
            onChange={handleLonChange}
            type="number"
            id="lon"
            value={lonValue}
            required
          />
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
      <a onClick={handleManualClick} href="#">
        Back
      </a>
    </>
  );
};

export default Coords;
