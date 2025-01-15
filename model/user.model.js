const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  transactions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'transaction',
    default: [],
  },
  budgets: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'budget',
    default: [],
  },
  pots: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'pot',
    default: [],
  },
  bills: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'bill',
    default: [],
  },
});

module.exports = mongoose.model('user', userSchema);
