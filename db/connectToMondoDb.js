const { default: mongoose } = require('mongoose');
require('dotenv').config(); 

module.exports = async () => {
  try {
    
    
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};