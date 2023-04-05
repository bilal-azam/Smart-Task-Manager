const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).send(task);
});

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
