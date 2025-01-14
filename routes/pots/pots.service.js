const potModel = require('../../model/pot.model');

const getAllPots = async (req, res) => {
  const pots = await potModel.find();

  res.json(pots);
};

const createPot = async (req, res) => {
  const pot = await potModel.create(req.body);
  res.json(pot);
};

const getPotById = async (req, res) => {
  const { id } = req.params;
  const pot = await potModel.findById(id);

  if (!pot) {
    return res.status(404).json({ message: 'pot not found' });
  }
  res.json(pot);
};

const deletePot = async (req, res) => {
  const { id } = req.params;

  const deletedpot = await potModel.findByIdAndDelete(id);
  res.json(deletedpot);
};

const updatePotById = async (req, res) => {
  const { id } = req.params;

  const { potName, Target, theme } = req.body;
  const updateRequest = {};
  if (potName) updateRequest.potName = potName;
  if (Target) updateRequest.Target = Target;
  if (theme) updateRequest.theme = theme;

  const updatedPot = await potModel.findByIdAndUpdate(id, updateRequest, {
    new: true,
  });
  res.json({ updatedPot });
};

const addAmount = async (req, res) => {
  const { id } = req.params;

  const { Add } = req.body;

  const pot = await potModel.findById(id);

  if (!pot) return res.status(404).json({ error: 'Pot not found' });

  const target = pot.Target;
  const amount = pot.Amount;

  if (amount + Add > target)
    return res.status(404).json({ error: 'u can not Add' });

  const updateRequest = {};
  if (Add) updateRequest.Amount = amount + Add;
  const updatedPot = await potModel.findByIdAndUpdate(id, updateRequest, {
    new: true,
  });
  res.json({ updatedPot });
};

const WithdrawAmount = async (req, res) => {
  const { id } = req.params;

  const pot = await potModel.findById(id);

  if (!pot) return res.status(404).json({ error: 'Pot not found' });

  if (Withdraw > pot.Amount)
    return res.status(400).json({ Message: 'not enought' });

  const { Withdraw } = req.body;
  const updateRequest = {};
  if (Withdraw) updateRequest.Amount = Amount - Withdraw;

  const updatedPot = await potModel.findByIdAndUpdate(id, updateRequest, {
    new: true,
  });
  res.json({ updatedPot });
};

module.exports = {
  getAllPots,
  createPot,
  getPotById,
  deletePot,
  updatePotById,
  addAmount,
  WithdrawAmount,
};
