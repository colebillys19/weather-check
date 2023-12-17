import { useState } from 'react';

import Context from './context';
import { Tester } from './Components';
import { AppContextType } from './utils/types';
import './App.css';

function App() {
  const [context] = useState<AppContextType>({ location: { latitude: 0, longitude: 0 } });

  return (
    <Context.Provider value={context}>
      <div className="App">
        <Tester />
      </div>
    </Context.Provider>
  );
}

export default App;
