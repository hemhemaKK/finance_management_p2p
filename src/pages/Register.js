import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, verifyOtp } from "../services/auth";

export default function Register() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate(); // for navigation

  const handleRegister = async () => {
    try {
      await register({ name, email, password });
      alert("OTP sent to email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  const handleVerifyOtp = async () => {
  try {
    const res = await verifyOtp({ email, otp });
    localStorage.setItem("token", res.data.token); // save JWT
    alert("Email verified, registration complete!");
    navigate("/dashboard"); // redirect to dashboard
  } catch (err) {
    alert(err.response?.data?.msg || "Error");
  }
};


  return (
    <div style={containerStyle}>
      {step === 1 ? (
        <>
          <h2 style={titleStyle}>Register</h2>
          <input
            style={inputStyle}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button style={buttonStyle} onClick={handleRegister}>Send OTP</button>
        </>
      ) : (
        <>
          <h2 style={titleStyle}>Verify OTP</h2>
          <input
            style={inputStyle}
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button style={buttonStyle} onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
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
