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
  Amount: {
    type: Number,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('pot', PotShema);
