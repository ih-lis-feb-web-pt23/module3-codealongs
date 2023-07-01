import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav className={`Navbar ${theme}`}>
      <ul>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <>
            <NavLink
              to='/projects'
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              Projects
            </NavLink>
            <button onClick={logOutUser}>Logout</button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <NavLink
              to='/signup'
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              Signup
            </NavLink>
            <NavLink
              to='/login'
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              Login
            </NavLink>
          </>
        )}
      </ul>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'dark' : 'light'}
      </button>
    </nav>
  );
};

export default Navbar;
