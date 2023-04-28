const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).send(task);
});

router.get('/', auth, async (req, res) => {
  try {
    const cacheKey = 'tasks';
    redisClient.get(cacheKey, async (err, tasks) => {
      if (tasks) {
        return res.json(JSON.parse(tasks));
      } else {
        const allTasks = await Task.find();
        redisClient.setex(cacheKey, 3600, JSON.stringify(allTasks));
        res.json(allTasks);
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
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
