const Task = require('../models/Task');
const mongoose = require('mongoose');


exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  
  try {
    const task = new Task({ title, description, status });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  const taskId = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: 'Invalid Task ID' });
  }

  try {
    const task = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: 'Invalid Task ID' });
  }

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
