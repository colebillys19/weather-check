export const getLocationData = async (
  lat: number,
  lon: number,
  unitType: string,
) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${unitType}&appid=${process.env.REACT_APP_OWM_KEY}`,
  );
  return await response.json();
};
