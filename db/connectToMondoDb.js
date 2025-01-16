const { default: mongoose } = require('mongoose');
require('dotenv').config();

module.exports = async () => {
  try {
    await mongoose.connect("mongodb+srv://giorgobiani2002:Lashiko20@web10.y4usl.mongodb.net/?retryWrites=true&w=majority&appName=web10");
    console.log('mongo db connected successfully');
  } catch (error) {
    console.log(error);
  }
};
