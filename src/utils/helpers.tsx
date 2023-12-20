export const getLocationData = async (lat: number, lon: number) => {
  const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OWM_KEY}`);
  return await response.json();
};
