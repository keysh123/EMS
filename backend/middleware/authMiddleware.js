const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token is present and valid format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({success : 'false', message: 'No token provided, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Fetch user from DB
    const user = await User.findById(decoded.id || decoded._id).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({success : 'false', message: 'User not found' });
    }

    // Attach user to request object
    req.user = user;

    next(); // Pass control to the next middleware
  } catch (error) {
    console.error('Auth Error:', error.message);
    return res.status(401).json({success : 'false', message: 'Token is not valid or has expired' });
  }
};

module.exports = verifyUser;
