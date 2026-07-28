import expenseModel from "../models/expenseModel.js";
import getDataRange from "utils/getDataRange.js";

//add experience
export async function addExpense(req, res) {
  const userId = req.user._id;
  const { description, amount, category, date } = req.body;
  try {
    if (!description || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // save in mongodb
    const newExpense = new incomeModel({
      userId,
      description,
      amount,
      category,
      date: new Date(date),
    });
    await newExpense.save();
    res.json({
      success: true,
      message: "Expense added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server Error",
    });
  }
}

//to all Expenses
export async function getAllIncome(req, res) {
  const userId = req.user._id;
  try {
    const expense = await expenseModel.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//update the expense
export async function updateExpense(req, res) {
  const id = req.params;
  const userId = req.user._id;
  const { description, amount } = req.body;

  try {
    const updateExpense = await updateExpense.findOneAndUpdate(
      { _id: id, userId }, 
      { description, amount },
      { new: true },
    );

    if (!updateExpense) {
      return
      res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.json({
      success: true,
      message: "Expense updated successfully",
      data: updateExpense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

// delete income
export async function deleteExpense(req, res) {
     try {
    const expense = await expenseModel.findByIdAndDelete({ _id: req.params.id });
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    return res.json({
      success: true,
      message: "Expense delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//download  file

export async function downloadExpenseExcel(req, res) {
     const userId = req.user._id;
      try {
        const income = await expenseModel.find({ userId }).sort({ date: -1 });
        const plainDate = expense.map((exp) => ({
          Description: exp.description,
          Amount: exp.amount,
          Category: exp.category,
          Date: new Date(exp.date).toLocaleDateString(),
        }));
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(plainDate);
        XLSX.utils.book_append_sheet(workbook, worksheet, "expenseModel");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=expense.xlsx");
        res.end(XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }));
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "server Error",
        });
      }
}// get expense over view
