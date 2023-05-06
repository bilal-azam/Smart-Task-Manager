const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
