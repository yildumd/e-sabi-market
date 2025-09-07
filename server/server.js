const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://e-sabi-market.vercel.app',
      'https://*.vercel.app'
    ];
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowedOrigin => {
      return origin === allowedOrigin || 
             (allowedOrigin.includes('*') && 
              origin.endsWith(allowedOrigin.split('*')[1]));
    })) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Route imports
const authRoutes = require('./routes/authRoutes');
const vendorRoutes = require('./routes/vendorRoutes');

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-Sabi Market API Server',
    version: '1.0.0',
    status: 'active'
  });
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes); // Note: plural "vendors"

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'E-Sabi Market Server is running!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});