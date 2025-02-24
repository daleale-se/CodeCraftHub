// Import required dependencies
const express = require('express');  // Express to create routes
const router = express.Router();  // Router instance to define API endpoints
const userController = require('../controllers/user.controller');  // Import controller for user-related logic

// Define the POST route for user registration
// When a POST request is made to '/register', it will call the 'register' function from userController
router.post('/register', userController.register);

// Define the POST route for user login
// When a POST request is made to '/login', it will call the 'login' function from userController
router.post('/login', userController.login);

// PUT: Update a user's name or email by ID
router.put('/:id', userController.updateUser);

// GET: Get a user's profile by ID
router.get('/:id', userController.getUserProfile);

// DELETE: Delete a user's profile by ID
router.delete('/:id', userController.deleteUserProfile);

// Export the router to be used in the main application
module.exports = router;
