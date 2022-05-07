import React, { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import { UNCATEGORIEZED_BUDGET_ID, useBudgets } from "./context/BudgetContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import TotalBudgetCard from "./components/TotalBudgetCard";

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenses, setShowViewExpenses] = useState(false);

  const [addExpenseModalBudgetId, setAddExpenseModealBudgetId] = useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModealBudgetId(budgetId);
  }

  function openViewExpenseModal(budgetId) {
    setShowViewExpenses(true);
    setViewExpensesModalBudgetId(budgetId);
  }

  return (
    <>
      <div className="mx-2 min-h-[90vh]">
        <div className="flex mt-7 gap-2 mx-[8.5px] mb-4">
          <h1 className="pt-1 pl-6 mr-auto text-xl sm:text-2xl font-semibold sm:pt-0">
            Budget Tracker
          </h1>
          <div className="flex gap-1">
            <button
              onClick={() => setShowAddBudgetModal(true)}
              className="primary-btn"
            >
              Add Budget
            </button>
            <button onClick={openAddExpenseModal} className="secondary-btn">
              Add Expense
            </button>
          </div>
        </div>
        <div className="px-8">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            {budgets.map((budget) => {
              const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              );

              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpensesClick={() => openViewExpenseModal(budget.id)}
                />
              );
            })}
            <UncategorizedBudgetCard
              onAddExpenseClick={openAddExpenseModal}
              onViewExpensesClick={() =>
                openViewExpenseModal(UNCATEGORIEZED_BUDGET_ID)
              }
            />
          </div>
          <div className="my-4">
            <TotalBudgetCard />
          </div>
        </div>
      </div>

      <footer className="p-4  shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center ">
          Made by{" "}
          <a href="https://flowbite.com" className="hover:underline">
            Eric Quelch
          </a>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              href="http://github.com/quelchx/budget-trackr"
              className="mr-4 hover:underline md:mr-6"
              target="_blank"
              referrerPolicy="origin"
            >
              Source Code
            </a>
          </li>
          <li>
            <a
              href="https://quelchx.com/contact"
              target="_blank"
              referrerPolicy="origin"
              className="hover:underline"
            >
              Contact
            </a>
          </li>
        </ul>
      </footer>

      <>
        <AddBudgetModal
          showModal={showAddBudgetModal}
          setShowModal={setShowAddBudgetModal}
        />
        <AddExpenseModal
          showModal={showAddExpenseModal}
          defaultBudgetId={addExpenseModalBudgetId}
          setShowModal={setShowAddExpenseModal}
        />
        <ViewExpensesModal
          budgetId={viewExpensesModalBudgetId}
          showModal={showViewExpenses}
          setShowModal={setShowViewExpenses}
        />
      </>
    </>
  );
};

export default App;
