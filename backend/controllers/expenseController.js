import expenseModel from "../models/expenseModel.js";
import getDataRange from "../utils/dataFilter.js";
import XLSX from "xlsx";

// Add Expense
export async function addExpense(req, res) {
  try {
    const userId = req.user._id;

    const {
      description,
      amount,
      category,
      date,
    } = req.body;

    if (!description || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newExpense = new expenseModel({
      userId,
      description,
      amount,
      category,
      date: new Date(date),
    });

    await newExpense.save();

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: newExpense,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// Get All Expenses
export async function getAllExpense(req, res) {
  try {
    const userId = req.user._id;

    const expense = await expenseModel
      .find({ userId })
      .sort({ date: -1 });

    return res.json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// Update Expense
export async function updateExpense(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const {
      description,
      amount,
      category,
      date,
    } = req.body;

    const updatedExpense = await expenseModel.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        description,
        amount,
        category,
        date,
      },
      {
        new: true,
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    return res.json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// Delete Expense
export async function deleteExpense(req, res) {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const expense = await expenseModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    return res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// Download Expense Excel
export async function downloadExpenseExcel(req, res) {
  try {
    const userId = req.user._id;

    const expenses = await expenseModel
      .find({ userId })
      .sort({ date: -1 });

    const plainData = expenses.map((exp) => ({
      Description: exp.description,
      Amount: exp.amount,
      Category: exp.category,
      Date: new Date(exp.date).toLocaleDateString(),
    }));

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(plainData);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Expenses"
    );

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expense.xlsx"
    );

    return res.send(buffer);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// Expense Overview
export async function getExpenseOverview(req, res) {
  try {
    const userId = req.user._id;

    const { range = "monthly" } = req.query;

    const { start, end } = getDataRange(range);

    const expense = await expenseModel
      .find({
        userId,
        date: {
          $gte: start,
          $lte: end,
        },
      })
      .sort({ date: -1 });

    const totalExpense = expense.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );

    const averageExpense =
      expense.length > 0
        ? totalExpense / expense.length
        : 0;

    const numberOfTransactions = expense.length;

    const recentTransactions = expense.slice(0, 9);

    return res.json({
      success: true,
      data: {
        totalExpense,
        averageExpense,
        numberOfTransactions,
        recentTransactions,
        range,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// ------
// {
//   "description":"Fast Food",
//   "amount":"1500",
//   "category":"Food",
//   "date":"2026-02-09"
// }

//token 
//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMmIwODg4NDAxMWI3NDNjZWU5MTlhYiIsImlhdCI6MTc4NjI4NDQzNiwiZXhwIjoxNzg2MzcwODM2fQ.ixqnTh-13WomNlHt7Y7NR4wnbtfqiUbOQ_U6DxfnWw0"
// {

// "email":"karan@gmail.com",
// "password": "9518885351"
// }