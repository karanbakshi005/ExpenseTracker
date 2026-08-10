import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addExpense,
  getAllExpense,
  updateExpense,
  deleteExpense,
  downloadExpenseExcel,
  getExpenseOverview,

} from "../controllers/expenseController.js";
import getDateRange from "../utils/dataFilter.js";

const expenseRouter = express.Router();

expenseRouter.post("/add", authMiddleware, addExpense);
expenseRouter.get("/get", authMiddleware, getAllExpense);

expenseRouter.put("/update/:id", authMiddleware, updateExpense);
expenseRouter.get("/downloadIncomeExcel/:id", authMiddleware, downloadExpenseExcel);

expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);
expenseRouter.get("/overview/:id", authMiddleware, getExpenseOverview);

export default expenseRouter;
  