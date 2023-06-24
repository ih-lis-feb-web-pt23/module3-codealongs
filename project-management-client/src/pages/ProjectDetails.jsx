import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteProject, getProject } from '../api/projects.api';
import AddTask from '../components/AddTask';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProject = async id => {
    try {
      const response = await getProject(id);
      setProject(response.data);
    } catch (error) {
      console.log('Error fetching project', error);
    }
  };

  useEffect(() => {
    fetchProject(id);
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProject(id);
      navigate('/projects');
    } catch (error) {
      console.log('Error deleting the project', error);
    }
  };

  return (
    <div className='ProjectDetails'>
      {project && (
        <div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <Link to={`/projects/edit/${id}`}>
            <button>Edit Project</button>
          </Link>
          <button onClick={handleDelete}>Delete Project</button>
        </div>
      )}

      <AddTask refreshProject={fetchProject} projectId={id} />

      {project &&
        project.tasks.map(task => {
          return (
            <li className='TaskCard card' key={task._id}>
              <h3>{task.title}</h3>
              <h4>Description</h4>
              <p>{task.description}</p>
            </li>
          );
        })}

      <Link to={`/projects`}>Back to projects</Link>
    </div>
  );
};

export default ProjectDetails;
