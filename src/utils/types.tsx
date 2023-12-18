interface LocationContextType {
  latitude: number;
  longitude: number;
}

export interface ContextType {
  location: LocationContextType;
}

export interface ContextPropsType {
  state: ContextType;
  setState: React.Dispatch<React.SetStateAction<ContextType>>;
}
