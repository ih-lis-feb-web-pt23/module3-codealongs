import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={`Navbar ${theme}`}>
      <ul>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to='/projects'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Projects
        </NavLink>
      </ul>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'dark' : 'light'}
      </button>
    </nav>
  );
};

export default Navbar;
