// Import required dependencies
const mongoose = require('mongoose');  // MongoDB library
const bcrypt = require('bcryptjs');  // Library for hashing passwords

// Define the user schema for MongoDB
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // Username field (unique and required)
  email: { type: String, required: true, unique: true },     // Email field (unique and required)
  password: { type: String, required: true },                // Password field (required)
}, { timestamps: true });  // Automatically create 'createdAt' and 'updatedAt' fields

// Pre-save hook to hash the user's password before saving it to the database
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  // Only hash the password if it has been modified
  const salt = await bcrypt.genSalt(10);  // Generate a salt with 10 rounds
  this.password = await bcrypt.hash(this.password, salt);  // Hash the password
  next();  // Proceed with saving the user
});

// Method to compare the entered password with the hashed password in the database
UserSchema.methods.comparePassword = function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);  // Compare the entered password with the stored hash
};

// Export the User model for use in other parts of the application
module.exports = mongoose.model('User', UserSchema);
