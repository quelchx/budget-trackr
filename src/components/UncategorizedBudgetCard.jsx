import React from "react";
import { useBudgets, UNCATEGORIEZED_BUDGET_ID } from "../context/BudgetContext";
import BudgetCard from "./BudgetCard";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIEZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return <BudgetCard amount={amount} name="Uncategorized" {...props} />;
};

export default UncategorizedBudgetCard;
