import { useState, useEffect } from 'react';
import { getAllProjects } from '../api/projects.api';
import AddProject from './AddProject';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.log('Error fetching the projects', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <AddProject refreshList={fetchProjects} />
      {projects &&
        projects.map(project => {
          return (
            <div key={project._id} className='ProjectCard card'>
              <h2>{project.title}</h2>
              {project.imgUrl && <img src={project.imgUrl} width={50} />}
              <Link to={`/projects/${project._id}`}>See details</Link>
            </div>
          );
        })}
    </div>
  );
};

export default Projects;
