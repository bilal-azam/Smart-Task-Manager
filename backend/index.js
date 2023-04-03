const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/smart-task-manager', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
