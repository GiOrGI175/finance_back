const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: mongoose.Schema.Types.Mixed,
  },
  transactions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "transaction",
    default: [],
  },
  budgets: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "budget",
    default: [],
  },
  pots: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "pot",
    default: [],
  },
  bills: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "bill",
    default: [],
  },
  balance: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "balance",
    default: [],
  },
  income: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "income",
    default: [],
  },
  expenses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "expenses",
    default: [],
  },
});

module.exports = mongoose.model("user", userSchema);
