const router = require('express').Router();
const Project = require('../models/Project.model');
const Task = require('../models/Task.model');

// Create a new task
router.post('/tasks', async (req, res, next) => {
  const { title, description, projectId } = req.body;

  try {
    // 1. Create the task
    const newTask = await Task.create({
      title,
      description,
      project: projectId
    });

    // 2. Update the project with the created task
    await Project.findByIdAndUpdate(projectId, {
      $push: { tasks: newTask._id }
    });

    // 3. Return the created task
    res.json(newTask);
  } catch (error) {
    console.log('An error occurred creating the task', error);
    next(error);
  }
});

module.exports = router;
