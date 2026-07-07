const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ExpenseList = ({ expenses }) => {
  if (!expenses.length) {
    return <p className="empty-state">No expenses recorded yet.</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id} className="expense-item">
          <div className="expense-content">
            <div className="expense-label">{expense.category}</div>
            <div>{expense.description || "No description"}</div>
            <div className="expense-meta">
              <span className="expense-date">{formatDate(expense.date)}</span>
            </div>
          </div>
          <div className="expense-amount">
            {currencyFormatter.format(expense.amount)}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
