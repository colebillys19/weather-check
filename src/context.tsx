import { createContext } from 'react';

import { DEFAULT_CONTEXT } from './utils/constants';

interface LocationContextType {
  lat: number;
  lon: number;
}

export interface ContextType {
  location: LocationContextType;
  hideDefaultLocation: boolean;
}


interface ContextPropsType {
  state: ContextType;
  setState: React.Dispatch<React.SetStateAction<ContextType>>;
}

export default createContext<ContextPropsType>({
  state: DEFAULT_CONTEXT,
  setState: () => {},
});
