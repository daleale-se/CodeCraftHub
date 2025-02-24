// Import required dependencies
const User = require('../models/user.model');  // User model to interact with the database
const jwt = require('jsonwebtoken');  // JWT library for creating and verifying tokens
const config = require('config');  // To get the JWT secret from config

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;  // Get user data from request body

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Create a new user instance
    const user = new User({ username, email, password });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: err.message });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;  // Get login credentials from request body

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare the entered password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate a JWT token with the user's ID as the payload
    const token = jwt.sign({ id: user._id }, config.get('jwt.secret'), { expiresIn: '1h' });

    // Send the token and user information as the response
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: err.message });
  }
};

