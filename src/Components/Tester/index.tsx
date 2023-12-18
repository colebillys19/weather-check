import { useContext, useEffect } from 'react';
import Context from '../../context'; // import your context

function Tester() {
  const { state, setState } = useContext(Context); // use the useContext hook

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`position: ${position.coords.latitude}, ${position.coords.longitude}`);
        setState({ location: { latitude: position.coords.latitude, longitude: position.coords.longitude } });
      });
    }
  }, [setState]);

  // Now you can use context in your component, and it will update whenever the context changes
  return (
    <div>Tester - Context Value: {JSON.stringify(state)}</div>
  );
}

export default Tester;
