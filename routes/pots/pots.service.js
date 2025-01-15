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

  if (!Add || Add <= 0) {
    return res
      .status(400)
      .json({ error: 'Add amount must be a positive number' });
  }

  const pot = await potModel.findById(id);
  if (!pot) return res.status(404).json({ error: 'Pot not found' });

  const { Target, Amount } = pot;

  if (Amount + Add > Target) {
    return res.status(422).json({ error: 'Cannot add, exceeds target' });
  }

  const updatedAmount = Amount + Add;
  const updatedProcent = Math.min(
    Math.floor((updatedAmount / pot.Target) * 1000) / 10,
    100
  );

  const updateRequest = {
    Amount: updatedAmount,
    procent: updatedProcent,
  };

  const updatedPot = await potModel.findByIdAndUpdate(id, updateRequest, {
    new: true,
  });

  res.json({ updatedPot });
};
const WithdrawAmount = async (req, res) => {
  const { id } = req.params;
  const { Withdraw } = req.body;

  if (!Withdraw || Withdraw <= 0) {
    return res
      .status(400)
      .json({ error: 'Withdraw amount must be a positive number' });
  }

  const pot = await potModel.findById(id);
  if (!pot) return res.status(404).json({ error: 'Pot not found' });

  if (Withdraw > pot.Amount)
    return res.status(400).json({ message: 'Not enough funds' });

  const updatedAmount = pot.Amount - Withdraw;

  const updatedProcent = Math.min(
    Math.floor((updatedAmount / pot.Target) * 1000) / 10,
    100
  );

  const updateRequest = {
    Amount: updatedAmount,
    procent: updatedProcent,
  };

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

// const calculatePercentage = (amount, target) => {
//   if (target && target > 0) {
//     return Math.min((amount / target) * 100, 100);
//   }
//   return 0;
// };

// const addAmount = async (req, res) => {
//   const { id } = req.params;
//   const { Add } = req.body;

//   const pot = await potModel.findById(id);
//   if (!pot) return res.status(404).json({ error: 'Pot not found' });

//   const newAmount = pot.Amount + Add;
//   if (newAmount > pot.Target)
//     return res
//       .status(400)
//       .json({ error: 'You cannot add more than the target' });

//   const updateRequest = {
//     Amount: newAmount,
//     procent: calculatePercentage(newAmount, pot.Target),
//   };
//   const updatedPot = await potModel.findByIdAndUpdate(id, updateRequest, {
//     new: true,
//   });
//   res.json({ updatedPot });
// };

// const WithdrawAmount = async (req, res) => {
//   const { id } = req.params;
//   const { Withdraw } = req.body;

//   const pot = await potModel.findById(id);
//   if (!pot) return res.status(404).json({ error: 'Pot not found' });

//   const newAmount = pot.Amount - Withdraw;
//   if (Withdraw > pot.Amount)
//     return res.status(400).json({ Message: 'Not enough money in the pot' });

//   const updateRequest = {
//     Amount: newAmount,
//     procent: calculatePercentage(newAmount, pot.Target),
//   };

//   const updatedPot = await potModel.findByIdAndUpdate(id, updateRequest, {
//     new: true,
//   });
//   res.json({ updatedPot });
// };
