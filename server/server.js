const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Route imports
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const vendorRoutes = require('./routes/vendorRoutes'); // Ensure this path is correct

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/vendor', vendorRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'E-Sabi Market Server is running!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});