import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h1>Contact Us</h1>
        <p>Email: support@myapp.com</p>
        <p>Phone: +91 1234567890</p>
      </div>
    </>
  );
}
