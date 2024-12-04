const jwt = require('jsonwebtoken');

// Middleware to verify JWT and authenticate users
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded; // Attach decoded payload (e.g., user ID) to the request object
    // console.log(req.user);``
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = {
  authenticate,
};
