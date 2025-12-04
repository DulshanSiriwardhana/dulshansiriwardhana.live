import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
  try {
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error',
      });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required',
      });
    }

    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;

