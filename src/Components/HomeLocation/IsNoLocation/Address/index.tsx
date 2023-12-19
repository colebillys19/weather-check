import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { Loader } from "@googlemaps/js-api-loader"

// import { verifyAddress } from '../../../../utils/helpers';

declare global {
  interface Window {
    google: any;
  }
}

const Address = () => {
  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      if (!autocompleteInputRef.current) {
        return;
      }

      autocompleteRef.current = new window.google.maps.places.Autocomplete(autocompleteInputRef.current);

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();

        if (!place.geometry) {
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        console.log('Place details:', place);
        setAddress(place.formatted_address);
      });
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      if (window.google && window.google.maps && window.google.maps.event && autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="address">Address: </label>
        <input
          className="address-search-field"
          id="address"
          onChange={handleChange}
          ref={autocompleteInputRef}
          required
          type="text"
          value={address}
        />
      </div>
      <div>
        <input type="submit" value="Set Location" />
      </div>
    </form>
  );
};

export default Address;
