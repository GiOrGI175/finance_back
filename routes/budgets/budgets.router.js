const { Router } = require('express');

const budgetsRouter = Router();

const {
  getAllBudgets,
  createBudget,
  getBudgetById,
  deleteBudget,
  updateBudgetById,
} = require('./budgets.service');

const checkValidObjectId = require('../../middlewares/checkValidObjectId');

budgetsRouter.get('/', getAllBudgets);
budgetsRouter.post('/', createBudget);
budgetsRouter.get('/:id', checkValidObjectId, getBudgetById);
budgetsRouter.delete('/:id', checkValidObjectId, deleteBudget);
budgetsRouter.put('/:id', checkValidObjectId, updateBudgetById);

module.exports = budgetsRouter;
