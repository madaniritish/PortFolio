import { NavLink } from 'react-router-dom';
import profileImg from '../assets/portfolio_image.jpeg';

function Navbar({ theme, toggleTheme }) {
  return (
    <header>
      <div className="header-container">
        <div className="header-brand">
          <img src={profileImg} alt="Madani Ritish" className="header-img" />
          <h1>Madani Ritish</h1>
        </div>

        <div className="header-nav-actions">
          <nav aria-label="Main Navigation">
            <ul>
              <li>
                <NavLink to="/Home" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
