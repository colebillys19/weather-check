import { Dispatch, createContext, SetStateAction } from 'react';

interface LocationContextType {
  lat: number;
  lon: number;
}

export interface ContextType {
  location: LocationContextType;
}


interface ContextPropsType {
  state: ContextType;
  setState: Dispatch<SetStateAction<ContextType>>;
}

export const DEFAULT_CONTEXT = {
  location: { lat: 0, lon: 0 },
};

export default createContext<ContextPropsType>({
  state: DEFAULT_CONTEXT,
  setState: () => {},
});
