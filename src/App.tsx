import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Context, { DEFAULT_CONTEXT } from './context';
import { Header, HomePage, LocationPage } from './Components';
import { ContextType } from './utils/globalTypes';
import './App.css';

function App() {
  const [context, setContext] = useState<ContextType>(DEFAULT_CONTEXT);

  // if navigator.geolocation.getCurrentPosition has any issues, set locationServicesDisabled to true in state
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => null,
      () => {
        setContext({ ...context, locationServicesDisabled: true });
      },
    );
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
                <HomePage />
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
