const User = require('../models/user.model');  
const jwt = require('jsonwebtoken');  
const config = require('config');  

// Register User  
exports.register = async (req, res) => {  
  try {  
    const { username, email, password } = req.body;  
    const existingUser = await User.findOne({ email });  
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });  

    const user = new User({ username, email, password });  
    await user.save();  
    res.status(201).json({ msg: 'User registered successfully' });  
  } catch (err) {  
    res.status(500).json({ error: err.message });  
  }  
};  

// Login User  
exports.login = async (req, res) => {  
  try {  
    const { email, password } = req.body;  
    const user = await User.findOne({ email });  
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });  

    const isMatch = await user.comparePassword(password);  
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });  

    const token = jwt.sign({ id: user._id }, config.get('jwt.secret'), { expiresIn: '1h' });  
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });  
  } catch (err) {  
    res.status(500).json({ error: err.message });  
  }  
};
