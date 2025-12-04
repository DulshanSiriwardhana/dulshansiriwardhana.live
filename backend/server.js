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
const PORT = process.env.PORT;

if (!PORT) {
  console.error('Error: PORT environment variable is required');
  process.exit(1);
}

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      /\.vercel\.app$/,
      /\.netlify\.app$/,
      'https://dulshansiriwardhana.live',
    ];
    
    if (!origin || allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return origin === allowed;
      return allowed.test(origin);
    })) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/project-euler', projectEulerRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI environment variable is required');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminUsername || !adminPassword) {
      console.warn('Warning: ADMIN_USERNAME or ADMIN_PASSWORD not set. Admin user will not be created.');
      console.warn('Please set ADMIN_USERNAME and ADMIN_PASSWORD environment variables to create an admin user.');
    } else {
      try {
        const existingAdmin = await User.findOne({ username: adminUsername.toLowerCase() });
        if (!existingAdmin) {
          const admin = new User({
            username: adminUsername.toLowerCase(),
            password: adminPassword,
            role: 'admin',
          });
          await admin.save();
          console.log(`Admin user "${adminUsername}" created successfully`);
        } else {
          console.log(`Admin user "${adminUsername}" already exists`);
        }
      } catch (error) {
        console.error('Error creating admin user:', error);
        if (error.code === 11000) {
          console.log(`Admin user "${adminUsername}" already exists (duplicate key)`);
        } else {
          console.error('Failed to create admin user. Please check the error above.');
        }
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

