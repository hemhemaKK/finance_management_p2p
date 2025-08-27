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
import ProfileSettings from "./pages/ProfileSettings";
import { useEffect } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";
import BudgetPlan from "./pages/BudgetPlan";

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
        <Route path="/footer" element={<Footer />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/received-money" element={<ReceivedMoney />} />
        <Route path="/budget" element={<BudgetPlan />} />
        <Route path="/profile" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
