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
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'transaction' }],
});

module.exports = mongoose.model('budget', budgetShema);
