import incomeModel from "../models/incomeModel";
import expenseModel from "../models/expenseModel.js";

export async function getDashboardOverview(req, res){
  const userId = req.user._id;
  const now = newDate();
  const startOffMonth = new Date(now.getFullYear(),now.getMonth(), 1 );

try{
  const income = await incomeModel.find({
    userId,
    date: {
          $gte: startOfMonth,
          $lte: now
        },
  }).lean();


  const expenses = await expenseModel.find({
    userId,
    date:{   $gte: startOfMonth,
          $lte: now }
  }).lean();
const monthlyIncome = income.reduce((acc, cur) => acc + Number (cur.amount || 0), 0);
const monthlyExpense = expense.reduce((acc, cur) => acc + Number)



}


}

