import { useState } from 'react';

import Context from './context';
import { Tester } from './Components';
import './App.css';

import { DEFAULT_CONTEXT } from './utils/constants';
import { ContextType } from './utils/types';

function App() {
  const [context, setContext] = useState<ContextType>(DEFAULT_CONTEXT);

  return (
    <Context.Provider value={{ state: context, setState: setContext }}>
      <div className="App">
        <Tester />
      </div>
    </Context.Provider>
  );
}

export default App;
