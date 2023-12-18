import { useState } from 'react';

import Context from './context';
import { Tester, Logger } from './Components';
import './App.css';

import { DEFAULT_CONTEXT } from './utils/constants';
import { AppContextType } from './utils/types';

function App() {
  const [context, setContext] = useState<AppContextType>(DEFAULT_CONTEXT);

  return (
    <Context.Provider value={{ state: context, setState: setContext }}>
      <div className="App">
        <Tester />
        <Logger />
      </div>
    </Context.Provider>
  );
}

export default App;
