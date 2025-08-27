import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [reviews, setReviews] = useState([]);

  // Default reviews if backend has none
  const defaultReviews = [
    {
      name: "Alice",
      title: "Great App!",
      comment: "This app helped me manage my expenses efficiently!",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Bob",
      title: "Smooth Transfers",
      comment: "Peer-to-peer transfers are so smooth and secure.",
      rating: 4,
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Charlie",
      title: "Insightful Analytics",
      comment: "The analytics dashboard is very insightful.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Diana",
      title: "Easy Interface",
      comment: "I love the easy-to-use interface and notifications.",
      rating: 4,
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "Ethan",
      title: "Wallet Management",
      comment: "Wallet management is super convenient!",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Fiona",
      title: "Highly Recommend",
      comment: "Highly recommend for anyone wanting better financial control.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=6",
    },
  ];

  // Fetch all users' reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          "https://personal-finance-p2p-backend.onrender.com/api/review"
        );
        if (res.data.reviews && res.data.reviews.length > 0) {
          const mappedReviews = res.data.reviews.map((r) => ({
            name: r.name || "User",
            title: r.title || "Review",
            comment: r.comment,
            rating: r.rating,
            image: r.image || "https://i.pravatar.cc/150?img=7",
          }));
          setReviews([...defaultReviews,...mappedReviews]);
        } else {
          setReviews(defaultReviews);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setReviews(defaultReviews);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div style={{ width: "100vw", overflowX: "hidden", fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      {/* Video Background */}
      <div style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src="/assets/home.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            textAlign: "center",
            color: "white",
            top: "40%",
            marginLeft: "20%",
            width: "60%",
            transform: "translateY(-50%)",
            padding: "2rem",
            borderRadius: "20px",
            backgroundColor: "rgba(0,0,0,0.8)",
            boxShadow: "0 8px 25px rgba(255, 255, 255, 0.8)",
          }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Welcome to Personal Finance App</h1>
          <p style={{ fontSize: "1.5rem", maxWidth: "600px", margin: "0 auto" }}>
            Track your expenses, manage budgets, and enable secure peer-to-peer payments
          </p>
        </div>
      </div>

      {/* Services */}
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "-10px",
          marginTop: "40px",
          padding: "20px",
        }}
      >
        The services we provide
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#a2a2a2ff",
        }}
      >
        {["Secure Login", "Expense Tracker", "Peer-to-Peer Transfers", "Analytics Dashboard"].map(
          (title, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "2rem",
                margin: "1rem",
                minWidth: "250px",
                flex: "1 1 250px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <h3 style={{ marginBottom: "1rem", color: "#333" }}>{title}</h3>
              <p style={{ color: "#555" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
              </p>
            </div>
          )
        )}
      </div>

      {/* Image Gallery + Benefits Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "2rem",
          gap: "2rem",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Left Side: Gallery */}
        <div
          style={{
            flex: "2",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
          }}
        >
          {["/assets/2.png", "/assets/3.png", "/assets/1.png"].map((src, i) => (
            <div key={i} style={{ overflow: "hidden", borderRadius: "10px", height: "250px" }}>
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          ))}

          <div style={{ gridColumn: "span 3", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {["/assets/4.png", "/assets/5.png"].map((src, i) => (
              <div key={i + 3} style={{ overflow: "hidden", borderRadius: "10px", height: "300px" }}>
                <img
                  src={src}
                  alt={`Gallery ${i + 4}`}
                  style={{
                    width: "100%",
                    height: "150%",
                    objectFit: "cover",
                    transition: "transform 0.5s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Benefits */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0.1rem",
            gap: "1rem",
            background: "#e5e4e4ff",
          }}
        >
          <h2 style={{ marginLeft: "10px", marginTop: "0px", padding: "px", fontWeight: "bold" }}>
            Why Choose Us?
          </h2>
          <p style={{ marginLeft: "10px", marginTop: "0px", padding: "0px", fontWeight: "bold" }}>
            💰 Track your expenses effortlessly and stay on budget.
          </p>
          <p style={{ marginLeft: "10px", marginTop: "0px", padding: "0px", fontWeight: "bold" }}>
            🔒 Secure and fast peer-to-peer transfers.
          </p>
          <p style={{ marginLeft: "10px", marginTop: "0px", padding: "0px", fontWeight: "bold" }}>
            📊 Detailed analytics dashboard for better financial insights.
          </p>
          <p style={{ marginLeft: "10px", marginTop: "0px", padding: "0px", fontWeight: "bold" }}>
            📱 Easy-to-use interface with real-time notifications.
          </p>
          <p style={{ marginLeft: "10px", marginTop: "0px", padding: "0px", fontWeight: "bold" }}>
            🌟 Trusted by hundreds of happy users!
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <h1 style={{ textAlign: "center", fontWeight: "bold", marginTop: "60px", marginBottom: "20px" }}>
        Our Users' Satisfaction
      </h1>
      <div style={{ overflow: "hidden", padding: "2rem 0", backgroundColor: "#b6b6b6ff" }}>
        <div style={{ display: "flex", animation: "scrollCards 30s linear infinite" }}>
          {reviews.length > 0
            ? reviews.map((t, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "15px",
                    padding: "1rem",
                    margin: "0 1rem",
                    minWidth: "250px",
                    maxWidth: "250px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <h3 style={{ margin: "0.5rem 0" }}>{t.name}</h3>
                  <h4 style={{ margin: "0.3rem 0", fontStyle: "italic", color: "#555" }}>{t.title}</h4>
                  <div style={{ color: "#FFD700", marginBottom: "0.5rem" }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "#555" }}>{t.comment}</p>
                </div>
              ))
            : <p style={{ margin: "auto", fontSize: "1rem", color: "#333" }}>No reviews yet.</p>}
        </div>
      </div>

      {/* Scroll Animation */}
      <style>
        {`
          @keyframes scrollCards {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <Footer />
    </div>
  );
}
