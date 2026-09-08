import incomeModel from "../models/incomeModel.js";
import expenseModel from "../models/expenseModel.js";

export async function getDashboardOverview(req, res) {
  const userId = req.user._id;
  const now = new Date();
  const startOffMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const income = await incomeModel
      .find({
        userId,
        date: {
          $gte: startOffMonth,
          $lte: now,
        },
      })
      .lean();

    const expenses = await expenseModel
      .find({
        userId,
        date: { $gte: startOffMonth, $lte: now },
      })
      .lean();

    const monthlyIncome = income.reduce(
      (acc, cur) => acc + Number(cur.amount || 0),
      0,
    );
    const monthlyExpense = expenses.reduce(
      (acc, cur) => acc + Number(cur.amount || 0),
      0,
    );
    const savings = monthlyIncome - monthlyExpense;
    const savingsRate =
      monthlyIncome === 0 ? 0 : Math.round((savings / monthlyIncome) * 100);

    const recentTransactions = [
      ...income.map((i) => ({ ...i, type: "income" })),
      ...expenses.map((e) => ({ ...e, type: "expense" })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const spendByCategory = {};
    for (const exp of expenses) {
      const cat = exp.category || "other";
      spendByCategory[cat] =
        (spendByCategory[cat] || 0) + Number(exp.amount || 0);
    }
    const expenseDistribution = Object
      .entries(spendByCategory)
      .map(([category, amount]) => ({
        category,
        amount,
        percent:
          monthlyExpense === 0
            ? 0
            : Math.round((amount / monthlyExpense) * 100),
      })); // for chart

    return res.status(200).json({
      success: true,
      data: {
        monthlyIncome,
        monthlyExpense,
        savings,
        savingsRate,
        recentTransactions,
        spendByCategory,
        expenseDistribution,
      },
    });
  } catch (error) {
    console.error("GetDashboardOverview error :", error);
    return res.status(500).json({
      success: false,
      message: "Dahboard Fetch failed"
    })
  }
}
