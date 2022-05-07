import React from "react";
import { currencyFormatter } from "../utils";

const BudgetCard = ({
  name,
  amount = 0,
  max = 0,
  onViewExpensesClick,
  onAddExpenseClick,
}) => {
  const percentage = Math.floor((amount / max) * 100);
  const bgColor = {
    card: percentage > 75 ? " #e7073020" : "#ffffff",
    bar: percentage > 75 ? "#e70730" : "#078be7",
  };

  return (
    <div
      style={{ backgroundColor: bgColor.card }}
      className="max-w-sm p-6 space-y-5 border border-gray-200 rounded-lg shadow-md"
    >
      <div className="flex items-baseline gap-2 text-lg font-bold tracking-tight">
        <h5>{name}</h5>
        <span className="flex-1"></span>
        {max !== 0 ? (
          <p>
            {currencyFormatter.format(amount)} / {currencyFormatter.format(max)}
          </p>
        ) : (
          <p>{currencyFormatter.format(amount)}</p>
        )}
      </div>
      <div className="space-y-6">
        {max !== 0 && (
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${percentage}%`,
                backgroundColor: bgColor.bar,
              }}
            ></div>
          </div>
        )}

        <div className="flex gap-2">
          <button className="primary-btn" onClick={onAddExpenseClick}>
            Add Expense
          </button>
          <button onClick={onViewExpensesClick} className="secondary-btn">
            View Expenses
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
