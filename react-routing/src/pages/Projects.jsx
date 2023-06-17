import { Link } from 'react-router-dom';

const Projects = ({ projects }) => {
  return (
    <div>
      <h1>Projects</h1>

      {projects.map(project => {
        return (
          <div key={project._id} className='project'>
            <Link to={`/projects/${project._id}`}>
              <h2>{project.name}</h2>
            </Link>
            <p>{project.technologies}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
