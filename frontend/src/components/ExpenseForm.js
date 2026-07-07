import { useState } from "react";

const buildDefault = (defaultCategory, defaultDate) => ({
  amount: "",
  category: defaultCategory,
  date: defaultDate,
  description: "",
});

const ExpenseForm = ({ categories, onAddExpense, today }) => {
  const [formData, setFormData] = useState(
    buildDefault(categories[0] || "Other", today)
  );
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const parsedAmount = Number(formData.amount);

    if (!formData.date || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please provide a valid amount and date.");
      return;
    }

    onAddExpense({
      amount: parsedAmount,
      category: formData.category,
      date: formData.date,
      description: formData.description.trim(),
    });

    setFormData(buildDefault(categories[0] || "Other", today));
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <div className="expense-form-grid">
        <label className="field">
          <span>Amount</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(event) => handleChange("amount", event.target.value)}
            placeholder="0.00"
            required
          />
        </label>
        <label className="field">
          <span>Category</span>
          <select
            value={formData.category}
            onChange={(event) => handleChange("category", event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="field">
        <span>Date</span>
        <input
          type="date"
          value={formData.date}
          max={today}
          onChange={(event) => handleChange("date", event.target.value)}
          required
        />
      </label>
      <label className="field">
        <span>Description</span>
        <textarea
          rows="2"
          value={formData.description}
          onChange={(event) => handleChange("description", event.target.value)}
          placeholder="Optional note"
        />
      </label>
      <button type="submit" className="primary">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
