import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  const iconStyle = {
    color: "#374151",
    fontSize: "1.4rem",
    transition: "all 0.3s ease",
    textDecoration: "none",
  };

  const devLinkStyle = {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
  };

  return (
    <footer
      style={{
        width: "100%",
        marginTop: "3rem",
        padding: "2rem 1rem",
        backgroundColor: "#f8fafc",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        {/* Social Icons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.2rem",
            marginBottom: "1rem",
          }}
        >
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaGithub />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaLinkedin />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <div style={{ fontSize: "0.85rem", color: "#4b5563", marginBottom: "0.4rem" }}>
          © {year} <span style={{ fontWeight: "600", color: "#1f2937" }}>VitConnect</span> —
          Vishwakarma Institute of Technology, Pune. All rights reserved.
        </div>

        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
          Developed by{" "}
          <a
            href="PASTE-YOUR-LINK-HERE"
            target="_blank"
            rel="noopener noreferrer"
            style={devLinkStyle}
          >
            ASEP TEAM NO.6
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
