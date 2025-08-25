import axios from "axios";
import { useEffect, useState } from "react";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("1m");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileRes = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = profileRes.data.user;
        setUserId(user._id);

        fetchTransactions(filter, token);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserAndTransactions();
  }, []);

  const fetchTransactions = async (filterValue, token = localStorage.getItem("token")) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/payment/transactions?filter=${filterValue}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    fetchTransactions(e.target.value);
  };

  const handleDownload = () => {
    const csvContent = [
      ["Date", "Time","Received Amount", "Sent Amount", "From", "To", "Status", "Balance After"],
      ...transactions.map((tx) => [
        new Date(tx.createdAt).toLocaleString(),
        tx.receiver._id === userId ? tx.amount : "",
        tx.sender._id === userId ? tx.amount : "",
        tx.sender.name,
        tx.receiver.name,
        tx.status,
        tx.balanceAfter,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `transaction_history_${filter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("transaction-table").outerHTML;
    const newWin = window.open("");
    newWin.document.write(
      `<html><head><title>Transaction Statement</title></head><body style="font-family:sans-serif;">`
    );
    newWin.document.write(printContent);
    newWin.document.write("</body></html>");
    newWin.document.close();
    newWin.print();
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Transaction History</h2>

      <div style={filterContainerStyle}>
        <div>
          <label style={labelStyle}>Show transactions for:</label>
          <select value={filter} onChange={handleFilterChange} style={selectStyle}>
            <option value="1m">Last 1 month</option>
            <option value="3m">Last 3 months</option>
            <option value="6m">Last 6 months</option>
            <option value="all">All time</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button style={buttonStyle} onClick={handleDownload}>
            Download CSV
          </button>
          <button style={buttonStyle} onClick={handlePrint}>
            Print Statement
          </button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No transactions yet.</p>
      ) : (
        <table id="transaction-table" style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Received (₹)</th>
              <th style={thStyle}>Sent (₹)</th>
              <th style={thStyle}>From</th>
              <th style={thStyle}>To</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Balance (₹)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const isSent = tx.sender._id === userId;
              const isReceived = tx.receiver._id === userId;
              return (
                <tr
                  key={tx._id}
                  style={{
                    ...trStyle,
                    backgroundColor: isReceived ? "#d4efdf" : isSent ? "#f9ebea" : "#ffffff", // green for received, red for sent
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")} // hover for row
                  onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = isReceived
                    ? "#dafae7ff"
                    : isSent
                      ? "#f6dad8ff"
                      : "#ffffff")
                  }
                >
                  <td style={tdStyle}>{new Date(tx.createdAt).toLocaleString()}</td>
                  <td
                    style={{
                      ...tdStyle,
                      color: "#000000ff",
                      fontWeight: "bold",
                   }}
                  >
                    {isReceived ? tx.amount : "-"}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      color: "#080808ff",
                      fontWeight: "bold",
                     }}
                  >
                    {isSent ? tx.amount : "-"}
                  </td>
                  <td style={tdStyle}>{tx.sender.name}</td>
                  <td style={tdStyle}>{tx.receiver.name}</td>
                  <td
                    style={{
                      ...tdStyle,
                      color: tx.status === "success" ? "#238801ff" : "#c0392b",
                      fontWeight: "bold",
                    }}
                  >
                    {tx.status}
                  </td>
                  <td style={tdStyle}>{tx.balanceAfter}</td>
                </tr>
              );
            })}
          </tbody>

        </table>
      )}
    </div>
  );
};

// CSS
const containerStyle = {
  maxWidth: "1000px",
  margin: "50px auto",
  padding: "20px",
  background: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
};
const headerStyle = { textAlign: "center", marginBottom: "20px", color: "#333", fontSize: "28px" };
const filterContainerStyle = {
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
};
const labelStyle = { fontWeight: "bold", marginRight: "10px", color: "#333" };
const selectStyle = {
  padding: "6px 12px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  background: "#fafafa",
};
const buttonStyle = {
  padding: "10px 18px",
  borderRadius: "6px",
  border: "none",
  background: "#3498db",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s",
};
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};
const theadStyle = {
  background: "linear-gradient(to right, #2980b9, #3498db)",
  color: "#fff",
};
const thStyle = { padding: "12px 10px", textAlign: "center",
                      fontWeight: "bold", };
const tdStyle = { padding: "10px", textAlign: "center",
                      fontWeight: "bold", };
const trStyle = { borderBottom: "1px solid #ddd", cursor: "pointer",
                      fontWeight: "bold", };

export default TransactionHistory;
