const { default: mongoose } = require('mongoose');
require('dotenv').config();

module.exports = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log('mongo db connected successfully');
  } catch (error) {
    console.log(error);
  }
};
