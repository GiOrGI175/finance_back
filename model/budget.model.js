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
  Spent: {
    type: Number,
  },
  Remaining: {
    type: Number,
  },
  procent: {
    type: Number,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('budget', budgetShema);
