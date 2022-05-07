import React, { useRef } from "react";
import { useBudgets, UNCATEGORIEZED_BUDGET_ID } from "../context/BudgetContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({
  budgetId,
  showModal,
  setShowModal,
}) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIEZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIEZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  return (
    <>
      {showModal && budgetId != null ? (
        <>
          <div className="w-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative min-w-[50%] my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Expenses: {budget?.name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-gray-400 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative mb-2 p-6 text-lg leading-relaxed flex flex-col space-y-2 flex-auto">
                  <div className="flex flex-col gap-3 bg-gray-50 rounded">
                    {expenses.map((expense) => (
                      <div className="flex flex-col gap-2 p-4" key={expense.id}>
                        <div className="flex flex-row pb-1">
                          <div className="flex flex-col">
                            <p className="text-black">{expense.description}</p>
                            <span className="font-semibold">
                              Cost: {currencyFormatter.format(expense.amount)}
                            </span>
                          </div>
                          <div className="flex-1"></div>
                          <button
                            className="pb-0.5"
                            onClick={() => deleteExpense(expense)}
                          >
                            <span className="text-red-500 pb-0.5 hover:text-red-600">
                              &times;
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="danger-btn background-transparent"
                    type="button"
                    onClick={() => {
                      deleteBudget(budget);
                      setShowModal(false);
                    }}
                  >
                    Delete Budget
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
