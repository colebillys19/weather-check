import { useContext, useEffect, useRef, useState, FormEvent } from 'react';
import { Loader, Libraries } from '@googlemaps/js-api-loader';

import Context from '../../../../context';

interface ManualEntryProps {
  setFormType: (type: string) => void;
  setStep: (type: number) => void;
}

const ManualEntry: React.FC<ManualEntryProps> = ({ setFormType, setStep }) => {
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loaderRef = useRef<Loader | null>(null);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { state, setState } = useContext(Context);

  useEffect(() => {
    const googleApiInit = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
        libraries: ['places'] as Libraries,
      });
      loaderRef.current = loader;

      const google = await loader.load();

      if (inputRef.current) {
        autoCompleteRef.current = new google.maps.places.Autocomplete(
          inputRef.current,
        );
      }
    };

    googleApiInit();

    return () => {
      if (autoCompleteRef.current) {
        google.maps.event.clearInstanceListeners(autoCompleteRef.current);
      }
    };
  }, []);

  const handleChange = () => {
    setIsInputDisabled(!inputRef.current || inputRef.current.value === '');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const geocoder = new google.maps.Geocoder();

      new Promise((resolve, reject) => {
        geocoder.geocode(
          { address: inputRef.current?.value },
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
              console.error('Promise rejected:', status);
              reject(false);
            }
            setIsLoading(false);
          },
        );
      });
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Enter address, city, or zip: </label>
          <input
            className="address-search-field"
            id="address"
            onChange={handleChange}
            placeholder=""
            ref={inputRef}
            required
            type="text"
          />
        </div>
        <div>
          <input
            type="submit"
            value="Set Location"
            disabled={isInputDisabled}
          />
        </div>
      </form>
      {isLoading && <div>Loading...</div>}
      <div>
        <a onClick={() => setFormType('coords')} href="#">
          Enter exact coordinates
        </a>
      </div>
      <div>
        <a onClick={() => setStep(1)} href="#">
          Back
        </a>
      </div>
    </>
  );
};

export default ManualEntry;
