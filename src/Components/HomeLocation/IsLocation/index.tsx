interface LocationType {
  lat: number;
  lon: number;
}

interface IsLocationPropsType {
  location: LocationType;
}

const IsLocation: React.FC<IsLocationPropsType> = ({ location }) => (
  <>
    <p>
      Location: {location.lat}, {location.lon}
    </p>
  </>
);

export default IsLocation;
