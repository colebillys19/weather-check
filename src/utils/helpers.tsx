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

export const isValidCoordinates = (lat: number, lon: number) => {
  if (lat > 90 || lat < -90 || lon > 180 || lon < -180) {
    return false;
  }
  return true;
};

export const checkCoordinatesStr = (coordsStr: string) => {
  if (!coordsStr.includes(',')) {
    return false;
  }
  const [latStr, lonStr] = coordsStr.split(',');
  const latNum = Number(latStr);
  const lonNum = Number(lonStr);
  if (isNaN(latNum) || isNaN(lonNum)) {
    return false;
  }
  if (latNum > 90 || latNum < -90 || lonNum > 180 || lonNum < -180) {
    return false;
  }
  return true;
};
