import Navbar from "../components/Navbar";
// import { useState } from "react";

const testimonials = [
  "Fast, secure, and reliable payments!",
  "Managing my expenses has never been easier.",
  "Loved the peer-to-peer transfer feature!",
  "Amazing dashboard and analytics!"
];

export default function Home() {
  return (
    <div style={{ width: "100vw", overflowX: "hidden", fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      {/* Video Background */}
      <div style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "80%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src="/assets/home.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Hero Content */}
        <div style={{
          position: "relative",
          textAlign: "center",
          color: "white",
          top: "40%",
          marginLeft:"20%",
          width:"60%",
          transform: "translateY(-50%)",
          padding: "2rem",
          borderRadius: "20px",
          backgroundColor: "rgba(0,0,0,0.8)",
          boxShadow: "0 8px 25px rgba(255, 255, 255, 0.8)",
        }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Welcome to Personal Finance App</h1>
          <p style={{ fontSize: "1.5rem", maxWidth: "600px", margin: "0 auto" }}>
            Track your expenses, manage budgets, and enable secure peer-to-peer payments
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "4rem 1rem",
        backgroundColor: "#f9f9f9"
      }}>
        {["Secure Login", "Expense Tracker", "Peer-to-Peer Transfers", "Analytics Dashboard"].map((title, i) => (
          <div key={i} style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "2rem",
            margin: "1rem",
            minWidth: "250px",
            flex: "1 1 250px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            transition: "transform 0.3s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-10px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <h3 style={{ marginBottom: "1rem", color: "#333" }}>{title}</h3>
            <p style={{ color: "#555" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>
          </div>
        ))}
      </div>

      {/* Scrolling Testimonials */}
      <div style={{ overflow: "hidden", backgroundColor: "#4CAF50", padding: "2rem 0" }}>
        <div style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "scrollText 20s linear infinite"
        }}>
          {testimonials.map((t, i) => (
            <span key={i} style={{ display: "inline-block", marginRight: "5rem", color: "white", fontSize: "1.2rem" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Animation */}
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
}
