import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import projectsData from './projects.json';
import Projects from './pages/Projects';
import Error from './pages/Error';
import ProjectDetails from './pages/ProjectDetails';
import Apartments from './pages/Apartments';
import AddApartment from './pages/AddApartment';

function App() {
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route
          path='/projects'
          element={<Projects projects={projectsData} />}
        />
        <Route
          path='/projects/:projectId'
          element={<ProjectDetails projects={projectsData} />}
        />
        <Route path='/apartments' element={<Apartments />} />
        <Route path='/apartments/new' element={<AddApartment />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
