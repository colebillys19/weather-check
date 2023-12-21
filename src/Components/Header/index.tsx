import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  setUnitType: (value: string) => void;
  unitType: string;
}

const Header: FC<HeaderProps> = ({ setUnitType, unitType }) => {
  //

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink
              className="header-nav-link"
              to="/"
              onClick={(event) => {
                if (
                  event.currentTarget.getAttribute('aria-current') === 'page'
                ) {
                  event.preventDefault();
                }
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header-nav-link"
              to="/location"
              onClick={(event) => {
                if (
                  event.currentTarget.getAttribute('aria-current') === 'page'
                ) {
                  event.preventDefault();
                }
              }}
            >
              Location
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <span>
          Units:&nbsp;
          <button
            disabled={unitType === 'imperial'}
            onClick={() => setUnitType('imperial')}
          >
            Imperial
          </button>
          &nbsp;|&nbsp;
          <button
            disabled={unitType === 'metric'}
            onClick={() => setUnitType('metric')}
          >
            Metric
          </button>
        </span>
      </div>
    </header>
  );
};

export default Header;
