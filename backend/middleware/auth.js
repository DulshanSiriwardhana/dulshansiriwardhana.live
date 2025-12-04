import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error',
    });
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required',
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired token',
      });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;

