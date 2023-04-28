const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const redisClient = require('./redisClient');
const taskRoutes = require('./routes/tasks');

// Setup Redis Client
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

app.use(cors());
app.use(express.json());

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskmanager', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
