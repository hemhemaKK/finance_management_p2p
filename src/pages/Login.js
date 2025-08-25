import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard"); 
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Login</h2>
      <input
        style={inputStyle}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={inputStyle}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={buttonStyle} onClick={handleLogin}>
        Login
      </button>

      <div style={{ textAlign: "center", margin: "1rem 0" }}>OR</div>

      <a href="http://localhost:5000/api/auth/google" style={{ textDecoration: "none" }}>
        <button style={googleButtonStyle}>Login with Google</button>
      </a>
    </div>
  );
}

// Inline styles
const containerStyle = {
  maxWidth: "400px",
  margin: "5rem auto",
  padding: "2rem",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  backgroundColor: "#f9f9f9",
};

const titleStyle = {
  marginBottom: "1.5rem",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  margin: "0.5rem 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "0.8rem",
  marginTop: "1rem",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer",
};

const googleButtonStyle = {
  width: "100%",
  padding: "0.8rem",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#DB4437",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer",
};
