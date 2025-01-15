const { default: mongoose } = require('mongoose');

const PotShema = new mongoose.Schema({
  potName: {
    type: String,
  },
  Target: {
    type: Number,
  },
  theme: {
    type: String,
  },
  procent: {
    type: Number,
    default: 0,
  },
  Amount: {
    type: Number,
    default: 0,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('pot', PotShema);
