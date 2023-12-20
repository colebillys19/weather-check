import { Dispatch, createContext, SetStateAction } from 'react';

import { ContextType } from './utils/globalTypes';

interface ContextPropsType {
  state: ContextType;
  setState: Dispatch<SetStateAction<ContextType>>;
}

export const DEFAULT_CONTEXT = { locationServicesDisabled: null, userLocation: '' };

export default createContext<ContextPropsType>({
  state: DEFAULT_CONTEXT,
  setState: () => {},
});
