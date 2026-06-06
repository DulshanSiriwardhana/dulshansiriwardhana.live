import express from 'express';
import Setting from '../models/Setting.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get CV theme (Public)
router.get('/cv-theme', async (req, res) => {
    try {
        let theme = await Setting.findOne({ key: 'cv_theme' });
        if (!theme) {
            theme = { key: 'cv_theme', value: 'emerald' }; // Default theme
        }
        res.json(theme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update CV theme (Protected)
router.post('/cv-theme', authenticateToken, async (req, res) => {
    const { value } = req.body;
    if (!value) {
        return res.status(400).json({ message: 'Theme value is required' });
    }

    try {
        const theme = await Setting.findOneAndUpdate(
            { key: 'cv_theme' },
            { value },
            { upsert: true, new: true }
        );
        res.json(theme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
