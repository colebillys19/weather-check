import { createContext } from 'react';

import { DEFAULT_CONTEXT } from './utils/constants';
import { AppContextType } from './utils/types';

interface ContextProps {
  state: AppContextType;
  setState: React.Dispatch<React.SetStateAction<AppContextType>>;
}

export default createContext<ContextProps>({
  state: DEFAULT_CONTEXT,
  setState: () => {},
});
