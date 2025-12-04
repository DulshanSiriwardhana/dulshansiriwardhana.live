import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import messageRoutes from './routes/messages.js';
import projectEulerRoutes from './routes/projectEuler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/messages', messageRoutes);
app.use('/api/project-euler', projectEulerRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

export default app;

