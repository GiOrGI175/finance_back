const { default: mongoose } = require('mongoose');

const budgetShema = new mongoose.Schema({
  budgetName: {
    type: String,
  },
  Target: {
    type: Number,
  },
  theme: {
    type: String,
  },
  Maximum: {
    type: Number,
  },
  Spent: {
    type: Number,
  },
  Remaining: {
    type: Number,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('budget', budgetShema);
