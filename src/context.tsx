import { createContext } from 'react';

import { DEFAULT_CONTEXT } from './utils/constants';
import { ContextPropsType } from './utils/types';

export default createContext<ContextPropsType>({
  state: DEFAULT_CONTEXT,
  setState: () => {},
});
