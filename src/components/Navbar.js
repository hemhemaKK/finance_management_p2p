import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  // Reusable HoverLink (button-like)
  const HoverLink = ({ to, children }) => {
    const [hover, setHover] = useState(false);
    const style = {
      color: "white",
      marginLeft: "2rem",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#00484bff",
      padding: "6px 12px",
      borderRadius: "5px",
      boxShadow: hover
        ? "0 12px 2px rgba(0,0,0,0.1)"
        : "0 8px 25px rgba(0,0,0,0.4)",
      transform: hover ? "translateY(-3px)" : "translateY(0)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      display: "inline-block",
    };
    return (
      <Link
        to={to}
        style={style}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </Link>
    );
  };

  // Simple link (no button style)
  const SimpleLink = ({ to, children }) => {
    const [hover, setHover] = useState(false);
    const style = {
      color: hover ? "#0c6700ff" : "black",
      marginLeft: "3rem",
      marginRight:"2rem",
      textDecoration: hover ?"underline":"none",
      fontSize: "18px",
      fontWeight: "bold",
      transition: "all 0.3s ease",
    };
    return (
      <Link
        to={to}
        style={style}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav style={navStyle}>
      <Link to="/">
        <img src="/assets/logo1.png" alt="P2P Finance Logo" style={{
      height: "60px",
      width: "60px",
      objectFit: "cover",
      clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
      transition: "transform 0.3s ease",
    }} />
      </Link>
      <div style={{ display: "flex", alignItems: "center" }}>
        <SimpleLink to="/">Home</SimpleLink>
        <SimpleLink to="/about">About Us</SimpleLink>
        <SimpleLink to="/contact">Contact Us</SimpleLink>

        <HoverLink to="/login">Login</HoverLink>
        <HoverLink to="/register">Sign Up</HoverLink>
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.3rem 3rem",
  backgroundColor: "#ffffffbb",
};
