const budgetModel = require('../../model/budget.model');
const TransactionModel = require('../../model/transactions.model');

const getAllBudgets = async (req, res) => {
  try {
    const budgets = await budgetModel.find().populate('transactions');

    for (let budget of budgets) {
      const transactions = await TransactionModel.find({
        category: budget.budgetName,
      });

      const totalSpent = transactions.reduce(
        (total, transaction) => total + transaction.Amount,
        0
      );

      budget.Spent = totalSpent;
      budget.Remaining = budget.Target - totalSpent;
      budget.procent = (totalSpent / budget.Target) * 100;

      await budget.save();
    }

    res.json(budgets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching budgets', error: err });
  }
};

const createBudget = async (req, res) => {
  const { budgetName, Target, theme } = req.body;

  if (!budgetName || !Target || !theme) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const existingTransactions = await TransactionModel.find({
      category: budgetName,
    });

    const newBudget = await budgetModel.create({
      budgetName,
      Target,
      theme,
    });

    newBudget.transactions = existingTransactions.map(
      (transaction) => transaction._id
    );

    await newBudget.save();

    const totalSpent = existingTransactions.reduce(
      (total, transaction) => total + transaction.Amount,
      0
    );

    newBudget.Spent = totalSpent;
    newBudget.Remaining = newBudget.Target - totalSpent;
    newBudget.procent = (totalSpent / newBudget.Target) * 100;

    await newBudget.save();

    const populatedBudget = await budgetModel
      .findById(newBudget._id)
      .populate('transactions');

    if (
      !populatedBudget.transactions ||
      populatedBudget.transactions.length === 0
    ) {
      return res.status(200).json({
        message: 'Budget created without transactions',
        newBudget: populatedBudget,
      });
    }

    res.status(201).json({ newBudget: populatedBudget });
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Error creating budget', error: err });
    }
  }
};

const getBudgetById = async (req, res) => {
  const { id } = req.params;
  const budget = await budgetModel.findById(id);

  if (!budget) {
    return res.status(404).json({ message: 'budget not found' });
  }
  res.json(budget);
};

const deleteBudget = async (req, res) => {
  const { id } = req.params;

  const deletedBudget = await budgetModel.findByIdAndDelete(id);
  res.json(deletedBudget);
};

const updateBudgetById = async (req, res) => {
  const { id } = req.params;
  const { budgetName, Target, theme } = req.body;

  const updateRequest = {};
  if (budgetName) updateRequest.budgetName = budgetName;
  if (Target) updateRequest.Target = Target;
  if (theme) updateRequest.theme = theme;

  try {
    const updatedBudget = await budgetModel.findByIdAndUpdate(
      id,
      updateRequest,
      {
        new: true,
      }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    const existingTransactions = await TransactionModel.find({
      category: updatedBudget.budgetName,
    });

    const totalSpent = existingTransactions.reduce(
      (total, transaction) => total + transaction.Amount,
      0
    );

    updatedBudget.Spent = totalSpent;
    updatedBudget.Remaining = updatedBudget.Target - totalSpent;
    updatedBudget.procent = (totalSpent / updatedBudget.Target) * 100;

    await updatedBudget.save();

    const populatedBudget = await budgetModel
      .findById(updatedBudget._id)
      .populate('transactions');

    res.json({ updatedBudget: populatedBudget });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating budget', error: err });
  }
};

module.exports = {
  getAllBudgets,
  createBudget,
  getBudgetById,
  deleteBudget,
  updateBudgetById,
  //   addAmount,
  //   WithdrawAmount,
};
