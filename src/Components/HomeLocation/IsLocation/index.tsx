import { useContext } from 'react';

import Context from '../../../context';

const IsLocation = () => {
  const { state } = useContext(Context);

  return <p>Location: {state.userLocation}</p>;
};

export default IsLocation;
