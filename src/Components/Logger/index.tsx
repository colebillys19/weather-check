import { useContext, useEffect } from "react";

import Context from '../../context';

function Logger() {
  const context = useContext(Context);

  useEffect(() => {    
    console.log(context);
  }, [context]);

  return (
    <div>Logger</div>
  );
}

export default Logger;
