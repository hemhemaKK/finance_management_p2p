import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContainer}>
        {/* Contact Us */}
        <div style={footerColumn}>
          <h4 style={footerHeading}>Contact Us</h4>
          <p>Email: support@p2pfinance.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

        {/* Help */}
        <div style={footerColumn}>
          <h4 style={footerHeading}>Help</h4>
          <Link to="/faq" style={footerLink}>FAQ</Link>
          <Link to="/support" style={footerLink}>Support</Link>
          <Link to="/terms" style={footerLink}>Terms & Conditions</Link>
        </div>

        {/* Map / Location */}
        <div style={footerColumn}>
          <h4 style={footerHeading}>Our Location</h4>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799142553!2d-74.25986510101911!3d40.69767006301006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzQ2LjAiTiA3NMKwMTUnMDAuMCJX!5e0!3m2!1sen!2sin!4v1623870194881!5m2!1sen!2sin"
            width="200"
            height="120"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Social Media */}
        <div style={footerColumn}>
          <h4 style={footerHeading}>Follow Us</h4>
          <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={socialIcon}><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={socialIcon}><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={socialIcon}><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={socialIcon}><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <p style={{ fontWeight:"bold",textAlign: "center", marginTop: "1rem"}}>
        &copy; {new Date().getFullYear()} P2P Finance. All Rights Reserved.
      </p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: "#cacacaff",
  color: "#000000ff",
  padding: "2rem 3rem",
  marginTop: "3rem",
};

const footerContainer = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap:"10px",
};

const footerColumn = {
  flex: "1",
  minWidth: "200px",
  marginBottom: "1rem",
  background:"white",
  padding:"20px",
  borderRadius:"10px"
};

const footerHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "0.8rem",
};

const footerLink = {
  display: "block",
  color: "#000000ff",
  textDecoration: "none",
  marginBottom: "0.5rem",
};

const socialIcon = {
  color: "#000000ff",
  fontSize: "20px",
  transition: "color 0.3s",
  textDecoration: "none",
};

