const mongoose = require("mongoose");

const recurringBillSchema = new mongoose.Schema({
  billName: {
    type: String, //name
  },
  frequency: {
    type: String, //month, year, week
  },
  dueDate: {
    type: String, // 2nd
  },
  status: {
    type: String, //paid unpaid
  },
  amount: {
    type: Number, // amount
  },
  createdAt: {
    type: Date, //created when
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("RecurringBill", recurringBillSchema);
