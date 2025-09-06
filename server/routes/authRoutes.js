const express = require('express');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, storeName, storeAddress, deliveryPricingPerKm } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role
    });

    await user.save();

    // If user is a vendor, create vendor profile
    if (role === 'vendor') {
      const vendor = new Vendor({
        user: user._id,
        storeName,
        address: storeAddress,
        deliveryPricingPerKm: deliveryPricingPerKm || 50 // Default delivery rate
      });
      await vendor.save();
    }

    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

module.exports = router;