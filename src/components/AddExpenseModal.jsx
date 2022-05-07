import React, { useRef } from "react";
import { useBudgets, UNCATEGORIEZED_BUDGET_ID } from "../context/BudgetContext";

export default function AddExpenseModal({
  defaultBudgetId,
  showModal,
  setShowModal,
}) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const { addExpense, budgets } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    setShowModal(false);
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="w-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form onSubmit={handleSubmit}>
              <div className="relative min-w-[50%] my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">New Expense</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-gray-400 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 text-lg leading-relaxed flex flex-col space-y-2 flex-auto">
                    <label htmlFor="name">Description</label>
                    <input
                      required
                      ref={descriptionRef}
                      id="description"
                      type="text"
                      className="p-2 border border-gray-300"
                    />
                    <label htmlFor="name">Amount</label>
                    <input
                      required
                      ref={amountRef}
                      id="amount"
                      type="number"
                      step={0.01}
                      min={0}
                      className="p-2 border border-gray-300"
                    />
                    <label htmlFor="name">Budget</label>
                    <select
                      defaultValue={defaultBudgetId}
                      ref={budgetIdRef}
                      id="category"
                      className="p-2 border border-gray-300"
                    >
                      <option id={UNCATEGORIEZED_BUDGET_ID}>
                        Uncategorized
                      </option>
                      {budgets.map((budget) => (
                        <option key={budget.id} value={budget.id}>
                          {budget.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="danger-btn background-transparent"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="primary-btn"
                      type="submit"
                      // onClick={() => setShowModal(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
