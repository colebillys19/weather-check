const Coords = () => (
  <form>
      <div>
        <label htmlFor="lat">Latitude: </label>
        <input type="text" id="lat" required />
      </div>
      <div>
        <label htmlFor="lon">Longitude: </label>
        <input type="text" id="lon" required />
      </div>
      <div>
        <input type="submit" value="Set Location" />
      </div>
    </form>
);

export default Coords;
