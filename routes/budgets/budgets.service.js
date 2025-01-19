const budgetModel = require('../../model/budget.model');

const getAllBudgets = async (req, res) => {
  const budgets = await budgetModel.find();

  res.json(budgets);
};

const createBudget = async (req, res) => {
  const budget = await budgetModel.create(req.body);
  res.json(budget);
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

  const updatedBudget = await budgetModel.findByIdAndUpdate(id, updateRequest, {
    new: true,
  });
  res.json({ updatedBudget });
};

// const addAmount = async (req, res) => {
//   const { id } = req.params;
//   const { Add } = req.body;

//   if (!Add || Add <= 0) {
//     return res
//       .status(400)
//       .json({ error: 'Add amount must be a positive number' });
//   }

//   const pot = await budgetModel.findById(id);
//   if (!pot) return res.status(404).json({ error: 'Pot not found' });

//   const { Target, Amount } = pot;

//   if (Amount + Add > Target) {
//     return res.status(422).json({ error: 'Cannot add, exceeds target' });
//   }

//   const updatedAmount = Amount + Add;
//   const updatedProcent = Math.min(
//     Math.round((updatedAmount / pot.Target) * 100),
//     100
//   );

//   const updateRequest = {
//     Amount: updatedAmount,
//     procent: updatedProcent,
//   };

//   const updatedPot = await budgetModel.findByIdAndUpdate(id, updateRequest, {
//     new: true,
//   });

//   res.json({ updatedPot });
// };
// const WithdrawAmount = async (req, res) => {
//   const { id } = req.params;
//   const { Withdraw } = req.body;

//   if (!Withdraw || Withdraw <= 0) {
//     return res
//       .status(400)
//       .json({ error: 'Withdraw amount must be a positive number' });
//   }

//   const pot = await budgetModel.findById(id);
//   if (!pot) return res.status(404).json({ error: 'Pot not found' });

//   if (Withdraw > pot.Amount)
//     return res.status(400).json({ message: 'Not enough funds' });

//   const updatedAmount = pot.Amount - Withdraw;

//   const updatedProcent = Math.min(
//     Math.round((updatedAmount / pot.Target) * 100),
//     100
//   );

//   const updateRequest = {
//     Amount: updatedAmount,
//     procent: updatedProcent,
//   };

//   const updatedPot = await budgetModel.findByIdAndUpdate(id, updateRequest, {
//     new: true,
//   });

//   res.json({ updatedPot });
// };

module.exports = {
  getAllBudgets,
  createBudget,
  getBudgetById,
  deleteBudget,
  updateBudgetById,
  //   addAmount,
  //   WithdrawAmount,
};
