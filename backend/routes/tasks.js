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

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ msg: 'Task not found' });

    // Invalidate cache
    redisClient.del('tasks');

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) return res.status(404).json({ msg: 'Task not found' });

    // Invalidate cache
    redisClient.del('tasks');

    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Search tasks
router.get('/search', auth, async (req, res) => {
  const { query } = req.query;
  try {
    const allTasks = await Task.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(allTasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
