import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='Navbar'>
      <ul>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          About
        </NavLink>
        <NavLink
          to='/projects'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Projects
        </NavLink>

        <NavLink
          to='/apartments'
          className={({ isActive }) => (isActive ? 'selected' : '')}
          end
        >
          Apartments
        </NavLink>

        <NavLink
          to='/apartments/new'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Add Apartment
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
