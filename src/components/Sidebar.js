import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import axios from "axios";

export default function Sidebar({ activeSection, setActiveSection }) {
  const navigate = useNavigate(); // hook to navigate programmatically
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await axios.get("https://personal-finance-p2p-backend.onrender.com/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };
    fetchProfile();
  }, [token]);

  const linkStyle = (menu) => ({
    textDecoration: "none",
    color: activeSection === menu ? "#4CAF50" : "#fff",
    padding: "0.8rem 1rem",
    display: "block",
    borderRadius: "8px",
    margin: "0.4rem 0",
    transition: "all 0.2s",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: activeSection === menu ? "#222" : "transparent",
  });

  return (
    <div style={sidebarStyle}>
      {/* Top Profile */}
      <div style={{ padding: "0.5rem", borderBottom: "1px solid #444", textAlign: "center" }}>
        {user ? (
          <>
            <img
              src={user.profilePic || "https://via.placeholder.com/80"} // show actual profilePic if exists
              alt="Profile"
              style={{ borderRadius: "50%", marginBottom: "0.2rem", width: "80px", height: "80px", objectFit: "cover" }}
            />
            <h3 style={{ color: "white", margin: 0 }}>{user.name}</h3>
            <p style={{ color: "#ccc", fontSize: "0.9rem" }}>{user.email}</p>
          </>
        ) : (
          <h3 style={{ color: "white" }}>Welcome</h3>
        )}
      </div>

      {/* Menu Links */}
      <div style={{ marginTop: "0.8rem", flex: 1 }}>
        {["Dashboard", "Expense & Income Tracking", "Transaction History", "Money Transfers", "Budget Plan", "Scheduled Payments"].map((menu) => (
          <div
            key={menu}
            style={linkStyle(menu)}
            onClick={() => setActiveSection(menu)}
          >
            {menu}
          </div>
        ))}
      </div>

      {/* Bottom Settings / Logout */}
      <div style={{ marginTop: "auto" }}>
        <div
          style={linkStyle("Profile")}
          onClick={() => setActiveSection("Profile")} // just like other menu items
        >
          Profile Settings
        </div>
        <div
          style={{ ...linkStyle("Logout"), backgroundColor: "#ff4d4d", textAlign: "center", marginTop: "0.5rem" }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/"); // logout still navigates to home
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

const sidebarStyle = {
  width: "250px",
  minHeight: "98vh",
  backgroundColor: "#111",
  padding: "0.5rem",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
