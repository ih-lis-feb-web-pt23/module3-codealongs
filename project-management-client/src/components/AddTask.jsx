import { useState } from 'react';
import { addTask } from '../api/projects.api';

const AddTask = ({ projectId, refreshProject }) => {
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
      const newTask = {
        title,
        description,
        projectId
      };

      await addTask(newTask);

      setTitle('');
      setDescription('');
      refreshProject(projectId);
    } catch (error) {
      console.log('Error adding task', error);
    }
  };

  return (
    <div className='AddTask'>
      <h3>Add New Task</h3>

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

        <button type='submit'>Add New Task</button>
      </form>
    </div>
  );
};

export default AddTask;
