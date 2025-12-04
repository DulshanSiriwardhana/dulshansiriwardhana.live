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
}

let dbConnectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (dbConnectionPromise) {
    return dbConnectionPromise;
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }

  dbConnectionPromise = mongoose.connect(MONGODB_URI)
    .then(async () => {
      console.log('Connected to MongoDB');
      
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;
      
      if (adminUsername && adminPassword) {
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
          }
        }
      }
      
      return mongoose.connection;
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      dbConnectionPromise = null;
      throw error;
    });

  return dbConnectionPromise;
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Failed to start server:', error);
      process.exit(1);
    });
}

export default app;


