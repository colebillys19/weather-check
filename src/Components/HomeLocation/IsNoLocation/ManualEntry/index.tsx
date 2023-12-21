import { FC, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Loader, Libraries } from '@googlemaps/js-api-loader';

interface ManualEntryProps {
  setFormType: (type: string) => void;
  setIsCheckingIfAddressExists: (value: boolean) => void;
  setStep: (step: number) => void;
  setUserLocation: (value: string) => void;
}

const ManualEntry: FC<ManualEntryProps> = ({
  setFormType,
  setIsCheckingIfAddressExists,
  setStep,
  setUserLocation,
}) => {
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const loaderRef = useRef<Loader | null>(null);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    setIsCheckingIfAddressExists(true);

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
              const locationStr = `${location.lat()},${location.lng()}`;
              setUserLocation(locationStr);
              localStorage.setItem('location', locationStr);
              resolve(true);
            } else {
              console.error('Promise rejected:', status);
              reject(false);
            }
            setIsCheckingIfAddressExists(false);
          },
        );
      });
    } catch (error) {
      console.error('Error:', error);
      setIsCheckingIfAddressExists(false);
    }
  };

  const handleCoordsClick = (e: MouseEvent) => {
    e.preventDefault();
    setFormType('coords');
  };

  const handleBackClick = (e: MouseEvent) => {
    e.preventDefault();
    setStep(1);
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
      <div>
        <a onClick={handleCoordsClick} href="#">
          Enter exact coordinates
        </a>
      </div>
      <div>
        <a onClick={handleBackClick} href="#">
          Back
        </a>
      </div>
    </>
  );
};

export default ManualEntry;
