const { default: mongoose } = require('mongoose');

const transactionShema = new mongoose.Schema({
  RecipientOrSender: {
    type: String,
  },
  category: {
    type: String,
  },
  TransactionDate: {
    type: Date,
    default: Date.now,
  },
  Amount: {
    type: Number,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('Transaction', transactionShema);
