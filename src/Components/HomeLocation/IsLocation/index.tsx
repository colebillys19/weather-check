import { useContext } from 'react';

import Context from '../../../context';

const IsLocation = () => {
  const { state } = useContext(Context);

  return (
    <p>
      Location: {state.location.lat}, {state.location.lon}
    </p>
  );
};

export default IsLocation;
