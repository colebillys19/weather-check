import { US_STATES } from "../../../../utils/constants";

const City = () => (
  <form>
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

export default City;
