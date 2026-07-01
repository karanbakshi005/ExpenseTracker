import incomeModel from "../../incomeModel.js";
import XLSX from "xlxs";

//add income
export async function addIncome(req, res) {
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
    const newIncome = new incomeModel({
      userId,
      description,
      amount,
      category,
      date: new Date(date),
    });
    await newIncome.save();
    res.json({
      success: true,
      message: "Income added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server Error",
    });
  }
}

//to get income All (MODEL :-find)
export async function getAllIncome(req, res) {
  const userId = req.user._id;
  try {
    const income = await incomeModel.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//to get income All (MODEL :-update)
export async function updateIncome(req, res) {
  const id = req.params;
  const userId = req.user._id;
  const { description, amount } = req.body;

  try {
    const updateIncome = await incomeModel.findOneAndUpdate(
      { _id: id, userId }, 
      { description, amount },
      { new: true },
    );

    if (!updateIncome) {
      return
      res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }
    res.json({
      success: true,
      message: "Income updated successfully",
      data: updateIncome,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//to delete income
export async function deleteIncom(req, res) {
  try {
    const income = await incomeModel.findByIdAndDelete({ _id: req.params.id });
    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }
    return res.json({
      success: true,
      message: "income delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//download income
export async function downloadIncomeExcel(req, res) {
  const userId = req.user._id;
  try {
    const income = await incomeModel.find({ userId }).sort({ date: -1 });
    const plainDate = income.map((inc) => ({
      Description: inc.description,
      Amount: inc.amount,
      Category: inc.category,
      Date: new Date(inc.date).toLocalDateString(),
    }));
    const worksheet = XLSX
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server Error",
    });
  }
}
