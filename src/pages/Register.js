import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, verifyOtp } from "../services/auth";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Register() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverHome, setHoverHome] = useState(false);

  const navigate = useNavigate();

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
      localStorage.setItem("token", res.data.token);
      alert("Email verified, registration complete!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div style={pageWrapper}>
      {/* Overlay blur */}
      <div style={overlayStyle}></div>

      {/* Home button */}
      <Link
        to="/"
        style={{
          ...homeBtnStyle,
          transform: hoverHome ? "scale(1.05)" : "scale(1)",
          backgroundColor: hoverHome ? "#f5f5f5" : "#fff",
        }}
        onMouseEnter={() => setHoverHome(true)}
        onMouseLeave={() => setHoverHome(false)}
      >
        <FaArrowLeft size={20} /> Home
      </Link>

      <div style={containerStyle}>
        {step === 1 ? (
          <>
            <h2 style={titleStyle}>Register</h2>
            <div style={inputWrapper}>
              <FaUser style={iconStyle} />
              <input
                style={inputStyle}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={inputWrapper}>
              <FaEnvelope style={iconStyle} />
              <input
                style={inputStyle}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={inputWrapper}>
              <FaLock style={iconStyle} />
              <input
                style={inputStyle}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              style={{
                ...buttonStyle,
                transform: hoverBtn ? "scale(1.05)" : "scale(1)",
                backgroundColor: hoverBtn ? "#45a049" : "#4CAF50",
              }}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              onClick={handleRegister}
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h2 style={titleStyle}>Verify OTP</h2>
            <div style={inputWrapper}>
              <input
                style={inputStyle}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              style={{
                ...buttonStyle,
                transform: hoverBtn ? "scale(1.05)" : "scale(1)",
                backgroundColor: hoverBtn ? "#45a049" : "#4CAF50",
              }}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}

        <p style={{ marginTop: "1.5rem", color: "#fff", fontWeight: "bold" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#4CAF50", fontWeight: "bold", textDecoration: "none" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// Page wrapper
const pageWrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1470&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
};

// Overlay
const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(5px)",
};

// Home button
const homeBtnStyle = {
  position: "absolute",
  top: "20px",
  left: "20px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 12px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  fontWeight: "bold",
  color: "#333",
  textDecoration: "none",
  transition: "all 0.3s ease",
  zIndex: 3,
};

// Container
const containerStyle = {
  maxWidth: "400px",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
  textAlign: "center",
  backgroundColor: "rgba(255,255,255,0.1)",
  zIndex: 2,
};

// Title
const titleStyle = {
  marginBottom: "1.5rem",
  color: "#fff",
};

// Input wrapper
const inputWrapper = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f1f1f1",
  borderRadius: "8px",
  padding: "0.5rem 0.8rem",
  margin: "0.7rem 0",
};

// Icon
const iconStyle = {
  marginRight: "8px",
  color: "#666",
};

// Input
const inputStyle = {
  flex: 1,
  padding: "0.6rem",
  border: "none",
  outline: "none",
  fontSize: "1rem",
  backgroundColor: "transparent",
};

// Button
const buttonStyle = {
  width: "100%",
  padding: "0.8rem",
  marginTop: "1rem",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.2s ease",
};
