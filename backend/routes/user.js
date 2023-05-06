const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();
// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const { username, email } = req.body;
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
