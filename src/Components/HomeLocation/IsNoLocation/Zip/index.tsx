const Zip = () => (
  <form>
      <div>
        <label htmlFor="zip">Zip: </label>
        <input type="text" id="zip" required />
      </div>
      <div>
        <input type="submit" value="Set Location" />
      </div>
    </form>
);

export default Zip;
