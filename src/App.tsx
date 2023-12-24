import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header, HomePage, LocationPage } from './Components';
import './App.css';

function App() {
  const [locationServicesDisabled, setLocationServicesDisabled] = useState<
    boolean | null
  >(null);
  const [userLocation, setUserLocation] = useState('');
  const [unitType, setUnitType] = useState('imperial');

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
                locationServicesDisabled={locationServicesDisabled}
                setUserLocation={setUserLocation}
                unitType={unitType}
                userLocation={userLocation}
              />
            }
          />
          <Route path="/location" element={<LocationPage unitType={unitType} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
