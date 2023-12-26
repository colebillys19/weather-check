import { FC, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';

interface ManualEntryProps {
  googleMaps: typeof google.maps | null;
  setFormType: (type: string) => void;
  setIsVerifyingAddress: (value: boolean) => void;
  setStep: (step: number) => void;
  setUserLocation: (value: string) => void;
}

const ManualEntry: FC<ManualEntryProps> = ({
  googleMaps,
  setFormType,
  setIsVerifyingAddress,
  setStep,
  setUserLocation,
}) => {
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const googleApiInit = async () => {
      if (inputRef.current && googleMaps !== null) {
        autoCompleteRef.current = new googleMaps.places.Autocomplete(
          inputRef.current,
        );
      }
    };

    googleApiInit();

    return () => {
      if (autoCompleteRef.current && googleMaps !== null) {
        googleMaps.event.clearInstanceListeners(autoCompleteRef.current);
      }
    };
  }, []);

  const handleChange = () => {
    setIsInputDisabled(!inputRef.current || inputRef.current.value === '');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsVerifyingAddress(true);

    try {
      if (googleMaps !== null) {
        const geocoder = new googleMaps.Geocoder();
        new Promise((resolve, reject) => {
          geocoder.geocode(
            { address: inputRef.current?.value },
            (
              results: google.maps.GeocoderResult[],
              status: google.maps.GeocoderStatus,
            ) => {
              if (status === googleMaps.GeocoderStatus.OK) {
                const location = results[0].geometry.location;
                const locationStr = `${location.lat()},${location.lng()}`;
                setUserLocation(locationStr);
                localStorage.setItem('location', locationStr);
                resolve(true);
              } else {
                console.error('Promise rejected:', status);
                reject(false);
              }
              setIsVerifyingAddress(false);
            },
          );
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setIsVerifyingAddress(false);
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
