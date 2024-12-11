const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();




const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if an admin already exists if role is 'admin'
    if (role === 'admin') {
      const adminExists = await User.findOne({ role: 'admin' });
      if (adminExists) {
        return res.status(400).json({ message: 'Admin account already exists.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.findOne({ username, role });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error: error.message });
  }
});

module.exports = router;
