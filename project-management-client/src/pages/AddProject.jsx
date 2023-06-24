import { useState } from 'react';
import { addProject } from '../api/projects.api';

const AddProject = ({ refreshList }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const newProject = { title, description };
      await addProject(newProject);
      refreshList();
    } catch (error) {
      console.log('Error adding project', error);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <div className='AddProject'>
      <h2>Add Project</h2>

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

        <button type='submit'>Create Project</button>
      </form>
    </div>
  );
};

export default AddProject;
