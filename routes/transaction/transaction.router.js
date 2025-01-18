const { Router } = require("express");
const transactionModel = require("../../model/transactions.model.js");
// const isAuth = require(".../middlewares/isAuth");

const transactionRouter = Router();

transactionRouter.post("/transaction", async (req, res) => {
  const { RecipientOrSender, category, TransactionDate, Amount } = req.body;

  if (!RecipientOrSender || !category || !TransactionDate || !Amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await transactionModel.create({
      RecipientOrSender,
      category,
      TransactionDate,
      Amount,
    });
    res.status(201).json({ message: "Transaction added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating transaction" });
  }
});
transactionRouter.get("/transaction", async (req, res) => {
  try {
    const transaction = await transactionModel.find();
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

module.exports = transactionRouter;
