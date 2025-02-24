// Import required dependencies
const express = require('express');  // Express for creating the server
const mongoose = require('mongoose');  // MongoDB library for connecting to the database
const config = require('config');  // To manage configurations, such as the DB URI and JWT secret
const userRoutes = require('./routes/user.routes');  // Import routes for handling user operations

// Create an instance of Express
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up routes for handling user-related API requests
app.use('/api/users', userRoutes);  // All requests to "/api/users" will be handled by userRoutes

// Set the port for the server to listen on (either from environment or default to 5000)
const PORT = process.env.PORT || 5000;
// Retrieve MongoDB URI from configuration file
const DB_URI = config.get('db.uri');

// Connect to MongoDB database
mongoose.connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");  // Log successful connection
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));  // Start the server
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);  // Log connection error
    process.exit(1);  // Exit the application if the connection fails
  });
