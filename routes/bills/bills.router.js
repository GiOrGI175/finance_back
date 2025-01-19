const { Router } = require("express");
const {
  getAllBills,
  createBill,
  getBillById,
  deleteBill,
  updateBillById,
} = require("./bills.service");
const checkValidObjectId = require("../../middlewares/checkValidObjectId");
const billsRouter = Router();

billsRouter.get("/", getAllBills);
billsRouter.post("/", createBill);
billsRouter.get("/:id", checkValidObjectId, getBillById);
billsRouter.delete("/:id", checkValidObjectId, deleteBill);
billsRouter.put("/:id", checkValidObjectId, updateBillById);

module.exports = billsRouter;
