import { useState } from 'react';

interface ManualEntryProps {
  setFormType: (type: string) => void;
}

const Coords: React.FC<ManualEntryProps> = ({ setFormType }) => {
  const [latValue, setLatValue] = useState('');
  const [lonValue, setLonValue] = useState('');

  return (
    <>
      <form>
        <div>
          <label htmlFor="lat">Latitude: </label>
          <input onChange={e => setLatValue(e.target.value)} type="text" id="lat" value={latValue} required />
        </div>
        <div>
          <label htmlFor="lon">Longitude: </label>
          <input onChange={e => setLonValue(e.target.value)} type="text" id="lon" value={lonValue} required />
        </div>
        <div>
          <input
            type="submit"
            value="Set Location"
            disabled={!latValue || !lonValue}
          />
        </div>
      </form>
      <a onClick={() => setFormType('manual')} href="#">
        Back
      </a>
    </>
  );
};

export default Coords;
