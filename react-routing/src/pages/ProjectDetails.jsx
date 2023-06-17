import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProjectDetails = ({ projects }) => {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  // this effect depends on the projectId and projects values
  // if any of these changes, it needs to run again
  // meaning our page will update whenever the id or list changes
  useEffect(() => {
    const project = projects.find(project => {
      return project._id === projectId;
    });

    if (project) {
      setProject(project);
    }
  }, [projectId, projects]);

  return (
    <div>
      <h1>Project Details</h1>

      {!project && <h3>Project not found</h3>}

      {project && (
        <div>
          <h2>{project.name}</h2>
          <h3>Tech Stack: {project.technologies}</h3>
          <p>{project.description}</p>
        </div>
      )}
      <Link to='/projects'>Back to projects</Link>
    </div>
  );
};

export default ProjectDetails;
