import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import SendMoney from "./pages/SendMoney";
import ReceivedMoney from "./pages/BudgetPlan";
import Budget from "./pages/SchedulePayment";
import ProfileSettings from "./pages/ProfileSettings";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users`)
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/received-money" element={<ReceivedMoney />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/profile" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
