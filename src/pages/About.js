import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function About() {
  const creators = [
    { name: "Hema", role: "Founder & Developer", img: "/assets/p1.png" },
    { name: "Divya", role: "UI/UX Designer", img: "/assets/p2.png" },
    { name: "Sanjay", role: "Backend Engineer", img: "/assets/p3.png" },
  ];

  return (
    <>
      <Navbar />

      {/* Video Background with Blur and Overlay */}
      <div style={{ position: "relative", overflow: "hidden" }}>
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
            filter: "blur(8px) brightness(0.5)", // ✅ blur + darken
            zIndex: -2,
          }}
        >
          <source src="/assets/about.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional: Dark Overlay for stronger contrast */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: -1
        }} />

        {/* Content Overlay */}
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", color: "white", position: "relative", zIndex: 1 }}>
          
          {/* Website Intro */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
              <br />🌟 About Our Website
            </h1>
            <p style={{ fontSize: "1.2rem", marginTop: "50px", maxWidth: "800px", marginInline: "auto" }}>
              Welcome to <b>Our Platform</b><br /> 🚀 — a place built with passion to empower people.  
              Our mission is to simplify learning, connect communities, and provide innovative digital experiences.  
              From smooth user journeys to exciting features, we focus on making tech more human-friendly.
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "60px",
              marginLeft: "50px",
              marginRight: "50px",
            }}
          >
            {[
              { title: "💡 Innovation", desc: "We constantly bring fresh ideas to life with modern technology." },
              { title: "⚡ Speed", desc: "Lightning-fast performance for a seamless user experience." },
              { title: "🌍 Community", desc: "Connecting people and building meaningful networks." },
              { title: "🔒 Security", desc: "Your privacy and safety are always our top priority." },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "20px",
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 1)", // semi-transparent to show video behind
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
                  textAlign: "center",
                  color: "black",
                }}
              >
                <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{benefit.title}</h2>
                <p>{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Creator Cards */}
          <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "30px" }}>👩‍💻 Meet The Creators</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              maxWidth: "1000px",
              margin: "auto",
            }}
          >
            {creators.map((creator, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{
                  padding: "20px",
                  borderRadius: "20px",
                  background: "rgba(0,0,0,0.6)",
                  boxShadow: "0px 10px 25px rgba(255, 255, 255, 1)",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <img
                  src={creator.img}
                  alt={creator.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "15px",
                    border: "3px solid gray",
                  }}
                />
                <h3 style={{ fontSize: "1.5rem" }}>{creator.name}</h3>
                <p style={{ fontSize: "1rem", opacity: "0.9" }}>{creator.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
