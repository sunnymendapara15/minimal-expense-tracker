const Filters = ({ filters, onChange, categories }) => {
  const handleChange = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value });
  };

  return (
    <div className="filters">
      <label className="filter-field">
        <span>Category</span>
        <select value={filters.category} onChange={handleChange("category")}>
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label className="filter-field">
        <span>Start date</span>
        <input
          type="date"
          value={filters.startDate}
          onChange={handleChange("startDate")}
        />
      </label>
      <label className="filter-field">
        <span>End date</span>
        <input
          type="date"
          value={filters.endDate}
          onChange={handleChange("endDate")}
        />
      </label>
    </div>
  );
};

export default Filters;
