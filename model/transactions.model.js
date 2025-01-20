const { default: mongoose } = require('mongoose');

const transactionSchema = new mongoose.Schema({
  RecipientOrSender: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  TransactionDate: {
    type: Date,
    default: Date.now,
  },
  Amount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
