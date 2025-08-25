import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  const [walletBalance, setWalletBalance] = useState(0);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransactions();
    fetchUserBalance();
    fetchCategories();
  }, [filterType, filterCategory]);

  // Fetch user's wallet balance
  const fetchUserBalance = async () => {
    try {
      const res = await axios.get("https://personal-finance-p2p-backend.onrender.com/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWalletBalance(res.data.user.walletBalance);
    } catch (err) {
      console.error("Error fetching user balance:", err);
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("https://personal-finance-p2p-backend.onrender.com/api/payment/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      let filtered = res.data;
      if (filterType !== "all") {
        filtered = filtered.filter((t) =>
          filterType === "expense" ? t.sender._id === userId : t.receiver._id === userId
        );
      }
      if (filterCategory !== "all") {
        filtered = filtered.filter((t) => t.category === filterCategory);
      }

      setTransactions(filtered);

      // summary
      let income = 0,
        expense = 0;
      res.data.forEach((t) => {
        if (t.sender._id === userId && t.status === "success") expense += t.amount;
        else if (t.receiver._id === userId && t.status === "success") income += t.amount;
      });
      setSummary({ income, expense });
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch category list from backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://personal-finance-p2p-backend.onrender.com/api/payment/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoryList(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Start editing a transaction
  const startEditing = (transaction) => {
    setEditingId(transaction._id);
    setEditCategory(transaction.category || "");
  };

  // Save edited category
  const saveEdit = async (id) => {
    try {
      await axios.put(
        `https://personal-finance-p2p-backend.onrender.com/api/payment/update-category/${id}`,
        { category: editCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditCategory("");
      fetchTransactions();
      fetchCategories(); // update category list if new category was added
    } catch (err) {
      console.error(err);
      alert("Failed to update category");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCategory("");
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Transaction Tracker</h2>

      {/* Summary */}
      <div style={summaryContainer}>
        <div style={summaryCard}>
          <h4>Wallet Balance</h4>
          <p>₹{walletBalance}</p>
        </div>
        <div style={{ ...summaryCard, borderLeft: "3px solid #43a047" }}>
          <h4>Total Income</h4>
          <p>₹{summary.income}</p>
        </div>
        <div style={{ ...summaryCard, borderLeft: "3px solid #e53935" }}>
          <h4>Total Expense</h4>
          <p>₹{summary.expense}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={filterContainer}>
        <label style={filterLabel}>Type:</label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={filterSelectStyle}>
          <option value="all">All</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <label style={{ ...filterLabel, marginLeft: "20px" }}>Category:</label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={filterSelectStyle}>
          <option value="all">All</option>
          {categoryList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions Table */}
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Counterparty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const userId = decodedToken.id;
            const isExpense = t.sender._id === userId;

            return (
              <tr
                key={t._id}
                style={{
                  background: isExpense ? "#fdecea" : "#e8f5e9",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td style={tdStyle}>{new Date(t.createdAt).toLocaleDateString()}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "5px 12px",
                      borderRadius: "10px",
                      color: "#fff",
                      background: isExpense ? "#fe0400ff" : "#43a047",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    {isExpense ? "Expense" : "Income"}
                  </span>
                </td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>₹{t.amount}</td>
                <td style={tdStyle}>
                  {editingId === t._id ? (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        style={{ padding: "4px 6px", borderRadius: "4px" }}
                      >
                        {categoryList.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Custom"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        style={{ padding: "4px 6px", borderRadius: "4px" }}
                      />
                    </div>
                  ) : (
                    t.category || "N/A"
                  )}
                </td>
                <td style={tdStyle}>{isExpense ? t.receiver.name : t.sender.name}</td>
                <td style={tdStyle}>
                  {editingId === t._id ? (
                    <>
                      <button onClick={() => saveEdit(t._id)} style={editButtonStyle}>
                        Save
                      </button>
                      <button onClick={cancelEdit} style={cancelButtonStyle}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => startEditing(t)} style={editButtonStyle}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// --- Styles (same as before) ---
const containerStyle = { maxWidth: "950px", margin: "40px auto", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
const headerStyle = { fontSize: "26px", fontWeight: "600", marginBottom: "25px", textAlign: "center", color: "#333" };
const summaryContainer = { display: "flex", justifyContent: "space-between", marginBottom: "20px", gap: "12px" };
const summaryCard = { flex: 1, padding: "8px 12px", borderRadius: "8px", background: "#f5f5f5", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", textAlign: "center", fontWeight: 500, fontSize: "14px", color: "#333" };
const filterContainer = { display: "flex", justifyContent: "flex-end", marginBottom: "20px", alignItems: "center" };
const filterLabel = { fontWeight: 500, marginRight: "8px" };
const filterSelectStyle = { padding: "6px 10px", borderRadius: "5px", border: "1px solid #ccc", fontWeight: 500, fontSize: "14px" };
const tableStyle = { width: "100%", borderCollapse: "collapse", fontSize: "15px" };
const theadStyle = { background: "#007cf9ff", color: "#fff", textAlign: "left", padding: "14px 0", fontSize: "16px", lineHeight: "2" };
const tdStyle = { padding: "10px 16px", fontSize: "15px", color: "#333", fontWeight:"bold" };
const editButtonStyle = { padding: "6px 12px", borderRadius: "4px", border: "none", backgroundColor: "#1976d2", color: "#fff", cursor: "pointer", marginRight: "5px", fontSize: "13px" };
const cancelButtonStyle = { padding: "6px 12px", borderRadius: "4px", border: "none", backgroundColor: "#757575", color: "#fff", cursor: "pointer", fontSize: "13px" };

export default TransactionTracker;
