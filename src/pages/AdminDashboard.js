import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileSettings from "./ProfileSettings";

const BASE_URL = "https://personal-finance-p2p-backend.onrender.com";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activeSection, setActiveSection] = useState("Dashboard");
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ users: 0, transactions: 0, tickets: 0, contacts: 0 });
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [expandedTxIds, setExpandedTxIds] = useState({});
  const [ticketReplies, setTicketReplies] = useState({});

  // Fetch admin profile
  useEffect(() => {
    if (!token) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/profile`, { headers: { Authorization: `Bearer ${token}` } });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [token]);

  // Fetch all admin data
  useEffect(() => {
    if (!token) return;

    const fetchAllData = async () => {
      try {
        const [usersRes, transactionsRes, contactsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${BASE_URL}/api/admin/transactions`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${BASE_URL}/api/admin/contacts`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const allTickets = usersRes.data.flatMap(u => u.supportTickets || []);

        setStats({
          users: usersRes.data.length,
          transactions: transactionsRes.data.length,
          tickets: allTickets.length,
          contacts: contactsRes.data.length,
        });

        setUsers(usersRes.data);
        setTransactions(transactionsRes.data);
        setContacts(contactsRes.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    };
    fetchAllData();
  }, [token]);

  const menuItems = ["Dashboard", "Users", "Transactions", "Tickets", "Support"];
  const handleMenuClick = (menu) => setActiveSection(menu);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // --- Styles ---
  const tableStyle = { width: "100%", borderCollapse: "separate", borderSpacing: 0, marginTop: "10px", backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: "10px", overflow: "hidden", fontSize: "0.95rem", color: "#333" };
  const thStyle = { backgroundColor: "#020202ff", color: "#fff", textAlign: "left", padding: "12px 15px", fontWeight: "bold" };
  const tdStyle = { padding: "12px 15px", borderBottom: "1px solid #eee" };
  const trStyle = (idx) => ({ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff", transition: "background-color 0.2s" });
  const cardStyle = { backgroundColor: "#fff", flex: "1 1 200px", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center", fontWeight: "bold", fontSize: "18px" };
  const sectionTitle = { color: "#333", marginBottom: "15px" };
  const sidebarStyle = { width: "250px", minHeight: "100vh", backgroundColor: "#111", padding: "0.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "fixed", left: 0, top: 0 };
  const profileStyle = { padding: "0.5rem", borderBottom: "1px solid #444", textAlign: "center" };
  const profilePicStyle = { borderRadius: "50%", marginBottom: "0.2rem", width: "80px", height: "80px", objectFit: "cover" };
  const menuItemStyle = isActive => ({ textDecoration: "none", color: isActive ? "#4CAF50" : "#fff", padding: "0.8rem 1rem", display: "block", borderRadius: "8px", margin: "0.4rem 0", cursor: "pointer", fontWeight: "bold", backgroundColor: isActive ? "#222" : "transparent", transition: "all 0.2s" });
  const bottomLinkStyle = (isActive, isLogout = false) => ({ textDecoration: "none", color: "#fff", padding: "0.8rem 1rem", display: "block", borderRadius: "8px", margin: "0.4rem 0", cursor: "pointer", fontWeight: "bold", backgroundColor: isLogout ? "#ff4d4d" : isActive ? "#222" : "transparent", textAlign: "center", transition: "all 0.2s" });

  // --- Reusable Tables ---
  const renderUsersTable = () => (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Phone Verified</th>
            <th style={thStyle}>Wallet Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={idx} style={trStyle(idx)}>
              <td style={tdStyle}>{u.name}</td>
              <td style={tdStyle}>{u.email}</td>
              <td style={tdStyle}>{u.phone || "-"}</td>
              <td style={tdStyle}>
                <span style={{ color: "white", padding: "4px 8px", borderRadius: "6px", backgroundColor: u.isPhoneVerified ? "green" : "red", fontWeight: "bold", fontSize: "0.9rem" }}>
                  {u.isPhoneVerified ? "Yes" : "No"}
                </span>
              </td>
              <td style={tdStyle}>{u.walletBalance || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTicketsTable = () => {
    const allTickets = users.flatMap(u => (u.supportTickets || []).map(ticket => ({
      ...ticket,
      userId: u._id,
      userName: u.name,
      userEmail: u.email,
    })));

    const handleReplyChange = (ticketId, value) => setTicketReplies(prev => ({ ...prev, [ticketId]: value }));

    const handleReplySubmit = async (userId, ticketId) => {
      if (!ticketReplies[ticketId]) return alert("Enter a reply first!");
      try {
        await axios.put(`${BASE_URL}/api/tickets/reply/${userId}/${ticketId}`, { reply: ticketReplies[ticketId] }, { headers: { Authorization: `Bearer ${token}` } });
        alert("Replied successfully!");
        // Update local ticket status
        setUsers(prevUsers => prevUsers.map(u => ({
          ...u,
          supportTickets: u.supportTickets?.map(t => t._id === ticketId ? { ...t, status: "closed", reply: ticketReplies[ticketId] } : t)
        })));
        setTicketReplies(prev => ({ ...prev, [ticketId]: "" }));
      } catch (err) {
        console.error("Error replying to ticket:", err);
        alert("Failed to reply. Try again.");
      }
    };

    return (
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Reply</th>
            </tr>
          </thead>
          <tbody>
            {allTickets.map((ticket, idx) => (
              <tr key={ticket._id || idx} style={trStyle(idx)}>
                <td style={tdStyle}>{ticket._id}</td>
                <td style={tdStyle}>{`${ticket.userName} (${ticket.userEmail})`}</td>
                <td style={tdStyle}>{ticket.subject}</td>
                <td style={tdStyle}>
                  <span style={{ color: ticket.status === "open" ? "green" : "red", fontWeight: "bold" }}>
                    {ticket.status}
                  </span>
                </td>
                <td style={tdStyle}>{new Date(ticket.createdAt).toLocaleString()}</td>
                <td style={tdStyle}>
                  {ticket.status === "open" ? (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <input
                        type="text"
                        placeholder="Type reply..."
                        value={ticketReplies[ticket._id] || ""}
                        onChange={(e) => handleReplyChange(ticket._id, e.target.value)}
                        style={{ flex: 1, padding: "4px" }}
                      />
                      <button onClick={() => handleReplySubmit(ticket.userId, ticket._id)} style={{ padding: "4px 8px", cursor: "pointer" }}>Reply</button>
                    </div>
                  ) : (
                    ticket.reply || "Closed"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTransactionsTable = () => {
    const grouped = transactions.reduce((acc, tx) => {
      if (!acc[tx._id]) acc[tx._id] = [];
      acc[tx._id].push(tx);
      return acc;
    }, {});

    return (
      <div>
        {Object.keys(grouped).map((txId, idx) => {
          const firstTx = grouped[txId][0];
          const userName = firstTx.sender?.name || firstTx.receiver?.name || "N/A";
          const userEmail = firstTx.sender?.email || firstTx.receiver?.email || "N/A";

          return (
            <div key={txId} style={{ marginBottom: "10px" }}>
              <div onClick={() => setExpandedTxIds(prev => ({ ...prev, [txId]: !prev[txId] }))} style={{ backgroundColor: "#eee", padding: "10px", cursor: "pointer", borderRadius: "6px" }}>
                Transaction ID: {txId} | User: {userName} ({userEmail}) ({grouped[txId].length} record{grouped[txId].length > 1 ? "s" : ""})
              </div>
              {expandedTxIds[txId] && (
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Sender</th>
                      <th style={thStyle}>Receiver</th>
                      <th style={thStyle}>Amount</th>
                      <th style={thStyle}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grouped[txId].map((tx, i) => (
                      <tr key={i} style={trStyle(i)}>
                        <td style={tdStyle}>{tx.sender ? `${tx.sender.name} (${tx.sender.email})` : "N/A"}</td>
                        <td style={tdStyle}>{tx.receiver ? `${tx.receiver.name} (${tx.receiver.email})` : "N/A"}</td>
                        <td style={tdStyle}>₹{tx.amount}</td>
                        <td style={tdStyle}>{new Date(tx.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderTable = (data, columns) => (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>{columns.map(col => <th key={col} style={thStyle}>{col}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} style={trStyle(idx)}>
              {columns.map(col => <td key={col} style={tdStyle}>{item[col] ?? item[col.toLowerCase()] ?? "-"}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <div>
            <h2 style={sectionTitle}>Dashboard</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <div style={cardStyle}>Users: {stats.users}</div>
              <div style={cardStyle}>Transactions: {stats.transactions}</div>
              <div style={cardStyle}>Tickets: {stats.tickets}</div>
              <div style={cardStyle}>Contacts: {stats.contacts}</div>
            </div>
          </div>
        );
      case "Users": return <div><h2 style={sectionTitle}>All Users</h2>{renderUsersTable()}</div>;
      case "Transactions": return <div><h2 style={sectionTitle}>All Transactions</h2>{renderTransactionsTable()}</div>;
      case "Tickets": return <div><h2 style={sectionTitle}>All Tickets</h2>{renderTicketsTable()}</div>;
      case "Support": return <div><h2 style={sectionTitle}>Contact Queries</h2>{renderTable(contacts, ["name", "email", "subject", "message", "createdAt"])}</div>;
      default: return <ProfileSettings />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={profileStyle}>
          {user ? (
            <>
              <img src={user.profilePic || "https://via.placeholder.com/80"} alt="Profile" style={profilePicStyle} />
              <h3 style={{ color: "white", margin: 0 }}>{user.name}</h3>
              <p style={{ color: "#ccc", fontSize: "0.9rem" }}>{user.email}</p>
            </>
          ) : <h3 style={{ color: "white" }}>Welcome</h3>}
        </div>
        <div style={{ flex: 1, marginTop: "1rem" }}>
          {menuItems.map(menu => (
            <div key={menu} onClick={() => handleMenuClick(menu)} style={menuItemStyle(menu === activeSection)}>
              {menu}
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <div onClick={() => handleMenuClick("Profile")} style={bottomLinkStyle(activeSection === "Profile")}>Profile</div>
          <div onClick={handleLogout} style={bottomLinkStyle(false, true)}>Logout</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "280px", padding: "20px", marginTop: "20px", flex: 1, backgroundColor: "#f5f6f6ff" }}>
        {renderContent()}
      </div>
    </div>
  );
}
