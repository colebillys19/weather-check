import { useEffect } from 'react';

function Tester() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem(
          'location',
          `${position.coords.latitude},${position.coords.longitude}`,
        );
      });
    }
  }, []);

  return <div />;
}

export default Tester;
