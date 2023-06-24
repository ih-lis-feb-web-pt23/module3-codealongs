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
          to='/projects'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Projects
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
