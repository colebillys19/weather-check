import { US_STATES } from "../../../../utils/constants";

const Address = () => {
  return (
    <form>
      <div>
        <label htmlFor="address1">Address Line 1: </label>
        <input type="text" id="address1" required />
      </div>
      <div>
        <label htmlFor="address2">Address Line 2: </label>
        <input type="text" id="address2" required />
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
        <input type="submit" value="Set Location" />
      </div>
    </form>
  );
};

export default Address;