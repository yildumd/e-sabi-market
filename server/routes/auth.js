const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, storeName, storeAddress } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // We'll hash this later
      role,
      storeName: role === 'vendor' ? storeName : undefined,
      storeAddress: role === 'vendor' ? storeAddress : undefined
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

module.exports = router;