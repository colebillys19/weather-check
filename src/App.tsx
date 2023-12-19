import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Context, { DEFAULT_CONTEXT } from './context';
import { Header, HomePage, LocationPage } from './Components';
import { ContextType } from './utils/globalTypes';
import './App.css';

function App() {
  const [context, setContext] = useState<ContextType>(DEFAULT_CONTEXT);
  const [locationServicesDisabled, setLocationServicesDisabled] =
    useState(false);

  // if navigator.geolocation.getCurrentPosition has any issues, set locationServicesDisabled to true in state
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => null,
      () => {
        setLocationServicesDisabled(true);
      },
    );
  }, []);

  useEffect(() => {
    
  }, []);

  return (
    <Router>
      <Context.Provider value={{ state: context, setState: setContext }}>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  locationServicesDisabled={locationServicesDisabled}
                  setLocationServicesDisabled={setLocationServicesDisabled}
                />
              }
            />
            <Route path="/location" element={<LocationPage />} />
          </Routes>
        </div>
      </Context.Provider>
    </Router>
  );
}

export default App;
