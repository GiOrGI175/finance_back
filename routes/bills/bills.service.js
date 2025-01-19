const billModel = require("../../model/bill.model");

const getAllBills = async (req, res) => {
  const bills = await billModel.find();
  res.json(bills);
};

const createBill = async (req, res) => {
  const bill = await billModel.create(req.body);
  res.json(bill);
};

const getBillById = async (req, res) => {
  const { id } = req.params;
  const bill = await billModel.findById(id);
  if (!bill) return res.status(404).json({ message: "pot not Found!" });
  res.json(bill);
};

const deleteBill = async (req, res) => {
  const { id } = req.params;

  const deletedBill = await billModel.findByIdAndDelete(id);
  res.json(deletedBill);
};

const updateBillById = async (req, res) => {
  const { id } = req.params;
  const { billName, frequency, dueDate, status, amount } = req.body;
  const updateRequest = {};
  if (billName) updateRequest.billName = billName;
  if (frequency) updateRequest.frequency = frequency;
  if (dueDate) updateRequest.dueDate = dueDate;
  if (status) updateRequest.status = status;
  if (amount) updateRequest.amount = amount;
  const updateBill = await billModel.findByIdAndUpdate(id, updateRequest, {
    new: true,
  });
  res.json({ updateBill });
};

module.exports = {
  getAllBills,
  createBill,
  getBillById,
  deleteBill,
  updateBillById,
};
