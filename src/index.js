const express = require('express');  
const mongoose = require('mongoose');  
const config = require('config');  
const userRoutes = require('./routes/user.routes');  

const app = express();  
app.use(express.json());  

// Routes  
app.use('/api/users', userRoutes);  

// MongoDB Connection  
const PORT = process.env.PORT || 5000;  
const DB_URI = config.get('db.uri');  
mongoose.connect(DB_URI, {  
  useNewUrlParser: true,  
  useUnifiedTopology: true  
}).then(() => {  
  console.log('Connected to MongoDB');  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  
}).catch((err) => console.log('MongoDB connection error:', err));
