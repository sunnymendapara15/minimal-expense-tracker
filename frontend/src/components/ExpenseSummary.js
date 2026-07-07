const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ExpenseSummary = ({ totalSpending, filteredTotal }) => (
  <div className="summary">
    <div className="summary-card">
      <h3>Total spending</h3>
      <p>{currencyFormatter.format(totalSpending)}</p>
    </div>
    <div className="summary-card">
      <h3>Visible expenses</h3>
      <p>{currencyFormatter.format(filteredTotal)}</p>
    </div>
  </div>
);

export default ExpenseSummary;
