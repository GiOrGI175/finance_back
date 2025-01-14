const { Router } = require('express');

const potsRouter = Router();

const {
  getAllPots,
  createPot,
  getPotById,
  deletePot,
  updatePotById,
  addAmount,
  WithdrawAmount,
} = require('./pots.service');

const checkValidObjectId = require('../../middlewares/checkValidObjectId');

potsRouter.get('/', getAllPots);
potsRouter.post('/', createPot);
potsRouter.get('/:id', checkValidObjectId, getPotById);
potsRouter.delete('/:id', checkValidObjectId, deletePot);
potsRouter.put('/:id', checkValidObjectId, updatePotById);
potsRouter.post('/add/:id', addAmount);
potsRouter.post('/withdraw/:id', WithdrawAmount);

module.exports = potsRouter;
