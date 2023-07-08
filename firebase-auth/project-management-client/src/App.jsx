import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import EditProject from './pages/EditProject';
import { useContext } from 'react';
import { ThemeContext } from './context/theme.context';
import Signup from './pages/Signup';
import Login from './pages/Login';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import { ToastContainer } from 'react-toastify';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Navbar />
      <ToastContainer position='bottom-center' />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/projects'
          element={
            <IsPrivate>
              <Projects />
            </IsPrivate>
          }
        />
        <Route
          path='/projects/:id'
          element={
            <IsPrivate>
              <ProjectDetails />
            </IsPrivate>
          }
        />
        <Route
          path='/projects/edit/:id'
          element={
            <IsPrivate>
              <EditProject />
            </IsPrivate>
          }
        />
        <Route
          path='/signup'
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
        <Route
          path='/login'
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
