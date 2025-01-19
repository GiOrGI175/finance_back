const { default: mongoose } = require('mongoose');

const budgetSchema = new mongoose.Schema({
  budgetName: {
    type: String,
    required: true,
  },
  Target: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  Spent: {
    type: Number,
    default: 0,
  },
  Remaining: {
    type: Number,
    default: 0,
  },
  procent: {
    type: Number,
    default: 0,
  },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
});

module.exports = mongoose.model('Budget', budgetSchema);
