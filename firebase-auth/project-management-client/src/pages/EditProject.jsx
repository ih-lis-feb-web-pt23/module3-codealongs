import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, updateProject } from '../api/projects.api';

const EditProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProject(id);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.log('Error fetching project', error);
      }
    };

    fetchProject();
  }, [id]);

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const updatedProject = { title, description, _id: id };
      await updateProject(updatedProject);
      navigate('/projects');
    } catch (error) {
      console.log('Error updating the project', error);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <div className='EditProjectPage'>
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor=''>Title:</label>
        <input type='text' name='title' value={title} onChange={handleTitle} />

        <label htmlFor=''>Description:</label>
        <textarea
          name='description'
          value={description}
          cols='30'
          rows='10'
          onChange={handleDescription}
        ></textarea>

        <button type='submit'>Edit Project</button>
      </form>
    </div>
  );
};

export default EditProject;
