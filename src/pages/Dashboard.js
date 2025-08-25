import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TransactionHistory from "../pages/Transactions";
import ScheduledPayments from "./SchedulePayment";
import ProfileSettings from "../pages/ProfileSettings";
import SendMoney from "./SendMoney";
import AddExpenseIncome from "./ExpenseTracking";
import BudgetTracker from "./BudgetPlan";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
      } catch (err) {
        alert("Not authorized. Please login.");
        window.location.href = "/login";
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <div style={cards}>
            <div style={cardStyle}>
              <h3>Check Balance!</h3>
              <p>Wallet Balance: ${user.walletBalance.toFixed(2)}</p>
            </div>
            <div style={cardStyle}>
              <h3>Transaction History</h3>
              <p>List of your past transactions will appear here.</p>
            </div>
            <div style={cardStyle}>
              <h3>Money Transfers</h3>
              <p>Send or receive money instantly.</p>
            </div>
            <div style={cardStyle}>
              <h3>Budget Plan</h3>
              <p>Track your budget and spending here.</p>
            </div>
            <div style={cardStyle}>
              <h3>Scheduled Payments</h3>
              <p>Manage your upcoming payments.</p>
            </div>
          </div>
        );
      case "Expense & Income Tracking":
        return <AddExpenseIncome />;
      case "Transaction History":
        return <TransactionHistory />;
      case "Money Transfers":
        return <SendMoney />;
      case "Budget Plan":
        return <BudgetTracker />;
      case "Scheduled Payments":
        return <ScheduledPayments />;
      case "Profile":
        return <ProfileSettings />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div style={mainContentStyle}>{renderSection()}</div>
    </div>
  );
}

// Styles
const mainContentStyle = {
  flex: 1,
  marginLeft: "300px",
  padding: "2rem",
  minHeight: "100vh",
  backgroundColor: "#f4f4f4",
};

const cards = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "15px",
  padding: "2rem",
  boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
};
