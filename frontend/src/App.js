import { useEffect, useMemo, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import Filters from "./components/Filters";
import "./App.css";

const STORAGE_KEY = "minimal-expense-tracker-data";
const categories = [
  "Food",
  "Transport",
  "Rent",
  "Shopping",
  "Utilities",
  "Entertainment",
  "Other",
];

const today = new Date().toISOString().split("T")[0];

function App() {
  const [expenses, setExpenses] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const cached = window.localStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch (error) {
      console.error("Unable to load expenses from localStorage", error);
      return [];
    }
  });

  const [filters, setFilters] = useState({
    category: "All",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error("Unable to persist expenses", error);
    }
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const filteredExpenses = useMemo(() => {
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    return [...expenses]
      .filter((item) => {
        const matchesCategory =
          filters.category === "All" || item.category === filters.category;
        const itemDate = new Date(item.date);
        const matchesStart = startDate ? itemDate >= startDate : true;
        const matchesEnd = endDate ? itemDate <= endDate : true;
        return matchesCategory && matchesStart && matchesEnd;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, filters]);

  const totalSpending = useMemo(
    () => expenses.reduce((sum, entry) => sum + Number(entry.amount), 0),
    [expenses]
  );

  const filteredTotal = useMemo(
    () =>
      filteredExpenses.reduce((sum, entry) => sum + Number(entry.amount), 0),
    [filteredExpenses]
  );

  const resetFilters = () =>
    setFilters({ category: "All", startDate: "", endDate: "" });

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Personal Finance</p>
          <h1>Minimal Expense Tracker</h1>
          <p className="subtitle">
            Capture&nbsp;expenses, keep totals, and revisit memories without data
            disappearing after refresh.
          </p>
        </div>
        <div className="pill">LocalStorage persistence</div>
      </header>

      <main className="panel-grid">
        <section className="panel">
          <h2>Add New Expense</h2>
          <ExpenseForm
            categories={categories}
            onAddExpense={addExpense}
            today={today}
          />
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Expenses</h2>
              <p className="subtitle">See every entry and filter as needed.</p>
            </div>
            <button className="ghost" type="button" onClick={resetFilters}>
              Reset filters
            </button>
          </div>

          <Filters
            filters={filters}
            onChange={setFilters}
            categories={categories}
          />

          <ExpenseSummary
            totalSpending={totalSpending}
            filteredTotal={filteredTotal}
          />

          <ExpenseList expenses={filteredExpenses} />
        </section>
      </main>
    </div>
  );
}

export default App;
