

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) return res.status(401).json({ message: 'Token decoding failed' });

    // Common identity for all users
    req.userId = decoded._id;
    req.school = {id: decoded.schoolId };
    req.role = decoded.role;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

module.exports = protect;


