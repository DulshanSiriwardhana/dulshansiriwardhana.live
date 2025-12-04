import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import messageRoutes from './routes/messages.js';
import projectEulerRoutes from './routes/projectEuler.js';
import authRoutes from './routes/auth.js';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/project-euler', projectEulerRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (adminUsername && adminPassword) {
      const existingAdmin = await User.findOne({ username: adminUsername.toLowerCase() });
      if (!existingAdmin) {
        const admin = new User({
          username: adminUsername.toLowerCase(),
          password: adminPassword,
          role: 'admin',
        });
        await admin.save();
        console.log('Admin user created successfully');
      } else {
        console.log('Admin user already exists');
      }
    }
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

export default app;

