import { FC, useState } from 'react';

import MainContainer from '../MainContainer';
import HomeSection from '../HomeSection';
import HomeLocation from '../HomeLocation';

interface HomePageProps {
  googleMaps: typeof google.maps | null;
  locationServicesDisabled: boolean | null;
  setUserLocation: (value: string) => void;
  unitType: string;
  userLocation: string;
}

const HomePage: FC<HomePageProps> = ({
  googleMaps,
  locationServicesDisabled,
  setUserLocation,
  unitType,
  userLocation,
}) => {
  const [hideHomeLocation, setHideHomeLocation] = useState(false);

  return (
    <MainContainer>
      {!hideHomeLocation && (
        <HomeLocation
          googleMaps={googleMaps}
          locationServicesDisabled={locationServicesDisabled}
          setHideHomeLocation={setHideHomeLocation}
          setUserLocation={setUserLocation}
          unitType={unitType}
          userLocation={userLocation}
        />
      )}
      <HomeSection>
        <h2>Map</h2>
        <p>
          Nibh sed pulvinar proin gravida hendrerit lectus a. Luctus accumsan
          tortor posuere ac ut consequat semper viverra nam. Quam nulla
          porttitor massa id neque. Mi ipsum faucibus vitae aliquet nec
          ullamcorper. Turpis egestas maecenas pharetra convallis posuere morbi
          leo.
        </p>
      </HomeSection>
      <HomeSection>
        <h2>Cities</h2>
        <p>
          Nibh sed pulvinar proin gravida hendrerit lectus a. Luctus accumsan
          tortor posuere ac ut consequat semper viverra nam. Quam nulla
          porttitor massa id neque. Mi ipsum faucibus vitae aliquet nec
          ullamcorper. Turpis egestas maecenas pharetra convallis posuere morbi
          leo.
        </p>
      </HomeSection>
      <HomeSection>
        <h2>News</h2>
        <p>
          Nibh sed pulvinar proin gravida hendrerit lectus a. Luctus accumsan
          tortor posuere ac ut consequat semper viverra nam. Quam nulla
          porttitor massa id neque. Mi ipsum faucibus vitae aliquet nec
          ullamcorper. Turpis egestas maecenas pharetra convallis posuere morbi
          leo.
        </p>
      </HomeSection>
    </MainContainer>
  );
};

export default HomePage;
