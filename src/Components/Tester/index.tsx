import { useContext, useEffect, useState } from 'react';
import Context from '../../context';

function Tester() {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { state, setState } = useContext(Context);

  useEffect(() => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setState({
          ...state,
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        });
        localStorage.setItem(
          'location',
          `${position.coords.latitude},${position.coords.longitude}`,
        );
        setIsGettingLocation(false);
      });
    }
  }, [setState]);

  return (
    <>
      <div>isGettingLocation: {isGettingLocation ? 'true' : 'false'}</div>
      <div>Tester - Context Value: {JSON.stringify(state)}</div>
    </>
  );
}

export default Tester;
