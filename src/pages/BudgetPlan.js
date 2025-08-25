import React, { useEffect, useState } from "react";
import axios from "axios";

const BudgetPlan = () => {
  const [categories] = useState(["personal", "gift", "payment", "groceries", "shopping"]);
  const [budgets, setBudgets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [duration, setDuration] = useState("30");
  const [editingBudgetId, setEditingBudgetId] = useState(null);
  const [totalSaved, setTotalSaved] = useState(0);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Generate durations: 30 days → 10 years
  const durations = Array.from({ length: 120 }, (_, i) => 30 * (i + 1));

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/budget/budgets", config);
      const budgetsWithRemaining = res.data.map((b) => {
        const start = new Date(b.startDate);
        const end = new Date(start);
        end.setDate(end.getDate() + b.duration);

        const now = new Date();
        const remainingDays = Math.max(Math.ceil((end - now) / (1000 * 60 * 60 * 24)), 0);

        const savedAmount = b.limit - b.spent > 0 && remainingDays === 0 ? b.limit - b.spent : 0;

        const formattedStartDate = start.toLocaleDateString("en-GB"); // dd/mm/yyyy

        return { ...b, remainingDays, savedAmount, formattedStartDate };
      });

      setBudgets(budgetsWithRemaining);

      const total = budgetsWithRemaining.reduce((sum, b) => sum + b.savedAmount, 0);
      setTotalSaved(total);
    } catch (err) {
      console.error("Fetch budgets error:", err);
    }
  };

  const handleSaveBudget = async () => {
    if (!selectedCategory || !limit || !duration) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/budget/budget",
        {
          category: selectedCategory,
          limit: Number(limit),
          duration: Number(duration),
        },
        config
      );

      setSelectedCategory("");
      setLimit("");
      setDuration("30");
      setEditingBudgetId(null);
      fetchBudgets();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save budget");
    }
  };

  const handleEditBudget = (budget) => {
    setSelectedCategory(budget.category);
    setLimit(budget.limit);
    setDuration(budget.duration);
    setEditingBudgetId(budget._id);
  };

  const handleDeleteBudget = async (id) => {
    if (!window.confirm("Are you sure you want to delete this budget?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/budget/budget/${id}`, config);
      fetchBudgets();
    } catch (err) {
      console.error("Delete budget error:", err);
      alert(err.response?.data?.error || "Failed to delete budget");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Budget Tracker</h2>
      <h3>Total Saved: ₹{totalSaved}</h3>

      <div style={formContainer}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={inputStyle}
          disabled={!!editingBudgetId}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Limit (₹)"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          style={inputStyle}
        />

        <select value={duration} onChange={(e) => setDuration(e.target.value)} style={inputStyle}>
          {durations.map((d) => (
            <option key={d} value={d}>{d} days</option>
          ))}
        </select>

        <button onClick={handleSaveBudget} style={buttonStyle}>
          {editingBudgetId ? "Update Budget" : "Save Budget"}
        </button>
      </div>

      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th>Category</th>
            <th>Spent</th>
            <th>Limit</th>
            <th>Duration</th>
            <th>Days Left</th>
            <th>Start Date</th>
            <th>Saved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((b) => (
            <tr key={b._id}>
              <td style={tdStyle}>{b.category}</td>
              <td style={tdStyle}>₹{b.spent}</td>
              <td style={tdStyle}>₹{b.limit}</td>
              <td style={tdStyle}>{b.duration} days</td>
              <td style={tdStyle}>{b.remainingDays}</td>
              <td style={tdStyle}>{b.formattedStartDate}</td>
              <td style={tdStyle}>₹{b.savedAmount}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEditBudget(b)} style={editButtonStyle}>Edit</button>
                <button onClick={() => handleDeleteBudget(b._id)} style={deleteButtonStyle}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Styles ---
const containerStyle = { maxWidth: "900px", margin: "40px auto", padding: "20px", background: "#fff", borderRadius: "10px", fontFamily: "'Segoe UI', sans-serif" };
const headerStyle = { fontSize: "26px", fontWeight: 600, marginBottom: "10px", textAlign: "center" };
const formContainer = { display: "flex", gap: "10px", marginBottom: "20px" };
const inputStyle = { padding: "6px 10px", borderRadius: "5px", border: "1px solid #ccc" };
const buttonStyle = { padding: "6px 12px", borderRadius: "4px", border: "none", backgroundColor: "#1976d2", color: "#fff", cursor: "pointer" };
const tableStyle = { width: "100%", borderCollapse: "collapse", fontSize: "15px" };
const theadStyle = { background: "#007cf9ff", color: "#fff", textAlign: "left", padding: "12px 0" };
const tdStyle = { padding: "10px 16px", fontWeight: "bold" };
const editButtonStyle = { padding: "4px 8px", borderRadius: "4px", border: "none", backgroundColor: "#0288d1", color: "#fff", cursor: "pointer", marginRight: "5px" };
const deleteButtonStyle = { padding: "4px 8px", borderRadius: "4px", border: "none", backgroundColor: "#e53935", color: "#fff", cursor: "pointer" };

export default BudgetPlan;
