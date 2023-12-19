import { useContext, useEffect, useState } from 'react';

import Context from '../../context';
import HomeSection from '../HomeSection';

import IsNoLocation from './IsNoLocation';
import IsLocation from './IsLocation';
import Loading from './Loading';

const HomeLocation = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { state, setState } = useContext(Context);

  const isContextLocation =
    state.location.lat !== 0 || state.location.lon !== 0;

  useEffect(() => {
    if (!isContextLocation) {
      const storageLocation = localStorage.getItem('location');
      if (storageLocation) {
        const [lat, lon] = storageLocation.split(',');
        setState({
          ...state,
          location: { lat: Number(lat), lon: Number(lon) },
        });
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <HomeSection>
      <div style={{ outline: '1px solid purple', padding: '12px' }}>
        {isLoading && <Loading />}
        {!isLoading && !isContextLocation && <IsNoLocation />}
        {!isLoading && isContextLocation && (
          <IsLocation location={state.location} />
        )}
      </div>
    </HomeSection>
  );
};

export default HomeLocation;
