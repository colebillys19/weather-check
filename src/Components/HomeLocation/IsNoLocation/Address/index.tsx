import { US_STATES } from "../../../../utils/constants";

const Address = () => {
  return (
    <form>
      <div>
        <label htmlFor="address">Address: </label>
        <input type="text" id="address" required />
      </div>
      <div>
        <label htmlFor="city">City: </label>
        <input type="text" id="city" required />
      </div>
      <div>
        <label htmlFor="state">State: </label>
        <select id="state" required>
          {US_STATES.map(([abbr, name]) => (
            <option key={abbr} value={abbr}>{name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="zip">Zip: </label>
        <input type="text" id="zip" required />
      </div>
      <div>
        <input type="submit" value="Set Location" />
      </div>
    </form>
  );
};

export default Address;