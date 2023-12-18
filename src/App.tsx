import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Context, { ContextType } from './context';
import { Header, HomePage, LocationPage } from './Components';
import { DEFAULT_CONTEXT } from './utils/constants';
import './App.css';

function App() {
  const [context, setContext] = useState<ContextType>(DEFAULT_CONTEXT);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => null, () => {
      setContext({ ...context, locationServicesDisabled: true });
    });
  }, []);

  return (
    <Router>
      <Context.Provider value={{ state: context, setState: setContext }}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/location" element={<LocationPage />} />
          </Routes>
          {/* <Tester /> */}
        </div>
      </Context.Provider>
    </Router>
  );
}

export default App;
