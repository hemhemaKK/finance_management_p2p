import React, { useState, useEffect } from "react";
import axios from "axios";

const SendMoney = () => {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState(""); 
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [category, setCategory] = useState("personal"); // default category

  // Fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!receiverEmail) return setSuggestions([]);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/payment/search-users?q=${receiverEmail}`
        );
        setSuggestions(res.data.users);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSuggestions();
  }, [receiverEmail]);

  const handleSelect = (user) => {
    setReceiverEmail(user.email);
    setSelectedUser(user);
    setSuggestions([]);
  };

  const handleSend = async () => {
    if (!selectedUser) return alert("Select a valid user first");
    if (!amount || amount <= 0) return alert("Enter a valid amount");

    try {
      const token = localStorage.getItem("token");
      const senderId = JSON.parse(atob(token.split(".")[1])).id;

      const res = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          senderId,
          receiverId: selectedUser._id,
          amount: Number(amount),
          category, // <-- send category
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { order, transactionId } = res.data;

      const options = {
        key: "rzp_test_R8pZSI84PTeQ4i",
        amount: order.amount,
        currency: "INR",
        name: "P2P Payment",
        description: `Send money to ${selectedUser.name}`,
        order_id: order.id,
        handler: async function (response) {
          await axios.post(
            "http://localhost:5000/api/payment/success",
            {
              transactionId,
              razorpayPaymentId: response.razorpay_payment_id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          alert("Payment successful!");
          setAmount("");
          setReceiverEmail("");
          setSelectedUser(null);
          setCategory("personal");
        },
        prefill: { email: selectedUser.email },
        theme: { color: "#4CAF50" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error initiating payment");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Send Money</h2>

      <input
        type="text"
        placeholder="Receiver Email"
        value={receiverEmail}
        onChange={(e) => { setReceiverEmail(e.target.value); setSelectedUser(null); }}
        style={inputStyle}
      />

      {/* Suggestions dropdown */}
      <div style={suggestionContainerStyle}>
        {suggestions.map((user) => (
          <div
            key={user.email}
            style={suggestionItemStyle}
            onClick={() => handleSelect(user)}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            {user.name} ({user.email})
          </div>
        ))}
      </div>

      {/* Amount input */}
      <input
        type="number"
        placeholder="Enter amount (INR)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={inputStyle}
      />

      {/* Category selector */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ ...inputStyle, marginBottom: "10px" }}
      >
        <option value="personal">Personal</option>
        <option value="gift">Gift</option>
        <option value="payment">Payment</option>
      </select>

      <button
        onClick={handleSend}
        disabled={!selectedUser || !amount || amount <= 0}
        style={{
          ...buttonStyle,
          backgroundColor:
            !selectedUser || !amount || amount <= 0 ? "#ccc" : "#4CAF50",
          cursor:
            !selectedUser || !amount || amount <= 0 ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (selectedUser && amount > 0) e.currentTarget.style.background = "#45a049";
        }}
        onMouseLeave={(e) => {
          if (selectedUser && amount > 0) e.currentTarget.style.background = "#4CAF50";
        }}
      >
        Send Money
      </button>
    </div>
  );
};

// Inline styles
const containerStyle = {
  maxWidth: "500px",
  margin: "50px auto",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  backgroundColor: "#fff",
  transition: "all 0.3s ease",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "12px 10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  outline: "none",
  transition: "0.3s",
};

const suggestionContainerStyle = {
  border: "1px solid #ccc",
  borderRadius: "5px",
  maxHeight: "150px",
  overflowY: "auto",
  marginBottom: "10px",
};

const suggestionItemStyle = {
  padding: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  background: "#fff",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "5px",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  transition: "all 0.3s ease",
};

export default SendMoney;
