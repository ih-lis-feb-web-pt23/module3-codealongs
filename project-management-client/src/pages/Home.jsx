import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>{user && `Hello ${user.name},`} Welcome to Project Management</h1>
    </div>
  );
};

export default Home;
