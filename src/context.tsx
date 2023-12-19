import { createContext } from 'react';

interface LocationContextType {
  lat: number;
  lon: number;
}

export interface ContextType {
  location: LocationContextType;
}


interface ContextPropsType {
  state: ContextType;
  setState: React.Dispatch<React.SetStateAction<ContextType>>;
}

export const DEFAULT_CONTEXT = {
  location: { lat: 0, lon: 0 },
};

export default createContext<ContextPropsType>({
  state: DEFAULT_CONTEXT,
  setState: () => {},
});
