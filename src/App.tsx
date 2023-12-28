import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader, Libraries } from '@googlemaps/js-api-loader';

import { Header, HomePage, LocationPage } from './Components';
import './App.css';

function App() {
  const [locationServicesDisabled, setLocationServicesDisabled] = useState<
    boolean | null
  >(null);
  const [userLocation, setUserLocation] = useState('');
  const [unitType, setUnitType] = useState('imperial');

  const loaderRef = useRef<Loader | null>(null);
  const googleMapsRef = useRef<typeof google.maps | null>(null);

  useEffect(() => {
    const googleApiInit = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
        libraries: ['places'] as Libraries,
      });
      loaderRef.current = loader;
      const google = await loader.load();
      googleMapsRef.current = google.maps;
    };

    googleApiInit();
  }, []);

  // if navigator.geolocation.getCurrentPosition has any issues, set locationServicesDisabled to true in state
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => null,
      () => {
        setLocationServicesDisabled(true);
      },
    );
  }, []);

  return (
    <Router>
      <div className="App">
        <Header setUnitType={setUnitType} unitType={unitType} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                googleMaps={googleMapsRef.current}
                locationServicesDisabled={locationServicesDisabled}
                setUserLocation={setUserLocation}
                unitType={unitType}
                userLocation={userLocation}
              />
            }
          />
          <Route
            path="/location"
            element={
              <LocationPage googleMaps={googleMapsRef.current} unitType={unitType} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
