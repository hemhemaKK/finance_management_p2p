import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h1>About Us</h1>
        <p>We provide secure authentication with email OTP and Google OAuth login.</p>
      </div>
    </>
  );
}
