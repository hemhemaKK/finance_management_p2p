import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaHome, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverHome, setHoverHome] = useState(false);
  const [hoverGoogle, setHoverGoogle] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await login({ email, password });
    const user = res.data.user; // assuming backend returns user info along with token
    localStorage.setItem("token", res.data.token);

    if (user.email === "mcaprojecttestemail@gmail.com") {
      alert("Admin login successful!");
      navigate("/admindashboard"); // go to admin dashboard
    } else {
      alert("Login successful!");
      navigate("/dashboard"); // normal user dashboard
    }
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
        <FaHome size={22} /> Home
      </Link>

      <div style={containerStyle}>
        <h2 style={titleStyle}>Login</h2>

        {/* Email input */}
        <div style={inputWrapper}>
          <FaEnvelope style={iconStyle} />
          <input
            style={inputStyle}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password input with toggle */}
        <div style={inputWrapper}>
          <FaLock style={iconStyle} />
          <input
            style={inputStyle}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer", color: "#7b7b7bff" }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Login button */}
        <button
          style={{
            ...buttonStyle,
            transform: hoverBtn ? "scale(1.05)" : "scale(1)",
            backgroundColor: hoverBtn ? "#45a049" : "#4CAF50",
          }}
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
          onClick={handleLogin}
        >
          Login
        </button>

        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            margin: "1rem 0",
            color: "#ffffffff",
          }}
        >
          OR
        </div>

        {/* Google Login with official icon and hover effect */}
        <a
          href="https://personal-finance-p2p-backend.onrender.com/api/auth/google"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            textDecoration: "none",
            color: "#000",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "6px",
            backgroundColor: hoverGoogle ? "#f1f1f1" : "#fff",
            transform: hoverGoogle ? "scale(1.03)" : "scale(1)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={() => setHoverGoogle(true)}
          onMouseLeave={() => setHoverGoogle(false)}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            style={{ width: "20px", height: "20px" }}
          />
          Sign in with Google
        </a>

        {/* Register link */}
        <p
          style={{
            marginTop: "1.2rem",
            fontWeight: "bold",
            color: "#ffffffff",
          }}
        >
          New User?{" "}
          <Link
            to="/register"
            style={{
              color: "#4CAF50",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

// Page wrapper with background
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

// Overlay blur
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

// Container (card)
const containerStyle = {
  maxWidth: "400px",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
  textAlign: "center",
  backgroundColor: "rgba(255,255,255,0.1)", // semi-transparent
  zIndex: 2,
  animation: "fadeIn 1s ease-in-out",
};

// Title
const titleStyle = {
  marginBottom: "1.5rem",
  color: "#ffffffff",
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

// Icon style
const iconStyle = {
  marginRight: "8px",
  color: "#666",
};

// Input field
const inputStyle = {
  flex: 1,
  padding: "0.6rem",
  border: "none",
  outline: "none",
  fontSize: "1rem",
  backgroundColor: "transparent",
};

// Login button
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
