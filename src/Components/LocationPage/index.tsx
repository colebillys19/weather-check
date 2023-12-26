import { FC, useEffect, useState } from 'react';

import { checkCoordinatesStr, getLocationData } from '../../utils/helpers';
import { LocationData } from '../../utils/globalTypes';
import MainContainer from '../MainContainer';
import LocationDisplay from './LocationDisplay';
import Loading from './Loading';

interface LocationPageProps {
  googleMaps: typeof google.maps | null;
  unitType: string;
}

const LocationPage: FC<LocationPageProps> = ({ googleMaps, unitType }) => {
  const [isAsyncError, setIsAsyncError] = useState(false);
  const [isFetchingLocationData, setIsFetchingLocationData] = useState(true);
  const [isFetchingLocationName, setIsFetchingLocationName] = useState(true);
  const [isInvalidQueryArg, setIsInvalidQueryArg] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [locationName, setLocationName] = useState('');

  const urlParams = new URLSearchParams(window.location.search);
  const targetLocation = urlParams.get('location');

  useEffect(() => {
    // check if the location query arg exists
    if (!targetLocation) {
      setIsInvalidQueryArg(true);
      return;
    }
    // check if the location query arg is valid
    const isValidCoordinatesStr = checkCoordinatesStr(targetLocation);
    if (!isValidCoordinatesStr) {
      setIsInvalidQueryArg(true);
      return;
    }
    if (!isFetchingLocationData) {
      setIsFetchingLocationData(true);
    }
    const fetchLocationData = async () => {
      if (googleMaps !== null) {
        const geocoder = new googleMaps.Geocoder();
        const [lat, lon] = targetLocation.split(',');
        const locationData = await getLocationData(
          Number(lat),
          Number(lon),
          unitType,
        );
        try {
          new Promise((resolve, reject) => {
            geocoder.geocode(
              { address: `${lat}, ${lon}` },
              (
                results: google.maps.GeocoderResult[],
                status: google.maps.GeocoderStatus,
              ) => {
                if (status === googleMaps.GeocoderStatus.OK) {
                  const locationObjLocality = results.find(({ types }) =>
                    types.includes('locality'),
                  );
                  setLocationName(locationObjLocality?.formatted_address || '');
                  resolve(true);
                  setIsFetchingLocationName(false);
                } else {
                  reject(false);
                  setIsAsyncError(true);
                  setIsFetchingLocationName(false);
                }
              },
            );
          });
        } catch (error) {
          setIsAsyncError(true);
          setIsFetchingLocationName(false);
        }
        setLocationData(locationData);
        setIsFetchingLocationData(false);
      }
    };
    fetchLocationData();
  }, [unitType]);

  if (isInvalidQueryArg || isAsyncError) {
    return (
      <MainContainer>
        <h1>Location Page</h1>
        <p>There's a problem...</p>
      </MainContainer>
    );
  }

  if (
    isFetchingLocationData ||
    isFetchingLocationName ||
    locationData === null
  ) {
    return (
      <MainContainer>
        <h1>Location Page</h1>
        <Loading />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <h1>Location Page</h1>
      <LocationDisplay
        locationData={locationData}
        locationName={locationName}
      />
    </MainContainer>
  );
};

export default LocationPage;
