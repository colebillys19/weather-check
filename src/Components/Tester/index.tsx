import { useContext, useEffect, useState } from 'react';

import Context from '../../context';
import mockData from './mockData';

function Tester() {
  const [data, setData] = useState({});

  const context = useContext(Context);

  // const lon = '40.70264760075978';
  // const lat = '-73.92374422653394';

  // useEffect(() => {
  //   async function getData() {
  //     const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lon=${lon}&lat=${lat}&appid=${process.env.REACT_APP_OWM_KEY}}`);
  //     const responseJson = await response.json();
  //     console.log(responseJson);
  //   }
  //   getData();
  // }, []);

  useEffect(() => {
    setData(mockData);
  }, []);

  return (
    <div>Tester</div>
  );
}

export default Tester;
