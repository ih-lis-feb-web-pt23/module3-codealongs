const router = require('express').Router();
const Project = require('../models/Project.model');
const mongoose = require('mongoose');
const fileUploader = require('../config/cloudinary.config');

// Create a new project
router.post('/projects', async (req, res, next) => {
  const { title, description, imgUrl } = req.body;

  try {
    const newProject = await Project.create({
      title,
      description,
      imgUrl,
      tasks: []
    });

    res.json(newProject);
  } catch (error) {
    console.log('An error occurred creating a new project', error);
    next(error);
  }
});

// Retrieves all projects
router.get('/projects', async (req, res, next) => {
  try {
    // we need to 'populate' the tasks to get alk the info
    const allProjects = await Project.find().populate('tasks');
    res.json(allProjects);
  } catch (error) {
    console.log('An error occurred getting all projects', error);
    next(error);
  }
});

// Retrieves a specific project by id
router.get('/projects/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // check if id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Specified id is not valid' });
    }

    const project = await Project.findById(id).populate('tasks');

    if (!project) {
      return res.status(404).json({ message: 'No project found with that id' });
    }

    res.json(project);
  } catch (error) {
    console.log('An error occurred getting the project', error);
    next(error);
  }
});

// Updates a specific project by  id
router.put('/projects/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    // check if provided id is a valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Specified id is not valid' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description
      },
      { new: true } // we need to pass this to receive the updated values
    ).populate('tasks');

    if (!updatedProject) {
      return res
        .status(404)
        .json({ message: 'No project found with specified id' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.log('An error occurred updating the project', error);
    next(error);
  }
});

// deletes the specified project by id
router.delete('/projects/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // check valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Specified id is not valid' });
    }

    await Project.findByIdAndDelete(id);
    res.json({ message: `Project with id ${id} as deleted successfully` });
  } catch (error) {
    console.log('An error occurred deleting the project', error);
    next(error);
  }
});

// route that receives the image, sends it to cloudinary and returns the image url
router.post('/upload', fileUploader.single('file'), (req, res, next) => {
  try {
    res.json({ fileUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred uploading the image' });
    next(error);
  }
});

module.exports = router;
