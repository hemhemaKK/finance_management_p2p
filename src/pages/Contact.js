import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      // Replace with your backend endpoint
      await axios.post("https://your-backend.com/api/contact", { name, email, message });
      setSuccess("Your query has been submitted successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to submit query");
    } finally {
      setLoading(false);
    }
  };

  return (<>
  <Navbar/>
  
    <div style={containerStyle}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          style={textareaStyle}
        />
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
    </div>
    <Footer/>
    </>
  );
}

// Styles
const containerStyle = {
  maxWidth: "500px",
  margin: "50px auto",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  backgroundColor: "#fff",
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
};

const formStyle = { display: "flex", flexDirection: "column", gap: "15px" };

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const textareaStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  resize: "none",
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};
