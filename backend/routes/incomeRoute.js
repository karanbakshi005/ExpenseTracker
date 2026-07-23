import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addIncome,
  getAllIncome,
  updateIncome,
  deleteIncome,
  downloadIncomeExcel,
  getIncomeOverview,
} from "../controllers/incomeController.js";
import getDateRange from "../utils/dataFilter.js";

const incomeRouter = express.Router();

incomeRouter.post("/add", authMiddleware, addIncome);
incomeRouter.get("/get", authMiddleware, getAllIncome);

incomeRouter.put("/update/:id", authMiddleware, updateIncome);
incomeRouter.get("/downloadIncomeExcel/:id", authMiddleware, downloadIncomeExcel);

incomeRouter.delete("/delete/:id", authMiddleware, deleteIncome);
incomeRouter.get("/overview/:id", authMiddleware, getIncomeOverview);

export default incomeRouter;
  