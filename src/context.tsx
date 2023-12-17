import { createContext } from "react";

import { AppContextType } from './utils/types';

export default createContext<AppContextType | null>(null);
